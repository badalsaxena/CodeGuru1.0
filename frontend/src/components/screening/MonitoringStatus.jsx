import { useEffect, useState } from "react";
import monitoringState from "../../ai/monitoringState";

export default function MonitoringStatus() {
  const [state, setState] = useState(monitoringState.get());

  useEffect(() => {
    return monitoringState.subscribe(setState);
  }, []);

  return (
    <div className="mt-2 text-xs text-white space-y-1">
      <div>👤 Face : {state.face}</div>
      <div>📱 Phone : {state.phone ? "Detected" : "Not Found"}</div>
      <div>🗣 Talking : {state.talking ? "Yes" : "No"}</div>
      <div>🧭 Head : {state.head}</div>
      <div>👀 Eye : {state.eye}</div>
      <div>🛡 Integrity : {state.integrity}%</div>
      <div>⚠ Warnings : {state.warnings}</div>
    </div>
  );
}