import { useState } from "react";
import { X, Plus, Trash2, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  createQuestion,
  updateQuestion,
} from "@/services/questionService";

const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const LANGUAGE_OPTIONS = ["python", "javascript", "cpp", "java"];
const QUESTION_TYPES = [
  { value: "coding", label: "Coding" },
  { value: "mcq", label: "MCQ" },
  { value: "true_false", label: "True / False" },
  { value: "subjective", label: "Subjective" },
];
const emptyTestCase = () => ({ input: "", output: "" });

export default function AddQuestionModal({
  onClose,
  onSuccess,
  question = null,
  isEdit = false,
}) {
const [form, setForm] = useState({
  title: question?.title || "",
  description: question?.description || "",
  questionType: question?.questionType || "coding",

  options:
  question?.options || [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],

  answerKey: question?.answerKey || "",
maxWords: question?.maxWords || 0,

correctAnswer: question?.correctAnswer || "",

  difficulty: question?.difficulty || "Easy",
  marks: question?.marks || 10,
  tags: question?.tags?.join(", ") || "",
  constraints: question?.constraints || "",
  supportedLanguages: question?.supportedLanguages || ["python"],
  timeLimit: question?.timeLimit || 1,
  memoryLimit: question?.memoryLimit || 256,
  status: question?.status || "draft",
});
 const [sampleTestCases, setSampleTestCases] = useState(
  question?.sampleTestCases?.length
    ? question.sampleTestCases
    : [emptyTestCase()]
);

const [hiddenTestCases, setHiddenTestCases] = useState(
  question?.hiddenTestCases?.length
    ? question.hiddenTestCases
    : [emptyTestCase()]
);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleLanguage = (lang) => {
    setForm((prev) => ({
      ...prev,
      supportedLanguages: prev.supportedLanguages.includes(lang)
        ? prev.supportedLanguages.filter((l) => l !== lang)
        : [...prev.supportedLanguages, lang],
    }));
  };

  const updateTestCase = (list, setList, index, field, value) => {
    const updated = list.map((tc, i) =>
      i === index ? { ...tc, [field]: value } : tc
    );
    setList(updated);
  };

  const addTestCase = (setList) =>
    setList((prev) => [...prev, emptyTestCase()]);

  const removeTestCase = (setList, index) =>
    setList((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

   if (form.questionType === "coding") {
  if (sampleTestCases.some((tc) => !tc.input || !tc.output)) {
    setError("All sample test cases must have input and output.");
    return;
  }

  if (hiddenTestCases.some((tc) => !tc.input || !tc.output)) {
    setError("All hidden test cases must have input and output.");
    return;
  }

  if (form.supportedLanguages.length === 0) {
    setError("Select at least one supported language.");
    return;
  }
}

if (form.questionType === "mcq") {
  const filledOptions = form.options.filter(
    (option) => option.text.trim() !== ""
  );

  if (filledOptions.length < 2) {
    setError("Please enter at least two options.");
    return;
  }

  const hasCorrectAnswer = form.options.some(
    (option) => option.isCorrect
  );

  if (!hasCorrectAnswer) {
    setError("Please select the correct answer.");
    return;
  }
}

if (form.questionType === "subjective") {
  if (!form.answerKey.trim()) {
    setError("Answer Key is required.");
    return;
  }
}

if (form.questionType === "true_false") {
  if (!form.correctAnswer) {
    setError("Please select True or False.");
    return;
  }
}

    setLoading(true);
    try {
      const payload = {
  ...form,
  marks: Number(form.marks),
  timeLimit: Number(form.timeLimit),
  memoryLimit: Number(form.memoryLimit),
  tags: form.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean),

  sampleTestCases:
    form.questionType === "coding" ? sampleTestCases : [],

  hiddenTestCases:
    form.questionType === "coding" ? hiddenTestCases : [],
};
    const data = isEdit
  ? await updateQuestion(question._id, payload)
  : await createQuestion(payload);
      setSuccess(
  isEdit
    ? "Question updated successfully!"
    : "Question created successfully!"
);
      setTimeout(async () => {
        if (onSuccess) {
          await onSuccess(data.question);
        }
        onClose();
      }, 1200);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save question. Try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-zinc-950/95 px-6 py-4 backdrop-blur">
          <div>
 <h2 className="text-lg font-bold text-white">
  {isEdit ? "Edit Question" : "Add Question"}
</h2>

 <p className="text-xs text-zinc-400">
  {isEdit
    ? "Update your question details."
    : "Create a new question for your question bank."}
</p>
</div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-400 transition hover:border-rose-400/40 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
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

       {/* Title & Difficulty */}
<div className="space-y-4">

  {/* Title */}
  <div className="space-y-1.5">
    <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
      Title *
    </label>

    <input
      value={form.title}
      onChange={(e) => handleChange("title", e.target.value)}
      placeholder="e.g. Two Sum"
      className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition"
    />
  </div>

  {/* Question Type + Difficulty + Marks */}
  <div className="grid gap-4 md:grid-cols-3">

    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Question Type
      </label>

      <select
        value={form.questionType}
        onChange={(e) => handleChange("questionType", e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
      >
        {QUESTION_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Difficulty
      </label>

      <select
        value={form.difficulty}
        onChange={(e) => handleChange("difficulty", e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
      >
        {DIFFICULTY_OPTIONS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Marks
      </label>

      <input
        type="number"
        min="1"
        value={form.marks}
        onChange={(e) => handleChange("marks", e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
      />
    </div>

  </div>

</div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              placeholder="Describe the problem clearly..."
              className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition resize-none"
            />
          </div>

          {form.questionType === "mcq" && (
  <div className="space-y-6 rounded-2xl border border-white/10 bg-zinc-900/30 p-5">

    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Options
      </label>

      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="flex items-center gap-3 mb-3">

         <input
  type="radio"
  name="correctAnswer"
  checked={form.options[index]?.isCorrect}
  onChange={() => {
    const updatedOptions = form.options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));

    handleChange("options", updatedOptions);
  }}
/>

          <input
            type="text"
          value={form.options[index]?.text || ""}
           onChange={(e) => {
  const updatedOptions = [...form.options];

  updatedOptions[index] = {
    ...updatedOptions[index],
    text: e.target.value,
  };

  handleChange("options", updatedOptions);
}}
            placeholder={`Option ${index + 1}`}
            className="flex-1 rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white"
          />

        </div>
      ))}
    </div>

  </div>
)}

{form.questionType === "subjective" && (
  
  <div className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/30 p-5">

    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Answer Key
      </label>

      <textarea
        value={form.answerKey}
        onChange={(e) => handleChange("answerKey", e.target.value)}
        rows={5}
        placeholder="Enter the expected answer..."
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white"
      />
    </div>

    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
        Maximum Words
      </label>

      <input
        type="number"
        min="0"
        value={form.maxWords}
        onChange={(e) => handleChange("maxWords", e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white"
      />
    </div>

  </div>
)}

{form.questionType === "true_false" && (
  <div className="space-y-5 rounded-2xl border border-white/10 bg-zinc-900/30 p-5">
    <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
      Correct Answer
    </label>

    <div className="flex gap-6">
      <label className="flex items-center gap-2 text-white">
        <input
          type="radio"
          value="true"
          checked={form.correctAnswer === "true"}
          onChange={(e) => handleChange("correctAnswer", e.target.value)}
        />
        True
      </label>

      <label className="flex items-center gap-2 text-white">
        <input
          type="radio"
          value="false"
          checked={form.correctAnswer === "false"}
          onChange={(e) => handleChange("correctAnswer", e.target.value)}
        />
        False
      </label>
    </div>
  </div>
)}

{form.questionType === "coding" && (
  <>
          {/* Constraints & Tags */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Constraints
              </label>
              <textarea
                value={form.constraints}
                onChange={(e) => handleChange("constraints", e.target.value)}
                rows={2}
                placeholder="e.g. 1 <= n <= 10^5"
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Tags (comma-separated)
              </label>
              <input
                value={form.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                placeholder="array, hashmap, dp"
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition"
              />
            </div>
          </div>

          {/* Time & Memory */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Time Limit (s)
              </label>
              <input
                type="number"
                min="1"
                value={form.timeLimit}
                onChange={(e) => handleChange("timeLimit", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Memory (MB)
              </label>
              <input
                type="number"
                min="64"
                value={form.memoryLimit}
                onChange={(e) => handleChange("memoryLimit", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Supported Languages */}
          <div className="space-y-2">
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Supported Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                    form.supportedLanguages.includes(lang)
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-zinc-500"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Sample Test Cases */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Sample Test Cases *
              </label>
              <button
                type="button"
                onClick={() => addTestCase(setSampleTestCases)}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            {sampleTestCases.map((tc, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <textarea
                    value={tc.input}
                    onChange={(e) =>
                      updateTestCase(sampleTestCases, setSampleTestCases, i, "input", e.target.value)
                    }
                    rows={2}
                    placeholder="Input"
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-xs text-white font-mono placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition resize-none"
                  />
                  <textarea
                    value={tc.output}
                    onChange={(e) =>
                      updateTestCase(sampleTestCases, setSampleTestCases, i, "output", e.target.value)
                    }
                    rows={2}
                    placeholder="Expected Output"
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-xs text-white font-mono placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition resize-none"
                  />
                </div>
                {sampleTestCases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTestCase(setSampleTestCases, i)}
                    className="mt-1 rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-500 transition hover:border-rose-400/40 hover:text-rose-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Hidden Test Cases */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Hidden Test Cases *
              </label>
              <button
                type="button"
                onClick={() => addTestCase(setHiddenTestCases)}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            {hiddenTestCases.map((tc, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <textarea
                    value={tc.input}
                    onChange={(e) =>
                      updateTestCase(hiddenTestCases, setHiddenTestCases, i, "input", e.target.value)
                    }
                    rows={2}
                    placeholder="Input"
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-xs text-white font-mono placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition resize-none"
                  />
                  <textarea
                    value={tc.output}
                    onChange={(e) =>
                      updateTestCase(hiddenTestCases, setHiddenTestCases, i, "output", e.target.value)
                    }
                    rows={2}
                    placeholder="Expected Output"
                    className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-xs text-white font-mono placeholder-zinc-600 outline-none focus:border-emerald-500/50 transition resize-none"
                  />
                </div>
                {hiddenTestCases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTestCase(setHiddenTestCases, i)}
                    className="mt-1 rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-500 transition hover:border-rose-400/40 hover:text-rose-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
)}    

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
  isEdit ? "Update Question" : "Create Question"
)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
