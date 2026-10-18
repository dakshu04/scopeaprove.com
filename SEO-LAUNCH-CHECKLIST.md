# ScopeYes search indexing launch checklist

## What Domain Rating can and cannot measure

Ahrefs Domain Rating is a third-party, relative measure of backlink-profile
strength. It is not a Google ranking score and cannot be set in application
code. A score of 100 is reserved for a tiny number of the web's strongest link
profiles and is not a useful launch target. Measure ScopeYes against direct
competitors, referring-domain quality, qualified organic traffic, sign-ups, and
the number of important pages earning links.

Do not buy links, automate link placement, use private blog networks, or trade
links at scale. Those tactics can inflate reports temporarily while creating
search-policy and reputation risk.

The application generates the important crawl and indexing endpoints:

- `https://www.scopeyes.com/robots.txt`
- `https://www.scopeyes.com/sitemap.xml`
- Canonical URLs and crawl directives on public pages
- `noindex` protection on sign-in, checkout, dashboard, API, and private approval routes
- Article, breadcrumb, FAQ, organization, website, and software structured data
- Google and Bing verification fields supplied through environment variables

## One-time production setup

1. Deploy with `NEXT_PUBLIC_SITE_URL=https://www.scopeyes.com`.
2. Add the domain property `scopeyes.com` in Google Search Console and verify it with a DNS TXT record. Domain verification is preferred because it covers all protocols and subdomains.
3. If HTML-tag verification is used instead, copy the verification token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.
4. Submit `https://www.scopeyes.com/sitemap.xml` in Search Console under **Sitemaps**.
5. Inspect the homepage and each new guide in **URL inspection**, run **Test live URL**, and choose **Request indexing**.
6. Add the site to Bing Webmaster Tools. Set `NEXT_PUBLIC_BING_SITE_VERIFICATION` only if Bing provides a meta-tag token.

Do not use Google’s Indexing API for these guides. Google limits that API to
pages containing `JobPosting` or livestream `BroadcastEvent` markup; normal
product and editorial pages should use crawlable links, sitemaps, and Search
Console URL inspection.

## URLs to request first

- `https://www.scopeyes.com/`
- `https://www.scopeyes.com/guides`
- `https://www.scopeyes.com/guides/freelance-scope-of-work-template`
- `https://www.scopeyes.com/guides/client-change-request-template`
- `https://www.scopeyes.com/guides/scope-creep`

## Release checks

Run these after every SEO-related deployment:

```bash
pnpm lint
pnpm build
```

Then confirm that all public URLs return `200`, use the preferred `https://www.scopeyes.com` canonical, appear in the sitemap, and are not blocked by robots. Validate the guide JSON-LD with Google Rich Results Test and Schema.org Validator.

## Ongoing authority plan

Run this as a recurring operating process; it cannot be completed by a single
deployment.

1. Record a monthly baseline in Ahrefs and Search Console: DR, followed referring
   domains, lost links, branded searches, indexed pages, impressions, clicks,
   and sign-ups from organic traffic.
2. Promote one genuinely linkable ScopeYes asset at a time. Start with the scope
   creep cost calculator, hourly-rate calculator, scope-of-work template, and
   client change-request template.
3. Build a prospect list of relevant freelance associations, agency communities,
   contract/template libraries, small-business publications, and project
   management educators. Prioritize topical relevance, editorial standards,
   real traffic, and audience fit over a site's DR number.
4. Send tailored outreach that explains exactly which resource improves an
   existing article. Do not ask for a generic homepage link.
5. Publish original data quarterly from aggregated, privacy-safe product or
   survey insights, such as the cost of unpaid scope changes. Include the method,
   sample size, limitations, charts, and downloadable data so journalists can
   cite the work.
6. Reclaim links monthly: fix broken inbound destinations, ask for a link where
   ScopeYes is already mentioned without one, and request corrected URLs when a
   publisher links to an outdated path.
7. Earn product mentions through real launches, customer case studies, podcast
   interviews, integration partners, founder profiles, and expert contributions.
   Disclose sponsorships and qualify paid links with `rel="sponsored"`.
8. Review new and lost referring domains monthly. Reject or remove only links
   that create a real manual-action or security concern; do not chase every
   low-quality-looking link.
9. Refresh the resource hub and its best assets when facts, pricing, or examples
   change. Add contextual internal links from every new article to the most
   useful related guide, tool, and product page.
10. Judge progress quarterly against direct competitors and business outcomes,
    not against an arbitrary target of 100.

Indexing cannot be guaranteed or forced by application code. Search Console submission, useful original content, internal links, crawl access, and time are the correct path; avoid third-party “instant indexing” services.
