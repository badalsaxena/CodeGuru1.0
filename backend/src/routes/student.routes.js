const express = require("express");

const {
  getPublishedAssessments,
  getStudentAssessmentById,
  startAssessment,
} = require("../controllers/student.controller");

const verifyToken = require("../middleware/auth.middleware");

const router = express.Router();

// ====================== STUDENT ROUTES ======================

// Get all published assessments
router.get("/assessments", verifyToken, getPublishedAssessments);

// Get assessment details by ID
router.get("/assessments/:id", verifyToken, getStudentAssessmentById);

// Start assessment
router.post("/assessments/:id/start", verifyToken, startAssessment);

module.exports = router;