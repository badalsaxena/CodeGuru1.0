class EyeGazeDetector {
  constructor() {
    this.lastDirection = null;
    this.pendingDirection = null;
    this.frameCount = 0;
    this.requiredFrames = 3;
  }

  analyze(faceLandmarks) {
    if (!faceLandmarks || faceLandmarks.length === 0) {
      return {
        direction: this.lastDirection || "CENTER",
        changed: false,
      };
    }

    const landmarks = faceLandmarks[0];

// Left eye landmarks
const leftEyeLeft = landmarks[33];
const leftEyeRight = landmarks[133];
const leftIris = landmarks[468];
// Top & Bottom eyelid
const leftEyeTop = landmarks[159];
const leftEyeBottom = landmarks[145];

// Right Eye
const rightEyeOuter = landmarks[263];
const rightEyeInner = landmarks[362];
const rightIris = landmarks[473];

const rightEyeTop = landmarks[386];
const rightEyeBottom = landmarks[374];

// Eye width
const eyeWidth = Math.abs(
  leftEyeRight.x - leftEyeLeft.x
);

// Iris position (0 → left, 1 → right)
const irisRatio =
  (leftIris.x - leftEyeLeft.x) / eyeWidth;

  const eyeHeight = Math.abs(
  leftEyeBottom.y - leftEyeTop.y
);

const irisVerticalRatio =
(leftIris.y - leftEyeTop.y) / eyeHeight;

// Right Eye Width
const rightEyeWidth = Math.abs(
  rightEyeOuter.x - rightEyeInner.x
);

// Right Eye Height
const rightEyeHeight = Math.abs(
  rightEyeBottom.y - rightEyeTop.y
);

// Horizontal Ratio
const rightIrisRatio =
  Math.abs(rightIris.x - rightEyeOuter.x) /
  rightEyeWidth;

// Vertical Ratio
const rightVerticalRatio =
  (rightIris.y - rightEyeTop.y) /
  rightEyeHeight;

  const averageHorizontal =
  (irisRatio + (1 - rightIrisRatio)) / 2;

const averageVertical =
  (irisVerticalRatio + rightVerticalRatio) / 2;

let direction = "CENTER";

if (averageHorizontal < 0.35) {
  direction = "LEFT";
} else if (averageHorizontal > 0.65) {
  direction = "RIGHT";
}

// Vertical
else if (averageVertical < 0.35) {
  direction = "UP";
} else if (averageVertical > 0.65) {
  direction = "DOWN";
}

   return {
  direction,
  x: averageHorizontal,
  y: averageVertical,
  changed: this.update(direction),
};
  }

  update(direction) {
    if (this.pendingDirection === direction) {
      this.frameCount++;
    } else {
      this.pendingDirection = direction;
      this.frameCount = 1;
    }

    if (this.frameCount < this.requiredFrames) {
      return false;
    }

    if (this.lastDirection === direction) {
      return false;
    }

    this.lastDirection = direction;
    return true;
  }

  reset() {
    this.lastDirection = null;
    this.pendingDirection = null;
    this.frameCount = 0;
  }
}

const eyeGaze = new EyeGazeDetector();

export default eyeGaze;