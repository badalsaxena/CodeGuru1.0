const axios = require("axios");

// Local Piston Compiler
const PISTON_URL = "http://localhost:2000/api/v2/execute";

const runCode = async (language, sourceCode, stdin = "") => {
  try {
    const response = await axios.post(PISTON_URL, {
      language,
      version: "*",
      files: [
        {
          content: sourceCode,
        },
      ],
      stdin,
      args: [],
      compile_timeout: 3000,
run_timeout: 3000,
compile_memory_limit: -1,
run_memory_limit: -1,
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Code Execution Error:",
      error.response?.data || error.message
    );

    throw new Error("Failed to execute code");
  }
};

module.exports = {
  runCode,
};