import type { Metadata } from "next";
import { CheckCircle2, Handshake, ShieldCheck, Target } from "lucide-react";
import Link from "next/link";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageTitle = "About ScopeYes | Clear Scope and Client Approvals";
const pageDescription =
  "Learn why ScopeYes helps freelancers and small teams document scope changes, communicate project impact, and obtain clear client decisions.";
const pageUrl = absoluteUrl("/about");

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: pageUrl,
        },
      ],
    },
  ],
};

const principles = [
  {
    icon: Target,
    title: "Clarity before work begins",
    text: "A change should explain the requested work, additional price, and delivery impact before anyone commits.",
  },
  {
    icon: Handshake,
    title: "Professional client conversations",
    text: "A consistent approval process helps freelancers set boundaries without making the relationship adversarial.",
  },
  {
    icon: ShieldCheck,
    title: "A dependable decision record",
    text: "The request, response, status, and timestamps belong together—not scattered across messages and meetings.",
  },
] as const;

export default function AboutPage() {
  return (
    <InfoPageShell
      description="ScopeYes exists to make project changes explicit before they become unpaid work, delayed delivery, or a difficult client conversation."
      eyebrow="About ScopeYes"
      title="Better boundaries for better client work."
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <section className="mx-auto max-w-[1180px] px-5 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55]">
              The problem
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Small requests should not create big misunderstandings.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#62635d]">
            <p>
              Client work changes. A request that sounds small can add hours of
              delivery time, alter a deadline, and make the final invoice harder
              to explain. When the decision lives in a chat thread or call,
              freelancers are often left carrying the risk.
            </p>
            <p>
              ScopeYes provides one focused workflow: document the change, show
              its impact, share a private review link, and record the client’s
              decision before extra work begins.
            </p>
            <p>
              It is built for freelancers, independent consultants, agencies,
              and small service teams that want a calm, professional way to
              protect project scope and client trust.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e3e3dc] bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55]">
            How we think
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Scope management should be simple enough to use every time.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {principles.map(({ icon: Icon, text, title }) => (
              <article
                className="rounded-2xl border border-[#e1e1da] bg-[#fafaf7] p-7"
                key={title}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-[#e7f2ed] text-[#176b55]">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#686961]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-5 py-16 text-center sm:px-6 lg:py-24">
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto size-9 text-[#176b55]"
        />
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Make the next change clear before work starts.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#666760]">
          Create a free workspace, document the request, and give your client
          one clear place to decide.
        </p>
        <Link
          className="mt-8 inline-flex rounded-lg bg-[#176b55] px-5 py-3 text-sm font-semibold text-white"
          href="/sign-in"
        >
          Get started free
        </Link>
      </section>
    </InfoPageShell>
  );
}
