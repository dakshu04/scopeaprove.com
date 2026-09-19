"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import {
  generatePublicToken,
  hashPublicToken,
} from "@/lib/public-token";

export type PublishChangeRequestState = {
  approvalPath?: string;
  message?: string;
  error?: string;
};

export async function publishChangeRequest(
  changeRequestId: string,
  _previousState: PublishChangeRequestState,
): Promise<PublishChangeRequestState> {
  const user = await requireUser();

  const token = generatePublicToken();
  const publicTokenHash = hashPublicToken(token);

  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + 14 * 24 * 60 * 60 * 1000,
  );

  try {
    const result = await prisma.changeRequest.updateMany({
      where: {
        id: changeRequestId,
        status: {
          in: ["DRAFT", "PENDING"],
        },
        project: {
          userId: user.id,
        },
      },
      data: {
        status: "PENDING",
        publicTokenHash,
        sentAt: now,
        expiresAt,
      },
    });

    if (result.count !== 1) {
      return {
        error:
          "An approval link cannot be created for this request.",
      };
    }
  } catch {
    return {
      error:
        "The approval link could not be created. Please try again.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/change-requests");
  revalidatePath(
    `/dashboard/change-requests/${changeRequestId}`,
  );

  return {
    approvalPath: `/approve/${token}`,
    message:
      "The request is ready. Copy the approval link and send it to your client.",
  };
}