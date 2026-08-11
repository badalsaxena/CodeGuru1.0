import { useState, useEffect } from "react";
import { Send, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { createSubmission } from "@/services/submissionService";

const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

/**
 * SubjectiveQuestion
 * Long-form text answer with word limit and pending-review state.
 *
 * Props: question, assessmentId, onPrevious, onNext, hasPrevious, hasNext
 */
export default function SubjectiveQuestion({
  question,
  assessmentId,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) {
  const [answer,        setAnswer]        = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitResult,  setSubmitResult]  = useState(null);
  const [submitted,     setSubmitted]     = useState(false);

  const maxWords  = question?.maxWords || 0;
  const wordCount = answer.trim() === "" ? 0 : answer.trim().split(/\s+/).length;
  const overLimit = maxWords > 0 && wordCount > maxWords;

  useEffect(() => {
    setAnswer("");
    setSubmitResult(null);
    setSubmitted(false);
  }, [question?._id]);

  const handleSubmit = async () => {
    if (!answer.trim() || overLimit) return;
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
        answer,
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

  const isPending = submitted && submitResult?.success === true;
  const isError   = submitResult?.success === false;

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">

      {/* ── LEFT: Question + textarea ─────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Your Answer</p>
            {maxWords > 0 && (
              <span className={`text-xs font-medium ${overLimit ? "text-rose-400" : wordCount > maxWords * 0.8 ? "text-amber-400" : "text-zinc-500"}`}>
                {wordCount} / {maxWords} words
              </span>
            )}
          </div>
          <textarea
            value={answer}
            onChange={(e) => !submitted && setAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Write your detailed answer here…"
            rows={10}
            className="w-full rounded-2xl border border-white/8 bg-zinc-900 p-4 text-sm text-zinc-200 outline-none resize-y leading-relaxed placeholder:text-zinc-600 focus:border-emerald-500/50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          />
          {overLimit && (
            <p className="text-xs text-rose-400">
              Exceeds the maximum word limit of {maxWords} words.
            </p>
          )}
        </div>
      </div>

      {/* ── RIGHT: Status panel ───────────────────────────────── */}
      <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l border-white/8 bg-zinc-900/60 flex flex-col p-5 gap-4">

        {/* Word counter */}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Word Count</p>
          <p className={`text-3xl font-bold ${overLimit ? "text-rose-400" : "text-white"}`}>
            {wordCount}
            {maxWords > 0 && (
              <span className="text-sm font-normal text-zinc-500"> / {maxWords}</span>
            )}
          </p>
        </div>

        {/* Submitted — pending review */}
        {isPending && (
          <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-sm text-sky-300">
              <Clock className="h-4 w-4" />
              Awaiting Review
            </div>
            <p className="text-xs text-zinc-400">
              Your answer has been submitted. The teacher will review and grade it.
            </p>
          </div>
        )}

        {/* Submission error */}
        {isError && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-sm text-rose-300">
              <XCircle className="h-4 w-4" /> Failed
            </div>
            <p className="text-xs text-zinc-400">{submitResult?.message}</p>
          </div>
        )}

        <div className="mt-auto space-y-2">
          <button
            onClick={handleSubmit}
            disabled={submitLoading || submitted || !answer.trim() || overLimit || !assessmentId}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-black hover:bg-emerald-400 disabled:opacity-60 transition"
          >
            {submitLoading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : submitted
                ? <CheckCircle2 className="h-4 w-4" />
                : <Send className="h-4 w-4" />}
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
