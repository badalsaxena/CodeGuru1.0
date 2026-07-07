import { useState, useEffect } from "react";
import { X, Loader2, AlertCircle, CheckCircle2, Search } from "lucide-react";
import { getQuestions } from "@/services/questionService";
import { addQuestionsToAssessment } from "@/services/assessmentService";

export default function AddQuestionsToAssessmentModal({ assessment, onClose, onSuccess }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(
    assessment?.questions?.map((q) => q._id || q) || []
  );
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchQs = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQs();
  }, []);

  const toggleQuestion = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setSubmitLoading(true);
    try {
      const data = await addQuestionsToAssessment(assessment._id, selectedIds);
      setSuccess("Questions added successfully!");
      setTimeout(() => {
        onSuccess && onSuccess(data.assessment);
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to add questions.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
        
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-white">Manage Questions</h2>
            <p className="text-xs text-zinc-400">Add or remove questions for "{assessment?.title}"</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-400 transition hover:border-rose-400/40 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
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

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-xl border border-white/10 bg-zinc-900/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-cyan-500/50 transition"
            />
          </div>

          <div className="space-y-2">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
              </div>
            ) : filteredQuestions.length === 0 ? (
              <p className="text-center text-sm text-zinc-500 py-6">No questions found.</p>
            ) : (
              filteredQuestions.map((q) => (
                <label
                  key={q._id}
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                    selectedIds.includes(q._id)
                      ? "border-emerald-500/50 bg-emerald-500/5"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                      selectedIds.includes(q._id)
                        ? "border-emerald-500 bg-emerald-500 text-black"
                        : "border-zinc-600 bg-transparent"
                    }`}
                  >
                    {selectedIds.includes(q._id) && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{q.title}</p>
                    <p className="text-xs text-zinc-400 line-clamp-1">{q.description}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">
                      {q.difficulty}
                    </span>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
          <p className="text-sm text-zinc-400">
            <strong className="text-white">{selectedIds.length}</strong> questions selected
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitLoading}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-2.5 text-sm font-bold text-black transition hover:bg-cyan-400 disabled:opacity-60"
            >
              {submitLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
