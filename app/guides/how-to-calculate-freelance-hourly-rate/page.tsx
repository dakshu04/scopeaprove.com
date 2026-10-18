import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/guides/how-to-calculate-freelance-hourly-rate");
const title = "How to Calculate Your Freelance Hourly Rate";
const description =
  "Learn how to calculate a sustainable freelance hourly rate using income goals, business expenses, taxes, time off, and realistic billable hours.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ScopeYes` },
  description,
  keywords: [
    "how to calculate freelance hourly rate",
    "freelance rate formula",
    "calculate freelancer rate",
    "freelance hourly rate guide",
    "freelancer pricing formula",
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

const faqs = [
  {
    question: "What is the formula for a freelance hourly rate?",
    answer:
      "Estimate the annual revenue your business needs, then divide it by realistic annual billable hours. Revenue should cover your desired take-home income, business expenses, and tax reserve. Billable hours should exclude vacation and non-client work.",
  },
  {
    question: "Why should I not divide a salary by 2,080 hours?",
    answer:
      "That assumes 52 weeks of paid, fully billable 40-hour work. Freelancers also spend time on sales, proposals, administration, learning, and time off, while paying business costs that an employer may otherwise cover.",
  },
  {
    question: "Should profit be included in a freelance rate?",
    answer:
      "A rate can include a profit or contingency margin above the financial floor. That margin helps the business absorb uncertainty, invest in tools and training, and avoid turning every unexpected cost into lost personal income.",
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

export default function CalculateFreelanceHourlyRateGuidePage() {
  return (
    <InfoPageShell
      description={description}
      eyebrow="Freelance pricing guide"
      title="How to calculate your freelance hourly rate"
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
              <strong>The short formula:</strong> divide the annual revenue your
              business needs by the hours you can realistically invoice. The
              hard part is estimating both numbers honestly.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#176b55] px-4 py-2.5 text-sm font-semibold text-white"
              href="/freelance-hourly-rate-calculator"
            >
              Calculate my freelance rate
              <Calculator aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Step 1: set the take-home income you need</h2>
          <p className={copyClass}>
            Start with personal income rather than an attractive market rate.
            Decide how much you need to keep over a year after business costs and
            your tax reserve. Use a realistic target that covers normal living
            costs, savings, and the income stability you expect from the business.
          </p>
          <p className={copyClass}>
            Treat tax as a planning reserve, not a universal percentage. Tax
            rules depend on location, deductions, and business structure, so use
            professional advice when you need an exact figure.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Step 2: add the full cost of freelancing</h2>
          <p className={copyClass}>
            A client rate must fund the business as well as your personal income.
            Include recurring and occasional costs rather than only the software
            subscriptions you pay every month.
          </p>
          <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#555850] sm:grid-cols-2">
            {[
              "Software, hosting, and cloud services",
              "Insurance, accounting, and legal support",
              "Computer equipment and replacement reserve",
              "Marketing, sales, and professional memberships",
              "Training, conferences, and certifications",
              "Payment fees, bad debt, and contingency",
            ].map((item) => (
              <li className="flex gap-2 rounded-xl border border-[#e1e2dc] bg-white p-4" key={item}>
                <CheckCircle2 aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#176b55]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Step 3: calculate realistic billable hours</h2>
          <p className={copyClass}>
            Working hours and billable hours are not the same. Remove vacation
            and holidays first. Then estimate the percentage of each remaining
            week that can actually be charged to clients after proposals, calls,
            email, bookkeeping, marketing, and professional development.
          </p>
          <div className="mt-6 rounded-2xl border border-[#d8ded9] bg-white p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#70766f]">Example</p>
            <p className="mt-3 text-sm leading-7 text-[#4e524c]">
              At 40 working hours per week, 46 working weeks, and 60% billable
              time, annual billable capacity is <strong>1,104 hours</strong>:
              40 × 46 × 0.60.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Step 4: divide revenue by billable capacity</h2>
          <div className="mt-6 rounded-2xl bg-[#173e33] p-6 text-white sm:p-8">
            <p className="font-mono text-sm leading-7 text-white/85 sm:text-base">
              Revenue target = business expenses + gross income required
              <br />
              Hourly floor = revenue target ÷ annual billable hours
            </p>
          </div>
          <p className={copyClass}>
            The result is a financial floor, not a promise to sell every hour at
            exactly that price. Expertise, urgency, risk, demand, licensing, and
            the value of the result can justify a higher rate or a fixed project
            fee.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Turn the hourly floor into project pricing</h2>
          <p className={copyClass}>
            Multiply the expected work by your hourly floor to create a minimum
            project price. Then include discovery, communication, testing,
            revisions, handoff, and uncertainty. If the client adds deliverables
            later, document the new work and its effect instead of quietly
            absorbing it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="rounded-lg border border-[#cad7d1] bg-white px-4 py-2.5 text-sm font-semibold text-[#176b55]" href="/guides/freelance-hourly-rate-vs-salary">
              Compare salary and freelance rates
            </Link>
            <Link className="rounded-lg border border-[#cad7d1] bg-white px-4 py-2.5 text-sm font-semibold text-[#176b55]" href="/scope-creep-cost-calculator">
              Price scope creep
            </Link>
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
          <div className="rounded-3xl bg-[#173e33] p-6 text-white sm:p-9">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">Calculate your rate with your own numbers.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              The free calculator includes expenses, tax reserve, vacation, and
              non-billable time—and keeps every input in your browser.
            </p>
            <Link className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#a9e5cc] px-4 py-2.5 text-sm font-semibold text-[#173e33]" href="/freelance-hourly-rate-calculator">
              Open the free calculator
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </article>
    </InfoPageShell>
  );
}
