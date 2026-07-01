import { motion } from "framer-motion";
import { useState } from "react";
import StudentSidebar from "@/components/student-dashboard/StudentSidebar";
import DashboardHeader from "@/components/student-dashboard/DashboardHeader";
import StatsCard from "@/components/student-dashboard/StatsCard";
import WelcomeCard from "@/components/student-dashboard/WelcomeCard";
import CurrentExamCard from "@/components/student-dashboard/CurrentExamCard";
import PracticeProblemsCard from "@/components/student-dashboard/PracticeProblemsCard";
import SubmissionTable from "@/components/student-dashboard/SubmissionTable";
import Leaderboard from "@/components/student-dashboard/Leaderboard";
import PerformanceChart from "@/components/student-dashboard/PerformanceChart";
import AchievementsCard from "@/components/student-dashboard/AchievementsCard";
import NotificationPanel from "@/components/student-dashboard/NotificationPanel";
import UpcomingExamsCard from "@/components/student-dashboard/UpcomingExamsCard";
import { studentStats } from "@/data/studentData";

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "exams":
        return (
          <div className="space-y-6">
            <CurrentExamCard />
            <UpcomingExamsCard />
          </div>
        );
      case "practice":
        return (
          <div className="space-y-6">
            <PracticeProblemsCard />
            <PerformanceChart />
          </div>
        );
      case "submissions":
        return <SubmissionTable />;
      case "leaderboard":
        return <Leaderboard />;
      case "certificates":
        return <AchievementsCard />;
      case "notifications":
        return <NotificationPanel />;
      case "profile":
        return (
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <p className="text-sm text-cyan-400">Profile</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Student profile and learning preferences</h3>
            <p className="mt-3 text-sm text-zinc-400">Use this section later for personal details, preferences, and study configuration.</p>
          </div>
        );
      case "settings":
        return (
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <p className="text-sm text-cyan-400">Settings</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">App preferences and notification controls</h3>
            <p className="mt-3 text-sm text-zinc-400">This area can be connected to real account settings when the backend is ready.</p>
          </div>
        );
      case "dashboard":
      default:
        return (
          <>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {studentStats.map((stat) => (
                <StatsCard key={stat.id} {...stat} />
              ))}
            </motion.div>

            <WelcomeCard />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <CurrentExamCard />
              <PracticeProblemsCard />
            </div>

            <SubmissionTable />

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <Leaderboard />
              <PerformanceChart />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <AchievementsCard />
              <NotificationPanel />
            </div>

            <UpcomingExamsCard />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#020617_100%)] p-4 text-zinc-100 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <StudentSidebar activeItem={activeSection} onSelect={setActiveSection} />

        <main className="flex-1 space-y-6">
          <DashboardHeader />
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;