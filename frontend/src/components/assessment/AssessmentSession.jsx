import AssessmentLayout from "./AssessmentLayout";
import QuestionRenderer  from "./QuestionRenderer";

/**
 * AssessmentSession
 * Top-level orchestrator for the assessment experience.
 *
 * Owns:
 *   - Question navigation (previous / next / jump via pill)
 *   - Passes current question + navigation state down to AssessmentLayout
 *     and QuestionRenderer
 *
 * Does NOT own:
 *   - Assessment data fetching (StudentPage owns that)
 *   - Timer implementation (future backend feature)
 *   - AI / camera monitoring (future feature)
 *
 * Props (mirror the old CodeEditorPage props for drop-in compatibility):
 *   assessment            {object}  full assessment object from API
 *   currentQuestionIndex  {number}  controlled by StudentPage
 *   setCurrentQuestionIndex {func}  lifts index changes up to StudentPage
 *   setEditorQuestion     {func}    lifts current question up to StudentPage
 *   assessmentId          {string}  assessment._id, used by submit calls
 *   onBack                {func}    return to student dashboard
 */
export default function AssessmentSession({
  assessment,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setEditorQuestion,
  assessmentId,
  onBack,
}) {
  const questions      = assessment?.questions || [];
  const totalQuestions = questions.length;
  const question       = questions[currentQuestionIndex] || null;

  // ── Navigation helpers ─────────────────────────────────────────────────────

  const goTo = (index) => {
    if (index < 0 || index >= totalQuestions) return;
    setCurrentQuestionIndex(index);
    setEditorQuestion(questions[index]);
  };

  const handlePrevious      = () => goTo(currentQuestionIndex - 1);
  const handleNext          = () => goTo(currentQuestionIndex + 1);
  const handleQuestionChange = (index) => goTo(index);

  const hasPrevious = currentQuestionIndex > 0;
  const hasNext     = currentQuestionIndex < totalQuestions - 1;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <AssessmentLayout
      assessment={assessment}
      currentQuestionIndex={currentQuestionIndex}
      question={question}
      onBack={onBack}
      onQuestionChange={handleQuestionChange}
    >
      <QuestionRenderer
        question={question}
        assessmentId={assessmentId}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </AssessmentLayout>
  );
}
