import type { DayKey } from "@/data/routines";
import { toLocalDateKey } from "@/lib/dates";

export const STORAGE_KEY = "lean-fighter-routine:v1";
export const STORAGE_EVENT = "lean-fighter-storage";

export type AppSettings = {
  appearance: "system" | "light" | "dark";
  restTimer: 30 | 45 | 60 | 90;
  haptics: boolean;
};

export type WorkoutExerciseState = {
  setsCompleted: number;
  reps: number;
  skipped?: boolean;
};

export type ActiveWorkout = {
  id: string;
  date: string;
  week: number;
  day: DayKey;
  routineTitle: string;
  exerciseIds: string[];
  currentIndex: number;
  exerciseStates: Record<string, WorkoutExerciseState>;
  startedAt: number;
  savedElapsedSeconds: number;
  lastResumedAt: number;
};

export type CompletedSession = {
  id: string;
  date: string;
  week: number;
  day: DayKey;
  routineTitle: string;
  exerciseIds: string[];
  completedExerciseIds: string[];
  durationSeconds: number;
  completedAt: number;
};

export type StoredData = {
  version: 1;
  programStartDate: string;
  completedSessions: CompletedSession[];
  activeWorkout: ActiveWorkout | null;
  settings: AppSettings;
  milestones: Record<string, string>;
};

const defaults = (): StoredData => ({
  version: 1,
  programStartDate: toLocalDateKey(),
  completedSessions: [],
  activeWorkout: null,
  settings: { appearance: "system", restTimer: 60, haptics: true },
  milestones: {},
});

function migrate(input: unknown): StoredData {
  if (!input || typeof input !== "object") return defaults();
  const data = input as Partial<StoredData>;
  if (data.version !== 1) return defaults();
  return {
    ...defaults(),
    ...data,
    version: 1,
    completedSessions: Array.isArray(data.completedSessions) ? data.completedSessions : [],
    settings: { ...defaults().settings, ...(data.settings ?? {}) },
    milestones: data.milestones ?? {},
  };
}

export function parseStoredData(raw: string | null): StoredData {
  if (!raw) return defaults();
  try {
    return migrate(JSON.parse(raw));
  } catch {
    return defaults();
  }
}

export function getStoredData(): StoredData {
  if (typeof window === "undefined") return defaults();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const next = defaults();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    }
    return parseStoredData(raw);
  } catch {
    return defaults();
  }
}

export function saveStoredData(next: StoredData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function updateStoredData(mutator: (data: StoredData) => StoredData) {
  saveStoredData(mutator(getStoredData()));
}

export function resetProgress() {
  const current = getStoredData();
  saveStoredData({ ...defaults(), settings: current.settings });
}

export function createWorkout(input: Omit<ActiveWorkout, "id" | "startedAt" | "savedElapsedSeconds" | "lastResumedAt" | "exerciseStates" | "currentIndex">) {
  const now = Date.now();
  const workout: ActiveWorkout = {
    ...input,
    id: `${input.date}-${input.day}-${now}`,
    startedAt: now,
    savedElapsedSeconds: 0,
    lastResumedAt: now,
    currentIndex: 0,
    exerciseStates: {},
  };
  updateStoredData((data) => ({ ...data, activeWorkout: workout }));
  return workout;
}

export function saveWorkoutSession(workout: ActiveWorkout) {
  updateStoredData((data) => ({ ...data, activeWorkout: workout }));
}

export function discardWorkout() {
  updateStoredData((data) => ({ ...data, activeWorkout: null }));
}

export function completeWorkout(workout: ActiveWorkout, durationSeconds: number) {
  const completedExerciseIds = workout.exerciseIds.filter((id) => {
    const state = workout.exerciseStates[id];
    return Boolean(state && !state.skipped && state.setsCompleted > 0);
  });
  const session: CompletedSession = {
    id: workout.id,
    date: workout.date,
    week: workout.week,
    day: workout.day,
    routineTitle: workout.routineTitle,
    exerciseIds: workout.exerciseIds,
    completedExerciseIds,
    durationSeconds,
    completedAt: Date.now(),
  };
  updateStoredData((data) => ({
    ...data,
    activeWorkout: null,
    completedSessions: [...data.completedSessions.filter((s) => s.id !== session.id), session],
  }));
  return session;
}
