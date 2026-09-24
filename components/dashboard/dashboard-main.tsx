"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function DashboardMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFixedWorkspace =
    pathname === "/dashboard/change-requests" ||
    pathname === "/dashboard/projects";

  return (
    <main
      className={cn(
        "min-h-0 flex-1 overscroll-contain bg-[linear-gradient(180deg,#f8faf8_0%,#f3f6f4_100%)] px-4 py-5 sm:px-6 sm:py-6 lg:px-8",
        isFixedWorkspace
          ? "overflow-hidden"
          : "dashboard-scroll overflow-y-auto",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1440px]",
          isFixedWorkspace && "h-full min-h-0",
        )}
      >
        {children}
      </div>
    </main>
  );
}
