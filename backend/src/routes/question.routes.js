const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
} = require("../controllers/question.controller");

// Create Question
router.post("/", verifyToken, createQuestion);
//Get All Questions
router.get("/", verifyToken, getAllQuestions);
//Get Question by ID
router.get("/:id", verifyToken, getQuestionById);
//Update Question
router.put("/:id", verifyToken, updateQuestion);
//Delete Question
router.delete("/:id", verifyToken, deleteQuestion);

module.exports = router;