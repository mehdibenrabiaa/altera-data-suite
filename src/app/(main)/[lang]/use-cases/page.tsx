import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import styles from "@/app/use-cases/use-cases.module.css";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/ui/Button";

const BASE_URL = "https://alteradatasuite.com";

// Placeholder page -- noindex until real use-case content replaces this.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.useCases;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `${BASE_URL}/${lang}/use-cases` },
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

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionBadge label={u.badgeLabel} text={u.badgeText} />
          <h1 className={styles.heading}>{u.heading}</h1>
          <p className={styles.lead}>{u.lead}</p>
          <Button type="primary" size="large" href={`/${lang}/contact`} className={styles.cta}>
            {u.ctaLabel}
          </Button>
        </div>
      </section>
    </main>
  );
}
