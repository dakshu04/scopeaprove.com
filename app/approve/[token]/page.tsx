import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Layers3,
  LockKeyhole,
  MessageSquareWarning,
  ReceiptText,
} from "lucide-react";
import { notFound } from "next/navigation";

import { ApprovalDecisionForm } from "@/components/approval/approval-decision-form";
import { prisma } from "@/lib/prisma";
import { hashPublicToken } from "@/lib/public-token";

type ApprovalPageProps = {
  params: Promise<{
    token: string;
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

export default async function ApprovalPage({
  params,
}: ApprovalPageProps) {
  const { token } = await params;

  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
    notFound();
  }

  const publicTokenHash = hashPublicToken(token);

  const changeRequest = await prisma.changeRequest.findUnique({
    where: {
      publicTokenHash,
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
      expiresAt: true,
      project: {
        select: {
          name: true,
          clientName: true,
          scopeItems: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
      approval: {
        select: {
          decision: true,
          clientName: true,
          decidedAt: true,
        },
      },
    },
  });

  if (!changeRequest) {
    notFound();
  }

  const isExpired =
    changeRequest.status === "EXPIRED" ||
    (changeRequest.expiresAt !== null &&
      changeRequest.expiresAt <= new Date());
  const canDecide =
    !isExpired &&
    changeRequest.status === "PENDING" &&
    !changeRequest.approval;
  const additionalDaysLabel =
    changeRequest.additionalDays === null
      ? "No change"
      : "+" +
        changeRequest.additionalDays +
        " " +
        (changeRequest.additionalDays === 1 ? "day" : "days");
  const scheduleSummary = changeRequest.newDeliveryDate
    ? dateFormatter.format(changeRequest.newDeliveryDate)
    : additionalDaysLabel;

  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top_left,rgba(220,238,230,0.58),transparent_34%),linear-gradient(180deg,#f8faf8_0%,#f3f6f4_100%)] text-foreground lg:h-dvh lg:overflow-hidden">
      <header className="h-16 border-b border-border/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-[0_6px_16px_rgba(23,107,85,0.2)]">
              S
            </span>
            <span className="text-sm font-semibold tracking-[-0.02em]">
              ScopeYes
            </span>
          </div>

          <span className="flex items-center gap-1.5 rounded-full border border-primary/10 bg-secondary/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
            <LockKeyhole className="size-3" aria-hidden="true" />
            Secure approval
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1180px] flex-col px-4 py-5 sm:px-6 lg:h-[calc(100dvh-4rem)] lg:min-h-0 lg:py-5">
        <header className="shrink-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                Change request
              </p>
              <h1 className="mt-1.5 truncate text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                {changeRequest.title}
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground sm:pb-1">
              <Layers3
                className="size-3.5 text-primary"
                aria-hidden="true"
              />
              <span>Project</span>
              <span className="max-w-56 truncate font-semibold text-foreground">
                {changeRequest.project.name}
              </span>
            </div>
          </div>

          {isExpired ? (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <AlertTriangle
                className="mt-0.5 size-4 shrink-0 text-amber-700"
                aria-hidden="true"
              />
              <p>
                This approval link has expired. Contact the project owner for a
                new link.
              </p>
            </div>
          ) : null}

        </header>

        <div className="mt-4 grid gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1.16fr)_minmax(23rem,0.84fr)]">
          <article className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_18px_55px_rgba(31,49,42,0.07)]">
            <section className="shrink-0 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-secondary text-primary">
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Proposed addition
                  </p>
                  <h2 className="text-sm font-semibold">Additional work</h2>
                </div>
              </div>

              <div className="dashboard-scroll mt-4 max-h-48 overflow-y-auto rounded-xl border border-border/70 bg-muted/30 px-4 py-3.5 lg:max-h-[25vh]">
                <p className="whitespace-pre-wrap text-sm leading-6 text-[#53605b]">
                  {changeRequest.description}
                </p>
              </div>
            </section>

            <section className="flex min-h-0 flex-1 flex-col border-t border-border/80 p-5 sm:p-6">
              <div className="flex shrink-0 items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold">
                    Original project scope
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Work already included in the original agreement.
                  </p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                  {changeRequest.project.scopeItems.length}{" "}
                  {changeRequest.project.scopeItems.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <ol className="dashboard-scroll mt-4 space-y-2 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
                {changeRequest.project.scopeItems.map((item, index) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-[#fbfcfb] px-3.5 py-3"
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-primary/10 bg-secondary/70 text-[11px] font-semibold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-medium leading-5">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </article>

          <aside className="dashboard-scroll min-h-0 space-y-4 lg:overflow-y-auto lg:pr-1">
            <section className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-primary/15 bg-[linear-gradient(145deg,#edf7f2_0%,#e4f1eb_100%)] p-4 shadow-[0_10px_30px_rgba(23,107,85,0.06)]">
                <ReceiptText
                  className="size-4 text-primary"
                  aria-hidden="true"
                />
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Additional amount
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-primary">
                  {formatAmount(
                    changeRequest.amountCents,
                    changeRequest.currency,
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-border/80 bg-white p-4 shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
                {changeRequest.newDeliveryDate ? (
                  <CalendarDays
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                ) : (
                  <Clock3
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                )}
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Schedule impact
                </p>
                <p className="mt-1 text-lg font-semibold tracking-[-0.025em]">
                  {scheduleSummary}
                </p>
              </div>
            </section>

            {changeRequest.approval ? (
              <section
                className={`rounded-2xl border p-6 text-center shadow-[0_18px_55px_rgba(31,49,42,0.07)] ${
                  changeRequest.approval.decision === "APPROVED"
                    ? "border-emerald-200 bg-[radial-gradient(circle_at_top,#ffffff_0%,#ecfdf5_72%)] text-emerald-950"
                    : "border-amber-200 bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_100%)] text-amber-950"
                }`}
              >
                <span
                  className={`mx-auto grid size-12 place-items-center rounded-full shadow-sm ring-4 ${
                    changeRequest.approval.decision === "APPROVED"
                      ? "bg-emerald-600 text-white ring-emerald-100"
                      : "bg-amber-100 text-amber-800 ring-amber-50"
                  }`}
                >
                  {changeRequest.approval.decision === "APPROVED" ? (
                    <CheckCircle2 className="size-6" aria-hidden="true" />
                  ) : (
                    <MessageSquareWarning
                      className="size-5"
                      aria-hidden="true"
                    />
                  )}
                </span>

                <h2 className="mt-4 text-lg font-semibold tracking-[-0.025em]">
                  {changeRequest.approval.decision === "APPROVED"
                    ? "Approved — ready to move forward"
                    : "Changes were requested"}
                </h2>
                <p className="mt-1.5 text-sm leading-6 opacity-75">
                  Recorded for {changeRequest.approval.clientName} on{" "}
                  {dateFormatter.format(changeRequest.approval.decidedAt)}.
                </p>
              </section>
            ) : null}

            {canDecide ? (
              <section
                id="approval-actions"
                className="rounded-2xl border border-border/80 bg-white p-4 shadow-[0_18px_55px_rgba(31,49,42,0.07)] sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                      Final step
                    </p>
                    <h2 className="mt-1 text-lg font-semibold tracking-[-0.025em]">
                      Your decision
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Confirm the scope, cost, and schedule above.
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <LockKeyhole className="size-4" aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-4">
                  <ApprovalDecisionForm
                    token={token}
                    defaultClientName={
                      changeRequest.project.clientName ?? ""
                    }
                  />
                </div>
              </section>
            ) : null}
          </aside>
        </div>
      </main>
    </div>
  );
}
