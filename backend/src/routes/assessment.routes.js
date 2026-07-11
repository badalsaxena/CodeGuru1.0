const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  createAssessment,
  getAllAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  addQuestionsToAssessment,
  publishAssessment,
  unpublishAssessment,
} = require("../controllers/assessment.controller");

// Create Assessment
router.post("/", verifyToken, createAssessment);

// Get All Assessments
router.get("/", verifyToken, getAllAssessments);

// Get Assessment by ID
router.get("/:id", verifyToken, getAssessmentById);
// Update Assessment
router.put("/:id", verifyToken, updateAssessment);
// Delete Assessment
router.delete("/:id", verifyToken, deleteAssessment);
// Add Questions to Assessment
router.post("/:id/questions", verifyToken, addQuestionsToAssessment);
// Publish Assessment
router.patch("/:id/publish", verifyToken, publishAssessment);
// Unpublish Assessment
router.patch("/:id/unpublish", verifyToken, unpublishAssessment);
module.exports = router;