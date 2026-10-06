import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      subscription: {
        select: {
          status: true,
          dodoProductId: true,
          nextBillingDate: true,
          cancelledAt: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      projects: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          clientName: true,
          clientEmail: true,
          createdAt: true,
          updatedAt: true,
          scopeItems: {
            orderBy: { position: "asc" },
            select: {
              id: true,
              title: true,
              description: true,
              position: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          changeRequests: {
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              title: true,
              description: true,
              amountCents: true,
              currency: true,
              additionalDays: true,
              newDeliveryDate: true,
              status: true,
              expiresAt: true,
              sentAt: true,
              createdAt: true,
              updatedAt: true,
              approval: {
                select: {
                  id: true,
                  decision: true,
                  clientName: true,
                  clientEmail: true,
                  declineReason: true,
                  decidedAt: true,
                  userAgent: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!account) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  const exportedAt = new Date();
  const filename = `scopeyes-export-${exportedAt.toISOString().slice(0, 10)}.json`;

  return new Response(JSON.stringify({ exportedAt, account }, null, 2), {
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
