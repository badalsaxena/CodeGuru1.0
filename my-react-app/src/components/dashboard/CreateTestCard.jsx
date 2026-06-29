import { Button } from "@/components/ui/button";
import { createTestFields } from "@/data/teacherData";

const CreateTestCard = () => {
  return (
    <section className="rounded-[28px] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-400">Test Builder</p>
          <h3 className="text-xl font-semibold text-white">Create a New Assessment</h3>
        </div>
        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">Live Setup</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {createTestFields.map((field) => (
          <label key={field.label} className="flex flex-col gap-2 text-sm text-zinc-300">
            <span>{field.label}</span>
            <input
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">Designed for coding assessments, interviews, and lab exams.</p>
        <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 text-sm font-semibold text-zinc-950 hover:opacity-90">
          Create Test
        </Button>
      </div>
    </section>
  );
};

export default CreateTestCard;
