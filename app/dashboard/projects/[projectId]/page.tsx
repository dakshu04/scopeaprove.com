import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { requireUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const user = await requireUser();
  const { projectId } = await params;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      clientName: true,
      clientEmail: true,
      updatedAt: true,
      scopeItems: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          position: true,
        },
      },
      changeRequests: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          approval: {
            select: {
              clientName: true,
              declineReason: true,
            },
          },
        },
      },
      _count: {
        select: {
          changeRequests: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const updatedOn = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(project.updatedAt);

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to dashboard
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.035em]">
              {project.name}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Updated {updatedOn}
            </p>
          </div>

          <Link
            href={`/dashboard/projects/${project.id}/change-requests/new`}
            className={buttonVariants()}
          >
            New change request
          </Link>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-5">
          <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold">
                Original project scope
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Work included in the initial agreement.
              </p>
            </div>

            <ol className="divide-y divide-border">
              {project.scopeItems.map((item, index) => (
                <li
                  key={item.id}
                  className="flex gap-4 px-5 py-4"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center border border-border text-xs text-muted-foreground">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>

                    {item.description && (
                      <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {project.description && (
            <section className="rounded-xl border border-border/80 bg-card px-5 py-4 shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
              <h2 className="text-sm font-semibold">
                Project description
              </h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
            </section>
          )}

          <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold">Change requests</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  All requests and client responses for this project.
                </p>
              </div>
              <Link
                href={`/dashboard/projects/${project.id}/change-requests/new`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                New request
              </Link>
            </div>

            {project.changeRequests.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                No change requests for this project yet.
              </p>
            ) : (
              <div className="divide-y divide-border">
                {project.changeRequests.map((request) => (
                  <Link
                    key={request.id}
                    href={`/dashboard/change-requests/${request.id}`}
                    className="block px-5 py-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-medium">{request.title}</h3>
                      <span className={request.status === "APPROVED"
                        ? "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800"
                        : request.status === "DECLINED"
                          ? "rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-800"
                          : request.status === "PENDING"
                            ? "rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800"
                            : "rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"}
                      >
                        {request.status === "DECLINED"
                          ? "Changes requested"
                          : request.status.charAt(0) + request.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                    {request.approval?.declineReason ? (
                      <p className="mt-2 line-clamp-2 text-sm text-orange-800">
                        Client note: {request.approval.declineReason}
                      </p>
                    ) : request.approval ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Approved by {request.approval.clientName}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Created {request.createdAt.toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_10px_30px_rgba(31,49,42,0.04)]">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold">
                Client
              </h2>
            </div>

            <dl className="space-y-4 px-4 py-4 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">
                  Name
                </dt>
                <dd className="mt-1">
                  {project.clientName || "Not provided"}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-1 break-all">
                  {project.clientEmail ? (
                    <a
                      href={`mailto:${project.clientEmail}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {project.clientEmail}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-primary/10 bg-gradient-to-br from-secondary to-card px-4 py-4 shadow-sm">
            <p className="text-xs text-muted-foreground">
              Change requests
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {project._count.changeRequests}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
