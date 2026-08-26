export default function OfflinePage() {
  return (
    <main className="app-frame flex min-h-dvh items-center justify-center px-6">
      <div className="surface w-full rounded-3xl p-6 text-center">
        <p className="text-3xl">↻</p>
        <h1 className="mt-3 text-xl font-semibold">You&apos;re offline</h1>
        <p className="muted mt-2 text-sm leading-6">Previously opened Lean Fighter screens and your saved progress remain available offline.</p>
      </div>
    </main>
  );
}
