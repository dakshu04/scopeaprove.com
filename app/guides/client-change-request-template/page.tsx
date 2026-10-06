import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Download, FileText, Send } from "lucide-react";
import Link from "next/link";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/guides/client-change-request-template");
const pageTitle = "Client Change Request Template for Freelancers";
const pageDescription =
  "Use this free client change request template to document extra freelance work, additional cost, timeline impact, and approval before you begin.";

export const metadata: Metadata = {
  title: { absolute: `${pageTitle} | ScopeYes` },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${pageTitle} | ScopeYes`,
    description: pageDescription,
    type: "article",
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ScopeYes`,
    description: pageDescription,
  },
};

const faqs = [
  {
    question: "What is a client change request?",
    answer:
      "A client change request documents work that changes the agreed project scope. It explains the new work, additional price, schedule impact, and the decision required before the freelancer starts.",
  },
  {
    question: "When should a freelancer send a change request?",
    answer:
      "Send one when a request adds a deliverable, exceeds an agreed revision limit, changes a deadline, introduces a new requirement, or creates additional work that was not priced in the original agreement.",
  },
  {
    question: "Should I start the work before the client approves?",
    answer:
      "Usually, no. Give the client the scope, cost, and schedule impact first, then obtain a written decision before starting the additional work.",
  },
  {
    question: "Does this template replace a freelance contract?",
    answer:
      "No. The template helps document a proposed change and client decision, but it does not replace an appropriate contract or legal advice for your circumstances.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: pageTitle,
      description: pageDescription,
      datePublished: "2026-10-07",
      dateModified: "2026-10-07",
      inLanguage: siteConfig.language,
      mainEntityOfPage: pageUrl,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
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
          name: "Client change request template",
          item: pageUrl,
        },
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
const headingClass = "text-2xl font-semibold tracking-[-0.035em] text-[#1b1c18] sm:text-3xl";
const bodyClass = "mt-4 text-[15px] leading-7 text-[#5e615b]";

export default function ClientChangeRequestTemplatePage() {
  return (
    <InfoPageShell
      description="A free, practical template for freelancers who need to define extra work, price it clearly, explain the schedule impact, and get a client decision before starting."
      eyebrow="Free freelancer template"
      title="Client change request template for freelancers"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <article className="mx-auto max-w-[920px] px-5 sm:px-6">
        <section className={sectionClass}>
          <div className="rounded-2xl border border-[#cdded6] bg-[#eef7f3] p-5 sm:p-7">
            <p className="text-base leading-7 text-[#294b40]">
              <strong>A client change request</strong> is a short written record
              of work added after the original scope was agreed. It should show
              what is changing, why it is additional, what it costs, how it
              affects delivery, and what the client must approve.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#176b55] px-4 py-2.5 text-sm font-semibold text-white"
                download
                href="/templates/client-change-request.txt"
              >
                <Download aria-hidden="true" className="size-4" />
                Download the free template
              </a>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#cbd8d2] bg-white px-4 py-2.5 text-sm font-semibold text-[#214d40]"
                href="/sign-in"
              >
                Create an approval link
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Copy-and-paste change request template</h2>
          <p className={bodyClass}>
            Replace the bracketed details, remove fields that do not apply, and
            keep the language specific enough that both sides know exactly what
            will happen after approval.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#dcded8] bg-white shadow-[0_14px_38px_rgba(31,49,42,0.06)]">
            <div className="flex items-center gap-2 border-b border-[#e5e6e1] bg-[#f5f6f2] px-5 py-3 text-xs font-semibold text-[#4f534d]">
              <FileText aria-hidden="true" className="size-4 text-[#176b55]" />
              Freelance client change request
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap p-5 font-sans text-sm leading-7 text-[#454842] sm:p-7">{`Project: [Project name]
Client: [Client name]
Change request: [Short descriptive title]

Requested change
[Describe the additional work in plain language.]

Original scope reference
[State what the original agreement included and why this request is additional.]

Deliverables included in this change
• [Deliverable one]
• [Deliverable two]
• [Any exclusions or assumptions]

Additional price
[Amount and currency, plus applicable tax or payment terms]

Schedule impact
[No change / adds X business days / revised delivery date]

Approval
Please approve this change before work begins. Approval confirms the additional work, price, and schedule impact described above.

Decision: [Approved / Changes requested]
Client name: [Name]
Decision date: [Date]`}</pre>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>When should a freelancer use it?</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["New deliverable", "A client adds another page, feature, asset, integration, or service."],
              ["Extra revisions", "Feedback goes beyond the revision rounds included in the agreement."],
              ["Changed requirements", "A previously approved requirement is replaced or expanded."],
              ["Rush work", "The client asks for a faster deadline that changes your schedule or fee."],
              ["New stakeholder", "A late stakeholder introduces feedback that creates additional work."],
              ["Expanded handoff", "The client requests source files, training, support, or formats not included."],
            ].map(([title, description]) => (
              <div className="rounded-xl border border-[#e1e2dc] bg-white p-4" key={title}>
                <h3 className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 aria-hidden="true" className="size-4 text-[#176b55]" />
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#63665f]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Worked example: an extra landing page</h2>
          <p className={bodyClass}>
            Imagine a freelance designer agreed to deliver a five-page website.
            During development, the client asks for a separate campaign landing
            page with a form and analytics tracking.
          </p>
          <dl className="mt-6 grid gap-4 rounded-2xl border border-[#dfe1db] bg-white p-5 text-sm sm:grid-cols-2 sm:p-7">
            <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85877f]">Requested change</dt><dd className="mt-2 leading-6">Design and build one campaign landing page with a lead form and analytics events.</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85877f]">Why it is additional</dt><dd className="mt-2 leading-6">The accepted proposal includes five named pages; this campaign page is a sixth deliverable.</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85877f]">Additional price</dt><dd className="mt-2 text-lg font-semibold text-[#176b55]">$650</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85877f]">Schedule impact</dt><dd className="mt-2 text-lg font-semibold">+4 business days</dd></div>
          </dl>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>How to price the additional work</h2>
          <p className={bodyClass}>
            Use the same pricing method you use for normal project work, then
            account for coordination, testing, revisions, and schedule
            disruption—not only the visible production task.
          </p>
          <div className="mt-6 space-y-4">
            {[
              ["Fixed price", "Best when the added deliverables and revision allowance can be defined clearly."],
              ["Hourly estimate", "Useful when the requirement is uncertain. State the estimated range, rate, and approval needed before exceeding it."],
              ["Rush fee", "Appropriate when the requested deadline requires rescheduling other committed work."],
            ].map(([title, description]) => (
              <div className="border-l-2 border-[#176b55] pl-5" key={title}>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#63665f]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Short email to send with the request</h2>
          <div className="mt-6 rounded-2xl border border-[#dfe1db] bg-[#f7f8f5] p-5 text-sm leading-7 text-[#4f524c] sm:p-7">
            <p><strong>Subject:</strong> Approval needed: additional work for [Project name]</p>
            <p className="mt-4">Hi [Client name],</p>
            <p className="mt-3">I’m happy to help with [requested change]. Because this sits outside the currently agreed scope, I’ve documented the additional work, price, and schedule impact for you to review.</p>
            <p className="mt-3">Please review the change request here: [approval link]</p>
            <p className="mt-3">Once it is approved, I’ll add the work to the project schedule.</p>
            <p className="mt-3">Thanks,<br />[Your name]</p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Common mistakes to avoid</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[#5e615b]">
            <li><strong className="text-[#272925]">Starting before approval:</strong> urgency can turn an unapproved request into unpaid work.</li>
            <li><strong className="text-[#272925]">Using vague descriptions:</strong> “website updates” does not define what is included or excluded.</li>
            <li><strong className="text-[#272925]">Showing only the price:</strong> include delivery impact and assumptions so the full tradeoff is visible.</li>
            <li><strong className="text-[#272925]">Sounding accusatory:</strong> describe the difference from the original scope calmly and factually.</li>
            <li><strong className="text-[#272925]">Keeping approval in scattered messages:</strong> store the request and decision together.</li>
          </ul>
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
          <div className="overflow-hidden rounded-3xl bg-[#173e33] p-6 text-white shadow-[0_24px_65px_rgba(23,62,51,0.18)] sm:p-9">
            <Send aria-hidden="true" className="size-5 text-[#a9e5cc]" />
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Turn the template into a client-ready approval link.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/72">
              ScopeYes keeps the original scope, added work, price, schedule
              impact, and final client decision together in one record.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#a9e5cc] px-4 py-2.5 text-sm font-semibold text-[#173e33]" href="/sign-in">
                Create your free request
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white" href="/guides/scope-creep">
                Read the scope creep guide
              </Link>
            </div>
          </div>
        </section>
      </article>
    </InfoPageShell>
  );
}
