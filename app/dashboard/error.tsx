"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

type DashboardErrorProps = {
  error: Error & {
    digest?: string;
  };
  retry: () => void;
};

export default function DashboardError({
  error,
  retry,
}: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      className="rounded-2xl border border-border/80 bg-card px-6 py-16 text-center shadow-sm"
      role="alert"
    >
      <AlertTriangle
        className="mx-auto size-6 text-muted-foreground"
        aria-hidden="true"
      />

      <h1 className="mt-4 text-lg font-semibold">
        This page could not be loaded
      </h1>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        A temporary problem prevented ScopeYes from loading this
        dashboard content. Your saved data has not been removed.
      </p>

      {error.digest && (
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Error reference: {error.digest}
        </p>
      )}

      <Button
        type="button"
        onClick={retry}
        className="mt-6"
      >
        Try again
      </Button>
    </section>
  );
}
