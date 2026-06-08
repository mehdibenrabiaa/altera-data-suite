import type { MetadataRoute } from "next";

const BASE_URL = "https://alteradatasuite.com";
const LOCALES = ["en", "fr", "es", "de", "nl"] as const;

const STATIC_ROUTES = [
  { path: "",          changeFrequency: "weekly",  priority: 1.0  },
  { path: "/pricing",  changeFrequency: "monthly", priority: 0.9  },
  { path: "/docs",     changeFrequency: "weekly",  priority: 0.85 },
  { path: "/faqs",     changeFrequency: "monthly", priority: 0.8  },
  { path: "/about",    changeFrequency: "monthly", priority: 0.7  },
  { path: "/changelog",changeFrequency: "weekly",  priority: 0.65 },
  { path: "/terms",    changeFrequency: "yearly",  priority: 0.3  },
  { path: "/privacy",  changeFrequency: "yearly",  priority: 0.3  },
  { path: "/refund",   changeFrequency: "yearly",  priority: 0.3  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
