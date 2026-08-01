const Submission = require("../models/Submission.model");
const Attempt = require("../models/Attempt.model");
const Assessment = require("../models/Assessment.model");
const Question = require("../models/Question.model");
const { evaluateSubmission } = require("../services/evaluation.service");

// ====================== CREATE SUBMISSION ======================

const createSubmission = async (req, res) => {
  try {
    const {
      assessment,
      question,
      // coding
      language,
      code,
      // mcq / subjective / true_false
      answer,
      selectedIndex,
    } = req.body;

    // ── Basic field validation ────────────────────────────────
    if (!assessment || !question) {
      return res.status(400).json({
        success: false,
        message: "assessment and question are required",
      });
    }

    // ── Validate assessment ───────────────────────────────────
    const assessmentData = await Assessment.findById(assessment);
    if (!assessmentData) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }
    if (assessmentData.status !== "published") {
      return res.status(400).json({ success: false, message: "Assessment is not published" });
    }

    // ── Validate question belongs to assessment ───────────────
    const questionData = await Question.findById(question);
    if (!questionData) {
      return res.status(404).json({ success: false, message: "Question not found" });
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

    const questionType = questionData.questionType || "coding";

    // ── Route by question type ────────────────────────────────

    // ── CODING ───────────────────────────────────────────────
    if (questionType === "coding") {
      if (!language || !code) {
        return res.status(400).json({
          success: false,
          message: "language and code are required for coding questions",
        });
      }

      const evaluation = await evaluateSubmission({ questionId: question, language, code });

      const submissionStatus =
        evaluation.passed === evaluation.total ? "accepted" : "wrong_answer";

      const submission = await Submission.create({
        student:       req.user.id,
        assessment,
        question,
        questionType,
        language,
        code,
        score:          evaluation.score,
        passedTestCases: evaluation.passed,
        totalTestCases:  evaluation.total,
        executionTime:   evaluation.executionTime,
        memoryUsed:      evaluation.memoryUsed,
        status:          submissionStatus,
      });

      await _updateAttempt(req.user.id, assessment, question, submission._id);

      return res.status(201).json({
        success: true,
        message: "Submission Evaluated Successfully",
        evaluation,
        submission,
      });
    }

    // ── MCQ ──────────────────────────────────────────────────
    if (questionType === "mcq") {
      if (answer === undefined || answer === null || answer === "") {
        return res.status(400).json({
          success: false,
          message: "answer is required for MCQ questions",
        });
      }

      // Find the correct option
      const correctOption = (questionData.options || []).find((o) => o.isCorrect);
      const isCorrect = correctOption && correctOption.text === answer;
      const score = isCorrect ? questionData.marks : 0;

      const submission = await Submission.create({
        student:      req.user.id,
        assessment,
        question,
        questionType,
        answer,
        selectedIndex: selectedIndex ?? null,
        score,
        status:       isCorrect ? "accepted" : "wrong_answer",
        passedTestCases: isCorrect ? 1 : 0,
        totalTestCases:  1,
      });

      await _updateAttempt(req.user.id, assessment, question, submission._id);

      return res.status(201).json({
        success: true,
        message: isCorrect ? "Correct Answer!" : "Wrong Answer",
        isCorrect,
        score,
        submission,
      });
    }

    // ── TRUE / FALSE ─────────────────────────────────────────
    if (questionType === "true_false") {
      if (!answer) {
        return res.status(400).json({
          success: false,
          message: "answer is required for True/False questions",
        });
      }

      const isCorrect =
        answer.toLowerCase() === (questionData.correctAnswer || "").toLowerCase();
      const score = isCorrect ? questionData.marks : 0;

      const submission = await Submission.create({
        student:      req.user.id,
        assessment,
        question,
        questionType,
        answer,
        score,
        status:          isCorrect ? "accepted" : "wrong_answer",
        passedTestCases: isCorrect ? 1 : 0,
        totalTestCases:  1,
      });

      await _updateAttempt(req.user.id, assessment, question, submission._id);

      return res.status(201).json({
        success: true,
        message: isCorrect ? "Correct Answer!" : "Wrong Answer",
        isCorrect,
        score,
        submission,
      });
    }

    // ── SUBJECTIVE ───────────────────────────────────────────
    if (questionType === "subjective") {
      if (!answer || !answer.trim()) {
        return res.status(400).json({
          success: false,
          message: "answer is required for subjective questions",
        });
      }

      // Subjective: auto-pending, teacher reviews manually
      const submission = await Submission.create({
        student:      req.user.id,
        assessment,
        question,
        questionType,
        answer,
        score:           0,
        status:          "pending",
        passedTestCases: 0,
        totalTestCases:  0,
      });

      await _updateAttempt(req.user.id, assessment, question, submission._id);

      return res.status(201).json({
        success: true,
        message: "Answer submitted. Awaiting review.",
        submission,
      });
    }

    // ── Unknown type ─────────────────────────────────────────
    return res.status(400).json({
      success: false,
      message: `Unsupported question type: ${questionType}`,
    });

  } catch (error) {
    console.error("❌ Create Submission Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ── Helper: update the in-progress attempt ───────────────────────────────────
const _updateAttempt = async (studentId, assessmentId, questionId, submissionId) => {
  try {
    const attempt = await Attempt.findOne({
      student:    studentId,
      assessment: assessmentId,
      status:     "in_progress",
    });
    if (!attempt) return;

    const previousSubmissions = await Submission.find({
      _id: { $in: attempt.submissions },
    });
    const alreadySubmitted = previousSubmissions.some(
      (sub) => sub.question.toString() === questionId.toString()
    );

    attempt.submissions.push(submissionId);
    if (!alreadySubmitted) attempt.solvedQuestions += 1;
    await attempt.save();
  } catch (err) {
    console.warn("⚠️  Attempt update failed:", err.message);
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