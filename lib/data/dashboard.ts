import { prisma } from "@/lib/prisma";

type DashboardDataInput = {
  page: number;
  pageSize: number;
};

export async function getDashboardData(
  userId: string,
  input: DashboardDataInput,
) {
  const [projects, pending, approved, declined] = await Promise.all([
    prisma.project.count({
      where: {
        userId,
      },
    }),
    prisma.changeRequest.count({
      where: {
        status: "PENDING",
        project: {
          userId,
        },
      },
    }),
    prisma.changeRequest.count({
      where: {
        status: "APPROVED",
        project: {
          userId,
        },
      },
    }),
    prisma.changeRequest.count({
      where: {
        status: "DECLINED",
        project: {
          userId,
        },
      },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(projects / input.pageSize));
  const page = Math.min(Math.max(1, input.page), totalPages);

  const recentProjects = await prisma.project.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: (page - 1) * input.pageSize,
    take: input.pageSize,
    select: {
      id: true,
      name: true,
      clientName: true,
      updatedAt: true,
      changeRequests: {
        where: {
          status: "PENDING",
        },
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          scopeItems: true,
          changeRequests: true,
        },
      },
    },
  });

  return {
    stats: {
      projects,
      pending,
      approved,
      declined,
    },
    recentProjects: {
      items: recentProjects,
      page,
      total: projects,
      totalPages,
    },
  };
}
