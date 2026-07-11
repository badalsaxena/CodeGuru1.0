const mongoose = require("mongoose");

const TestCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
      trim: true,
    },
    output: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

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
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    marks: {
      type: Number,
      default: 10,
      min: 1,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    constraints: {
      type: String,
      default: "",
    },

    // Public Test Cases (Visible to Students)
    sampleTestCases: {
      type: [TestCaseSchema],
      default: [],
    },

    // Hidden Test Cases (Used for Evaluation Only)
    hiddenTestCases: {
      type: [TestCaseSchema],
      default: [],
    },

    boilerplate: {
      javascript: {
        type: String,
        default: "",
      },
      python: {
        type: String,
        default: "",
      },
      cpp: {
        type: String,
        default: "",
      },
      java: {
        type: String,
        default: "",
      },
    },

    supportedLanguages: [
      {
        type: String,
      },
    ],

    timeLimit: {
      type: Number,
      default: 1, // seconds
    },

    memoryLimit: {
      type: Number,
      default: 256, // MB
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    // ================= Question Bank =================

questionType: {
  type: String,
  enum: ["coding", "mcq", "subjective", "true_false"],
  default: "coding",
},

subject: {
  type: String,
  default: "",
  trim: true,
},

topic: {
  type: String,
  default: "",
  trim: true,
},

// MCQ Options
options: [
  {
    text: {
      type: String,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
],

// Subjective
answerKey: {
  type: String,
  default: "",
},

maxWords: {
  type: Number,
  default: 0,
},

// True / False
correctAnswer: {
  type: String,
  enum: ["true", "false", ""],
  default: "",
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