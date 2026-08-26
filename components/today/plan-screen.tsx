"use client";

import { useState } from "react";
import { ChevronDown, Lock, X } from "lucide-react";
import { AppShell } from "@/components/app-shell/app-shell";
import { ExerciseRow } from "@/components/exercise/exercise-row";
import { exercises } from "@/data/exercises";
import { dayOrder, routines, type DayKey, weekProgression } from "@/data/routines";
import { martialArtsLibrary, martialArtsSafety } from "@/data/martial-arts";
import Link from "next/link";
import { calculateProgramWeek, weekdayLabel } from "@/lib/dates";
import { useAppData } from "@/lib/use-app-data";

export function PlanScreen() {
  const data = useAppData();
  const currentWeek = data ? calculateProgramWeek(data.programStartDate) : 1;
  const [selected, setSelected] = useState<{ day: DayKey; week: number } | null>(null);

  return (
    <AppShell>
      <header className="mb-6">
        <p className="accent text-xs font-semibold uppercase tracking-[.16em]">8-week plan</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.035em]">Your full routine.</h1>
        <p className="muted mt-2 text-sm leading-6">The weekly rhythm stays familiar while effort progresses gradually.</p>
      </header>

      <section className="space-y-3">
        {weekProgression.map((week) => {
          const upcoming = week.week > currentWeek;
          return (
            <details key={week.week} className="surface group rounded-2xl" open={week.week === currentWeek}>
              <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold">Week {week.week}</h2>
                    {upcoming && <Lock className="muted" size={14} />}
                  </div>
                  <p className="muted mt-1 text-xs">{week.name}</p>
                </div>
                <ChevronDown className="muted transition group-open:rotate-180" size={18} />
              </summary>
              <div className="border-t border-line px-3 pb-3 pt-2">
                <p className="muted px-1 py-2 text-xs leading-5">{week.note}</p>
                {dayOrder.map((day) => (
                  <button key={day} className="flex min-h-14 w-full items-center gap-3 rounded-xl px-2 text-left active:subtle" onClick={() => setSelected({ day, week: week.week })}>
                    <span className="muted w-9 text-xs font-semibold uppercase">{routines[day].shortDay}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{routines[day].title}</span>
                    <span className="muted text-xs">Preview</span>
                  </button>
                ))}
              </div>
            </details>
          );
        })}
      </section>

      <section className="mt-8">
        <div className="mb-3">
          <p className="accent text-xs font-semibold uppercase tracking-[.14em]">Technique library</p>
          <h2 className="mt-2 text-xl font-semibold">Martial-arts movement</h2>
          <p className="muted mt-2 text-sm leading-6">Practice every technique slowly, stay balanced, and return to a stable stance after each movement.</p>
        </div>
        <div className="space-y-3">
          {Object.entries(martialArtsLibrary).map(([category, techniques]) => (
            <div key={category} className="surface rounded-2xl p-4">
              <h3 className="text-sm font-semibold">{category}</h3>
              <div className="mt-3 divide-y divide-[color:var(--line)]">
                {techniques.map((technique, index) => (
                  <Link key={`${technique.id}-${index}`} href={`/exercise/${technique.id}`} className="flex min-h-12 items-center gap-3 py-2">
                    <span className="min-w-0 flex-1 text-sm font-medium">{technique.name}</span>
                    <span className="muted text-[11px] uppercase tracking-[.1em]">Control · balance</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="muted mt-4 text-xs leading-5">{martialArtsSafety}</p>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 px-0 sm:px-4" role="dialog" aria-modal="true" aria-label="Routine preview">
          <div className="app-frame max-h-[88dvh] overflow-y-auto rounded-t-[28px] bg-[color:var(--bg)] px-4 pb-8 pt-4 sm:rounded-[28px]">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="accent text-xs font-semibold uppercase tracking-[.14em]">Week {selected.week} · {weekdayLabel(selected.day)}</p>
                <h2 className="mt-1 text-2xl font-semibold">{routines[selected.day].title}</h2>
              </div>
              <button className="surface flex h-11 w-11 items-center justify-center rounded-full" onClick={() => setSelected(null)} aria-label="Close preview"><X size={18} /></button>
            </div>
            <p className="muted mt-2 text-sm leading-6">{routines[selected.day].description}</p>
            <div className="mt-5 space-y-2.5">
              {routines[selected.day].exerciseIds.map((id) => <ExerciseRow key={id} exercise={exercises[id]} />)}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
