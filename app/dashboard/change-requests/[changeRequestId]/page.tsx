import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth-session";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { PublishChangeRequest } from "@/components/change-requests/publish-change-request";


type ChangeRequestPageProps = {
  params: Promise<{
    changeRequestId: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
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
        className: "border-amber-200 bg-amber-50 text-amber-800",
      };

    case "APPROVED":
      return {
        label: "Approved",
        className:
          "border-emerald-200 bg-emerald-50 text-emerald-800",
      };

    case "DECLINED":
      return {
        label: "Changes requested",
        className: "border-orange-200 bg-orange-50 text-orange-800",
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

export default async function ChangeRequestPage({
  params,
}: ChangeRequestPageProps) {
  const user = await requireUser();
  const { changeRequestId } = await params;

  const changeRequest = await prisma.changeRequest.findFirst({
    where: {
      id: changeRequestId,
      project: {
        userId: user.id,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      amountCents: true,
      currency: true,
      additionalDays: true,
      newDeliveryDate: true,
      status: true,
      createdAt: true,
      sentAt: true,
      expiresAt: true,
      project: {
        select: {
          id: true,
          name: true,
          clientName: true,
          clientEmail: true,
        },
      },
      approval: {
        select: {
          decision: true,
          clientName: true,
          clientEmail: true,
          declineReason: true,
          decidedAt: true,
        },
      },
    },
  });

  if (!changeRequest) {
    notFound();
  }

  const status = getStatusPresentation(changeRequest.status);

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <Link
          href="/dashboard/change-requests"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to change requests
        </Link>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-[-0.035em]">
              {changeRequest.title}
            </h1>

            <span
              className={cn(
                "inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
                status.className,
              )}
            >
              {status.label}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Created {dateFormatter.format(changeRequest.createdAt)}
          </p>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-5">
          <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold">
                Requested work
              </h2>
            </div>

            <p className="whitespace-pre-wrap px-5 py-4 text-sm leading-6 text-muted-foreground">
              {changeRequest.description}
            </p>
          </section>

          <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold">
                Schedule impact
              </h2>
            </div>
            <dl className="grid gap-6 px-5 py-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">
                  Additional days
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  {changeRequest.additionalDays === null
                    ? "No change"
                    : `${changeRequest.additionalDays} days`}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-muted-foreground">
                  New delivery date
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  {changeRequest.newDeliveryDate
                    ? dateFormatter.format(
                        changeRequest.newDeliveryDate,
                      )
                    : "No change"}
                </dd>
              </div>
            </dl>
          </section>
            {(changeRequest.status === "DRAFT" ||
            changeRequest.status === "PENDING") && (
            <PublishChangeRequest
                changeRequestId={changeRequest.id}
                status={changeRequest.status}
            />
            )}
          {changeRequest.approval && (
            <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-sm font-semibold">
                  Client decision
                </h2>
              </div>

              <dl className="space-y-4 px-5 py-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Decision
                  </dt>
                  <dd className="mt-1 font-medium">
                    {changeRequest.approval.decision}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-muted-foreground">
                    Decided by
                  </dt>
                  <dd className="mt-1">
                    {changeRequest.approval.clientName} ·{" "}
                    {changeRequest.approval.clientEmail}
                  </dd>
                </div>

                {changeRequest.approval.declineReason && (
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      Requested changes
                    </dt>
                    <dd className="mt-1 whitespace-pre-wrap">
                      {changeRequest.approval.declineReason}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          )}
        </div>

        <aside className="space-y-5">
          <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold">
                Project
              </h2>
            </div>

            <div className="space-y-4 px-4 py-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">
                  Project
                </p>
                <Link
                  href={`/dashboard/projects/${changeRequest.project.id}`}
                  className="mt-1 block font-medium underline-offset-4 hover:underline"
                >
                  {changeRequest.project.name}
                </Link>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Client
                </p>
                <p className="mt-1">
                  {changeRequest.project.clientName ||
                    "Not provided"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-primary/10 bg-gradient-to-br from-secondary to-card px-4 py-4 shadow-sm">
            <p className="text-xs text-muted-foreground">
              Additional amount
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {formatAmount(
                changeRequest.amountCents,
                changeRequest.currency,
              )}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
