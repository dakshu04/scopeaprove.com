import type { Metadata } from "next";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { requireUser } from "@/lib/auth-session";
import { getBillingEntitlements } from "@/lib/billing";
import { DashboardMain } from "@/components/dashboard/dashboard-main";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const user = await requireUser();
  const entitlements = await getBillingEntitlements(user.id);

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <DashboardSidebar
        name={user.name}
        email={user.email}
        plan={entitlements.plan}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <DashboardHeader
          name={user.name}
          email={user.email}
          plan={entitlements.plan}
        />

        <DashboardMain>{children}</DashboardMain>
      </div>
    </div>
  );
}
