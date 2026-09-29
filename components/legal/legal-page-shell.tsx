import { ArrowLeft, FileCheck2, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

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

function Brand() {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-[-0.02em]">
      <span className="grid size-7 place-items-center rounded-lg bg-[#176b55] text-white">
        <FileCheck2 aria-hidden="true" className="size-4" />
      </span>
      ScopeYes
    </span>
  );
}

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

      <header className="border-b border-[#e3e3dc] bg-[#f8f8f4]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-6">
          <Link
            aria-label="ScopeYes home"
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-4"
            href="/"
          >
            <Brand />
          </Link>

          <Link
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-[#62635d] transition-colors hover:text-[#176b55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-4"
            href="/"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>
        </div>
      </header>

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
              className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pr-4"
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
              aria-label="Legal footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#62635d]"
            >
              <Link className="hover:text-[#176b55]" href="/">
                Home
              </Link>
              <Link className="hover:text-[#176b55]" href="/sign-in">
                Sign in
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
            <p>© {new Date().getFullYear()} ScopeYes. All rights reserved.</p>
            <a
              className="inline-flex items-center gap-1.5 hover:text-[#176b55]"
              href="mailto:scopeyescontact@gmail.com"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              scopeyescontact@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
