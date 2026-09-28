import { Webhooks } from "@dodopayments/nextjs";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
const proProductId = process.env.DODO_PAYMENTS_PRODUCT_ID;

if (!webhookKey || !proProductId) {
  throw new Error("Missing Dodo Payments webhook configuration.");
}

function mapSubscriptionStatus(status: unknown) {
  switch (status) {
    case "pending":
      return "PENDING" as const;

    case "active":
      return "ACTIVE" as const;

    case "on_hold":
    case "paused":
      return "ON_HOLD" as const;

    case "cancelled":
      return "CANCELLED" as const;

    case "failed":
      return "FAILED" as const;

    case "expired":
      return "EXPIRED" as const;

    default:
      throw new Error(
        `Unsupported subscription status: ${String(status)}`,
      );
  }
}

function isRetryableTransactionError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2034"
  );
}

async function retrySerializableTransaction(
  operation: () => Promise<void>,
) {
  const maximumAttempts = 3;

  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    try {
      await operation();
      return;
    } catch (error) {
      const canRetry =
        isRetryableTransactionError(error) &&
        attempt < maximumAttempts;

      if (!canRetry) {
        throw error;
      }
    }
  }
}

export const POST = Webhooks({
  webhookKey,

  onPayload: async (payload) => {
    switch (payload.type) {
      case "subscription.active":
      case "subscription.renewed":
      case "subscription.updated":
      case "subscription.on_hold":
      case "subscription.paused":
      case "subscription.unpaused":
      case "subscription.cancelled":
      case "subscription.failed":
      case "subscription.expired": {
        const subscription = payload.data;

        if (subscription.product_id !== proProductId) {
          return;
        }

        const userId = subscription.metadata?.userId;

        if (typeof userId !== "string" || !userId) {
          throw new Error(
            "Subscription webhook is missing the application user ID.",
          );
        }

        const eventTimestamp = payload.timestamp;

        const eventId = [
          payload.type,
          subscription.subscription_id,
          eventTimestamp.toISOString(),
        ].join(":");

        const status = mapSubscriptionStatus(subscription.status);

        await retrySerializableTransaction(() =>
          prisma.$transaction(
            async (transaction) => {
              const insertedEvent =
                await transaction.webhookEvent.createMany({
                  data: [
                    {
                      dodoEventId: eventId,
                      eventType: payload.type,
                    },
                  ],
                  skipDuplicates: true,
                });

              if (insertedEvent.count === 0) {
                return;
              }

              const existingSubscription =
                await transaction.subscription.findUnique({
                  where: {
                    userId,
                  },
                  select: {
                    lastDodoEventAt: true,
                    updatedAt: true,
                  },
                });

              const latestKnownEventAt =
                existingSubscription?.lastDodoEventAt ??
                existingSubscription?.updatedAt;

              if (
                latestKnownEventAt &&
                eventTimestamp < latestKnownEventAt
              ) {
                return;
              }

              await transaction.subscription.upsert({
                where: {
                  userId,
                },
                create: {
                  userId,
                  dodoCustomerId:
                    subscription.customer.customer_id,
                  dodoSubscriptionId:
                    subscription.subscription_id,
                  dodoProductId: subscription.product_id,
                  status,
                  nextBillingDate:
                    subscription.next_billing_date,
                  cancelledAt:
                    subscription.cancelled_at ?? null,
                  lastDodoEventAt: eventTimestamp,
                },
                update: {
                  dodoCustomerId:
                    subscription.customer.customer_id,
                  dodoSubscriptionId:
                    subscription.subscription_id,
                  dodoProductId: subscription.product_id,
                  status,
                  nextBillingDate:
                    subscription.next_billing_date,
                  cancelledAt:
                    subscription.cancelled_at ?? null,
                  lastDodoEventAt: eventTimestamp,
                },
              });
            },
            {
              isolationLevel: "Serializable",
            },
          ),
        );

        return;
      }

      default:
        return;
    }
  },
});