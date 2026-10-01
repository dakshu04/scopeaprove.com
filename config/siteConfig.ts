export const siteConfig = {
  name: "ScopeYes",
  shortName: "ScopeYes",
  url: "https://www.scopeyes.com",
  description:
    "ScopeYes helps freelancers and small teams document scope changes, show cost and timeline impact, and collect client approval before extra work begins.",
  supportEmail: "scopeyescontact@gmail.com",
  locale: "en_US",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
