import { submissions } from "@/data/studentData";

const statusStyles = {
  Accepted: "bg-emerald-500/10 text-emerald-400",
  "Wrong Answer": "bg-rose-500/10 text-rose-400",
  TLE: "bg-amber-500/10 text-amber-400",
  "Runtime Error": "bg-sky-500/10 text-sky-400",
};

const SubmissionTable = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-400">Recent Submissions</p>
          <h3 className="text-xl font-semibold text-white">Latest Attempts</h3>
        </div>
        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">Updated</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-zinc-400">
            <tr>
              <th className="px-3 py-3 font-medium">Problem</th>
              <th className="px-3 py-3 font-medium">Language</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Runtime</th>
              <th className="px-3 py-3 font-medium">Memory</th>
              <th className="px-3 py-3 font-medium">Score</th>
              <th className="px-3 py-3 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((row) => (
              <tr key={row.problem} className="border-t border-white/10 text-zinc-200">
                <td className="px-3 py-4">{row.problem}</td>
                <td className="px-3 py-4 text-zinc-400">{row.language}</td>
                <td className="px-3 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status]}`}>{row.status}</span>
                </td>
                <td className="px-3 py-4">{row.runtime}</td>
                <td className="px-3 py-4">{row.memory}</td>
                <td className="px-3 py-4">{row.score}</td>
                <td className="px-3 py-4 text-zinc-400">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SubmissionTable;