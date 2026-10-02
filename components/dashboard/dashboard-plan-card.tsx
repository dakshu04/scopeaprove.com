import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Sparkles } from "lucide-react";

import { ProCheckoutButton } from "@/components/billing/pro-checkout-button";
import { cn } from "@/lib/utils";

export function DashboardPlanCard({
  className,
  isPro,
}: {
  className?: string;
  isPro: boolean;
}) {
  if (isPro) {
    return (
      <section
        className={cn(
          "rounded-xl border border-primary/15 bg-[linear-gradient(145deg,#eef7f3_0%,#e3f1eb_100%)] p-3 shadow-[0_8px_22px_rgba(23,107,85,0.06)]",
          className,
        )}
        aria-label="Current plan: Pro"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="grid size-7 place-items-center rounded-lg bg-white/85 shadow-xs">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
            </span>
            Pro plan
          </span>

          <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
            Active
          </span>
        </div>

        <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
          Unlimited projects and change requests are unlocked.
        </p>

        <Link
          href="/dashboard/settings"
          className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary outline-none hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          Manage plan
          <ArrowUpRight className="size-3" aria-hidden="true" />
        </Link>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "rounded-xl border border-[#e7c985] bg-[linear-gradient(145deg,#fff9e8_0%,#fff2d7_58%,#fde8df_100%)] p-3 shadow-[0_8px_22px_rgba(137,82,26,0.07)]",
        className,
      )}
      aria-label="Current plan: Free"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-[#7d471d]">
          <span className="grid size-7 place-items-center rounded-lg bg-white/80 text-[#a45320] shadow-xs">
            <Sparkles className="size-3.5" aria-hidden="true" />
          </span>
          Free plan
        </span>

        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8d4b20]">
          <span className="size-1.5 rounded-full bg-[#cf6039] ring-2 ring-[#f5c8af]" />
          Current
        </span>
      </div>

      <p className="mt-2 text-[11px] leading-4 text-[#795f47]">
        1 project and 3 active change requests included.
      </p>

      <ProCheckoutButton variant="compact" />
    </section>
  );
}
