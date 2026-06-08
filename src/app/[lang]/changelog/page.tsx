import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import SectionBadge from "@/components/SectionBadge";
import styles from "@/app/changelog/changelog.module.css";
import { COLOR_PRIMARY } from "@/lib/theme";

const BASE_URL = "https://www.alteradatasuite.com";

type ChangeCategory = "New" | "Improved" | "Fixed";

interface ChangeEntry {
  version: string;
  date: string;
  label?: string;
  changes: { category: ChangeCategory; text: string }[];
}

const CHANGELOG: ChangeEntry[] = [
  {
    version: "0.7.0",
    date: "May 2025",
    label: "Latest",
    changes: [
      { category: "New",      text: "AI-powered regex generation — describe what you want to extract in plain language and Altera generates the pattern for you automatically." },
      { category: "New",      text: "Text location tool — search for any word or phrase inside a PDF and extract data relative to where it appears on the page." },
      { category: "Improved", text: "Regex Extractor now supports three extraction modes: first match, capture groups, and collect all occurrences — giving you full control over how patterns are applied." },
      { category: "Improved", text: "PDF Converter accuracy improved for documents with complex multi-column layouts." },
      { category: "Fixed",    text: "Date format inconsistencies between French and English formatted documents." },
    ],
  },
  {
    version: "0.6.0",
    date: "March 2025",
    changes: [
      { category: "New",      text: "Available on PyPI — install Altera directly through Orange Data Mining's add-on manager in seconds." },
      { category: "New",      text: "30-day free trial — full access to all widgets with no credit card required." },
      { category: "New",      text: "Offline grace period — continue working for up to 48 hours without an internet connection." },
    ],
  },
  {
    version: "0.5.0",
    date: "January 2025",
    changes: [
      { category: "Improved", text: "Significantly reduced memory usage — multiple widgets can now run simultaneously without slowing down your machine." },
      { category: "Improved", text: "Faster startup when opening widgets inside Orange Data Mining." },
      { category: "Fixed",    text: "Zoom controls inside widgets no longer accidentally trigger when using keyboard shortcuts or scrolling." },
    ],
  },
  {
    version: "0.4.0",
    date: "November 2024",
    changes: [
      { category: "New",      text: "Filter Builder — isolate exactly the rows you need using point-and-click conditions. Supports compound AND / OR logic across multiple groups." },
      { category: "New",      text: "Column Manager — rename, reorder, and remove columns with drag-and-drop. Tab through fields to rename quickly without leaving your keyboard." },
      { category: "New",      text: "Regex Extractor — pull structured patterns such as dates, IDs, and amounts out of raw text fields using visual rules." },
      { category: "New",      text: "Rows Slicer, Header Promoter, and Column Shifter — precision tools for cleaning and reshaping extracted data without writing a single formula." },
      { category: "New",      text: "Remove Duplicates and Data Cleaner widgets." },
    ],
  },
  {
    version: "0.3.0",
    date: "September 2024",
    changes: [
      { category: "Improved", text: "Smooth zoom in and out across all page sizes with consistent behavior — no more jumping or resizing glitches." },
      { category: "Improved", text: "Redesigned page navigation — browse pages from the sidebar and jump to any page instantly." },
      { category: "New",      text: "Extraction quality settings — choose between standard and high-resolution mode depending on your document's complexity." },
    ],
  },
  {
    version: "0.2.0",
    date: "July 2024",
    changes: [
      { category: "New",      text: "Multi-table extraction — extract up to 5 tables from a single PDF in one run, each mapped to its own output column." },
      { category: "New",      text: "Interactive annotation canvas — draw extraction zones directly on top of the PDF rather than entering coordinates manually." },
      { category: "New",      text: "Color-coded zones — mark different regions with different colors to stay organized when working with complex documents." },
      { category: "New",      text: "Thumbnail sidebar — see all pages of your PDF at a glance and navigate by clicking." },
    ],
  },
  {
    version: "0.1.0",
    date: "Early 2024",
    changes: [
      { category: "New",      text: "PDF Converter widget — first release. Extract a single table from a PDF document and output it as a structured data table inside Orange Data Mining." },
      { category: "Fixed",    text: "Multiple stability and performance issues addressed in this early pre-alpha build." },
    ],
  },
];

const CATEGORY_STYLES: Record<ChangeCategory, { bg: string; color: string }> = {
  New:      { bg: "#fff4ef", color: COLOR_PRIMARY },
  Improved: { bg: "#f0f5ff", color: "#2255cc" },
  Fixed:    { bg: "#f0faf4", color: "#1a7a45" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const { title, description } = dict.meta.changelog;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}/changelog`;
  }
  alternates["x-default"] = `${BASE_URL}/en/changelog`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${BASE_URL}/${lang}/changelog` },
    alternates: { canonical: `${BASE_URL}/${lang}/changelog`, languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = dict.changelog;

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <SectionBadge label={c.badgeLabel} text={c.badgeText} />
        <h1 className={styles.heroHeading}>{c.heroHeading}</h1>
        <p className={styles.heroSubtitle}>{c.heroSubtitle}</p>
      </div>

      <div className={styles.list}>
        {CHANGELOG.map((entry) => (
          <div key={entry.version} className={styles.entry}>
            <div className={styles.meta}>
              <div className={styles.versionRow}>
                <span className={styles.version}>v{entry.version}</span>
                {entry.label && (
                  <span className={styles.latestBadge}>{c.latestLabel}</span>
                )}
              </div>
              <span className={styles.date}>{entry.date}</span>
            </div>

            <div className={styles.changes}>
              {entry.changes.map((ch, i) => (
                <div key={i} className={styles.change}>
                  <span
                    className={styles.tag}
                    style={{
                      background: CATEGORY_STYLES[ch.category].bg,
                      color: CATEGORY_STYLES[ch.category].color,
                      fontWeight: 700,
                    }}
                  >
                    {c.categories[ch.category]}
                  </span>
                  <p className={styles.changeText}>{ch.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
