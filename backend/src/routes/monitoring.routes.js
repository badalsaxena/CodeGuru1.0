const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  logMonitoringEvent,
  registerReferenceFace,
} = require("../controllers/monitoring.controller");
  
//==============================
// Log Monitoring Events
// (Tab Switch, Copy, Paste, AI Events)
//==============================
router.post(
  "/event",
  verifyToken,
  logMonitoringEvent
);

// ======================================
// Register Reference Face
// ======================================

router.post(
  "/reference-face",
  verifyToken,
  registerReferenceFace
);

module.exports = router;