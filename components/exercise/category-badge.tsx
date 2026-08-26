import type { ExerciseCategory } from "@/data/exercises";
import { categoryMeta } from "@/data/categories";

/** Small circular icon badge tinted with the category color. */
export function CategoryIcon({ category, size = 36 }: { category: ExerciseCategory; size?: number }) {
  const meta = categoryMeta[category];
  const Icon = meta.icon;
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        color: meta.color,
        background: `color-mix(in srgb, ${meta.color} 16%, transparent)`,
      }}
      aria-hidden="true"
    >
      <Icon size={Math.round(size * 0.52)} strokeWidth={2.1} />
    </span>
  );
}

/** Text + icon pill, e.g. for headers and detail pages. */
export function CategoryPill({ category }: { category: ExerciseCategory }) {
  const meta = categoryMeta[category];
  const Icon = meta.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[.1em]"
      style={{
        color: meta.color,
        background: `color-mix(in srgb, ${meta.color} 14%, transparent)`,
      }}
    >
      <Icon size={13} strokeWidth={2.3} />
      {meta.label}
    </span>
  );
}
