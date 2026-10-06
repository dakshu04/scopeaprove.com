# ScopeYes

ScopeYes is a Next.js SaaS app for managing project scope, change requests, client approvals, and billing for freelancers and small service teams.

## Stack

- Next.js 16
- React 19
- TypeScript
- Prisma + PostgreSQL
- Better Auth
- Dodo Payments
- Tailwind CSS

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Copy the environment template and fill in your values:

```bash
cp .env.example .env
```

3. Start the app:

```bash
pnpm dev
```

Open http://localhost:3000

## Required environment variables

See [.env.example](.env.example) for the full list. Minimum production values include:

- DATABASE_URL
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- DODO_PAYMENTS_API_KEY
- DODO_PAYMENTS_PRODUCT_ID
- DODO_PAYMENTS_RETURN_URL
- DODO_PAYMENTS_ENVIRONMENT
- DODO_PAYMENTS_WEBHOOK_KEY

Optional SEO and analytics values:

- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
- NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
- NEXT_PUBLIC_BING_SITE_VERIFICATION

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm test
```

## Production notes

- Build the project with `pnpm build`.
- Ensure your PostgreSQL database is available before running the app in production.
- Generate Prisma client as part of the build script.
- Set the site URL explicitly in `NEXT_PUBLIC_SITE_URL` so canonical URLs, robots metadata, and OG tags point to the correct domain.
- Protect secret values using your hosting platform’s environment management system.

## SEO and public pages

The app includes:

- sitemap generation
- robots.txt generation
- canonical metadata on public pages
- Open Graph and Twitter social cards
- structured data for site, company, and legal pages

Public routes include:

- `/`
- `/about`
- `/contact`
- `/guides/scope-creep`
- `/privacy`
- `/security`
- `/terms`

## Deployment

This app is designed for a modern Next.js hosting provider such as Vercel. For production, configure the environment variables above and deploy with the corresponding domain.
