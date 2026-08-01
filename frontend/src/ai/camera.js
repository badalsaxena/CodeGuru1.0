class CameraManager {
  constructor() {
    this.stream = null;
  }

  async start(videoElement) {
    if (!videoElement) {
      throw new Error("Video element not found.");
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      videoElement.srcObject = this.stream;
      await videoElement.play();

      return this.stream;
    } catch (error) {
      console.error("Unable to access camera:", error);
      throw error;
    }
  }

  stop() {
    if (!this.stream) return;

    this.stream.getTracks().forEach((track) => track.stop());
    this.stream = null;
  }
}

const cameraManager = new CameraManager();

export default cameraManager;