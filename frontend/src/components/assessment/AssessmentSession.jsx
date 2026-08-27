import { useState, useCallback, useEffect } from "react";
import { LogOut, Loader2 } from "lucide-react";
import eventManager from "../../ai/eventManager";
import monitoringState from "../../ai/monitoringState";
import AssessmentLayout from "./AssessmentLayout";
import QuestionRenderer from "./QuestionRenderer";

/**
 * AssessmentSession
 * Top-level orchestrator for the assessment experience.
 *
 * Owns:
 *   - Question navigation (previous / next / jump via pill)
 *   - Per-question answer state (preserved across navigation)
 *   - Global "Submit Assessment" button (ends session and returns to dashboard)
 *
 * Does NOT own:
 *   - Assessment data fetching (StudentPage owns that)
 *   - Timer implementation (future backend feature)
 *   - AI / camera monitoring (future feature)
 *
 * Answer preservation:
 *   answerMap  { [questionId]: { answer, selectedIndex, code, language, submitted } }
 *   Each question component reads its saved state on mount and writes back on
 *   every change / submission via onAnswerChange().
 */
export default function AssessmentSession({
  assessment,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setEditorQuestion,
    assessmentId, 
  attemptId, 
  startTime,
  onBack, 
}) {

  const [examBlocked, setExamBlocked] = useState(
  monitoringState.get().blocked
);

  useEffect(() => {
    const unsubscribe = monitoringState.subscribe((state) => {
      setExamBlocked(state.blocked);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
  if (!examBlocked) return;

  const timer = setTimeout(() => {
    onBack();
  }, 3000);

  return () => clearTimeout(timer);
}, [examBlocked, onBack]);

  useEffect(() => {
  if (attemptId) {
    eventManager.setAttemptId(attemptId);
  }

  return () => {
    eventManager.reset();
  };
}, [attemptId]);
  const questions      = assessment?.questions || [];
  const totalQuestions = questions.length;
  const question       = questions[currentQuestionIndex] || null;

  // ── Lifted answer state ───────────────────────────────────────────────────
  // Keyed by question._id so it survives navigation in both directions.
  const [answerMap, setAnswerMap] = useState({});

  const handleAnswerChange = useCallback((questionId, patch) => {
    setAnswerMap((prev) => ({
      ...prev,
      [questionId]: { ...(prev[questionId] || {}), ...patch },
    }));
  }, []);

  // ── Submit Assessment modal state ─────────────────────────────────────────
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting,  setSubmitting]  = useState(false);

  const handleFinishAssessment = () => setShowConfirm(true);

  const confirmFinish = async () => {
    setSubmitting(true);
    // Brief delay for UX — real completion logic can hook here later
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setShowConfirm(false);
    onBack();
  };

  // ── Navigation helpers ────────────────────────────────────────────────────
  const goTo = (index) => {
    if (index < 0 || index >= totalQuestions) return;
    setCurrentQuestionIndex(index);
    setEditorQuestion(questions[index]);
  };

  const handlePrevious       = () => goTo(currentQuestionIndex - 1);
  const handleNext           = () => goTo(currentQuestionIndex + 1);
  const handleQuestionChange = (index) => goTo(index);

  const hasPrevious = currentQuestionIndex > 0;
  const hasNext     = currentQuestionIndex < totalQuestions - 1;

  // Answered count for the confirmation dialog
  const answeredCount = Object.keys(answerMap).filter(
    (id) => answerMap[id]?.submitted
  ).length;

  return (
    <>
    {/* ── Exam Blocked modal ───────────────────────────────────────────────*/}
    {examBlocked && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
    <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-zinc-900 p-8 text-center shadow-2xl">
      
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
        <span className="text-3xl">🚫</span>
      </div>

      <h2 className="text-2xl font-bold text-red-400">
        Assessment Blocked
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        Your assessment has been automatically blocked because
        the maximum warning limit has been reached.
      </p>

      <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <p className="text-sm text-red-300">
          Maximum warnings reached
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          You can no longer continue this assessment.
        </p>
      </div>

      <button
        onClick={onBack}
        className="mt-6 w-full rounded-xl bg-red-500 py-3 text-sm font-bold text-white transition hover:bg-red-400"
      >
        Exit Assessment
      </button>

    </div>
  </div>
)}
      {/* ── Submit Assessment confirmation modal ───────────────── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900 p-7 shadow-2xl space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">Submit Assessment?</h2>
              <p className="text-sm text-zinc-400">
                You have answered{" "}
                <span className="font-semibold text-white">{answeredCount}</span>{" "}
                of{" "}
                <span className="font-semibold text-white">{totalQuestions}</span>{" "}
                question{totalQuestions !== 1 ? "s" : ""}.
              </p>
              {answeredCount < totalQuestions && (
                <p className="text-xs text-amber-400">
                  {totalQuestions - answeredCount} question
                  {totalQuestions - answeredCount !== 1 ? "s" : ""} still unanswered.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
                className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition disabled:opacity-50"
              >
                Go Back
              </button>
              <button
                onClick={confirmFinish}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-black hover:bg-emerald-400 transition disabled:opacity-60"
              >
                {submitting
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <LogOut className="h-4 w-4" />}
                {submitting ? "Finishing…" : "Submit & Exit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main layout ────────────────────────────────────────── */}
      <AssessmentLayout 
      assessment={assessment}
      startTime={startTime}
      currentQuestionIndex={currentQuestionIndex}
        question={question}
        onBack={onBack}
        onQuestionChange={handleQuestionChange}
        onFinish={handleFinishAssessment}
        answeredCount={answeredCount}
      >
        <QuestionRenderer
          question={question}
          assessmentId={assessmentId}
          savedAnswer={answerMap[question?._id] || {}}
          onAnswerChange={handleAnswerChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      </AssessmentLayout>
    </>
  );
}
