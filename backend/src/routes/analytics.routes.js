const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  getAssessmentOverview,
  getQuestionAnalytics,
} = require("../controllers/analytics.controller");

// Assessment Overview
router.get("/:assessmentId/overview", verifyToken, getAssessmentOverview);

// Question Analytics
router.get("/:assessmentId/questions", verifyToken, getQuestionAnalytics);

module.exports = router;