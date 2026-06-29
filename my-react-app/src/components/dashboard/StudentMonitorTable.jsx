import { monitorRows } from "@/data/teacherData";

const statusStyles = {
  Active: "bg-emerald-500/10 text-emerald-400",
  Warning: "bg-amber-500/10 text-amber-400",
  Idle: "bg-zinc-500/10 text-zinc-300",
};

const StudentMonitorTable = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-400">Live Monitoring</p>
          <h3 className="text-xl font-semibold text-white">Student Activity Overview</h3>
        </div>
        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">Real-time</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-zinc-400">
            <tr>
              <th className="px-3 py-3 font-medium">Student</th>
              <th className="px-3 py-3 font-medium">Roll</th>
              <th className="px-3 py-3 font-medium">Exam</th>
              <th className="px-3 py-3 font-medium">Remaining</th>
              <th className="px-3 py-3 font-medium">Question</th>
              <th className="px-3 py-3 font-medium">Progress</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Integrity</th>
            </tr>
          </thead>
          <tbody>
            {monitorRows.map((row) => (
              <tr key={row.roll} className="border-t border-white/10 text-zinc-200">
                <td className="px-3 py-4">{row.name}</td>
                <td className="px-3 py-4 text-zinc-400">{row.roll}</td>
                <td className="px-3 py-4">{row.exam}</td>
                <td className="px-3 py-4">{row.time}</td>
                <td className="px-3 py-4">{row.question}</td>
                <td className="px-3 py-4">
                  <div className="w-24 rounded-full bg-white/10 p-1">
                    <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${row.progress}%` }} />
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-4">{row.integrity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StudentMonitorTable;
