import { absoluteUrl, siteConfig } from "@/config/siteConfig";

export type FreelanceRateFaq = {
  answer: string;
  question: string;
};

export type FreelanceRateStep = {
  name: string;
  text: string;
};

type FreelanceRateSchemaInput = {
  description: string;
  faqs: readonly FreelanceRateFaq[];
  steps: readonly FreelanceRateStep[];
  title: string;
};

export function createFreelanceRateCalculatorSchema({
  description,
  faqs,
  steps,
  title,
}: FreelanceRateSchemaInput) {
  const url = absoluteUrl("/freelance-hourly-rate-calculator");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#application`,
        name: title,
        url,
        description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript and a modern web browser",
        isAccessibleForFree: true,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Calculate a sustainable freelance hourly rate",
          "Account for taxes and business expenses",
          "Plan for vacation and non-billable time",
          "Estimate a minimum fixed-project price",
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: `How to use the ${title}`,
        description: "Calculate a sustainable hourly rate from your income target, costs, time off, and realistic billable hours.",
        totalTime: "PT2M",
        step: steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
          url: `${url}#step-${index + 1}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Freelance Hourly Rate Calculator",
            item: url,
          },
        ],
      },
    ],
  };
}
