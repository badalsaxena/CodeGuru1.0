import { Button } from "@/components/ui/button";
import { activeExam } from "@/data/studentData";

const CurrentExamCard = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-cyan-400">Active Examination</p>
          <h3 className="text-xl font-semibold text-white">{activeExam.title}</h3>
        </div>
        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">Live now</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-400">Subject</p>
          <p className="mt-1 text-lg font-semibold text-white">{activeExam.subject}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-400">Remaining Time</p>
          <p className="mt-1 text-lg font-semibold text-white">{activeExam.remainingTime}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-400">Questions</p>
          <p className="mt-1 text-lg font-semibold text-white">{activeExam.totalQuestions}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-400">Completed</p>
          <p className="mt-1 text-lg font-semibold text-white">{activeExam.completedQuestions}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
          <span>Progress</span>
          <span>{activeExam.progress}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10">
          <div className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${activeExam.progress}%` }} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 text-sm font-semibold text-white hover:opacity-90">
          Resume Exam
        </Button>
        <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10">
          View Instructions
        </Button>
      </div>
    </section>
  );
};

export default CurrentExamCard;