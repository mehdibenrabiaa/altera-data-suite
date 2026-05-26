import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import ResultShowcaseSection from "@/components/ResultShowcaseSection";
import StatsSection from "@/components/StatsSection";
import WidgetsSection from "@/components/WidgetsSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CustomWidgetSection from "@/components/CustomWidgetSection";
import FAQSection from "@/components/FAQSection";
import ChatBot from "@/components/ChatBot";

const BASE_URL = "https://www.alteradatasuite.com";

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
    alternates: { languages: alternates },
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

  return (
    <>
      <link rel="preload" href="/HERO BOXE1.webp" as="image" type="image/webp" fetchPriority="high" />
    <main>
      <Hero t={dict.hero} lang={lang} featureCards={dict.featureCards} />
      <ResultShowcaseSection t={dict.resultShowcase} lang={lang} />
      <StatsSection t={dict.stats} />
      <WidgetsSection t={dict.widgets} />
      <PricingSection t={dict.pricing} lang={lang} />
      <TestimonialsSection t={dict.testimonials} />
      <CustomWidgetSection t={dict.customWidget} />
      <FAQSection t={dict.faqSection} items={faqItems} />
      <ChatBot t={dict.chatbot} />
    </main>
    </>
  );
}
