import React, { useEffect, useMemo, useState, useCallback } from "react";
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
  Loader2,
  UserCheck,
  UserX,
  RefreshCw,
} from "lucide-react";
import {
  approvalRequests,
  profileSettings,
  sidebarItems,
} from "@/data/adminData";
import API from "@/utils/api";
import { getAssessments } from "@/services/assessmentService";

const iconMap = {
  dashboard: LayoutGrid,
  approvals: CheckCircle2,
  management: Users2,
  analytics: BarChart3,
  tests: ClipboardCheck,
  settings: SettingsIcon,
};

const ROLE_STYLES = {
  student: "bg-cyan-500/10 text-cyan-300",
  teacher: "bg-emerald-500/10 text-emerald-300",
  admin: "bg-violet-500/10 text-violet-300",
};

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "admin") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  // ── Real user data ──────────────────────────────────────────────
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const res = await API.get("/auth/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const [tests, setTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(false);

  const fetchTests = useCallback(async () => {
    try {
      setTestsLoading(true);
      const data = await getAssessments();
      setTests(data.assessments || []);
    } catch (err) {
      console.error("Failed to load assessments:", err);
    } finally {
      setTestsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchTests();
  }, [fetchUsers, fetchTests]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.fullName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const realStats = useMemo(() => [
    {
      id: 1, title: "Total Users", value: users.length,
      description: "All registered users", icon: Users,
    },
    {
      id: 2, title: "Students", value: users.filter((u) => u.role === "student").length,
      description: "Active student accounts", icon: Users2,
    },
    {
      id: 3, title: "Teachers", value: users.filter((u) => u.role === "teacher").length,
      description: "Instructor accounts", icon: ShieldCheck,
    },
    {
      id: 4, title: "Admins", value: users.filter((u) => u.role === "admin").length,
      description: "Platform administrators", icon: ShieldAlert,
    },
  ], [users]);

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
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalRequests.map((request) => (
                    <tr key={request.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{request.name}</td>
                      <td className="px-4 py-3">{request.role}</td>
                      <td className="px-4 py-3">{request.institute}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300 hover:bg-emerald-500/20 transition">
                            <UserCheck className="h-3 w-3" /> Approve
                          </button>
                          <button className="flex items-center gap-1 rounded-lg bg-rose-500/10 px-2.5 py-1 text-xs text-rose-300 hover:bg-rose-500/20 transition">
                            <UserX className="h-3 w-3" /> Reject
                          </button>
                        </div>
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">User management</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {users.length} registered users across all roles.
                  </p>
                </div>
                <button
                  onClick={fetchUsers}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Refresh
                </button>
              </div>
            </div>

            {usersLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80">
                <table className="min-w-full text-left text-sm text-zinc-300">
                  <thead className="bg-white/5 text-zinc-400">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Verified</th>
                      <th className="px-4 py-3">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="border-t border-white/10">
                        <td className="px-4 py-3 font-medium text-white">{u.fullName}</td>
                        <td className="px-4 py-3 text-zinc-400">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[u.role] || "bg-zinc-500/10 text-zinc-300"}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {u.isVerified ? (
                            <span className="flex items-center gap-1 text-xs text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                            </span>
                          ) : (
                            <span className="text-xs text-zinc-500">Pending</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-zinc-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="py-12 text-center text-sm text-zinc-500">
                    No users found.
                  </div>
                )}
              </div>
            )}
          </section>
        );

      case "tests":
        return (
          <section className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
              <h2 className="text-lg font-semibold text-white">Test management</h2>
              <p className="mt-1 text-sm text-zinc-400">View and manage all platform assessments.</p>
            </div>
            
            {testsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
              </div>
            ) : tests.length === 0 ? (
              <p className="text-center text-sm text-zinc-500 py-6">No assessments found.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tests.map((test) => (
                  <div key={test._id} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                    <p className="font-semibold text-white">{test.title}</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      Teacher: {test.teacher?.fullName || "Unknown"}
                    </p>
                    <p className="text-sm text-zinc-400">Marks: {test.totalMarks}</p>
                    <p className="text-sm text-zinc-400">Duration: {test.duration} min</p>
                    <p className="mt-3 inline-flex rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300">
                      {test.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        );

      case "settings":
        return (
          <section className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
            <h2 className="text-lg font-semibold text-white">Profile settings</h2>
            <p className="mt-1 text-sm text-zinc-400">Admin profile editing controls.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-300">
                <span className="mb-2 block text-zinc-400">Full Name</span>
                <input className="w-full bg-transparent outline-none" defaultValue={user?.fullName || profileSettings.fullName} />
              </label>
              <label className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-300">
                <span className="mb-2 block text-zinc-400">Email</span>
                <input className="w-full bg-transparent outline-none" defaultValue={user?.email || profileSettings.email} />
              </label>
            </div>
          </section>
        );

      case "dashboard":
      default:
        return (
          <section className="space-y-6">
            {/* Stats from real data */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {realStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.id} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-zinc-400">{stat.title}</p>
                        <p className="mt-2 text-2xl font-semibold text-white">
                          {usersLoading ? <Loader2 className="h-6 w-6 animate-spin text-zinc-500" /> : stat.value}
                        </p>
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
              {/* Recent users */}
              <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
                <h2 className="text-lg font-semibold text-white">Recent registrations</h2>
                <div className="mt-4 space-y-3">
                  {usersLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
                    </div>
                  ) : users.slice(0, 5).map((u) => (
                    <div key={u._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      <div>
                        <p className="font-medium text-white">{u.fullName}</p>
                        <p className="text-sm text-zinc-400">{u.email}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[u.role] || "bg-zinc-500/10 text-zinc-300"}`}>
                        {u.role}
                      </span>
                    </div>
                  ))}
                  {!usersLoading && users.length === 0 && (
                    <p className="text-center text-sm text-zinc-500 py-6">No users yet.</p>
                  )}
                </div>
              </div>

              {/* Platform health */}
              <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
                <h2 className="text-lg font-semibold text-white">Platform health</h2>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm text-zinc-400">Total Registered</p>
                    <p className="mt-1 text-xl font-semibold text-white">{users.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm text-zinc-400">Teachers</p>
                    <p className="mt-1 text-xl font-semibold text-white">
                      {users.filter((u) => u.role === "teacher").length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm text-zinc-400">Students</p>
                    <p className="mt-1 text-xl font-semibold text-white">
                      {users.filter((u) => u.role === "student").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, filteredUsers, usersLoading, users, realStats, tests, testsLoading]);

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
              <h1 className="text-xl font-semibold text-white">
                Admin dashboard — {user?.fullName || "Admin"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400">
                <Search size={16} />
                <input
                  className="w-full bg-transparent outline-none placeholder:text-zinc-500 sm:w-48"
                  placeholder="Search users…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeSection !== "management") setActiveSection("management");
                  }}
                />
              </label>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
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
