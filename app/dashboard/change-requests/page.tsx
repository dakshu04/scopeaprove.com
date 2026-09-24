import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FilePenLine,
  Plus,
  Search,
  Send,
  UserRound,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { requireUser } from "@/lib/auth-session";
import { getChangeRequestWorkspace } from "@/lib/data/change-requests";
import { cn } from "@/lib/utils";
import type { ChangeRequestStatus } from "@/src/generated/prisma/enums";

const PAGE_SIZE = 10;
const VALID_STATUSES = new Set<ChangeRequestStatus>([
  "DRAFT",
  "PENDING",
  "APPROVED",
  "DECLINED",
  "EXPIRED",
]);

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatAmount(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}

function getStatusPresentation(status: ChangeRequestStatus) {
  switch (status) {
    case "PENDING":
      return {
        label: "Pending",
        dot: "bg-amber-500",
        className: "border-amber-200 bg-amber-50 text-amber-800",
      };
    case "APPROVED":
      return {
        label: "Approved",
        dot: "bg-emerald-500",
        className: "border-emerald-200 bg-emerald-50 text-emerald-800",
      };
    case "DECLINED":
      return {
        label: "Changes requested",
        dot: "bg-orange-500",
        className: "border-orange-200 bg-orange-50 text-orange-800",
      };
    case "EXPIRED":
      return {
        label: "Expired",
        dot: "bg-slate-400",
        className: "border-border bg-muted text-muted-foreground",
      };
    default:
      return {
        label: "Draft",
        dot: "bg-primary/55",
        className: "border-primary/15 bg-secondary text-primary",
      };
  }
}

function workspaceHref({
  page,
  query,
  request,
  status,
}: {
  page?: number;
  query?: string;
  request?: string;
  status?: string;
}) {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (status) params.set("status", status);
  if (page && page > 1) params.set("page", String(page));
  if (request) params.set("request", request);

  const search = params.toString();
  return `/dashboard/change-requests${search ? `?${search}` : ""}`;
}

export default async function ChangeRequestsPage({
  searchParams,
}: PageProps<"/dashboard/change-requests">) {
  const user = await requireUser();
  const params = await searchParams;
  const query = firstValue(params.q)?.trim().slice(0, 120) ?? "";
  const requestedStatus = firstValue(params.status);
  const status =
    requestedStatus &&
    VALID_STATUSES.has(requestedStatus as ChangeRequestStatus)
      ? (requestedStatus as ChangeRequestStatus)
      : undefined;
  const selectedId = firstValue(params.request);
  const parsedPage = Number.parseInt(firstValue(params.page) ?? "1", 10);

  const workspace = await getChangeRequestWorkspace(user.id, {
    page: Number.isFinite(parsedPage) ? parsedPage : 1,
    pageSize: PAGE_SIZE,
    query: query || undefined,
    selectedId,
    status,
  });

  const selected = workspace.selected;
  const selectedStatus = selected
    ? getStatusPresentation(selected.status)
    : null;
  const hasExplicitSelection = Boolean(
    selectedId && workspace.requests.some((request) => request.id === selectedId),
  );

  return (
    <div
      data-fixed-workspace
      className="flex h-full min-h-0 flex-col overflow-hidden"
    >
      <header
        className={cn(
          "shrink-0 items-end justify-between gap-5 pb-4 xl:flex",
          hasExplicitSelection ? "hidden" : "flex",
        )}
      >
        <div className="min-w-0">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Approval workspace
          </p>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">
            Change Requests
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review scope, pricing, timelines, and every client decision.
          </p>
        </div>

        <Link
          href="/dashboard/projects"
          className={buttonVariants({ className: "shrink-0" })}
        >
          <Plus aria-hidden="true" />
          <span className="hidden sm:inline">New Change Request</span>
          <span className="sm:hidden">New</span>
        </Link>
      </header>

      <section className="grid min-h-0 flex-1 overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_12px_32px_rgba(31,49,42,0.06)] xl:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)]">
        <div
          className={cn(
            "min-h-0 flex-col overflow-hidden border-border/80 xl:flex xl:border-r",
            hasExplicitSelection ? "hidden" : "flex",
          )}
        >
          <form
            action="/dashboard/change-requests"
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_9.5rem_auto] gap-2 border-b border-border/80 bg-[#fbfcfb] p-3"
          >
            <label className="relative min-w-0">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                name="q"
                defaultValue={query}
                placeholder="Search requests or projects"
                className="h-9 w-full rounded-md border border-input bg-white pl-9 pr-3 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/15"
              />
            </label>

            <label>
              <span className="sr-only">Filter by status</span>
              <select
                name="status"
                defaultValue={status ?? ""}
                className="h-9 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] focus:border-ring focus:ring-3 focus:ring-ring/15"
              >
                <option value="">All statuses</option>
                <option value="DRAFT">Draft</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="DECLINED">Changes requested</option>
                <option value="EXPIRED">Expired</option>
              </select>
            </label>

            <button
              type="submit"
              className={buttonVariants({ variant: "outline" })}
            >
              Apply
            </button>
          </form>

          {workspace.requests.length === 0 ? (
            <div className="grid min-h-0 flex-1 place-items-center p-6 text-center">
              <div>
                <span className="mx-auto grid size-10 place-items-center rounded-lg bg-secondary text-primary">
                  <FilePenLine className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-sm font-semibold">
                  No matching change requests
                </h2>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                  Adjust the search or status filter, or create a request from a
                  client project.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_7.5rem] items-center gap-3 border-b border-border/80 bg-muted/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground md:grid-cols-[minmax(0,1.35fr)_minmax(6rem,0.8fr)_7.5rem_5.5rem] lg:grid-cols-[minmax(0,1.35fr)_minmax(6rem,0.8fr)_7.5rem_7rem_5.5rem]">
                <span>Request</span>
                <span className="hidden md:block">Project</span>
                <span>Status</span>
                <span className="hidden lg:block">Requested by</span>
                <span className="hidden text-right md:block">Date</span>
              </div>

              <div className="min-h-0 flex-1">
                {workspace.requests.map((request) => {
                  const presentation = getStatusPresentation(request.status);
                  const isSelected = selected?.id === request.id;

                  return (
                    <Link
                      key={request.id}
                      href={workspaceHref({
                        page: workspace.page,
                        query,
                        request: request.id,
                        status,
                      })}
                      aria-current={isSelected ? "true" : undefined}
                      className={cn(
                        "grid min-h-11 grid-cols-[minmax(0,1fr)_7.5rem] items-center gap-3 border-b border-border/70 px-4 py-2 text-sm outline-none transition-colors last:border-b-0 hover:bg-secondary/45 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:grid-cols-[minmax(0,1.35fr)_minmax(6rem,0.8fr)_7.5rem_5.5rem] lg:grid-cols-[minmax(0,1.35fr)_minmax(6rem,0.8fr)_7.5rem_7rem_5.5rem]",
                        isSelected &&
                          "bg-secondary/70 shadow-[inset_3px_0_0_var(--primary)]",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium">
                          {request.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                          {formatAmount(request.amountCents, request.currency)}
                        </span>
                      </span>
                      <span className="hidden truncate text-xs md:block">
                        {request.project.name}
                      </span>
                      <span
                        className={cn(
                          "inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium",
                          presentation.className,
                        )}
                      >
                        <span
                          className={cn("size-1.5 shrink-0 rounded-full", presentation.dot)}
                        />
                        <span className="truncate">{presentation.label}</span>
                      </span>
                      <span className="hidden truncate text-xs text-muted-foreground lg:block">
                        {request.approval?.clientName ||
                          request.project.clientName ||
                          "Not provided"}
                      </span>
                      <time
                        dateTime={request.createdAt.toISOString()}
                        className="hidden text-right text-xs text-muted-foreground md:block"
                      >
                        {dateFormatter.format(request.createdAt)}
                      </time>
                    </Link>
                  );
                })}
              </div>

              <footer className="flex h-11 shrink-0 items-center justify-between border-t border-border/80 bg-[#fbfcfb] px-3">
                <p className="text-xs text-muted-foreground">
                  {workspace.total === 0
                    ? "0 requests"
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
                    href={workspaceHref({
                      page: workspace.page - 1,
                      query,
                      status,
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
                    href={workspaceHref({
                      page: workspace.page + 1,
                      query,
                      status,
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
        </div>

        <aside
          className={cn(
            "min-h-0 flex-col overflow-hidden bg-[#fcfdfc] xl:flex",
            hasExplicitSelection ? "flex" : "hidden",
          )}
        >
          {selected && selectedStatus ? (
            <>
              <div className="shrink-0 border-b border-border/80 px-5 py-4">
                <Link
                  href={workspaceHref({
                    page: workspace.page,
                    query,
                    status,
                  })}
                  className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground xl:hidden"
                >
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  Back to requests
                </Link>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {selected.project.name}
                    </p>
                    <h2 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-6 tracking-[-0.02em]">
                      {selected.title}
                    </h2>
                  </div>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
                      selectedStatus.className,
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full", selectedStatus.dot)} />
                    {selectedStatus.label}
                  </span>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-4 p-5">
                <section>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Description
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm leading-5 text-foreground/80 sm:line-clamp-4">
                    {selected.description}
                  </p>
                </section>

                <section className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-border/80 bg-white p-3">
                    <CircleDollarSign className="size-4 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-[10px] text-muted-foreground">Cost impact</p>
                    <p className="mt-0.5 truncate text-xs font-semibold">
                      {formatAmount(selected.amountCents, selected.currency)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/80 bg-white p-3">
                    <Clock3 className="size-4 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-[10px] text-muted-foreground">Timeline</p>
                    <p className="mt-0.5 truncate text-xs font-semibold">
                      {selected.additionalDays === null
                        ? "No change"
                        : `+${selected.additionalDays} days`}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/80 bg-white p-3">
                    <CalendarClock className="size-4 text-primary" aria-hidden="true" />
                    <p className="mt-2 text-[10px] text-muted-foreground">Delivery</p>
                    <p className="mt-0.5 truncate text-xs font-semibold">
                      {selected.newDeliveryDate
                        ? dateFormatter.format(selected.newDeliveryDate)
                        : "Unchanged"}
                    </p>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-4 border-y border-border/80 py-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      <UserRound className="size-3.5" aria-hidden="true" />
                      Client
                    </p>
                    <p className="mt-1.5 truncate text-xs font-medium">
                      {selected.approval?.clientName ||
                        selected.project.clientName ||
                        "Not provided"}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      {selected.approval?.clientEmail ||
                        selected.project.clientEmail ||
                        "No email provided"}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      <Send className="size-3.5" aria-hidden="true" />
                      Approval
                    </p>
                    <p className="mt-1.5 truncate text-xs font-medium">
                      {selected.approval
                        ? selectedStatus.label
                        : selected.status === "DRAFT"
                          ? "Not sent yet"
                          : "Awaiting response"}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                      {selected.approval
                        ? dateFormatter.format(selected.approval.decidedAt)
                        : selected.sentAt
                          ? `Sent ${dateFormatter.format(selected.sentAt)}`
                          : "Create an approval link"}
                    </p>
                  </div>
                </section>

                {selected.approval?.declineReason && (
                  <section className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-orange-800">
                      Requested changes
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-orange-900">
                      {selected.approval.declineReason}
                    </p>
                  </section>
                )}

                <section className="hidden sm:block">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    Activity
                  </p>
                  <div className="mt-2 space-y-2">
                    {selected.approval && (
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className="size-2 rounded-full bg-primary" />
                        <span className="min-w-0 flex-1 truncate">
                          {selected.approval.clientName} recorded a decision
                        </span>
                        <time className="shrink-0 text-[10px] text-muted-foreground">
                          {dateFormatter.format(selected.approval.decidedAt)}
                        </time>
                      </div>
                    )}
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="size-2 rounded-full bg-border" />
                      <span className="min-w-0 flex-1 truncate">
                        Change request created
                      </span>
                      <time className="shrink-0 text-[10px] text-muted-foreground">
                        {dateFormatter.format(selected.createdAt)}
                      </time>
                    </div>
                  </div>
                </section>

                <div className="mt-auto flex shrink-0 items-center justify-end gap-2 border-t border-border/80 pt-4">
                  <Link
                    href={`/dashboard/projects/${selected.project.id}`}
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    View project
                  </Link>
                  <Link
                    href={`/dashboard/change-requests/${selected.id}`}
                    className={buttonVariants({ size: "sm" })}
                  >
                    {selected.status === "DRAFT" || selected.status === "PENDING"
                      ? "Manage approval"
                      : "Open full record"}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="grid h-full place-items-center p-6 text-center">
              <div>
                <span className="mx-auto grid size-10 place-items-center rounded-lg bg-secondary text-primary">
                  <FilePenLine className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-sm font-semibold">
                  Select a change request
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Request details and approval activity will appear here.
                </p>
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
