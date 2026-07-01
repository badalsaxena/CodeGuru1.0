import { Button } from "@/components/ui/button";
import { upcomingExams } from "@/data/studentData";

const UpcomingExamsCard = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-amber-400">Upcoming Exams</p>
          <h3 className="text-xl font-semibold text-white">Your Schedule</h3>
        </div>
        <div className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-400">3 pending</div>
      </div>

      <div className="space-y-3">
        {upcomingExams.map((exam) => (
          <div key={exam.name} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-white">{exam.name}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-zinc-400">
                <span>{exam.subject}</span>
                <span>•</span>
                <span>{exam.date}</span>
                <span>•</span>
                <span>{exam.duration}</span>
              </div>
            </div>
            <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10">
              Register
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingExamsCard;