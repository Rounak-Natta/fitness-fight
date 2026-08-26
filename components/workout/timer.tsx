"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { formatDuration } from "@/lib/dates";

export type TimerMode = "countdown" | "stopwatch" | "rest";

type Props = {
  mode: TimerMode;
  initialSeconds?: number;
  autoStart?: boolean;
  onFinish?: () => void;
  onSkip?: () => void;
  compact?: boolean;
};

export function Timer({ mode, initialSeconds = 60, autoStart = true, onFinish, onSkip, compact = false }: Props) {
  const initialValue = mode === "stopwatch" ? 0 : initialSeconds;
  const [running, setRunning] = useState(autoStart);
  const [hasStarted, setHasStarted] = useState(autoStart);
  const [seconds, setSeconds] = useState(initialValue);

  useEffect(() => {
    if (!running) return;

    const id = window.setTimeout(() => {
      if (mode === "stopwatch") {
        setSeconds((current) => current + 1);
        return;
      }

      if (seconds <= 1) {
        setSeconds(0);
        setRunning(false);
        onFinish?.();
        return;
      }

      setSeconds(seconds - 1);
    }, 1000);

    return () => window.clearTimeout(id);
  }, [running, mode, seconds, onFinish]);

  const progress = useMemo(() => {
    if (mode === "stopwatch") return 1;
    return Math.max(0, Math.min(1, seconds / Math.max(1, initialSeconds)));
  }, [mode, seconds, initialSeconds]);

  const ringSize = compact ? "h-32 w-32" : "h-44 w-44";
  const primaryLabel = running ? "Pause" : hasStarted ? "Resume" : "Start";

  const toggle = () => {
    setHasStarted(true);
    setRunning((value) => !value);
  };

  const reset = () => {
    setRunning(false);
    setHasStarted(false);
    setSeconds(initialValue);
  };

  return (
    <div className="flex flex-col items-center" aria-live="polite">
      <div
        className={`relative flex items-center justify-center rounded-full ${ringSize}`}
        style={{ background: `conic-gradient(var(--accent) ${progress * 360}deg, var(--panel-2) 0deg)` }}
      >
        <div className="absolute inset-[7px] rounded-full bg-[color:var(--panel)]" />
        <div className="relative text-center">
          <p className="muted text-[11px] font-semibold uppercase tracking-[.15em]">
            {mode === "rest" ? "Rest" : mode === "stopwatch" ? "Exercise time" : "Exercise timer"}
          </p>
          <p className={`${compact ? "text-3xl" : "text-4xl"} mt-1 font-semibold tabular-nums tracking-[-.04em]`}>
            {formatDuration(seconds)}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button className="surface flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold" onClick={toggle}>
          {running ? <Pause size={16} /> : <Play size={16} />} {primaryLabel}
        </button>
        <button className="surface flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold" onClick={reset}>
          <RotateCcw size={16} /> Reset
        </button>
        {onSkip && (
          <button className="surface flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold" onClick={onSkip}>
            <SkipForward size={16} /> Skip
          </button>
        )}
      </div>
    </div>
  );
}
