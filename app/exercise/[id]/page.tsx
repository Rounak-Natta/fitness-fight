import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { exercises } from "@/data/exercises";
import { ExerciseVisual } from "@/components/exercise/exercise-visual";

export default async function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exercise = exercises[id];

  if (!exercise) {
    return (
      <main className="app-frame px-5 py-6">
        <Link href="/" className="muted inline-flex min-h-11 items-center gap-2"><ArrowLeft size={18} /> Back</Link>
        <div className="surface mt-6 rounded-3xl p-5">
          <h1 className="text-xl font-semibold">Exercise not found</h1>
          <p className="muted mt-2 text-sm">Something went wrong loading this movement.</p>
        </div>
      </main>
    );
  }

  const items = [
    ["How", exercise.instructions],
    ["Breathing", exercise.breathing],
    ["Beginner", exercise.beginnerVariation],
    ["Common mistake", exercise.commonMistake],
    ["Equipment", exercise.equipment],
  ];

  return (
    <main className="app-frame min-h-dvh px-5 pb-10 pt-5">
      <Link href="/" className="muted inline-flex min-h-11 items-center gap-2 text-sm font-medium"><ArrowLeft size={18} /> Back</Link>
      <div className="mt-3"><ExerciseVisual exercise={exercise} /></div>
      <p className="accent mt-6 text-xs font-semibold uppercase tracking-[.16em]">{exercise.category}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-.03em]">{exercise.name}</h1>
      <p className="mt-2 text-lg font-semibold">{exercise.target}</p>

      <section className="mt-7 space-y-3">
        {items.map(([label, value]) => (
          <div key={label} className="surface rounded-2xl p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[.12em] muted">{label}</h2>
            <p className="mt-2 text-sm leading-6">{value}</p>
          </div>
        ))}
      </section>

      {exercise.safetyNote && (
        <div className="surface mt-3 flex gap-3 rounded-2xl p-4">
          <ShieldCheck className="accent mt-0.5 shrink-0" size={20} />
          <p className="text-sm leading-6"><strong>Safety:</strong> {exercise.safetyNote}</p>
        </div>
      )}
    </main>
  );
}
