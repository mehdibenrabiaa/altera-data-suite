import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./WidgetsSection.module.css";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";
import SamePageLink from "./SamePageLink";

// Each card's real Altera Studio category color (nodeCatalog.ts's
// CATEGORY_META) -- carries the app's own color-coding straight onto the
// marketing site instead of a uniform neutral icon tile, the same
// category-per-node identity the app itself uses throughout its Nodes
// panel and canvas. nodeId matches widgetDocs.ts's id for each node, so
// the card can deep-link straight to that node's docs entry (DocsClient
// reads ?node=<id> on mount).
const WIDGET_ICONS = [
  { file: "pdf_converter.svg",  color: "#019B8A", nodeId: "pdf_converter" },        // io
  { file: "filter.svg",         color: "#155F98", nodeId: "filter" },               // preparation
  { file: "regex.svg",          color: "#E86F53", nodeId: "regular_expressions" },  // parse
  { file: "column_manager.svg", color: "#155F98", nodeId: "column_manager" },       // preparation
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
  lang: string;
}

export default function WidgetsSection({ t, lang }: Props) {
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
          const { file, color, nodeId } = WIDGET_ICONS[i];
          return (
            <SamePageLink
              key={widget.name}
              href={`/${lang}/docs?node=${nodeId}`}
              className={styles.card}
              style={{ "--accent": color } as CSSProperties}
            >
              <div className={styles.iconWrap} style={{ background: color }}>
                <Image src={`/widgets_icons/${file}`} alt={widget.name} width={26} height={26} loading="lazy" unoptimized className={styles.iconImg} />
              </div>
              <h3 className={styles.cardTitle}>{widget.name}</h3>
              <p className={styles.cardDesc}>{widget.description}</p>
              <span className={styles.cardLink}>{t.exploreNow} &rsaquo;</span>
            </SamePageLink>
          );
        })}
      </div>
    </section>
  );
}
