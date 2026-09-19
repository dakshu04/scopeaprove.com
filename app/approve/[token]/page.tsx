import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { hashPublicToken } from "@/lib/public-token";
import { ApprovalDecisionForm } from "@/components/approval/approval-decision-form";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-4 sm:px-6">
          <span className="text-sm font-semibold tracking-tight">
            ScopeYes
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <header>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Change request
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            {changeRequest.title}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Project: {changeRequest.project.name}
          </p>
        </header>

        {isExpired && (
          <div className="border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            This approval link has expired. Contact the project owner
            for a new link.
          </div>
        )}

        {changeRequest.approval && (
          <div className="border border-border bg-muted/40 px-4 py-3 text-sm">
            This request was{" "}
            <strong>
              {changeRequest.approval.decision.toLowerCase()}
            </strong>{" "}
            by {changeRequest.approval.clientName} on{" "}
            {dateFormatter.format(
              changeRequest.approval.decidedAt,
            )}
            .
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-6">
            <section className="border border-border">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-sm font-semibold">
                  Additional work
                </h2>
              </div>

              <p className="whitespace-pre-wrap px-5 py-4 text-sm leading-6 text-muted-foreground">
                {changeRequest.description}
              </p>
            </section>

            <section className="border border-border">
              <div className="border-b border-border px-5 py-4">
                <h2 className="text-sm font-semibold">
                  Original project scope
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Work already included in the original agreement.
                </p>
              </div>

              <ol className="divide-y divide-border">
                {changeRequest.project.scopeItems.map(
                  (item, index) => (
                    <li
                      key={item.id}
                      className="flex gap-4 px-5 py-4"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center border border-border text-xs text-muted-foreground">
                        {index + 1}
                      </span>
                      <p className="text-sm font-medium">
                        {item.title}
                      </p>
                    </li>
                  ),
                )}
              </ol>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="border border-border px-4 py-4">
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

            <section className="border border-border">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold">
                  Schedule impact
                </h2>
              </div>

              <dl className="space-y-4 px-4 py-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Additional days
                  </dt>
                  <dd className="mt-1 font-medium">
                    {changeRequest.additionalDays === null
                      ? "No change"
                      : `${changeRequest.additionalDays} days`}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-muted-foreground">
                    New delivery date
                  </dt>
                  <dd className="mt-1 font-medium">
                    {changeRequest.newDeliveryDate
                      ? dateFormatter.format(
                          changeRequest.newDeliveryDate,
                        )
                      : "No change"}
                  </dd>
                </div>
              </dl>
            </section>
          </aside>
        </div>

        {!isExpired &&
        changeRequest.status === "PENDING" &&
        !changeRequest.approval && (
            <section
        id="approval-actions"
            className="border-t border-border pt-8"
            >
            <h2 className="text-lg font-semibold">
                Your decision
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
                Review the request above before approving or declining
                it. Your decision is final.
            </p>

            <div className="mt-6">
                <ApprovalDecisionForm
                token={token}
                defaultClientName={
                    changeRequest.project.clientName ?? ""
                }
                />
            </div>
            </section>
        )}
      </main>
    </div>
  );
}