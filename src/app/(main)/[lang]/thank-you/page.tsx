import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import { PLANS, getPlan } from "@/lib/plans";
import { CheckCircleFilledIcon, MailIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import SentToLine from "@/app/thank-you/SentToLine";
import styles from "@/app/thank-you/thank-you.module.css";

const SUPPORT_EMAIL = "support@alteradatasuite.com";

// Where the checkout sends buyers once Paddle reports checkout.completed.
// The license itself is issued and emailed by altera-license-server's
// Paddle webhook -- this page just confirms and explains what's next.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.thankYou.metaTitle, robots: { index: false, follow: false } };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.thankYou;

  // Translated plan name (pricing.plans is in the same order as PLANS)
  const { plan: planKey } = await searchParams;
  const plan = getPlan(planKey);
  const planName = plan ? dict.pricing.plans[PLANS.indexOf(plan)]?.name : undefined;

  return (
    <main>
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.hero}>
            <span className={styles.checkIcon}>
              <CheckCircleFilledIcon size={30} />
            </span>
            {/* Plan as a badge, not inside the sentence -- inserting it into
                the sentence breaks grammar in fr/es/de/nl */}
            {planName && <span className={styles.planBadge}>{planName}</span>}
            <h1 className={styles.heading}>{t.heading}</h1>
            <p className={styles.subtitle}>{t.subtitleGeneric}</p>
            <SentToLine sentTo={t.sentTo} sentGeneric={t.sentGeneric} className={styles.sentTo} />
          </div>

          <div className={styles.body}>
            <div className={styles.downloadRow}>
              <Button type="primary" size="large" href={`/${lang}/download`} style={{ fontWeight: 600, borderRadius: 0 }}>
                {t.downloadBtn}
              </Button>
            </div>
          </div>

          <div className={styles.help}>
            <span className={styles.helpIcon}>
              <MailIcon size={20} />
            </span>
            <div className={styles.helpText}>
              <div className={styles.helpTitle}>{t.helpTitle}</div>
              <p className={styles.helpBody}>{t.helpBody}</p>
              <a href={`mailto:${SUPPORT_EMAIL}`} className={styles.helpEmail}>
                {SUPPORT_EMAIL}
              </a>
            </div>
            <a href={`mailto:${SUPPORT_EMAIL}`} className={styles.helpBtn}>
              {t.emailBtn}
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
