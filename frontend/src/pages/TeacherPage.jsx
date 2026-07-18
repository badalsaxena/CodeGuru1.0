import { useEffect, useMemo, useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import DashboardCards from "@/components/dashboard/DashboardCards";
import QuestionBank from "@/components/dashboard/QuestionBank";
import LiveMonitoring from "@/components/dashboard/LiveMonitoring";
import AlertPanel from "@/components/dashboard/AlertPanel";
import Reports from "@/components/dashboard/Reports";
import SettingsPanel from "@/components/dashboard/SettingsPanel";
import AddQuestionModal from "@/components/dashboard/AddQuestionModal";
import AddAssessmentModal from "@/components/dashboard/AddAssessmentModal";
import AddQuestionsToAssessmentModal from "@/components/dashboard/AddQuestionsToAssessmentModal";
import {
  getQuestions,
  deleteQuestion,
  publishQuestion,
} from "@/services/questionService";

import {
  getAssessments,
  getAssessmentById,
  publishAssessment,
  unpublishAssessment,
  deleteAssessment,
} from "@/services/assessmentService";
import {
  monitoringStudents,
  aiAlerts,
  performanceSeries,
  performanceBreakdown,
  teacherProfile,
  navItems,
} from "@/data/teacherData";
import {
  Plus, Loader2, AlertCircle, ClipboardList,
  Clock, Users, Calendar,
} from "lucide-react";

// Dynamic stats built from real data
const buildStats = (questions, assessments) => [
  {
    title: "Total Questions",
    value: questions.length,
    description: "Coding questions",
    change: "+12%",
    icon: "Code2",
    accent: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Assessments",
    value: assessments.length,
    description: "Scheduled exams",
    change: "+5%",
    icon: "ClipboardList",
    accent: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Published",
    value: questions.filter(q => q.status === "published").length,
    description: "Live questions",
    change: "+8%",
    icon: "Sparkles",
    accent: "from-violet-500/20 to-fuchsia-500/20",
  },
  {
    title: "Drafts",
    value: questions.filter(q => q.status === "draft").length,
    description: "Unpublished",
    change: "-2%",
    icon: "ShieldAlert",
    accent: "from-amber-500/20 to-orange-500/20",
  },
];

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

const TeacherPage = () => {
  const token = localStorage.getItem("token");
  const user = getStoredUser();
  const isTeacher = Boolean(token && user?.role === "teacher");

  const [activeSection, setActiveSection] = useState("dashboard");

  // Questions state
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questionsError, setQuestionsError] = useState("");

  // Assessments state
  const [assessments, setAssessments] = useState([]);
  const [assessmentsLoading, setAssessmentsLoading] = useState(true);

  // Modals
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [showAddAssessment, setShowAddAssessment] = useState(false);
  const [manageQuestionsAssessment, setManageQuestionsAssessment] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  // ── Fetch Questions ──────────────────────────────────────────────
  const fetchQuestions = useCallback(async () => {
    if (!isTeacher) return;

    try {
      setQuestionsLoading(true);
      setQuestionsError("");
      const data = await getQuestions();
      setQuestions(data.questions || []);
    } catch (err) {
      setQuestionsError(getErrorMessage(err, "Failed to load questions. Is the backend running?"));
      console.error(err);
    } finally {
      setQuestionsLoading(false);
    }
  }, [isTeacher]);

  // ── Fetch Assessments ────────────────────────────────────────────
  const fetchAssessments = useCallback(async () => {
    if (!isTeacher) return;

    try {
      setAssessmentsLoading(true);
      const data = await getAssessments();
      setAssessments(data.assessments || []);
    } catch (err) {
      console.error("Failed to load assessments:", err);
    } finally {
      setAssessmentsLoading(false);
    }
  }, [isTeacher]);

  useEffect(() => {
    fetchQuestions();
    fetchAssessments();
  }, [fetchQuestions, fetchAssessments]);

  // ── Delete Question ──────────────────────────────────────────────
  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Delete this question? This cannot be undone.")) return;
    try {
      await deleteQuestion(id);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      alert("Failed to delete question: " + getErrorMessage(err, "Unknown error"));
    }
  };

  const handleEditQuestion = (question) => {
  setEditingQuestion(question);
  setShowAddQuestion(true);
};

 const handlePublishQuestion = async (id) => {
  try {
    await publishQuestion(id);

    await fetchQuestions();

    alert("Question published successfully!");
  } catch (err) {
    alert(getErrorMessage(err, "Failed to publish question."));
  }
};
  
const handlePublishAssessment = async (id) => {
  try {
    await publishAssessment(id);

    await fetchAssessments();

    alert("Assessment published successfully!");
  } catch (err) {
    alert(getErrorMessage(err, "Failed to publish assessment."));
  }
};

const handleUnpublishAssessment = async (id) => {
  try {
    await unpublishAssessment(id);

    await fetchAssessments();

    alert("Assessment moved to draft.");
  } catch (err) {
    alert(getErrorMessage(err, "Failed to unpublish assessment."));
  }
};

const handleDeleteAssessment = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this assessment?"
  );

  if (!confirmDelete) return;

  try {
    await deleteAssessment(id);

    await fetchAssessments();

    alert("Assessment deleted successfully!");
  } catch (err) {
    alert(getErrorMessage(err, "Failed to delete assessment."));
  }
};


  // ── Filtered Questions ───────────────────────────────────────────
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchSearch = (q.title || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
      return matchSearch && matchDifficulty;
    });
  }, [questions, searchTerm, difficultyFilter]);

  const stats = useMemo(() => buildStats(questions, assessments), [questions, assessments]);

  if (!isTeacher) {
    return null;
  }

  // ── Render Content ───────────────────────────────────────────────
  const renderContent = () => {
    switch (activeSection) {
      case "questions":
        return (
          <div className="space-y-4">
            {questionsError && (
              <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-300">{questionsError}</p>
              </div>
            )}
            {questionsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
              </div>
            ) : (
             <QuestionBank
  questions={filteredQuestions}
  onDelete={handleDeleteQuestion}
  onEdit={handleEditQuestion}
  onPublish={handlePublishQuestion}
  onAddQuestion={() => setShowAddQuestion(true)}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  difficultyFilter={difficultyFilter}
  onDifficultyChange={setDifficultyFilter}
  
/>
            )}
          </div>
        );

      case "assessments":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Assessments</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Your Scheduled Exams</h2>
              </div>
              <button
                onClick={() => setShowAddAssessment(true)}
                className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
              >
                <Plus className="h-4 w-4" /> New Assessment
              </button>
            </div>

            {assessmentsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
              </div>
            ) : assessments.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-12 text-center">
                <ClipboardList className="mx-auto mb-4 h-12 w-12 text-zinc-600" />
                <p className="text-lg font-semibold text-white">No assessments yet</p>
                <p className="mt-2 text-sm text-zinc-400">Create your first assessment to get started.</p>
                <button
                  onClick={() => setShowAddAssessment(true)}
                  className="mt-6 rounded-2xl bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400"
                >
                  Create Assessment
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {assessments.map((assessment) => (
                  <div
                    key={assessment._id}
                    className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-xl shadow-black/20 backdrop-blur"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{assessment.title}</h3>
                        {assessment.description && (
                          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">{assessment.description}</p>
                        )}
                      </div>
                      <span
  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
    assessment.status === "published"
      ? "bg-emerald-500/20 text-emerald-300"
      : "bg-amber-500/20 text-amber-300"
  }`}
>
  {assessment.status}
</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{assessment.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{assessment.totalMarks} total marks</span>
                      </div>
                      {assessment.startTime && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                          <span>{new Date(assessment.startTime).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
<button
  disabled={assessment.status === "published"}
  onClick={() => {
    if (assessment.status === "draft") {
      setEditingAssessment(assessment);
      setShowAddAssessment(true);
    }
  }}
  className={`rounded-xl border py-2 text-xs font-semibold transition ${
    assessment.status === "published"
      ? "cursor-not-allowed border-zinc-700 bg-zinc-800 text-zinc-500"
      : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
  }`}
>
  ✏ Edit
</button>

<button
  disabled={assessment.status === "published"}
  onClick={() => {
    if (assessment.status === "draft") {
      setManageQuestionsAssessment(assessment);
    }
  }}
  className={`rounded-xl py-2 text-xs font-semibold transition ${
    assessment.status === "published"
      ? "cursor-not-allowed border border-zinc-700 bg-zinc-800 text-zinc-500"
      : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
  }`}
>
  📚 Manage Questions
</button>

  {assessment.status === "draft" ? (
    <button
  disabled={(assessment.questions?.length || 0) === 0}
 onClick={() => handlePublishAssessment(assessment._id)}
  className="rounded-xl bg-emerald-500 py-2 text-xs font-semibold text-black hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
>
  🚀 Publish
</button>
  ) : (
    <button
      onClick={() => handleUnpublishAssessment(assessment._id)}
      className="rounded-xl bg-amber-500 py-2 text-xs font-semibold text-black"
    >
      📥 Unpublish
    </button>
  )}

<button
  disabled={assessment.status === "published"}
  onClick={() => {
    if (assessment.status === "draft") {
      handleDeleteAssessment(assessment._id);
    }
  }}
  className={`rounded-xl py-2 text-xs font-semibold transition ${
    assessment.status === "published"
      ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
      : "bg-red-500 text-white hover:bg-red-600"
  }`}
>
  🗑 Delete
</button>
</div>
                    
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "monitoring":
        return (
          <div className="space-y-6">
            <LiveMonitoring students={monitoringStudents} />
            <AlertPanel alerts={aiAlerts} />
          </div>
        );

      case "reports":
        return <Reports series={performanceSeries} breakdown={performanceBreakdown} />;

      case "settings":
        return <SettingsPanel profile={teacherProfile} />;

      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Live overview</p>
              <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Welcome back, {user?.fullName?.split(" ")[0] || "Teacher"}! 👋
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                    You have {questions.length} questions and {assessments.length} assessments. Manage everything from one workspace.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddQuestion(true)}
                    className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    <Plus className="h-4 w-4" /> Add Question
                  </button>
                  <button
                    onClick={() => setShowAddAssessment(true)}
                    className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400"
                  >
                    <Plus className="h-4 w-4" /> New Assessment
                  </button>
                </div>
              </div>
            </div>

            <DashboardCards stats={stats} />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              {questionsLoading ? (
                <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-zinc-950/70 py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                </div>
              ) : (
               <QuestionBank
  questions={filteredQuestions}
  onDelete={handleDeleteQuestion}
  onEdit={handleEditQuestion}
  onPublish={handlePublishQuestion}
  onAddQuestion={() => setShowAddQuestion(true)}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  difficultyFilter={difficultyFilter}
  onDifficultyChange={setDifficultyFilter}
/>
              )}
              <AlertPanel alerts={aiAlerts} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.18),transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#020617_100%)] p-4 text-zinc-100 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          navItems={[
            ...navItems,
            { id: "assessments", label: "Assessments", icon: "ClipboardList" },
          ]}
        />

        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <Header
              title="Teacher Dashboard"
              subtitle={`Logged in as ${user?.email || "teacher"}`}
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

      {/* Modals */}
     {showAddQuestion && (
  <AddQuestionModal
    question={editingQuestion}
    isEdit={!!editingQuestion}
    onClose={() => {
      setShowAddQuestion(false);
      setEditingQuestion(null);
    }}
    onSuccess={(savedQuestion) => {
      if (editingQuestion) {
        setQuestions((prev) =>
          prev.map((q) =>
            q._id === savedQuestion._id ? savedQuestion : q
          )
        );
      } else {
        setQuestions((prev) => [savedQuestion, ...prev]);
      }

      setShowAddQuestion(false);
      setEditingQuestion(null);
      fetchQuestions();
    }}
  />
)}
      {showAddAssessment && (
  <AddAssessmentModal
    assessment={editingAssessment}
    isEdit={!!editingAssessment}
    onClose={() => {
      setShowAddAssessment(false);
      setEditingAssessment(null);
    }}
    onSuccess={(assessment) => {
      if (editingAssessment) {
        setAssessments((prev) =>
          prev.map((a) => (a._id === assessment._id ? assessment : a))
        );
      } else {
        setAssessments((prev) => [assessment, ...prev]);
      }

      setShowAddAssessment(false);
      setEditingAssessment(null);
      fetchAssessments();
    }}
  />
)}
      {manageQuestionsAssessment && (
        <AddQuestionsToAssessmentModal
          assessment={manageQuestionsAssessment}
          onClose={() => setManageQuestionsAssessment(null)}
          onSuccess={async (updatedA) => {
            try {
              const data = await getAssessmentById(updatedA._id);
              const refreshedAssessment = data.assessment || updatedA;

              setAssessments((prev) =>
                prev.map((a) =>
                  a._id === refreshedAssessment._id ? refreshedAssessment : a
                )
              );
            } catch (err) {
              console.error("Failed to refresh assessment:", err);
              setAssessments((prev) =>
                prev.map((a) => (a._id === updatedA._id ? updatedA : a))
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default TeacherPage;
