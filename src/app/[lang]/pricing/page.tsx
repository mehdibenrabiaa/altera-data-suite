import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";

const BASE_URL = "https://www.alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.pricing;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/pricing`;
  }
  alternates["x-default"] = `${BASE_URL}/en/pricing`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/pricing` },
    alternates: { languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const faqs = dict.pricing.faqs.map((f) => ({
    key: f.key,
    label: f.label,
    children: f.text,
  }));

  return (
    <main>
      <PricingSection t={dict.pricing} lang={lang} />
      <FAQSection t={dict.faqSection} items={faqs} />
    </main>
  );
}
