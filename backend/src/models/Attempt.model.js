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

    // Browser Monitoring
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

// ==============================
// AI Event Counters
// ==============================

noFaceCount: {
  type: Number,
  default: 0,
},

multipleFaceCount: {
  type: Number,
  default: 0,
},

lookingAwayCount: {
  type: Number,
  default: 0,
},

identityMismatchCount: {
  type: Number,
  default: 0,
},

voiceDetectedCount: {
  type: Number,
  default: 0,
},

// ==============================
// Monitoring Summary
// ==============================

// Total Warnings
warningCount: {
  type: Number,
  default: 0,
},

// Student Integrity Score
integrityScore: {
  type: Number,
  default: 100,
},

// Risk Level
riskLevel: {
  type: String,
  enum: ["Safe", "Low", "Medium", "High"],
  default: "Safe",
},

// Auto Block Status
isBlocked: {
  type: Boolean,
  default: false,
},

// Block Timestamp
blockedAt: {
  type: Date,
  default: null,
},

// Initial Face Registered
referenceFaceCaptured: {
  type: Boolean,
  default: false,
},


// Reference Face Data
referenceFace: {
  format: {
    type: String,
    enum: ["image", "embedding"],
    default: "image",
  },

  value: {
    type: String,
    default: null,
  },

  capturedAt: {
    type: Date,
    default: null,
  },
},

// Last Monitoring Event
lastMonitoringEvent: {
  type: String,
  enum: [
    "TAB_SWITCH",
    "COPY",
    "PASTE",
    "FULLSCREEN_EXIT",
    "NO_FACE",
    "MULTIPLE_FACE",
    "LOOKING_AWAY",
    "IDENTITY_MISMATCH",
    "VOICE_DETECTED",
  ],
  default: null,
},

// AI Monitoring Event Logs
monitoringLogs: [
  {
    eventType: {
      type: String,
      enum: [
        "TAB_SWITCH",
        "COPY",
        "PASTE",
        "FULLSCREEN_EXIT",
        "NO_FACE",
        "MULTIPLE_FACE",
        "LOOKING_AWAY",
        "IDENTITY_MISMATCH",
        "VOICE_DETECTED",
      ],
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Attempt", attemptSchema);