import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl("/privacy");
const lastUpdated = "September 29, 2026";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | ScopeYes" },
  description:
    "Learn how ScopeYes collects, uses, shares, and protects information when you manage project scopes, change requests, and client approvals.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Privacy Policy | ScopeYes",
    description:
      "How ScopeYes handles account, project, approval, and subscription information.",
    type: "website",
    url: pageUrl,
  },
};

const tableOfContents = [
  { href: "#scope", label: "Scope of this policy" },
  { href: "#information", label: "Information we collect" },
  { href: "#use", label: "How we use information" },
  { href: "#sharing", label: "How we share information" },
  { href: "#cookies", label: "Cookies" },
  { href: "#retention", label: "Data retention" },
  { href: "#security", label: "Data security" },
  { href: "#rights", label: "Your rights and choices" },
  { href: "#deletion", label: "Account deletion" },
  { href: "#children", label: "Children’s privacy" },
  { href: "#third-parties", label: "Third-party services" },
  { href: "#changes", label: "Policy changes" },
  { href: "#faq", label: "Privacy questions" },
  { href: "#contact", label: "Contact" },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ScopeYes Privacy Policy",
  description:
    "How ScopeYes handles information used for project scope, change request, client approval, authentication, and subscription features.",
  url: pageUrl,
  dateModified: "2026-09-29",
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      description="This policy explains what information ScopeYes handles when freelancers, agencies, consultants, service providers, and their clients use our project scope and approval service."
      eyebrow="Legal · Privacy"
      lastUpdated={lastUpdated}
      tableOfContents={tableOfContents}
      title="Privacy Policy"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <section id="scope">
        <h2>1. Scope of this Privacy Policy</h2>
        <p className="answer">
          This Privacy Policy covers personal information handled through the
          ScopeYes website, account dashboard, project and change-request
          tools, client approval pages, subscriptions, and support.
        </p>
        <p>
          ScopeYes is a SaaS application for project scope and client approval
          management. It helps account holders document project scope, describe
          proposed changes, record cost and schedule impact, share private
          approval links, and retain client decisions. If you follow a link to
          another service, that service’s own privacy terms apply.
        </p>
        <p>
          Questions about this policy or our handling of information can be
          sent to{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </section>

      <section id="information">
        <h2>2. What information does ScopeYes collect?</h2>
        <p className="answer">
          ScopeYes collects account details, content entered into projects and
          change requests, client approval details, essential technical data,
          and subscription records needed to operate the service.
        </p>

        <h3>Account and authentication information</h3>
        <p>
          When you sign in with Google, ScopeYes receives and stores account
          details needed to create and maintain your account, such as your name,
          email address, profile image where provided, email-verification
          status, provider account identifier, and authentication/session
          records. Google handles the sign-in interaction under its own terms.
        </p>

        <h3>Project and scope information</h3>
        <p>
          Account holders may enter project names and descriptions, client
          names and email addresses, and scope-item titles and descriptions.
          This is information you choose to provide so ScopeYes can organize
          the original project scope.
        </p>

        <h3>Change requests and approval information</h3>
        <p>
          ScopeYes stores change-request titles and descriptions, additional
          amounts and currency, schedule changes, delivery dates, status,
          expiration and sent dates, and the private-link record used to open a
          request. When a client responds, we collect the client’s name and
          email address, approval or decline decision, optional decline reason,
          decision time, and browser user-agent information associated with the
          response.
        </p>

        <h3>Technical and session information</h3>
        <p>
          Authentication sessions may include an IP address, browser user-agent,
          session identifier, and session timestamps. We use this information
          to keep users signed in, operate the service, investigate errors, and
          protect accounts and approval workflows.
        </p>

        <h3>Subscription and payment information</h3>
        <p>
          Paid checkout and billing are handled by Dodo Payments. ScopeYes
          sends the signed-in user’s name, email address, product selection, and
          internal user identifier to create checkout. ScopeYes stores billing
          references and subscription state, including customer, subscription,
          and product identifiers, status, billing dates, and cancellation
          information. Payment-card details are entered with and processed by
          Dodo Payments; the ScopeYes application does not store complete card
          details in its database.
        </p>

        <h3>Support communications</h3>
        <p>
          If you contact us, we receive the information in your message and any
          details you voluntarily include so we can respond.
        </p>
      </section>

      <section id="use">
        <h2>3. How does ScopeYes use information?</h2>
        <p className="answer">
          We use information to provide accounts, projects, scope records,
          change requests, client approvals, subscriptions, support, security,
          and the reliable operation of ScopeYes.
        </p>
        <ul>
          <li>Create, authenticate, and maintain user accounts and sessions.</li>
          <li>
            Store and display projects, scope items, change requests, cost and
            timeline impact, and approval history.
          </li>
          <li>
            Make relevant request information available through private client
            approval links and record client decisions.
          </li>
          <li>
            Start checkout, maintain subscription entitlements, and provide
            access to the billing portal.
          </li>
          <li>Respond to support, privacy, correction, and deletion requests.</li>
          <li>
            Diagnose errors, prevent misuse, protect the service, and enforce
            applicable agreements.
          </li>
          <li>Meet applicable legal obligations and resolve disputes.</li>
        </ul>
      </section>

      <section id="sharing">
        <h2>4. Does ScopeYes share personal information?</h2>
        <p className="answer">
          ScopeYes shares information only as needed to deliver the service,
          follow your sharing choices, operate with service providers, protect
          the platform, or meet applicable legal requirements. We do not
          describe personal information as being sold for advertising.
        </p>
        <ul>
          <li>
            <strong>Clients and approval-link recipients.</strong> Information
            contained in a change request is visible to anyone who receives its
            private approval link. Account holders control who receives that
            link and should share it carefully.
          </li>
          <li>
            <strong>Google.</strong> Google provides the social sign-in flow and
            processes authentication information under Google’s policies.
          </li>
          <li>
            <strong>Dodo Payments.</strong> Dodo Payments processes checkout,
            subscription, payment, and customer-portal activity.
          </li>
          <li>
            <strong>Hosting, database, and infrastructure services.</strong>
            ScopeYes uses Vercel to host and deliver the application and uses
            supporting database and infrastructure services to store and
            process application data.
          </li>
          <li>
            <strong>Legal and safety disclosures.</strong> We may disclose
            information where reasonably necessary to comply with applicable
            law, respond to valid legal process, protect rights or safety, or
            investigate fraud, abuse, or security incidents.
          </li>
          <li>
            <strong>Business changes.</strong> Information may be transferred as
            part of a merger, financing, acquisition, reorganization, or sale
            of assets, subject to appropriate confidentiality and applicable
            law.
          </li>
        </ul>
      </section>

      <section id="cookies">
        <h2>5. Does ScopeYes use cookies?</h2>
        <p className="answer">
          Yes. ScopeYes uses essential authentication and session technologies
          so sign-in works securely and the application can recognize an active
          session.
        </p>
        <p>
          These technologies are required for core account functionality. The
          current ScopeYes application does not include a third-party analytics
          or advertising tracker. If that changes, this policy will be updated
          to explain the relevant technology and choices.
        </p>
      </section>

      <section id="retention">
        <h2>6. How long does ScopeYes retain information?</h2>
        <p className="answer">
          ScopeYes retains information for as long as reasonably necessary to
          provide the service and for legitimate operational, security, legal,
          and dispute-resolution purposes.
        </p>
        <p>
          Retention depends on the type of information, account status, why it
          was collected, and applicable requirements. For example, project and
          approval records may remain while an account is active so the user can
          access their decision history. Some records may be retained after an
          account request where necessary for security, backup integrity,
          payment records, dispute resolution, or legal obligations. ScopeYes
          has not established a single retention period for every category of
          data.
        </p>
      </section>

      <section id="security">
        <h2>7. How does ScopeYes protect information?</h2>
        <p className="answer">
          ScopeYes uses reasonable technical and organizational safeguards
          intended to protect information and limit access to the people and
          systems that need it.
        </p>
        <p>
          Measures in the application include authenticated account access,
          private approval links, hashed approval-link tokens in the database,
          and verified payment webhooks. No internet service or storage system
          can guarantee absolute security. Account holders should protect their
          Google account, device, and approval links and notify us if they
          suspect unauthorized access.
        </p>
      </section>

      <section id="rights">
        <h2>8. What rights and choices do users have?</h2>
        <p className="answer">
          Depending on where you live, you may have rights to request access,
          correction, deletion, restriction, objection, or a portable copy of
          certain personal information.
        </p>
        <p>
          These rights vary by jurisdiction and may be subject to exceptions.
          You can update some project information within the product. For a
          privacy request, email{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          . We may need to verify your identity before acting on a request.
          Account holders are responsible for handling requests concerning
          client information they entered into ScopeYes where they control that
          information.
        </p>
      </section>

      <section id="deletion">
        <h2>9. How can I request account deletion?</h2>
        <p className="answer">
          ScopeYes does not currently provide a self-service account-deletion
          button. To request deletion, email {siteConfig.supportEmail} from the
          email address associated with your account.
        </p>
        <p>
          Include enough information for us to identify the account, but do not
          send passwords or payment-card details. We will explain any
          verification needed and whether limited records must be retained for
          legitimate legal, security, payment, or dispute-resolution purposes.
        </p>
      </section>

      <section id="children">
        <h2>10. Children’s privacy</h2>
        <p className="answer">
          ScopeYes is a business productivity service and is not designed or
          directed for use by children.
        </p>
        <p>
          If you believe a child has provided personal information to ScopeYes,
          contact{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>{" "}
          so we can review the situation and take appropriate action.
        </p>
      </section>

      <section id="third-parties">
        <h2>11. Third-party services and links</h2>
        <p>
          ScopeYes relies on third-party services for authentication, hosting,
          infrastructure, and payment processing. Their handling of information
          is governed by their own terms and privacy policies. ScopeYes may also
          contain links supplied by users or links to external services; we are
          not responsible for the privacy practices of websites or services we
          do not control.
        </p>
      </section>

      <section id="changes">
        <h2>12. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy as ScopeYes changes or as needed for
          operational, legal, or regulatory reasons. The “Last updated” date at
          the top shows when the policy was most recently revised. When
          appropriate, we may provide additional notice in the service or by
          another reasonable method.
        </p>
      </section>

      <section id="faq">
        <h2>13. Common privacy questions</h2>
        <div className="faq-list">
          <div>
            <h3>Does ScopeYes use my project content for advertising?</h3>
            <p>
              No advertising use is implemented. Project and approval content
              is used to provide and protect the ScopeYes service.
            </p>
          </div>
          <div>
            <h3>Who can see a client approval page?</h3>
            <p>
              Anyone with the private approval link may be able to view the
              request. Send links only to intended recipients and ask them not
              to forward the link.
            </p>
          </div>
          <div>
            <h3>Can I correct inaccurate information?</h3>
            <p>
              Some account and project details can be updated in ScopeYes. For
              other corrections, email {siteConfig.supportEmail}.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-panel" id="contact">
        <p className="eyebrow">Privacy contact</p>
        <h2>14. Contact ScopeYes</h2>
        <p>
          For privacy questions, access or correction requests, or account
          deletion requests, email us. Please do not include passwords, secret
          keys, or complete payment-card details.
        </p>
        <a className="contact-link" href={`mailto:${siteConfig.supportEmail}`}>
          {siteConfig.supportEmail}
        </a>
      </section>

      <p className="legal-note">
        This policy is provided as general information about ScopeYes’s current
        data practices and should be reviewed by a qualified lawyer before
        commercial launch. You can also review the{" "}
        <Link href="/terms">ScopeYes Terms of Service</Link>.
      </p>
    </LegalPageShell>
  );
}
