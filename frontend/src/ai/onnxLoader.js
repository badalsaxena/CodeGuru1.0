import * as ort from "onnxruntime-web";

class OnnxLoader {
  async test() {
    console.log("ONNX Runtime Loaded");
    console.log(ort);
    return true;
  }
}

export default new OnnxLoader();