"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { createProjectSchema } from "@/lib/validations/project";

export type CreateProjectState = {
  errors?: {
    name?: string[];
    clientName?: string[];
    clientEmail?: string[];
    description?: string[];
    scopeItems?: string[];
  };
  message?: string;
};

export async function createProject(
  _previousState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  const user = await requireUser();

  const validatedFields = createProjectSchema.safeParse({
    name: formData.get("name"),
    clientName: formData.get("clientName"),
    clientEmail: formData.get("clientEmail"),
    description: formData.get("description"),
    scopeItems: formData.getAll("scopeItems"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Review the highlighted fields and try again.",
    };
  }

  const {
    name,
    clientName,
    clientEmail,
    description,
    scopeItems,
  } = validatedFields.data;

  let project: { id: string };

  try {
    project = await prisma.project.create({
      data: {
        userId: user.id,
        name,
        clientName,
        clientEmail,
        description,
        scopeItems: {
          create: scopeItems.map((title, position) => ({
            title,
            position,
          })),
        },
      },
      select: {
        id: true,
      },
    });
  } catch {
    return {
      message: "The project could not be created. Please try again.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");

  redirect(`/dashboard/projects?created=${project.id}`);
}
