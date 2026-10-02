import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FolderKanban,
  MessageSquareWarning,
} from "lucide-react";

import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { buttonVariants } from "@/components/ui/button";
import { requireUser } from "@/lib/auth-session";
import { getDashboardData } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function dashboardHref(page: number) {
  return page > 1 ? "/dashboard?page=" + page : "/dashboard";
}

export default async function DashboardPage({
  searchParams,
}: PageProps<"/dashboard">) {
  const user = await requireUser();
  const params = await searchParams;
  const parsedPage = Number.parseInt(firstValue(params.page) ?? "1", 10);
  const { stats, recentProjects } = await getDashboardData(user.id, {
    page: Number.isFinite(parsedPage) ? parsedPage : 1,
    pageSize: PAGE_SIZE,
  });
  const firstName = user.name.trim().split(/\s+/)[0] || "there";
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
      iconClassName: "bg-secondary text-primary",
      accentClassName: "bg-primary",
    },
    {
      label: "Pending approvals",
      value: stats.pending,
      description: "Awaiting client response",
      icon: Clock3,
      iconClassName: "bg-amber-50 text-amber-700",
      accentClassName: "bg-amber-500",
    },
    {
      label: "Approved",
      value: stats.approved,
      description: "Accepted requests",
      icon: CheckCircle2,
      iconClassName: "bg-emerald-50 text-emerald-700",
      accentClassName: "bg-emerald-500",
    },
    {
      label: "Needs changes",
      value: stats.declined,
      description: "Requires your attention",
      icon: MessageSquareWarning,
      iconClassName: "bg-rose-50 text-rose-700",
      accentClassName: "bg-rose-500",
    },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <header className="flex shrink-0 items-end justify-between gap-4 pb-4">
        <div className="min-w-0">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-primary">
            Workspace overview
          </p>
          <h1 className="truncate text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            {greeting}, {firstName}.
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Your projects and approval activity, at a glance.
          </p>
        </div>

        <CreateProjectDialog />
      </header>

      <section
        className="grid shrink-0 grid-cols-2 gap-2.5 lg:grid-cols-4"
        aria-label="Project overview"
      >
        {overview.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-xl border border-border/80 bg-card p-3.5 shadow-[0_8px_25px_rgba(31,49,42,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-[0_12px_30px_rgba(31,49,42,0.07)] sm:p-4"
            >
              <span
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 opacity-70",
                  item.accentClassName,
                )}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-muted-foreground sm:text-xs">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                    {item.value}
                  </p>
                </div>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg transition-transform group-hover:-translate-y-0.5",
                    item.iconClassName,
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-1 hidden truncate text-[10px] text-muted-foreground sm:block">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_16px_45px_rgba(31,49,42,0.065)]">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border/80 bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfb_100%)] px-4 py-3.5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-secondary text-primary">
                <FolderKanban className="size-3.5" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold tracking-[-0.01em]">
                Recent projects
              </h2>
            </div>
            <p className="mt-1 hidden text-[11px] text-muted-foreground sm:block">
              Ordered by the projects you updated most recently.
            </p>
          </div>

          <Link
            href="/dashboard/projects"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "shrink-0 bg-white",
            })}
          >
            View workspace
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        {recentProjects.items.length === 0 ? (
          <div className="grid min-h-0 flex-1 place-items-center px-6 text-center">
            <div>
              <span className="mx-auto grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                <FolderKanban className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm font-semibold">No projects yet</p>
              <p className="mx-auto mt-1.5 max-w-md text-xs leading-5 text-muted-foreground">
                Create your first project to define the agreed scope and manage
                future client changes.
              </p>
              <div className="mt-4">
                <CreateProjectDialog compactTrigger />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_6.5rem] items-center gap-3 border-b border-border/80 bg-muted/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground sm:grid-cols-[minmax(0,1.25fr)_minmax(7rem,0.75fr)_5rem_6rem_6.5rem_1.25rem]">
              <span>Project</span>
              <span className="hidden sm:block">Client</span>
              <span className="hidden sm:block">Scope</span>
              <span className="hidden sm:block">Approval</span>
              <span>Updated</span>
              <span className="hidden sm:block" />
            </div>

            <div className="dashboard-scroll min-h-0 flex-1 overflow-y-auto">
              {recentProjects.items.map((project) => {
                const pendingCount = project.changeRequests.length;

                return (
                  <Link
                    key={project.id}
                    href={"/dashboard/projects/" + project.id}
                    className="group grid min-h-14 grid-cols-[minmax(0,1fr)_6.5rem] items-center gap-3 border-b border-border/70 px-4 py-2.5 outline-none transition-colors last:border-b-0 hover:bg-secondary/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[minmax(0,1.25fr)_minmax(7rem,0.75fr)_5rem_6rem_6.5rem_1.25rem]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold transition-colors group-hover:text-primary">
                        {project.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-muted-foreground sm:hidden">
                        {project.clientName ?? "No client specified"}
                      </span>
                    </span>
                    <span className="hidden truncate text-xs text-muted-foreground sm:block">
                      {project.clientName ?? "Not provided"}
                    </span>
                    <span className="hidden text-xs text-muted-foreground sm:block">
                      {project._count.scopeItems}
                    </span>
                    <span className="hidden sm:block">
                      <span
                        className={cn(
                          "inline-flex w-fit rounded-full border px-2 py-0.5 text-[9px] font-semibold",
                          pendingCount > 0
                            ? "border-amber-200 bg-amber-50 text-amber-800"
                            : "border-emerald-200 bg-emerald-50 text-emerald-800",
                        )}
                      >
                        {pendingCount > 0
                          ? pendingCount + " pending"
                          : "Clear"}
                      </span>
                    </span>
                    <time
                      dateTime={project.updatedAt.toISOString()}
                      className="text-right text-[10px] text-muted-foreground sm:text-left sm:text-xs"
                    >
                      {dateFormatter.format(project.updatedAt)}
                    </time>
                    <ArrowUpRight
                      className="hidden size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            <footer className="flex h-11 shrink-0 items-center justify-between gap-3 border-t border-border/80 bg-[#fbfcfb] px-3">
              <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
                {(recentProjects.page - 1) * PAGE_SIZE + 1}–
                {Math.min(
                  recentProjects.page * PAGE_SIZE,
                  recentProjects.total,
                )}{" "}
                of {recentProjects.total}
              </p>

              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  Page {recentProjects.page} of {recentProjects.totalPages}
                </span>
                <Link
                  href={dashboardHref(recentProjects.page - 1)}
                  aria-disabled={recentProjects.page <= 1}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon-sm",
                    className:
                      recentProjects.page <= 1
                        ? "pointer-events-none opacity-40"
                        : "bg-white",
                  })}
                >
                  <ChevronLeft aria-hidden="true" />
                  <span className="sr-only">Previous page</span>
                </Link>
                <Link
                  href={dashboardHref(recentProjects.page + 1)}
                  aria-disabled={
                    recentProjects.page >= recentProjects.totalPages
                  }
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon-sm",
                    className:
                      recentProjects.page >= recentProjects.totalPages
                        ? "pointer-events-none opacity-40"
                        : "bg-white",
                  })}
                >
                  <ChevronRight aria-hidden="true" />
                  <span className="sr-only">Next page</span>
                </Link>
              </div>
            </footer>
          </>
        )}
      </section>
    </div>
  );
}
