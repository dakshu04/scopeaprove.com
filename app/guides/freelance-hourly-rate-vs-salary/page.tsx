import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/guides/freelance-hourly-rate-vs-salary");
const title = "Freelance Hourly Rate vs Salary: A Practical Comparison";
const description =
  "Convert an employee salary into a sustainable freelance rate by accounting for benefits, expenses, taxes, unpaid time, and non-billable hours.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ScopeYes` },
  description,
  keywords: [
    "freelance hourly rate vs salary",
    "salary to freelance rate",
    "convert salary to contractor rate",
    "freelance rate from salary",
    "employee to freelancer rate",
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
    question: "Is a freelance hourly rate usually higher than an employee hourly rate?",
    answer:
      "It usually needs to be. A freelancer funds business expenses, unpaid administration, time between projects, time off, and benefits that an employer may otherwise provide. The exact difference depends on costs, location, demand, and billable capacity.",
  },
  {
    question: "Can I convert salary to a freelance rate by dividing by 2,080?",
    answer:
      "That produces an employee-equivalent hourly wage, not a sustainable freelance rate. It assumes every working hour is paid and ignores overhead, unpaid leave, sales time, and employer-funded benefits.",
  },
  {
    question: "Should I tell a client how my rate was calculated?",
    answer:
      "You can explain the scope, assumptions, and value without exposing personal income details. Clients generally need a clear price and deliverables, while your internal rate model helps ensure that price is sustainable.",
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

export default function FreelanceRateVsSalaryPage() {
  return (
    <InfoPageShell
      description={description}
      eyebrow="Freelance pricing guide"
      title="Freelance hourly rate vs salary"
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
              An employee wage and a freelance rate pay for different things.
              Dividing a salary by 2,080 hours gives a useful reference point,
              but it does not cover the cost or uncertainty of running a business.
            </p>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>What an employee salary may include</h2>
          <p className={copyClass}>
            Salary is only one part of employee compensation. Depending on the
            employer and country, the total package may also include paid leave,
            employer payroll contributions, insurance, retirement contributions,
            equipment, office space, software, training, and predictable work.
          </p>
          <p className={copyClass}>
            A freelancer must either fund those items directly or accept that
            they are absent. That is why matching the employee-equivalent wage
            can leave a freelance business short of cash even when the calendar
            looks full.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>The four adjustments from salary to freelance rate</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["Benefits and business costs", "Add the annual value of costs and benefits the business must now pay."],
              ["Unpaid time off", "Reduce working weeks for vacation, holidays, illness, and expected gaps."],
              ["Non-billable work", "Remove time spent on sales, administration, marketing, and operations."],
              ["Risk and profit", "Add room for uncertainty, reinvestment, delayed payments, and growth."],
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
          <h2 className={headingClass}>Example salary-to-rate conversion</h2>
          <p className={copyClass}>
            Imagine a freelancer wants $60,000 in personal take-home income,
            expects $12,000 in annual business costs, reserves 25% for taxes,
            works 46 weeks, and can bill 60% of a 40-hour week.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#d8ded9] bg-white">
            <dl className="divide-y divide-[#e6e8e3] text-sm">
              {[
                ["Gross income needed", "$60,000 ÷ 0.75 = $80,000"],
                ["Annual revenue target", "$80,000 + $12,000 = $92,000"],
                ["Annual billable hours", "46 × 40 × 0.60 = 1,104"],
                ["Hourly financial floor", "$92,000 ÷ 1,104 = $83.33"],
              ].map(([label, value]) => (
                <div className="grid gap-1 p-4 sm:grid-cols-[1fr_auto] sm:gap-6" key={label}>
                  <dt className="font-semibold text-[#343832]">{label}</dt>
                  <dd className="font-mono text-[#5f645d]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#777a73]">
            This example is illustrative and is not tax or financial advice.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>Use the result as a floor, not a ceiling</h2>
          <p className={copyClass}>
            The calculation answers whether a rate can support the business under
            the assumptions entered. It does not measure the client&apos;s value,
            your market position, intellectual property rights, urgency, or
            project risk. Quote above the floor when those factors require it.
          </p>
          <p className={copyClass}>
            For fixed-price work, estimate the full effort and multiply it by the
            floor before adding uncertainty and value. Define deliverables and
            revision limits with the free freelance scope of work template, then
            price later additions as separate changes.
          </p>
          <Link className="mt-5 inline-flex font-semibold text-[#176b55] hover:underline" href="/guides/freelance-scope-of-work-template">
            Use the freelance scope of work template
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
          <div className="rounded-3xl bg-[#173e33] p-6 text-white sm:p-9">
            <h2 className="text-2xl font-semibold tracking-[-0.035em]">Replace rough multipliers with your real numbers.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              Calculate a sustainable freelance pay target from income, costs,
              time off, and the percentage of your week you can actually invoice.
            </p>
            <Link className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#a9e5cc] px-4 py-2.5 text-sm font-semibold text-[#173e33]" href="/freelance-hourly-rate-calculator">
              Use the freelance pay calculator
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </article>
    </InfoPageShell>
  );
}
