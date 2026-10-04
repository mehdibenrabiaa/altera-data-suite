import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/ui/Button";
import AppWorkflowCanvas from "@/components/AppWorkflowCanvas";
import styles from "@/app/why-visual-workflows/why.module.css";

const BASE_URL = "https://alteradatasuite.com";

// Inspired by knime.com/why-visual-workflows: why a data flow you can see
// beats code and spreadsheets, three reasons, then what sets Altera apart.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.whyWorkflows;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/why-visual-workflows`;
  }
  alternates["x-default"] = `${BASE_URL}/en/why-visual-workflows`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/why-visual-workflows` },
    alternates: { canonical: `${BASE_URL}/${lang}/why-visual-workflows`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function WhyVisualWorkflowsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const w = dict.whyWorkflows;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <SectionBadge label={w.badgeLabel} text={w.badgeText} />
        <h1 className={styles.heroHeading}>{w.heading}</h1>
        <p className={styles.lead}>{w.lead}</p>
      </header>

      <article className={styles.article}>
        {w.intro.map((p) => (
          <p key={p} className={styles.prose}>{p}</p>
        ))}

        <figure className={styles.figure}>
          <AppWorkflowCanvas t={w.canvas} />
          <figcaption className={styles.caption}>{w.diagramCaption}</figcaption>
        </figure>

        <p className={styles.prose}>{w.reasonsIntro}</p>

        {w.reasons.map((r, i) => (
          <section key={r.title} className={styles.reason}>
            <h2 className={styles.reasonTitle}>
              <span className={styles.reasonNumber}>{i + 1}.</span> {r.title}
            </h2>
            {r.body.map((p) => (
              <p key={p} className={styles.prose}>{p}</p>
            ))}
          </section>
        ))}

        <section className={styles.different}>
          <h2 className={styles.differentHeading}>{w.differentHeading}</h2>
          <div className={styles.differentGrid}>
            {w.different.map((d) => (
              <div key={d.title} className={styles.differentCard}>
                <h3 className={styles.differentTitle}>{d.title}</h3>
                <p className={styles.differentBody}>{d.body}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <div className={styles.cta}>
        <h2 className={styles.ctaHeading}>{w.ctaHeading}</h2>
        <p className={styles.ctaText}>{w.ctaText}</p>
        <div className={styles.ctaButtons}>
          <Button type="primary" size="large" href={`/${lang}/download`} style={{ fontWeight: 600, borderRadius: 0 }}>
            {w.ctaDownload}
          </Button>
          <Button size="large" href={`/${lang}/docs`} style={{ fontWeight: 600, borderRadius: 0 }}>
            {w.ctaDocs}
          </Button>
        </div>
      </div>
    </main>
  );
}
