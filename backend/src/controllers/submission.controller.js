const Submission = require("../models/Submission.model");
const Attempt = require("../models/Attempt.model");

// ====================== CREATE SUBMISSION ======================

const createSubmission = async (req, res) => {
  try {
    const { assessment, question, language, code } = req.body;

    // Validation
    if (!assessment || !question || !language || !code) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create Submission
    const submission = await Submission.create({
      student: req.user.id,
      assessment,
      question,
      language,
      code,
    });

    // Find Active Attempt
    const attempt = await Attempt.findOne({
      student: req.user.id,
      assessment,
      status: "in_progress",
    });

    if (attempt) {
      // Get previous submissions of this attempt
      const previousSubmissions = await Submission.find({
        _id: { $in: attempt.submissions },
      });

      // Check if this question was already submitted
      const alreadySubmitted = previousSubmissions.some(
        (sub) => sub.question.toString() === question
      );

      // Always save submission reference
      attempt.submissions.push(submission._id);

      // Increase solvedQuestions only once per unique question
      if (!alreadySubmitted) {
        attempt.solvedQuestions += 1;
      }

      await attempt.save();
    }

    res.status(201).json({
      success: true,
      message: "Submission Created Successfully",
      submission,
    });

  } catch (error) {
    console.error("❌ Create Submission Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
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

    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions,
    });

  } catch (error) {
    console.error("❌ Get Submissions Error:", error);

    res.status(500).json({
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

    res.status(200).json({
      success: true,
      submission,
    });

  } catch (error) {
    console.error("❌ Get Submission Error:", error);

    res.status(500).json({
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