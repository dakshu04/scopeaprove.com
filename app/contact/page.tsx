import type { Metadata } from "next";
import { CreditCard, LifeBuoy, Mail, ShieldCheck } from "lucide-react";

import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageTitle = "Contact ScopeYes | Product, Billing and Privacy Support";
const pageDescription =
  "Contact ScopeYes for help with your account, client approvals, subscriptions, privacy requests, or product feedback.";
const pageUrl = absoluteUrl("/contact");

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
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
    },
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.supportEmail,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.supportEmail,
        availableLanguage: "English",
      },
    },
  ],
};

const contactReasons = [
  {
    icon: LifeBuoy,
    title: "Product and account help",
    text: "Questions about projects, change requests, approval links, sign-in, or your workspace.",
  },
  {
    icon: CreditCard,
    title: "Subscription and billing",
    text: "Help with Pro, checkout, subscription status, cancellation, or the customer portal.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy and security",
    text: "Privacy rights, account deletion, responsible security reports, or suspected unauthorized access.",
  },
] as const;

export default function ContactPage() {
  return (
    <InfoPageShell
      description="Need help with ScopeYes or want to share product feedback? Email is the current support channel for account, billing, privacy, and security questions."
      eyebrow="Contact ScopeYes"
      title="How can we help?"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <section className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#176b55]">
            Support topics
          </p>
          <div className="mt-6 space-y-4">
            {contactReasons.map(({ icon: Icon, text, title }) => (
              <article
                className="flex gap-4 rounded-2xl border border-[#e1e1da] bg-white p-6"
                key={title}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e7f2ed] text-[#176b55]">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#686961]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl bg-[#173d32] p-7 text-white sm:p-9">
          <Mail aria-hidden="true" className="size-8 text-[#a9e5cc]" />
          <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
            Email ScopeYes
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Include the email address connected to your account and a concise
            description of the issue. Do not send passwords, secret keys, or
            complete payment-card information.
          </p>
          <a
            className="mt-7 inline-flex max-w-full break-all rounded-lg bg-[#a9e5cc] px-4 py-3 text-sm font-semibold text-[#173d32]"
            href={`mailto:${siteConfig.supportEmail}`}
          >
            {siteConfig.supportEmail}
          </a>
          <p className="mt-6 border-t border-white/10 pt-6 text-xs leading-5 text-white/50">
            For account-specific assistance, contact us from the email address
            associated with your ScopeYes workspace when possible.
          </p>
        </aside>
      </section>
    </InfoPageShell>
  );
}
