import type { CompletedSession } from "@/lib/storage";
import { toLocalDateKey } from "@/lib/dates";

export function sessionForDate(sessions: CompletedSession[], dateKey: string) {
  return sessions.find((s) => s.date === dateKey);
}

export function currentStreak(sessions: CompletedSession[]) {
  const dates = new Set(sessions.map((s) => s.date));
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!dates.has(toLocalDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (dates.has(toLocalDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function completedInWeek(sessions: CompletedSession[], week: number) {
  return new Set(sessions.filter((s) => s.week === week).map((s) => s.day)).size;
}
