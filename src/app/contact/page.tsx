import type { Metadata } from "next";
import styles from "./contact.module.css";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/ui/Button";
import SamePageLink from "@/components/SamePageLink";
import { MailIcon, BookIcon, InfoIcon, RightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "Get in touch with the Altera Data Suite team — questions, billing, or support, we respond directly, no bots.",
  alternates: { canonical: "https://alteradatasuite.com/en/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionBadge label="Support" text="We're here to help" />
          <h1 className={styles.heading}>Contact &amp; Support</h1>
          <p className={styles.lead}>
            Questions about Altera, billing, or a specific PDF you&apos;re stuck on?
            Reach out — we&apos;re a small team, so you&apos;ll always get a real
            response, not a bot.
          </p>
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
          <SamePageLink href="/en/docs" className={styles.card}>
            <div className={styles.iconWrap}>
              <BookIcon size={20} />
            </div>
            <h3 className={styles.cardTitle}>Documentation</h3>
            <p className={styles.cardDesc}>
              Step-by-step guides and configuration references for every node.
            </p>
            <span className={styles.cardLink}>
              Browse the docs <RightIcon size={14} />
            </span>
          </SamePageLink>

          <SamePageLink href="/en/faqs" className={styles.card}>
            <div className={styles.iconWrap}>
              <InfoIcon size={20} />
            </div>
            <h3 className={styles.cardTitle}>FAQs</h3>
            <p className={styles.cardDesc}>
              Answers to common questions about setup, accuracy, and pricing.
            </p>
            <span className={styles.cardLink}>
              See the FAQs <RightIcon size={14} />
            </span>
          </SamePageLink>
        </div>
      </section>
    </main>
  );
}
