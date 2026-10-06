import type { Metadata } from "next";
import Link from "next/link";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/guides/scope-creep");
const title = "What Is Scope Creep? A Practical Guide for Freelancers";
const description =
  "Learn what scope creep means, how to recognize it, and how freelancers can document, price, and approve project changes before extra work begins.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ScopeYes` },
  description,
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

const faqs = [
  {
    question: "What is scope creep in project work?",
    answer:
      "Scope creep is the gradual addition of work, deliverables, revisions, or requirements that were not included in the agreed project scope, without a matching agreement on price, time, or resources.",
  },
  {
    question: "Is every client change scope creep?",
    answer:
      "No. A change becomes controlled change management when it is documented, its cost and schedule impact are explained, and the client decides before the new work begins.",
  },
  {
    question: "How should a freelancer respond to extra work?",
    answer:
      "Acknowledge the request, compare it with the original scope, describe the added deliverables, state the price and timeline impact, and obtain written approval before starting.",
  },
  {
    question: "Does a change request replace a contract?",
    answer:
      "No. A change request supports the underlying agreement by documenting a proposed change and decision, but legal requirements vary and professional advice may be appropriate.",
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
      datePublished: "2026-10-06",
      dateModified: "2026-10-06",
      inLanguage: siteConfig.language,
      mainEntityOfPage: pageUrl,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Scope creep guide", item: pageUrl },
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

const sectionClass = "border-b border-[#e3e3dc] py-10 last:border-0 sm:py-14";
const headingClass = "text-2xl font-semibold tracking-[-0.035em] sm:text-3xl";
const copyClass = "mt-4 max-w-3xl text-[15px] leading-7 text-[#5f615b]";

export default function ScopeCreepGuidePage() {
  return (
    <InfoPageShell
      description={description}
      eyebrow="Freelancer guide"
      title="What is scope creep—and how do you stop it?"
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />

      <article className="mx-auto max-w-[900px] px-5 sm:px-6">
        <section className={sectionClass}>
          <p className="rounded-2xl border border-[#cfe0d8] bg-[#eef7f3] p-5 text-base leading-7 text-[#284b40] sm:p-6">
            <strong>Scope creep</strong> is work added beyond the agreed project
            scope without a matching decision about price, schedule, or
            resources. The solution is not to reject every change—it is to make
            each change visible and approved before work starts.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Common signs of scope creep</h2>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#555750] sm:grid-cols-2">
            {[
              "A ‘small tweak’ introduces a new page, feature, or deliverable.",
              "Revision rounds continue beyond the agreed limit.",
              "A stakeholder adds requirements after work is underway.",
              "The delivery date stays fixed while the workload grows.",
              "Extra work is approved informally in scattered messages.",
              "The final invoice contains charges the client did not expect.",
            ].map((item) => (
              <li className="rounded-xl border border-[#e1e2dc] bg-white p-4" key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>A five-step response to an out-of-scope request</h2>
          <ol className="mt-6 space-y-5">
            {[
              ["Acknowledge", "Confirm that you understand the client’s request without committing to do it immediately."],
              ["Compare", "Check the request against the signed proposal, statement of work, or recorded original scope."],
              ["Define", "Describe the added deliverables and any assumptions in specific, client-friendly language."],
              ["Price", "State the additional fee and explain any change to milestones or the delivery date."],
              ["Approve", "Ask the client to approve or request changes in writing before the additional work begins."],
            ].map(([step, text], index) => (
              <li className="grid gap-3 sm:grid-cols-[3rem_1fr]" key={step}>
                <span className="grid size-10 place-items-center rounded-xl bg-[#176b55] text-sm font-semibold text-white">{index + 1}</span>
                <div><h3 className="font-semibold">{step}</h3><p className="mt-1 text-sm leading-6 text-[#62645e]">{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>A simple client change-request template</h2>
          <p className={copyClass}>Use this structure in a formal tool or adapt it for an email:</p>
          <div className="mt-5 rounded-2xl border border-[#dcded7] bg-white p-5 text-sm leading-7 shadow-[0_10px_30px_rgba(31,49,42,0.04)] sm:p-6">
            <p><strong>Requested change:</strong> [Clear description of the added work]</p>
            <p><strong>Why it is additional:</strong> [How it differs from the original scope]</p>
            <p><strong>Deliverables:</strong> [Exact outputs included in this change]</p>
            <p><strong>Additional price:</strong> [Amount and currency]</p>
            <p><strong>Schedule impact:</strong> [Extra days or new delivery date]</p>
            <p><strong>Decision:</strong> Approve the change or request revisions before work begins.</p>
          </div>
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
          <div className="rounded-2xl bg-[#173e33] p-6 text-white sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">Turn the next extra request into a clear decision.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">ScopeYes keeps the original scope, additional work, price, schedule impact, and client response together.</p>
            <Link className="mt-6 inline-flex rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#173e33]" href="/sign-in">Create a free change request</Link>
          </div>
        </section>
      </article>
    </InfoPageShell>
  );
}
