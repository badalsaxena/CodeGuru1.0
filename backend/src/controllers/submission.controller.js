const Submission = require("../models/Submission.model");
const Attempt = require("../models/Attempt.model");
const Assessment = require("../models/Assessment.model");
const Question = require("../models/Question.model");
const { evaluateSubmission } = require("../services/evaluation.service");

// ====================== CREATE SUBMISSION ======================

const createSubmission = async (req, res) => {
  try {
    const { assessment, question, language, code } = req.body;

    if (!assessment || !question || !language || !code) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // ====================== VALIDATE ASSESSMENT ======================

const assessmentData = await Assessment.findById(assessment);

if (!assessmentData) {
  return res.status(404).json({
    success: false,
    message: "Assessment not found",
  });
}

if (assessmentData.status !== "published") {
  return res.status(400).json({
    success: false,
    message: "Assessment is not published",
  });
}

// ====================== VALIDATE QUESTION ======================

const questionData = await Question.findById(question);

if (!questionData) {
  return res.status(404).json({
    success: false,
    message: "Question not found",
  });
}

const isQuestionExists = assessmentData.questions.some(
  (q) => q.toString() === question
);

if (!isQuestionExists) {
  return res.status(400).json({
    success: false,
    message: "Question does not belong to this assessment",
  });
}

    // Evaluate against hidden test cases
    const evaluation = await evaluateSubmission({
      questionId: question,
      language,
      code,
    });

    // Decide submission status
    let submissionStatus = "wrong_answer";

    if (evaluation.passed === evaluation.total) {
      submissionStatus = "accepted";
    }

    // Save submission
    const submission = await Submission.create({
      student: req.user.id,
      assessment,
      question,
      language,
      code,

      score: evaluation.score,

      passedTestCases: evaluation.passed,
      totalTestCases: evaluation.total,

      executionTime: evaluation.executionTime,
      memoryUsed: evaluation.memoryUsed,

      status: submissionStatus,
    });

    // Update Attempt
    const attempt = await Attempt.findOne({
      student: req.user.id,
      assessment,
      status: "in_progress",
    });

    if (attempt) {
      const previousSubmissions = await Submission.find({
        _id: { $in: attempt.submissions },
      });

      const alreadySubmitted = previousSubmissions.some(
        (sub) => sub.question.toString() === question
      );

      attempt.submissions.push(submission._id);

      if (!alreadySubmitted) {
        attempt.solvedQuestions += 1;
      }

      await attempt.save();
    }

    return res.status(201).json({
      success: true,
      message: "Submission Evaluated Successfully",

      evaluation,

      submission,
    });

  } catch (error) {
    console.error("❌ Create Submission Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== GET MY SUBMISSIONS ======================

const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      student: req.user.id,
    })
      .populate("question", "title difficulty marks")
      .populate("assessment", "title")
      .sort({ createdAt: -1 });

  return res.status(200).json({
      success: true,
      count: submissions.length,
      submissions,
    });

  } catch (error) {
    console.error("❌ Get Submissions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== GET SUBMISSION BY ID ======================

const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await Submission.findById(id)
      .populate("question", "title description difficulty")
      .populate("assessment", "title")
      .populate("student", "fullName email");

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      submission,
    });

  } catch (error) {
    console.error("❌ Get Submission Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== EXPORTS ======================

module.exports = {
  createSubmission,
  getMySubmissions,
  getSubmissionById,
};