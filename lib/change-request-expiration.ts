import "server-only";

import { prisma } from "@/lib/prisma";

export async function synchronizeExpiredChangeRequests(userId: string) {
  return prisma.changeRequest.updateMany({
    where: {
      status: "PENDING",
      expiresAt: {
        lte: new Date(),
      },
      project: {
        userId,
      },
    },
    data: {
      status: "EXPIRED",
    },
  });
}
