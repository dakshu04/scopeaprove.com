"use client";

import { useActionState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import {
  createProject,
  type CreateProjectState,
} from "@/app/dashboard/projects/new/actions";
import { ScopeItemsField } from "@/components/projects/scope-items-field";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: CreateProjectState = {};

export function CreateProjectForm({
  variant = "page",
}: {
  variant?: "page" | "dialog";
}) {
  const [state, formAction, pending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <form
      action={formAction}
      className={
        variant === "dialog"
          ? "space-y-4 p-5 sm:p-6"
          : "space-y-6 rounded-2xl border border-border/80 bg-card p-5 shadow-[0_12px_35px_rgba(31,49,42,0.05)] sm:p-6"
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">
            Project name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            required
            maxLength={100}
            placeholder="e.g. Acme Website Redesign"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
          />
          {state.errors?.name?.[0] && (
            <p id="name-error" className="text-xs text-destructive">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientName">Client name</Label>
          <Input
            id="clientName"
            name="clientName"
            maxLength={120}
            placeholder="Acme Ltd"
            autoComplete="organization"
            aria-invalid={Boolean(state.errors?.clientName)}
            aria-describedby={
              state.errors?.clientName ? "client-name-error" : undefined
            }
          />
          {state.errors?.clientName?.[0] && (
            <p id="client-name-error" className="text-xs text-destructive">
              {state.errors.clientName[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientEmail">Client email</Label>
          <Input
            id="clientEmail"
            name="clientEmail"
            type="email"
            maxLength={320}
            placeholder="client@example.com"
            autoComplete="email"
            aria-invalid={Boolean(state.errors?.clientEmail)}
            aria-describedby={
              state.errors?.clientEmail ? "client-email-error" : undefined
            }
          />
          {state.errors?.clientEmail?.[0] && (
            <p id="client-email-error" className="text-xs text-destructive">
              {state.errors.clientEmail[0]}
            </p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            maxLength={2000}
            rows={variant === "dialog" ? 3 : 6}
            placeholder="Briefly describe what you''re building..."
            aria-invalid={Boolean(state.errors?.description)}
            aria-describedby={
              state.errors?.description ? "description-error" : undefined
            }
          />
          {state.errors?.description?.[0] && (
            <p id="description-error" className="text-xs text-destructive">
              {state.errors.description[0]}
            </p>
          )}
        </div>
      </div>

      <ScopeItemsField compact={variant === "dialog"} />

      {state.errors?.scopeItems?.[0] && (
        <p className="text-xs text-destructive">
          {state.errors.scopeItems[0]}
        </p>
      )}

      {state.message && (
        <div
          className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </div>
      )}

      <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
        {variant === "dialog" ? (
          <DialogClose
            render={<Button type="button" variant="outline" />}
          >
            Cancel
          </DialogClose>
        ) : (
          <Link
            href="/dashboard/projects"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
        )}

        <Button type="submit" disabled={pending}>
          {pending && (
            <LoaderCircle className="animate-spin" aria-hidden="true" />
          )}
          {pending ? "Creating..." : "Create project"}
        </Button>
      </div>
    </form>
  );
}
