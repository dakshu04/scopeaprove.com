import type { Metadata } from "next";
import Link from "next/link";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/guides/client-asking-for-extra-work");
const title = "Client Asking for Extra Work? What Freelancers Should Say";
const description =
  "Learn how to respond when a client asks for extra work, price out-of-scope requests, handle additional revisions, and get approval before starting.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ScopeYes` },
  description,
  keywords: [
    "client asking for extra work",
    "how to tell a client work is out of scope",
    "how to charge clients for extra work",
    "client keeps asking for revisions",
    "extra work request template",
    "out of scope work freelancer",
    "freelance scope creep",
    "charge for extra revisions",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    type: "article",
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: absoluteUrl("/opengraph-image") }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl("/twitter-image")],
  },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    question: "How do I tell a client that work is out of scope?",
    answer:
      "Acknowledge the idea, connect it to the agreed scope, explain the price or schedule impact, and offer a clear choice. Keep the message about the work rather than blaming the client. Ask for written approval before starting.",
  },
  {
    question: "Can I charge for extra work that is not in the contract?",
    answer:
      "You can propose a separate fee for work outside the agreed scope. Review your contract and local requirements, describe the additional deliverables clearly, and obtain the client's written agreement to the price and timing before doing the work.",
  },
  {
    question: "What should I do if a client keeps asking for revisions?",
    answer:
      "Show which revision rounds were included and already used. Group the remaining feedback into a new paid revision round, state its fee and delivery date, and pause additional revisions until the client approves it.",
  },
  {
    question: "Should I do a small client change for free?",
    answer:
      "That can be a reasonable relationship decision when the effort is genuinely small. Label it as a one-time courtesy, define exactly what is included, and confirm that future additions will be estimated separately so the exception does not become the new scope.",
  },
  {
    question: "What if the client refuses the extra fee?",
    answer:
      "Return to the originally approved deliverables. Offer to remove the new request, reduce another deliverable to keep the budget stable, or move the additional work into a later phase. Do not quietly absorb work you cannot afford to provide.",
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
      datePublished: "2026-10-10",
      dateModified: "2026-10-10",
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
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": `${siteConfig.url}#website` },
      mainEntity: { "@id": `${pageUrl}#article` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Client asking for extra work",
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

const sectionClass = "border-b border-[#e3e3dc] py-10 last:border-0 sm:py-14";
const headingClass = "text-2xl font-semibold tracking-[-0.035em] text-[#1b1c18] sm:text-3xl";
const copyClass = "mt-4 max-w-3xl text-[15px] leading-7 text-[#5f615b]";
const scriptClass =
  "mt-4 rounded-2xl border border-[#dce0da] bg-white p-5 text-[15px] leading-7 text-[#424640] shadow-[0_10px_30px_rgba(31,49,42,0.04)] sm:p-6";

export default function ClientAskingForExtraWorkPage() {
  return (
    <InfoPageShell
      description={description}
      eyebrow="Freelancer client communication guide"
      title="When a client asks for extra work: what to say and what to charge"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <article className="mx-auto max-w-[900px] px-5 sm:px-6">
        <section className={sectionClass}>
          <div className="rounded-2xl border border-[#cfe0d8] bg-[#eef7f3] p-5 sm:p-6">
            <p className="text-base font-semibold text-[#21483b]">The short answer</p>
            <p className="mt-2 text-base leading-7 text-[#365e52]">
              Do not start the extra work immediately. Thank the client for the
              request, show how it changes the agreed scope, state the added fee
              and delivery impact, then ask for written approval. The request is
              not the problem; an invisible impact is.
            </p>
          </div>
          <p className={copyClass}>
            Most awkward scope conversations begin with harmless language:
            &quot;one more revision,&quot; &quot;a quick extra page,&quot; or &quot;while you are in
            there.&quot; A professional response does not need to sound defensive.
            It simply turns an informal idea into a clear decision.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>First, check whether the request is actually extra</h2>
          <p className={copyClass}>
            Compare the request with the proposal, statement of work, or project
            brief. It is probably outside scope when it adds a deliverable,
            changes an approved direction, uses more revision rounds, requires a
            new format or platform, introduces another stakeholder, or moves the
            deadline without reducing the work.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Deliverable", "Was this exact output promised?"],
              ["Quantity", "Has the agreed number of pages, concepts, or revisions increased?"],
              ["Direction", "Is the client replacing an approved decision with a new one?"],
              ["Timing", "Does the request require priority work or a shorter schedule?"],
            ].map(([label, text]) => (
              <div className="rounded-xl border border-[#e1e2dc] bg-white p-4" key={label}>
                <h3 className="font-semibold text-[#30332e]">{label}</h3>
                <p className="mt-1 text-sm leading-6 text-[#62645e]">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-[#62645e]">
            If the original wording is ambiguous, own that ambiguity. Clarify
            the boundary and agree on the next step instead of arguing about who
            should have understood it.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Use this four-part response</h2>
          <ol className="mt-6 space-y-5">
            {[
              ["Acknowledge", "Show that you understand the request and its goal."],
              ["Name the boundary", "Refer to the agreed deliverables or revision limit without accusing the client."],
              ["Explain the impact", "Give the added price, delivery change, and any assumptions."],
              ["Ask for a decision", "Offer a clear approve, revise, defer, or keep-the-original-scope choice."],
            ].map(([step, text], index) => (
              <li className="grid gap-3 sm:grid-cols-[3rem_1fr]" key={step}>
                <span className="grid size-10 place-items-center rounded-xl bg-[#176b55] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{step}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#62645e]">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={scriptClass}>
            &quot;Thanks for sending this over. I can add it. The original scope
            covers [agreed work], so [new request] would be an additional
            deliverable. It will add [fee] and move delivery from [old date] to
            [new date]. If that works for you, I will send a short change request
            for approval before I begin.&quot;
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Copy-and-adapt scripts for common situations</h2>
          <div className="mt-7 space-y-7">
            <div>
              <h3 className="text-lg font-semibold">A small additional request</h3>
              <p className={scriptClass}>
                &quot;Yes, I can add that. It sits outside the current deliverables,
                so I have estimated it separately at [price], with delivery on
                [date]. Would you like me to add it to the project, or should we
                continue with the original scope?&quot;
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Extra revisions</h3>
              <p className={scriptClass}>
                &quot;We have now completed the [number] revision rounds included in
                the project. I am happy to make this next set of changes as an
                additional revision round for [price]. Once approved, I can
                return it by [date].&quot;
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">An urgent request</h3>
              <p className={scriptClass}>
                &quot;I can prioritize this for [date]. Doing so will move [existing
                milestone] to [new date] and add [rush or additional fee]. If the
                current milestone must stay fixed, I can instead schedule the new
                request for [alternative date]. Which option works better?&quot;
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">A one-time courtesy</h3>
              <p className={scriptClass}>
                &quot;This is outside the original scope, but it is small enough that
                I can include this specific change as a one-time courtesy. Any
                further additions will be estimated separately before work
                begins. I will have this one ready by [date].&quot;
              </p>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>How to charge a client for extra work</h2>
          <p className={copyClass}>
            Use the pricing method that makes the risk easiest for both sides to
            understand. There is no need to turn every small request into a new
            contract, but the client should know what they are buying.
          </p>
          <div className="mt-6 space-y-4">
            {[
              ["Fixed add-on", "Best when the deliverable and acceptance criteria are clear. Quote one price for the defined change."],
              ["Hourly or daily", "Useful when discovery is still needed or the number of iterations cannot be estimated reliably. State the rate and an approval cap."],
              ["New phase or milestone", "Use this when the request is substantial enough to have its own deliverables, review point, schedule, and payment."],
            ].map(([label, text]) => (
              <div className="rounded-xl border border-[#e1e2dc] bg-white p-5" key={label}>
                <h3 className="font-semibold">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#62645e]">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-[#62645e]">
            Price the real impact: production time, communication, testing,
            handoff, and context switching. If the estimate includes uncertainty,
            explain the assumption or cap instead of hiding it.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>What to put in the written change request</h2>
          <p className={copyClass}>
            A useful record is short enough to read and specific enough to prevent
            a second misunderstanding. Include:
          </p>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#555750] sm:grid-cols-2">
            {[
              "The client request in plain language",
              "The exact added deliverables and exclusions",
              "Why the request differs from the original scope",
              "The additional price and payment timing",
              "The revised milestone or delivery date",
              "A clear approve, request changes, or decline decision",
            ].map((item) => (
              <li className="rounded-xl border border-[#e1e2dc] bg-white p-4" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-6 text-[#62645e]">
            Need a starting point? Use the free{" "}
            <Link className="font-semibold text-[#176b55] hover:underline" href="/guides/client-change-request-template">
              client change request template
            </Link>{" "}
            and keep the client&apos;s decision with the request.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Mistakes that make the conversation harder</h2>
          <ul className="mt-6 space-y-4 text-[15px] leading-7 text-[#5f615b]">
            <li><strong className="text-[#30332e]">Starting before approval.</strong> A finished task is much harder to price than a proposed change.</li>
            <li><strong className="text-[#30332e]">Calling the client difficult.</strong> Discuss the requested work and its impact, not the client&apos;s character.</li>
            <li><strong className="text-[#30332e]">Saying only &quot;extra charges may apply.&quot;</strong> Give a price or a defined method for calculating it.</li>
            <li><strong className="text-[#30332e]">Leaving approval in scattered messages.</strong> Put the scope, price, timing, and decision in one place.</li>
            <li><strong className="text-[#30332e]">Making every extra a silent freebie.</strong> Even a courtesy should be named so it does not quietly reset expectations.</li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Prevent the same problem on the next project</h2>
          <p className={copyClass}>
            Define deliverables, revision rounds, client responsibilities,
            exclusions, and a change process before kickoff. That does not stop
            clients from having new ideas. It gives those ideas a fair path into
            the project.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="rounded-lg border border-[#cad7d1] bg-white px-4 py-2.5 text-sm font-semibold text-[#176b55] hover:bg-[#eef7f3]" href="/guides/freelance-scope-of-work-template">
              Build a clearer scope of work
            </Link>
            <Link className="rounded-lg border border-[#cad7d1] bg-white px-4 py-2.5 text-sm font-semibold text-[#176b55] hover:bg-[#eef7f3]" href="/guides/scope-creep">
              Learn how to stop scope creep
            </Link>
          </div>
          <p className="mt-5 text-xs leading-5 text-[#777a73]">
            This guide is general business information, not legal advice. Contract
            requirements vary by location and engagement.
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
          <div className="rounded-2xl bg-[#173e33] p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a9e5cc]">
              A professional yes, with clear terms
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
              Turn an extra request into an approved change.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              ScopeYes keeps the request, added price, schedule impact, and client
              decision together before the new work begins.
            </p>
            <Link className="mt-6 inline-flex rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#173e33]" href="/sign-in">
              Create a free change request
            </Link>
          </div>
        </section>
      </article>
    </InfoPageShell>
  );
}
