import * as ort from "onnxruntime-web";
import imageProcessor from "./imageProcessor.js";
import yoloDecoder from "./yoloDecoder.js";

class YoloDetector {
  constructor() {
    this.session = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      console.log("📦 Loading YOLO Model...");

      this.session = await ort.InferenceSession.create(
        "/models/yolov8n.onnx",
        {
          executionProviders: ["wasm"],
        }
      );

      this.initialized = true;

      console.log("✅ YOLO Model Loaded");
      console.log(this.session);
    } catch (err) {
      console.error("❌ YOLO Load Error:", err);
    }
  }

  async detect(video) {
  if (!this.session) {
    throw new Error("YOLO Model not initialized");
  }

  // Image → Tensor
  const tensor = imageProcessor.process(video);

  // Get input name
  const inputName = this.session.inputNames[0];

  // Run inference
  const outputs = await this.session.run({
    [inputName]: tensor,
  });

  const output = outputs.output0;

  console.log("Shape:", output.dims);
  console.log("Tensor:", output);

  const detections = yoloDecoder.decode(output);

  console.log("Detections:", JSON.stringify(detections, null, 2));

  return detections;
  }

  dispose() {
    this.session = null;
    this.initialized = false;
  }
}

export default new YoloDetector();