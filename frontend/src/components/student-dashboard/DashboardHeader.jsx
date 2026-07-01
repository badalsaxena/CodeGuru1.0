import { BellRing, Search, ChevronDown, Sparkles } from "lucide-react";
import { studentProfile } from "@/data/studentData";

const DashboardHeader = () => {
  return (
    <header className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-zinc-950/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-cyan-400">
          <Sparkles className="h-4 w-4" />
          <span>Learning dashboard</span>
        </div>
        <h2 className="text-2xl font-semibold text-white">Welcome back, {studentProfile.name}</h2>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400">
          <Search className="h-4 w-4" />
          <input className="w-full bg-transparent outline-none placeholder:text-zinc-500 md:w-64" placeholder={studentProfile.searchPlaceholder} />
        </label>

        <div className="flex items-center gap-3">
          <button className="relative rounded-2xl border border-white/10 bg-white/5 p-3 text-zinc-200 transition hover:bg-white/10">
            <BellRing className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />
          </button>

          <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-semibold text-zinc-950">
              AK
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{studentProfile.name}</p>
              <p className="text-xs text-zinc-400">{studentProfile.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
