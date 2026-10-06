"use client";

import { useState } from "react";
import { ArrowRight, Loader2, TriangleAlert } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export function GoogleSignInButton({
  callbackURL = "/dashboard",
}: {
  callbackURL?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignIn() {
    try {
      setLoading(true);
      setErrorMessage(null);

      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setErrorMessage(
        "We couldn’t start Google sign-in. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleSignIn}
        disabled={loading}
        aria-busy={loading}
        className="group flex h-14 w-full items-center gap-3 rounded-xl border border-border/90 bg-white px-3.5 text-sm font-semibold text-foreground shadow-[0_2px_8px_rgba(31,49,42,0.05)] outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_28px_rgba(23,107,85,0.12)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:translate-y-0 disabled:pointer-events-none disabled:opacity-65"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border/70 bg-white shadow-xs">
          {loading ? (
            <Loader2
              className="size-4 animate-spin text-primary"
              aria-hidden="true"
            />
          ) : (
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.5 5.5 0 0 1-2.4 3.61v3h3.89c2.28-2.1 3.55-5.2 3.55-8.64Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.89-3c-1.07.72-2.43 1.15-4.05 1.15-3.12 0-5.76-2.11-6.71-4.95H1.27v3.09A12 12 0 0 0 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.29 14.29A7.22 7.22 0 0 1 4.91 12c0-.79.14-1.56.38-2.29V6.62H1.27A12 12 0 0 0 0 12c0 1.93.46 3.76 1.27 5.38l4.02-3.09Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.76c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.95 1.17 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4.02 3.09C6.24 6.87 8.88 4.76 12 4.76Z"
              />
            </svg>
          )}
        </span>

        <span className="min-w-0 flex-1 text-center">
          {loading ? "Opening Google…" : "Continue with Google"}
        </span>

        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </button>

      {errorMessage ? (
        <p
          className="mt-2.5 flex items-center gap-2 rounded-lg border border-destructive/15 bg-destructive/5 px-3 py-2 text-xs text-destructive"
          role="alert"
        >
          <TriangleAlert className="size-3.5 shrink-0" aria-hidden="true" />
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
