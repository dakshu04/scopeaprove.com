import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CheckoutRedirect } from "@/components/billing/checkout-redirect";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Continue to checkout",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default async function CheckoutStartPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?next=checkout");
  }

  return <CheckoutRedirect />;
}
