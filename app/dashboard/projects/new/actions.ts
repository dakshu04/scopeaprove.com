"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  FREE_PROJECT_LIMIT,
  getBillingEntitlements,
} from "@/lib/billing";
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

  let project: { id: string } | null;

  try {
    const entitlements = await getBillingEntitlements(user.id);

    project = await prisma.$transaction(
      async (transaction) => {
        if (!entitlements.isPro) {
          const projectCount = await transaction.project.count({
            where: {
              userId: user.id,
            },
          });

          if (projectCount >= FREE_PROJECT_LIMIT) {
            return null;
          }
        }

        return transaction.project.create({
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
      },
      {
        isolationLevel: "Serializable",
      },
    );
  } catch {
    return {
      message: "The project could not be created. Please try again.",
    };
  }

  if (!project) {
    return {
      message:
        "The Free plan includes 1 project. Upgrade to Pro for unlimited projects.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");

  redirect(`/dashboard/projects?created=${project.id}`);
}