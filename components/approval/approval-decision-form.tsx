"use client";

import { useActionState, useState } from "react";
import { Check, X } from "lucide-react";

import {
  recordApprovalDecision,
  type ApprovalDecisionState,
} from "@/app/approve/[token]/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Decision = "APPROVED" | "DECLINED";

type ApprovalDecisionFormProps = {
  token: string;
  defaultClientName?: string;
};

const initialState: ApprovalDecisionState = {};

export function ApprovalDecisionForm({
  token,
  defaultClientName = "",
}: ApprovalDecisionFormProps) {
  const [decision, setDecision] = useState<Decision | null>(
    null,
  );
const [clientName, setClientName] = useState(
  defaultClientName,
);
const [clientEmail, setClientEmail] = useState("");
const [declineReason, setDeclineReason] = useState("");
  const recordDecisionForToken =
    recordApprovalDecision.bind(null, token);

  const [state, formAction, pending] = useActionState(
    recordDecisionForToken,
    initialState,
  );

  if (state.success) {
    return (
      <div
        className="border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900"
        role="status"
      >
        <div className="flex items-start gap-3">
          <Check
            className="mt-0.5 size-5 shrink-0"
            aria-hidden="true"
          />

          <div>
            <h2 className="text-sm font-semibold">
              Decision recorded
            </h2>
            <p className="mt-1 text-sm">
              {state.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input
        type="hidden"
        name="decision"
        value={decision ?? ""}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setDecision("APPROVED")}
          aria-pressed={decision === "APPROVED"}
          className={cn(
            "h-auto justify-start gap-3 px-4 py-4",
            decision === "APPROVED" &&
              "border-emerald-600 bg-emerald-50 text-emerald-900 hover:bg-emerald-50",
          )}
        >
          <Check aria-hidden="true" />
          Approve request
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => setDecision("DECLINED")}
          aria-pressed={decision === "DECLINED"}
          className={cn(
            "h-auto justify-start gap-3 px-4 py-4",
            decision === "DECLINED" &&
              "border-red-600 bg-red-50 text-red-900 hover:bg-red-50",
          )}
        >
          <X aria-hidden="true" />
          Request changes
        </Button>
      </div>

      {state.errors?.decision?.[0] && (
        <p className="text-xs text-destructive">
          {state.errors.decision[0]}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="clientName">Your name</Label>

          <Input
            id="clientName"
            name="clientName"
            required
            maxLength={120}
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            defaultValue={defaultClientName}
            autoComplete="name"
            aria-invalid={Boolean(state.errors?.clientName)}
            aria-describedby={
              state.errors?.clientName
                ? "client-name-error"
                : undefined
            }
          />

          {state.errors?.clientName?.[0] && (
            <p
              id="client-name-error"
              className="text-xs text-destructive"
            >
              {state.errors.clientName[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientEmail">Your email</Label>

          <Input
            id="clientEmail"
            name="clientEmail"
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
            maxLength={320}
            autoComplete="email"
            aria-invalid={Boolean(state.errors?.clientEmail)}
            aria-describedby={
              state.errors?.clientEmail
                ? "client-email-error"
                : undefined
            }
          />

          {state.errors?.clientEmail?.[0] && (
            <p
              id="client-email-error"
              className="text-xs text-destructive"
            >
              {state.errors.clientEmail[0]}
            </p>
          )}
        </div>
      </div>

      {decision === "DECLINED" && (
        <div className="space-y-2">
          <Label htmlFor="declineReason">
            What needs to change?
          </Label>

          <Textarea
            id="declineReason"
            name="declineReason"
            value={declineReason}
onChange={(event) => setDeclineReason(event.target.value)}
            required
            maxLength={2000}
            rows={5}
            placeholder="Explain what needs to change before you can approve."
            aria-invalid={Boolean(
              state.errors?.declineReason,
            )}
            aria-describedby={
              state.errors?.declineReason
                ? "decline-reason-error"
                : undefined
            }
          />

          {state.errors?.declineReason?.[0] && (
            <p
              id="decline-reason-error"
              className="text-xs text-destructive"
            >
              {state.errors.declineReason[0]}
            </p>
          )}
        </div>
      )}

      {state.message && (
        <div
          className="border-l-2 border-destructive pl-3 text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </div>
      )}

      <div className="flex justify-end border-t border-border pt-6">
        <Button
          type="submit"
          disabled={pending || decision === null}
        >
          {pending
            ? "Recording decision…"
            : decision === "DECLINED"
              ? "Send change request"
              : "Confirm approval"}
        </Button>
      </div>
    </form>
  );
}
