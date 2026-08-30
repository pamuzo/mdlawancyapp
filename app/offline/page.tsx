"use client";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="mb-6 text-6xl">📡</div>

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
