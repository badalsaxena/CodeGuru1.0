import { notifications } from "@/data/studentData";

const NotificationPanel = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-cyan-400">Notifications</p>
          <h3 className="text-xl font-semibold text-white">Recent Updates</h3>
        </div>
        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">Inbox</div>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{item.title}</p>
              <span className="text-sm text-zinc-400">{item.time}</span>
            </div>
            <p className="mt-1 text-sm text-zinc-400">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotificationPanel;