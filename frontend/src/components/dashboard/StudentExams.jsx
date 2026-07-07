import { Clock, Users, Calendar, Play, ClipboardList } from "lucide-react";

const getStatus = (exam) => {
  if (!exam.startTime && !exam.endTime) return "open";
  const now = new Date();
  const start = exam.startTime ? new Date(exam.startTime) : null;
  const end = exam.endTime ? new Date(exam.endTime) : null;
  if (start && now < start) return "upcoming";
  if (end && now > end) return "completed";
  return "live";
};

const STATUS_STYLES = {
  live: "bg-emerald-500/15 text-emerald-300",
  upcoming: "bg-cyan-500/15 text-cyan-300",
  completed: "bg-zinc-500/15 text-zinc-300",
  open: "bg-violet-500/15 text-violet-300",
};

const STATUS_LABELS = {
  live: "Live",
  upcoming: "Upcoming",
  completed: "Completed",
  open: "Open",
};

const StudentExams = ({ exams = [], onStartExam }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">My Exams</p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            Upcoming, active, and completed assessments
          </h2>
        </div>
        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-zinc-400">
          {exams.length} total
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {exams.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-zinc-900/40 py-16 text-center">
            <ClipboardList className="mb-3 h-10 w-10 text-zinc-600" />
            <p className="font-semibold text-white">No exams available</p>
            <p className="mt-1 text-xs text-zinc-500">Your teacher hasn't scheduled any assessments yet.</p>
          </div>
        ) : (
          exams.map((exam) => {
            const status = getStatus(exam);
            return (
              <div
                key={exam._id || exam.id}
                className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{exam.title}</h3>
                    {exam.description && (
                      <p className="mt-0.5 text-xs text-zinc-400 line-clamp-2">{exam.description}</p>
                    )}
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}>
                    {STATUS_LABELS[status]}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{exam.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    <span>{exam.totalMarks} marks</span>
                  </div>
                  {exam.startTime && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(exam.startTime).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-600">{exam.questions?.length || 0} questions</span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  {status !== "completed" && (
                    <button
                      onClick={() => onStartExam && onStartExam(exam)}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-emerald-400"
                    >
                      <Play className="h-3.5 w-3.5" />
                      {status === "live" ? "Resume Exam" : "Start Exam"}
                    </button>
                  )}
                  {status === "completed" && (
                    <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-zinc-500">
                      View Result
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StudentExams;
