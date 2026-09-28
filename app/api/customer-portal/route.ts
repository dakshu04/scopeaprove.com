import { CustomerPortal } from "@dodopayments/nextjs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT;

  if (!apiKey) {
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

  const subscription = await prisma.subscription.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      dodoCustomerId: true,
    },
  });

  if (!subscription?.dodoCustomerId) {
    return NextResponse.json(
      { error: "No billing account was found for this user." },
      { status: 404 },
    );
  }

  const customerPortal = CustomerPortal({
    bearerToken: apiKey,
    environment,
  });

  const portalRequestUrl = new URL(request.url);

  portalRequestUrl.searchParams.set(
    "customer_id",
    subscription.dodoCustomerId,
  );

  portalRequestUrl.searchParams.set("send_email", "false");

  const portalRequest = new NextRequest(portalRequestUrl, {
    method: "GET",
  });

  return customerPortal(portalRequest);
}