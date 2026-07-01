const severityStyles = {
  High: "border-amber-400/20 bg-amber-500/10 text-amber-300",
  Medium: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
  Critical: "border-rose-400/20 bg-rose-500/10 text-rose-300",
};

const AlertPanel = ({ alerts }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">AI Monitoring</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Integrity alerts and review actions</h2>
        </div>
        <div className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-sm text-rose-300">
          {alerts.length} active alerts
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-medium text-white">{alert.studentName}</p>
                <p className="mt-1 text-sm text-zinc-400">{alert.title}</p>
              </div>
              <div className={`rounded-full border px-3 py-1 text-xs font-medium ${severityStyles[alert.severity]}`}>
                {alert.severity}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-zinc-400">
              <span>{alert.time}</span>
              <div className="flex gap-2">
                <button className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-cyan-400/40 hover:text-white">
                  View Details
                </button>
                <button className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-rose-400/40 hover:text-white">
                  Send Warning
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertPanel;
