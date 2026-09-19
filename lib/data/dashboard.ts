import { prisma } from "@/lib/prisma";

export async function getDashboardData(userId: string) {
    const [projects, pending, approved, declined, recentProjects] = await Promise.all([
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
    prisma.project.findMany({
        where: {
            userId,
        },
        orderBy: {
            updatedAt: "desc"
        },
        take: 5,
        select: {
            id: true,
            name: true,
            clientName: true,
            updatedAt: true,
            _count: {
                select: {
                    scopeItems: true,
                    changeRequests: true
                }
            }
        }
    })
    ]);

    return {
    stats: {
        projects,
        pending,
        approved,
        declined,
    },
    recentProjects
    };
}