"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilePenLine,
  FolderKanban,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    label: "Change Requests",
    href: "/dashboard/change-requests",
    icon: FilePenLine,
  },
];

export function DashboardSidebar({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const pathname = usePathname();
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <aside className="hidden h-full w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:flex-col">
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-5">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-[0_6px_16px_rgba(23,107,85,0.22)]">
            S
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-[-0.02em]">ScopeYes</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Workspace
            </span>
          </span>
        </Link>
      </div>

      <nav
        className="flex flex-1 flex-col gap-1.5 px-3 py-5"
        aria-label="Dashboard navigation"
      >
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Overview
        </p>
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isActive
                  ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_rgba(23,107,85,0.08)]"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className={cn("size-4", isActive && "text-primary")} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-3">
        <Link
          href="/dashboard/settings"
          className={cn(
            "mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
            pathname === "/dashboard/settings"
              ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
              : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
          )}
        >
          <Settings className="size-4" aria-hidden="true" />
          Settings
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex min-w-0 items-center gap-3 rounded-lg border border-sidebar-border bg-white/70 p-2.5 transition-colors hover:bg-white"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-xs font-semibold text-primary">
            {initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-semibold">{name}</span>
            <span className="block truncate text-[10px] text-muted-foreground">
              {email}
            </span>
          </span>
        </Link>
      </div>
    </aside>
  );
}
