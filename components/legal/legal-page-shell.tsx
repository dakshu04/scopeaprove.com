import type { ReactNode } from "react";

import { PublicFooter } from "@/components/marketing/public-footer";
import { PublicHeader } from "@/components/marketing/public-header";

type TableOfContentsItem = {
  href: `#${string}`;
  label: string;
};

type LegalPageShellProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  lastUpdated: string;
  tableOfContents: readonly TableOfContentsItem[];
  title: string;
};

export function LegalPageShell({
  children,
  description,
  eyebrow,
  lastUpdated,
  tableOfContents,
  title,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-[#f8f8f4] text-[#1b1c18] selection:bg-[#bce8d7]">
      <a
        className="sr-only z-[100] rounded-md bg-white px-4 py-2 font-semibold text-[#176b55] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#legal-content"
      >
        Skip to legal content
      </a>

      <PublicHeader />

      <main id="legal-content">
        <section className="border-b border-[#e3e3dc] bg-white">
          <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55]">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-[#191b18] sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#64655f] sm:text-lg sm:leading-8">
              {description}
            </p>
            <p className="mt-6 text-sm font-medium text-[#777870]">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,720px)] lg:justify-between lg:gap-20 lg:py-20">
          <aside className="hidden lg:block">
            <nav
              aria-label={`${title} table of contents`}
              className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-4"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#85867e]">
                On this page
              </p>
              <ol className="space-y-1 border-l border-[#deded6]">
                {tableOfContents.map((item) => (
                  <li key={item.href}>
                    <a
                      className="block border-l border-transparent py-1.5 pl-4 text-sm leading-5 text-[#676861] transition-colors hover:border-[#176b55] hover:text-[#176b55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b55]"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="legal-copy min-w-0">{children}</article>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
