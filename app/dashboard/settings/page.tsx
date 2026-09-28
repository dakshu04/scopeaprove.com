import Link from "next/link";
import {
  CreditCard,
  FileText,
  FolderKanban,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { requireUser } from "@/lib/auth-session";
import {
  ACTIVE_CHANGE_REQUEST_STATUSES,
  FREE_ACTIVE_CHANGE_REQUEST_LIMIT,
  FREE_PROJECT_LIMIT,
  getBillingEntitlements,
} from "@/lib/billing";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const user = await requireUser();

  const [entitlements, projectCount, activeChangeRequestCount] =
    await Promise.all([
      getBillingEntitlements(user.id),
      prisma.project.count({
        where: {
          userId: user.id,
        },
      }),
      prisma.changeRequest.count({
        where: {
          project: {
            userId: user.id,
          },
          status: {
            in: [...ACTIVE_CHANGE_REQUEST_STATUSES],
          },
        },
      }),
    ]);

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Account
        </p>

        <h1 className="text-2xl font-semibold tracking-[-0.03em]">
          Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your ScopeAprove profile, plan, and workspace security.
        </p>
      </header>

      <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
        <div className="flex flex-col gap-4 border-b border-border/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard
                className="size-4 text-primary"
                aria-hidden="true"
              />

              <h2 className="text-sm font-semibold">Plan and usage</h2>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Your access is based on your verified subscription status.
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
              entitlements.isPro
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-primary"
            }`}
          >
            {entitlements.plan}
          </span>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="rounded-lg border border-border/80 bg-muted/25 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FolderKanban
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Projects
            </div>

            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              {entitlements.isPro
                ? `${projectCount} / Unlimited`
                : `${projectCount} / ${FREE_PROJECT_LIMIT}`}
            </p>
          </div>

          <div className="rounded-lg border border-border/80 bg-muted/25 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Active change requests
            </div>

            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              {entitlements.isPro
                ? `${activeChangeRequestCount} / Unlimited`
                : `${activeChangeRequestCount} / ${FREE_ACTIVE_CHANGE_REQUEST_LIMIT}`}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {entitlements.isPro
              ? entitlements.subscription?.nextBillingDate
                ? `Next billing date: ${entitlements.subscription.nextBillingDate.toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}`
                : "Your Pro subscription is active."
              : "Upgrade for unlimited projects and change requests."}
          </p>

          {entitlements.isPro ? (
            <a
              href="/api/customer-portal"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
            >
              Manage subscription
            </a>
          ) : (
            <Link
              href="/#pricing"
              className={buttonVariants({ size: "sm" })}
            >
              Upgrade to Pro
            </Link>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
        <div className="border-b border-border/80 px-5 py-4">
          <h2 className="text-sm font-semibold">Profile</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Profile details are managed through your Google account.
          </p>
        </div>

        <dl className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="rounded-lg border border-border/80 bg-muted/25 p-4">
            <dt className="flex items-center gap-2 text-xs text-muted-foreground">
              <UserRound
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Name
            </dt>

            <dd className="mt-2 text-sm font-medium">{user.name}</dd>
          </div>

          <div className="rounded-lg border border-border/80 bg-muted/25 p-4">
            <dt className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Email
            </dt>

            <dd className="mt-2 truncate text-sm font-medium">
              {user.email}
            </dd>
          </div>
        </dl>
      </section>

      <section className="flex items-start gap-3 rounded-xl border border-primary/15 bg-secondary/55 p-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-primary shadow-sm">
          <ShieldCheck className="size-4" aria-hidden="true" />
        </span>

        <div>
          <h2 className="text-sm font-semibold">
            Secure authentication
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Your workspace uses Google authentication. Client approval
            links remain private and token-protected.
          </p>
        </div>
      </section>
    </div>
  );
}