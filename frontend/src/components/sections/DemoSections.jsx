import React from "react";
import { Sparkles, Code2, Users, Cpu, ShieldAlert } from "lucide-react";
import TextPressure from "../TextPressure";

export default function DemoSections() {
  return (
    <div className="space-y-16">
      
      {/* 1. FEATURES SECTION */}
      <section id="features" className="relative min-h-[60vh] py-20 flex flex-col justify-center border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-5xl mx-auto px-6 w-full">
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Features Section
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mb-12">
            This is the demo area for features. Click navigation items to scroll here smoothly. We've built in subtle hover glowing styles matching your theme.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40 hover:border-emerald-500/30 transition-all duration-300 group">
              <Cpu className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">AI Auto-Grading</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Evaluates logic, code complexity, runtime efficiency, and corner cases automatically.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40 hover:border-emerald-500/30 transition-all duration-300 group">
              <ShieldAlert className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">Smart Proctoring</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Monitors copy-paste actions, tab tracking, and keystroke metrics in real time.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40 hover:border-emerald-500/30 transition-all duration-300 group">
              <Code2 className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">Custom IDE</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Full-featured online sandbox with custom test suites for candidate testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOLUTIONS SECTION */}
      <section id="solutions" className="relative min-h-[60vh] py-20 flex flex-col justify-center border-t border-white/5 bg-zinc-950/30">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Targeted Workspaces</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            Solutions Section
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mb-12">
            Tailored learning and assessment environments optimized specifically for academic institutions, bootcamps, and hiring teams.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl border border-white/10 bg-black/30 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-bold text-sm">01</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Academic Institutes</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Easily run semester finals, coding labs, and continuous grading assessments for hundreds of candidates simultaneously.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-black/30 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-bold text-sm">02</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Coding Bootcamps</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Real-time multi-student collaborative classrooms, live peer programming workspaces, and fast mentor guidance tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="relative min-h-[60vh] py-20 flex flex-col justify-center border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
            About CodeGuru
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
            CodeGuru 1.0 was designed to bring next-generation artificial intelligence directly into the classroom and testing environment. By blending real-time monitoring with automated code evaluation, we reduce scoring labor and improve academic integrity worldwide.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl border border-white/5 bg-black/40">
              <div className="text-2xl font-black text-emerald-400">99.9%</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Uptime</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-white/5 bg-black/40">
              <div className="text-2xl font-black text-emerald-400">10M+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Evaluations</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-white/5 bg-black/40">
              <div className="text-2xl font-black text-emerald-400">20+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Languages</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-white/5 bg-black/40">
              <div className="text-2xl font-black text-emerald-400">150+</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Institutes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GET STARTED SECTION */}
      <section id="get-started" className="relative min-h-[60vh] py-20 flex flex-col justify-center border-t border-white/5 bg-zinc-950/30">
        <div className="max-w-md mx-auto px-6 w-full text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get Started Now
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Create a free trial account to explore proctoring logs, draft assessments, and experiment with the automated scoring engine.
          </p>
          <div className="p-1 rounded-full border border-white/10 bg-black/50 flex items-center">
            <input 
              type="email" 
              placeholder="Enter institutional email" 
              className="bg-transparent border-0 outline-none px-4 py-2 text-xs text-white placeholder-zinc-600 flex-grow"
            />
            <button className="bg-white hover:bg-white/90 text-black text-xs font-bold px-4 py-2.5 rounded-full transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* 5. LOGIN DEMO SECTION
      <section id="login-demo" className="relative min-h-[60vh] py-20 flex flex-col justify-center border-t border-white/5 bg-zinc-950/20">
        <div className="max-w-sm mx-auto px-6 w-full">
          <div className="p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">Account Log In</h3>
              <p className="text-[11px] text-zinc-500 mt-1">Access the CodeGuru educator console</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Email address</label>
                <input
                  type="email"
                  placeholder="name@university.edu"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold py-2.5 rounded-lg transition-colors">
              Access Console
            </button>
          </div>
        </div>
      </section> */}

      {/* 6. TEXT PRESSURE — CLOSING SECTION (last on page) */}
      <section
        id="text-pressure-closing"
        className="relative border-t border-white/5 bg-black overflow-hidden"
      >
        {/* Subtle emerald glow behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[200px] bg-emerald-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Label above */}
        <div className="relative z-10 pt-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-semibold mb-2">
            Move your cursor over the text
          </p>
        </div>

        {/* TextPressure interactive display */}
        <div className="relative z-10 w-full h-[220px] px-4">
          <TextPressure
            text="CODEGURU"
            flex={true}
            width={true}
            weight={true}
            italic={true}
            alpha={false}
            stroke={false}
            scale={false}
            textColor="#ffffff"
            strokeColor="#10b981"
            minFontSize={36}
          />
        </div>

        {/* Tagline below */}
        <div className="relative z-10 pb-16 text-center">
          <p className="text-xs text-zinc-600 tracking-widest uppercase font-medium">
            AI-Powered Coding Assessment · Built for the Future
          </p>
        </div>
      </section>

    </div>
  );
}
