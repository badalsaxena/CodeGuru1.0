import { useState, useEffect } from "react";
import {
  ArrowLeft, Play, Send, Loader2, CheckCircle2, XCircle,
  Clock, ChevronDown, Terminal, BookOpen,
} from "lucide-react";
import { runCode } from "@/services/runCodeService";
import { createSubmission } from "@/services/submissionService";

const LANGUAGES = [
  { id: "python", label: "Python 3", extension: ".py" },
  { id: "javascript", label: "JavaScript", extension: ".js" },
  { id: "cpp", label: "C++", extension: ".cpp" },
  { id: "java", label: "Java", extension: ".java" },
];

const BOILERPLATE = {
  python: `def solution():\n    # Write your solution here\n    pass\n\nprint(solution())`,
  javascript: `function solution() {\n  // Write your solution here\n}\n\nconsole.log(solution());`,
  cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // Write your solution here\n  return 0;\n}`,
  java: `public class Main {\n  public static void main(String[] args) {\n    // Write your solution here\n  }\n}`,
};

const DIFF_COLORS = {
  Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Hard: "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

const getRunOutput = (runResult) =>
  runResult?.result?.run?.stdout ||
  runResult?.result?.run?.stderr ||
  runResult?.result?.compile?.stdout ||
  runResult?.result?.compile?.stderr ||
  runResult?.output ||
  runResult?.message ||
  "No output.";

export default function CodeEditorPage({ question, assessmentId, onBack }) {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(BOILERPLATE["python"]);
  const [activeTab, setActiveTab] = useState("problem"); // problem | testcases
  const [outputTab, setOutputTab] = useState("output"); // output | result
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);

  // Change boilerplate when switching language if code is still default
  useEffect(() => {
    setCode(BOILERPLATE[language] || "");
  }, [language]);

  const handleRun = async () => {
    if (!code.trim()) return;
    setRunLoading(true);
    setRunResult(null);
    setOutputTab("output");
    try {
      const data = await runCode({
        questionId: question?._id,
        code,
        language,
      });
      setRunResult(data);
    } catch (err) {
      setRunResult({ success: false, output: getErrorMessage(err, "Error running code.") });
    } finally {
      setRunLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    if (!assessmentId) {
      setOutputTab("result");
      setSubmitResult({
        success: false,
        message: "Submissions require an active assessment.",
      });
      return;
    }

    setSubmitLoading(true);
    setSubmitResult(null);
    setOutputTab("result");
    try {
      const data = await createSubmission({
        questionId: question?._id,
        assessmentId,
        code,
        language,
      });
      setSubmitResult(data);
    } catch (err) {
      setSubmitResult({ success: false, message: getErrorMessage(err, "Submission failed.") });
    } finally {
      setSubmitLoading(false);
    }
  };

  const selectedLang = LANGUAGES.find((l) => l.id === language);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-white/8 bg-zinc-900/80 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div>
            <p className="text-sm font-semibold text-white">
              {question?.title || "Coding Problem"}
            </p>
            {question && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${DIFF_COLORS[question.difficulty] || DIFF_COLORS.Easy}`}>
                  {question.difficulty}
                </span>
                <span className="text-[10px] text-zinc-500">{question.marks} marks</span>
                <Clock className="h-3 w-3 text-zinc-500" />
                <span className="text-[10px] text-zinc-500">{question.timeLimit}s limit</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none rounded-xl border border-white/10 bg-zinc-800 pl-3 pr-8 py-1.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>{l.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          </div>

          {/* Run */}
          <button
            onClick={handleRun}
            disabled={runLoading}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-60"
          >
            {runLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Run
          </button>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitLoading || !assessmentId}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-1.5 text-sm font-bold text-black transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {submitLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Submit
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* ─── LEFT PANEL: Problem Description ─── */}
        <div className="w-[42%] border-r border-white/8 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/8 bg-zinc-900/60">
            {[
              { id: "problem", label: "Problem", Icon: BookOpen },
              { id: "testcases", label: "Test Cases", Icon: Terminal },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition border-b-2 ${
                  activeTab === id
                    ? "border-emerald-400 text-emerald-300"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === "problem" ? (
              <div className="space-y-5 text-sm">
                <div>
                  <h1 className="text-xl font-bold text-white mb-2">
                    {question?.title || "Problem Title"}
                  </h1>
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {question?.description || "No description available."}
                  </p>
                </div>

                {question?.constraints && (
                  <div>
                    <h3 className="font-semibold text-white mb-1">Constraints</h3>
                    <pre className="rounded-xl border border-white/8 bg-zinc-900 p-3 text-xs text-zinc-400 whitespace-pre-wrap">
                      {question.constraints}
                    </pre>
                  </div>
                )}

                {question?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {question?.sampleTestCases?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-white">Examples</h3>
                    {question.sampleTestCases.map((tc, i) => (
                      <div key={i} className="rounded-2xl border border-white/8 bg-zinc-900 p-4 space-y-2">
                        <p className="text-xs font-semibold text-zinc-400">Example {i + 1}</p>
                        <div>
                          <span className="text-xs text-zinc-500 uppercase tracking-wider">Input:</span>
                          <pre className="mt-1 text-xs text-zinc-200 font-mono whitespace-pre-wrap">{tc.input}</pre>
                        </div>
                        <div>
                          <span className="text-xs text-zinc-500 uppercase tracking-wider">Output:</span>
                          <pre className="mt-1 text-xs text-emerald-300 font-mono whitespace-pre-wrap">{tc.output}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <p className="text-xs text-zinc-500">Public test cases for this problem</p>
                {question?.sampleTestCases?.length > 0 ? (
                  question.sampleTestCases.map((tc, i) => (
                    <div key={i} className="rounded-2xl border border-white/8 bg-zinc-900 p-4 space-y-2">
                      <p className="text-xs font-semibold text-zinc-400">Case {i + 1}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Input</p>
                          <pre className="text-xs text-zinc-200 font-mono whitespace-pre-wrap">{tc.input}</pre>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Expected</p>
                          <pre className="text-xs text-emerald-300 font-mono whitespace-pre-wrap">{tc.output}</pre>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500 text-xs">No test cases available.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─── RIGHT PANEL: Editor + Output ─── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/8 bg-zinc-900/60 px-4 py-2">
              <span className="text-xs text-zinc-500">
                {selectedLang?.label} {selectedLang?.extension}
              </span>
              <span className="text-xs text-zinc-600">
                {code.split("\n").length} lines
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full bg-zinc-950 p-5 font-mono text-sm text-zinc-200 outline-none resize-none leading-relaxed"
              style={{ minHeight: "320px", tabSize: 2 }}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const start = e.target.selectionStart;
                  const end = e.target.selectionEnd;
                  const newCode = code.substring(0, start) + "  " + code.substring(end);
                  setCode(newCode);
                  requestAnimationFrame(() => {
                    e.target.selectionStart = e.target.selectionEnd = start + 2;
                  });
                }
              }}
            />
          </div>

          {/* Output Panel */}
          <div className="border-t border-white/8 bg-zinc-900/60" style={{ minHeight: "180px", maxHeight: "260px" }}>
            <div className="flex border-b border-white/8">
              {[
                { id: "output", label: "Output" },
                { id: "result", label: "Submission Result" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setOutputTab(id)}
                  className={`px-4 py-2.5 text-xs font-medium transition border-b-2 ${
                    outputTab === id
                      ? "border-emerald-400 text-emerald-300"
                      : "border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-4 overflow-y-auto h-36">
              {outputTab === "output" ? (
                runLoading ? (
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" /> Running…
                  </div>
                ) : runResult ? (
                  <div>
                    <div className={`flex items-center gap-2 mb-2 text-sm font-semibold ${runResult.success ? "text-emerald-400" : "text-rose-400"}`}>
                      {runResult.success ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      {runResult.success ? "Success" : "Error"}
                    </div>
                    <pre className="text-xs text-zinc-300 font-mono whitespace-pre-wrap">
                      {getRunOutput(runResult)}
                    </pre>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-600">Click Run to see output here.</p>
                )
              ) : submitLoading ? (
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" /> Judging your submission…
                </div>
              ) : submitResult ? (
                <div>
                  <div className={`flex items-center gap-2 mb-2 text-sm font-semibold ${submitResult.success ? "text-emerald-400" : "text-rose-400"}`}>
                    {submitResult.success ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    {submitResult.success ? "Accepted" : "Submission Failed"}
                  </div>
                  <p className="text-xs text-zinc-300">{submitResult.message}</p>
                  {submitResult.submission && (
                    <div className="mt-2 flex gap-4 text-xs text-zinc-500">
                      <span>Status: <span className="text-zinc-300">{submitResult.submission.status}</span></span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-zinc-600">Click Submit to judge your code.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
