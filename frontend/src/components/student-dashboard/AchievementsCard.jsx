import { achievements } from "@/data/studentData";
import { Medal, Flame, Sparkles, Star } from "lucide-react";

const iconMap = {
  Medal,
  Flame,
  Sparkles,
  Star,
};

const AchievementsCard = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-violet-400">Certificates & Achievements</p>
          <h3 className="text-xl font-semibold text-white">Recent Milestones</h3>
        </div>
        <div className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-400">Unlocked</div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {achievements.map((item) => {
          const Icon = iconMap[item.icon] || Sparkles;
          return (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-zinc-300">{item.badge}</span>
              </div>
              <p className="mt-4 font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-400">{item.detail}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AchievementsCard;