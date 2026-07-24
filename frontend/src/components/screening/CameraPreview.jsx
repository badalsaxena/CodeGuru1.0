import useCamera from "../../hooks/useCamera";

export default function CameraPreview() {
  const { videoRef } = useCamera();

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