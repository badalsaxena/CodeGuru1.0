import { ArrowLeft, Clock, LogOut } from "lucide-react";
import CameraPlaceholder from "./CameraPlaceholder";
import WarningBanner from "./WarningBanner";

/**
 * AssessmentLayout
 * Shared chrome for every question type:
 *   - Header  (back button, assessment title, question meta)
 *   - Progress bar + question counter
 *   - Timer (stub — shows "--:--:--" until backend implements it)
 *   - CameraPlaceholder (top-right, non-functional)
 *   - WarningBanner (non-functional placeholder)
 *   - Question-nav pill buttons
 *   - children slot for the active QuestionRenderer
 *
 * Props:
 *   assessment            {object}  full assessment object
 *   currentQuestionIndex  {number}
 *   question              {object}  current question object
 *   onBack                {func}
 *   onQuestionChange      {func}    (index) => void
 *   children              {node}    rendered question component
 */

const DIFF_COLORS = {
  Easy:   "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Medium: "text-amber-400   bg-amber-500/10   border-amber-500/20",
  Hard:   "text-rose-400    bg-rose-500/10    border-rose-500/20",
};

const TYPE_COLORS = {
  coding:      "text-violet-400  bg-violet-500/10  border-violet-500/20",
  mcq:         "text-sky-400     bg-sky-500/10     border-sky-500/20",
  subjective:  "text-amber-400   bg-amber-500/10   border-amber-500/20",
  true_false:  "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

const TYPE_LABELS = {
  coding:     "Coding",
  mcq:        "MCQ",
  subjective: "Subjective",
  true_false: "True / False",
};

export default function AssessmentLayout({
  assessment,
  currentQuestionIndex,
  question,
  onBack,
  onQuestionChange,
  onFinish,
  answeredCount,
  children,
}) {
  // ── derived values ───────────────────────────────────────────
  const questions     = assessment?.questions || [];
  const totalQuestions = questions.length || 1;
  const currentNumber  = currentQuestionIndex + 1;
  const progress       = Math.round((currentNumber / totalQuestions) * 100);

  // Timer: stub until backend provides remaining time
  const remainingTime = "--:--:--";

  // Warning placeholder: always false until monitoring is implemented
  const warningCount = 0;
  const showWarning  = false;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between border-b border-white/10 bg-zinc-900 px-6 py-3 gap-4 flex-wrap">

        {/* LEFT — back + question title */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onBack}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 transition hover:border-emerald-500 hover:bg-zinc-700"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-white truncate">
              {question?.title || "Question"}
            </h2>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              {/* Question type badge */}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold border ${
                  TYPE_COLORS[question?.questionType] || TYPE_COLORS.coding
                }`}
              >
                {TYPE_LABELS[question?.questionType] || "Question"}
              </span>

              {/* Difficulty badge */}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold border ${
                  DIFF_COLORS[question?.difficulty] || DIFF_COLORS.Easy
                }`}
              >
                {question?.difficulty || "Easy"}
              </span>

              <span className="text-xs text-zinc-400">
                {question?.marks ?? 0} Marks
              </span>
            </div>
          </div>
        </div>

        {/* CENTER — progress bar */}
        <div className="w-full sm:w-[280px] order-last sm:order-none">
          <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-400">
            <span>
              Question {currentNumber} / {totalQuestions}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* RIGHT — timer + camera */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-zinc-500">
              Remaining
            </p>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-400" />
              <h2 className="text-xl font-bold text-emerald-400">
                {remainingTime}
              </h2>
            </div>
          </div>

          {/* Camera placeholder — top right */}
          <CameraPlaceholder />
        </div>
      </header>

      {/* ── WARNING BANNER ─────────────────────────────────────── */}
      {showWarning && (
        <div className="px-6 pt-3">
          <WarningBanner count={warningCount} show={showWarning} />
        </div>
      )}

      {/* ── QUESTION NAV PILLS ────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-900/80 px-6 py-2 flex-wrap">
        <span className="text-[10px] uppercase tracking-widest text-zinc-600 mr-1">
          Questions
        </span>
        {questions.map((q, index) => (
          <button
            key={q._id || index}
            onClick={() => onQuestionChange(index)}
            title={q.title || `Question ${index + 1}`}
            className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${
              index === currentQuestionIndex
                ? "bg-emerald-500 text-black"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* ── MAIN CONTENT — question renderer fills this ────────── */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {children}
      </main>

    </div>
  );
}
