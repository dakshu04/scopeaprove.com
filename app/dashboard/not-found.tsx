import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <section className="rounded-2xl border border-border/80 bg-card px-6 py-16 text-center shadow-sm">
      <FileQuestion
        className="mx-auto size-6 text-muted-foreground"
        aria-hidden="true"
      />

      <h1 className="mt-4 text-lg font-semibold">
        This record could not be found
      </h1>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        It may have been removed, or you may not have permission to
        view it.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/dashboard"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Go to dashboard
        </Link>

        <Link
          href="/dashboard/projects"
          className={buttonVariants()}
        >
          View projects
        </Link>
      </div>
    </section>
  );
}
