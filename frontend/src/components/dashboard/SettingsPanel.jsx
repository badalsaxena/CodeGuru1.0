const SettingsPanel = ({ profile }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/3">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Teacher Profile</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Your teacher profile</h2>
          <p className="mt-3 text-sm text-zinc-400">This panel is intentionally UI-only and ready for later API integration.</p>
          <div className="mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-3xl font-semibold text-black">
            {profile.fullName.split(" ").map((word) => word[0]).join("")}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-zinc-300">
              <span className="mb-2 block">Full Name</span>
              <input defaultValue={profile.fullName} className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 outline-none" />
            </label>
            <label className="text-sm text-zinc-300">
              <span className="mb-2 block">Email</span>
              <input defaultValue={profile.email} className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 outline-none" />
            </label>
            <label className="text-sm text-zinc-300">
              <span className="mb-2 block">Phone Number</span>
              <input defaultValue={profile.phone} className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 outline-none" />
            </label>
            <label className="text-sm text-zinc-300">
              <span className="mb-2 block">Department</span>
              <input defaultValue={profile.department} className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 outline-none" />
            </label>
          </div>

          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block">Experience</span>
            <input defaultValue={profile.experience} className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 outline-none" />
          </label>

          <label className="block text-sm text-zinc-300">
            <span className="mb-2 block">Bio</span>
            <textarea defaultValue={profile.bio} rows="4" className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 outline-none" />
          </label>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Change Password UI</p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <input placeholder="New Password" className="rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 outline-none" />
              <input placeholder="Confirm Password" className="rounded-2xl border border-white/10 bg-zinc-900/80 px-3 py-2 outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
