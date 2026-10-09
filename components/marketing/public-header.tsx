import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

import { PublicBrand } from "@/components/marketing/public-brand";
import { siteConfig } from "@/config/siteConfig";

const productLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
] as const;

const publicLinks = [
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
    <header className="sticky top-0 z-50 border-b border-[#e4e6e1]/90 bg-[#f8f8f4]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-6">
        <Link
          aria-label={`${siteConfig.name} home`}
          className="shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-4"
          href="/"
        >
          <PublicBrand compact />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 text-sm font-medium text-[#62655f] lg:flex"
        >
          {productLinks.map((item) => (
            <Link className="transition-colors hover:text-[#176b55]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="transition-colors hover:text-[#176b55]" href="/guides/freelance-scope-of-work-template">
            Freelancer guide
          </Link>
          <Link className="transition-colors hover:text-[#176b55]" href="/about">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            className="hidden rounded-lg px-2 py-2 text-sm font-medium text-[#62655f] transition-colors hover:text-[#176b55] sm:inline-flex"
            href="/sign-in"
          >
            Sign in
          </Link>
          <Link
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#176b55] px-3.5 py-2.5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(23,107,85,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#125c49] sm:px-4 sm:text-sm"
            href="/sign-in"
          >
            Get started
            <ArrowRight aria-hidden="true" className="hidden size-3.5 sm:block" />
          </Link>

          <details className="group relative lg:hidden">
            <summary className="grid size-10 cursor-pointer list-none place-items-center rounded-lg border border-[#dcded8] bg-white text-[#353833] shadow-sm marker:content-none hover:bg-[#f4f5f1]">
              <Menu aria-hidden="true" className="size-4" />
              <span className="sr-only">Open navigation</span>
            </summary>
            <div className="absolute right-0 top-12 w-[min(19rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-[#dedfd9] bg-white p-2 shadow-[0_24px_70px_rgba(31,49,42,0.17)]">
              <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8c85]">
                Product
              </p>
              {productLinks.map((item) => (
                <Link className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#40433e] hover:bg-[#f2f6f3] hover:text-[#176b55]" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
              <div className="my-2 border-t border-[#ecece7]" />
              <p className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8c85]">
                Explore
              </p>
              <div className="grid grid-cols-2">
                {publicLinks.map((item) => (
                  <Link className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#555852] hover:bg-[#f2f6f3] hover:text-[#176b55]" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link className="mt-2 block rounded-lg bg-[#173e33] px-3 py-2.5 text-center text-sm font-semibold text-white sm:hidden" href="/sign-in">
                Sign in to ScopeYes
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
