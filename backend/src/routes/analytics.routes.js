const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  getAssessmentOverview,
} = require("../controllers/analytics.controller");

// Assessment Overview
router.get("/:assessmentId/overview", verifyToken, getAssessmentOverview);

module.exports = router;