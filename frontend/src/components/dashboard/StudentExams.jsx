const StudentExams = ({ exams }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">My Exams</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Upcoming, active, and completed assessments</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {exams.map((exam) => (
          <div key={exam.id} className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{exam.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{exam.subject}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${exam.status === "Live" ? "bg-emerald-500/15 text-emerald-300" : exam.status === "Upcoming" ? "bg-cyan-500/15 text-cyan-300" : "bg-zinc-500/15 text-zinc-300"}`}>
                {exam.status}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-zinc-400">
              <p>Teacher: {exam.teacher}</p>
              <p>Duration: {exam.duration}</p>
              <p>Total Marks: {exam.marks}</p>
              <p>Start Date: {exam.startDate}</p>
              {exam.remainingTime && <p>Remaining Time: {exam.remainingTime}</p>}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {exam.status === "Live" && <button className="rounded-full bg-emerald-500 px-3 py-1.5 text-sm font-medium text-black">Resume Exam</button>}
              {exam.status === "Upcoming" && <button className="rounded-full bg-cyan-500 px-3 py-1.5 text-sm font-medium text-black">Start Exam</button>}
              {exam.status === "Completed" && <button className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300">View Result</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentExams;
