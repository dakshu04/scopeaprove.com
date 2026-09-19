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
    <div className="space-y-8">
      <header className="space-y-6">
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to dashboard
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          <section className="border border-border">
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
            <section className="border border-border px-5 py-4">
              <h2 className="text-sm font-semibold">
                Project description
              </h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <section className="border border-border">
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

          <section className="border border-border px-4 py-4">
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