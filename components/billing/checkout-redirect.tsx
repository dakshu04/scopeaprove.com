"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type CheckoutResponse = {
  checkout_url?: string;
  error?: string;
};

export function CheckoutRedirect() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }
    hasStartedRef.current = true;

    async function startCheckout() {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
        });

        if (response.status === 401) {
          router.replace("/sign-in?next=checkout");
          return;
        }

        const result = (await response.json()) as CheckoutResponse;

        if (!response.ok || !result.checkout_url) {
          throw new Error(
            result.error ?? "Unable to open checkout. Please try again.",
          );
        }

        window.location.assign(result.checkout_url);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to open checkout. Please try again.",
        );
      }
    }

    void startCheckout();
  }, [attempt, router]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-5 text-center">
      <section className="max-w-md">
        <h1 className="text-xl font-semibold">Taking you to checkout</h1>
        {errorMessage ? (
          <>
            <p className="mt-3 text-sm text-muted-foreground" role="alert">
              {errorMessage}
            </p>
            <button
              className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              onClick={() => {
                hasStartedRef.current = false;
                setErrorMessage(null);
                setAttempt((current) => current + 1);
              }}
              type="button"
            >
              Try again
            </button>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
            Your account is ready. Checkout should open shortly.
          </p>
        )}
      </section>
    </main>
  );
}
