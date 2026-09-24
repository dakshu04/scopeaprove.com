import "server-only";

import { prisma } from "@/lib/prisma";

type ProjectsWorkspaceInput = {
  attention?: "pending";
  page: number;
  pageSize: number;
  query?: string;
  sort: "name" | "newest" | "updated";
};

export async function getProjectsWorkspace(
  userId: string,
  input: ProjectsWorkspaceInput,
) {
  const where = {
    userId,
    ...(input.query
      ? {
          OR: [
            {
              name: {
                contains: input.query,
                mode: "insensitive" as const,
              },
            },
            {
              clientName: {
                contains: input.query,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
    ...(input.attention === "pending"
      ? {
          changeRequests: {
            some: { status: "PENDING" as const },
          },
        }
      : {}),
  };

  const total = await prisma.project.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / input.pageSize));
  const page = Math.min(Math.max(1, input.page), totalPages);

  const projects = await prisma.project.findMany({
    where,
    skip: (page - 1) * input.pageSize,
    take: input.pageSize,
    orderBy:
      input.sort === "name"
        ? { name: "asc" }
        : input.sort === "newest"
          ? { createdAt: "desc" }
          : { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      clientName: true,
      clientEmail: true,
      createdAt: true,
      updatedAt: true,
      changeRequests: {
        where: { status: "PENDING" },
        select: { id: true },
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
    page,
    projects,
    total,
    totalPages,
  };
}

export async function getProjects(userId: string) {
  return prisma.project.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      clientName: true,
      clientEmail: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          scopeItems: true,
          changeRequests: true,
        },
      },
    },
  });
}
