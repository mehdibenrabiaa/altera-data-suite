import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import ResultShowcaseSection from "@/components/ResultShowcaseSection";
import StatsSection from "@/components/StatsSection";
import WidgetsSection from "@/components/WidgetsSection";
import FAQSection from "@/components/FAQSection";
import LazyChatBot from "@/components/LazyChatBot";

const PricingSection = dynamic(() => import("@/components/PricingSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const CustomWidgetSection = dynamic(() => import("@/components/CustomWidgetSection"));

const BASE_URL = "https://alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.home;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}`;
  }
  alternates["x-default"] = `${BASE_URL}/en`;

  return {
    title: { default: title, template: `%s — ${title}` },
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}` },
    twitter: { title, description },
    alternates: { canonical: `${BASE_URL}/${lang}`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const faqItems = dict.allFaqs.slice(0, 5).map((f) => ({
    key: f.key,
    label: f.label,
    children: f.text,
  }));

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Altera Data Suite",
    "url": `${BASE_URL}/${lang}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Windows",
    "description": dict.meta.home.description,
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Trial",
        "price": "0",
        "priceCurrency": "USD",
        "description": "7-day free trial with 10+ widgets"
      },
      {
        "@type": "Offer",
        "name": "Professional",
        "price": "99",
        "priceCurrency": "USD",
        "description": "Unlimited PDF processing, AI-powered tools, single machine license"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": String(dict.testimonials.cards.length),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": dict.testimonials.cards.map((c) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": c.name },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": c.text,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dict.allFaqs.slice(0, 5).map((f) => ({
      "@type": "Question",
      "name": f.label,
      "acceptedAnswer": { "@type": "Answer", "text": f.text },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Hero t={dict.hero} lang={lang} featureCards={dict.featureCards} />
      <ResultShowcaseSection t={dict.resultShowcase} lang={lang} />
      <StatsSection t={dict.stats} />
      <WidgetsSection t={dict.widgets} />
      <PricingSection t={dict.pricing} lang={lang} />
      <TestimonialsSection t={dict.testimonials} />
      <CustomWidgetSection t={dict.customWidget} />
      <FAQSection t={dict.faqSection} items={faqItems} />
      <LazyChatBot t={dict.chatbot} />
    </main>
  );
}
