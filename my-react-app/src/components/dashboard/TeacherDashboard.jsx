import { motion } from "framer-motion";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import CreateTestCard from "@/components/dashboard/CreateTestCard";
import CodingQuestionForm from "@/components/dashboard/CodingQuestionForm";
import StudentMonitorTable from "@/components/dashboard/StudentMonitorTable";
import CheatAlertPanel from "@/components/dashboard/CheatAlertPanel";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { stats } from "@/data/teacherData";

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "create-test":
        return (
          <div className="space-y-6">
            <CreateTestCard />
            <CodingQuestionForm />
          </div>
        );
      case "questions":
        return <CodingQuestionForm />;
      case "monitoring":
        return (
          <div className="space-y-6">
            <StudentMonitorTable />
            <CheatAlertPanel />
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <PerformanceChart />
            <RecentActivity />
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-6">
            <RecentActivity />
            <CheatAlertPanel />
          </div>
        );
      case "settings":
        return (
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <p className="text-sm text-emerald-400">Settings</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Teacher preferences and automation controls</h3>
            <p className="mt-3 text-sm text-zinc-400">You can connect this section to real admin settings later without changing the layout.</p>
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
              {stats.map((stat) => (
                <StatsCard key={stat.id} {...stat} />
              ))}
            </motion.div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <CreateTestCard />
              <CodingQuestionForm />
            </div>

            <StudentMonitorTable />

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <CheatAlertPanel />
              <PerformanceChart />
            </div>

            <RecentActivity />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.15),transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_50%,#020617_100%)] p-4 text-zinc-100 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <Sidebar activeItem={activeSection} onSelect={setActiveSection} />

        <main className="flex-1 space-y-6">
          <DashboardHeader />
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
