import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import DocsClient from "@/app/docs/DocsClient";

const BASE_URL = "https://alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.docs;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/docs`;
  }
  alternates["x-default"] = `${BASE_URL}/en/docs`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/docs` },
    alternates: { canonical: `${BASE_URL}/${lang}/docs`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return <DocsClient t={dict.docs} />;
}
