import { useRef, useEffect } from "react";
import eventManager from "../../ai/eventManager";

export default function DetectionOverlay() {
  const canvasRef = useRef(null);

  console.log("✅ DetectionOverlay Rendered");

  useEffect(() => {
    console.log("🔥 DetectionOverlay Mounted");

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Match canvas size to displayed size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const unsubscribe = eventManager.subscribe((event) => {
      console.log("🔥 Overlay Event:", event.type);

      if (event.type !== "YOLO_DETECTIONS") return;

      console.log("📦 Overlay Received:", event.detections);

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      ctx.strokeStyle = "#00ff00";
      ctx.fillStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.font = "12px Arial";

      // Scale based on actual YOLO input size
      const inputWidth = event.inputWidth || 640;
      const inputHeight = event.inputHeight || 640;

      const scaleX = canvas.clientWidth / inputWidth;
      const scaleY = canvas.clientHeight / inputHeight;

      event.detections.forEach((item) => {
        if (item.confidence < 0.45) return;

        const x = item.x * scaleX;
        const y = item.y * scaleY;
        const w = item.width * scaleX;
        const h = item.height * scaleY;

        console.log("📍 Drawing:", {
          class: item.className,
          x,
          y,
          w,
          h,
        });

        ctx.strokeRect(x, y, w, h);

        ctx.fillText(
          `${item.className} ${Math.round(item.confidence * 100)}%`,
          x,
          Math.max(12, y - 5)
        );
      });
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50"
      style={{
        border: "2px solid red",
      }}
    />
  );
}