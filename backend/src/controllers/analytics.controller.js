const Attempt = require("../models/Attempt.model");
const Assessment = require("../models/Assessment.model");

// ====================== ASSESSMENT OVERVIEW ======================

const getAssessmentOverview = async (req, res) => {
  try {
    const { assessmentId } = req.params;

    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }
    // ====================== ACCESS CONTROL ======================

// Students are not allowed
if (req.user.role === "student") {
  return res.status(403).json({
    success: false,
    message: "Students are not authorized to view analytics",
  });
}

// Teacher can view only their own assessment
if (
  req.user.role === "teacher" &&
  assessment.teacher.toString() !== req.user.id
) {
  return res.status(403).json({
    success: false,
    message: "You are not authorized to view this analytics",
  });
}

// Admin can view everything

// ====================== GET SUBMITTED ATTEMPTS ======================

const attempts = await Attempt.find({
  assessment: assessmentId,
  status: "submitted",
})
.select("student score startedAt endedAt")
.lean();
// ====================== CALCULATE OVERVIEW ======================


const submitted = attempts.length;

// Currently only submitted attempts are tracked.
// Update this when assigned/enrolled students feature is implemented.
const totalStudents = submitted;
const pending = 0;
const highestScore =
  attempts.length > 0
    ? Math.max(...attempts.map((attempt) => attempt.score))
    : 0;

const lowestScore =
  attempts.length > 0
    ? Math.min(...attempts.map((attempt) => attempt.score))
    : 0;

const totalScore = attempts.reduce(
  (sum, attempt) => sum + attempt.score,
  0
);

const averageScore =
  submitted > 0
    ? Number((totalScore / submitted).toFixed(2))
    : 0;

// Passing Criteria = 40%
const passedStudents = attempts.filter(
  (attempt) => attempt.score >= assessment.totalMarks * 0.4
).length;

const passPercentage =
  submitted > 0
    ? Number(((passedStudents / submitted) * 100).toFixed(2))
    : 0;

return res.status(200).json({
  success: true,

  assessment: {
    id: assessment._id,
    title: assessment.title,
    totalMarks: assessment.totalMarks,
  },

  overview: {
    totalStudents,
    submitted,
    pending,
    highestScore,
    lowestScore,
    averageScore,
    passPercentage,
  },
});

  } catch (error) {
    console.error("❌ Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAssessmentOverview,
};