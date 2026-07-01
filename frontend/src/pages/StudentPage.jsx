import { useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StudentDashboardCards from "@/components/dashboard/StudentDashboardCards";
import StudentExams from "@/components/dashboard/StudentExams";
import PracticeProblems from "@/components/dashboard/PracticeProblems";
import LeaderboardPanel from "@/components/dashboard/LeaderboardPanel";
import ProgressCharts from "@/components/dashboard/ProgressCharts";
import StudentSettings from "@/components/dashboard/StudentSettings";
import StudentNotifications from "@/components/dashboard/StudentNotifications";
import {
  studentStats,
  exams,
  practiceProblems,
  leaderboard,
  progressSeries,
  topicPerformance,
  notifications,
  studentProfile,
  studentNavItems,
} from "@/data/studentData";

const StudentPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const filteredProblems = useMemo(() => practiceProblems, []);

  const renderContent = () => {
    switch (activeSection) {
      case "exams":
        return <StudentExams exams={exams} />;
      case "practice":
        return <PracticeProblems problems={filteredProblems} />;
      case "leaderboard":
        return <LeaderboardPanel leaderboard={leaderboard} />;
      case "settings":
        return <StudentSettings profile={studentProfile} />;
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Learning overview</p>
              <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Your coding journey is building momentum.</h2>
                  <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                    Review your academic progress, solve new problems, and stay on top of every exam from one premium student workspace.
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
              <StudentExams exams={exams} />
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
          <Header title="Student Dashboard" subtitle="Frontend-only learning workspace with data-driven sections." />
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StudentPage;
