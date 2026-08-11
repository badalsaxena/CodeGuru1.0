import { useState, useEffect } from "react";
import {
  Send, Loader2, CheckCircle2, XCircle, Circle, CheckCircle,
} from "lucide-react";
import { createSubmission } from "@/services/submissionService";

const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

/**
 * MCQQuestion
 * Single-correct multiple-choice question.
 *
 * Props: question, assessmentId, onPrevious, onNext, hasPrevious, hasNext
 */
export default function MCQQuestion({
  question,
  assessmentId,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitResult,  setSubmitResult]  = useState(null); // raw API response
  const [submitted,     setSubmitted]     = useState(false);

  useEffect(() => {
    setSelectedIndex(null);
    setSubmitResult(null);
    setSubmitted(false);
  }, [question?._id]);

  const options = question?.options || [];

  // Derive display state from API response
  const isCorrect = submitResult?.isCorrect ?? null;
  const score     = submitResult?.score     ?? null;

  const handleSubmit = async () => {
    if (selectedIndex === null) return;
    if (!assessmentId) {
      setSubmitResult({ success: false, message: "Submissions require an active assessment." });
      setSubmitted(true);
      return;
    }
    setSubmitLoading(true);
    setSubmitResult(null);
    try {
      const data = await createSubmission({
        questionId:   question?._id,
        assessmentId,
        answer:       options[selectedIndex]?.text || "",
        selectedIndex,
      });
      setSubmitResult(data);
      setSubmitted(true);
    } catch (err) {
      setSubmitResult({ success: false, message: getErrorMessage(err, "Submission failed.") });
      setSubmitted(true);
    } finally {
      setSubmitLoading(false);
    }
  };

  // After submission: highlight correct vs wrong options
  const getOptionStyle = (i) => {
    if (!submitted) {
      return selectedIndex === i
        ? "border-emerald-500 bg-emerald-500/10 text-white"
        : "border-white/8 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800";
    }
    // Reveal correct answer after submit
    const isThisCorrect = options[i]?.isCorrect;
    const isThisSelected = selectedIndex === i;
    if (isThisCorrect) return "border-emerald-500 bg-emerald-500/10 text-emerald-200";
    if (isThisSelected && !isThisCorrect) return "border-rose-500 bg-rose-500/10 text-rose-300";
    return "border-white/8 bg-zinc-900/50 text-zinc-600";
  };

  const getOptionIcon = (i) => {
    if (!submitted) {
      return selectedIndex === i
        ? <CheckCircle className="h-5 w-5 shrink-0 text-emerald-400" />
        : <Circle      className="h-5 w-5 shrink-0 text-zinc-600"    />;
    }
    const isThisCorrect  = options[i]?.isCorrect;
    const isThisSelected = selectedIndex === i;
    if (isThisCorrect)              return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />;
    if (isThisSelected && !isThisCorrect) return <XCircle  className="h-5 w-5 shrink-0 text-rose-400"  />;
    return <Circle className="h-5 w-5 shrink-0 text-zinc-700" />;
  };

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">

      {/* ── LEFT: Question + options ──────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="rounded-2xl border border-white/8 bg-zinc-900 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white">
            {question?.title || "Question"}
          </h2>
          <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-sm">
            {question?.description || "No description available."}
          </p>
          {question?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {question.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            {submitted ? "Results" : "Select one answer"}
          </p>
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !submitted && setSelectedIndex(i)}
              disabled={submitted}
              className={`w-full text-left flex items-center gap-4 rounded-2xl border px-5 py-4 text-sm transition ${getOptionStyle(i)} disabled:cursor-default`}
            >
              {getOptionIcon(i)}
              <span>{opt.text || `Option ${i + 1}`}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Result panel ───────────────────────────────── */}
      <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-white/8 bg-zinc-900/60 flex flex-col p-5 gap-4">

        {/* Selected answer */}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Your Answer</p>
          {selectedIndex !== null ? (
            <p className="text-sm text-white font-medium">
              {options[selectedIndex]?.text || "—"}
            </p>
          ) : (
            <p className="text-xs text-zinc-600">No option selected yet.</p>
          )}
        </div>

        {/* Result after submission */}
        {submitted && submitResult && (
          <div className={`rounded-xl border p-4 space-y-2 ${
            isCorrect
              ? "border-emerald-500/30 bg-emerald-500/10"
              : submitResult.success === false
                ? "border-rose-500/30 bg-rose-500/10"
                : "border-rose-500/30 bg-rose-500/10"
          }`}>
            <div className={`flex items-center gap-2 font-semibold text-sm ${
              isCorrect ? "text-emerald-300" : "text-rose-300"
            }`}>
              {isCorrect
                ? <CheckCircle2 className="h-4 w-4" />
                : <XCircle      className="h-4 w-4" />}
              {isCorrect ? "Correct!" : (submitResult.success === false ? "Error" : "Wrong Answer")}
            </div>
            {/* Score earned */}
            {score !== null && submitResult.success !== false && (
              <p className="text-xs text-zinc-400">
                Score: <span className={`font-bold ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
                  {score} / {question?.marks ?? 0}
                </span>
              </p>
            )}
            {submitResult.message && (
              <p className="text-xs text-zinc-400">{submitResult.message}</p>
            )}
          </div>
        )}

        {/* Error before submission */}
        {!submitted && submitResult?.success === false && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <XCircle className="h-4 w-4" /> Error
            </div>
            <p className="text-xs opacity-80">{submitResult.message}</p>
          </div>
        )}

        <div className="mt-auto space-y-2">
          <button
            onClick={handleSubmit}
            disabled={submitLoading || submitted || selectedIndex === null || !assessmentId}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-black hover:bg-emerald-400 disabled:opacity-60 transition"
          >
            {submitLoading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Send    className="h-4 w-4" />}
            {submitted ? "Submitted" : "Submit Answer"}
          </button>
          <div className="flex gap-2">
            <button onClick={onPrevious} disabled={!hasPrevious}
              className="flex-1 rounded-lg border border-zinc-700 py-2 text-sm text-zinc-300 disabled:opacity-40 hover:bg-zinc-800 transition">
              Previous
            </button>
            <button onClick={onNext} disabled={!hasNext}
              className="flex-1 rounded-lg border border-zinc-700 py-2 text-sm text-zinc-300 disabled:opacity-40 hover:bg-zinc-800 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
