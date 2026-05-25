import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import LegalPage, { type LegalGroup } from "@/components/LegalPage";

const BASE_URL = "https://www.alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.terms;
  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/terms` },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <LegalPage title={dict.meta.terms.title} lastUpdated={dict.legal.lastUpdated} lastUpdatedLabel={dict.legal.lastUpdatedLabel} badge={dict.legal.badge} groups={dict.termsContent.groups as LegalGroup[]} />;
}
