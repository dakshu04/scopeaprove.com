"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilePenLine,
  FolderKanban,
  LayoutDashboard,
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

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-background md:flex md:min-h-screen md:flex-col">
      <div className="flex h-14 items-center border-b border-border px-5">
        <Link
          href="/dashboard"
          className="text-sm font-semibold tracking-tight"
        >
          ScopeYes
        </Link>
      </div>

      <nav
        className="flex flex-1 flex-col gap-1 px-3 py-4"
        aria-label="Dashboard navigation"
      >
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
                "flex items-center gap-2 border-l-2 px-3 py-2 text-sm transition-colors",
                isActive
                  ? "border-foreground bg-muted font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}