import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, Search, ChevronDown } from "lucide-react";

const STATUS_COLORS = {
  New:    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Soon:   "bg-amber-500/20   text-amber-300   border-amber-500/30",
  Ready:  "bg-sky-500/20     text-sky-300     border-sky-500/30",
  Review: "bg-violet-500/20  text-violet-300  border-violet-500/30",
};

const Header = ({ title, subtitle, user, notifications = [], workspace }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [search,    setSearch]    = useState("");
  const [dropPos,   setDropPos]   = useState({ top: 0, right: 0 });

  const bellRef = useRef(null);
  const dropRef = useRef(null);

  // Position the portal dropdown below the bell button
  const openNotif = () => {
    if (bellRef.current) {
      const rect = bellRef.current.getBoundingClientRect();
      setDropPos({
        top:   rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setNotifOpen((o) => !o);
  };

  // Close when clicking outside both the bell and the dropdown
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => {
      if (
        bellRef.current && !bellRef.current.contains(e.target) &&
        dropRef.current  && !dropRef.current.contains(e.target)
      ) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const initials    = user?.fullName
    ? user.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "S";
  const displayName = user?.fullName?.split(" ")[0] || "Student";
  const role        = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Student";

  const unreadCount = notifications.length;

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-6">

      {/* LEFT — title */}
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
          {workspace || "Student Workspace"}
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-white">{title}</h1>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>

      {/* RIGHT — search + bell + avatar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

        {/* Search insights */}
        <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-400 cursor-text">
          <Search className="h-4 w-4 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search insights"
            className="w-full bg-transparent outline-none placeholder:text-zinc-500 sm:w-44"
          />
        </label>

        {/* Bell button */}
        <button
          ref={bellRef}
          onClick={openNotif}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/70 text-zinc-200 transition hover:border-emerald-400/40 hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
          )}
        </button>

        {/* Student avatar */}
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 font-semibold text-black text-sm">
            {initials}
          </div>
          <div className="text-left">
            <p className="font-medium text-white">{displayName}</p>
            <p className="text-xs text-zinc-400">{role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </div>
      </div>

      {/* Notification dropdown — rendered via portal to escape stacking context */}
      {notifOpen && createPortal(
        <div
          ref={dropRef}
          style={{
            position: "absolute",
            top:   dropPos.top,
            right: dropPos.right,
            zIndex: 9999,
          }}
          className="w-80 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/60"
        >
          {/* Dropdown header */}
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <p className="text-sm font-semibold text-white">Notifications</p>
            {unreadCount > 0 && (
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-xs font-medium text-rose-300">
                {unreadCount} new
              </span>
            )}
          </div>

          {/* Notification items */}
          <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-zinc-500">
                No notifications
              </p>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-white/5 transition cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">{item.time}</p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${
                    STATUS_COLORS[item.status] || "bg-zinc-800 text-zinc-400 border-zinc-700"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-white/8 px-4 py-2.5">
              <button
                onClick={() => setNotifOpen(false)}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;
