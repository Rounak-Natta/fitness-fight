import Image from "next/image";
import type { Exercise } from "@/data/exercises";

export function ExerciseVisual({ exercise, compact = false }: { exercise: Exercise; compact?: boolean }) {
  const alt = `${exercise.name}: start and movement positions`;
  const dimensions = compact ? { width: 160, height: 96 } : { width: 640, height: 360 };

  return (
    <div className={`exercise-visual subtle overflow-hidden ${compact ? "h-16 w-20 rounded-xl" : "w-full rounded-3xl"}`}>
      <Image
        src={`/exercises/${exercise.id}.svg`}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className="h-full w-full object-contain"
        sizes={compact ? "80px" : "(max-width: 480px) 100vw, 480px"}
        priority={!compact}
        unoptimized
      />
    </div>
  );
}
