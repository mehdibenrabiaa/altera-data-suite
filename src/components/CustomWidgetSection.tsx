import Image from "next/image";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";
import styles from "./CustomWidgetSection.module.css";

interface CustomWidgetT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  subtitle: string;
  rowWhatLabel: string;
  rowWhatValue: string;
  rowTurnaroundLabel: string;
  rowTurnaroundValue: string;
  rowPricingLabel: string;
  rowPricingValue: string;
  rowContactLabel: string;
}

interface Props {
  t: CustomWidgetT;
}

export default function CustomWidgetSection({ t }: Props) {
  return (
    <section className={styles.section}>
      <div>
        <Image
          src="/SVG/altera_logo_white.svg"
          alt="Altera Data Suite"
          width={72}
          height={72}
          className={styles.logo}
        />
      </div>

      <div className={styles.content}>
        <SectionBadge
          label={t.badgeLabel}
          text={t.badgeText}
          className={styles.badgeLeft}
        />

        <SectionHeading
          heading={t.heading}
          subtitle={t.subtitle}
          className={styles.headingLeft}
        />

        <div className={styles.table}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{t.rowWhatLabel}</span>
            <span className={styles.rowValue}>{t.rowWhatValue}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{t.rowTurnaroundLabel}</span>
            <span className={styles.rowValue}>{t.rowTurnaroundValue}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{t.rowPricingLabel}</span>
            <span className={styles.rowValue}>{t.rowPricingValue}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{t.rowContactLabel}</span>
            <span className={styles.rowValue}>
              <a
                href="mailto:support@alteradatasuite.com"
                className={styles.link}
              >
                support@alteradatasuite.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
