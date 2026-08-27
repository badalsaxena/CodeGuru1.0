class ScreeningEngine {
  constructor() {
    this.lastStatus = null;
  }

  analyze(faceCount) {
    let currentStatus;

    if (faceCount === 0) {
      currentStatus = "NO_FACE";
    } else if (faceCount === 1) {
      currentStatus = "SINGLE_FACE";
    } else {
      currentStatus = "MULTIPLE_FACE";
    }

    const changed = currentStatus !== this.lastStatus;

    this.lastStatus = currentStatus;

    return {
      status: currentStatus,
      changed,
    };
  }

  reset() {
    this.lastStatus = null;
  }
}

const screeningEngine = new ScreeningEngine();

export default screeningEngine;