const express = require("express");

const {
  createSubmission,
  getMySubmissions,
  getSubmissionById,
} = require("../controllers/submission.controller");

const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

// ====================== SUBMISSION ROUTES ======================

// Create Submission
router.post("/", verifyToken, createSubmission);

// Get My Submissions
router.get("/", verifyToken, getMySubmissions);

// Get Submission By ID
router.get("/:id", verifyToken, getSubmissionById);

module.exports = router;