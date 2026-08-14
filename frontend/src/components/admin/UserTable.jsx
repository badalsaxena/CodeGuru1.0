import React from "react";

const UserTable = ({ title, users, onRestrictToggle, onView }) => {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-zinc-400">{users.length} records</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80">
        <table className="min-w-full text-left text-sm text-zinc-300">
          <thead className="bg-white/5 text-zinc-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id || u.id} className="border-t border-white/10">
                <td className="px-4 py-3 font-medium text-white">{u.fullName || u.name}</td>
                <td className="px-4 py-3 text-zinc-400">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${u.status === "Restricted" ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/10 text-emerald-300"}`}>
                    {u.status || (u.isRestricted ? "Restricted" : "Active")}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-zinc-500">{u.registeredAt ? new Date(u.registeredAt).toLocaleDateString() : (u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-")}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onView && onView(u)}
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300 hover:bg-white/10"
                    >
                      View
                    </button>

                    { (u.status === "Restricted" || u.isRestricted) ? (
                      <button
                        onClick={() => onRestrictToggle && onRestrictToggle(u, false)}
                        className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300 hover:bg-emerald-500/20"
                      >
                        Unrestrict
                      </button>
                    ) : (
                      <button
                        onClick={() => onRestrictToggle && onRestrictToggle(u, true)}
                        className="rounded-lg bg-rose-500/10 px-2.5 py-1 text-xs text-rose-300 hover:bg-rose-500/20"
                      >
                        Restrict
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No records found.</div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
