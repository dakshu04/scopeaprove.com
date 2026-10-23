import Link from "next/link";
import {
  ArrowUpRight,
  Calculator,
  FileCheck2,
  FileText,
  Gauge,
} from "lucide-react";

const tools = [
  {
    description: "Set a sustainable rate from your income target, overhead, taxes, time off, and billable capacity.",
    href: "/freelance-hourly-rate-calculator",
    icon: Gauge,
    label: "Pricing",
    title: "Freelance hourly rate calculator",
  },
  {
    description: "Measure the revenue and margin lost to unapproved extra work before discussing it with a client.",
    href: "/scope-creep-cost-calculator",
    icon: Calculator,
    label: "Project margin",
    title: "Scope creep cost calculator",
  },
  {
    description: "Copy or download a practical project scope covering deliverables, exclusions, revisions, and changes.",
    href: "/guides/freelance-scope-of-work-template",
    icon: FileText,
    label: "Project setup",
    title: "Scope of work template",
  },
  {
    description: "Turn added work into a clear request with cost, timing, assumptions, and an approval decision.",
    href: "/guides/client-change-request-template",
    icon: FileCheck2,
    label: "Client approval",
    title: "Change request template",
  },
] as const;

export default function DashboardToolsPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <header>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Freelancer toolkit
        </p>
        <h1 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Plan the work before you protect it.
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Use ScopeYes tools to price sustainably, define the original scope, and turn later additions into approved changes.
        </p>
      </header>

      <section aria-label="Workspace tools" className="grid gap-4 sm:grid-cols-2">
        {tools.map(({ description, href, icon: Icon, label, title }) => (
          <Link
            className="group flex min-h-52 flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-[0_12px_35px_rgba(31,49,42,0.05)] outline-none transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_16px_40px_rgba(31,49,42,0.08)] focus-visible:ring-2 focus-visible:ring-ring"
            href={href}
            key={href}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </span>
            </div>
            <h2 className="mt-6 text-lg font-semibold tracking-[-0.02em] group-hover:text-primary">
              {title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              Open tool
              <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
