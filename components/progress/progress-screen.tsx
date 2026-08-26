"use client";

import { AppShell } from "@/components/app-shell/app-shell";
import { ProgressGrid } from "@/components/progress/progress-grid";
import { calculateProgramWeek } from "@/lib/dates";
import { completedInWeek, currentStreak } from "@/lib/progress";
import { updateStoredData } from "@/lib/storage";
import { useAppData } from "@/lib/use-app-data";

const milestoneFields = [
  ["pushups", "Push-ups"],
  ["squat", "Squat"],
  ["pull", "Pull-up / lat pulldown"],
  ["rdl", "RDL"],
  ["press", "Dumbbell press"],
] as const;

export function ProgressScreen() {
  const data = useAppData();
  const week = data ? calculateProgramWeek(data.programStartDate) : 1;
  const sessions = data?.completedSessions ?? [];
  const stats = [
    ["Current streak", `${currentStreak(sessions)} days`],
    ["Current week", `Week ${week}`],
    ["Completed", `${completedInWeek(sessions, week)} / 7 days`],
    ["Total sessions", String(sessions.length)],
  ];

  return (
    <AppShell>
      <header className="mb-6">
        <p className="accent text-xs font-semibold uppercase tracking-[.16em]">Progress</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.035em]">Keep it simple.</h1>
        <p className="muted mt-2 text-sm leading-6">Consistency first. No noisy charts, just the sessions you finished.</p>
      </header>

      {sessions.length === 0 && (
        <div className="surface mb-4 rounded-2xl p-4">
          <p className="text-sm font-semibold">Your first session starts today.</p>
          <p className="muted mt-1 text-xs">Complete a workout and it will appear here automatically.</p>
        </div>
      )}

      <section className="grid grid-cols-2 gap-2.5">
        {stats.map(([label, value]) => (
          <div key={label} className="surface rounded-2xl p-4">
            <p className="muted text-xs">{label}</p>
            <p className="mt-2 text-xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-7">
        <div className="mb-3">
          <h2 className="text-base font-semibold">8-week calendar</h2>
          <p className="muted mt-1 text-xs">Completion is stored only on this device.</p>
        </div>
        <ProgressGrid sessions={sessions} currentWeek={week} />
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold">Strength milestones</h2>
        <p className="muted mt-1 text-xs">Optional manual best values. Use any unit or note that makes sense to you.</p>
        <div className="mt-3 space-y-2.5">
          {milestoneFields.map(([id, label]) => (
            <label key={id} className="surface flex items-center gap-3 rounded-2xl p-3">
              <span className="min-w-0 flex-1 text-sm font-medium">{label}</span>
              <input
                className="subtle min-h-11 w-32 rounded-xl border border-line px-3 text-right text-sm outline-none"
                value={data?.milestones[id] ?? ""}
                placeholder="Best"
                onChange={(event: { target: { value: string } }) => updateStoredData((current) => ({ ...current, milestones: { ...current.milestones, [id]: event.target.value } }))}
                aria-label={`${label} best value`}
              />
            </label>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
