import React, { useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  LayoutGrid,
  Search,
  Settings as SettingsIcon,
  ShieldAlert,
  ShieldCheck,
  Users,
  Users2,
} from "lucide-react";
import {
  approvalRequests,
  dashboardStats,
  profileSettings,
  sidebarItems,
  testData,
  userManagementUsers,
} from "@/data/adminData";

const iconMap = {
  LayoutGrid,
  CheckCircle2,
  Users2,
  BarChart3,
  ClipboardCheck,
  SettingsIcon,
};

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
};

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || user?.role !== "admin") {
  return null;
}

  const content = useMemo(() => {
    switch (activeSection) {
      case "approvals":
        return (
          <section className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
              <h2 className="text-lg font-semibold text-white">User approval queue</h2>
              <p className="mt-1 text-sm text-zinc-400">Teacher and student requests are listed here for review.</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80">
              <table className="min-w-full text-left text-sm text-zinc-300">
                <thead className="bg-white/5 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Institute</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalRequests.map((request) => (
                    <tr key={request.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{request.name}</td>
                      <td className="px-4 py-3">{request.role}</td>
                      <td className="px-4 py-3">{request.institute}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      case "management":
        return (
          <section className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
              <h2 className="text-lg font-semibold text-white">User management</h2>
              <p className="mt-1 text-sm text-zinc-400">Admins can review active and suspended accounts.</p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80">
              <table className="min-w-full text-left text-sm text-zinc-300">
                <thead className="bg-white/5 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Institute</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userManagementUsers.map((user) => (
                    <tr key={user.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.role}</td>
                      <td className="px-4 py-3">{user.institute}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs ${user.status === "Active" ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      case "tests":
        return (
          <section className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
              <h2 className="text-lg font-semibold text-white">Test management</h2>
              <p className="mt-1 text-sm text-zinc-400">Create and publish assessments from one place.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {testData.map((test) => (
                <div key={test.id} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                  <p className="font-semibold text-white">{test.name}</p>
                  <p className="mt-2 text-sm text-zinc-400">Teacher: {test.teacher}</p>
                  <p className="text-sm text-zinc-400">Batch: {test.batch}</p>
                  <p className="mt-3 inline-flex rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300">
                    {test.status}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );
      case "settings":
        return (
          <section className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
            <h2 className="text-lg font-semibold text-white">Profile settings</h2>
            <p className="mt-1 text-sm text-zinc-400">Frontend-only profile editing controls.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-300">
                <span className="mb-2 block text-zinc-400">Full Name</span>
                <input className="w-full bg-transparent outline-none" defaultValue={profileSettings.fullName} />
              </label>
              <label className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-300">
                <span className="mb-2 block text-zinc-400">Email</span>
                <input className="w-full bg-transparent outline-none" defaultValue={profileSettings.email} />
              </label>
            </div>
          </section>
        );
      case "dashboard":
      default:
        return (
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {dashboardStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.id} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-400">{stat.title}</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-cyan-300">
                        <Icon size={18} />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-zinc-400">{stat.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
                <h2 className="text-lg font-semibold text-white">Recent approvals</h2>
                <div className="mt-4 space-y-3">
                  {approvalRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      <div>
                        <p className="font-medium text-white">{request.name}</p>
                        <p className="text-sm text-zinc-400">{request.role} • {request.institute}</p>
                      </div>
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
                <h2 className="text-lg font-semibold text-white">Platform health</h2>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm text-zinc-400">Active institutes</p>
                    <p className="mt-1 text-xl font-semibold text-white">42</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm text-zinc-400">Test completion</p>
                    <p className="mt-1 text-xl font-semibold text-white">86%</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm text-zinc-400">Support SLA</p>
                    <p className="mt-1 text-xl font-semibold text-white">14 min</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(167,139,250,0.16),_transparent_22%),#020617] px-3 py-4 text-zinc-100 sm:px-4 lg:px-6 lg:py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row">
        <aside className="w-full rounded-[28px] border border-white/10 bg-zinc-950/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl lg:w-72">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-lg font-semibold text-white">
              C
            </div>
            <div>
              <p className="text-sm font-semibold text-white">CodeGuru</p>
              <p className="text-xs text-zinc-400">Admin Console</p>
            </div>
          </div>

          <nav className="mt-5 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = iconMap[item.id] || LayoutGrid;
              const active = item.id === activeSection;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition ${active ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="mb-4 flex flex-col gap-3 rounded-[28px] border border-white/10 bg-zinc-950/80 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p className="text-sm text-zinc-400">Platform operations and oversight</p>
    <h1 className="text-xl font-semibold text-white">Admin dashboard</h1>
  </div>

  <div className="flex items-center gap-3">
    <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400">
      <Search size={16} />
      <input
        className="w-full bg-transparent outline-none placeholder:text-zinc-500 sm:w-48"
        placeholder="Search"
      />
    </label>

    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
    >
      Logout
    </button>
  </div>
</header>

          {content}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
