"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type CheckoutResponse = {
  checkout_url?: string;
  error?: string;
};

export function ProCheckoutButton({
  variant = "default",
}: {
  variant?: "default" | "compact";
}) {
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
        router.push("/sign-in?next=checkout");
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
    <div className={cn(variant === "default" ? "mt-8" : "mt-3")}>
      <button
        className={cn(
          "w-full rounded-lg bg-primary text-center font-semibold text-primary-foreground shadow-[0_5px_14px_rgba(23,107,85,0.18)] transition-colors hover:bg-[#125c49] disabled:cursor-not-allowed disabled:opacity-60",
          variant === "compact"
            ? "px-3 py-2 text-[11px]"
            : "px-4 py-3 text-sm",
        )}
        disabled={isLoading}
        onClick={startCheckout}
        type="button"
      >
        {isLoading
          ? "Opening checkout..."
          : variant === "compact"
            ? "Upgrade to Pro"
            : "Start with Pro"}
      </button>

      {errorMessage ? (
        <p
          className={cn(
            "mt-2 text-center text-red-700",
            variant === "compact" ? "text-[10px] leading-4" : "text-xs",
          )}
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
