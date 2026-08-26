"use client";

import Link from "next/link";
import { CheckCircle2, Play, RotateCcw } from "lucide-react";
import { exercises } from "@/data/exercises";
import { dayOrder, routines, weekProgression } from "@/data/routines";
import { AppShell } from "@/components/app-shell/app-shell";
import { ExerciseRow } from "@/components/exercise/exercise-row";
import { calculateProgramWeek, dayKeyFromDate, formatDuration, formatToday, toLocalDateKey } from "@/lib/dates";
import { useAppData } from "@/lib/use-app-data";

export function TodayScreen() {
  const data = useAppData();
  if (!data) {
    return (
      <AppShell>
        <div className="pt-2">
          <div className="subtle h-4 w-36 rounded-full" />
          <div className="subtle mt-5 h-9 w-64 rounded-2xl" />
          <div className="subtle mt-3 h-4 w-72 rounded-full" />
          <div className="surface mt-8 h-14 rounded-2xl" />
          <div className="mt-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="surface h-[88px] rounded-2xl" />)}</div>
        </div>
      </AppShell>
    );
  }
  const now = new Date();
  const day = dayKeyFromDate(now);
  const routine = routines[day];
  const dateKey = toLocalDateKey(now);
  const week = calculateProgramWeek(data.programStartDate, now);
  const session = data.completedSessions.find((item) => item.date === dateKey);
  const active = data.activeWorkout;
  const completedIds = new Set(session?.completedExerciseIds ?? []);

  return (
    <AppShell>
      <header className="mb-6 pt-1">
        <p className="muted text-sm font-medium">{formatToday(now)}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="accent text-xs font-semibold uppercase tracking-[.16em]">Week {week} · Day {dayOrder.indexOf(day) + 1}</p>
          <p className="muted text-xs">Week {week} of 8</p>
        </div>
        <h1 className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-.035em]">{routine.title}</h1>
        <p className="muted mt-2 max-w-sm text-sm leading-6">{routine.description}</p>
        <p className="mt-3 rounded-xl subtle px-3 py-2 text-xs leading-5 muted"><strong className="text-[color:var(--text)]">{weekProgression[week - 1].name}:</strong> {weekProgression[week - 1].note}</p>
      </header>

      {session ? (
        <section className="surface mb-5 rounded-3xl p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="accent mt-0.5" size={26} />
            <div>
              <h2 className="font-semibold">Today&apos;s session complete</h2>
              <p className="muted mt-1 text-sm">Completed {new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(session.completedAt))} · {session.completedExerciseIds.length} exercises · {formatDuration(session.durationSeconds)}</p>
              <p className="muted mt-3 text-sm leading-6">Good work. Recover, eat well, and come back tomorrow.</p>
            </div>
          </div>
        </section>
      ) : active ? (
        <Link href="/workout" className="bg-accent mb-5 flex min-h-14 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold shadow-soft">
          <RotateCcw size={18} /> Resume workout
        </Link>
      ) : (
        <Link href={`/workout?day=${day}`} className="bg-accent mb-5 flex min-h-14 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold shadow-soft">
          <Play size={18} fill="currentColor" /> Start workout
        </Link>
      )}

      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="text-base font-semibold">Today&apos;s routine</h2>
          <p className="muted mt-1 text-xs">Tap any movement for technique notes.</p>
        </div>
        <p className="muted text-xs">{completedIds.size} / {routine.exerciseIds.length}</p>
      </div>

      <section className="space-y-2.5">
        {routine.exerciseIds.map((id) => (
          <ExerciseRow key={id} exercise={exercises[id]} complete={completedIds.has(id)} />
        ))}
      </section>
    </AppShell>
  );
}
