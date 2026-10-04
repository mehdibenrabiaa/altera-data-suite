import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import { USE_CASES, type UseCaseItemT } from "@/data/useCases";
import SectionBadge from "@/components/SectionBadge";
import UseCaseIcon from "@/components/UseCaseIcon";
import SamePageLink from "@/components/SamePageLink";
import GetStartedSection from "@/components/GetStartedSection";
import styles from "@/app/use-cases/use-cases.module.css";

const BASE_URL = "https://alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.useCases;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/use-cases`;
  }
  alternates["x-default"] = `${BASE_URL}/en/use-cases`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/use-cases` },
    alternates: { canonical: `${BASE_URL}/${lang}/use-cases`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const u = dict.useCases;
  const items: Record<string, UseCaseItemT> = u.items;

  return (
    <main>
      <div className={styles.page}>
        <header className={styles.hero}>
          <SectionBadge label={u.badgeLabel} text={u.badgeText} />
          <h1 className={styles.heading}>{u.heading}</h1>
          <p className={styles.lead}>{u.lead}</p>
        </header>

        <div className={styles.grid}>
          {USE_CASES.filter((c) => items[c.slug]).map((c) => {
            const item = items[c.slug];
            return (
              <SamePageLink key={c.slug} href={`/${lang}/use-cases/${c.slug}`} className={styles.card}>
                <span className={styles.cardIcon}>
                  <UseCaseIcon slug={c.slug} size={20} />
                </span>
                <span className={styles.cardTab}>{item.tab}</span>
                <span className={styles.cardTitle}>{item.title}</span>
                <span className={styles.cardSummary}>{item.summary}</span>
                <span className={styles.cardLink}>{u.learnMore} →</span>
              </SamePageLink>
            );
          })}
        </div>
      </div>
      <GetStartedSection t={dict.getStarted} lang={lang} />
    </main>
  );
}
