import { absoluteUrl, siteConfig } from "@/config/siteConfig";

export type ScopeCreepCalculatorFaq = {
  question: string;
  answer: string;
};

export type ScopeCreepCalculatorStep = {
  name: string;
  text: string;
};

type ScopeCreepCalculatorSchemaInput = {
  description: string;
  faqs: readonly ScopeCreepCalculatorFaq[];
  steps: readonly ScopeCreepCalculatorStep[];
  title: string;
};

export function createScopeCreepCostCalculatorSchema({ description, faqs, steps, title }: ScopeCreepCalculatorSchemaInput) {
  const url = absoluteUrl("/scope-creep-cost-calculator");

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
        provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Calculate extra-work cost",
          "Add a rush-work premium",
          "Estimate project fee increase",
          "Copy a client-ready estimate",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: `How to use the ${title}`,
        description: "Estimate the price and timeline impact of client-requested work before you begin it.",
        totalTime: "PT1M",
        step: steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
          url: `${url}#step-${index + 1}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Scope Creep Cost Calculator", item: url },
        ],
      },
    ],
  };
}
