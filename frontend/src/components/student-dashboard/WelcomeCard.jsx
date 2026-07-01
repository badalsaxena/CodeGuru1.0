import { motion } from "framer-motion";
import { studentProfile, welcomeData } from "@/data/studentData";

const WelcomeCard = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/15 via-zinc-950/80 to-violet-500/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-cyan-400">Student Overview</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{studentProfile.name}</h3>
          <p className="mt-2 max-w-2xl text-sm text-zinc-300">{welcomeData.message}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-300">
          <p className="text-zinc-400">Current Course</p>
          <p className="mt-1 font-semibold text-white">{studentProfile.course}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-zinc-400">Progress</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-2.5 w-48 rounded-full bg-white/10">
              <div className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${welcomeData.progress}%` }} />
            </div>
            <span className="text-sm font-semibold text-white">{welcomeData.progress}%</span>
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          <p className="font-semibold">{welcomeData.streak} day streak</p>
          <p className="text-emerald-200">Daily rhythm is strong</p>
        </div>
      </div>
    </motion.section>
  );
};

export default WelcomeCard;