import eventManager from "./eventManager";

class BrowserMonitor {
  constructor() {
    this.initialized = false;

    // Store handlers so they can be removed later
    this.handleVisibilityChange = null;
    this.handleWindowBlur = null;
    this.handleWindowFocus = null;
    this.handleFullscreenChange = null;
  }

  initialize() {
    if (this.initialized) return;

    console.log("✅ Browser Monitor Started");

    // -----------------------
    // Tab Switch Detection
    // -----------------------

    this.handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("🚨 TAB SWITCH");

        eventManager.emit({
          type: "TAB_SWITCH",
          severity: 7,
        });
      }
    };

    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );

    // -----------------------
    // Window Blur Detection
    // -----------------------

    this.handleWindowBlur = () => {
      console.log("🚨 WINDOW BLUR");

      eventManager.emit({
        type: "WINDOW_BLUR",
        severity: 5,
      });
    };

    window.addEventListener("blur", this.handleWindowBlur);

    // -----------------------
    // Window Focus Detection
    // -----------------------

    this.handleWindowFocus = () => {
      console.log("✅ WINDOW FOCUS");

      eventManager.emit({
        type: "WINDOW_FOCUS",
        severity: 0,
      });
    };

    window.addEventListener("focus", this.handleWindowFocus);

    // -----------------------
    // Full Screen Detection
    // -----------------------

    this.handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        console.log("🚨 FULLSCREEN EXIT");

        eventManager.emit({
          type: "FULLSCREEN_EXIT",
          severity: 8,
        });
      }
    };

    document.addEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );

    this.initialized = true;
  }

  dispose() {
    if (!this.initialized) return;

    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );

    window.removeEventListener(
      "blur",
      this.handleWindowBlur
    );

    window.removeEventListener(
      "focus",
      this.handleWindowFocus
    );

    document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange
    );

    this.initialized = false;

    console.log("🛑 Browser Monitor Stopped");
  }
}

export default new BrowserMonitor();