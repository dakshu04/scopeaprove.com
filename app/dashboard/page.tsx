import { SignOutButton } from "@/components/auth/sign-out-button";
import { requireUser } from "@/lib/auth-session";
import { getDashboardData } from "@/lib/data/dashboard";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function DashboardPage() {
    const user = await requireUser()
    const { stats, recentProjects } = await getDashboardData(user.id)
    const firstName = user.name.trim().split(/\s+/)[0] || "there"

    const overView = [
        {
            label: "Projects",
            value: stats.projects,
            description: "Total client projects",
        },
        {
            label: "Pending",
            value: stats.pending,
            description: "Awaiting client response"
        },
        {
            label: "Approved",
            value: stats.approved,
            description: "Accepted change requests",
        },
        {
            label: "Declined",
            value: stats.declined,
            description: "Declined change requests",
        },
    ]

    return (
        <div className="space-y-8">
        <section>
            <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, {firstName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your projects.
            </p>
        </section>

        <section
            className="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Project overview"
        >
            {overView.map((item) => (
            <div key={item.label} className="bg-background p-5">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                {item.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                {item.description}
                </p>
            </div>
            ))}
        </section>
        <section className="space-y-4">
  <div className="flex items-end justify-between gap-4">
    <div>
      <h2 className="text-base font-semibold">Your projects</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage client projects and their approved scope.
      </p>
    </div>

    <Link
      href="/dashboard/projects/new"
      className={buttonVariants({ size: "sm" })}
    >
      New project
    </Link>
  </div>

  {recentProjects.length === 0 ? (
    <div className="border border-dashed border-border px-6 py-12 text-center">
      <p className="text-sm font-medium">No projects yet</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Create your first project to define the agreed scope and manage future
        client changes.
      </p>
    </div>
  ) : (
    <div className="divide-y divide-border border border-border">
      {recentProjects.map((project) => (
        <Link
          key={project.id}
          href={`/dashboard/projects/${project.id}`}
          className="grid gap-3 px-4 py-4 transition-colors hover:bg-muted/50 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center sm:gap-6"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{project.name}</p>
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