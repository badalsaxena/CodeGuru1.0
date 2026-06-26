import React from "react";
import { Button } from "@/components/ui/button";
import DarkVeil from "@/components/ui/DarkVeil";

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">

      {/* Background Animation */}
      <div className="absolute inset-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 px-6">

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white ">
          CodeGuru <span className="text-emerald-400">1.0</span>
        </h1>

        <p className="max-w-2xl text-center text-lg text-muted-foreground">
          AI-powered coding assessment platform for modern institutes.
          Live coding, anti-cheat monitoring, real-time classroom, and
          analytics—all in one place.
        </p>

        <div className="flex gap-4">
          <Button size="lg">
            Get Started
          </Button>

          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>

      </div>
    </div>
  );
};

export default App;