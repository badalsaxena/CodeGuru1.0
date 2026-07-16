const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  getAssessmentOverview,
  getQuestionAnalytics,
  getAssessmentResults,
} = require("../controllers/analytics.controller");

// Assessment Overview
router.get("/:assessmentId/overview", verifyToken, getAssessmentOverview);

// Question Analytics
router.get("/:assessmentId/questions", verifyToken, getQuestionAnalytics);
// Assessment Results
router.get("/:assessmentId/results", verifyToken, getAssessmentResults);

module.exports = router;