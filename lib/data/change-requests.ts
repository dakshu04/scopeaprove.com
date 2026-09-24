import "server-only";

import { prisma } from "@/lib/prisma";
import type { ChangeRequestStatus } from "@/src/generated/prisma/enums";

type ChangeRequestWorkspaceInput = {
  page: number;
  pageSize: number;
  query?: string;
  selectedId?: string;
  status?: ChangeRequestStatus;
};

export async function getChangeRequestWorkspace(
  userId: string,
  input: ChangeRequestWorkspaceInput,
) {
  const where = {
    project: {
      userId,
    },
    ...(input.status ? { status: input.status } : {}),
    ...(input.query
      ? {
          OR: [
            {
              title: {
                contains: input.query,
                mode: "insensitive" as const,
              },
            },
            {
              project: {
                name: {
                  contains: input.query,
                  mode: "insensitive" as const,
                },
              },
            },
            {
              project: {
                clientName: {
                  contains: input.query,
                  mode: "insensitive" as const,
                },
              },
            },
          ],
        }
      : {}),
  };

  const total = await prisma.changeRequest.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / input.pageSize));
  const page = Math.min(Math.max(1, input.page), totalPages);

  const requests = await prisma.changeRequest.findMany({
    where,
    skip: (page - 1) * input.pageSize,
    take: input.pageSize,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      amountCents: true,
      currency: true,
      additionalDays: true,
      newDeliveryDate: true,
      createdAt: true,
      sentAt: true,
      approval: {
        select: {
          decision: true,
          clientName: true,
          clientEmail: true,
          declineReason: true,
          decidedAt: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
          clientName: true,
          clientEmail: true,
        },
      },
    },
  });

  const selected =
    requests.find((request) => request.id === input.selectedId) ??
    requests[0] ??
    null;

  return {
    page,
    requests,
    selected,
    total,
    totalPages,
  };
}

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
      approval: {
        select: {
          clientName: true,
          declineReason: true,
        },
      },
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
