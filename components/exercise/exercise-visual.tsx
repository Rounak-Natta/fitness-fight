import type { Exercise } from "@/data/exercises";
import { categoryColor } from "@/data/categories";
import { PoseFigure } from "@/components/exercise/pose-figure";

/**
 * Exercise media uses a real, externally sourced reference image only when
 * one is explicitly available in the exercise data. Otherwise it keeps the
 * hand-tuned before/after vector animation. Full-size views show both.
 */
export function ExerciseVisual({ exercise, compact = false }: { exercise: Exercise; compact?: boolean }) {
  const color = categoryColor(exercise.category);
  const hasImage = Boolean(exercise.imageUrl);

  return (
    <div
      className={`exercise-visual overflow-hidden ${compact ? "h-16 w-20 rounded-xl" : "w-full rounded-3xl"}`}
      style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${color} 14%, var(--panel-2)), var(--panel-2))` }}
    >
      {hasImage && compact ? (
        <img
          src={exercise.imageUrl}
          alt={exercise.imageAlt ?? `${exercise.name} demonstration`}
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <>
          {hasImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[color:var(--line)] bg-[color:var(--panel)]">
              <img
                src={exercise.imageUrl}
                alt={exercise.imageAlt ?? `${exercise.name} demonstration`}
                className="h-full w-full object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <div className={`${hasImage ? "h-32" : "aspect-[4/3]"} w-full`}>
            <PoseFigure exercise={exercise} color={color} />
          </div>
        </>
      )}
    </div>
  );
}
