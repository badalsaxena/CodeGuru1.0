import { LayoutGrid, BookOpenCheck, Code2, MonitorPlay, BarChart3, Settings, Sparkles, Trophy, ClipboardList } from "lucide-react";

const iconMap = {
  LayoutGrid,
  BookOpenCheck,
  Code2,
  MonitorPlay,
  BarChart3,
  Settings,
  Trophy,
  ClipboardList,
};

const Sidebar = ({ activeSection, onSectionChange, navItems }) => {
  return (
    <aside className="w-full rounded-3xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl lg:w-72 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-500">
          <Sparkles className="h-6 w-6 text-black" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">CodeGuru</p>
          <p className="text-sm text-zinc-400">Teacher Console</p>
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-all ${
                isActive
                  ? "bg-gradient-to-r from-emerald-400/20 to-cyan-400/10 text-white shadow-lg shadow-emerald-500/10"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              {isActive && <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-zinc-300">
        <p className="font-semibold text-white">Pro Mode Ready</p>
        <p className="mt-1 text-zinc-400">Your dashboard is prepared for API-driven data swaps later.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
