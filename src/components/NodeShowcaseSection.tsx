import Image from "next/image";
import SamePageLink from "./SamePageLink";
import SectionBadge from "./SectionBadge";
import { isLightColor } from "@/data/widgetDocs";
import styles from "./NodeShowcaseSection.module.css";

// Layout cloned from knime.com's "Empower all data users" section: one row
// per example node, illustration and text alternating sides on desktop.
//
// Each row's `illustration` is the final artwork -- drop the SVG into
// /public and set its path here. Until then the row renders a placeholder
// in the same style (the node's category-colored tile wired into a canvas).
// Order matches dict.nodeShowcase.items; nodeId links to /docs/<nodeId>.
const NODES: { nodeId: string; icon: string; color: string; illustration?: string }[] = [
  { nodeId: "pdf_converter", icon: "convert_bolt.svg",  color: "#FE4D41" }, // conversion -- the app's Convert icon
  { nodeId: "cleaner",       icon: "cleaner.svg",       color: "#155F98" }, // preparation
  { nodeId: "merge",         icon: "merge.svg",         color: "#7753A0" }, // join
  { nodeId: "group_by",      icon: "group_by.svg",      color: "#FFD800" }, // transform
];

interface ShowcaseItem {
  title: string;
  bullets: string[];
}

interface NodeShowcaseT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  learnMore: string;
  whyLink: string;
  items: ShowcaseItem[];
}

interface Props {
  t: NodeShowcaseT;
  lang: string;
}

export default function NodeShowcaseSection({ t, lang }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionBadge label={t.badgeLabel} text={t.badgeText} />
        <h2 className={styles.heading}>{t.heading}</h2>

        {t.items.map((item, i) => {
          const node = NODES[i];
          if (!node) return null;
          return (
            <div key={node.nodeId} className={`${styles.row} ${i % 2 === 1 ? styles.rowReverse : ""}`}>
              <div className={styles.media}>
                {node.illustration ? (
                  <Image src={node.illustration} alt={item.title} width={520} height={520} unoptimized className={styles.illustration} />
                ) : (
                  <NodePlaceholder icon={node.icon} color={node.color} />
                )}
              </div>

              <div className={styles.text}>
                <h3 className={styles.title}>{item.title}</h3>
                <ul className={styles.bullets}>
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className={styles.linkRow}>
                  <SamePageLink href={`/${lang}/docs/${node.nodeId}`} className={styles.link}>
                    {t.learnMore}
                    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden className={styles.arrow}>
                      <path d="M8.5 1.05 13.5 6l-5 4.95M13.5 6H.8" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </SamePageLink>
                </div>
              </div>
            </div>
          );
        })}

        <div className={styles.whyRow}>
          <SamePageLink href={`/${lang}/why-visual-workflows`} className={styles.whyLink}>
            {t.whyLink}
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden className={styles.arrow}>
              <path d="M8.5 1.05 13.5 6l-5 4.95M13.5 6H.8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </SamePageLink>
        </div>
      </div>
    </section>
  );
}

// Stand-in artwork: a white canvas card with the node's tile, an input
// port arrow on the left, an output wire curving off to the right, and a
// faint dot grid -- the same composition as KNIME's persona illustrations.
function NodePlaceholder({ icon, color }: { icon: string; color: string }) {
  return (
    <div className={styles.placeholder} aria-hidden>
      <svg className={styles.wires} viewBox="0 0 520 520" fill="none">
        <path d="M0 260h108" stroke="#c4c8cf" strokeWidth="4" />
        <path d="M106 241l30 19-30 19z" fill="#c4c8cf" />
        <path d="M312 260h66c20 0 30-10 30-30v-14c0-20 10-30 30-30h82" stroke="#c4c8cf" strokeWidth="4" />
        <path d="M0 418h20c20 0 30 10 30 30v72" stroke="#c4c8cf" strokeWidth="4" />
        {Array.from({ length: 5 }).flatMap((_, r) =>
          Array.from({ length: 5 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={300 + c * 32} cy={330 + r * 32} r="8" fill={color} opacity="0.1" />
          )),
        )}
      </svg>
      <div className={`${styles.tile} ${isLightColor(color) ? styles.tileDark : ""}`} style={{ background: color }}>
        <Image src={`/widgets_icons/${icon}`} alt="" width={80} height={80} loading="eager" unoptimized />
      </div>
    </div>
  );
}
