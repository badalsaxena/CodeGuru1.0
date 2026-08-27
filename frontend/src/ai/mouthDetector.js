class MouthDetector {
  constructor() {
    this.lastState = null;
    this.pendingState = null;
    this.frameCount = 0;
    this.requiredFrames = 3;
  }

  analyze(faceBlendshapes) {
    if (!faceBlendshapes || faceBlendshapes.length === 0) {
      return {
        state: "NO_FACE",
        changed: false,
      };
    }

    const categories = faceBlendshapes[0].categories;

    const jawOpen = categories.find(
      (c) => c.categoryName === "jawOpen"
    );

    const score = jawOpen?.score || 0;

    let state = "CLOSED";

    // Threshold
    if (score > 0.15) {
      state = "OPEN";
    }

    return {
      state,
      score,
      changed: this.update(state),
    };
  }

  update(state) {
    if (this.pendingState === state) {
      this.frameCount++;
    } else {
      this.pendingState = state;
      this.frameCount = 1;
    }

    if (this.frameCount < this.requiredFrames) {
      return false;
    }

    if (this.lastState === state) {
      return false;
    }

    this.lastState = state;
    return true;
  }

  reset() {
    this.lastState = null;
    this.pendingState = null;
    this.frameCount = 0;
  }
}

const mouthDetector = new MouthDetector();

export default mouthDetector;