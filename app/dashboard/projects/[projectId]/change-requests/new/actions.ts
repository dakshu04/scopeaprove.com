"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { createChangeRequestSchema } from "@/lib/validations/change-request";

export type CreateChangeRequestState = {
  errors?: {
    title?: string[];
    description?: string[];
    amount?: string[];
    currency?: string[];
    additionalDays?: string[];
    newDeliveryDate?: string[];
  };
  message?: string;
};

export async function createChangeRequest(
  projectId: string,
  _previousState: CreateChangeRequestState,
  formData: FormData,
): Promise<CreateChangeRequestState> {
  const user = await requireUser();

  const validatedFields = createChangeRequestSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    amount: formData.get("amount"),
    currency: formData.get("currency"),
    additionalDays: formData.get("additionalDays"),
    newDeliveryDate: formData.get("newDeliveryDate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Review the highlighted fields and try again.",
    };
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!project) {
    return {
      message: "The project could not be found.",
    };
  }

  const {
    title,
    description,
    amount,
    currency,
    additionalDays,
    newDeliveryDate,
  } = validatedFields.data;

  let changeRequest: { id: string };

  try {
    changeRequest = await prisma.changeRequest.create({
      data: {
        projectId: project.id,
        title,
        description,
        amountCents: amount,
        currency,
        additionalDays,
        newDeliveryDate,
      },
      select: {
        id: true,
      },
    });
  } catch {
    return {
      message:
        "The change request could not be created. Please try again.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/change-requests");
  revalidatePath(`/dashboard/projects/${project.id}`);

  redirect(
    `/dashboard/change-requests/${changeRequest.id}`,
  );
}