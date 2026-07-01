import { Bell, ChevronDown, Search } from "lucide-react";

const Header = ({ title, subtitle }) => {
  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Teacher Workspace</p>
        <h1 className="mt-1 text-2xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-400">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search insights"
            className="w-full bg-transparent outline-none placeholder:text-zinc-500 sm:w-48"
          />
        </label>

        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/70 text-zinc-200 transition hover:border-emerald-400/40 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
        </button>

        <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 font-semibold text-black">
            MC
          </div>
          <div className="text-left">
            <p className="font-medium text-white">Dr. Maya</p>
            <p className="text-xs text-zinc-400">Instructor</p>
          </div>
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;
