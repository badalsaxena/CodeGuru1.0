import useCamera from "../../hooks/useCamera";
import useScreening from "../../hooks/useScreening";

export default function CameraPreview() {
  const { videoRef } = useCamera();
  useScreening(videoRef);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}