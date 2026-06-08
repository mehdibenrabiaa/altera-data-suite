import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";
import { essentialFaqItems } from "@/data/faqItems";
import styles from "./FAQSection.module.css";

interface FAQSectionT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  subtitle: string;
}

interface FAQSectionProps {
  t?: FAQSectionT;
  items?: { key: string; label: string; children: string }[];
}

const DEFAULT_T: FAQSectionT = {
  badgeLabel: "FAQ",
  badgeText: "Got questions? We've got answers.",
  heading: "Everything you need to know",
  subtitle: "Can't find what you're looking for? Reach out and we'll get back to you.",
};

export default function FAQSection({
  t = DEFAULT_T,
  items = essentialFaqItems,
}: FAQSectionProps) {
  return (
    <section className={styles.section}>
      <SectionBadge label={t.badgeLabel} text={t.badgeText} />
      <SectionHeading heading={t.heading} subtitle={t.subtitle} />
      <div className={styles.list}>
        {items.map((item) => (
          <details key={item.key} className={styles.item}>
            <summary className={styles.question}>{item.label}</summary>
            <p className={styles.answer}>{item.children}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
