import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { requireUser } from "@/lib/auth-session";
import { DashboardMain } from "@/components/dashboard/dashboard-main";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const user = await requireUser();

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <DashboardSidebar name={user.name} email={user.email} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <DashboardHeader name={user.name} email={user.email} />

        <DashboardMain>{children}</DashboardMain>
      </div>
    </div>
  );
}
