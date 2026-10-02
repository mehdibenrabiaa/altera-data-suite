import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import styles from "@/app/download/download.module.css";
import SectionBadge from "@/components/SectionBadge";
import DownloadCards from "@/app/download/DownloadCards";
import SamePageLink from "@/components/SamePageLink";
import { WarningIcon, CheckCircleFilledIcon } from "@/components/icons";

const BASE_URL = "https://alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.download;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/download`;
  }
  alternates["x-default"] = `${BASE_URL}/en/download`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/download` },
    alternates: { canonical: `${BASE_URL}/${lang}/download`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function DownloadPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ unavailable?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.download;
  const { unavailable } = await searchParams;

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionBadge label={d.heroBadgeLabel} text={d.heroBadgeText} />
          <h1 className={styles.heading}>{d.heroHeading}</h1>
          <p className={styles.lead}>{d.heroLead}</p>
          <p className={styles.trialNote}>
            <CheckCircleFilledIcon size={15} />
            {d.trialNote}
          </p>
          {unavailable && (
            <p style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#a15c00", background: "#fff6e8", border: "1px solid #ffe2ad", borderRadius: 8, padding: "10px 16px", margin: 0 }}>
              <WarningIcon size={15} />
              {d.unavailableNotice}
            </p>
          )}
        </div>
      </section>

      <section className={styles.cardsSection}>
        <DownloadCards lang={lang} t={d} />
        <p className={styles.footnote}>
          {d.helpPre}{" "}
          <SamePageLink href={`/${lang}/docs`}>{d.helpLink}</SamePageLink>.
        </p>
      </section>
    </main>
  );
}
