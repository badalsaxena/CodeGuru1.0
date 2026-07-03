const Question = require("../models/Question.model");

// ====================== CREATE QUESTION ======================

const createQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      marks,
      tags,
      constraints,
      sampleTestCases,
      hiddenTestCases,
      boilerplate,
      supportedLanguages,
      timeLimit,
      memoryLimit,
      status,
    } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required",
      });
    }

    const question = await Question.create({
      title,
      description,
      difficulty,
      marks,
      tags,
      constraints,
      sampleTestCases,
      hiddenTestCases,
      boilerplate,
      supportedLanguages,
      timeLimit,
      memoryLimit,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Question Created Successfully",
      question,
    });

  } catch (error) {
    console.error("❌ Create Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== GET ALL QUESTIONS ======================

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });

  } catch (error) {
    console.error("❌ Get Questions Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== GET QUESTION BY ID ======================

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });

  } catch (error) {
    console.error("❌ Get Question By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== UPDATE QUESTION ======================

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Ownership Check
    if (question.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this question",
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Question Updated Successfully",
      question: updatedQuestion,
    });

  } catch (error) {
    console.error("❌ Update Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== DELETE QUESTION ======================

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Ownership Check
    if (question.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this question",
      });
    }

    await Question.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Question Deleted Successfully",
    });

  } catch (error) {
    console.error("❌ Delete Question Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};