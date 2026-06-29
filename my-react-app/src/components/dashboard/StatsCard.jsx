import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Users, FileCheck2, Code2, PlayCircle, Clock3, ShieldAlert } from "lucide-react";

const iconMap = {
  Users,
  FileCheck2,
  Code2,
  PlayCircle,
  Clock3,
  ShieldAlert,
};

const StatsCard = ({ title, value, change, trend, icon, accent }) => {
  const Icon = iconMap[icon];
  const isPositive = trend === "up";

  return (
    <div className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${accent} p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-300">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className={`mt-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm ${isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
        {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        <span>{change}</span>
      </div>
    </div>
  );
};

export default StatsCard;
