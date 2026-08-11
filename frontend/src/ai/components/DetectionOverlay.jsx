import { useRef, useEffect } from "react";

export default function DetectionOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(100, 100, 200, 100);

  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={480}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        border: "2px solid red",
        pointerEvents: "none",
        zIndex: 999,
      }}
    />
  );
}