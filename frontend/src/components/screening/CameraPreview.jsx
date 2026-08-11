import useCamera from "../../hooks/useCamera";
import useScreening from "../../hooks/useScreening";

export default function CameraPreview() {
  const { videoRef } = useCamera();
  useScreening(videoRef);

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-700 bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
    </div>
  );
}