import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StudentDashboardCards from "@/components/dashboard/StudentDashboardCards";
import StudentExams from "@/components/dashboard/StudentExams";
import PracticeProblems from "@/components/dashboard/PracticeProblems";
import LeaderboardPanel from "@/components/dashboard/LeaderboardPanel";
import ProgressCharts from "@/components/dashboard/ProgressCharts";
import StudentSettings from "@/components/dashboard/StudentSettings";
import StudentNotifications from "@/components/dashboard/StudentNotifications";
import AssessmentSession from "@/components/assessment/AssessmentSession";
import { getStudentAssessments, startAssessment, getStudentAssessmentById } from "@/services/studentService";
import { getQuestions } from "@/services/questionService";
import { getLeaderboard } from "@/services/leaderboardService";
import {
  studentStats,
  progressSeries,
  topicPerformance,
  notifications,
  studentProfile,
  studentNavItems,
} from "@/data/studentData";
import { Loader2 } from "lucide-react";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

const StudentPage = () => {
  const token = localStorage.getItem("token");
  const user = getStoredUser();
  const isStudent = Boolean(token && user?.role === "student");

  const [activeSection, setActiveSection] = useState("dashboard");

  // Real data from backend
  const [exams, setExams] = useState([]);
  const [examsLoading, setExamsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Code editor state
  const [editorQuestion, setEditorQuestion] = useState(null);
  const [editorAssessmentId, setEditorAssessmentId] = useState(null);

  const [assessment, setAssessment] = useState(null);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [attemptId, setAttemptId] = useState(null);
const [startTime, setStartTime] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  // ── Fetch real published assessments ──────────────────────────
  const fetchExams = useCallback(async () => {
    if (!isStudent) return;

    try {
      setExamsLoading(true);
      const data = await getStudentAssessments();
      const assessments = data.assessments || [];
      setExams(assessments);

      if (assessments[0]?._id) {
        try {
          const leaderboardResponse = await getLeaderboard(assessments[0]._id);
          console.log("Leaderboard Response:", leaderboardResponse);
          setLeaderboardData(
            (leaderboardResponse.leaderboard || []).map((entry) => ({
              rank: entry.rank,
              name: entry.student?.fullName || "Student",
              solved: `${entry.solvedQuestions}/${entry.totalQuestions}`,
              accuracy: `${entry.percentage}%`,
              score: `${entry.score}/${entry.totalMarks}`,
              badge:
                entry.percentage >= 90
                  ? "Elite"
                  : entry.percentage >= 75
                    ? "Pro"
                    : "Rising",
            }))
          );
        } catch (err) {
          console.error("Failed to load leaderboard:", err);
          setLeaderboardData([]);
        }
      } else {
        setLeaderboardData([]);
      }
    } catch (err) {
      console.error("Failed to load exams:", err);
      setExams([]);
      setLeaderboardData([]);
    } finally {
      setExamsLoading(false);
    }
  }, [isStudent]);

  // ── Fetch practice problems (questions) ────────────────────────
  const fetchQuestions = useCallback(async () => {
    if (!isStudent) return;

    try {
      const data = await getQuestions();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Failed to load questions:", err);
    }
  }, [isStudent]);

  useEffect(() => {
    fetchExams();
    fetchQuestions();
  }, [fetchExams, fetchQuestions]);

const dashboardStats = studentStats.map((card) => {
  switch (card.title) {
    case "Total Exams Attempted":
      return {
        ...card,
        value: exams.length,
      };

    case "Problems Solved":
      return {
        ...card,
        value: questions.length,
      };

    case "Current Rank": {
      const userEntry = leaderboardData.find((entry) => entry.name === "You");
      const firstEntry = leaderboardData[0];
      return {
        ...card,
        value: userEntry ? `#${userEntry.rank}` : firstEntry ? `#${firstEntry.rank}` : "-",
      };
    }

    default:
      return card;
  }
});

  const handleStartExam = async (exam) => {
    if (!exam?._id) {
      alert("Assessment ID is missing.");
      return;
    }

    if ((exam.questions?.length || 0) === 0) {
      alert("This assessment has no questions yet.");
      return;
    }

    try {
  const startData = await startAssessment(exam._id);
  const newAttemptId = startData?.attemptId;

  if (!newAttemptId) {
    throw new Error("Attempt ID was not returned by backend.");
  }

  setAttemptId(newAttemptId);
  setStartTime(startData?.startTime);

  const data = await getStudentAssessmentById(exam._id);
      const assessment = data.assessment;
      const firstQuestion = assessment?.questions?.[0];
      setAssessment(assessment);
setCurrentQuestionIndex(0);
      

      if (!firstQuestion?._id) {
        alert("Unable to load questions for this assessment.");
        return;
      }

      setEditorQuestion(firstQuestion);
      setEditorAssessmentId(assessment._id);
    } catch (err) {
  if (err?.response?.status === 403) {
    alert(
      err?.response?.data?.message ||
      "You cannot retake an assessment that was blocked."
    );
    return;
  }

  alert(getErrorMessage(err, "Failed to start assessment."));
}
  };

  if (!isStudent) {
    return null;
  }

  // If assessment is active, launch AssessmentSession (supports all question types)
  if (editorQuestion) {
    return (
      <AssessmentSession
        assessment={assessment}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setEditorQuestion={setEditorQuestion}
        assessmentId={editorAssessmentId}
        attemptId={attemptId}
        startTime={startTime}
        onBack={() => {
          setEditorQuestion(null);
          setEditorAssessmentId(null);
          setAssessment(null);
          setCurrentQuestionIndex(0);
        }}
      />
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "exams":
        return examsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          </div>
        ) : (
          <StudentExams
            exams={exams}
            onStartExam={handleStartExam}
          />
        );

      case "practice":
        return (
          <PracticeProblems
            problems={questions.map((q) => ({
              ...q,
              id: q._id,
              onSolve: () => {
                setEditorQuestion(q);
                setEditorAssessmentId(null);
              },
            }))}
          />
        );

      case "leaderboard":
        return <LeaderboardPanel leaderboard={leaderboardData} />;

      case "settings":
        return <StudentSettings profile={{ ...studentProfile, fullName: user?.fullName || studentProfile.fullName, email: user?.email || studentProfile.email }} />;

      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Learning overview</p>
              <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Welcome, {user?.fullName?.split(" ")[0] || "Student"}! 🎯
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                    You have {exams.length} exam{exams.length !== 1 ? "s" : ""} available and {questions.length} practice problems. Keep building momentum!
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  <p className="font-semibold">Next milestone</p>
                  <p className="mt-1 text-zinc-300">Complete 2 more problems to unlock your next badge</p>
                </div>
              </div>
            </div>

          <StudentDashboardCards stats={dashboardStats} />

            <ProgressCharts series={progressSeries} topicPerformance={topicPerformance} breakdown={[]} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.18),transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#020617_100%)] p-4 text-zinc-100 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} navItems={studentNavItems} />
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <Header
              title="Student Dashboard"
              subtitle={`Logged in as ${user?.email || "student"}`}
              user={user}
              notifications={notifications}
            />
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StudentPage;
