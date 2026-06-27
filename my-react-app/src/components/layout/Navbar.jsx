import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function Navbar({ onAuthOpen = () => {} }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Smooth scroll handler
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
      {/* Floating Pill Container */}
      <div className="flex items-center justify-between w-full max-w-5xl h-14 px-6 bg-black/60 border border-white/10 rounded-full backdrop-blur-md shadow-2xl shadow-black/80">
        
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => handleScroll(e, "hero")}
          className="flex items-center gap-2 font-bold text-white text-base sm:text-lg tracking-tight select-none cursor-pointer"
        >
          <span className="text-emerald-400 font-mono font-black">&lt;/&gt;</span>
          <span>CodeGuru</span>
        </a>

        {/* Navigation Items (Middle) */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
          {/* Features Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("features")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer focus:outline-none"
              onClick={(e) => handleScroll(e, "features")}
            >
              Features
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            
            {activeDropdown === "features" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 z-50">
                <div className="bg-zinc-950/90 border border-white/10 rounded-xl p-2 backdrop-blur-lg shadow-xl">
                  <a 
                    href="#features" 
                    onClick={(e) => handleScroll(e, "features")}
                    className="block px-3.5 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    AI Auto-Grading
                  </a>
                  <a 
                    href="#features" 
                    onClick={(e) => handleScroll(e, "features")}
                    className="block px-3.5 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    Anti-Cheat Proctoring
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer focus:outline-none"
              onClick={(e) => handleScroll(e, "solutions")}
            >
              Solutions
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {activeDropdown === "solutions" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 z-50">
                <div className="bg-zinc-950/90 border border-white/10 rounded-xl p-2 backdrop-blur-lg shadow-xl">
                  <a 
                    href="#solutions" 
                    onClick={(e) => handleScroll(e, "solutions")}
                    className="block px-3.5 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    Institutes & Universities
                  </a>
                  <a 
                    href="#solutions" 
                    onClick={(e) => handleScroll(e, "solutions")}
                    className="block px-3.5 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    Coding Bootcamps
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* About Link */}
          <a 
            href="#about" 
            onClick={(e) => handleScroll(e, "about")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </a>
        </nav>

        {/* Action Controls (Right) */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <a 
            href="#login" 
            onClick={(e) => { e.preventDefault(); onAuthOpen(); }}
            className="text-zinc-400 hover:text-white font-medium transition-colors cursor-pointer"
          >
            Log In
          </a>
          
          <button
            onClick={onAuthOpen}
            className="inline-flex items-center gap-1 bg-white hover:bg-white/90 text-black font-semibold text-xs px-4 py-2.5 rounded-full transition-all duration-200 select-none shadow-sm cursor-pointer hover:scale-[1.02]"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}
