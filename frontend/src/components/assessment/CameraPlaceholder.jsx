import { Camera } from "lucide-react";

/**
 * CameraPlaceholder
 * Visual placeholder for the future webcam/proctoring feed.
 * No real camera access — AI monitoring is NOT implemented.
 */
export default function CameraPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-900 w-36 h-24 text-zinc-600 select-none">
      <Camera className="h-6 w-6" />
      <span className="text-[10px] uppercase tracking-widest">Camera</span>
    </div>
  );
}
