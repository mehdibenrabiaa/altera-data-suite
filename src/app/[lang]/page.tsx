import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import ResultShowcaseSection from "@/components/ResultShowcaseSection";
import StatsSection from "@/components/StatsSection";
import WidgetsSection from "@/components/WidgetsSection";
import LazyChatBot from "@/components/LazyChatBot";

const PricingSection = dynamic(() => import("@/components/PricingSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const CustomWidgetSection = dynamic(() => import("@/components/CustomWidgetSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));

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
    <main>
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
