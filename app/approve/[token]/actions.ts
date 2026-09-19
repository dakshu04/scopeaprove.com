"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { hashPublicToken } from "@/lib/public-token";
import { approvalDecisionSchema } from "@/lib/validations/approval";

export type ApprovalDecisionState = {
  errors?: {
    decision?: string[];
    clientName?: string[];
    clientEmail?: string[];
    declineReason?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function recordApprovalDecision(
  token: string,
  _previousState: ApprovalDecisionState,
  formData: FormData,
): Promise<ApprovalDecisionState> {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) {
    return {
      message: "This approval link is invalid.",
    };
  }

  const validatedFields = approvalDecisionSchema.safeParse({
    decision: formData.get("decision"),
    clientName: formData.get("clientName"),
    clientEmail: formData.get("clientEmail"),
    declineReason: formData.get("declineReason") ?? "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Review the highlighted fields and try again.",
    };
  }

  const {
    decision,
    clientName,
    clientEmail,
    declineReason,
  } = validatedFields.data;

  const publicTokenHash = hashPublicToken(token);
  const requestHeaders = await headers();
  const userAgent =
    requestHeaders.get("user-agent")?.slice(0, 512) ?? null;
  const now = new Date();

  try {
    const result = await prisma.$transaction(async (transaction) => {
      const changeRequest =
        await transaction.changeRequest.findUnique({
          where: {
            publicTokenHash,
          },
          select: {
            id: true,
            status: true,
            expiresAt: true,
            approval: {
              select: {
                id: true,
              },
            },
          },
        });

      if (!changeRequest) {
        return { outcome: "INVALID" } as const;
      }

      if (
        changeRequest.status !== "PENDING" ||
        changeRequest.approval
      ) {
        return { outcome: "CLOSED" } as const;
      }

      if (
        changeRequest.expiresAt &&
        changeRequest.expiresAt <= now
      ) {
        await transaction.changeRequest.updateMany({
          where: {
            id: changeRequest.id,
            status: "PENDING",
          },
          data: {
            status: "EXPIRED",
          },
        });

        return { outcome: "EXPIRED" } as const;
      }

      const updateResult =
        await transaction.changeRequest.updateMany({
          where: {
            id: changeRequest.id,
            status: "PENDING",
          },
          data: {
            status: decision,
          },
        });

      if (updateResult.count !== 1) {
        return { outcome: "CLOSED" } as const;
      }

      await transaction.approval.create({
        data: {
          changeRequestId: changeRequest.id,
          decision,
          clientName,
          clientEmail,
          declineReason:
            decision === "DECLINED"
              ? declineReason
              : null,
          userAgent,
        },
      });

      return { outcome: "SUCCESS" } as const;
    });

    if (result.outcome === "INVALID") {
      return {
        message: "This approval link is invalid.",
      };
    }

    if (result.outcome === "EXPIRED") {
      revalidatePath(`/approve/${token}`);

      return {
        message:
          "This approval link has expired. Contact the project owner for a new link.",
      };
    }

    if (result.outcome === "CLOSED") {
      return {
        message:
          "A decision has already been recorded for this request.",
      };
    }
  } catch {
    return {
      message:
        "Your decision could not be recorded. Please try again.",
    };
  }

  revalidatePath(`/approve/${token}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/change-requests");

  return {
    success: true,
    message: "Your decision has been recorded successfully.",
  };
}