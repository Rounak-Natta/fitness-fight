import { dayOrder, type DayKey } from "@/data/routines";

export function toLocalDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function dayKeyFromDate(date = new Date()): DayKey {
  const jsDay = date.getDay();
  return dayOrder[(jsDay + 6) % 7];
}

export function formatToday(date = new Date()) {
  return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric" }).format(date);
}

export function calculateProgramWeek(startDateKey: string, now = new Date()) {
  const [y, m, d] = startDateKey.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  start.setHours(0, 0, 0, 0);
  const current = new Date(now);
  current.setHours(0, 0, 0, 0);
  const days = Math.max(0, Math.floor((current.getTime() - start.getTime()) / 86_400_000));
  return Math.min(8, Math.floor(days / 7) + 1);
}

export function weekdayLabel(day: DayKey) {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.max(0, Math.floor(seconds % 60));
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
