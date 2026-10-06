import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import { WIDGET_DOCS, getWidgetDoc } from "@/data/widgetDocs";
import NodeDoc from "@/app/docs/NodeDoc";
import { withDefaults } from "@/app/docs/docsText";

const BASE_URL = "https://alteradatasuite.com";

type Params = Promise<{ lang: string; node: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, node: nodeId } = await params;
  const node = getWidgetDoc(nodeId);
  if (!hasLocale(lang) || !node) return {};

  const title = `${node.name} node — Altera Data Suite Docs`;
  const description = node.tagline;
  const path = `/docs/${node.id}`;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}${path}`;
  }
  alternates["x-default"] = `${BASE_URL}/en${path}`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}${path}` },
    alternates: { canonical: `${BASE_URL}/${lang}${path}`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => WIDGET_DOCS.map((w) => ({ lang, node: w.id })));
}

export const dynamicParams = false;

export default async function NodeDocPage({ params }: { params: Params }) {
  const { lang, node: nodeId } = await params;
  const node = getWidgetDoc(nodeId);
  if (!hasLocale(lang) || !node) notFound();
  const dict = await getDictionary(lang);

  return <NodeDoc node={node} lang={lang} t={withDefaults(dict.docs)} />;
}
