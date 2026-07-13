const Attempt = require("../models/Attempt.model");
const Assessment = require("../models/Assessment.model");

// ====================== GET LEADERBOARD ======================

const getLeaderboard = async (req, res) => {
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

// Teacher can only view their own assessment leaderboard
if (
  req.user.role === "teacher" &&
  assessment.teacher.toString() !== req.user.id
) {
  return res.status(403).json({
    success: false,
    message: "You are not authorized to view this leaderboard",
  });
}

// Student can only view published assessment leaderboard
if (
  req.user.role === "student" &&
  assessment.status !== "published"
) {
  return res.status(403).json({
    success: false,
    message: "Leaderboard is not available",
  });
}

// Admin can view everything

    const attempts = await Attempt.find({
      assessment: assessmentId,
      status: "submitted",
    }).populate("student", "fullName email");
   
    attempts.sort((a, b) => {
  // Higher score first
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  // Less completion time first
  const timeA = a.endedAt
    ? a.endedAt.getTime() - a.startedAt.getTime()
    : Number.MAX_SAFE_INTEGER;

  const timeB = b.endedAt
    ? b.endedAt.getTime() - b.startedAt.getTime()
    : Number.MAX_SAFE_INTEGER;

  if (timeA !== timeB) {
    return timeA - timeB;
  }

  // Earlier submission first
  return a.endedAt - b.endedAt;
});

      const leaderboard = attempts.map((attempt, index) => {
  const timeTaken = attempt.endedAt
    ? Math.floor((attempt.endedAt - attempt.startedAt) / 1000)
    : 0;

  const percentage =
    assessment.totalMarks > 0
      ? Number(((attempt.score / assessment.totalMarks) * 100).toFixed(2))
      : 0;

  return {
    rank: index + 1,

    student: {
      id: attempt.student._id,
      fullName: attempt.student.fullName,
      email: attempt.student.email,
    },

    score: attempt.score,
    totalMarks: assessment.totalMarks,

    percentage,

    solvedQuestions: attempt.solvedQuestions,
    totalQuestions: attempt.totalQuestions,

    timeTaken,

    submittedAt: attempt.endedAt,
  };
});

    return res.status(200).json({
      success: true,
      assessment: {
        id: assessment._id,
        title: assessment.title,
        totalMarks: assessment.totalMarks,
      },
      totalParticipants: attempts.length,
      leaderboard,
    });

  } catch (error) {
    console.error("❌ Get Leaderboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getLeaderboard,
};