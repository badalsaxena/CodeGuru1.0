import { useEffect, useState } from "react";
import { getLeaderboard } from "@/services/leaderboardService";

const Leaderboard = ({ assessmentId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!assessmentId) return;

    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        const res = await getLeaderboard(assessmentId);

        // Backend usually returns data/results/leaderboard
        setLeaderboard(
          res.data || res.results || res.leaderboard || []
        );
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load leaderboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [assessmentId]);

  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-amber-400">Leaderboard</p>
          <h3 className="text-xl font-semibold text-white">
            Top Performers
          </h3>
        </div>

        <div className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-400">
          Live
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading leaderboard...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : leaderboard.length === 0 ? (
        <p className="text-zinc-400">No leaderboard data available.</p>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((student, index) => (
            <div
              key={student._id || index}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-semibold text-white">
                  #{student.rank || index + 1}
                </div>

                <div>
                  <p className="font-semibold text-white">
                    {student.name}
                  </p>

                  <p className="text-sm text-zinc-400">
                    {student.problemsSolved} problems solved
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-white">
                  {student.score}
                </p>

                <p className="text-sm text-zinc-400">
                  {student.accuracy}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Leaderboard;