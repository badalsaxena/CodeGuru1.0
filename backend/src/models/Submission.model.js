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

    // Programming Language
    language: {
      type: String,
      enum: ["JavaScript", "Python", "Java", "C++"],
      required: true,
    },

    // Student Code
    code: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionSchema);