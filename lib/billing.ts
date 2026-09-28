import "server-only";

import { prisma } from "@/lib/prisma";

export const FREE_PROJECT_LIMIT = 1;
export const FREE_ACTIVE_CHANGE_REQUEST_LIMIT = 3;

export const ACTIVE_CHANGE_REQUEST_STATUSES = [
  "DRAFT",
  "PENDING",
] as const;

export async function getBillingEntitlements(userId: string) {
  const proProductId = process.env.DODO_PAYMENTS_PRODUCT_ID;

  if (!proProductId) {
    throw new Error("Missing DODO_PAYMENTS_PRODUCT_ID.");
  }

  const subscription = await prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      dodoProductId: true,
      dodoCustomerId: true,
      dodoSubscriptionId: true,
      nextBillingDate: true,
      cancelledAt: true,
    },
  });

  const isPro =
    subscription?.status === "ACTIVE" &&
    subscription.dodoProductId === proProductId;

  return {
    plan: isPro ? ("PRO" as const) : ("FREE" as const),
    isPro,
    projectLimit: isPro ? null : FREE_PROJECT_LIMIT,
    activeChangeRequestLimit: isPro
      ? null
      : FREE_ACTIVE_CHANGE_REQUEST_LIMIT,
    subscription,
  };
}