class TalkingDetector {
  constructor() {
  this.transitions = 0;
  this.lastState = "CLOSED";
  this.startTime = Date.now();

  this.isTalking = false;
  this.silentWindows = 0;
}

  analyze(mouthState) {
  const now = Date.now();

  // Count OPEN ↔ CLOSED transitions
  if (mouthState !== this.lastState) {
    this.transitions++;
    this.lastState = mouthState;
  }

  // Every 2 seconds
  if (now - this.startTime >= 2000) {

    let talking = false;

    // Start talking only once
    if (this.transitions >= 4) {

      this.silentWindows = 0;

      if (!this.isTalking) {
        this.isTalking = true;
        talking = true;
      }

    } else {

      this.silentWindows++;

      // Stop talking after 2 silent windows (≈4 sec)
      if (this.silentWindows >= 2) {
        this.isTalking = false;
      }

    }

    const result = {
      talking,
      transitions: this.transitions,
    };

    // Reset for next window
    this.transitions = 0;
    this.startTime = now;

    return result;
  }

  return null;
}

  reset() {
  this.transitions = 0;
  this.lastState = "CLOSED";
  this.startTime = Date.now();

  this.isTalking = false;
  this.silentWindows = 0;
}
}

const talkingDetector = new TalkingDetector();

export default talkingDetector;