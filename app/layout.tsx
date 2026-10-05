import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "lenis/dist/lenis.css";

import { siteConfig } from "@/config/siteConfig";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";

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
    default: "Change Request & Client Approval Software | ScopeYes",
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "business",

  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Change Request & Client Approval Software | ScopeYes",
    description: siteConfig.description,
    url: "/",
  },

  twitter: {
    card: "summary_large_image",
    title: "Change Request & Client Approval Software | ScopeYes",
    description: siteConfig.description,
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
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Analytics />
        <SpeedInsights />
      </body>

      {googleAnalyticsId ? (
        <GoogleAnalytics gaId={googleAnalyticsId} />
      ) : null}
    </html>
  );
}