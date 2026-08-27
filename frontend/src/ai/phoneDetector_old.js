import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

class PhoneDetector {
  constructor() {
    this.model = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      console.log("Loading TensorFlow...");

      await tf.ready();

      console.log("TensorFlow Ready");

      console.log("Loading COCO SSD...");

      this.model = await cocoSsd.load();

      console.log("Model Loaded:", this.model);

      this.initialized = true;

      console.log("✅ Phone Detector Initialized");
    } catch (err) {
      console.error("PHONE DETECTOR ERROR:", err);
    }
  }

  async detect(video) {
    if (!this.model) return [];

    return await this.model.detect(video);
  }

  dispose() {
    this.model = null;
    this.initialized = false;
  }
}

export default new PhoneDetector();