"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Minus, MoreHorizontal, Plus, X } from "lucide-react";
import { exercises } from "@/data/exercises";
import { dayOrder, routines, type DayKey } from "@/data/routines";
import { ExerciseVisual } from "@/components/exercise/exercise-visual";
import { Timer } from "@/components/workout/timer";
import { calculateProgramWeek, dayKeyFromDate, formatDuration, toLocalDateKey } from "@/lib/dates";
import {
  completeWorkout,
  createWorkout,
  discardWorkout,
  saveWorkoutSession,
  type ActiveWorkout,
  type CompletedSession,
} from "@/lib/storage";
import { useAppData } from "@/lib/use-app-data";
import { suggestedReps, targetSets } from "@/lib/workout-engine";

export function WorkoutPlayer() {
  const router = useRouter();
  const params = useSearchParams();
  const data = useAppData();
  const initialized = useRef(false);
  const workout = data?.activeWorkout ?? null;
  const [elapsed, setElapsed] = useState(0);
  const [resting, setResting] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [finished, setFinished] = useState<CompletedSession | null>(null);

  useEffect(() => {
    if (!data || initialized.current || finished) return;
    initialized.current = true;

    if (data.activeWorkout) {
      if (data.activeWorkout.lastResumedAt === 0) {
        saveWorkoutSession({ ...data.activeWorkout, lastResumedAt: Date.now() });
      }
      return;
    }

    const requested = params.get("day") as DayKey | null;
    const day = requested && dayOrder.includes(requested) ? requested : dayKeyFromDate();
    const routine = routines[day];
    const week = calculateProgramWeek(data.programStartDate);

    createWorkout({
      date: toLocalDateKey(),
      week,
      day,
      routineTitle: routine.title,
      exerciseIds: routine.exerciseIds,
    });
  }, [data, params, finished]);

  useEffect(() => {
    if (!workout || finished) return;

    const updateElapsed = () => {
      const activeDelta = workout.lastResumedAt > 0 ? Math.floor((Date.now() - workout.lastResumedAt) / 1000) : 0;
      setElapsed(workout.savedElapsedSeconds + activeDelta);
    };

    const firstTick = window.setTimeout(updateElapsed, 0);
    const interval = window.setInterval(updateElapsed, 1000);
    return () => {
      window.clearTimeout(firstTick);
      window.clearInterval(interval);
    };
  }, [workout, finished]);

  useEffect(() => {
    if (!workout || finished) return;

    const saveOnHide = () => {
      const now = Date.now();
      const delta = workout.lastResumedAt > 0 ? Math.floor((now - workout.lastResumedAt) / 1000) : 0;
      saveWorkoutSession({
        ...workout,
        savedElapsedSeconds: workout.savedElapsedSeconds + delta,
        lastResumedAt: 0,
      });
    };

    window.addEventListener("pagehide", saveOnHide);
    return () => window.removeEventListener("pagehide", saveOnHide);
  }, [workout, finished]);

  const exercise = workout ? exercises[workout.exerciseIds[workout.currentIndex]] : null;
  const exerciseState = useMemo(() => {
    if (!exercise || !workout) return null;
    return workout.exerciseStates[exercise.id] ?? { setsCompleted: 0, reps: suggestedReps(exercise) };
  }, [exercise, workout]);
  const sets = exercise ? targetSets(exercise, workout?.week ?? 1) : 1;
  const completedThisExercise = Boolean(exerciseState && exerciseState.setsCompleted >= sets && !exerciseState.skipped);
  const progress = workout
    ? Math.round(((workout.currentIndex + (completedThisExercise ? 1 : 0)) / workout.exerciseIds.length) * 100)
    : 0;

  const haptic = useCallback(() => {
    if (data?.settings.haptics && typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(22);
    }
  }, [data?.settings.haptics]);

  const persist = useCallback((next: ActiveWorkout) => {
    saveWorkoutSession(next);
  }, []);

  const finishSession = useCallback((current: ActiveWorkout) => {
    const activeDelta = current.lastResumedAt > 0 ? Math.floor((Date.now() - current.lastResumedAt) / 1000) : 0;
    const total = Math.max(1, current.savedElapsedSeconds + activeDelta);
    const session = completeWorkout(current, total);
    setElapsed(total);
    setFinished(session);
    haptic();
  }, [haptic]);

  const advance = useCallback((current: ActiveWorkout) => {
    setResting(false);
    if (current.currentIndex >= current.exerciseIds.length - 1) {
      finishSession(current);
      return;
    }
    persist({ ...current, currentIndex: current.currentIndex + 1 });
  }, [finishSession, persist]);

  const completeSet = useCallback(() => {
    if (!workout || !exercise || !exerciseState || transitioning) return;

    haptic();
    const nextSets = Math.min(sets, exerciseState.setsCompleted + 1);
    const next: ActiveWorkout = {
      ...workout,
      exerciseStates: {
        ...workout.exerciseStates,
        [exercise.id]: { ...exerciseState, setsCompleted: nextSets, skipped: false },
      },
    };
    persist(next);

    if (nextSets >= sets) {
      setTransitioning(true);
      window.setTimeout(() => {
        setTransitioning(false);
        advance(next);
      }, 650);
    } else {
      setResting(true);
    }
  }, [workout, exercise, exerciseState, transitioning, haptic, sets, persist, advance]);

  const skipExercise = () => {
    if (!workout || !exercise || !exerciseState) return;
    const next: ActiveWorkout = {
      ...workout,
      exerciseStates: {
        ...workout.exerciseStates,
        [exercise.id]: { ...exerciseState, skipped: true },
      },
    };
    persist(next);
    advance(next);
  };

  const changeReps = (delta: number) => {
    if (!workout || !exercise || !exerciseState) return;
    const next: ActiveWorkout = {
      ...workout,
      exerciseStates: {
        ...workout.exerciseStates,
        [exercise.id]: { ...exerciseState, reps: Math.max(1, exerciseState.reps + delta) },
      },
    };
    persist(next);
  };

  const saveAndExit = () => {
    if (!workout) return;
    const delta = workout.lastResumedAt > 0 ? Math.floor((Date.now() - workout.lastResumedAt) / 1000) : 0;
    saveWorkoutSession({
      ...workout,
      savedElapsedSeconds: workout.savedElapsedSeconds + delta,
      lastResumedAt: 0,
    });
    router.push("/");
  };

  const discardAndExit = () => {
    discardWorkout();
    router.push("/");
  };

  if (finished) {
    return <Completion session={finished} elapsed={elapsed} onDone={() => router.push("/")} />;
  }

  if (workout && !exercise) {
    return (
      <main className="app-frame flex min-h-dvh items-center justify-center px-5">
        <div className="surface w-full rounded-3xl p-5 text-center">
          <h1 className="text-lg font-semibold">Something went wrong loading today&apos;s routine.</h1>
          <p className="muted mt-2 text-sm">Your saved progress is still on this device.</p>
          <button className="bg-accent mt-5 min-h-12 w-full rounded-xl text-sm font-semibold" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (!workout || !exercise || !exerciseState) {
    return (
      <main className="app-frame flex min-h-dvh items-center justify-center px-5">
        <div className="surface w-full rounded-3xl p-5 text-center">
          <MoreHorizontal className="accent mx-auto animate-pulse" size={28} />
          <h1 className="mt-3 font-semibold">Loading today&apos;s routine</h1>
          <p className="muted mt-2 text-sm">Your saved workout will appear here.</p>
        </div>
      </main>
    );
  }

  const timerMode = exercise.type === "reps" ? "stopwatch" : "countdown";
  const timerKey = `${exercise.id}-${exerciseState.setsCompleted}`;

  return (
    <main className="app-frame min-h-dvh pb-6">
      <header className="sticky top-0 z-30 bg-[color:var(--bg)]/95 px-4 pb-3 pt-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <button onClick={() => setExitOpen(true)} className="surface flex h-11 w-11 items-center justify-center rounded-full" aria-label="Exit workout">
            <X size={19} />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="muted text-xs">Week {workout.week} · Day {dayOrder.indexOf(workout.day) + 1}</p>
            <p className="mt-0.5 text-sm font-semibold">Exercise {workout.currentIndex + 1} of {workout.exerciseIds.length}</p>
          </div>
          <div className="muted flex h-11 min-w-14 items-center justify-center text-xs font-semibold tabular-nums">
            {formatDuration(elapsed)}
          </div>
        </div>
        <div className="subtle mt-3 h-1.5 overflow-hidden rounded-full">
          <div className="h-full rounded-full bg-[color:var(--accent)] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="px-4 pt-3">
        <ExerciseVisual exercise={exercise} />
        <div className="mt-5 text-center">
          <p className="accent text-xs font-semibold uppercase tracking-[.16em]">{exercise.category}</p>
          <h1 className="mt-2 text-[30px] font-semibold tracking-[-.035em]">{exercise.name}</h1>
          <p className="mt-2 text-xl font-semibold">{exercise.target}</p>
          <p className="muted mx-auto mt-3 max-w-sm text-sm leading-6">{exercise.instructions}</p>
        </div>

        <section className="surface mt-6 rounded-3xl p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="muted text-xs">Set progress</p>
              <p className="mt-1 text-sm font-semibold">{exerciseState.setsCompleted} / {sets} complete</p>
            </div>
            {completedThisExercise && (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--accent)] text-white">
                <Check size={18} />
              </span>
            )}
          </div>

          {exercise.type === "reps" && (
            <div className="mb-6 flex items-center justify-center gap-5">
              <button className="subtle flex h-12 w-12 items-center justify-center rounded-full border border-line" onClick={() => changeReps(-1)} aria-label="Decrease reps">
                <Minus size={20} />
              </button>
              <div className="min-w-20 text-center">
                <p className="text-3xl font-semibold tabular-nums">{exerciseState.reps}</p>
                <p className="muted text-xs">reps</p>
              </div>
              <button className="subtle flex h-12 w-12 items-center justify-center rounded-full border border-line" onClick={() => changeReps(1)} aria-label="Increase reps">
                <Plus size={20} />
              </button>
            </div>
          )}

          <div className="subtle rounded-2xl p-4">
            <Timer
              key={timerKey}
              mode={timerMode}
              initialSeconds={exercise.durationSec ?? 60}
              autoStart={false}
              onFinish={exercise.type === "reps" ? undefined : completeSet}
              compact
            />
            {exercise.type === "reps" && (
              <p className="muted mt-3 text-center text-xs leading-5">Use the stopwatch to track how long each set takes.</p>
            )}
          </div>

          <button className="bg-accent mt-6 min-h-14 w-full rounded-2xl px-4 text-sm font-semibold disabled:opacity-60" onClick={completeSet} disabled={transitioning}>
            {transitioning ? "Exercise complete ✓" : "Complete set"}
          </button>
          <button className="muted mt-2 min-h-11 w-full rounded-xl text-sm font-medium" onClick={skipExercise}>
            Skip exercise
          </button>
        </section>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            className="surface flex min-h-12 items-center justify-center gap-2 rounded-2xl text-sm font-semibold disabled:opacity-40"
            disabled={workout.currentIndex === 0}
            onClick={() => persist({ ...workout, currentIndex: Math.max(0, workout.currentIndex - 1) })}
          >
            <ChevronLeft size={17} /> Previous
          </button>
          <button className="surface flex min-h-12 items-center justify-center gap-2 rounded-2xl text-sm font-semibold" onClick={() => advance(workout)}>
            Next <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {resting && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 sm:items-center sm:p-4">
          <div className="w-full max-w-[480px] rounded-t-[30px] bg-[color:var(--panel)] p-6 sm:rounded-[30px]">
            <p className="accent text-center text-xs font-semibold uppercase tracking-[.15em]">Recover</p>
            <h2 className="mt-2 text-center text-xl font-semibold">Rest before the next set</h2>
            <div className="mt-5">
              <Timer
                mode="rest"
                initialSeconds={data?.settings.restTimer ?? 60}
                onFinish={() => {
                  setResting(false);
                  haptic();
                }}
                onSkip={() => setResting(false)}
              />
            </div>
          </div>
        </div>
      )}

      {exitOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Save progress and exit">
          <div className="w-full max-w-[480px] rounded-t-[30px] bg-[color:var(--panel)] p-5 sm:rounded-[30px]">
            <ArrowLeft className="accent" size={24} />
            <h2 className="mt-4 text-xl font-semibold">Save progress and exit?</h2>
            <p className="muted mt-2 text-sm leading-6">You can resume from the same exercise later.</p>
            <div className="mt-5 space-y-2">
              <button className="bg-accent min-h-12 w-full rounded-xl text-sm font-semibold" onClick={() => setExitOpen(false)}>
                Continue
              </button>
              <button className="surface min-h-12 w-full rounded-xl text-sm font-semibold" onClick={saveAndExit}>
                Save &amp; exit
              </button>
              <button className="min-h-12 w-full rounded-xl text-sm font-semibold text-[color:var(--danger)]" onClick={discardAndExit}>
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Completion({ session, elapsed, onDone }: { session: CompletedSession; elapsed: number; onDone: () => void }) {
  return (
    <main className="app-frame flex min-h-dvh items-center justify-center px-5 py-10">
      <div className="w-full text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--accent)] text-white shadow-soft">
          <Check size={38} />
        </div>
        <p className="accent mt-7 text-xs font-semibold uppercase tracking-[.16em]">Week {session.week} · Day {dayOrder.indexOf(session.day) + 1}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.035em]">Workout complete</h1>
        <div className="mt-7 grid grid-cols-2 gap-2.5">
          <div className="surface rounded-2xl p-4">
            <p className="muted text-xs">Time</p>
            <p className="mt-2 text-xl font-semibold tabular-nums">{formatDuration(elapsed)}</p>
          </div>
          <div className="surface rounded-2xl p-4">
            <p className="muted text-xs">Exercises</p>
            <p className="mt-2 text-xl font-semibold">{session.completedExerciseIds.length}</p>
          </div>
        </div>
        <p className="muted mx-auto mt-6 max-w-xs text-sm leading-6">Good work. Recover, eat well, and come back tomorrow.</p>
        <button className="bg-accent mt-7 min-h-14 w-full rounded-2xl text-sm font-semibold" onClick={onDone}>
          Done
        </button>
      </div>
    </main>
  );
}
