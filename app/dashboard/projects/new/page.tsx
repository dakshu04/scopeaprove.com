import Link from "next/link";

import { CreateProjectForm } from "@/components/projects/create-project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <header>
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to dashboard
        </Link>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Create project
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Define the client, project outcome, and original agreed scope.
        </p>
      </header>

      <CreateProjectForm />
    </div>
  );
}