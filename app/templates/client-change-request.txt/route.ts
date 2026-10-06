const template = `CLIENT CHANGE REQUEST TEMPLATE FOR FREELANCERS

Project: [Project name]
Client: [Client name]
Change request: [Short descriptive title]
Date: [Date]

REQUESTED CHANGE
[Describe the additional work in plain language.]

ORIGINAL SCOPE REFERENCE
[State what the original agreement included and why this request is additional.]

DELIVERABLES INCLUDED IN THIS CHANGE
- [Deliverable one]
- [Deliverable two]
- [Any exclusions or assumptions]

ADDITIONAL PRICE
[Amount and currency, plus applicable tax or payment terms]

SCHEDULE IMPACT
[No change / adds X business days / revised delivery date]

APPROVAL
Please approve this change before work begins. Approval confirms the additional work, price, and schedule impact described above.

Decision: [Approved / Changes requested]
Client name: [Name]
Decision date: [Date]

This template supports your existing agreement and is not legal advice.
Created with ScopeYes: https://www.scopeyes.com
`;

export function GET() {
  return new Response(template, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Disposition": 'attachment; filename="client-change-request-template.txt"',
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
