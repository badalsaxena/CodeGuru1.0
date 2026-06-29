import { AlertTriangle, EyeOff, MonitorUp, ScanLine, Smartphone } from "lucide-react";
import { cheatAlerts } from "@/data/teacherData";

const iconMap = {
  MonitorUp,
  ScanLine,
  EyeOff,
  Smartphone,
};

const severityStyles = {
  critical: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  high: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

const CheatAlertPanel = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-rose-400">AI Proctoring</p>
          <h3 className="text-xl font-semibold text-white">Cheating & Integrity Alerts</h3>
        </div>
        <div className="rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-400">6 active</div>
      </div>

      <div className="space-y-3">
        {cheatAlerts.map((alert) => {
          const Icon = iconMap[alert.icon] || AlertTriangle;
          return (
            <div key={alert.title} className={`rounded-2xl border p-4 ${severityStyles[alert.severity]}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="rounded-2xl bg-black/20 p-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{alert.title}</p>
                    <p className="mt-1 text-sm text-zinc-300">{alert.detail}</p>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">{alert.severity}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">View Details</button>
                <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">Block Student</button>
                <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">Auto Submit</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CheatAlertPanel;
