const PracticeProblems = ({ problems }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Practice Problems</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Assigned coding challenges</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300">Easy</button>
          <button className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300">Medium</button>
          <button className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300">Hard</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {problems.map((problem) => (
          <div key={problem.id} className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
                <p className="mt-1 text-sm text-zinc-400 line-clamp-1">{problem.description}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${problem.difficulty === "Easy" ? "bg-emerald-500/15 text-emerald-300" : problem.difficulty === "Medium" ? "bg-amber-500/15 text-amber-300" : "bg-rose-500/15 text-rose-300"}`}>
                {problem.difficulty}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-zinc-400">
              <p>Marks: {problem.marks}</p>
              <p>Time Limit: {problem.timeLimit}s</p>
              <p>Memory: {problem.memoryLimit}MB</p>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => problem.onSolve && problem.onSolve()}
                className="rounded-full bg-emerald-500 px-3 py-1.5 text-sm font-medium text-black transition hover:bg-emerald-400"
              >
                Solve Problem
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeProblems;
