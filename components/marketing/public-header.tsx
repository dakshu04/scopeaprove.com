import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

import { PublicBrand } from "@/components/marketing/public-brand";
import { siteConfig } from "@/config/siteConfig";

const productLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/freelance-hourly-rate-calculator", label: "Free calculator" },
] as const;

const publicLinks = [
  { href: "/freelance-hourly-rate-calculator", label: "Hourly rate calculator" },
  { href: "/scope-creep-cost-calculator", label: "Scope creep calculator" },
  { href: "/guides/client-asking-for-extra-work", label: "Extra work guide" },
  { href: "/guides/freelance-scope-of-work-template", label: "Scope of work" },
  { href: "/guides/client-change-request-template", label: "Free template" },
  { href: "/guides/scope-creep", label: "Scope creep guide" },
  { href: "/about", label: "About" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e0e5e1]/90 bg-[#f8f8f4]/90 text-[#1d2924] shadow-[0_1px_0_rgba(24,49,40,0.02)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0f1b16]/88 dark:text-white dark:shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-6">
        <Link
          aria-label={`${siteConfig.name} home`}
          className="shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f8f8f4] dark:focus-visible:ring-[#a9e5cc] dark:focus-visible:ring-offset-[#0f1b16]"
          href="/"
        >
          <PublicBrand compact />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 text-sm font-medium text-[#5f6964] lg:flex dark:text-white/62"
        >
          {productLinks.map((item) => (
            <Link className="rounded-md outline-none transition-colors hover:text-[#176b55] focus-visible:ring-2 focus-visible:ring-[#176b55]/50 dark:hover:text-[#baf0da] dark:focus-visible:ring-[#a9e5cc]/60" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="rounded-md outline-none transition-colors hover:text-[#176b55] focus-visible:ring-2 focus-visible:ring-[#176b55]/50 dark:hover:text-[#baf0da] dark:focus-visible:ring-[#a9e5cc]/60" href="/guides/freelance-scope-of-work-template">
            Freelancer guide
          </Link>
          <Link className="rounded-md outline-none transition-colors hover:text-[#176b55] focus-visible:ring-2 focus-visible:ring-[#176b55]/50 dark:hover:text-[#baf0da] dark:focus-visible:ring-[#a9e5cc]/60" href="/about">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            className="hidden rounded-lg px-2 py-2 text-sm font-medium text-[#5f6964] outline-none transition-colors hover:text-[#176b55] focus-visible:ring-2 focus-visible:ring-[#176b55]/50 sm:inline-flex dark:text-white/65 dark:hover:text-white dark:focus-visible:ring-[#a9e5cc]/60"
            href="/sign-in"
          >
            Sign in
          </Link>
          <Link
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#176b55] px-3.5 py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(23,107,85,0.2)] outline-none transition-all hover:-translate-y-0.5 hover:bg-[#125c49] focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f8f4] sm:px-4 sm:text-sm dark:bg-[#a9e5cc] dark:text-[#123c30] dark:shadow-[0_8px_28px_rgba(0,0,0,0.22)] dark:hover:bg-[#baf0da] dark:focus-visible:ring-[#a9e5cc] dark:focus-visible:ring-offset-[#0f1b16]"
            href="/sign-in"
          >
            Get started
            <ArrowRight aria-hidden="true" className="hidden size-3.5 sm:block" />
          </Link>

          <details className="group relative lg:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-xl border border-[#dcded8] bg-white text-[#353833] shadow-sm outline-none marker:content-none hover:bg-[#f4f5f1] focus-visible:ring-2 focus-visible:ring-[#176b55]/50 dark:border-white/12 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-[#a9e5cc]/60">
              <Menu aria-hidden="true" className="size-4" />
              <span className="sr-only">Open navigation</span>
            </summary>
            <div className="absolute right-0 top-12 w-[min(19rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-[#dedfd9] bg-white p-2 shadow-[0_24px_70px_rgba(31,49,42,0.17)] dark:border-white/12 dark:bg-[#17251f] dark:shadow-[0_28px_80px_rgba(0,0,0,0.4)]">
              <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8c85] dark:text-white/40">
                Product
              </p>
              {productLinks.map((item) => (
                <Link className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#40433e] outline-none hover:bg-[#f2f6f3] hover:text-[#176b55] focus-visible:ring-2 focus-visible:ring-[#176b55]/50 dark:text-white/75 dark:hover:bg-white/[0.07] dark:hover:text-[#baf0da] dark:focus-visible:ring-[#a9e5cc]/60" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
              <div className="my-2 border-t border-[#ecece7] dark:border-white/8" />
              <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8c85] dark:text-white/40">
                Explore
              </p>
              <div className="grid grid-cols-2">
                {publicLinks.map((item) => (
                  <Link className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#555852] outline-none hover:bg-[#f2f6f3] hover:text-[#176b55] focus-visible:ring-2 focus-visible:ring-[#176b55]/50 dark:text-white/60 dark:hover:bg-white/[0.07] dark:hover:text-[#baf0da] dark:focus-visible:ring-[#a9e5cc]/60" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link className="mt-2 block rounded-lg bg-[#173e33] px-3 py-2.5 text-center text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#176b55]/50 sm:hidden dark:bg-[#a9e5cc] dark:text-[#123c30] dark:focus-visible:ring-[#a9e5cc]/60" href="/sign-in">
                Sign in to ScopeYes
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
