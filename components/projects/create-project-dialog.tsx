"use client";

import { Plus } from "lucide-react";

import { CreateProjectForm } from "@/components/projects/create-project-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateProjectDialog({
  compactTrigger = false,
}: {
  compactTrigger?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button size={compactTrigger ? "sm" : "default"} />}
      >
        <Plus aria-hidden="true" />
        New project
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
        <DialogHeader>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
            Project setup
          </p>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Define the client, outcome, and agreed scope in one place.
          </DialogDescription>
        </DialogHeader>

        <CreateProjectForm variant="dialog" />
      </DialogContent>
    </Dialog>
  );
}
