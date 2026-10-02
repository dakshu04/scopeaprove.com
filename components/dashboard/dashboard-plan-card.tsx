"use client";

import Link from "next/link";
import { ArrowUpRight, Crown, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type DashboardPlanCardProps = {
  onNavigate?: () => void;
  plan: "FREE" | "PRO";
};

export function DashboardPlanCard({
  onNavigate,
  plan,
}: DashboardPlanCardProps) {
  const isPro = plan === "PRO";
  const PlanIcon = isPro ? Crown : Sparkles;

  return (
    <Link
      href="/#pricing"
      onClick={onNavigate}
      aria-label={`${plan} plan. View plans and pricing.`}
      className={cn(
        "group relative block overflow-hidden rounded-xl border p-3.5 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2",
        isPro
          ? "border-[#287a65] bg-[linear-gradient(145deg,#176b55_0%,#104c3f_100%)] text-white shadow-[0_12px_28px_rgba(16,76,63,0.22)] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(16,76,63,0.28)]"
          : "border-primary/15 bg-[linear-gradient(145deg,#ffffff_0%,#edf7f2_100%)] text-sidebar-foreground shadow-[0_10px_26px_rgba(31,69,56,0.08)] hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_32px_rgba(31,69,56,0.12)]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-8 -top-10 size-24 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          isPro ? "bg-emerald-200/20" : "bg-emerald-300/25 opacity-70",
        )}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "grid size-8 place-items-center rounded-lg border",
            isPro
              ? "border-white/15 bg-white/10 text-emerald-100"
              : "border-primary/10 bg-white text-primary shadow-sm",
          )}
        >
          <PlanIcon className="size-4" aria-hidden="true" />
        </span>

        <span
          className={cn(
            "rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em]",
            isPro
              ? "border border-white/15 bg-white/10 text-emerald-50"
              : "border border-primary/10 bg-primary/8 text-primary",
          )}
        >
          {plan}
        </span>
      </div>

      <div className="relative mt-3">
        <p
          className={cn(
            "text-[9px] font-semibold uppercase tracking-[0.16em]",
            isPro ? "text-emerald-100/70" : "text-muted-foreground",
          )}
        >
          Current plan
        </p>
        <p className="mt-1 text-sm font-semibold tracking-[-0.02em]">
          {isPro ? "Pro workspace" : "Free workspace"}
        </p>
        <p
          className={cn(
            "mt-1 text-[10px] leading-4",
            isPro ? "text-emerald-50/70" : "text-muted-foreground",
          )}
        >
          {isPro
            ? "Unlimited projects and change requests."
            : "1 project and 3 active change requests."}
        </p>
      </div>

      <span
        className={cn(
          "relative mt-3 flex items-center justify-between border-t pt-2.5 text-[10px] font-semibold",
          isPro
            ? "border-white/10 text-emerald-50"
            : "border-primary/10 text-primary",
        )}
      >
        {isPro ? "View plan details" : "Explore Pro"}
        <ArrowUpRight
          className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
