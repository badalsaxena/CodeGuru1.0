class HeadPoseDetector {
 constructor() {
  this.lastDirection = null;
  this.pendingDirection = null;
  this.frameCount = 0;
  this.requiredFrames = 3;
}

  analyze(faceLandmarks) {
    if (!faceLandmarks || faceLandmarks.length === 0) {
  return {
    direction: this.lastDirection || "FORWARD",
    difference: null,
    verticalDifference: null,
    changed: false,
  };
}

    const landmarks = faceLandmarks[0];

    const nose = landmarks[1];
    const leftCheek = landmarks[234];
    const rightCheek = landmarks[454];
    const forehead = landmarks[10];
    const chin = landmarks[152];

    const faceCenter = (leftCheek.x + rightCheek.x) / 2;

    const difference = nose.x - faceCenter;

    const faceCenterY =
    (forehead.y + chin.y) / 2;

    const verticalDifference =
    nose.y - faceCenterY;

    let direction = "FORWARD";

// Horizontal
if (difference > 0.03) {
  direction = "RIGHT";
} else if (difference < -0.03) {
  direction = "LEFT";
}

// Vertical
else if (verticalDifference > 0.045) {
  direction = "DOWN";
} else if (verticalDifference < -0.035) {
  direction = "UP";
}

    return {
  direction,
  difference,
  verticalDifference,
  changed: this.update(direction),
    };
  }

 update(direction) {
  // Same pending direction
  if (this.pendingDirection === direction) {
    this.frameCount++;
  } else {
    this.pendingDirection = direction;
    this.frameCount = 1;
  }

  // Wait until enough consecutive frames
  if (this.frameCount < this.requiredFrames) {
    return false;
  }

  // State already active
  if (this.lastDirection === direction) {
    return false;
  }

  // Accept new stable direction
  this.lastDirection = direction;
  return true;
}

  reset() {
  this.lastDirection = null;
  this.pendingDirection = null;
  this.frameCount = 0;
}
}

const headPose = new HeadPoseDetector();

export default headPose;