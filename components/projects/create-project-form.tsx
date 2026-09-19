"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  createProject,
  type CreateProjectState,
} from "@/app/dashboard/projects/new/actions";
import { ScopeItemsField } from "@/components/projects/scope-items-field";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: CreateProjectState = {};

export function CreateProjectForm() {
  const [state, formAction, pending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project name</Label>

        <Input
          id="name"
          name="name"
          required
          maxLength={100}
          placeholder="Website redesign"
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={
            state.errors?.name ? "name-error" : undefined
          }
        />

        {state.errors?.name?.[0] && (
          <p id="name-error" className="text-xs text-destructive">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
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

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          maxLength={2000}
          rows={6}
          placeholder="Describe the agreed project outcome."
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

      <ScopeItemsField />

      {state.errors?.scopeItems?.[0] && (
        <p className="text-xs text-destructive">
          {state.errors.scopeItems[0]}
        </p>
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

      <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "outline" })}
        >
          Cancel
        </Link>

        <Button type="submit" disabled={pending}>
          {pending ? "Creating project…" : "Create project"}
        </Button>
      </div>
    </form>
  );
}