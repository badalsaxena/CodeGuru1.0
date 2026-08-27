import { useEffect } from "react";
import faceDetector from "../ai/faceDetector";
import faceLandmarker from "../ai/faceLandmarker";
import screeningEngine from "../ai/screeningEngine";
import headPose from "../ai/headPose";
import eyeGaze from "../ai/eyeGaze";
import eventManager from "../ai/eventManager";
import blinkDetector from "../ai/blinkDetector";
import mouthDetector from "../ai/mouthDetector";
import talkingDetector from "../ai/talkingDetector";
import yoloDetector from "../ai/yoloDetector";
import browserMonitor from "../ai/browserMonitor";
import monitoringState from "../ai/monitoringState";




export default function useScreening(videoRef) {
  useEffect(() => {
  let intervalId;
  let lastYoloTime = 0;

  monitoringState.reset();

  async function startScreening() {   
       try {
        // Load MediaPipe models
        await faceDetector.initialize();
        await faceLandmarker.initialize();
        await yoloDetector.initialize();

        browserMonitor.initialize(); // 👈 Add this

        console.log("✅ Screening Started");

        intervalId = setInterval(async () => {
          const video = videoRef.current;

          if (!video || video.readyState < 2) return;

          try {
           const result = faceDetector.detect(video);

const screeningResult = screeningEngine.analyze(result.faceCount);

// Print face status
if (screeningResult.changed) {
  switch (screeningResult.status) {

    
    
case "SINGLE_FACE":
  monitoringState.set({
    face: "Detected",
  });

  console.log("✅ Single Face Detected");
  break;


  }
}

// Run Head Pose ONLY when exactly one face exists
if (result.faceCount === 1) {
  const landmarkResult = faceLandmarker.detect(video);

  const poseResult = headPose.analyze(
    landmarkResult.faceLandmarks
  );

 if (poseResult.changed) {

  monitoringState.set({
    head: poseResult.direction,
  });

  eventManager.emit({
    type: "HEAD_DIRECTION",
    direction: poseResult.direction,
    x: poseResult.difference,
    y: poseResult.verticalDifference,
    severity: 2,
  });
}
 const eyeResult = eyeGaze.analyze(
  landmarkResult.faceLandmarks
);

// Eye
if (eyeResult.changed) {

  monitoringState.set({
    eye: eyeResult.direction,
  });

  eventManager.emit({
    type: "EYE_DIRECTION",
    direction: eyeResult.direction,
    x: eyeResult.x,
    y: eyeResult.y,
    severity: 1,
  });
}

// ----------------------
// Blink (Eye se bahar)
// ----------------------

const blinkResult = blinkDetector.analyze(
  landmarkResult.faceLandmarks
);

if (blinkResult.blink) {
  eventManager.emit({
    type: "BLINK",
    count: blinkResult.blinkCount,
    ear: blinkResult.ear,
    severity: 1,
  });
}

// ----------------------
// Mouth (Eye se bahar)
// ----------------------

const mouthResult = mouthDetector.analyze(
  landmarkResult.faceBlendshapes
);

// Talking detector should run EVERY FRAME
const talkingResult = talkingDetector.analyze(
  mouthResult.state
);

// Mouth event
if (mouthResult.changed) {
  eventManager.emit({
    type: "MOUTH_STATE",
    state: mouthResult.state,
    score: mouthResult.score,
    severity: 2,
  });
}

// Talking event
if (talkingResult) {

  monitoringState.set({
    talking: talkingResult.talking,
  });

  if (talkingResult.talking) {
    eventManager.emit({
      type: "TALKING",
      openCount: talkingResult.openCount,
      closedCount: talkingResult.closedCount,
      severity: 3,
    });
  }

}

// ----------------------
// YOLO Object Detection
// ----------------------

const now = Date.now();

if (now - lastYoloTime > 500) {

  lastYoloTime = now;

  const detections = await yoloDetector.detect(video);

eventManager.emit({
  type: "YOLO_DETECTIONS",
  detections,
  inputWidth: video.videoWidth,
  inputHeight: video.videoHeight,
});

console.log("📦 YOLO:", {
  videoWidth: video.videoWidth,
  videoHeight: video.videoHeight,
  detections,
});

  const phone = detections.find(
    item =>
      item.className === "cell phone" &&
      item.confidence > 0.45
  );
//phone detection logic
  if (phone) {

  monitoringState.set({
    phone: true,
    integrity: Math.min(monitoringState.get().integrity, 60),
  });

  const now = Date.now();

  if (now - lastPhoneWarningTime >= PHONE_WARNING_COOLDOWN) {

    lastPhoneWarningTime = now;

    eventManager.emit({
      type: "PHONE_DETECTED",
      confidence: phone.confidence,
      severity: 8,
    });

    console.log("📱 Phone Detected - Warning Sent", phone);
  }

} else {

  monitoringState.set({
    phone: false,
  });

}
  }
}

          } catch (error) {
            console.error("Detection Error:", error);
          }
        }, 100);
      } catch (error) {
        console.error("Screening Initialization Error:", error);
      }
    }

    startScreening();

   return () => {
  clearInterval(intervalId);

  browserMonitor.dispose();   // 👈 Add this

  faceDetector.dispose();
  faceLandmarker.dispose();
  yoloDetector.dispose();

  lastYoloTime = 0;
  lastPhoneWarningTime = 0;

  screeningEngine.reset();
  headPose.reset();
  eyeGaze.reset();
  blinkDetector.reset();
  mouthDetector.reset();
  talkingDetector.reset();
  monitoringState.reset();
};
  }, [videoRef]);
}