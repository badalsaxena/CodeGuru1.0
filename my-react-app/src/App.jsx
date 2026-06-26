import React from "react";
import Navbar from "@/components/layout/Navbar";
import DemoSections from "@/components/sections/DemoSections";
import { Button } from "@/components/ui/button";
import DarkVeil from "@/components/ui/Darkveil";

const App = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Background WebGL Animation */}
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

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen gap-6 px-6 pt-24 text-center">
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-none">
            CodeGuru <span className="text-emerald-400">1.0</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="max-w-2xl text-center text-sm sm:text-lg text-muted-foreground leading-relaxed">
            AI-powered coding assessment platform for modern institutes.
            Live coding, anti-cheat monitoring, real-time classroom, and
            analytics—all in one place.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex gap-4">
            <a 
              href="#get-started"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-full hover:scale-[1.02] transition-transform">
                Get Started
              </Button>
            </a>

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

        {/* DEMO SECTIONS FOR SCROLLING */}
        <DemoSections />

      </main>

    </div>
  );
};

export default App;