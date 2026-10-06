import type { ReactNode } from "react";

import { PublicFooter } from "@/components/marketing/public-footer";
import { PublicHeader } from "@/components/marketing/public-header";

type InfoPageShellProps = {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

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

      <PublicHeader />

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

      <PublicFooter />
    </div>
  );
}
