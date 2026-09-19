import "server-only"

import { prisma } from "@/lib/prisma"

export async function getProjects(userId: string) {
    return prisma.project.findMany({
        where: {
            userId
        },
        orderBy: {
            updatedAt: "desc"
        },
        select: {
            id: true,
            name: true,
            description: true,
            clientName: true,
            clientEmail: true,
            updatedAt: true,
            _count: {
                select: {
                    scopeItems: true,
                    changeRequests: true
                }
            }
        }
    })
}