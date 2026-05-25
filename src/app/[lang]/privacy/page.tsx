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
  const { title, description } = dict.meta.privacy;
  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/privacy` },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <LegalPage title={dict.meta.privacy.title} lastUpdated={dict.legal.lastUpdated} lastUpdatedLabel={dict.legal.lastUpdatedLabel} badge={dict.legal.badge} groups={dict.privacyContent.groups as LegalGroup[]} />;
}
