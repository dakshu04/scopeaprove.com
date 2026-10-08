import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/guides/freelance-scope-of-work-template");
const title = "Freelance Scope of Work Template: Define Every Project Clearly";
const description =
  "Use this free freelance scope of work template to define deliverables, revisions, deadlines, payment, exclusions, and a clear process for client changes.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ScopeYes` },
  description,
  keywords: [
    "freelance scope of work template",
    "scope of work for freelancers",
    "freelance project scope template",
    "freelance contract scope of work",
    "how to write a scope of work",
    "freelancer scope creep",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    type: "article",
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "ScopeYes freelance scope of work guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl("/twitter-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const faqs = [
  {
    question: "What is a scope of work for a freelancer?",
    answer:
      "A freelance scope of work is the part of a project agreement that defines the work to be completed, the deliverables, deadlines, revision limits, responsibilities, exclusions, payment milestones, and the process for handling changes.",
  },
  {
    question: "What should a freelance scope of work include?",
    answer:
      "It should include the project objective, specific deliverables, timeline, client responsibilities, revision allowance, exclusions, fees, acceptance criteria, and a written change-request process.",
  },
  {
    question: "How do freelancers prevent scope creep?",
    answer:
      "Start with a specific written scope, list what is not included, limit revisions, and document every added request with its price and schedule impact before beginning the extra work.",
  },
  {
    question: "Does this template replace a freelance contract?",
    answer:
      "No. A scope of work describes project-specific work and can form part of a broader contract, but it does not replace legal advice or all contract terms required for your situation.",
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
      datePublished: "2026-10-09",
      dateModified: "2026-10-09",
      inLanguage: siteConfig.language,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      author: {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#software` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Freelance scope of work template",
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
const copyClass = "mt-4 text-[15px] leading-7 text-[#5e615b]";

export default function FreelanceScopeOfWorkTemplatePage() {
  return (
    <InfoPageShell
      description={description}
      eyebrow="Free freelancer template"
      title="Freelance scope of work template"
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
              A strong scope of work makes the project easy to understand before
              anyone starts. It defines the result, the boundaries, and what
              happens when the client asks for something new.
            </p>
            <a className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#176b55] px-4 py-2.5 text-sm font-semibold text-white" href="#copy-template">
              Copy the free template
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </section>

        <section className={sectionClass} id="copy-template">
          <h2 className={headingClass}>Copy-and-paste freelance scope of work template</h2>
          <p className={copyClass}>
            Replace the bracketed text and make every deliverable measurable.
            Attach the finished scope to your proposal or freelance agreement.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#dcded8] bg-white shadow-[0_14px_38px_rgba(31,49,42,0.06)]">
            <div className="flex items-center gap-2 border-b border-[#e5e6e1] bg-[#f5f6f2] px-5 py-3 text-xs font-semibold text-[#4f534d]">
              <FileText aria-hidden="true" className="size-4 text-[#176b55]" />
              Freelance project scope of work
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap p-5 font-sans text-sm leading-7 text-[#454842] sm:p-7">{`Project: [Project name]
Client: [Client name]
Freelancer: [Your name or business]
Effective date: [Date]

1. Project objective
[Describe the business result this project should achieve.]

2. Deliverables
- [Specific deliverable, format, and quantity]
- [Specific deliverable, format, and quantity]
- [Required handoff files or access]

3. Timeline and milestones
- [Milestone]: [Delivery date]
- [Milestone]: [Delivery date]
Final delivery: [Date]

4. Client responsibilities
[Feedback deadlines, content, access, approvals, and a single decision-maker.]

5. Revisions
[Number] revision rounds are included. A revision changes an included deliverable; a new deliverable or direction is a scope change.

6. Not included
- [Excluded service or deliverable]
- [Ongoing maintenance, extra formats, or third-party costs]

7. Fees and payment schedule
Total project fee: [Amount and currency]
Payment schedule: [Deposit and milestone terms]

8. Acceptance
[Explain how the client reviews and accepts each deliverable.]

9. Scope changes
Work not listed above requires a written change request showing the added work, price, and schedule impact. The freelancer will begin changed work only after the client approves it.`}</pre>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>The nine parts that protect a freelance project</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Project objective", "State the outcome so decisions stay tied to the real goal."],
              ["Specific deliverables", "Name the quantity, format, size, platform, and handoff for each item."],
              ["Milestones", "Connect work stages to dates, feedback, approvals, and payments."],
              ["Client responsibilities", "Define when the client must supply content, access, and decisions."],
              ["Revision allowance", "Say how many rounds are included and what counts as a revision."],
              ["Exclusions", "List common assumptions that are not part of the quoted fee."],
              ["Fees", "Show the total, currency, deposit, milestones, taxes, and late-payment terms."],
              ["Acceptance criteria", "Explain how work is reviewed and when it becomes accepted."],
              ["Change process", "Require approval of added cost and time before extra work starts."],
            ].map(([item, explanation]) => (
              <div className="rounded-xl border border-[#e1e2dc] bg-white p-5" key={item}>
                <h3 className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-[#176b55]" />
                  {item}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#63665f]">{explanation}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Example: freelance web design scope</h2>
          <p className={copyClass}>
            “Design and build a responsive five-page marketing website” is still
            too broad. A clearer scope names the pages, breakpoints, content
            responsibility, integrations, revision rounds, browser support, and
            launch handoff.
          </p>
          <div className="mt-6 grid gap-4 rounded-2xl border border-[#dfe1db] bg-white p-5 text-sm sm:grid-cols-2 sm:p-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85877f]">Included</p>
              <p className="mt-2 leading-6">Five named pages, responsive layouts, one contact form, basic on-page SEO, and two revision rounds.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#85877f]">Not included</p>
              <p className="mt-2 leading-6">Copywriting, brand identity, paid plugins, extra pages, analytics dashboards, and ongoing maintenance.</p>
            </div>
          </div>
          <p className={copyClass}>
            If the client later requests a sixth page, turn it into a documented
            change instead of silently absorbing it. Use the free{" "}
            <Link className="font-semibold text-[#176b55] underline underline-offset-4" href="/guides/client-change-request-template">
              client change request template
            </Link>{" "}
            to state the added fee and delivery impact.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>How ScopeYes fits into the workflow</h2>
          <p className={copyClass}>
            Your scope of work sets the starting boundary. ScopeYes helps when
            the project changes: record the new request, explain its price and
            schedule impact, and send one private link for the client’s decision.
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["1", "Record the baseline", "Add the original project scope so the agreed boundary stays visible."],
              ["2", "Document the change", "Describe the added deliverables, fee, and timeline impact."],
              ["3", "Get a decision", "Send a focused approval link before beginning the additional work."],
            ].map(([number, item, explanation]) => (
              <li className="rounded-xl border border-[#e1e2dc] bg-white p-5" key={number}>
                <span className="grid size-8 place-items-center rounded-full bg-[#176b55] text-xs font-semibold text-white">{number}</span>
                <h3 className="mt-4 font-semibold">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-[#63665f]">{explanation}</p>
              </li>
            ))}
          </ol>
          <Link className="mt-6 inline-flex items-center gap-2 font-semibold text-[#176b55] hover:underline" href="/guides/scope-creep">
            Learn how to recognize and stop scope creep
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
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
            <ShieldCheck aria-hidden="true" className="size-5 text-[#a9e5cc]" />
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Keep new client requests from quietly changing the deal.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              Start free with ScopeYes and give every added deliverable a clear
              price, timeline impact, and recorded client decision.
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
