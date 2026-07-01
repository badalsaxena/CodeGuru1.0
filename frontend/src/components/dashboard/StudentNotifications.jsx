const StudentNotifications = ({ items }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Notifications</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Recent activity and updates</h2>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3">
            <div>
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-400">{item.time}</p>
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentNotifications;
