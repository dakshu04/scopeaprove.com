import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell } from "@/components/legal/legal-page-shell";

const pageUrl = "https://scopeyes.vercel.app/terms";
const lastUpdated = "September 29, 2026";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | ScopeYes" },
  description:
    "Review the terms governing access to and use of ScopeYes for project scope, change-request, client approval, and subscription management.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Terms of Service | ScopeYes",
    description:
      "The terms governing access to and use of the ScopeYes project scope and client approval service.",
    type: "website",
    url: pageUrl,
  },
};

const tableOfContents = [
  { href: "#acceptance", label: "Acceptance" },
  { href: "#service", label: "Description of ScopeYes" },
  { href: "#accounts", label: "Eligibility and accounts" },
  { href: "#acceptable-use", label: "Acceptable use" },
  { href: "#user-content", label: "User content" },
  { href: "#client-access", label: "Client access" },
  { href: "#subscriptions", label: "Subscriptions" },
  { href: "#intellectual-property", label: "Intellectual property" },
  { href: "#feedback", label: "Feedback" },
  { href: "#availability", label: "Service availability" },
  { href: "#termination", label: "Suspension and termination" },
  { href: "#disclaimers", label: "Disclaimers" },
  { href: "#liability", label: "Liability" },
  { href: "#indemnity", label: "Indemnification" },
  { href: "#law", label: "Governing law" },
  { href: "#changes", label: "Changes to these terms" },
  { href: "#faq", label: "Common questions" },
  { href: "#contact", label: "Contact" },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ScopeYes Terms of Service",
  description:
    "Terms governing the ScopeYes project scope, change request, client approval, and subscription service.",
  url: pageUrl,
  dateModified: "2026-09-29",
  isPartOf: {
    "@type": "WebSite",
    name: "ScopeYes",
    url: "https://scopeyes.vercel.app/",
  },
};

export default function TermsPage() {
  return (
    <LegalPageShell
      description="These Terms govern your access to and use of ScopeYes, including its project, change-request, client approval, account, and subscription features."
      eyebrow="Legal · Terms"
      lastUpdated={lastUpdated}
      tableOfContents={tableOfContents}
      title="Terms of Service"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <section id="acceptance">
        <h2>1. Acceptance of these Terms</h2>
        <p className="answer">
          By creating an account, accessing a client approval page, purchasing
          a subscription, or otherwise using ScopeYes, you agree to these Terms
          of Service.
        </p>
        <p>
          If you use ScopeYes for a business or other organization, you confirm
          that you have authority to accept these Terms for that organization.
          If you do not agree, do not use the service. Our{" "}
          <Link href="/privacy">Privacy Policy</Link> explains how ScopeYes
          handles personal information.
        </p>
      </section>

      <section id="service">
        <h2>2. What is ScopeYes?</h2>
        <p className="answer">
          ScopeYes is a SaaS application that helps freelancers, agencies,
          consultants, and service providers document project scope, propose
          changes, and obtain recorded client decisions.
        </p>
        <p>
          Current functionality includes user accounts, projects, original
          scope items, change requests with cost and schedule impact, private
          client approval links, approval history, and Free and Pro service
          levels. ScopeYes is a workflow and record-keeping tool. It is not a law
          firm, escrow service, accounting service, or substitute for a contract
          drafted for your circumstances.
        </p>
      </section>

      <section id="accounts">
        <h2>3. Who can use ScopeYes?</h2>
        <p className="answer">
          You may use ScopeYes if you have the legal capacity and authority
          required to agree to these Terms and can use the service lawfully.
        </p>
        <p>
          ScopeYes currently uses Google sign-in. You agree to provide accurate
          account information, keep your Google account and device secure, and
          promptly notify us of suspected unauthorized use. You are responsible
          for activity performed through your account unless applicable law
          provides otherwise. You may not share access in a way that defeats
          account security or subscription limits.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>4. What are users responsible for?</h2>
        <p className="answer">
          Users are responsible for their content, their client relationships,
          the approval links they distribute, and using ScopeYes lawfully and
          respectfully.
        </p>
        <p>You must not use ScopeYes to:</p>
        <ul>
          <li>Break applicable law or violate another person’s rights.</li>
          <li>
            Access accounts, projects, approval links, systems, or data without
            authorization.
          </li>
          <li>
            Upload or transmit malware, harmful code, deceptive content, spam,
            or material intended to disrupt the service.
          </li>
          <li>
            Probe, bypass, disable, or interfere with security, rate limits,
            access controls, subscription controls, or service integrity.
          </li>
          <li>
            Misrepresent another person, falsify an approval, or use ScopeYes
            to create a misleading record.
          </li>
          <li>
            Scrape, reverse engineer, or copy the service except where such a
            restriction is prohibited by applicable law.
          </li>
          <li>Harass, exploit, or harm another person.</li>
        </ul>
      </section>

      <section id="user-content">
        <h2>5. Who owns project and client content?</h2>
        <p className="answer">
          You retain ownership of the project, scope, change-request, and client
          information you submit. You give ScopeYes only the rights reasonably
          needed to host, process, display, secure, and transmit that content to
          operate the service.
        </p>
        <p>
          You confirm that you have the rights and permissions necessary to
          provide your content and instruct ScopeYes to process it. You are
          responsible for its accuracy, legality, and suitability, including
          prices, dates, descriptions, client contact details, and supporting
          contractual context. ScopeYes may remove or restrict content when
          reasonably necessary to address unlawful material, security risk,
          abuse, or a violation of these Terms.
        </p>
      </section>

      <section id="client-access">
        <h2>6. How do client approval links work?</h2>
        <p className="answer">
          An account holder can publish a change request and share a private
          link that lets a client review the request and record an approval or
          decline without creating a ScopeYes account.
        </p>
        <p>
          Account holders are responsible for sending each link to the intended
          recipient, protecting it from unintended disclosure, and having
          permission to enter and share client information. A person with the
          link may be able to view the related project name, original scope,
          change description, amount, and schedule impact. Clients are
          responsible for reviewing the information before submitting a
          decision.
        </p>
        <p>
          ScopeYes records the submitted decision and related details, but does
          not determine whether that decision forms a legally binding agreement
          in a particular jurisdiction. Users should maintain appropriate
          client contracts and obtain legal advice where needed.
        </p>
      </section>

      <section id="subscriptions">
        <h2>7. How do subscriptions and payments work?</h2>
        <p className="answer">
          ScopeYes offers a Free level with product limits and a Pro
          subscription with expanded entitlements. Current price, billing
          interval, taxes, and payment details are presented before checkout.
        </p>
        <p>
          Dodo Payments processes paid checkout and billing. By purchasing Pro,
          you authorize the charges shown at checkout and agree to the billing
          terms presented there. A recurring subscription may renew for its
          stated billing period until cancelled, paused, expired, or otherwise
          ended through the available billing controls.
        </p>
        <h3>Cancellation, failed payment, and plan changes</h3>
        <p>
          Eligible customers can access the Dodo Payments customer portal from
          ScopeYes settings to manage their subscription. When ScopeYes receives
          a subscription status showing that Pro is no longer active—including
          an on-hold, cancelled, failed, or expired status—the account is treated
          as Free for feature limits. Existing project records are not promised
          to be deleted solely because a subscription ends, but creation of new
          projects or active change requests may be restricted by the Free-plan
          limits.
        </p>
        <h3>Refunds and billing questions</h3>
        <p>
          ScopeYes does not state a universal refund promise in these Terms.
          Refund eligibility, if any, depends on the checkout terms and
          applicable law. Send billing questions to{" "}
          <a href="mailto:scopeyescontact@gmail.com">
            scopeyescontact@gmail.com
          </a>
          .
        </p>
      </section>

      <section id="intellectual-property">
        <h2>8. ScopeYes intellectual property</h2>
        <p className="answer">
          ScopeYes and its software, interface, branding, visual design,
          documentation, and platform content are protected by applicable
          intellectual-property laws and remain the property of their
          respective owners.
        </p>
        <p>
          Subject to these Terms, ScopeYes gives you a limited, revocable,
          non-exclusive, non-transferable right to access and use the service
          for its intended purpose. This right does not transfer ownership of
          ScopeYes technology or permit you to reproduce, resell, sublicense,
          or create competing copies of the service except where applicable law
          does not allow such a restriction.
        </p>
      </section>

      <section id="feedback">
        <h2>9. Feedback</h2>
        <p>
          If you voluntarily send ideas, suggestions, or product feedback, you
          allow ScopeYes to use that feedback without restriction or payment to
          improve, operate, and develop the service. This does not transfer
          ownership of your project or client content.
        </p>
      </section>

      <section id="availability">
        <h2>10. Availability and changes to the service</h2>
        <p className="answer">
          ScopeYes may add, change, suspend, or discontinue features and may
          temporarily interrupt access for maintenance, security, provider
          outages, or operational reasons.
        </p>
        <p>
          We aim to provide a reliable service but do not promise uninterrupted
          or error-free availability and do not currently provide a service
          level agreement through these Terms. Where reasonably practical, we
          may provide notice of a material change that significantly affects
          active users.
        </p>
      </section>

      <section id="termination">
        <h2>11. Suspension and termination</h2>
        <p className="answer">
          ScopeYes may restrict or terminate access when reasonably necessary
          because of a material Terms violation, unlawful or abusive use,
          security risk, valid legal requirement, or non-payment of applicable
          fees.
        </p>
        <p>
          Where appropriate, we may provide notice and an opportunity to remedy
          the issue. Immediate action may be necessary for serious security,
          legal, or abuse concerns. You may stop using ScopeYes at any time;
          stopping use does not automatically cancel an active paid
          subscription, so use the available customer portal where applicable.
          Sections that by their nature should continue after termination—such
          as ownership, disclaimers, liability, and dispute provisions—will
          continue to the extent permitted by law.
        </p>
      </section>

      <section id="disclaimers">
        <h2>12. Disclaimers</h2>
        <p className="answer">
          ScopeYes provides tools for documenting and recording project changes;
          it does not guarantee payment, project success, client performance,
          legal enforceability, or the prevention of every dispute.
        </p>
        <p>
          To the maximum extent permitted by applicable law, the service is
          provided on an “as is” and “as available” basis without warranties not
          expressly stated in these Terms. Users remain responsible for their
          professional judgment, project agreements, tax and accounting
          obligations, backups, and compliance with law. Nothing in these Terms
          excludes warranties or rights that cannot lawfully be excluded.
        </p>
      </section>

      <section id="liability">
        <h2>13. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, ScopeYes will not
          be liable for indirect, incidental, special, consequential, exemplary,
          or punitive damages, or for lost profits, revenue, business,
          opportunities, goodwill, or data, arising from or related to use of
          the service.
        </p>
        <p>
          Any further monetary cap should be confirmed against the business’s
          legal structure, governing law, and commercial terms before launch;
          no specific cap is asserted here. This section does not limit liability
          that cannot lawfully be limited, including mandatory consumer rights
          that may apply in your jurisdiction.
        </p>
      </section>

      <section id="indemnity">
        <h2>14. Indemnification</h2>
        <p>
          To the extent permitted by applicable law, business users agree to
          defend, indemnify, and hold ScopeYes harmless from third-party claims,
          losses, and reasonable costs arising from their unlawful use of the
          service, their content, their violation of another person’s rights, or
          a material breach of these Terms. This obligation does not apply to
          the extent a claim results from ScopeYes’s own unlawful conduct, and
          it does not reduce non-waivable rights.
        </p>
      </section>

      <section id="law">
        <h2>15. Governing law and disputes</h2>
        <p className="answer">
          The governing law and exclusive forum for these Terms have not yet
          been designated and must be confirmed before commercial launch.
        </p>
        <p>
          Until this section is completed, it should not be read as selecting a
          particular country, state, court, or arbitration process. Mandatory
          rights and protections available under applicable law remain
          unaffected. Users are encouraged to contact us first so we can try to
          resolve a concern informally.
        </p>
      </section>

      <section id="changes">
        <h2>16. Changes to these Terms</h2>
        <p>
          ScopeYes may update these Terms as the service or applicable
          requirements change. The “Last updated” date shows the latest
          revision. When appropriate, we may provide additional notice of
          material changes. Continued use after updated Terms take effect means
          you accept them, to the extent permitted by applicable law.
        </p>
      </section>

      <section id="faq">
        <h2>17. Common questions about these Terms</h2>
        <div className="faq-list">
          <div>
            <h3>Does a ScopeYes approval replace my client contract?</h3>
            <p>
              No. ScopeYes records a request and response, but users remain
              responsible for an appropriate contract and legal advice.
            </p>
          </div>
          <div>
            <h3>What happens when Pro is no longer active?</h3>
            <p>
              The account is treated as Free for product limits. Existing data
              may remain available, while creation of additional projects or
              active change requests may be restricted.
            </p>
          </div>
          <div>
            <h3>Can ScopeYes change its features?</h3>
            <p>
              Yes. Features may evolve, and access may occasionally be
              interrupted for maintenance, security, provider outages, or
              operational reasons.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-panel" id="contact">
        <p className="eyebrow">Support contact</p>
        <h2>18. Contact ScopeYes</h2>
        <p>
          For questions about these Terms, subscriptions, account access, or
          ScopeYes generally, contact us by email.
        </p>
        <a className="contact-link" href="mailto:scopeyescontact@gmail.com">
          scopeyescontact@gmail.com
        </a>
      </section>

      <p className="legal-note">
        These Terms are an informational draft based on the current ScopeYes
        implementation. They are not a substitute for review by a qualified
        lawyer, particularly before commercial launch and before completing the
        governing-law and liability provisions.
      </p>
    </LegalPageShell>
  );
}
