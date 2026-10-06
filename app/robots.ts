import type { MetadataRoute } from "next";

import { absoluteUrl, siteConfig } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ["/api/", "/approve/", "/dashboard/", "/sign-in"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: new URL(siteConfig.url).host,
  };
}
