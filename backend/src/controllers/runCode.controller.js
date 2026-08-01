const { runCode } = require("../services/codeExecution.service");

// ====================== RUN CODE ======================

const executeCode = async (req, res) => {
  try {
    const {
      language,
      code,
      sourceCode,
      input,
      stdin,
    } = req.body;

    // Support both field name variants from different callers
    const finalCode  = code  || sourceCode || "";
    const finalInput = input || stdin      || "";

    if (!language || !finalCode) {
      return res.status(400).json({
        success: false,
        message: "language and code are required",
      });
    }

    const result = await runCode(language, finalCode, finalInput);

    // Response shape: { success, result }
    // Frontend reads: result.run.stdout / result.run.stderr / result.compile.stdout
    return res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.error("❌ Run Code Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { executeCode };
