import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import DashboardCards from "@/components/dashboard/DashboardCards";
import QuestionBank from "@/components/dashboard/QuestionBank";
import LiveMonitoring from "@/components/dashboard/LiveMonitoring";
import AlertPanel from "@/components/dashboard/AlertPanel";
import Reports from "@/components/dashboard/Reports";
import SettingsPanel from "@/components/dashboard/SettingsPanel";
import { getQuestions } from "@/services/questionService";
import {
  teacherStats,
  monitoringStudents,
  aiAlerts,
  performanceSeries,
  performanceBreakdown,
  teacherProfile,
  navItems,
} from "@/data/teacherData";

const TeacherPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
};
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || user?.role !== "teacher") {
  return null;
}
 const [questions, setQuestions] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

 
useEffect(() => {
  fetchQuestions();
}, []);

const fetchQuestions = async () => {
  try {
    setLoading(true);

    const data = await getQuestions();

    console.log("Questions from backend:", data);

    setQuestions(data.questions || []);
  } catch (err) {
    setError("Failed to load questions");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

 const filteredQuestions = useMemo(() => {
  return questions.filter((question) => {
    const matchesSearch =
      question.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "All" ||
      question.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });
}, [questions, searchTerm, difficultyFilter]);

  const renderContent = () => {
    switch (activeSection) {
      case "questions":
        return (
          <QuestionBank
            questions={filteredQuestions}
            onDelete={() => {}}
            onAddQuestion={() => {}}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            difficultyFilter={difficultyFilter}
            onDifficultyChange={setDifficultyFilter}
          />
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
                  <h2 className="text-2xl font-semibold text-white">Teaching is running smoothly today.</h2>
                  <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                    Track active learners, monitor AI integrity events, and review submissions from one premium workspace.
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  <p className="font-semibold">Next milestone</p>
                  <p className="mt-1 text-zinc-300">12 submissions scheduled for review in 30 minutes</p>
                </div>
              </div>
            </div>

            <DashboardCards stats={teacherStats} />
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <QuestionBank
                questions={filteredQuestions}
                onDelete={() => {}}
                onAddQuestion={() => {}}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                difficultyFilter={difficultyFilter}
                onDifficultyChange={setDifficultyFilter}
              />
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
      navItems={navItems}
    />

    <main className="flex-1 space-y-6">
      <Header
        title="Teacher Dashboard"
        subtitle="Frontend-only SaaS workspace with reusable sections and dummy data."
      />

      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
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

export default TeacherPage;
