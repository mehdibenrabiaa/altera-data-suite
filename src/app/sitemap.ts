import type { MetadataRoute } from "next";
import { WIDGET_DOCS } from "@/data/widgetDocs";
import { USE_CASES } from "@/data/useCases";

const BASE_URL = "https://alteradatasuite.com";
const LOCALES = ["en", "fr", "es", "de", "nl"] as const;

const STATIC_ROUTES = [
  { path: "",          changeFrequency: "weekly",  priority: 1.0  },
  { path: "/pricing",  changeFrequency: "monthly", priority: 0.9  },
  { path: "/download", changeFrequency: "monthly", priority: 0.9  },
  { path: "/use-cases", changeFrequency: "monthly", priority: 0.75 },
  { path: "/why-visual-workflows", changeFrequency: "monthly", priority: 0.7 },
  { path: "/docs",     changeFrequency: "weekly",  priority: 0.85 },
  { path: "/faqs",     changeFrequency: "monthly", priority: 0.8  },
  { path: "/about",    changeFrequency: "monthly", priority: 0.7  },
  { path: "/contact",  changeFrequency: "yearly",  priority: 0.5  },
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

  for (const useCase of USE_CASES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/use-cases/${useCase.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  for (const node of WIDGET_DOCS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/docs/${node.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
