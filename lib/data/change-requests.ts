import "server-only";

import { prisma } from "@/lib/prisma";

export async function getChangeRequests(userId: string) {
  return prisma.changeRequest.findMany({
    where: {
      project: {
        userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      status: true,
      amountCents: true,
      currency: true,
      additionalDays: true,
      newDeliveryDate: true,
      createdAt: true,
      project: {
        select: {
          id: true,
          name: true,
          clientName: true,
        },
      },
    },
  });
}