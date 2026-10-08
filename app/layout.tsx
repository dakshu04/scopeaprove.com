import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "lenis/dist/lenis.css";

import { absoluteUrl, siteConfig } from "@/config/siteConfig";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalyticsConsent } from "@/components/analytics/google-analytics-consent";

const defaultGoogleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const defaultTitle =
  "Scope Change & Client Approval Software for Freelancers | ScopeYes";

const seoKeywords = [
  "client approval software",
  "scope change software",
  "change request software",
  "freelancer scope management",
  "scope creep tool",
  "client change request tool",
  "project change order software",
  "client sign off software",
  "freelance project management",
  "extra work approval",
] as const;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,

  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,
  keywords: [...seoKeywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "business",
  classification: "Business software for freelancers and small teams",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",

  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: "/",
    images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630 }],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [absoluteUrl("/twitter-image")],
  },

  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          other: {
            "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
          },
        }
      : {}),
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#176b55",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  const googleAnalyticsId =
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || defaultGoogleAnalyticsId;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Analytics />
        <SpeedInsights />
        {googleAnalyticsId ? (
          <GoogleAnalyticsConsent gaId={googleAnalyticsId} />
        ) : null}
      </body>
    </html>
  );
}
