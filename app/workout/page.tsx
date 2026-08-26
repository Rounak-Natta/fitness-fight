import { Suspense } from "react";
import { WorkoutPlayer } from "@/components/workout/workout-player";

export default function Page() {
  return (
    <Suspense fallback={<main className="app-frame min-h-dvh" />}>
      <WorkoutPlayer />
    </Suspense>
  );
}
