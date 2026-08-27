const Attempt = require("../models/Attempt.model");

// ==============================
// Monitoring Rules
// ==============================

const WARNING_RULES = {
  TAB_SWITCH: 1,
  COPY: 1,
  PASTE: 1,
  FULLSCREEN_EXIT: 1,

  NO_FACE: 2,
  MULTIPLE_FACE: 2,
  LOOKING_AWAY: 3,
  IDENTITY_MISMATCH: 3,
  VOICE_DETECTED: 2,
  TALKING: 2,
  PHONE_DETECTED: 3,
};

// ==============================
// Critical Violation Limits
// ==============================

const CRITICAL_LIMITS = {};
const MAX_WARNINGS = 10;


// ==============================
// Event Groups
// ==============================

const BROWSER_EVENTS = [
  "TAB_SWITCH",
  "COPY",
  "PASTE",
  "FULLSCREEN_EXIT",
];

const AI_EVENTS = [
  "NO_FACE",
  "MULTIPLE_FACE",
  "LOOKING_AWAY",
  "IDENTITY_MISMATCH",
  "VOICE_DETECTED",
  "TALKING",
  "PHONE_DETECTED",
];

const WARNING_EVENTS = [
  ...BROWSER_EVENTS,
  ...AI_EVENTS,
];

class MonitoringService {

  async startMonitoring(attemptId) {
    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      throw new Error("Attempt not found");
    }

    if (attempt.isBlocked) {
      throw new Error("Student is already blocked");
    }

    attempt.warningCount = 0;
    attempt.integrityScore = 100;
    attempt.riskLevel = "Safe";
    attempt.monitoringLogs = [];

    await attempt.save();

    return attempt;
  }



  // ==============================
  // Update Event Counters
  // ==============================

  updateEventCounters(attempt, eventType) {

    switch (eventType) {

      case "TAB_SWITCH":
        attempt.tabSwitchCount += 1;
        break;

      case "COPY":
      case "PASTE":
        attempt.copyPasteCount += 1;
        break;

      case "FULLSCREEN_EXIT":
       attempt.fullScreenViolations += 1;
       break;

// AI Events
case "NO_FACE":
  attempt.noFaceCount += 1;
  break;

case "MULTIPLE_FACE":
  attempt.multipleFaceCount += 1;
  break;

case "LOOKING_AWAY":
  attempt.lookingAwayCount += 1;
  break;

case "IDENTITY_MISMATCH":
  attempt.identityMismatchCount += 1;
  break;

case "VOICE_DETECTED":
  attempt.voiceDetectedCount += 1;
  break;

      default:
        break;
    }

    return attempt;
  }

// ==============================
// Add Warning
// ==============================

addWarning(attempt, warning = 1) {

  attempt.warningCount += warning;

  return attempt;
}

// ==============================
// Calculate Integrity Score
// ==============================

calculateIntegrityScore(attempt) {

  const score = 100 - (attempt.warningCount * 5);

  attempt.integrityScore = Math.max(score, 0);

  return attempt;
}


// ==============================
// Monitoring Logger
// ==============================

logMonitoring(attempt, eventType) {

  console.log("========== Monitoring ==========");
  console.log("Event :", eventType);
  console.log("Warnings :", attempt.warningCount);
  console.log("Integrity :", attempt.integrityScore);
  console.log("Risk :", attempt.riskLevel);
  console.log("Blocked :", attempt.isBlocked);
  console.log("===============================");
}

// ==============================
// Process Monitoring Event
// ==============================

processMonitoringEvent(attempt, eventType) {

  // Update Event Counters
  this.updateEventCounters(attempt, eventType);

  // Check Critical Violations
  this.checkCriticalViolations(attempt, eventType);

  // Stop further processing if blocked

  if (attempt.isBlocked) {

    this.logMonitoring(attempt, eventType);

    return attempt;
}

  // Add Warning
  if (WARNING_EVENTS.includes(eventType)) {

    this.addWarning(attempt, WARNING_RULES[eventType]);

    this.calculateIntegrityScore(attempt);

    this.updateRiskLevel(attempt);

    this.autoBlockStudent(attempt);
  }

  this.logMonitoring(attempt, eventType);

return attempt;
}

// ==============================
// Check Critical Violations
// ==============================

checkCriticalViolations(attempt, eventType) {
  // Critical violation limits are currently disabled.
  // Assessment is blocked only when warningCount reaches MAX_WARNINGS.

  return attempt;
}

// ==============================
// Update Risk Level
// ==============================

updateRiskLevel(attempt) {

  const score = attempt.integrityScore;

  if (score >= 80) {
    attempt.riskLevel = "Safe";
  }
  else if (score >= 60) {
    attempt.riskLevel = "Low";
  }
  else if (score >= 40) {
    attempt.riskLevel = "Medium";
  }
  else {
    attempt.riskLevel = "High";
  }

  return attempt;
}

// ==============================
// Block Student
// ==============================

blockStudent(attempt) {

  if (!attempt.isBlocked) {
    attempt.isBlocked = true;
    attempt.blockedAt = new Date();
    attempt.status = "blocked";
  }

  return attempt;
}

// ==============================
// Auto Block Student
// ==============================

autoBlockStudent(attempt) {

  if (attempt.warningCount >= MAX_WARNINGS) {
    this.blockStudent(attempt);
  }

  return attempt;
}

}

module.exports = new MonitoringService();