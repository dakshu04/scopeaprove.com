import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PrintApprovalRecordButton } from "@/components/change-requests/print-approval-record-button";
import { requireUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Approval record",
  robots: { index: false, follow: false, noarchive: true },
};

const dateTimeFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "UTC",
});

function formatAmount(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}

export default async function ApprovalRecordPage({
  params,
}: PageProps<"/dashboard/change-requests/[changeRequestId]/record">) {
  const user = await requireUser();
  const { changeRequestId } = await params;
  const request = await prisma.changeRequest.findFirst({
    where: { id: changeRequestId, project: { userId: user.id } },
    select: {
      id: true,
      title: true,
      description: true,
      amountCents: true,
      currency: true,
      additionalDays: true,
      newDeliveryDate: true,
      sentAt: true,
      project: { select: { name: true, clientName: true } },
      approval: {
        select: {
          id: true,
          decision: true,
          clientName: true,
          clientEmail: true,
          declineReason: true,
          decidedAt: true,
        },
      },
    },
  });

  if (!request?.approval) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl bg-white px-5 py-8 text-[#1b1c18] sm:px-10 sm:py-12 print:max-w-none print:p-0">
      <div className="mb-8 flex items-center justify-between gap-4 print:hidden">
        <Link
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
          href={`/dashboard/change-requests/${request.id}`}
        >
          ← Back to request
        </Link>
        <PrintApprovalRecordButton />
      </div>

      <header className="border-b-2 border-[#176b55] pb-7">
        <p className="text-sm font-semibold text-[#176b55]">ScopeYes</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
          Client decision record
        </h1>
        <p className="mt-2 text-sm text-[#666760]">
          A printable record of the change request and submitted client decision.
        </p>
      </header>

      <section className="grid gap-4 border-b border-[#deded6] py-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#777870]">Project</p>
          <p className="mt-1 font-semibold">{request.project.name}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#777870]">Record ID</p>
          <p className="mt-1 break-all font-mono text-sm">{request.approval.id}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#777870]">Request</p>
          <p className="mt-1 font-semibold">{request.title}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#777870]">Additional amount</p>
          <p className="mt-1 font-semibold">{formatAmount(request.amountCents, request.currency)}</p>
        </div>
      </section>

      <section className="border-b border-[#deded6] py-6">
        <h2 className="text-sm font-semibold">Requested work</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#555650]">
          {request.description}
        </p>
      </section>

      <section className="grid gap-4 border-b border-[#deded6] py-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#777870]">Additional days</p>
          <p className="mt-1 text-sm font-medium">
            {request.additionalDays === null ? "No change" : `${request.additionalDays} days`}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#777870]">New delivery date</p>
          <p className="mt-1 text-sm font-medium">
            {request.newDeliveryDate
              ? dateTimeFormatter.format(request.newDeliveryDate)
              : "No change"}
          </p>
        </div>
      </section>

      <section className="mt-7 rounded-xl border border-[#cfded7] bg-[#f1f8f5] p-5 print:break-inside-avoid">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#176b55]">Client decision</p>
        <p className="mt-2 text-2xl font-semibold">{request.approval.decision}</p>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div><dt className="text-[#777870]">Submitted by</dt><dd className="mt-1 font-medium">{request.approval.clientName}</dd></div>
          <div><dt className="text-[#777870]">Email</dt><dd className="mt-1 font-medium">{request.approval.clientEmail}</dd></div>
          <div><dt className="text-[#777870]">Decision time (UTC)</dt><dd className="mt-1 font-medium">{dateTimeFormatter.format(request.approval.decidedAt)}</dd></div>
          <div><dt className="text-[#777870]">Request sent (UTC)</dt><dd className="mt-1 font-medium">{request.sentAt ? dateTimeFormatter.format(request.sentAt) : "Not recorded"}</dd></div>
        </dl>
        {request.approval.declineReason ? (
          <div className="mt-5 border-t border-[#cfded7] pt-4">
            <p className="text-xs text-[#777870]">Requested changes</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{request.approval.declineReason}</p>
          </div>
        ) : null}
      </section>

      <p className="mt-8 text-xs leading-5 text-[#777870]">
        This record documents a ScopeYes workflow event. It does not by itself
        determine legal enforceability or replace the parties’ underlying agreement.
      </p>
    </main>
  );
}
