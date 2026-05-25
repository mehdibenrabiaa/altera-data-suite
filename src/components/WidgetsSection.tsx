import Image from "next/image";
import styles from "./WidgetsSection.module.css";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

const WIDGET_ICONS = [
  "pdf_converter.svg",
  "filter.svg",
  "regex.svg",
  "column_manager.svg",
];

interface WidgetItem {
  name: string;
  description: string;
}

interface WidgetsT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  subtitle: string;
  exploreNow: string;
  items: WidgetItem[];
}

interface Props {
  t: WidgetsT;
}

export default function WidgetsSection({ t }: Props) {
  return (
    <section className={styles.section}>
      <SectionBadge label={t.badgeLabel} text={t.badgeText} />
      <SectionHeading
        heading={t.heading}
        subtitle={t.subtitle}
        subtitleMaxWidth={560}
      />

      <div className={styles.grid}>
        {t.items.map((widget, i) => (
          <div key={widget.name} className={styles.card}>
            <div className={styles.iconWrap}>
              <Image src={`/widgets_icons/${WIDGET_ICONS[i]}`} alt={widget.name} width={40} height={40} />
            </div>
            <h3 className={styles.cardTitle}>{widget.name}</h3>
            <p className={styles.cardDesc}>{widget.description}</p>
            <span className={styles.cardLink}>{t.exploreNow} &rsaquo;</span>
          </div>
        ))}
      </div>
    </section>
  );
}
