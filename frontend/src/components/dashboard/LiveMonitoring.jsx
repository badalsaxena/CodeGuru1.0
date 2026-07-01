import { motion } from "framer-motion";

const LiveMonitoring = ({ students }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Live Monitoring</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Students currently active in exams</h2>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
          {students.length} learners online
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/5 text-left text-zinc-400">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Roll</th>
              <th className="px-4 py-3">Exam</th>
              <th className="px-4 py-3">Time Left</th>
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Integrity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-zinc-950/60 text-zinc-300">
            {students.map((student, index) => (
              <tr key={student.rollNumber} className="transition hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-white">{student.name}</td>
                <td className="px-4 py-3">{student.rollNumber}</td>
                <td className="px-4 py-3">{student.currentExam}</td>
                <td className="px-4 py-3">{student.remainingTime}</td>
                <td className="px-4 py-3">{student.currentQuestion}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${student.progress}%` }}
                        transition={{ duration: 0.4, delay: index * 0.06 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      />
                    </div>
                    <span>{student.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${student.status === "Active" ? "bg-emerald-500/15 text-emerald-300" : student.status === "Warning" ? "bg-amber-500/15 text-amber-300" : "bg-zinc-500/15 text-zinc-300"}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-3">{student.integrityScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveMonitoring;
