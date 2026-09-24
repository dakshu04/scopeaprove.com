import Link from "next/link";
import { notFound } from "next/navigation";

import { CreateChangeRequestForm } from "@/components/change-requests/create-change-request-form";
import { requireUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";

type NewChangeRequestPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function NewChangeRequestPage({
  params,
}: NewChangeRequestPageProps) {
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
      clientName: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <Link
          href={`/dashboard/projects/${project.id}`}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to project
        </Link>

        <p className="mt-6 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {project.name}
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em]">
          New change request
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Define additional work, pricing, and any effect on the
          delivery schedule.
        </p>
      </header>

      <div className="rounded-xl border border-primary/10 bg-secondary/70 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Client
        </p>
        <p className="mt-1 text-sm font-medium">
          {project.clientName || "No client name provided"}
        </p>
      </div>

      <CreateChangeRequestForm projectId={project.id} />
    </div>
  );
}
