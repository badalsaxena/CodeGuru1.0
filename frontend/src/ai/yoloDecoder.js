import COCO_CLASSES from "./cocoClasses.js";
import nms from "./nms.js";

class YoloDecoder {
  decode(output, confidenceThreshold = 0.4) {
    const data = output.cpuData;
    const detections = [];

    const numPredictions = output.dims[2]; // 8400

    for (let i = 0; i < numPredictions; i++) {

      const x = data[i];
      const y = data[8400 + i];
      const w = data[16800 + i];
      const h = data[25200 + i];

      let bestScore = 0;
      let bestClass = -1;

      for (let c = 4; c < 84; c++) {
        const score = data[c * 8400 + i];

        if (score > bestScore) {
          bestScore = score;
          bestClass = c - 4;
        }
      }

      if (bestScore < confidenceThreshold) continue;

      detections.push({
        classId: bestClass,
        className: COCO_CLASSES[bestClass],
        confidence: bestScore,
        x,
        y,
        width: w,
        height: h,
      });
    }

    const finalDetections = nms.apply(detections);

    return finalDetections;
  }
}

export default new YoloDecoder();