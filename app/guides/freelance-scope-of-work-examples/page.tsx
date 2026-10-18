import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/guides/freelance-scope-of-work-examples");
const title = "Freelance Scope of Work Examples for Real Projects";
const description =
  "See practical freelance scope of work examples for web design, copywriting, branding, and consulting, with deliverables, exclusions, revisions, and change terms.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ScopeYes` },
  description,
  keywords: [
    "freelance scope of work examples",
    "scope of work example freelancer",
    "web design scope of work example",
    "copywriting scope of work example",
    "consulting scope of work example",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    type: "article",
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image", title, description },
};

const examples = [
  {
    title: "Freelance web design",
    objective: "Design and build a responsive marketing website that explains the client's service and generates qualified enquiries.",
    included: [
      "Five named pages at desktop, tablet, and mobile breakpoints",
      "One contact form and one newsletter integration",
      "Two consolidated design revision rounds",
      "Basic on-page metadata and launch handoff",
    ],
    excluded: ["Copywriting", "Brand identity", "Paid plugins", "Ongoing maintenance"],
  },
  {
    title: "Freelance copywriting",
    objective: "Write conversion-focused website copy using the approved positioning and source material supplied by the client.",
    included: [
      "Discovery questionnaire and one 60-minute interview",
      "Copy for five named pages up to the agreed word counts",
      "One structural outline and two revision rounds",
      "Final copy delivered in an editable document",
    ],
    excluded: ["SEO research", "Design", "Additional stakeholder interviews", "CMS entry"],
  },
  {
    title: "Freelance brand identity",
    objective: "Create a practical visual identity for consistent use across the client's primary channels.",
    included: [
      "Two initial creative directions",
      "One selected logo system with approved variations",
      "Color, typography, and usage guidance",
      "Final SVG, PDF, PNG, and source files after payment",
    ],
    excluded: ["Naming", "Trademark searches", "Packaging", "Custom typeface design"],
  },
  {
    title: "Independent consulting",
    objective: "Assess the current process and provide prioritized recommendations the client's team can implement.",
    included: [
      "Kickoff and up to six stakeholder interviews",
      "Review of the listed documents and systems",
      "Findings report with prioritized recommendations",
      "One presentation and one follow-up question session",
    ],
    excluded: ["Implementation", "Vendor procurement", "Ongoing support", "Work outside the named business unit"],
  },
] as const;

const faqs = [
  {
    question: "How detailed should a freelance scope of work be?",
    answer:
      "It should be specific enough that both sides can tell whether a requested output is included. Name quantities, formats, revision limits, responsibilities, exclusions, dates, and acceptance conditions without turning the document into an unreadable technical specification.",
  },
  {
    question: "Should exclusions appear in the scope of work?",
    answer:
      "Yes. Explicit exclusions correct common assumptions before they become disputes. Focus on adjacent services clients may reasonably expect rather than attempting to list every task in the world.",
  },
  {
    question: "What happens when the client requests something outside scope?",
    answer:
      "Describe the new deliverable, explain the added price and schedule impact, and obtain written approval before starting. The original scope stays unchanged until both sides approve the change.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: title,
      description,
      datePublished: "2026-10-18",
      dateModified: "2026-10-18",
      inLanguage: siteConfig.language,
      mainEntityOfPage: pageUrl,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
        { "@type": "ListItem", position: 3, name: title, item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const sectionClass = "border-b border-[#e2e4de] py-10 last:border-0 sm:py-14";
const headingClass = "text-2xl font-semibold tracking-[-0.035em] sm:text-3xl";
const copyClass = "mt-4 text-[15px] leading-7 text-[#5e615b]";

export default function FreelanceScopeOfWorkExamplesPage() {
  return (
    <InfoPageShell
      description={description}
      eyebrow="Freelance project guide"
      title="Freelance scope of work examples"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <article className="mx-auto max-w-[960px] px-5 sm:px-6">
        <section className={sectionClass}>
          <div className="rounded-2xl border border-[#cdded6] bg-[#eef7f3] p-5 sm:p-7">
            <p className="text-base leading-7 text-[#294b40]">
              A useful scope names the result, deliverables, boundaries, and
              decision process. Adapt these examples to your project instead of
              copying broad phrases such as “website design” or “marketing help.”
            </p>
            <Link className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#176b55] px-4 py-2.5 text-sm font-semibold text-white" href="/guides/freelance-scope-of-work-template">
              Copy the complete scope template
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>

        {examples.map((example) => (
          <section className={sectionClass} key={example.title}>
            <h2 className={headingClass}>{example.title} scope of work example</h2>
            <p className={copyClass}>
              <strong>Project objective:</strong> {example.objective}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#d8ded9] bg-white p-5 sm:p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#176b55]">Included deliverables</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#555850]">
                  {example.included.map((item) => (
                    <li className="flex gap-2" key={item}>
                      <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#176b55]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[#e1ded8] bg-[#faf9f6] p-5 sm:p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#795f40]">Not included</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[#5e5951]">
                  {example.excluded.map((item) => (
                    <li className="flex gap-2" key={item}>
                      <XCircle aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#9a7651]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <section className={sectionClass}>
          <h2 className={headingClass}>Terms every example still needs</h2>
          <p className={copyClass}>
            Deliverables and exclusions are only part of the scope. Add milestone
            dates, client responsibilities, revision limits, fees and payment
            timing, acceptance criteria, and ownership or licensing terms that
            match your agreement.
          </p>
          <p className={copyClass}>
            Finish with a change clause: work not listed in the approved scope
            requires a written change request showing the extra deliverables,
            fee, and schedule impact before the work begins.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map(({ question, answer }) => (
              <div className="rounded-xl border border-[#e1e2dc] bg-white p-5" key={question}>
                <h3 className="font-semibold">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-[#62645e]">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="rounded-3xl bg-[#173e33] p-6 text-white sm:p-9">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">When the scope changes, document the decision.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              Use ScopeYes to show the added work, price, timeline impact, and
              client response without rewriting the original project agreement.
            </p>
            <Link className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#a9e5cc] px-4 py-2.5 text-sm font-semibold text-[#173e33]" href="/sign-in">
              Create a free change request
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </article>
    </InfoPageShell>
  );
}
