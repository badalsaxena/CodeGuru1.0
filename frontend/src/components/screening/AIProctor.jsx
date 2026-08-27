import CameraPreview from "./CameraPreview";
import DetectionOverlay from "./DetectionOverlay";
import MonitoringStatus from "./MonitoringStatus";

export default function AIProctor() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ width: 180 }}
    >
      <div
        className="relative rounded-xl overflow-hidden border border-zinc-700"
        style={{
          width: 180,
          height: 120,
        }}
      >
        <CameraPreview />
        <DetectionOverlay />
      </div>

      <MonitoringStatus />
    </div>
  );
}