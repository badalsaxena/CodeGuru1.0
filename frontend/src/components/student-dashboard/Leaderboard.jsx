import { leaderboard } from "@/data/studentData";

const Leaderboard = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-amber-400">Leaderboard</p>
          <h3 className="text-xl font-semibold text-white">Top Performers</h3>
        </div>
        <div className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-400">Live</div>
      </div>

      <div className="space-y-3">
        {leaderboard.map((student) => (
          <div key={student.rank} className={`flex items-center justify-between rounded-2xl border p-4 ${student.highlight ? "border-cyan-400/30 bg-cyan-500/10" : "border-white/10 bg-white/5"}`}>
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${student.highlight ? "bg-cyan-500 text-zinc-950" : "bg-white/10 text-white"}`}>
                #{student.rank}
              </div>
              <div>
                <p className="font-semibold text-white">{student.name}</p>
                <p className="text-sm text-zinc-400">{student.problems} problems solved</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-white">{student.score}</p>
              <p className="text-sm text-zinc-400">{student.accuracy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leaderboard;