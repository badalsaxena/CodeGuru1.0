import { useEffect, useMemo, useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StudentDashboardCards from "@/components/dashboard/StudentDashboardCards";
import StudentExams from "@/components/dashboard/StudentExams";
import PracticeProblems from "@/components/dashboard/PracticeProblems";
import LeaderboardPanel from "@/components/dashboard/LeaderboardPanel";
import ProgressCharts from "@/components/dashboard/ProgressCharts";
import StudentSettings from "@/components/dashboard/StudentSettings";
import StudentNotifications from "@/components/dashboard/StudentNotifications";
import CodeEditorPage from "@/pages/CodeEditorPage";
import { getStudentAssessments, startAssessment, getStudentAssessmentById } from "@/services/studentService";
import { getQuestions } from "@/services/questionService";
import {
  leaderboard,
  progressSeries,
  topicPerformance,
  notifications,
  studentProfile,
  studentNavItems,
} from "@/data/studentData";
import { Loader2 } from "lucide-react";

const StudentPage = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "student") {
    return null;
  }

  const [activeSection, setActiveSection] = useState("dashboard");

  // Real data from backend
  const [exams, setExams] = useState([]);
  const [examsLoading, setExamsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  // Code editor state
  const [editorQuestion, setEditorQuestion] = useState(null);
  const [editorAssessmentId, setEditorAssessmentId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  // ── Fetch real published assessments ──────────────────────────
  const fetchExams = useCallback(async () => {
    try {
      setExamsLoading(true);
      const data = await getStudentAssessments();
      setExams(data.assessments || []);
    } catch (err) {
      console.error("Failed to load exams:", err);
      setExams([]);
    } finally {
      setExamsLoading(false);
    }
  }, []);

  // ── Fetch practice problems (questions) ────────────────────────
  const fetchQuestions = useCallback(async () => {
    try {
      const data = await getQuestions();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Failed to load questions:", err);
    }
  }, []);

  useEffect(() => {
    fetchExams();
    fetchQuestions();
  }, [fetchExams, fetchQuestions]);

  // Dynamic stats
  const studentStats = useMemo(() => [
    {
      id: 1,
      label: "Available Exams",
      value: exams.length,
      color: "emerald",
    },
    {
      id: 2,
      label: "Practice Problems",
      value: questions.length,
      color: "cyan",
    },
    {
      id: 3,
      label: "Rank",
      value: "#42",
      color: "violet",
    },
    {
      id: 4,
      label: "Score Today",
      value: "85%",
      color: "amber",
    },
  ], [exams, questions]);

  // If code editor is open, show it
  if (editorQuestion) {
    return (
      <CodeEditorPage
        question={editorQuestion}
        assessmentId={editorAssessmentId}
        onBack={() => {
          setEditorQuestion(null);
          setEditorAssessmentId(null);
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
            onStartExam={(exam) => {
              // For now, open first question in code editor
              if (exam.questions?.length > 0) {
                setEditorQuestion(exam.questions[0]);
                setEditorAssessmentId(exam._id);
              } else {
                alert("This assessment has no questions yet.");
              }
            }}
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
        return <LeaderboardPanel leaderboard={leaderboard} />;

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

            <StudentDashboardCards stats={studentStats} />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              {examsLoading ? (
                <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-zinc-950/70 py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                </div>
              ) : (
                <StudentExams
                  exams={exams}
                  onStartExam={(exam) => {
                    if (exam.questions?.length > 0) {
                      setEditorQuestion(exam.questions[0]);
                      setEditorAssessmentId(exam._id);
                    } else {
                      alert("This assessment has no questions yet.");
                    }
                  }}
                />
              )}
              <StudentNotifications items={notifications} />
            </div>

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
