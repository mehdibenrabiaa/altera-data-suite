import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import styles from "@/app/about/about.module.css";
import SectionBadge from "@/components/SectionBadge";
import TeamCards from "@/app/about/TeamCards";
import AboutCTAButtons from "@/app/about/AboutCTAButtons";

const BASE_URL = "https://www.alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.about;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/about`;
  }
  alternates["x-default"] = `${BASE_URL}/en/about`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/about` },
    alternates: { languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const a = dict.about;

  return (
    <main>
      {/* Hero / Team */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionBadge label={a.heroBadgeLabel} text={a.heroBadgeText} />
          <h1 className={styles.heading}>{a.heroHeading}</h1>
          <p className={styles.lead}>{a.heroLead}</p>
          <TeamCards t={a.team} />
        </div>
      </section>

      {/* Story */}
      <section className={styles.storySection}>
        <div className={styles.storyInner}>
          <SectionBadge label={a.storyBadgeLabel} text={a.storyBadgeText} />

          <div className={styles.storyGrid}>
            {[
              { num: "1", heading: a.story1Heading, text: a.story1Text },
              { num: "2", heading: a.story2Heading, text: a.story2Text },
              { num: "3", heading: a.story3Heading, text: a.story3Text },
              { num: "4", heading: a.story4Heading, text: a.story4Text },
            ].map(({ num, heading, text }) => (
              <div key={num} className={styles.storyBlock}>
                <div className={styles.storyTitleRow}>
                  <span className={styles.storyNum}>{num}</span>
                  <h2 className={styles.storyHeading}>{heading}</h2>
                </div>
                <p className={styles.storyText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>{a.ctaHeading}</h2>
          <p className={styles.ctaSubtitle}>{a.ctaSubtitle}</p>
          <AboutCTAButtons
            lang={lang}
            watchDemo={a.watchDemo}
            seePricing={a.seePricing}
          />
        </div>
      </section>
    </main>
  );
}
