const Attempt = require("../models/Attempt.model");
const Assessment = require("../models/Assessment.model");

// ====================== START ATTEMPT ======================

const startAttempt = async (req, res) => {
  try {
    const { assessmentId } = req.body;

    // Validate Assessment ID
    if (!assessmentId) {
      return res.status(400).json({
        success: false,
        message: "Assessment ID is required",
      });
    }

    // Check Assessment
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    // =====================================================
    // 🚫 CHECK BLOCKED ATTEMPT
    // =====================================================

    const blockedAttempt = await Attempt.findOne({
      student: req.user.id,
      assessment: assessmentId,
      isBlocked: true,
    });

    console.log("========== BLOCK CHECK ==========");
    console.log("Student:", req.user.id);
    console.log("Assessment:", assessmentId);
    console.log("Blocked Attempt Found:", blockedAttempt);
    console.log("=================================");

    if (blockedAttempt) {
      return res.status(403).json({
        success: false,
        message: "You cannot retake an assessment that was blocked.",
      });
    }

    // =====================================================
    // CHECK ACTIVE ATTEMPT
    // =====================================================

    const existingAttempt = await Attempt.findOne({
      student: req.user.id,
      assessment: assessmentId,
      status: "in_progress",
    });

    if (existingAttempt) {
      return res.status(400).json({
        success: false,
        message:
          "You already have an active attempt for this assessment",
      });
    }

    // =====================================================
    // CREATE NEW ATTEMPT
    // =====================================================

    const attempt = await Attempt.create({
      student: req.user.id,
      assessment: assessmentId,
      totalQuestions: assessment.questions.length,
    });

    return res.status(201).json({
      success: true,
      message: "Assessment Attempt Started",
      attempt,
    });

  } catch (error) {
    console.error("❌ Start Attempt Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== GET MY ATTEMPTS ======================

const getMyAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({
      student: req.user.id,
    })
      .populate("assessment", "title duration totalMarks")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts,
    });

  } catch (error) {
    console.error("❌ Get Attempts Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== SUBMIT ATTEMPT ======================

const submitAttempt = async (req, res) => {
  try {
    const { id } = req.params;

    const attempt = await Attempt.findById(id);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found",
      });
    }

    // Ownership Check
    if (attempt.student.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    attempt.status = "submitted";
    attempt.endedAt = new Date();

    await attempt.save();

    res.status(200).json({
      success: true,
      message: "Assessment Submitted Successfully",
      attempt,
    });

  } catch (error) {
    console.error("❌ Submit Attempt Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ====================== EXPORTS ======================

module.exports = {
  startAttempt,
  getMyAttempts,
  submitAttempt,
};