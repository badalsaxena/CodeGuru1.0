class NMS {
  iou(box1, box2) {
    const x1 = Math.max(box1.x, box2.x);
    const y1 = Math.max(box1.y, box2.y);

    const x2 = Math.min(
      box1.x + box1.width,
      box2.x + box2.width
    );

    const y2 = Math.min(
      box1.y + box1.height,
      box2.y + box2.height
    );

    const intersection =
      Math.max(0, x2 - x1) *
      Math.max(0, y2 - y1);

    const area1 = box1.width * box1.height;
    const area2 = box2.width * box2.height;

    const union =
      area1 + area2 - intersection;

    return union === 0 ? 0 : intersection / union;
  }

  apply(boxes, threshold = 0.5) {
    const result = [];

    boxes.sort(
      (a, b) => b.confidence - a.confidence
    );

    while (boxes.length > 0) {
      const current = boxes.shift();

      result.push(current);

      boxes = boxes.filter(
        (box) => this.iou(current, box) < threshold
      );
    }

    return result;
  }
}

export default new NMS();