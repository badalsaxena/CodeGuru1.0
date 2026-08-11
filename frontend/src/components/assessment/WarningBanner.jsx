import { ShieldAlert } from "lucide-react";

/**
 * WarningBanner
 * Placeholder for future anti-cheat / browser-monitoring warnings.
 * Warning logic is NOT implemented — this is a visual placeholder only.
 *
 * Props:
 *   count  {number}  — number of warnings triggered (default 0)
 *   show   {boolean} — whether to render the banner (default false)
 */
export default function WarningBanner({ count = 0, show = false }) {
  if (!show) return null;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-300">
      <ShieldAlert className="h-4 w-4 shrink-0" />
      <span>
        Warning {count}: Suspicious activity detected.{" "}
        <span className="text-amber-500 font-semibold">
          Please stay on this page.
        </span>
      </span>
    </div>
  );
}
