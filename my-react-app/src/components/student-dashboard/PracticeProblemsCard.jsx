import { practiceProblems } from "@/data/studentData";
import { Button } from "@/components/ui/button";

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-400",
  Medium: "bg-amber-500/10 text-amber-400",
  Hard: "bg-rose-500/10 text-rose-400",
};

const PracticeProblemsCard = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-violet-400">Practice Problems</p>
          <h3 className="text-xl font-semibold text-white">Recommended For You</h3>
        </div>
        <div className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-400">4 ready</div>
      </div>

      <div className="space-y-3">
        {practiceProblems.map((problem) => (
          <div key={problem.title} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-white">{problem.title}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
                <span className={`rounded-full px-2.5 py-1 ${difficultyStyles[problem.difficulty]}`}>{problem.difficulty}</span>
                <span className="rounded-full bg-white/5 px-2.5 py-1">{problem.topic}</span>
                <span className="rounded-full bg-white/5 px-2.5 py-1">{problem.status}</span>
              </div>
            </div>
            <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10">
              Solve
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PracticeProblemsCard;