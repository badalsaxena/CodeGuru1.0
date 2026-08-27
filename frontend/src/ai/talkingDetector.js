class TalkingDetector {
  constructor() {
    this.openCount = 0;
    this.closedCount = 0;

    this.lastState = "CLOSED";
    this.transitionCount = 0;

    this.startTime = Date.now();
  }

  analyze(mouthState) {
    const now = Date.now();

    if (!mouthState) {
      return null;
    }

    // Count OPEN/CLOSED states
    if (mouthState === "OPEN") {
      this.openCount++;
    }

    if (mouthState === "CLOSED") {
      this.closedCount++;
    }

    // Detect mouth state transition
    if (
      mouthState !== this.lastState &&
      (mouthState === "OPEN" || mouthState === "CLOSED")
    ) {
      this.transitionCount++;
      this.lastState = mouthState;
    }

    // Analyze every 2 seconds
    if (now - this.startTime >= 2000) {

      /*
       * Talking requires repeated mouth movement.
       *
       * Example:
       * CLOSED → OPEN → CLOSED → OPEN → CLOSED
       *
       * This creates multiple transitions.
       */

      const talking =
        this.transitionCount >= 4 &&
        this.openCount >= 3 &&
        this.closedCount >= 3;

      const result = {
        talking,
        openCount: this.openCount,
        closedCount: this.closedCount,
        transitions: this.transitionCount,
      };

      // Reset window
      this.openCount = 0;
      this.closedCount = 0;
      this.transitionCount = 0;
      this.startTime = now;

      return result;
    }

    return null;
  }

  reset() {
    this.openCount = 0;
    this.closedCount = 0;
    this.lastState = "CLOSED";
    this.transitionCount = 0;
    this.startTime = Date.now();
  }
}

const talkingDetector = new TalkingDetector();

export default talkingDetector;