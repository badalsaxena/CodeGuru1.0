import { useEffect, useRef } from "react";
import cameraManager from "../ai/camera";

export default function useCamera() {
  const videoRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function startCamera() {
      try {
        if (mounted && videoRef.current) {
          await cameraManager.start(videoRef.current);
        }
      } catch (error) {
        console.error("Camera Error:", error);
      }
    }

    startCamera();

    return () => {
      mounted = false;
      cameraManager.stop();
    };
  }, []);

  return { videoRef };
}