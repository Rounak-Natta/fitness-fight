import { exercises, type Exercise } from "@/data/exercises";
import { routines, type DayKey } from "@/data/routines";

export function getRoutineExercises(day: DayKey): Exercise[] {
  return routines[day].exerciseIds.map((id) => exercises[id]).filter(Boolean);
}

export function targetSets(exercise: Exercise, week = 1) {
  const base = Math.max(1, exercise.sets ?? 1);
  return week === 8 && base > 1 ? base - 1 : base;
}

export function suggestedReps(exercise: Exercise) {
  return exercise.repsMin ?? 1;
}
