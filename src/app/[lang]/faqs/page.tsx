import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
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
  const { title, description } = dict.meta.faqs;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/faqs`;
  }
  alternates["x-default"] = `${BASE_URL}/en/faqs`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/faqs` },
    alternates: { canonical: `${BASE_URL}/${lang}/faqs`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function FAQsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const items = dict.allFaqs.map((f) => ({
    key: f.key,
    label: f.label,
    children: f.text,
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dict.allFaqs.map((f) => ({
      "@type": "Question",
      "name": f.label,
      "acceptedAnswer": { "@type": "Answer", "text": f.text },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
        }}
      >
        {dict.faqs.pageTitle}
      </h1>
      <FAQSection t={dict.faqSection} items={items} />
      <ChatBot t={dict.chatbot} />
    </main>
  );
}
