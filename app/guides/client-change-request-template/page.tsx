import type { Metadata } from "next";

import ArticleContent from "@/content/guides/client-change-request-template.mdx";
import {
  clientChangeRequestFaqs,
  clientChangeRequestGuide,
} from "@/content/guides/client-change-request-template-data";
import { InfoPageShell } from "@/components/marketing/info-page-shell";
import { articleMdxComponents, MdxArticle } from "@/components/marketing/mdx-article";
import { absoluteUrl, siteConfig } from "@/config/siteConfig";

const pageUrl = absoluteUrl(`/guides/${clientChangeRequestGuide.slug}`);

export const metadata: Metadata = {
  title: { absolute: `${clientChangeRequestGuide.title} | ScopeYes` },
  description: clientChangeRequestGuide.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${clientChangeRequestGuide.title} | ScopeYes`,
    description: clientChangeRequestGuide.description,
    type: "article",
    url: pageUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${clientChangeRequestGuide.title} | ScopeYes`,
    description: clientChangeRequestGuide.description,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: clientChangeRequestGuide.title,
      description: clientChangeRequestGuide.description,
      datePublished: clientChangeRequestGuide.publishedAt,
      dateModified: clientChangeRequestGuide.updatedAt,
      inLanguage: siteConfig.language,
      mainEntityOfPage: pageUrl,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Client change request template", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: clientChangeRequestFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function ClientChangeRequestTemplatePage() {
  return (
    <InfoPageShell
      description="A free, practical template for freelancers who need to define extra work, price it clearly, explain the schedule impact, and get a client decision before starting."
      eyebrow={clientChangeRequestGuide.eyebrow}
      title="Client change request template for freelancers"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <MdxArticle>
        <ArticleContent components={articleMdxComponents} />
      </MdxArticle>
    </InfoPageShell>
  );
}
