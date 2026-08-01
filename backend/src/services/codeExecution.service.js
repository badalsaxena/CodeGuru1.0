const axios = require("axios");

// ── Judge0 CE Configuration ──────────────────────────────────────────────────
// Public instance: https://ce.judge0.com  (no API key required)
// To use a self-hosted or RapidAPI instance, set JUDGE0_URL and JUDGE0_API_KEY
// in your .env file.
const JUDGE0_URL =
  process.env.JUDGE0_URL || "https://ce.judge0.com";

const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || null;

// Maps language identifiers to Judge0 language IDs.
// Full list: https://ce.judge0.com/languages
const LANGUAGE_ID_MAP = {
  python:     100, // Python 3.12.5
  javascript: 97,  // JavaScript (Node.js 20.17.0)
  cpp:        105, // C++ (GCC 14.1.0)
  java:       91,  // Java (JDK 17.0.6)
  // normalised aliases
  py:         100,
  js:         97,
  "c++":      105,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const judge0Headers = () => {
  const headers = { "Content-Type": "application/json" };
  if (JUDGE0_API_KEY) {
    headers["X-RapidAPI-Key"] = JUDGE0_API_KEY;
  }
  return headers;
};

// ── Main execution function ───────────────────────────────────────────────────

/**
 * runCode
 * Submits code to Judge0 CE and polls until execution completes.
 *
 * @param {string} language   - language identifier (python/javascript/cpp/java)
 * @param {string} sourceCode - source code to execute
 * @param {string} stdin      - optional stdin input
 * @returns {object}          - Judge0 result shaped for downstream use
 */
const runCode = async (language, sourceCode, stdin = "") => {
  const languageId = LANGUAGE_ID_MAP[language?.toLowerCase()];

  if (!languageId) {
    throw new Error(`Unsupported language: ${language}`);
  }

  // ── Step 1: Submit to Judge0 ───────────────────────────────────────────────
  let token;
  try {
    const submitRes = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
      {
        language_id: languageId,
        source_code: sourceCode,
        stdin:       stdin || "",
      },
      { headers: judge0Headers() }
    );

    token = submitRes.data?.token;
    if (!token) {
      throw new Error("No submission token received from Judge0");
    }
  } catch (err) {
    console.error("❌ Judge0 Submit Error:", err.response?.data || err.message);
    throw new Error("Code submission to Judge0 failed");
  }

  // ── Step 2: Poll for result ────────────────────────────────────────────────
  // Status IDs: 1 = In Queue, 2 = Processing, 3+ = Done
  let result = null;
  for (let attempt = 0; attempt < 10; attempt++) {
    await sleep(1000);
    try {
      const pollRes = await axios.get(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`,
        { headers: judge0Headers() }
      );
      result = pollRes.data;
      if (result?.status?.id > 2) break; // execution finished
    } catch (err) {
      console.error("❌ Judge0 Poll Error:", err.message);
      throw new Error("Failed to retrieve execution result from Judge0");
    }
  }

  if (!result) {
    throw new Error("Code execution timed out");
  }

  // ── Step 3: Shape response to match the format expected by evaluation.service.js
  // evaluation.service.js reads: execution.run.output | execution.run.stdout
  return {
    run: {
      stdout:   result.stdout   || "",
      stderr:   result.stderr   || "",
      output:   result.stdout   || result.stderr || "",
      cpu_time: result.time     || 0,
      memory:   result.memory   || 0,
    },
    compile: {
      stdout: result.compile_output || "",
      stderr: result.compile_output || "",
    },
    // Raw Judge0 fields preserved for the run-code controller
    stdout:          result.stdout          || "",
    stderr:          result.stderr          || "",
    compile_output:  result.compile_output  || "",
    status:          result.status          || {},
    time:            result.time            || 0,
    memory:          result.memory          || 0,
  };
};

module.exports = { runCode };
