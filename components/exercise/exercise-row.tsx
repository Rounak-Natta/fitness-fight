import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import type { Exercise } from "@/data/exercises";
import { ExerciseVisual } from "@/components/exercise/exercise-visual";

export function ExerciseRow({ exercise, complete = false }: { exercise: Exercise; complete?: boolean }) {
  return (
    <Link href={`/exercise/${exercise.id}`} className="surface flex min-h-[88px] items-center gap-3 rounded-2xl p-3 transition active:scale-[.99]">
      <ExerciseVisual exercise={exercise} compact />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[15px] font-semibold">{exercise.name}</h3>
          {complete && <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] text-white"><Check size={13} /></span>}
        </div>
        <p className="mt-1 text-sm font-medium">{exercise.target}</p>
        <p className="muted mt-1 text-[11px] uppercase tracking-[.12em]">{exercise.category}</p>
      </div>
      <ChevronRight className="muted shrink-0" size={18} />
    </Link>
  );
}
