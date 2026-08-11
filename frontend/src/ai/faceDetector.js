import {
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

class FaceDetectionManager {
  constructor() {
    this.detector = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
    );

    this.detector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
      },
      runningMode: "VIDEO",
      minDetectionConfidence: 0.6,
    });

    this.initialized = true;

    console.log("✅ Face Detector Initialized");
  }

  detect(video) {
    if (!this.detector) {
      throw new Error("Face detector not initialized");
    }

    const now = performance.now();

    const result = this.detector.detectForVideo(video, now);

    return {
      faceCount: result.detections.length,
      detections: result.detections,
    };
  }

  dispose() {
    if (this.detector) {
      this.detector.close();
      this.detector = null;
      this.initialized = false;
    }
  }
}

const faceDetector = new FaceDetectionManager();

export default faceDetector;