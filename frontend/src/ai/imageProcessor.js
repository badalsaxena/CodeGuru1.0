import * as ort from "onnxruntime-web";

class ImageProcessor {
  constructor() {
    this.size = 640;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size;
    this.canvas.height = this.size;

    this.ctx = this.canvas.getContext("2d", {
  willReadFrequently: true,
});
  }

  process(video) {
    // Draw current webcam frame
    this.ctx.drawImage(video, 0, 0, this.size, this.size);

    // Read pixels
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.size,
      this.size
    );

    const { data } = imageData;

    // YOLO Input Tensor
    const input = new Float32Array(3 * this.size * this.size);

    // RGB → CHW
    for (let i = 0; i < this.size * this.size; i++) {
      input[i] =
        data[i * 4] / 255;

      input[i + this.size * this.size] =
        data[i * 4 + 1] / 255;

      input[i + 2 * this.size * this.size] =
        data[i * 4 + 2] / 255;
    }

    return new ort.Tensor(
      "float32",
      input,
      [1, 3, this.size, this.size]
    );
  }
}

export default new ImageProcessor();