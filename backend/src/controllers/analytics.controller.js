const Attempt = require("../models/Attempt.model");
const Assessment = require("../models/Assessment.model");
const Submission = require("../models/Submission.model");

// ====================== ASSESSMENT OVERVIEW ======================

const getAssessmentOverview = async (req, res) => {
  try {
    const { assessmentId } = req.params;

    const assessment = await Assessment.findById(assessmentId).lean();

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

// ====================== QUESTION ANALYTICS ======================

const getQuestionAnalytics = async (req, res) => {
  try {
    const { assessmentId } = req.params;

  const assessment = await Assessment.findById(assessmentId)
  .populate("questions")
  .lean();

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

// ====================== GET SUBMISSIONS ======================

const submissions = await Submission.find({
  assessment: assessmentId,
}).lean();

// NOTE:
// Current analytics are calculated from all submissions.
// This will be upgraded to use final/best submission per student.
// ====================== QUESTION ANALYTICS ======================

// TODO:
// Current analytics are based on all submissions.
// Upgrade to use the latest/final submission of each student.
// Count unique students instead of total submissions.


const questionAnalytics = assessment.questions.map((question) => {

  // All submissions for this question

  const questionSubmissions = submissions.filter(
    (submission) =>
      submission.question.toString() === question._id.toString()
  );

// Total submissions for this question

  const attempted = questionSubmissions.length;

  // Total accepted submissions

  const correct = questionSubmissions.filter(
  (submission) => submission.status === "accepted"
).length;
const accuracy =
  attempted > 0
    ? Number(((correct / attempted) * 100).toFixed(2))
    : 0;
    
const questionTotalScore = questionSubmissions.reduce(
  (sum, submission) => sum + submission.score,
  0
);

const averageScore =
  attempted > 0
    ? Number((questionTotalScore / attempted).toFixed(2))
    : 0;

  return {
  questionId: question._id,
  title: question.title,
  difficulty: question.difficulty,

  attempted,
  correct,
  accuracy,
  averageScore,
};
});

   return res.status(200).json({
  success: true,

  assessment: {
    id: assessment._id,
    title: assessment.title,
  },

  totalQuestions: assessment.questions.length,

  questionAnalytics,
});

  } catch (error) {
    console.error("❌ Question Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  getAssessmentOverview,
  getQuestionAnalytics,
};