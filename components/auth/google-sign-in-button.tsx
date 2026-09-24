"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={loading}
      className="
        group
        flex
        h-[56px]
        w-full
        items-center
        justify-center
        gap-3
        border
        border-[#d8ddd9]
        bg-white
        px-5
        text-[15px]
        font-semibold
        text-[#202320]
        shadow-[0_1px_2px_rgba(0,0,0,0.04)]
        transition-all
        duration-200
        hover:border-[#176f5c]
        hover:bg-[#fbfcfb]
        hover:shadow-[0_8px_24px_rgba(23,111,92,0.10)]
        active:scale-[0.99]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-[#176f5c]" />
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="shrink-0"
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

      <span>
        {loading ? "Signing you in..." : "Continue with Google"}
      </span>

      {!loading && (
        <span
          className="
            ml-1
            text-lg
            font-normal
            text-[#176f5c]
            opacity-0
            transition-all
            duration-200
            group-hover:translate-x-1
            group-hover:opacity-100
          "
        >
          →
        </span>
      )}
    </button>
  );
}