import { Mail, ShieldCheck, UserRound } from "lucide-react";

import { requireUser } from "@/lib/auth-session";

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Account
        </p>
        <h1 className="text-2xl font-semibold tracking-[-0.03em]">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your ScopeYes profile and workspace security.
        </p>
      </header>

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
              <UserRound className="size-4 text-primary" aria-hidden="true" />
              Name
            </dt>
            <dd className="mt-2 text-sm font-medium">{user.name}</dd>
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/25 p-4">
            <dt className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="size-4 text-primary" aria-hidden="true" />
              Email
            </dt>
            <dd className="mt-2 truncate text-sm font-medium">{user.email}</dd>
          </div>
        </dl>
      </section>

      <section className="flex items-start gap-3 rounded-xl border border-primary/15 bg-secondary/55 p-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-primary shadow-sm">
          <ShieldCheck className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold">Secure authentication</h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Your workspace uses Google authentication. Client approval links
            remain private and token-protected.
          </p>
        </div>
      </section>
    </div>
  );
}
