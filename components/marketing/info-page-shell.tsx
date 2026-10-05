import { ArrowRight, FileCheck2, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/siteConfig";

type InfoPageShellProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

function Brand() {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-[-0.02em]">
      <span className="grid size-7 place-items-center rounded-lg bg-[#176b55] text-white">
        <FileCheck2 aria-hidden="true" className="size-4" />
      </span>
      {siteConfig.name}
    </span>
  );
}

export function InfoPageShell({
  children,
  description,
  eyebrow,
  title,
}: InfoPageShellProps) {
  return (
    <div className="min-h-screen bg-[#f8f8f4] text-[#1b1c18] selection:bg-[#bce8d7]">
      <a
        className="sr-only z-[100] rounded-md bg-white px-4 py-2 font-semibold text-[#176b55] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Skip to content
      </a>

      <header className="border-b border-[#e3e3dc] bg-[#f8f8f4]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-6">
          <Link aria-label={`${siteConfig.name} home`} href="/">
            <Brand />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 text-sm font-medium text-[#62635d] md:flex"
          >
            <Link className="hover:text-[#176b55]" href="/#how-it-works">
              How it works
            </Link>
            <Link className="hover:text-[#176b55]" href="/#features">
              Features
            </Link>
            <Link className="hover:text-[#176b55]" href="/#pricing">
              Pricing
            </Link>
          </nav>

          <Link
            className="inline-flex items-center gap-2 rounded-lg bg-[#176b55] px-4 py-2.5 text-sm font-semibold text-white"
            href="/sign-in"
          >
            Get started
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </header>

      <main id="main-content">
        <section className="border-b border-[#e3e3dc] bg-white">
          <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-6 sm:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55]">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[#191b18] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#64655f] sm:text-lg sm:leading-8">
              {description}
            </p>
          </div>
        </section>

        {children}
      </main>

      <footer className="border-t border-[#deded6] bg-[#f2f2ec]">
        <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-6">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
            <div>
              <Brand />
              <p className="mt-2 text-sm text-[#6e6f68]">
                Clear scope. Confident approvals.
              </p>
            </div>
            <nav
              aria-label="Footer navigation"
              className="flex max-w-2xl flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#62635d]"
            >
              <Link className="hover:text-[#176b55]" href="/about">
                About
              </Link>
              <Link className="hover:text-[#176b55]" href="/contact">
                Contact
              </Link>
              <Link className="hover:text-[#176b55]" href="/security">
                Security
              </Link>
              <Link className="hover:text-[#176b55]" href="/privacy">
                Privacy
              </Link>
              <Link className="hover:text-[#176b55]" href="/terms">
                Terms
              </Link>
            </nav>
          </div>
          <div className="mt-9 flex flex-col justify-between gap-3 border-t border-[#deded6] pt-6 text-xs text-[#85867e] sm:flex-row">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <a
              className="inline-flex items-center gap-1.5 hover:text-[#176b55]"
              href={`mailto:${siteConfig.supportEmail}`}
            >
              <Mail aria-hidden="true" className="size-3.5" />
              {siteConfig.supportEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
