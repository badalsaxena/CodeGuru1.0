const LeaderboardPanel = ({ leaderboard }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Leaderboard</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Your cohort performance</h2>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/5 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Problems</th>
              <th className="px-4 py-3">Accuracy</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Badge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-zinc-950/60 text-zinc-300">
            {leaderboard.map((entry) => (
              <tr key={entry.rank} className={`transition ${entry.name === "You" ? "bg-emerald-500/10" : "hover:bg-white/5"}`}>
                <td className="px-4 py-3 font-medium text-white">#{entry.rank}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-sm font-semibold text-black">
                      {entry.name.charAt(0)}
                    </div>
                    <span>{entry.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{entry.solved}</td>
                <td className="px-4 py-3">{entry.accuracy}</td>
                <td className="px-4 py-3">{entry.score}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${entry.badge === "Elite" ? "bg-emerald-500/15 text-emerald-300" : entry.badge === "Pro" ? "bg-cyan-500/15 text-cyan-300" : "bg-amber-500/15 text-amber-300"}`}>
                    {entry.badge}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPanel;
