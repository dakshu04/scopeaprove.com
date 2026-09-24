import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FolderKanban,
  MessageSquareWarning,
} from "lucide-react";

import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { buttonVariants } from "@/components/ui/button";
import { requireUser } from "@/lib/auth-session";
import { getDashboardData } from "@/lib/data/dashboard";

export default async function DashboardPage() {
  const user = await requireUser();
  const { stats, recentProjects } = await getDashboardData(user.id);
  const firstName = user.name.trim().split(/\\s+/)[0] || "there";
  const hour = Number(
    new Intl.DateTimeFormat("en", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: "Asia/Calcutta",
    }).format(new Date()),
  );
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const overview = [
    {
      label: "Projects",
      value: stats.projects,
      description: "Total client projects",
      icon: FolderKanban,
    },
    {
      label: "Pending approvals",
      value: stats.pending,
      description: "Awaiting client response",
      icon: Clock3,
    },
    {
      label: "Approved",
      value: stats.approved,
      description: "Accepted change requests",
      icon: CheckCircle2,
    },
    {
      label: "Pending changes",
      value: stats.declined,
      description: "Needs your attention",
      icon: MessageSquareWarning,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Overview
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.035em]">
            {greeting}, {firstName}.
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your projects.
          </p>
        </div>

        <CreateProjectDialog />
      </section>

      <section
        className="grid gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/70 shadow-[0_12px_35px_rgba(31,49,42,0.06)] sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Project overview"
      >
        {overview.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group bg-card p-5 transition-colors hover:bg-[#fbfdfc]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <span className="grid size-8 place-items-center rounded-lg bg-secondary text-primary transition-transform group-hover:-translate-y-0.5">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold tracking-[-0.01em]">
              Recent projects
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage client projects and their approved scope.
            </p>
          </div>

          <Link
            href="/dashboard/projects"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            View all
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary/20 bg-card px-6 py-12 text-center shadow-sm">
            <span className="mx-auto grid size-10 place-items-center rounded-xl bg-secondary text-primary">
              <FolderKanban className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-semibold">No projects yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Create your first project to define the agreed scope and manage
              future client changes.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/80 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_12px_35px_rgba(31,49,42,0.05)]">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="group grid gap-3 px-5 py-4 transition-colors hover:bg-secondary/45 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center sm:gap-6"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold transition-colors group-hover:text-primary">
                    {project.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {project.clientName ?? "No client specified"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {project._count.scopeItems} scope items
                </p>
                <p className="text-xs text-muted-foreground">
                  {project._count.changeRequests} changes
                </p>
                <p className="text-xs text-muted-foreground">
                  {project.updatedAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
