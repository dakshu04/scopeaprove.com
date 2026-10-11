import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Gauge, LockKeyhole, ReceiptText } from "lucide-react";
import Link from "next/link";

import { PublicFooter } from "@/components/marketing/public-footer";
import { PublicHeader } from "@/components/marketing/public-header";
import { ScopeCreepCostCalculatorFaq } from "@/components/scope-creep-cost-calculator-faq";
import { ScopeCreepCostCalculatorWidget } from "@/components/scope-creep-cost-calculator-widget";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";
import { createScopeCreepCostCalculatorSchema, type ScopeCreepCalculatorFaq, type ScopeCreepCalculatorStep } from "@/lib/scope-creep-cost-calculator-schema";

const pageTitle = "Free Scope Creep Cost Calculator";
const metadataTitle = "Free Scope Creep Cost Calculator | ScopeYes";
const description = "Calculate the cost of scope creep, rush work, and project delays. Get a free client-ready change order estimate in under a minute.";
const pageUrl = absoluteUrl("/scope-creep-cost-calculator");

const steps = [
  { name: "Enter the extra hours", text: "Estimate the additional time the new request will take beyond the agreed scope." },
  { name: "Add your rate and project fee", text: "Use your normal hourly rate and original project price to see the cost in context." },
  { name: "Account for urgency", text: "Add an optional rush premium and the number of days the request adds to delivery." },
  { name: "Copy the estimate", text: "Copy the itemized total and timeline impact, then put it into a formal change request." },
] as const satisfies readonly ScopeCreepCalculatorStep[];

const faqs = [
  { question: "How do I calculate the cost of scope creep?", answer: "Multiply the extra hours by your hourly rate, then add any rush or priority-work premium. Also record the timeline impact. This calculator handles the arithmetic and gives you a clear change-order total." },
  { question: "Should I charge for small client changes?", answer: "If a request falls outside the agreed scope, price it even when the amount is small. You can choose to waive the fee, but documenting the value and schedule impact keeps expectations clear." },
  { question: "What is a reasonable rush fee for freelance work?", answer: "Rush fees often reflect the disruption caused by reprioritizing work, not only the hours involved. Choose a percentage that matches your availability, the deadline, and any impact on other commitments." },
  { question: "Does this calculator create a legally binding change order?", answer: "No. It creates an estimate to support a change request. A binding agreement depends on your contract, local law, and how the client accepts the change." },
  { question: "Is my project data uploaded or stored?", answer: "No. The calculation runs locally in your browser. ScopeYes does not receive or store the numbers you enter into this free calculator." },
  { question: "What should a freelance change request include?", answer: "Include the requested work, why it is outside scope, the additional price, any revised delivery date, and a clear approve-or-decline decision before work starts." },
] as const satisfies readonly ScopeCreepCalculatorFaq[];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: metadataTitle },
    description,
    keywords: ["scope creep cost calculator", "freelance change order calculator", "scope change calculator", "extra work cost calculator"],
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      title: metadataTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: { card: "summary_large_image", title: metadataTitle, description, images: [absoluteUrl("/twitter-image")] },
  };
}

export default function ScopeCreepCostCalculatorPage() {
  const structuredData = createScopeCreepCostCalculatorSchema({ description, faqs, steps, title: pageTitle });

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f8f8f4] text-[#1b1c18] selection:bg-[#bce8d7] dark:bg-[#101814] dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className="sr-only z-[100] rounded-md bg-white px-4 py-2 font-semibold text-[#176b55] focus:not-sr-only focus:fixed focus:left-4 focus:top-4" href="#main-content">Skip to calculator</a>
      <PublicHeader />

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-[#dfe6e1] bg-[radial-gradient(circle_at_85%_10%,#dff3e9_0,transparent_34%),linear-gradient(180deg,#fff_0%,#f6f8f5_100%)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_85%_10%,#1e5745_0,transparent_36%),linear-gradient(180deg,#15231e_0%,#101814_100%)]">
          <div className="mx-auto max-w-[1180px] px-5 pt-5 sm:px-6 sm:pt-6">
            <nav aria-label="Breadcrumb" className="text-xs text-[#77817c] dark:text-white/45">
              <ol className="flex items-center gap-2">
                <li><Link className="hover:text-[#176b55] dark:hover:text-[#9be2c4]" href="/">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Scope creep cost calculator</li>
              </ol>
            </nav>
          </div>
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 pb-12 pt-8 sm:px-6 sm:pb-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:pb-20 lg:pt-10">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#cfe0d8] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#176b55] shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-[#a9e5cc]">
                <CheckCircle2 aria-hidden="true" className="size-3.5" /> Free freelance calculator
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-[#18231f] dark:text-white sm:text-5xl lg:text-[3.7rem] lg:leading-[1.02]">
                Scope creep cost calculator
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#5f6a65] dark:text-white/65 sm:text-lg sm:leading-8">
                Turn unplanned client requests into a clear price and timeline impact—before the extra work erodes your margin.
              </p>
              <ul className="mt-7 space-y-3 text-sm font-medium text-[#46524c] dark:text-white/70">
                {[
                  "Instant, itemized change-order estimate",
                  "Optional rush fee and schedule impact",
                  "No signup and nothing uploaded",
                ].map((item) => <li className="flex items-center gap-2.5" key={item}><CheckCircle2 aria-hidden="true" className="size-4 text-[#238064]" />{item}</li>)}
              </ul>
            </div>
            <ScopeCreepCostCalculatorWidget />
          </div>
        </section>

        <section className="mx-auto max-w-[1040px] px-5 py-16 sm:px-6 sm:py-24" aria-labelledby="how-to-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55] dark:text-[#9be2c4]">Four simple steps</p>
          <h2 id="how-to-heading" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">How to use the Scope Creep Cost Calculator</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {steps.map((step, index) => (
              <article className="rounded-2xl border border-[#dfe4e0] bg-white p-6 shadow-[0_10px_35px_rgba(25,50,41,0.05)] dark:border-white/10 dark:bg-white/5" id={`step-${index + 1}`} key={step.name}>
                <span className="grid size-9 place-items-center rounded-full bg-[#e5f2ec] text-sm font-bold text-[#176b55] dark:bg-[#9be2c4]/10 dark:text-[#9be2c4]">{index + 1}</span>
                <h3 className="mt-5 text-lg font-semibold">{step.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#69716d] dark:text-white/60">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#dfe4e0] bg-white dark:border-white/10 dark:bg-white/[0.03]" aria-labelledby="why-heading">
          <div className="mx-auto max-w-[1040px] px-5 py-16 sm:px-6 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55] dark:text-[#9be2c4]">Protect the work</p>
              <h2 id="why-heading" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Why use a scope creep cost calculator?</h2>
              <p className="mt-4 leading-7 text-[#68716c] dark:text-white/60">A fast estimate turns a vague favor into a concrete business decision. It gives both sides the same price, schedule, and scope before anyone commits.</p>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                { icon: Gauge, title: "Price in seconds", text: "See labor, rush fees, and total project impact while the request is still fresh." },
                { icon: ReceiptText, title: "Explain the number", text: "Share an itemized estimate instead of dropping an unexplained fee into an email." },
                { icon: LockKeyhole, title: "Keep details private", text: "Every calculation happens in your browser. Project amounts are never uploaded." },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon aria-hidden="true" className="size-6 text-[#176b55] dark:text-[#9be2c4]" />
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68716c] dark:text-white/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1040px] px-5 py-16 sm:px-6 sm:py-24" aria-labelledby="faq-heading">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55] dark:text-[#9be2c4]">Common questions</p>
          <h2 id="faq-heading" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Frequently Asked Questions</h2>
          <ScopeCreepCostCalculatorFaq items={faqs} />

          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[#dfe4e0] bg-white p-5 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-[#68716c] dark:text-white/60">
              Not sure what hourly rate to use for extra work?
            </p>
            <Link className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#176b55] hover:underline dark:text-[#9be2c4]" href="/freelance-hourly-rate-calculator">
              Calculate your freelance hourly rate <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <aside className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-[#173d32] px-6 py-9 text-white shadow-[0_28px_70px_rgba(23,61,50,0.18)] sm:px-10 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-10" aria-labelledby="conversion-heading">
            <div aria-hidden="true" className="absolute -right-16 -top-20 size-64 rounded-full bg-[#82d5b4]/15 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9e5cc]">You priced the change. Now get the decision.</p>
              <h2 id="conversion-heading" className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Turn this estimate into a client-approved change request.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">ScopeYes helps you document the request, show its price and timeline impact, and record approval before the extra work begins.</p>
            </div>
            <Link className="relative mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#a9e5cc] px-5 py-3 text-sm font-semibold text-[#173d32] transition-all hover:-translate-y-0.5 hover:bg-[#baf0da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173d32] lg:mt-0" href="/sign-in">
              Create a change request <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </aside>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
