const Question = require("../models/Question.model");
const { runCode } = require("./codeExecution.service");

// ====================== LANGUAGE MAP ======================

const languageMap = {
  javascript: "javascript",
  JavaScript: "javascript",
  js: "javascript",

  python: "python",
  Python: "python",
  py: "python",

  java: "java",
  Java: "java",

  "c++": "c++",
  cpp: "c++",
  "C++": "c++",
};

// ====================== NORMALIZE OUTPUT ======================

const normalizeOutput = (output = "") => {
  return output
    .toString()
    .replace(/\r\n/g, "\n")
    .trim();
};

// ====================== EVALUATE SUBMISSION ======================

const evaluateSubmission = async ({
  questionId,
  language,
  code,
}) => {
  // Get Question
  const question = await Question.findById(questionId);

  if (!question) {
    throw new Error("Question not found");
  }

  const hiddenTestCases = question.hiddenTestCases || [];

  if (hiddenTestCases.length === 0) {
    throw new Error("No hidden test cases found");
  }

  let passed = 0;
  let failed = 0;

  let totalExecutionTime = 0;
  let maxMemory = 0;

  const results = [];

  const finalLanguage =
    languageMap[language] || language.toLowerCase();

  // Run Every Hidden Test Case
  for (const testCase of hiddenTestCases) {
    try {
      const execution = await runCode(
        finalLanguage,
        code,
        testCase.input
      );
console.log("🔥 Piston Response:");
console.log(JSON.stringify(execution, null, 2));

      const actualOutput = normalizeOutput(
        execution.run?.output ||
          execution.run?.stdout ||
          ""
      );

      const expectedOutput = normalizeOutput(
        testCase.output
      );

      const isPassed =
        actualOutput === expectedOutput;

      if (isPassed) {
        passed++;
      } else {
        failed++;
      }

      totalExecutionTime +=
        execution.run?.cpu_time || 0;

      maxMemory = Math.max(
        maxMemory,
        execution.run?.memory || 0
      );

      results.push({
        input: testCase.input,
        expectedOutput,
        actualOutput,
        passed: isPassed,
      });

    } catch (error) {
      failed++;

      results.push({
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: "",
        passed: false,
        error: error.message,
      });
    }
  }

  const total = hiddenTestCases.length;

  const score = Math.round(
    (passed / total) * question.marks
  );

  return {
    passed,
    failed,
    total,
    score,

    executionTime: totalExecutionTime,
    memoryUsed: maxMemory,

    results,
  };
};

module.exports = {
  evaluateSubmission,
};