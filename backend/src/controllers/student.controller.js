const Assessment = require("../models/Assessment.model");
const Question = require("../models/Question.model");
const Attempt = require("../models/Attempt.model");
const Submission = require("../models/Submission.model");

// ====================== GET PUBLISHED ASSESSMENTS ======================

const getPublishedAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({
      status: "published",
    })
      .populate("teacher", "fullName")
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
      .populate("teacher", "fullName")
      .populate({
        path: "questions",
        select:
          "title description difficulty marks tags constraints questionType " +
          "sampleTestCases supportedLanguages boilerplate timeLimit memoryLimit " +
          "options answerKey maxWords correctAnswer",
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
    // Check existing active attempt
let attempt = await Attempt.findOne({
  assessment: assessment._id,
  student: req.user.id,
  status: "in_progress",
});

if (!attempt) {
  attempt = await Attempt.create({
    student: req.user.id,
    assessment: assessment._id,
    totalQuestions: assessment.questions.length,
    solvedQuestions: 0,
    score: 0,
    status: "in_progress",
    startedAt: new Date(),
  });
}

   res.status(200).json({
  success: true,
  message: "Assessment Started Successfully",
  assessmentId: assessment._id,
  attemptId: attempt._id,
  startTime: attempt.startedAt,
});
  } catch (error) {
    console.error("❌ Start Assessment Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ====================== SUBMIT ASSESSMENT ======================

const submitAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    const attempt = await Attempt.findOne({
      assessment: id,
      student: req.user.id,
      status: "in_progress",
    });

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "No active attempt found",
      });
    }

    const submissions = await Submission.find({
      _id: { $in: attempt.submissions },
    });

    const finalScore = submissions.reduce(
      (total, submission) => total + submission.score,
      0
    );

    attempt.score = finalScore;
    attempt.status = "submitted";
    attempt.endedAt = new Date();

    await attempt.save();

    return res.status(200).json({
      success: true,
      message: "Assessment Submitted Successfully",
      result: {
        score: attempt.score,
        solvedQuestions: attempt.solvedQuestions,
        totalQuestions: attempt.totalQuestions,
        endedAt: attempt.endedAt,
      },
    });
  } catch (error) {
    console.error("❌ Submit Assessment Error:", error);

    return res.status(500).json({
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
  submitAssessment,
};