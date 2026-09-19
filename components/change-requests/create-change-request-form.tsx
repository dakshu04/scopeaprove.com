"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  createChangeRequest,
  type CreateChangeRequestState,
} from "@/app/dashboard/projects/[projectId]/change-requests/new/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CreateChangeRequestFormProps = {
  projectId: string;
};

const initialState: CreateChangeRequestState = {};

export function CreateChangeRequestForm({
  projectId,
}: CreateChangeRequestFormProps) {
  const createChangeRequestForProject =
    createChangeRequest.bind(null, projectId);

  const [state, formAction, pending] = useActionState(
    createChangeRequestForProject,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Change title</Label>

        <Input
          id="title"
          name="title"
          required
          maxLength={160}
          placeholder="Add a customer portal"
          aria-invalid={Boolean(state.errors?.title)}
          aria-describedby={
            state.errors?.title ? "title-error" : undefined
          }
        />

        {state.errors?.title?.[0] && (
          <p id="title-error" className="text-xs text-destructive">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Requested work
        </Label>

        <Textarea
          id="description"
          name="description"
          required
          maxLength={10_000}
          rows={8}
          placeholder="Describe what the client requested and what additional work is required."
          aria-invalid={Boolean(state.errors?.description)}
          aria-describedby={
            state.errors?.description
              ? "description-error"
              : undefined
          }
        />

        {state.errors?.description?.[0] && (
          <p
            id="description-error"
            className="text-xs text-destructive"
          >
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_10rem]">
        <div className="space-y-2">
          <Label htmlFor="amount">
            Additional amount
          </Label>

          <Input
            id="amount"
            name="amount"
            type="number"
            inputMode="decimal"
            required
            min="0.01"
            step="0.01"
            placeholder="350.00"
            aria-invalid={Boolean(state.errors?.amount)}
            aria-describedby={
              state.errors?.amount ? "amount-error" : undefined
            }
          />

          {state.errors?.amount?.[0] && (
            <p
              id="amount-error"
              className="text-xs text-destructive"
            >
              {state.errors.amount[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>

          <select
            id="currency"
            name="currency"
            defaultValue="USD"
            className="h-9 w-full border border-input bg-transparent px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            aria-invalid={Boolean(state.errors?.currency)}
            aria-describedby={
              state.errors?.currency
                ? "currency-error"
                : undefined
            }
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
          </select>

          {state.errors?.currency?.[0] && (
            <p
              id="currency-error"
              className="text-xs text-destructive"
            >
              {state.errors.currency[0]}
            </p>
          )}
        </div>
      </div>

      <section className="space-y-4 border-t border-border pt-6">
        <div>
          <h2 className="text-sm font-semibold">
            Schedule impact
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add a time extension, a revised delivery date, or leave
            both empty.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="additionalDays">
              Additional days
            </Label>

            <Input
              id="additionalDays"
              name="additionalDays"
              type="number"
              inputMode="numeric"
              min="0"
              max="365"
              step="1"
              placeholder="3"
              aria-invalid={Boolean(
                state.errors?.additionalDays,
              )}
              aria-describedby={
                state.errors?.additionalDays
                  ? "additional-days-error"
                  : undefined
              }
            />

            {state.errors?.additionalDays?.[0] && (
              <p
                id="additional-days-error"
                className="text-xs text-destructive"
              >
                {state.errors.additionalDays[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newDeliveryDate">
              New delivery date
            </Label>

            <Input
              id="newDeliveryDate"
              name="newDeliveryDate"
              type="date"
              aria-invalid={Boolean(
                state.errors?.newDeliveryDate,
              )}
              aria-describedby={
                state.errors?.newDeliveryDate
                  ? "delivery-date-error"
                  : undefined
              }
            />

            {state.errors?.newDeliveryDate?.[0] && (
              <p
                id="delivery-date-error"
                className="text-xs text-destructive"
              >
                {state.errors.newDeliveryDate[0]}
              </p>
            )}
          </div>
        </div>
      </section>

      {state.message && (
        <div
          className="border-l-2 border-destructive pl-3 text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </div>
      )}

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <Link
          href={`/dashboard/projects/${projectId}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Cancel
        </Link>

        <Button type="submit" disabled={pending}>
          {pending ? "Creating draft…" : "Create draft"}
        </Button>
      </div>
    </form>
  );
}