import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import styles from "@/app/contact/contact.module.css";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/ui/Button";
import SamePageLink from "@/components/SamePageLink";
import { MailIcon, BookIcon, InfoIcon, RightIcon } from "@/components/icons";

const BASE_URL = "https://alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.contact;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/contact`;
  }
  alternates["x-default"] = `${BASE_URL}/en/contact`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/contact` },
    alternates: { canonical: `${BASE_URL}/${lang}/contact`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = dict.contact;

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionBadge label={c.badgeLabel} text={c.badgeText} />
          <h1 className={styles.heading}>{c.heading}</h1>
          <p className={styles.lead}>{c.lead}</p>
          <Button
            type="primary"
            size="large"
            href="mailto:support@alteradatasuite.com"
            icon={<MailIcon size={16} />}
            className={styles.emailBtn}
            style={{ fontWeight: 600 }}
          >
            support@alteradatasuite.com
          </Button>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.grid}>
          <SamePageLink href={`/${lang}/docs`} className={styles.card}>
            <div className={styles.iconWrap}>
              <BookIcon size={20} />
            </div>
            <h3 className={styles.cardTitle}>{c.docsTitle}</h3>
            <p className={styles.cardDesc}>{c.docsDesc}</p>
            <span className={styles.cardLink}>
              {c.docsLink} <RightIcon size={14} />
            </span>
          </SamePageLink>

          <SamePageLink href={`/${lang}/faqs`} className={styles.card}>
            <div className={styles.iconWrap}>
              <InfoIcon size={20} />
            </div>
            <h3 className={styles.cardTitle}>{c.faqsTitle}</h3>
            <p className={styles.cardDesc}>{c.faqsDesc}</p>
            <span className={styles.cardLink}>
              {c.faqsLink} <RightIcon size={14} />
            </span>
          </SamePageLink>
        </div>
      </section>
    </main>
  );
}
