import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./WidgetsSection.module.css";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

// Each card's real Altera Studio category color (nodeCatalog.ts's
// CATEGORY_META) -- carries the app's own color-coding straight onto the
// marketing site instead of a uniform neutral icon tile, the same
// category-per-node identity the app itself uses throughout its Nodes
// panel and canvas.
const WIDGET_ICONS = [
  { file: "pdf_converter.svg",  color: "#019B8A" }, // io
  { file: "filter.svg",         color: "#155F98" }, // preparation
  { file: "regex.svg",          color: "#E86F53" }, // parse
  { file: "column_manager.svg", color: "#155F98" }, // preparation
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
        {t.items.map((widget, i) => {
          const { file, color } = WIDGET_ICONS[i];
          return (
            <div key={widget.name} className={styles.card} style={{ "--accent": color } as CSSProperties}>
              <div className={styles.iconWrap} style={{ background: color }}>
                <Image src={`/widgets_icons/${file}`} alt={widget.name} width={26} height={26} loading="lazy" unoptimized className={styles.iconImg} />
              </div>
              <h3 className={styles.cardTitle}>{widget.name}</h3>
              <p className={styles.cardDesc}>{widget.description}</p>
              <span className={styles.cardLink}>{t.exploreNow} &rsaquo;</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
