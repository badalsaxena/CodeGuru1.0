const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    // Student
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

    // Assessment Start Time
    startedAt: {
      type: Date,
      default: Date.now,
    },

    // Assessment End Time
    endedAt: {
      type: Date,
    },

    // Attempt Status
    status: {
      type: String,
      enum: ["in_progress", "submitted", "expired"],
      default: "in_progress",
    },

    // Final Score
    score: {
      type: Number,
      default: 0,
    },

    // Total Questions
    totalQuestions: {
      type: Number,
      default: 0,
    },

    // Solved Questions
    solvedQuestions: {
      type: Number,
      default: 0,
    },

    // Submission References
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],

    // Anti-Cheating (Future)
    tabSwitchCount: {
      type: Number,
      default: 0,
    },

    copyPasteCount: {
      type: Number,
      default: 0,
    },

    fullScreenViolations: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attempt", attemptSchema);