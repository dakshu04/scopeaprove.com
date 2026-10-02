"use client";

import { useActionState, useState } from "react";
import {
  Check,
  CheckCircle2,
  LoaderCircle,
  MessageSquareWarning,
  ShieldCheck,
  X,
} from "lucide-react";

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
  const [decision, setDecision] = useState<Decision | null>(null);
  const [clientName, setClientName] = useState(defaultClientName);
  const [clientEmail, setClientEmail] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const recordDecisionForToken = recordApprovalDecision.bind(null, token);

  const [state, formAction, pending] = useActionState(
    recordDecisionForToken,
    initialState,
  );

  if (state.success) {
    const wasApproved = decision === "APPROVED";

    return (
      <div
        className={cn(
          "animate-in fade-in zoom-in-95 overflow-hidden rounded-2xl border p-6 text-center duration-300",
          wasApproved
            ? "border-emerald-200 bg-[radial-gradient(circle_at_top,#ffffff_0%,#ecfdf5_72%)] text-emerald-950"
            : "border-amber-200 bg-[linear-gradient(180deg,#fffbeb_0%,#fff7ed_100%)] text-amber-950",
        )}
        role="status"
      >
        <span
          className={cn(
            "mx-auto grid size-12 place-items-center rounded-full shadow-sm ring-4",
            wasApproved
              ? "bg-emerald-600 text-white ring-emerald-100"
              : "bg-amber-100 text-amber-800 ring-amber-50",
          )}
        >
          {wasApproved ? (
            <Check
              className="size-6"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          ) : (
            <MessageSquareWarning className="size-5" aria-hidden="true" />
          )}
        </span>

        <h2 className="mt-4 text-lg font-semibold tracking-[-0.025em]">
          {wasApproved ? "Approved — you’re all set" : "Changes requested"}
        </h2>
        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 opacity-75">
          {wasApproved
            ? "Thank you. Your approval has been securely recorded and the project owner can move forward."
            : "Your feedback has been securely recorded. The project owner will review it before sending an updated request."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="decision" value={decision ?? ""} />

      <fieldset>
        <legend className="sr-only">Choose your decision</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setDecision("APPROVED")}
            aria-pressed={decision === "APPROVED"}
            className={cn(
              "h-auto min-h-20 items-start justify-start gap-3 whitespace-normal rounded-xl px-3.5 py-3 text-left shadow-none",
              decision === "APPROVED"
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-100 hover:bg-emerald-50"
                : "border-border/90 bg-white hover:border-emerald-300 hover:bg-emerald-50/50",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full",
                decision === "APPROVED"
                  ? "bg-emerald-600 text-white"
                  : "bg-secondary text-primary",
              )}
            >
              <Check
                className="size-3.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </span>
            <span>
              <span className="block text-xs font-semibold">Looks good</span>
              <span className="mt-1 block text-[10px] font-normal leading-4 opacity-65">
                Approve scope and impact
              </span>
            </span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setDecision("DECLINED")}
            aria-pressed={decision === "DECLINED"}
            className={cn(
              "h-auto min-h-20 items-start justify-start gap-3 whitespace-normal rounded-xl px-3.5 py-3 text-left shadow-none",
              decision === "DECLINED"
                ? "border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-100 hover:bg-rose-50"
                : "border-border/90 bg-white hover:border-rose-200 hover:bg-rose-50/40",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full",
                decision === "DECLINED"
                  ? "bg-rose-600 text-white"
                  : "bg-rose-50 text-rose-700",
              )}
            >
              <X
                className="size-3.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </span>
            <span>
              <span className="block text-xs font-semibold">
                Needs changes
              </span>
              <span className="mt-1 block text-[10px] font-normal leading-4 opacity-65">
                Return with clear feedback
              </span>
            </span>
          </Button>
        </div>
      </fieldset>

      {state.errors?.decision?.[0] ? (
        <p className="text-xs text-destructive">
          {state.errors.decision[0]}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="clientName" className="text-xs">
            Your name
          </Label>
          <Input
            id="clientName"
            name="clientName"
            required
            maxLength={120}
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            autoComplete="name"
            className="h-10 rounded-lg bg-white"
            aria-invalid={Boolean(state.errors?.clientName)}
            aria-describedby={
              state.errors?.clientName ? "client-name-error" : undefined
            }
          />
          {state.errors?.clientName?.[0] ? (
            <p
              id="client-name-error"
              className="text-xs text-destructive"
            >
              {state.errors.clientName[0]}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="clientEmail" className="text-xs">
            Your email
          </Label>
          <Input
            id="clientEmail"
            name="clientEmail"
            type="email"
            value={clientEmail}
            onChange={(event) => setClientEmail(event.target.value)}
            required
            maxLength={320}
            autoComplete="email"
            className="h-10 rounded-lg bg-white"
            placeholder="you@company.com"
            aria-invalid={Boolean(state.errors?.clientEmail)}
            aria-describedby={
              state.errors?.clientEmail ? "client-email-error" : undefined
            }
          />
          {state.errors?.clientEmail?.[0] ? (
            <p
              id="client-email-error"
              className="text-xs text-destructive"
            >
              {state.errors.clientEmail[0]}
            </p>
          ) : null}
        </div>
      </div>

      {decision === "DECLINED" ? (
        <div className="animate-in fade-in slide-in-from-top-1 space-y-1.5 duration-200">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="declineReason" className="text-xs">
              What needs to change?
            </Label>
            <span className="text-[10px] text-muted-foreground">
              Required
            </span>
          </div>
          <Textarea
            id="declineReason"
            name="declineReason"
            value={declineReason}
            onChange={(event) => setDeclineReason(event.target.value)}
            required
            maxLength={2000}
            rows={3}
            className="min-h-20 resize-none rounded-lg bg-white"
            placeholder="Explain what should change before you can approve."
            aria-invalid={Boolean(state.errors?.declineReason)}
            aria-describedby={
              state.errors?.declineReason
                ? "decline-reason-error"
                : "decline-consequence"
            }
          />
          {state.errors?.declineReason?.[0] ? (
            <p
              id="decline-reason-error"
              className="text-xs text-destructive"
            >
              {state.errors.declineReason[0]}
            </p>
          ) : (
            <p
              id="decline-consequence"
              className="text-[10px] leading-4 text-rose-700"
            >
              This pauses approval until the project owner sends an updated
              request.
            </p>
          )}
        </div>
      ) : null}

      {state.message ? (
        <div
          className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </div>
      ) : null}

      <div className="space-y-2 border-t border-border/80 pt-4">
        <Button
          type="submit"
          disabled={pending || decision === null}
          className={cn(
            "h-11 w-full rounded-xl text-sm font-semibold shadow-[0_8px_20px_rgba(23,107,85,0.16)]",
            decision === "APPROVED" &&
              "bg-emerald-700 text-white hover:bg-emerald-800",
            decision === "DECLINED" &&
              "bg-rose-700 text-white shadow-[0_8px_20px_rgba(190,24,93,0.14)] hover:bg-rose-800",
          )}
        >
          {pending ? (
            <>
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
              Recording decision…
            </>
          ) : decision === "DECLINED" ? (
            <>
              <MessageSquareWarning
                className="size-4"
                aria-hidden="true"
              />
              Send requested changes
            </>
          ) : (
            <>
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Approve and confirm
            </>
          )}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-muted-foreground">
          <ShieldCheck
            className="size-3 text-primary"
            aria-hidden="true"
          />
          Your identity and decision are securely recorded.
        </p>
      </div>
    </form>
  );
}
