import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { performanceSummary, performanceSeries, performanceBreakdown } from "@/data/teacherData";

const summaryItems = [
  { label: "Average Score", value: performanceSummary.averageScore },
  { label: "Highest Score", value: performanceSummary.highestScore },
  { label: "Lowest Score", value: performanceSummary.lowestScore },
  { label: "Students Appeared", value: performanceSummary.studentsAppeared },
  { label: "Pass %", value: performanceSummary.passPercentage },
  { label: "Avg Completion", value: performanceSummary.averageCompletionTime },
];

const PerformanceChart = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-violet-400">Performance Analytics</p>
          <h3 className="text-xl font-semibold text-white">Faculty and Student Score Insights</h3>
        </div>
        <div className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-400">Updated 5m ago</div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {summaryItems.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-zinc-400">{item.label}</p>
            <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
            <div className="mb-3 text-sm font-medium text-zinc-300">Score Trend</div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceSeries}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
            <div className="mb-3 text-sm font-medium text-zinc-300">Attendance vs Performance</div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceSeries}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <div className="mb-3 text-sm font-medium text-zinc-300">Assessment Status</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={performanceBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
                  {performanceBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {performanceBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceChart;
