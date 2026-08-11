class BlinkDetector {
  constructor() {
    this.eyeClosed = false;
    this.blinkCount = 0;
  }

  analyze(faceLandmarks) {
    if (!faceLandmarks || faceLandmarks.length === 0) {
      return {
        blink: false,
        blinkCount: this.blinkCount,
      };
    }

    const landmarks = faceLandmarks[0];

// Left Eye
const leftCorner = landmarks[33];
const rightCorner = landmarks[133];

const top = landmarks[159];
const bottom = landmarks[145];
// Right Eye
const rightOuter = landmarks[263];
const rightInner = landmarks[362];

const rightTop = landmarks[386];
const rightBottom = landmarks[374];

// Width
const eyeWidth = Math.abs(
  rightCorner.x - leftCorner.x
);

// Height
const eyeHeight = Math.abs(
  bottom.y - top.y
);

// Eye Aspect Ratio
const ear = eyeHeight / eyeWidth;

let blink = false;

// Right Eye Width
const rightEyeWidth = Math.abs(
  rightInner.x - rightOuter.x
);

// Right Eye Height
const rightEyeHeight = Math.abs(
  rightBottom.y - rightTop.y
);

// Right Eye EAR
const rightEar = rightEyeHeight / rightEyeWidth;

// Average EAR
const averageEar = (ear + rightEar) / 2;

// Eye Closed
if (averageEar < 0.30) {
  this.eyeClosed = true;
}

// Eye Open Again
if (averageEar > 0.38 && this.eyeClosed) {
  this.eyeClosed = false;

  this.blinkCount++;

  blink = true;
}


    return {
  blink,
  blinkCount: this.blinkCount,
  ear: averageEar,
};
  }

  reset() {
    this.eyeClosed = false;
    this.blinkCount = 0;
  }
}

const blinkDetector = new BlinkDetector();

export default blinkDetector;