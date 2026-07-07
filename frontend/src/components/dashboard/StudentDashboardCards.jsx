import { motion } from "framer-motion";
import { BookOpenCheck, CalendarClock, Code2, Target, Trophy, Flame } from "lucide-react";

const iconMap = {
  BookOpenCheck,
  CalendarClock,
  Code2,
  Target,
  Trophy,
  Flame,
};

const StudentDashboardCards = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon] || Code2;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-3xl border border-white/10 bg-gradient-to-br ${stat.accent} p-[1px] shadow-xl shadow-black/20`}
          >
            <div className="rounded-[calc(1.5rem-1px)] bg-zinc-950/90 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-400">{stat.title}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <p className="text-zinc-400">{stat.description}</p>
                <span className={`font-medium ${stat.change.startsWith("-") ? "text-rose-400" : "text-emerald-400"}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StudentDashboardCards;
