import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { FreelanceHourlyRateCalculatorFaq } from "@/components/freelance-hourly-rate-calculator-faq";
import { FreelanceHourlyRateCalculator } from "@/components/calculators/freelance-hourly-rate-calculator";
import { PublicFooter } from "@/components/marketing/public-footer";
import { PublicHeader } from "@/components/marketing/public-header";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";
import {
  createFreelanceRateCalculatorSchema,
  type FreelanceRateFaq,
  type FreelanceRateStep,
} from "@/lib/freelance-hourly-rate-calculator-schema";

const pageTitle = "Free Freelance Hourly Rate Calculator";
const metadataTitle = "Freelance Hourly Rate Calculator (Free) | ScopeYes";
const description =
  "Use this free freelance hourly rate and pay calculator to price income goals, taxes, expenses, time off, and realistic billable hours.";
const pageUrl = absoluteUrl("/freelance-hourly-rate-calculator");

const steps = [
  {
    name: "Set your take-home goal",
    text: "Enter the annual amount you want to keep after business costs and your tax reserve.",
  },
  {
    name: "Add the true cost of freelancing",
    text: "Include annual software, insurance, equipment, accounting, and other business expenses.",
  },
  {
    name: "Plan realistic billable time",
    text: "Account for vacation and the time spent on sales, admin, proposals, and other non-billable work.",
  },
  {
    name: "Use your sustainable rate",
    text: "Copy the result and use it as the baseline for hourly work and fixed-price project estimates.",
  },
] as const satisfies readonly FreelanceRateStep[];

const faqs = [
  {
    question: "How do I calculate my freelance hourly rate?",
    answer:
      "Add annual business expenses to the gross income needed to reach your take-home goal after your tax reserve. Divide that revenue target by the number of hours you can realistically bill each year.",
  },
  {
    question: "Is this also a freelance pay calculator?",
    answer:
      "Yes. It works backward from the annual take-home pay you want, then accounts for business expenses, a tax reserve, time off, and non-billable work to calculate the hourly rate and monthly revenue target your freelance business needs.",
  },
  {
    question: "What does billable percentage mean for a freelancer?",
    answer:
      "Billable percentage is the share of working time you can charge to clients. The rest goes to proposals, marketing, bookkeeping, email, learning, and other work required to run the business.",
  },
  {
    question: "Should a freelance rate include taxes and business expenses?",
    answer:
      "Yes. A sustainable rate needs to cover business costs and leave room for taxes as well as personal income. This calculator treats the tax percentage as a planning reserve, not tax advice.",
  },
  {
    question: "How much vacation should I include in my freelance rate?",
    answer:
      "Use the time you genuinely want or expect to take off, including holidays. Fewer working weeks mean fewer billable hours, so the rate must be higher to reach the same annual goal.",
  },
  {
    question: "Can I use an hourly rate to price fixed-fee projects?",
    answer:
      "Yes. Multiply the estimated project hours by your target rate to establish a minimum price, then adjust for risk, complexity, value, revisions, and urgency before presenting a fixed fee.",
  },
  {
    question: "When should I raise my freelance rate?",
    answer:
      "Recalculate when your expenses, income target, availability, expertise, or demand changes. For existing projects, follow the pricing and notice terms in your agreement rather than changing an approved fee without discussion.",
  },
] as const satisfies readonly FreelanceRateFaq[];

export function generateMetadata(): Metadata {
  return {
    title: { absolute: metadataTitle },
    description,
    keywords: [
      "freelance hourly rate calculator",
      "freelance pay calculator",
      "freelancer hourly rate calculator",
      "freelancer rate calculator",
      "calculate freelance rate",
      "contractor hourly rate calculator",
      "freelance pricing calculator",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      title: metadataTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description,
    },
  };
}

export default function FreelanceHourlyRateCalculatorPage() {
  const structuredData = createFreelanceRateCalculatorSchema({
    description,
    faqs,
    steps,
    title: pageTitle,
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f8f8f4] text-[#1b1c18] selection:bg-[#bce8d7] dark:bg-[#101814] dark:text-white">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <a
        className="sr-only z-[100] rounded-md bg-white px-4 py-2 font-semibold text-[#176b55] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Skip to calculator
      </a>
      <PublicHeader />

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-[#dfe6e1] bg-[radial-gradient(circle_at_85%_10%,#dff3e9_0,transparent_34%),linear-gradient(180deg,#fff_0%,#f6f8f5_100%)] dark:border-white/10 dark:bg-[radial-gradient(circle_at_85%_10%,#1e5745_0,transparent_36%),linear-gradient(180deg,#15231e_0%,#101814_100%)]">
          <div className="mx-auto max-w-[1240px] px-5 pt-5 sm:px-6 sm:pt-6">
            <nav aria-label="Breadcrumb" className="text-xs text-[#77817c] dark:text-white/45">
              <ol className="flex items-center gap-2">
                <li>
                  <Link className="hover:text-[#176b55] dark:hover:text-[#9be2c4]" href="/">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Freelance hourly rate calculator</li>
              </ol>
            </nav>
          </div>
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-12 pt-8 sm:px-6 sm:pb-16 lg:pb-20 lg:pt-10 xl:grid-cols-[0.62fr_1.38fr] xl:items-center">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#cfe0d8] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#176b55] shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-[#a9e5cc]">
                <CheckCircle2 aria-hidden="true" className="size-3.5" /> Free freelance calculator
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-[#18231f] dark:text-white sm:text-5xl lg:text-[3.7rem] lg:leading-[1.02]">
                Freelance hourly rate calculator
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#5f6a65] dark:text-white/65 sm:text-lg sm:leading-8">
                Use this freelance pay calculator to find the hourly rate that
                covers your income goal, taxes, expenses, time off, and the hours
                clients never see.
              </p>
              <ul className="mt-7 space-y-3 text-sm font-medium text-[#46524c] dark:text-white/70">
                {[
                  "Built around realistic billable hours",
                  "Includes taxes, overhead, and vacation",
                  "No signup and nothing uploaded",
                ].map((item) => (
                  <li className="flex items-center gap-2.5" key={item}>
                    <CheckCircle2 aria-hidden="true" className="size-4 text-[#238064]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <FreelanceHourlyRateCalculator />
          </div>
        </section>

        <section
          aria-labelledby="how-to-heading"
          className="mx-auto max-w-[1040px] px-5 py-16 sm:px-6 sm:py-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55] dark:text-[#9be2c4]">
            Price from the real numbers
          </p>
          <h2
            className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
            id="how-to-heading"
          >
            How to use the Freelance Hourly Rate Calculator
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {steps.map((step, index) => (
              <article
                className="rounded-2xl border border-[#dfe4e0] bg-white p-6 shadow-[0_10px_35px_rgba(25,50,41,0.05)] dark:border-white/10 dark:bg-white/5"
                id={`step-${index + 1}`}
                key={step.name}
              >
                <span className="grid size-9 place-items-center rounded-full bg-[#e5f2ec] text-sm font-bold text-[#176b55] dark:bg-[#9be2c4]/10 dark:text-[#9be2c4]">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[#69716d] dark:text-white/60">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="formula-heading"
          className="border-y border-[#dfe4e0] bg-white dark:border-white/10 dark:bg-white/[0.03]"
        >
          <div className="mx-auto grid max-w-[1040px] gap-10 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55] dark:text-[#9be2c4]">
                The formula
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
                id="formula-heading"
              >
                How to calculate a freelance hourly rate
              </h2>
              <p className="mt-4 leading-7 text-[#68716c] dark:text-white/60">
                Your rate should divide the revenue your business needs by the
                hours you can actually invoice—not every hour you work.
              </p>
            </div>
            <div className="rounded-3xl border border-[#cfe0d8] bg-[#f0f7f3] p-6 dark:border-white/10 dark:bg-[#173d32] sm:p-8">
              <p className="text-sm font-semibold text-[#176b55] dark:text-[#a9e5cc]">
                Sustainable hourly rate
              </p>
              <div className="mt-4 space-y-3 font-mono text-sm leading-6 text-[#26352f] dark:text-white/80 sm:text-base">
                <p>Revenue target = expenses + (take-home ÷ (1 − tax rate))</p>
                <p>Billable hours = working weeks × weekly hours × billable %</p>
                <p>Hourly rate = revenue target ÷ annual billable hours</p>
              </div>
              <p className="mt-5 border-t border-[#cadbd3] pt-5 text-xs leading-5 text-[#6a756f] dark:border-white/10 dark:text-white/50">
                This is a planning model, not tax, accounting, or legal advice.
                Taxes and deductible expenses vary by location and business
                structure.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="why-heading"
          className="mx-auto max-w-[1040px] px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55] dark:text-[#9be2c4]">
              Stop guessing
            </p>
            <h2
              className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
              id="why-heading"
            >
              Why use a freelance rate calculator?
            </h2>
            <p className="mt-4 leading-7 text-[#68716c] dark:text-white/60">
              Salary math misses the unpaid work and costs of running a
              business. A sustainable rate gives every proposal a defensible
              financial floor.
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Calculator,
                title: "Cover the whole business",
                text: "Build operating costs and a tax reserve into your price instead of paying them from personal income.",
              },
              {
                icon: Clock3,
                title: "Respect non-billable work",
                text: "Plan around sales, admin, communication, and learning time that keeps the business moving.",
              },
              {
                icon: BriefcaseBusiness,
                title: "Set a project floor",
                text: "Convert the hourly target into a minimum fixed-project price before adjusting for value and risk.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon
                  aria-hidden="true"
                  className="size-6 text-[#176b55] dark:text-[#9be2c4]"
                />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#68716c] dark:text-white/60">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#dfe4e0] bg-white dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto max-w-[1040px] px-5 py-10 sm:px-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">Already know your rate?</p>
                <p className="mt-1 text-sm leading-6 text-[#68716c] dark:text-white/60">
                  Calculate exactly what an out-of-scope client request should cost.
                </p>
              </div>
              <Link
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#176b55] hover:underline dark:text-[#9be2c4]"
                href="/scope-creep-cost-calculator"
              >
                Use the scope creep cost calculator
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1040px] px-5 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55] dark:text-[#9be2c4]">
            Learn the pricing model
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Freelance rate guides
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/guides/how-to-calculate-freelance-hourly-rate",
                title: "How to calculate a freelance hourly rate",
                text: "Understand the revenue, expenses, tax reserve, and billable-capacity formula behind the calculator.",
              },
              {
                href: "/guides/freelance-hourly-rate-vs-salary",
                title: "Freelance hourly rate vs salary",
                text: "See why an employee-equivalent wage does not cover benefits, overhead, unpaid time, or business risk.",
              },
            ].map((guide) => (
              <article className="rounded-2xl border border-[#dfe4e0] bg-white p-6 dark:border-white/10 dark:bg-white/5" key={guide.href}>
                <h3 className="text-lg font-semibold">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#68716c] dark:text-white/60">{guide.text}</p>
                <Link className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#176b55] hover:underline dark:text-[#9be2c4]" href={guide.href}>
                  Read the guide
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="mx-auto max-w-[1040px] px-5 py-16 sm:px-6 sm:py-24"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55] dark:text-[#9be2c4]">
            Pricing questions
          </p>
          <h2
            className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
            id="faq-heading"
          >
            Freelance Hourly Rate FAQ
          </h2>
          <FreelanceHourlyRateCalculatorFaq items={faqs} />

          <aside
            aria-labelledby="conversion-heading"
            className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-[#173d32] px-6 py-9 text-white shadow-[0_28px_70px_rgba(23,61,50,0.18)] sm:px-10 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 size-64 rounded-full bg-[#82d5b4]/15 blur-3xl"
            />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9e5cc]">
                You found your rate. Now protect it.
              </p>
              <h2
                className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
                id="conversion-heading"
              >
                Keep extra work from quietly shrinking your effective rate.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                ScopeYes helps you document scope changes, price their impact,
                and record the client’s decision before additional work begins.
              </p>
            </div>
            <Link
              className="relative mt-7 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#a9e5cc] px-5 py-3 text-sm font-semibold text-[#173d32] transition-all hover:-translate-y-0.5 hover:bg-[#baf0da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173d32] lg:mt-0"
              href="/sign-in"
            >
              Protect my project margin
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </aside>

          <p className="mt-8 flex items-start gap-2 text-xs leading-5 text-[#7b837f] dark:text-white/45">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            ScopeYes does not store calculator inputs. For a stronger project
            foundation, use the free{" "}
            <Link
              className="font-semibold text-[#176b55] hover:underline dark:text-[#9be2c4]"
              href="/guides/freelance-scope-of-work-template"
            >
              freelance scope of work template
            </Link>
            .
          </p>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
