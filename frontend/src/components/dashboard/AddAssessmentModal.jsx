import { useState } from "react";
import { X, Loader2, AlertCircle, CheckCircle2, Calendar, Clock } from "lucide-react";
import {
  createAssessment,
  updateAssessment,
} from "@/services/assessmentService";

export default function AddAssessmentModal({
  onClose,
  onSuccess,
  assessment = null,
  isEdit = false,
}) {
 const [form, setForm] = useState({
  title: assessment?.title || "",
  description: assessment?.description || "",
  duration: assessment?.duration || 60,
  totalMarks: assessment?.totalMarks || 100,
  startTime: assessment?.startTime
    ? assessment.startTime.slice(0, 16)
    : "",
  endTime: assessment?.endTime
    ? assessment.endTime.slice(0, 16)
    : "",
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Assessment title is required.");
      return;
    }
    if (!form.duration || form.duration < 1) {
      setError("Duration must be at least 1 minute.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        duration: Number(form.duration),
        totalMarks: Number(form.totalMarks),
        startTime: form.startTime || undefined,
        endTime: form.endTime || undefined,
      };
      const data = isEdit
  ? await updateAssessment(assessment._id, payload)
  : await createAssessment(payload);
      setSuccess(
  isEdit
    ? "Assessment updated successfully!"
    : "Assessment created successfully!"
);
      setTimeout(() => {
        onSuccess && onSuccess(data.assessment);
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || "Failed to create assessment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
          <h2 className="text-lg font-bold text-white">
  {isEdit ? "Edit Assessment" : "Create Assessment"}
</h2>
            <p className="text-xs text-zinc-400">Schedule a new coding exam</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-400 transition hover:border-rose-400/40 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Alerts */}
          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-3.5">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <p className="text-xs text-emerald-300">{success}</p>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Title *
            </label>
            <input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. Data Structures Midterm"
              className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              placeholder="Describe what this assessment covers..."
              className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition resize-none"
            />
          </div>

          {/* Duration & Marks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                <Clock className="inline h-3 w-3 mr-1" />Duration (min) *
              </label>
              <input
                type="number"
                min="1"
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Total Marks
              </label>
              <input
                type="number"
                min="1"
                value={form.totalMarks}
                onChange={(e) => handleChange("totalMarks", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
              />
            </div>
          </div>

          {/* Start & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                <Calendar className="inline h-3 w-3 mr-1" />Start Time
              </label>
              <input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition [color-scheme:dark]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                <Calendar className="inline h-3 w-3 mr-1" />End Time
              </label>
              <input
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-bold text-black transition hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
  <>
    <Loader2 className="h-4 w-4 animate-spin" />
    {isEdit ? " Updating..." : " Creating..."}
  </>
) : (
  isEdit ? "Update Assessment" : "Create Assessment"
)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
