import CodingQuestion    from "./CodingQuestion";
import MCQQuestion       from "./MCQQuestion";
import SubjectiveQuestion from "./SubjectiveQuestion";
import TrueFalseQuestion  from "./TrueFalseQuestion";

/**
 * QuestionRenderer
 * Routes a question to the correct component based on question.questionType.
 *
 * Supported types:
 *   "coding"      → CodingQuestion
 *   "mcq"         → MCQQuestion
 *   "subjective"  → SubjectiveQuestion
 *   "true_false"  → TrueFalseQuestion
 *
 * All question type components share the same prop contract:
 *   question, assessmentId, onPrevious, onNext, hasPrevious, hasNext
 */
export default function QuestionRenderer({
  question,
  assessmentId,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) {
  const sharedProps = {
    question,
    assessmentId,
    onPrevious,
    onNext,
    hasPrevious,
    hasNext,
  };

  // Old questions in DB may not have questionType — default them to "coding"
  const questionType = question?.questionType || "coding";

  switch (questionType) {
    case "coding":
      return <CodingQuestion {...sharedProps} />;

    case "mcq":
      return <MCQQuestion {...sharedProps} />;

    case "subjective":
      return <SubjectiveQuestion {...sharedProps} />;

    case "true_false":
      return <TrueFalseQuestion {...sharedProps} />;

    default:
      // Only hits here for genuinely unknown types (not missing ones)
      return (
        <div className="flex flex-1 items-center justify-center p-10">
          <div className="rounded-2xl border border-white/8 bg-zinc-900 p-8 text-center space-y-2 max-w-sm">
            <p className="text-zinc-400 text-sm">
              Unknown question type:{" "}
              <span className="font-mono text-rose-400">
                {question?.questionType ?? "undefined"}
              </span>
            </p>
            <p className="text-xs text-zinc-600">
              Check the question configuration in the database.
            </p>
          </div>
        </div>
      );
  }
}
