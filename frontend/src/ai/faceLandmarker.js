import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

class FaceLandmarkerManager {
  constructor() {
    this.landmarker = null;
    this.initialized = false;
  }

  async initialize() {
  if (this.initialized) return;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
  );

  this.landmarker = await FaceLandmarker.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath:
      "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
  },
  runningMode: "VIDEO",
  numFaces: 2,

  outputFaceBlendshapes: true,
  outputFacialTransformationMatrixes: true,
});

  this.initialized = true;

console.log("✅ Face Landmarker Initialized");
}

detect(video) {
  if (!this.landmarker) {
    throw new Error("Face Landmarker not initialized");
  }

  const now = performance.now();

  const result = this.landmarker.detectForVideo(video, now);

  return result;
}

dispose() {
  if (this.landmarker) {
    this.landmarker.close();
    this.landmarker = null;
    this.initialized = false;
  }
}

}

const faceLandmarker = new FaceLandmarkerManager();

export default faceLandmarker;