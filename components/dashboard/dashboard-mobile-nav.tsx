"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilePenLine,
  FolderKanban,
  LayoutDashboard,
  Menu,
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
];

export function DashboardMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex size-9 items-center justify-center border border-border outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 gap-0 p-0 shadow-sm"
      >
        <SheetHeader className="flex h-14 justify-center border-b border-border px-5 py-0">
          <SheetTitle className="text-left text-sm font-semibold tracking-tight">
            ScopeYes
          </SheetTitle>

          <SheetDescription className="sr-only">
            Dashboard navigation
          </SheetDescription>
        </SheetHeader>

        <nav
          className="flex flex-col gap-1 px-3 py-4"
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
      </SheetContent>
    </Sheet>
  );
}