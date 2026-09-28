import { Checkout } from "@dodopayments/nextjs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json(
      { error: "You must sign in before upgrading." },
      { status: 401 },
    );
  }

  const existingSubscription = await prisma.subscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (existingSubscription?.status === "ACTIVE") {
    return NextResponse.json(
      { error: "You already have an active Pro subscription." },
      { status: 409 },
    );
  }

  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const productId = process.env.DODO_PAYMENTS_PRODUCT_ID;
  const returnUrl = process.env.DODO_PAYMENTS_RETURN_URL;
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT;

  if (!apiKey || !productId || !returnUrl) {
    return NextResponse.json(
      { error: "Payment configuration is incomplete." },
      { status: 500 },
    );
  }

  if (environment !== "test_mode" && environment !== "live_mode") {
    return NextResponse.json(
      { error: "Invalid payment environment." },
      { status: 500 },
    );
  }

  const checkout = Checkout({
    bearerToken: apiKey,
    environment,
    returnUrl,
    type: "session",
  });

  const checkoutRequest = new NextRequest(request.url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        email: session.user.email,
        name: session.user.name,
      },
      metadata: {
        userId: session.user.id,
      },
      feature_flags: {
        allow_customer_editing_email: false,
        allow_customer_editing_name: false,
      },
    }),
  });

  return checkout(checkoutRequest);
}