import { absoluteUrl, siteConfig } from "@/config/siteConfig";

export function GET() {
  const content = `# ${siteConfig.name}

> ${siteConfig.description}

ScopeYes is a web application for freelancers, consultants, agencies, and small service teams. It helps users document work outside an original project scope, state additional price and schedule impact, and collect a client decision through a private approval link.

## Core workflow

1. Create a project and record the original scope.
2. Create a change request describing extra work, price, and schedule impact.
3. Share a private, expiring approval link with the client.
4. Record the client's approval or requested changes with a timestamp.

## Plans

- Free: one project and up to three active change requests.
- Pro: unlimited projects and active change requests for USD 8.99 per month.

## Important facts

- Clients do not need a ScopeYes account to respond.
- Approval links are private and expire after 14 days.
- ScopeYes records a workflow decision but does not replace a client contract or legal advice.
- ScopeYes does not guarantee payment or legal enforceability.

## Official pages

- Product: ${absoluteUrl("/")}
- Freelance scope of work template: ${absoluteUrl("/guides/freelance-scope-of-work-template")}
- Client change request template: ${absoluteUrl("/guides/client-change-request-template")}
- Scope creep guide: ${absoluteUrl("/guides/scope-creep")}
- About: ${absoluteUrl("/about")}
- Security: ${absoluteUrl("/security")}
- Privacy: ${absoluteUrl("/privacy")}
- Terms: ${absoluteUrl("/terms")}
- Contact: ${absoluteUrl("/contact")}
`;

  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
