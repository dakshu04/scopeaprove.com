"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilePenLine,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Settings,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex size-9 items-center justify-center rounded-lg border border-border bg-white shadow-xs outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 gap-0 bg-sidebar p-0 shadow-xl"
      >
        <SheetHeader className="flex h-16 justify-center border-b border-sidebar-border px-5 py-0">
          <SheetTitle className="flex items-center gap-3 text-left text-sm font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">S</span>
            ScopeYes
          </SheetTitle>

          <SheetDescription className="sr-only">
            Dashboard navigation
          </SheetDescription>
        </SheetHeader>

        <nav
          className="flex flex-col gap-1.5 px-3 py-5"
          aria-label="Mobile dashboard navigation"
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
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  isActive
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
