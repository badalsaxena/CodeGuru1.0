const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    // Student who submitted
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Assessment
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },

    // Question
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    // Question type at time of submission (snapshot)
    questionType: {
      type: String,
      enum: ["coding", "mcq", "subjective", "true_false"],
      default: "coding",
    },

    // Programming Language — only required for coding questions
    language: {
      type: String,
      enum: ["javascript", "python", "java", "c++", ""],
      default: "",
    },

    // Student Code — only for coding questions
    code: {
      type: String,
      default: "",
    },

    // Student Answer — for MCQ, subjective, true_false
    answer: {
      type: String,
      default: "",
    },

    // Selected option index — for MCQ display purposes
    selectedIndex: {
      type: Number,
      default: null,
    },

    // Submission Status
    status: {
      type: String,
      enum: [
        "pending",
        "running",
        "accepted",
        "wrong_answer",
        "runtime_error",
        "compile_error",
      ],
      default: "pending",
    },

    // Marks Obtained
    score: {
      type: Number,
      default: 0,
    },

    // Test Cases
    passedTestCases: {
      type: Number,
      default: 0,
    },

    totalTestCases: {
      type: Number,
      default: 0,
    },

    // Execution Time
    executionTime: {
      type: Number,
      default: 0,
    },

    // Memory Used
    memoryUsed: {
      type: Number,
      default: 0,
    },
        // ---------------- Judge0 ----------------

    judge0Token: {
      type: String,
      default: "",
    },

    stdout: {
      type: String,
      default: "",
    },

    stderr: {
      type: String,
      default: "",
    },

    compilerOutput: {
      type: String,
      default: "",
    },

    // Final Submission
    isFinalSubmission: {
      type: Boolean,
      default: false,
    },

    // Last Run Output
    lastRunStatus: {
      type: String,
      default: "",
    },

    lastRunOutput: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionSchema);