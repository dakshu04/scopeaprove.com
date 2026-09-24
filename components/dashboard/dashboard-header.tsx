"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav";
import { UserMenu } from "@/components/dashboard/user-menu";

function getPageTitle(pathname: string) {
  if (pathname === "/dashboard") return "Overview";
  if (pathname === "/dashboard/projects/new") return "Create project";
  if (pathname.startsWith("/dashboard/projects/")) return "Project details";
  if (pathname === "/dashboard/projects") return "Projects";
  if (pathname.startsWith("/dashboard/change-requests/")) {
    return "Change request";
  }
  if (pathname === "/dashboard/change-requests") return "Change Requests";
  if (pathname === "/dashboard/settings") return "Settings";
  return "Client workspace";
}

export function DashboardHeader({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="z-20 shrink-0 border-b border-border/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <DashboardMobileNav />
          <div className="hidden min-w-0 md:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Client workspace
            </p>
            <p className="truncate text-sm font-semibold">{title}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/dashboard/projects"
            className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-white px-3 text-xs text-muted-foreground shadow-xs transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
          >
            <Search className="size-3.5" aria-hidden="true" />
            Search projects
          </Link>
          <span
            className="grid size-9 place-items-center rounded-lg text-muted-foreground"
            title="No new notifications"
            aria-label="No new notifications"
          >
            <Bell className="size-4" aria-hidden="true" />
          </span>
          <div className="mx-1 h-6 w-px bg-border" />
          <UserMenu name={name} email={email} />
        </div>
      </div>
    </header>
  );
}
