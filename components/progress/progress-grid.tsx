"use client";

import { Check, Circle } from "lucide-react";
import { dayOrder, routines, weekProgression } from "@/data/routines";
import type { CompletedSession } from "@/lib/storage";

export function ProgressGrid({ sessions, currentWeek }: { sessions: CompletedSession[]; currentWeek: number }) {
  return (
    <div className="space-y-3">
      {weekProgression.map((week) => {
        const weekSessions = sessions.filter((s) => s.week === week.week);
        const completed = new Set(weekSessions.map((s) => s.day));
        const upcoming = week.week > currentWeek;
        return (
          <div key={week.week} className="surface rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">Week {week.week}</h3>
                <p className="muted mt-0.5 text-xs">{week.name}</p>
              </div>
              {upcoming && <span className="muted text-xs">Upcoming</span>}
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1.5">
              {dayOrder.map((day) => {
                const done = completed.has(day);
                return (
                  <div key={day} className="flex flex-col items-center gap-1.5">
                    <span className="muted text-[11px] font-medium">{routines[day].shortDay.charAt(0)}</span>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${done ? "border-transparent bg-[color:var(--accent)] text-white" : "border-line muted"}`} aria-label={`${routines[day].shortDay} ${done ? "complete" : "not complete"}`}>
                      {done ? <Check size={14} /> : <Circle size={10} />}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
