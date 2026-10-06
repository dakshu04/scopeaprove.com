import { Mail } from "lucide-react";
import Link from "next/link";

import { PublicBrand } from "@/components/marketing/public-brand";
import { siteConfig } from "@/config/siteConfig";

const groups = [
  {
    title: "Product",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#features", label: "Features" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/sign-in", label: "Sign in" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/guides/client-change-request-template", label: "Free change request template" },
      { href: "/guides/scope-creep", label: "Scope creep guide" },
      { href: "/about", label: "About ScopeYes" },
      { href: "/contact", label: "Contact" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
] as const;

export function PublicFooter() {
  return (
    <footer className="border-t border-[#dfe1db] bg-[#eff1ec] text-[#1b1c18]">
      <div className="mx-auto max-w-[1180px] px-5 pb-7 pt-11 sm:px-6 sm:pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,0.75fr)]">
          <div className="max-w-sm">
            <Link aria-label={`${siteConfig.name} home`} href="/">
              <PublicBrand />
            </Link>
            <p className="mt-4 text-sm leading-6 text-[#656861]">
              A clear, professional way to document extra work, agree on its
              impact, and record a client decision before work begins.
            </p>
            <a
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#176b55] hover:underline"
              href={`mailto:${siteConfig.supportEmail}`}
            >
              <Mail aria-hidden="true" className="size-4" />
              {siteConfig.supportEmail}
            </a>
            <a
              aria-label="View ScopeYes on LaunchOnIt"
              className="mt-6 block w-fit rounded-sm outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-4"
              href="https://launchon.it/products/scopeyes"
              rel="noopener noreferrer"
              target="_blank"
            >
              {/* The provider serves this badge as a live SVG, so a native image preserves it without proxying. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="ScopeYes featured on LaunchOnIt"
                decoding="async"
                height="48"
                loading="lazy"
                src="https://launchon.it/api/badge/scopeyes?theme=light&size=md&type=featured"
                width="164"
              />
            </a>
          </div>

          {groups.map((group) => (
            <nav aria-label={`${group.title} links`} key={group.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#858880]">
                {group.title}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link className="text-sm font-medium text-[#555852] transition-colors hover:text-[#176b55]" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-11 flex flex-col justify-between gap-3 border-t border-[#d9dcd5] pt-6 text-xs text-[#7b7e77] sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Clear scope. Confident approvals.</p>
        </div>
      </div>
    </footer>
  );
}
