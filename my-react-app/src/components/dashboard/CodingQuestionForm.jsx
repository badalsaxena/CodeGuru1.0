import { Button } from "@/components/ui/button";
import { questionFormFields } from "@/data/teacherData";

const CodingQuestionForm = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-cyan-400">Question Studio</p>
          <h3 className="text-xl font-semibold text-white">Manage Coding Problems</h3>
        </div>
        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">Authoring</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {questionFormFields.map((field) => (
          <label
            key={field.label}
            className={`flex flex-col gap-2 text-sm text-zinc-300 ${field.type === "textarea" ? "md:col-span-2" : ""}`}
          >
            <span>{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                rows={3}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
                placeholder={field.placeholder}
              />
            ) : (
              <input
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
                placeholder={field.placeholder}
              />
            )}
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10">
          Save Draft
        </Button>
        <Button className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 text-sm font-semibold text-white hover:opacity-90">
          Publish
        </Button>
      </div>
    </section>
  );
};

export default CodingQuestionForm;
