import Image from "next/image";
import { Button } from "antd";
import SectionBadge from "./SectionBadge";
import styles from "./ResultShowcaseSection.module.css";

interface ResultShowcaseT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  subtitle: string;
  tryFree: string;
  seeHow: string;
}

interface Props {
  t: ResultShowcaseT;
  lang: string;
}

export default function ResultShowcaseSection({ t, lang }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.text}>
          <SectionBadge label={t.badgeLabel} text={t.badgeText} className={styles.badgeLeft} />

          <h2 className={styles.heading}>{t.heading}</h2>

          <p className={styles.subtitle}>{t.subtitle}</p>

          <div className={styles.ctas}>
            <Button type="primary" size="large" href={`/${lang}/trial`} style={{ fontWeight: 700 }} className={styles.ctaBtn}>
              {t.tryFree}
            </Button>
            <Button size="large" href={`/${lang}/demo`} className={styles.ctaBtn}>
              {t.seeHow}
            </Button>
          </div>
        </div>

        <div className={styles.preview}>
          <Image
            src="/SVG/convert_illustration.svg"
            alt="PDF to clean data conversion"
            width={600}
            height={500}
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
            unoptimized
          />
        </div>

      </div>
    </section>
  );
}
