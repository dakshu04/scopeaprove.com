import type { Metadata } from "next";
import {
  CreditCard,
  KeyRound,
  Link2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageTitle = "Security at ScopeYes | Account and Approval Protection";
const pageDescription =
  "Learn about the safeguards ScopeYes uses for account access, private client approval links, payment processing, and security reporting.";
const pageUrl = absoluteUrl("/security");

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: pageTitle,
  description: pageDescription,
  inLanguage: siteConfig.language,
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#software` },
};

const safeguards = [
  {
    icon: KeyRound,
    title: "Google account authentication",
    text: "ScopeYes uses Google sign-in for workspace access, so the application does not collect or store a separate ScopeYes password.",
  },
  {
    icon: LockKeyhole,
    title: "Authenticated workspaces",
    text: "Dashboard, project, and change-request management routes require an active authenticated session.",
  },
  {
    icon: Link2,
    title: "Private approval links",
    text: "Client review pages use high-entropy private tokens. ScopeYes stores a one-way hash of each token rather than the original token value.",
  },
  {
    icon: CreditCard,
    title: "Hosted payment processing",
    text: "Dodo Payments handles paid checkout and card processing. ScopeYes stores subscription references and status, not complete payment-card details.",
  },
] as const;

export default function SecurityPage() {
  return (
    <InfoPageShell
      description="ScopeYes uses focused safeguards for workspace access, private client review links, approval records, and subscription processing."
      eyebrow="ScopeYes Security"
      title="Protecting your projects and approval workflow."
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <section className="mx-auto max-w-[1180px] px-5 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {safeguards.map(({ icon: Icon, text, title }) => (
            <article
              className="rounded-2xl border border-[#e1e1da] bg-white p-7"
              key={title}
            >
              <span className="grid size-10 place-items-center rounded-xl bg-[#e7f2ed] text-[#176b55]">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h2 className="mt-5 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#686961]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e3e3dc] bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <ShieldCheck aria-hidden="true" className="size-9 text-[#176b55]" />
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
              Sharing approval links safely
            </h2>
            <p className="mt-4 leading-7 text-[#666760]">
              A private approval link works like a bearer link: anyone who has
              it may be able to view the associated request. Send links only to
              intended recipients and replace a link if it may have been shared
              unexpectedly.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">
              What you can do
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#666760]">
              <li>Protect your Google account with strong recovery settings.</li>
              <li>Keep devices and browsers updated.</li>
              <li>Do not publish client approval links in public channels.</li>
              <li>Review project details before sending a request.</li>
              <li>Report suspected unauthorized access promptly.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-5 py-16 sm:px-6 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55]">
          Responsible reporting
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Report a security concern
        </h2>
        <p className="mt-4 leading-7 text-[#666760]">
          If you believe you found a security issue, contact ScopeYes with a
          clear description and steps to reproduce it. Please do not access,
          change, or retain other people’s data, and do not perform testing that
          could disrupt the service.
        </p>
        <a
          className="mt-7 inline-flex rounded-lg bg-[#176b55] px-5 py-3 text-sm font-semibold text-white"
          href={`mailto:${siteConfig.supportEmail}?subject=Security%20report`}
        >
          Email a security report
        </a>
        <p className="mt-8 text-sm leading-6 text-[#777870]">
          No internet service can guarantee absolute security. For more detail
          about information handling, review the{" "}
          <Link className="font-semibold text-[#176b55]" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </InfoPageShell>
  );
}
