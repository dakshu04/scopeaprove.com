export const siteConfig = {
  name: "ScopeYes",
  shortName: "ScopeYes",
  url: "https://www.scopeyes.com",
  description:
    "Client approval and scope change software for freelancers and small teams. Document extra work, price and timeline impact, then get approval before work begins.",
  supportEmail: "scopeyescontact@gmail.com",
  locale: "en_US",
  language: "en-US",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
