import { recentActivity } from "@/data/teacherData";

const RecentActivity = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-cyan-400">Activity Feed</p>
          <h3 className="text-xl font-semibold text-white">Recent Operations</h3>
        </div>
        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">Live log</div>
      </div>

      <ol className="space-y-4">
        {recentActivity.map((item) => (
          <li key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            <div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>{item.time}</span>
                <span>•</span>
                <span className="font-medium text-white">{item.title}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-300">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default RecentActivity;
