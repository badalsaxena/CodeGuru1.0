import { Edit3, Trash2, Plus, Filter, BookOpen } from "lucide-react";

const QuestionBank = ({
  questions,
  onDelete,
  onEdit,
  onPublish,
  onAddQuestion,
  searchTerm,
  onSearchChange,
  difficultyFilter,
  onDifficultyChange,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Question Bank</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Manage questions</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="rounded-2xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-400">
            <input
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search question"
              className="w-full bg-transparent outline-none placeholder:text-zinc-500"
            />
          </label>
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-400">
            <Filter className="h-4 w-4" />
            <select value={difficultyFilter} onChange={(e) => onDifficultyChange(e.target.value)} className="bg-transparent outline-none">
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
          <button onClick={onAddQuestion} className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-400">
            <Plus className="h-4 w-4" />
            Add  Question
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {questions.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-zinc-900/40 py-16 text-center">
            <BookOpen className="mb-3 h-10 w-10 text-zinc-600" />
            <p className="font-semibold text-white">No questions found</p>
            <p className="mt-1 text-xs text-zinc-500">Click "Add Question" to create your first one.</p>
          </div>
        )}
        {questions.map((question) => (
          <div key={question._id} className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{question.title}</h3>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${question.difficulty === "Easy" ? "bg-emerald-500/20 text-emerald-300" : question.difficulty === "Medium" ? "bg-amber-500/20 text-amber-300" : "bg-rose-500/20 text-rose-300"}`}>
                    {question.difficulty}
                  </span>
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300">{question.status}</span>
                </div>
                <p className="text-sm text-zinc-400">{question.description}</p>
                <div className="flex flex-wrap gap-2">
                  {(question.tags || []).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
  onClick={() => onEdit(question)}
  className="rounded-2xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:border-cyan-400/40 hover:text-white"
>
  <Edit3 className="h-4 w-4" />
</button>
                <button onClick={() => onDelete(question._id)} className="rounded-2xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:border-rose-400/40 hover:text-white">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-zinc-400 md:grid-cols-2">
              <div>
                <p className="font-medium text-zinc-300">Constraints</p>
                <p>{question.constraints || "Not specified"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-300">Sample Test Cases</p>
                <p>{question.sampleTestCases?.length || 0}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-300">Supported Languages</p>
                <p>{question.supportedLanguages?.join(", ") || "Not specified"}</p>
              </div>
              <div>
                <p className="font-medium text-zinc-300">Hidden Test Cases</p>
                <p>{question.hiddenTestCases?.length || 0}</p>
              </div>
            </div>

<div className="mt-4">
  <button
    onClick={() => onPublish(question._id)}
    disabled={question.status === "published"}
    className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
      question.status === "published"
        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
        : "bg-emerald-500 text-black hover:bg-emerald-400"
    }`}
  >
    {question.status === "published"
      ? "Published"
      : "Publish Question"}
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionBank;
