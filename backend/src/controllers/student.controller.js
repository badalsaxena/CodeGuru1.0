const Assessment = require("../models/Assessment.model");
const Question = require("../models/Question.model");

// ====================== GET PUBLISHED ASSESSMENTS ======================

const getPublishedAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({
      status: "published",
    })
      .populate("teacher", "fullName email")
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assessments.length,
      assessments,
    });
  } catch (error) {
    console.error("❌ Get Published Assessments Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== GET STUDENT ASSESSMENT BY ID ======================

const getStudentAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findOne({
      _id: id,
      status: "published",
    })
      .populate("teacher", "fullName email")
      .populate({
        path: "questions",
        select:
          "title description difficulty marks tags sampleTestCases supportedLanguages boilerplate timeLimit memoryLimit",
      });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      assessment,
    });
  } catch (error) {
    console.error("❌ Get Student Assessment Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== START ASSESSMENT ======================

const startAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findOne({
      _id: id,
      status: "published",
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assessment Started Successfully",
      assessmentId: assessment._id,
      startTime: new Date(),
    });
  } catch (error) {
    console.error("❌ Start Assessment Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== EXPORTS ======================

module.exports = {
  getPublishedAssessments,
  getStudentAssessmentById,
  startAssessment,
};