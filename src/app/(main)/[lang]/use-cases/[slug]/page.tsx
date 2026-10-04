import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import { USE_CASES, getUseCase, type UseCaseItemT } from "@/data/useCases";
import SectionBadge from "@/components/SectionBadge";
import UseCaseIcon from "@/components/UseCaseIcon";
import SamePageLink from "@/components/SamePageLink";
import GetStartedSection from "@/components/GetStartedSection";
import UseCaseCanvas from "@/components/UseCaseCanvas";
import styles from "@/app/use-cases/use-cases.module.css";

const BASE_URL = "https://alteradatasuite.com";

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !getUseCase(slug)) return {};
  const dict = await getDictionary(lang);
  const items: Record<string, UseCaseItemT> = dict.useCases.items;
  const item = items[slug];
  if (!item) return {};
  const { metaTitle: title, metaDescription: description } = item;
  const path = `/use-cases/${slug}`;

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
  return LOCALES.flatMap((lang) => USE_CASES.map((u) => ({ lang, slug: u.slug })));
}

export const dynamicParams = false;

export default async function UseCasePage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const layout = getUseCase(slug);
  if (!hasLocale(lang) || !layout) notFound();
  const dict = await getDictionary(lang);
  const u = dict.useCases;
  const items: Record<string, UseCaseItemT> = u.items;
  const item = items[slug];
  if (!item) notFound();
  const others = USE_CASES.filter((c) => c.slug !== slug && items[c.slug]);

  return (
    <main>
      <div className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <SamePageLink href={`/${lang}/use-cases`}>{u.labels.allUseCases}</SamePageLink>
          <span aria-hidden>/</span>
          <span>{item.tab}</span>
        </nav>

        <header className={styles.detailHero}>
          <SectionBadge label={u.badgeLabel} text={item.tab} />
          <h1 className={styles.heading}>{item.title}</h1>
          <p className={styles.lead}>{item.lead}</p>
        </header>

        <div className={styles.columns}>
          <section>
            <h2 className={styles.sectionTitle}>{u.labels.challenge}</h2>
            <p className={styles.prose}>{item.challenge}</p>
          </section>
          <section>
            <h2 className={styles.sectionTitle}>{u.labels.documents}</h2>
            <ul className={styles.docs}>
              {item.documents.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.workflow}>
          <h2 className={styles.sectionTitle}>{u.labels.workflow}</h2>
          <UseCaseCanvas slug={slug} canvas={item.canvas} />
          <p className={styles.hint}>{u.labels.workflowHint}</p>
        </section>

        <section className={styles.stepsSection}>
          <h2 className={styles.sectionTitle}>{u.labels.steps}</h2>
          <ol className={styles.steps}>
            {item.steps.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <div>
                  <span className={styles.stepNode}>{s.node}</span>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.outcomesSection}>
          <h2 className={styles.sectionTitle}>{u.labels.outcomes}</h2>
          <ul className={styles.outcomes}>
            {item.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>

        <section className={styles.others}>
          <h2 className={styles.sectionTitle}>{u.labels.otherUseCases}</h2>
          <div className={styles.othersGrid}>
            {others.map((c) => (
              <SamePageLink key={c.slug} href={`/${lang}/use-cases/${c.slug}`} className={styles.otherCard}>
                <span className={styles.cardIcon}>
                  <UseCaseIcon slug={c.slug} size={20} />
                </span>
                <span>
                  <span className={styles.cardTab}>{items[c.slug].tab}</span>
                  <span className={styles.otherTitle}>{items[c.slug].title}</span>
                </span>
              </SamePageLink>
            ))}
          </div>
        </section>
      </div>
      <GetStartedSection t={dict.getStarted} lang={lang} />
    </main>
  );
}
