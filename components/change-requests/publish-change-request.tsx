"use client";

import {
  useActionState,
  useState,
} from "react";
import { Check, Copy, Link2, Mail, Share2 } from "lucide-react";

import {
  publishChangeRequest,
  type PublishChangeRequestState,
} from "@/app/dashboard/change-requests/[changeRequestId]/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PublishChangeRequestProps = {
  changeRequestId: string;
  status: "DRAFT" | "PENDING";
  clientEmail?: string | null;
  requestTitle: string;
};

const initialState: PublishChangeRequestState = {};

export function PublishChangeRequest({
  changeRequestId,
  status,
  clientEmail,
  requestTitle,
}: PublishChangeRequestProps) {
  const publishThisChangeRequest =
    publishChangeRequest.bind(null, changeRequestId);

  const [state, formAction, pending] = useActionState(
    publishThisChangeRequest,
    initialState,
  );

  const [copied, setCopied] = useState(false);
  const approvalUrl =
    state.approvalPath && typeof window !== "undefined"
      ? `${window.location.origin}${state.approvalPath}`
      : state.approvalPath ?? "";

  async function copyApprovalLink() {
    if (!approvalUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(approvalUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function shareApprovalLink() {
    if (!approvalUrl) {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Review: ${requestTitle}`,
          text: "Please review this ScopeYes change request and record your decision.",
          url: approvalUrl,
        });
      } catch {
        // Closing the native share sheet is an intentional, non-error outcome.
      }

      return;
    }

    await copyApprovalLink();
  }

  const emailSubject = `Approval requested: ${requestTitle}`;
  const emailBody = `Please review this change request and record your decision:\n\n${approvalUrl}\n\nThis private link expires in 14 days.`;
  const emailHref = `mailto:${clientEmail ? encodeURIComponent(clientEmail) : ""}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <section className="overflow-hidden rounded-xl border border-primary/15 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Link2
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <h2 className="text-sm font-semibold">
            Client approval
          </h2>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {status === "DRAFT"
            ? "Create a secure link for the client to approve or decline this request."
            : "Create a replacement link if the previous approval link was lost."}
        </p>
      </div>

      <div className="space-y-4 px-5 py-4">
        {status === "PENDING" && !state.approvalPath && (
          <p className="text-xs text-muted-foreground">
            Replacing the link immediately invalidates the previous
            approval link.
          </p>
        )}

        <form action={formAction} onSubmit={() => setCopied(false)}>
          <Button type="submit" disabled={pending}>
            {pending
              ? "Creating link…"
              : status === "PENDING"
                ? "Replace approval link"
                : "Create approval link"}
          </Button>
        </form>

        {state.error && (
          <div
            className="border-l-2 border-destructive pl-3 text-sm text-destructive"
            role="alert"
          >
            {state.error}
          </div>
        )}

        {state.approvalPath && (
          <div className="space-y-3 border-t border-border pt-4">
            <div>
              <p className="text-sm font-medium">
                Approval link
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                This link expires in 14 days. Send it only to the
                intended client.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={approvalUrl}
                readOnly
                aria-label="Client approval link"
                className="font-mono text-xs"
              />

              <Button
                type="button"
                variant="outline"
                onClick={copyApprovalLink}
                disabled={!approvalUrl}
              >
                {copied ? (
                  <>
                    <Check aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy aria-hidden="true" />
                    Copy link
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={shareApprovalLink}>
                <Share2 aria-hidden="true" />
                Share
              </Button>
              <a
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-sm font-medium shadow-xs transition-colors hover:bg-muted"
                href={emailHref}
              >
                <Mail className="size-4" aria-hidden="true" />
                Email client
              </a>
            </div>

            {state.message && (
              <p
                className="text-sm text-muted-foreground"
                aria-live="polite"
              >
                {state.message}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
