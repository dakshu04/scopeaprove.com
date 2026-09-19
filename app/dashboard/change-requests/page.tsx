import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getChangeRequests } from "@/lib/data/change-requests";
import { requireUser } from "@/lib/auth-session";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

function formatAmount(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}

function getStatusPresentation(status: string) {
  switch (status) {
    case "PENDING":
      return {
        label: "Pending",
        className:
          "border-amber-200 bg-amber-50 text-amber-800",
      };

    case "APPROVED":
      return {
        label: "Approved",
        className:
          "border-emerald-200 bg-emerald-50 text-emerald-800",
      };

    case "DECLINED":
      return {
        label: "Declined",
        className: "border-red-200 bg-red-50 text-red-800",
      };

    case "EXPIRED":
      return {
        label: "Expired",
        className:
          "border-border bg-muted text-muted-foreground",
      };

    default:
      return {
        label: "Draft",
        className:
          "border-border bg-background text-muted-foreground",
      };
  }
}

export default async function ChangeRequestsPage() {
  const user = await requireUser();
  const changeRequests = await getChangeRequests(user.id);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Change requests
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track proposed work, client decisions, cost, and schedule
            changes.
          </p>
        </div>

        <Link
          href="/dashboard/projects"
          className={buttonVariants({ variant: "outline" })}
        >
          Choose a project
        </Link>
      </header>

      {changeRequests.length === 0 ? (
        <section className="border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-sm font-semibold">
            No change requests yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Open a project when work falls outside its original scope,
            then create a change request for client approval.
          </p>

          <Link
            href="/dashboard/projects"
            className={buttonVariants({
              variant: "outline",
              className: "mt-6",
            })}
          >
            View projects
          </Link>
        </section>
      ) : (
        <section className="border border-border">
          <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8rem_7rem_8rem] border-b border-border px-5 py-3 text-xs font-medium text-muted-foreground lg:grid">
            <span>Request</span>
            <span>Project</span>
            <span>Amount</span>
            <span>Status</span>
            <span className="text-right">Created</span>
          </div>

          <div className="divide-y divide-border">
            {changeRequests.map((request) => {
              const status = getStatusPresentation(request.status);

              return (
                <Link
                  key={request.id}
                  href={`/dashboard/change-requests/${request.id}`}
                  className="grid gap-4 px-5 py-4 transition-colors hover:bg-muted/50 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_8rem_7rem_8rem] lg:items-center"
                >
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-medium">
                      {request.title}
                    </h2>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm">
                      {request.project.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {request.project.clientName || "No client name"}
                    </p>
                  </div>

                  <p className="text-sm">
                    {formatAmount(
                      request.amountCents,
                      request.currency,
                    )}
                  </p>

                  <div>
                    <span
                      className={cn(
                        "inline-flex border px-2 py-1 text-xs font-medium",
                        status.className,
                      )}
                    >
                      {status.label}
                    </span>
                  </div>

                  <time
                    dateTime={request.createdAt.toISOString()}
                    className="text-sm text-muted-foreground lg:text-right"
                  >
                    {dateFormatter.format(request.createdAt)}
                  </time>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}