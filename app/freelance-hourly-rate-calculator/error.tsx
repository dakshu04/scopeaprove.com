"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function FreelanceRateCalculatorError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#f8f8f4] px-5 py-16 dark:bg-[#101814]">
      <div className="max-w-md rounded-3xl border border-[#dfe4e0] bg-white p-8 text-center shadow-[0_24px_70px_rgba(25,50,41,0.1)] dark:border-white/10 dark:bg-[#15231e] dark:text-white">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
          <AlertTriangle aria-hidden="true" className="size-5" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
          The rate calculator hit a snag
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#68716c] dark:text-white/60">
          Your entries stay in this browser. Try again to start with a fresh
          rate plan.
        </p>
        <button
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#176b55] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#125c49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-2"
          onClick={reset}
          type="button"
        >
          <RotateCcw aria-hidden="true" className="size-4" /> Try again
        </button>
      </div>
    </main>
  );
}
