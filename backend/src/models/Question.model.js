const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    marks: {
      type: Number,
      default: 10,
    },

    tags: [
      {
        type: String,
      },
    ],

    constraints: {
      type: String,
    },

    sampleTestCases: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],

    hiddenTestCases: [
      {
        input: String,
        output: String,
      },
    ],

    boilerplate: {
      javascript: String,
      python: String,
      cpp: String,
      java: String,
    },

    supportedLanguages: [
      {
        type: String,
      },
    ],

    timeLimit: {
      type: Number,
      default: 1,
    },

    memoryLimit: {
      type: Number,
      default: 256,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);