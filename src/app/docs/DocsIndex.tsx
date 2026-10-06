"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SamePageLink from "@/components/SamePageLink";
import { WIDGET_DOCS, getNodesByCategory } from "@/data/widgetDocs";
import type { DocsT } from "./docsText";
import NodeIcon from "./NodeIcon";
import VideoCta from "./VideoCta";
import styles from "./docs.module.css";

interface Props {
  lang: string;
  t: DocsT;
}

const GROUPS = getNodesByCategory();

export default function DocsIndex({ lang, t }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Old deep links used /docs?node=<id> -- send them to the node's own page.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("node");
    if (id && WIDGET_DOCS.some((w) => w.id === id)) {
      router.replace(`/${lang}/docs/${id}`);
    }
  }, [lang, router]);

  const q = query.trim().toLowerCase();
  const groups = GROUPS.map((g) => ({
    ...g,
    nodes: q
      ? g.nodes.filter(
          (w) => w.name.toLowerCase().includes(q) || w.tagline.toLowerCase().includes(q),
        )
      : g.nodes,
  })).filter((g) => g.nodes.length > 0);

  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <header className={styles.catalogHeader}>
          <h1 className={styles.nodeTitle}>{t.catalogTitle}</h1>
          <p className={styles.lede}>{t.catalogIntro}</p>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
            className={styles.searchInput}
          />
        </header>

        {groups.length === 0 && <p className={styles.portNone}>{t.noResults}</p>}

        {groups.map((g) => (
          <section key={g.key} className={styles.catalogGroup}>
            <h2 className={styles.docSectionTitle}>
              {g.label}
              <span className={styles.catalogCount}>
                {t.nodesCount.replace("{count}", String(g.nodes.length))}
              </span>
            </h2>
            <div className={styles.catalogGrid}>
              {g.nodes.map((w) => (
                <SamePageLink key={w.id} href={`/${lang}/docs/${w.id}`} className={styles.catalogCard}>
                  <NodeIcon node={w} size={40} />
                  <div className={styles.catalogCardText}>
                    <span className={styles.catalogCardName}>{w.name}</span>
                    <span className={styles.catalogCardDesc}>{w.tagline}</span>
                  </div>
                </SamePageLink>
              ))}
            </div>
          </section>
        ))}
      </div>

      <VideoCta title={t.watchTutorials} subtitle={t.viewPlaylist} />
    </div>
  );
}
