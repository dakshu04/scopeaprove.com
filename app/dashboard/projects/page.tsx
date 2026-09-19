import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getProjects } from "@/lib/data/projects";
import { requireUser } from "@/lib/auth-session";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export default async function ProjectsPage() {
  const user = await requireUser();
  const projects = await getProjects(user.id);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Projects
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage client projects, original scope, and change requests.
          </p>
        </div>

        <Link
          href="/dashboard/projects/new"
          className={buttonVariants()}
        >
          New project
        </Link>
      </header>

      {projects.length === 0 ? (
        <section className="border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-sm font-semibold">
            No projects yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Create your first project to define its original scope and
            manage future client changes.
          </p>

          <Link
            href="/dashboard/projects/new"
            className={buttonVariants({
              className: "mt-6",
            })}
          >
            Create project
          </Link>
        </section>
      ) : (
        <section className="border border-border">
          <div className="hidden grid-cols-[minmax(0,1fr)_12rem_10rem_8rem] border-b border-border px-5 py-3 text-xs font-medium text-muted-foreground md:grid">
            <span>Project</span>
            <span>Client</span>
            <span>Activity</span>
            <span className="text-right">Updated</span>
          </div>

          <div className="divide-y divide-border">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="grid gap-4 px-5 py-4 transition-colors hover:bg-muted/50 md:grid-cols-[minmax(0,1fr)_12rem_10rem_8rem] md:items-center"
              >
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-medium">
                    {project.name}
                  </h2>

                  {project.description && (
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground md:hidden">
                    Client
                  </p>
                  <p className="mt-1 truncate text-sm md:mt-0">
                    {project.clientName || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground md:hidden">
                    Activity
                  </p>
                  <p className="mt-1 text-sm md:mt-0">
                    {project._count.scopeItems} scope{" "}
                    <span aria-hidden="true">·</span>{" "}
                    {project._count.changeRequests} changes
                  </p>
                </div>

                <div className="md:text-right">
                  <p className="text-xs text-muted-foreground md:hidden">
                    Updated
                  </p>
                  <time
                    dateTime={project.updatedAt.toISOString()}
                    className="mt-1 block text-sm text-muted-foreground md:mt-0"
                  >
                    {dateFormatter.format(project.updatedAt)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}