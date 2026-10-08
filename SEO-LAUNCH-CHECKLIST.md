# ScopeYes search indexing launch checklist

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

Indexing cannot be guaranteed or forced by application code. Search Console submission, useful original content, internal links, crawl access, and time are the correct path; avoid third-party “instant indexing” services.
