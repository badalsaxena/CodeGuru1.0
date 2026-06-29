import { LayoutDashboard, NotebookPen, Code2, FileCheck2, Trophy, Award, BellRing, UserCircle2, Settings } from "lucide-react";
import { studentSidebarItems } from "@/data/studentData";

const iconMap = {
  LayoutDashboard,
  NotebookPen,
  Code2,
  FileCheck2,
  Trophy,
  Award,
  BellRing,
  UserCircle2,
  Settings,
};

const StudentSidebar = ({ activeItem, onSelect }) => {
  return (
    <aside className="hidden lg:flex w-72 flex-col rounded-[28px] border border-white/10 bg-zinc-950/75 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-lg font-semibold text-zinc-950">
          C
        </div>
        <div>
          <p className="text-sm font-semibold text-white">CodeGuru</p>
          <p className="text-xs text-zinc-400">Student Hub</p>
        </div>
      </div>

      <nav className="space-y-2">
        {studentSidebarItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = item.id === activeItem;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/10 text-white shadow-lg shadow-cyan-500/10"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-4">
        <p className="text-sm font-semibold text-white">Daily Goal</p>
        <p className="mt-1 text-sm text-zinc-300">Three high-quality solves today will keep your streak alive.</p>
      </div>
    </aside>
  );
};

export default StudentSidebar;
