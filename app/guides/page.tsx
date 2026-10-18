import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, FileCheck2, FileText, MessageSquareText } from "lucide-react";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/guides");
const title = "Freelancer Scope Creep Guides, Templates & Calculators";
const description =
  "Free guides, templates, scripts, and calculators to help freelancers define project scope, price extra work, and get client approval before work begins.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ScopeYes` },
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    type: "website",
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image", title, description },
};

const resources = [
  {
    href: "/guides/client-asking-for-extra-work",
    title: "What to say when a client asks for extra work",
    description:
      "Use practical scripts to name an out-of-scope request, explain its impact, and ask for a decision without damaging the relationship.",
    label: "Client communication guide",
    icon: MessageSquareText,
  },
  {
    href: "/guides/freelance-scope-of-work-template",
    title: "Freelance scope of work template",
    description:
      "Define deliverables, revisions, exclusions, milestones, responsibilities, and the change process before the project starts.",
    label: "Copy-and-paste template",
    icon: FileText,
  },
  {
    href: "/guides/freelance-scope-of-work-examples",
    title: "Freelance scope of work examples",
    description:
      "See detailed deliverables and exclusions for web design, copywriting, brand identity, and consulting projects.",
    label: "Practical examples",
    icon: FileText,
  },
  {
    href: "/guides/client-change-request-template",
    title: "Client change request template",
    description:
      "Document added work, price and schedule impact, assumptions, and the client decision in one clear record.",
    label: "Free change template",
    icon: FileCheck2,
  },
  {
    href: "/guides/scope-creep",
    title: "What is scope creep?",
    description:
      "Recognize the warning signs and use a repeatable five-step process to turn uncontrolled additions into approved changes.",
    label: "Practical guide",
    icon: ArrowRight,
  },
  {
    href: "/scope-creep-cost-calculator",
    title: "Scope creep cost calculator",
    description:
      "Estimate how unpaid extra work affects project margin and turn the result into a clearer client conversation.",
    label: "Free calculator",
    icon: Calculator,
  },
  {
    href: "/freelance-hourly-rate-calculator",
    title: "Freelance hourly rate calculator",
    description:
      "Calculate a sustainable hourly rate from income goals, business costs, billable time, taxes, and profit.",
    label: "Free calculator",
    icon: Calculator,
  },
  {
    href: "/guides/how-to-calculate-freelance-hourly-rate",
    title: "How to calculate a freelance hourly rate",
    description:
      "Use the complete rate formula with take-home income, overhead, taxes, vacation, and realistic billable capacity.",
    label: "Pricing guide",
    icon: Calculator,
  },
  {
    href: "/guides/freelance-hourly-rate-vs-salary",
    title: "Freelance hourly rate vs salary",
    description:
      "Convert employee compensation into a sustainable freelance rate without overlooking benefits, costs, or unpaid time.",
    label: "Rate comparison",
    icon: Calculator,
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      mainEntity: { "@id": `${pageUrl}#resources` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#resources`,
      name: "ScopeYes freelancer resources",
      itemListElement: resources.map((resource, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: resource.title,
        url: absoluteUrl(resource.href),
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: pageUrl },
      ],
    },
  ],
};

export default function GuidesPage() {
  return (
    <InfoPageShell
      description={description}
      eyebrow="Free freelancer resources"
      title="Protect your time, project scope, and client relationships"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <div className="mx-auto max-w-[1040px] px-5 pb-16 sm:px-6 sm:pb-24">
        <section aria-labelledby="resource-library-heading" className="py-10 sm:py-14">
          <div className="max-w-3xl">
            <h2
              className="text-2xl font-semibold tracking-[-0.035em] text-[#1b1c18] sm:text-3xl"
              id="resource-library-heading"
            >
              A practical resource library for managing client changes
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#5f615b]">
              Start with a clear scope, recognize new work early, price the real
              impact, and record approval before delivery. Every resource below
              is free and written for freelancers, consultants, and small service
              teams.
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {resources.map(({ description: resourceDescription, href, icon: Icon, label, title: resourceTitle }) => (
              <article
                className="group flex min-h-64 flex-col rounded-2xl border border-[#dfe1da] bg-white p-6 shadow-[0_10px_32px_rgba(31,49,42,0.045)] transition-transform hover:-translate-y-0.5"
                key={href}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-[#eaf3ef] text-[#176b55]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#7a7d75]">
                    {label}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-[#252721]">
                  {resourceTitle}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#63665f]">
                  {resourceDescription}
                </p>
                <Link
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#176b55] outline-none group-hover:underline focus-visible:ring-2 focus-visible:ring-[#176b55] focus-visible:ring-offset-4"
                  href={href}
                >
                  Open resource
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#173e33] p-6 text-white sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a9e5cc]">
            From advice to action
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Keep each project change clear and approved.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
            ScopeYes puts the request, extra deliverables, price, timeline impact,
            and client response in one place.
          </p>
          <Link
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#a9e5cc] px-4 py-2.5 text-sm font-semibold text-[#173e33]"
            href="/sign-in"
          >
            Create a free change request
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
      </div>
    </InfoPageShell>
  );
}
