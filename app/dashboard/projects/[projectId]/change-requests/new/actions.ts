"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  ACTIVE_CHANGE_REQUEST_STATUSES,
  FREE_ACTIVE_CHANGE_REQUEST_LIMIT,
  getBillingEntitlements,
} from "@/lib/billing";
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

  let changeRequest: { id: string } | null;

  try {
    const entitlements = await getBillingEntitlements(user.id);

    changeRequest = await prisma.$transaction(
      async (transaction) => {
        if (!entitlements.isPro) {
          const activeChangeRequestCount =
            await transaction.changeRequest.count({
              where: {
                project: {
                  userId: user.id,
                },
                status: {
                  in: [...ACTIVE_CHANGE_REQUEST_STATUSES],
                },
              },
            });

          if (
            activeChangeRequestCount >=
            FREE_ACTIVE_CHANGE_REQUEST_LIMIT
          ) {
            return null;
          }
        }

        return transaction.changeRequest.create({
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
      },
      {
        isolationLevel: "Serializable",
      },
    );
  } catch {
    return {
      message:
        "The change request could not be created. Please try again.",
    };
  }

  if (!changeRequest) {
    return {
      message:
        "The Free plan allows 3 active change requests. Complete an existing request or upgrade to Pro for unlimited requests.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/change-requests");
  revalidatePath(`/dashboard/projects/${project.id}`);

  redirect(`/dashboard/change-requests/${changeRequest.id}`);
}