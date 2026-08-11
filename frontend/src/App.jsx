import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import DemoSections from "@/components/sections/DemoSections";
import AuthPage from "@/pages/AuthPage";
import { Button } from "@/components/ui/button";
import DarkVeil from "@/components/ui/Darkveil";
import TeacherPage from "@/pages/TeacherPage";
import StudentPage from "@/pages/StudentPage";
import AdminPage from "@/pages/AdminPage";
import CameraPreview from "@/components/screening/CameraPreview";

const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [view, setView] = useState("landing");
  
  React.useEffect(() => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    if (user.role === "teacher") {
      setView("teacher");
    } else if (user.role === "student") {
      setView("student");
    } else if (user.role === "admin") {
      setView("admin");
    }
  }
}, []);

  

  if (view === "teacher") {
  return (
    <div className="relative min-h-screen bg-zinc-950">

      <div className="fixed top-4 right-4 z-[9999] w-64 h-48 border-2 border-red-500">
        <CameraPreview />
      </div>

      <TeacherPage />
    </div>
  );
}

  if (view === "student") {
    return (
      <div className="relative min-h-screen bg-zinc-950">
        <CameraPreview />

        <StudentPage />
      </div>
    );
  }

  if (view === "admin") {
    return (
      <div className="relative min-h-screen bg-zinc-950">
      
        <AdminPage />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {showAuth && <AuthPage onClose={() => setShowAuth(false)} />}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.02}
          scanlineIntensity={0.1}
          speed={0.4}
          scanlineFrequency={0.2}
          warpAmount={0.2}
        />
      </div>

      <Navbar onAuthOpen={() => setShowAuth(true)} />

      

      <main className="relative z-10">
        <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
          <h1
            className="text-6xl leading-none tracking-tight text-white md:text-8xl"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            CodeGuru <span className="text-emerald-400">1.0</span>
          </h1>

          <p className="max-w-3xl text-center text-base leading-relaxed tracking-wide text-zinc-300 sm:text-xl">
            AI-powered coding assessment platform for modern institutes. Live coding,
            anti-cheat monitoring, real-time classroom, and analytics—all in one place.
          </p>

          <div className="flex gap-4">
            <Button
              size="lg"
              onClick={() => setShowAuth(true)}
              className="rounded-full bg-emerald-500 font-semibold text-black transition-transform hover:scale-[1.02] hover:bg-emerald-600"
            >
              Get Started
            </Button>

            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Button variant="outline" size="lg" className="rounded-full">
                Watch Demo
              </Button>
            </a>
          </div>
        </section>

        <DemoSections />
      </main>
    </div>
  );
};

export default App;