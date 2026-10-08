import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: "2026-10-09",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: "2026-10-06",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/guides/scope-creep"),
      lastModified: "2026-10-06",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/guides/client-change-request-template"),
      lastModified: "2026-10-07",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/guides/freelance-scope-of-work-template"),
      lastModified: "2026-10-09",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/security"),
      lastModified: "2026-10-06",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: "2026-10-06",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: "2026-10-06",
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: "2026-10-06",
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
