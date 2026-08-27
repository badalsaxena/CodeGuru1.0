const mongoose = require("mongoose");
const Attempt = require("../models/Attempt.model");
const monitoringService = require("../services/monitoring.service");

// ======================================
// Log Monitoring Events
// (Tab Switch, Copy, Paste, AI Events)
// ======================================

const logMonitoringEvent = async (req, res) => {
  try {
    const { attemptId, eventType, metadata } = req.body;
    // Validate Request
    if (!attemptId || !eventType) {
      return res.status(400).json({
        success: false,
        message: "Attempt ID and Event Type are required",
      });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(attemptId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Attempt ID",
      });
    }

 // Find Student Attempt

 const attempt = await Attempt.findById(attemptId);

if (!attempt) {
  return res.status(404).json({
    success: false,
    message: "Attempt not found",
  });
}

    // Save Monitoring Event
    attempt.monitoringLogs.push({
      eventType,
      metadata,
    });

    // Update Last Monitoring Event
    attempt.lastMonitoringEvent = eventType;

    // Process Monitoring Logic
    // (Counters, Warnings, Integrity Score, Risk Level)
    monitoringService.processMonitoringEvent(attempt, eventType);

    // Save Changes
    await attempt.save();

    return res.status(200).json({
      success: true,
      message: "Monitoring event logged successfully",
    });

  } catch (error) {
    console.error("❌ Monitoring Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Register Reference Face
// (Capture Student Face Before Exam)
// ======================================

const registerReferenceFace = async (req, res) => {
  try {
    const { attemptId, format, value } = req.body;

    // Validate Request
    if (!attemptId || !value) {
      return res.status(400).json({
        success: false,
        message: "Attempt ID and reference face are required",
      });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(attemptId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Attempt ID",
      });
    }

    // Find Student Attempt
    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found",
      });
    }

    // Save Reference Face
    attempt.referenceFaceCaptured = true;

    attempt.referenceFace = {
      format: format || "image",
      value,
      capturedAt: new Date(),
    };

    // Save Changes
    await attempt.save();

    return res.status(200).json({
  success: true,
  message: "Monitoring event logged successfully",
  data: {
    warningCount: attempt.warningCount,
    integrityScore: attempt.integrityScore,
    riskLevel: attempt.riskLevel,
    isBlocked: attempt.isBlocked,
    tabSwitchCount: attempt.tabSwitchCount,
    copyPasteCount: attempt.copyPasteCount,
    fullScreenViolations: attempt.fullScreenViolations,
    noFaceCount: attempt.noFaceCount,
    multipleFaceCount: attempt.multipleFaceCount,
    lookingAwayCount: attempt.lookingAwayCount,
    identityMismatchCount: attempt.identityMismatchCount,
    voiceDetectedCount: attempt.voiceDetectedCount,
  },
});

  } catch (error) {
    console.error("❌ Reference Face Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// Export Controllers
// ======================================

module.exports = {
  logMonitoringEvent,
  registerReferenceFace,
};