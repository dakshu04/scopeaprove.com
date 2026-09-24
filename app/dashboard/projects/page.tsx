import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Search,
} from "lucide-react";

import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { buttonVariants } from "@/components/ui/button";
import { requireUser } from "@/lib/auth-session";
import { getProjectsWorkspace } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function projectsHref({
  attention,
  page,
  query,
  sort,
}: {
  attention?: string;
  page?: number;
  query?: string;
  sort?: string;
}) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (attention) params.set("attention", attention);
  if (sort && sort !== "updated") params.set("sort", sort);
  if (page && page > 1) params.set("page", String(page));
  const search = params.toString();
  return `/dashboard/projects${search ? `?${search}` : ""}`;
}

export default async function ProjectsPage({
  searchParams,
}: PageProps<"/dashboard/projects">) {
  const user = await requireUser();
  const params = await searchParams;
  const query = firstValue(params.q)?.trim().slice(0, 120) ?? "";
  const requestedSort = firstValue(params.sort);
  const sort =
    requestedSort === "name" || requestedSort === "newest"
      ? requestedSort
      : "updated";
  const attention =
    firstValue(params.attention) === "pending" ? "pending" : undefined;
  const parsedPage = Number.parseInt(firstValue(params.page) ?? "1", 10);
  const createdId = firstValue(params.created);

  const workspace = await getProjectsWorkspace(user.id, {
    attention,
    page: Number.isFinite(parsedPage) ? parsedPage : 1,
    pageSize: PAGE_SIZE,
    query: query || undefined,
    sort,
  });
  const createdProject = createdId
    ? workspace.projects.find((project) => project.id === createdId)
    : undefined;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      {createdProject && (
        <div
          className="fixed right-5 top-20 z-40 flex items-center gap-3 rounded-lg border border-emerald-200 bg-white px-4 py-3 shadow-lg"
          role="status"
        >
          <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold">Project created successfully.</p>
            <Link
              href={`/dashboard/projects/${createdProject.id}`}
              className="mt-0.5 block text-[11px] font-medium text-primary hover:underline"
            >
              Open {createdProject.name}
            </Link>
          </div>
        </div>
      )}

      <header className="flex shrink-0 items-end justify-between gap-5 pb-4">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Workspace
          </p>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage client work, original scope, and pending approvals.
          </p>
        </div>
        <CreateProjectDialog />
      </header>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_12px_32px_rgba(31,49,42,0.06)]">
        <form
          action="/dashboard/projects"
          className="grid shrink-0 grid-cols-[minmax(0,1fr)_9.5rem_9rem_auto] gap-2 border-b border-border/80 bg-[#fbfcfb] p-3"
        >
          <label className="relative min-w-0">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              name="q"
              defaultValue={query}
              placeholder="Search projects or clients"
              className="h-9 w-full rounded-md border border-input bg-white pl-9 pr-3 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/15"
            />
          </label>

          <label>
            <span className="sr-only">Filter projects</span>
            <select
              name="attention"
              defaultValue={attention ?? ""}
              className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/15"
            >
              <option value="">All projects</option>
              <option value="pending">Needs approval</option>
            </select>
          </label>

          <label>
            <span className="sr-only">Sort projects</span>
            <select
              name="sort"
              defaultValue={sort}
              className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/15"
            >
              <option value="updated">Recently updated</option>
              <option value="newest">Newest first</option>
              <option value="name">Project name</option>
            </select>
          </label>

          <button
            type="submit"
            className={buttonVariants({ variant: "outline" })}
          >
            Apply
          </button>
        </form>

        {workspace.projects.length === 0 ? (
          <div className="grid min-h-0 flex-1 place-items-center px-6 text-center">
            <div>
              <span className="mx-auto grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                <FolderKanban className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-sm font-semibold">
                {query || attention
                  ? "No matching projects"
                  : "No projects yet"}
              </h2>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                {query || attention
                  ? "Adjust your search or filter to see more projects."
                  : "Create your first project to start managing scope and approvals."}
              </p>
              {!query && !attention && (
                <div className="mt-5">
                  <CreateProjectDialog compactTrigger />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_7rem] items-center gap-3 border-b border-border/80 bg-muted/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground md:grid-cols-[minmax(0,1.3fr)_minmax(7rem,0.8fr)_5rem_6rem_6rem] lg:grid-cols-[minmax(0,1.3fr)_minmax(7rem,0.8fr)_5rem_6rem_6rem_6rem_2rem]">
              <span>Project</span>
              <span className="hidden md:block">Client</span>
              <span className="hidden md:block">Scope</span>
              <span>Pending</span>
              <span className="hidden md:block">Updated</span>
              <span className="hidden lg:block">Created</span>
              <span className="hidden lg:block" />
            </div>

            <div className="min-h-0 flex-1">
              {workspace.projects.map((project) => {
                const pendingCount = project.changeRequests.length;

                return (
                  <Link
                    key={project.id}
                    href={`/dashboard/projects/${project.id}`}
                    className="group grid min-h-13 grid-cols-[minmax(0,1fr)_7rem] items-center gap-3 border-b border-border/70 px-4 py-2.5 outline-none transition-colors last:border-b-0 hover:bg-secondary/45 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:grid-cols-[minmax(0,1.3fr)_minmax(7rem,0.8fr)_5rem_6rem_6rem] lg:grid-cols-[minmax(0,1.3fr)_minmax(7rem,0.8fr)_5rem_6rem_6rem_6rem_2rem]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold transition-colors group-hover:text-primary">
                        {project.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                        {project.description || "No description"}
                      </span>
                    </span>
                    <span className="hidden truncate text-xs md:block">
                      {project.clientName || "Not provided"}
                    </span>
                    <span className="hidden text-xs text-muted-foreground md:block">
                      {project._count.scopeItems}
                    </span>
                    <span
                      className={cn(
                        "inline-flex w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium",
                        pendingCount > 0
                          ? "border-amber-200 bg-amber-50 text-amber-800"
                          : "border-emerald-200 bg-emerald-50 text-emerald-800",
                      )}
                    >
                      {pendingCount > 0 ? `${pendingCount} pending` : "Clear"}
                    </span>
                    <time className="hidden text-xs text-muted-foreground md:block">
                      {dateFormatter.format(project.updatedAt)}
                    </time>
                    <time className="hidden text-xs text-muted-foreground lg:block">
                      {dateFormatter.format(project.createdAt)}
                    </time>
                    <ArrowUpRight
                      className="hidden size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary lg:block"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            <footer className="flex h-11 shrink-0 items-center justify-between border-t border-border/80 bg-[#fbfcfb] px-3">
              <p className="text-xs text-muted-foreground">
                {workspace.total === 0
                  ? "0 projects"
                  : `${(workspace.page - 1) * PAGE_SIZE + 1}–${Math.min(
                      workspace.page * PAGE_SIZE,
                      workspace.total,
                    )} of ${workspace.total}`}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Page {workspace.page} of {workspace.totalPages}
                </span>
                <Link
                  href={projectsHref({
                    attention,
                    page: workspace.page - 1,
                    query,
                    sort,
                  })}
                  aria-disabled={workspace.page <= 1}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon-sm",
                    className:
                      workspace.page <= 1
                        ? "pointer-events-none opacity-40"
                        : undefined,
                  })}
                >
                  <ChevronLeft aria-hidden="true" />
                  <span className="sr-only">Previous page</span>
                </Link>
                <Link
                  href={projectsHref({
                    attention,
                    page: workspace.page + 1,
                    query,
                    sort,
                  })}
                  aria-disabled={workspace.page >= workspace.totalPages}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon-sm",
                    className:
                      workspace.page >= workspace.totalPages
                        ? "pointer-events-none opacity-40"
                        : undefined,
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
