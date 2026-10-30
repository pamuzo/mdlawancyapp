"use client";

export default function OfflinePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4 text-center sm:px-6">
      <div className="max-w-md">
        <div className="mb-6 text-5xl sm:text-6xl">📡</div>

        <h1 className="text-3xl font-bold">You're offline</h1>

        <p className="mt-3 text-muted-foreground">
          It looks like you don't have an internet connection. Please reconnect
          and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
