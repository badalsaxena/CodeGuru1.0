const express = require("express");

const {
  startAttempt,
  getMyAttempts,
  submitAttempt,
} = require("../controllers/attempt.controller");

const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

// ====================== ATTEMPT ROUTES ======================

// Start Assessment Attempt
router.post("/start", verifyToken, startAttempt);

// Get My Attempts
router.get("/", verifyToken, getMyAttempts);

// Submit Attempt
router.put("/:id/submit", verifyToken, submitAttempt);

module.exports = router;