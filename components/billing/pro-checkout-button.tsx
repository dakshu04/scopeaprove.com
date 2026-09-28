"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CheckoutResponse = {
  checkout_url?: string;
  error?: string;
};

export function ProCheckoutButton() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function startCheckout() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      if (response.status === 401) {
        router.push("/sign-in");
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

      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        className="w-full rounded-lg bg-[#176b55] px-4 py-3 text-center text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        onClick={startCheckout}
        type="button"
      >
        {isLoading ? "Opening checkout..." : "Start with Pro"}
      </button>

      {errorMessage ? (
        <p
          className="mt-2 text-center text-xs text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}