"use client";

import { useState } from "react";
import SamePageLink from "./SamePageLink";
import SectionBadge from "./SectionBadge";
import NodeIcon from "@/app/docs/NodeIcon";
import { getWidgetDoc } from "@/data/widgetDocs";
import UseCaseIcon from "./UseCaseIcon";
import { USE_CASES } from "@/data/useCases";
import styles from "./IndustriesSection.module.css";

// Inspired by knime.com's "Empower teams across industries & departments":
// one tab per team, each leading to its own use-case page.

interface IndustriesT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  subtitle: string;
  documentsLabel: string;
  learnMore: string;
  allUseCases: string;
}

interface UseCaseItemT {
  tab: string;
  title: string;
  summary: string;
  documents: string[];
}

interface Props {
  t: IndustriesT;
  items: Record<string, UseCaseItemT>;
  lang: string;
}

export default function IndustriesSection({ t, items, lang }: Props) {
  const cases = USE_CASES.filter((u) => items[u.slug]);
  const [active, setActive] = useState(cases[0]?.slug);
  const current = cases.find((u) => u.slug === active) ?? cases[0];
  if (!current) return null;
  const item = items[current.slug];
  // The workflow's own nodes, PDF first, as a compact one-line preview
  // (side inputs like Input Data are left out -- the full page shows them)
  const chain = current.nodes
    .filter((n) => n.docId !== "input_data")
    .map((n) => getWidgetDoc(n.docId))
    .filter((d) => d !== undefined);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionBadge label={t.badgeLabel} text={t.badgeText} />
        <h2 className={styles.heading}>{t.heading}</h2>
        <p className={styles.subtitle}>{t.subtitle}</p>

        <div className={styles.tabs} role="tablist" aria-label={t.heading}>
          {cases.map((u) => (
            <button
              key={u.slug}
              type="button"
              role="tab"
              id={`tab-${u.slug}`}
              aria-selected={u.slug === current.slug}
              aria-controls="industries-panel"
              className={`${styles.tab} ${u.slug === current.slug ? styles.tabActive : ""}`}
              onClick={() => setActive(u.slug)}
            >
              <span className={styles.tabIcon}>
                <UseCaseIcon slug={u.slug} size={18} />
              </span>
              {items[u.slug].tab}
            </button>
          ))}
        </div>

        <div className={styles.panel} role="tabpanel" id="industries-panel" aria-labelledby={`tab-${current.slug}`}>
          <div className={styles.panelText}>
            <h3 className={styles.panelTitle}>{item.title}</h3>
            <p className={styles.panelSummary}>{item.summary}</p>
            <div className={styles.docsLabel}>{t.documentsLabel}</div>
            <ul className={styles.docs}>
              {item.documents.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
            <SamePageLink href={`/${lang}/use-cases/${current.slug}`} className={styles.link}>
              {t.learnMore}
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden className={styles.arrow}>
                <path d="M8.5 1.05 13.5 6l-5 4.95M13.5 6H.8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </SamePageLink>
          </div>

          <div className={styles.chain} aria-hidden>
            <span className={styles.chainPdf}>PDF</span>
            {chain.map((doc, i) => (
              <span key={`${doc.id}-${i}`} className={styles.chainStep}>
                <span className={styles.chainWire} />
                <NodeIcon node={doc} size={34} />
              </span>
            ))}
          </div>
        </div>

        <div className={styles.allRow}>
          <SamePageLink href={`/${lang}/use-cases`} className={styles.allLink}>
            {t.allUseCases}
          </SamePageLink>
        </div>
      </div>
    </section>
  );
}
