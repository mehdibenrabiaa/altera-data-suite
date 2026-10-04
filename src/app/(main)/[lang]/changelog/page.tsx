import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";
import SectionBadge from "@/components/SectionBadge";
import styles from "@/app/changelog/changelog.module.css";
import { COLOR_PRIMARY } from "@/lib/theme";

const BASE_URL = "https://alteradatasuite.com";

type ChangeCategory = "New" | "Improved" | "Fixed";

// One entry per update to the desktop app, taken from its real commit
// history (altera-data-suite-standalone). No version numbers -- the app
// hasn't tagged releases yet -- so each entry is identified by its date.
interface ChangeEntry {
  date: string; // ISO yyyy-mm-dd, formatted per locale at render time
  changes: { category: ChangeCategory; text: string }[];
}

const CHANGELOG: ChangeEntry[] = [
  {
    date: "2026-10-04",
    changes: [
      { category: "New",      text: "Dim theme — a softer middle ground between Light and Dark, applied across every window and data grid." },
      { category: "Improved", text: "Your license now renews automatically in the background, so you stay activated without doing anything." },
      { category: "Fixed",    text: "The installed app no longer flashes a console window on launch, and shows the correct version number." },
    ],
  },
  {
    date: "2026-09-26",
    changes: [
      { category: "New",      text: "Automatic updates — use File › Check for Updates to download and install the latest version from inside the app." },
      { category: "New",      text: "Recent Projects in the File menu (your last 10 projects), plus the Windows jump list and macOS Open Recent." },
      { category: "New",      text: "Concatenate aggregation in Group By and Aggregate — join every non-blank value in a group with a delimiter of your choice." },
      { category: "Improved", text: "Security hardening — the app's local processing engine now only accepts requests from the app itself." },
    ],
  },
  {
    date: "2026-09-24",
    changes: [
      { category: "New",      text: "Node plugins — install new nodes from Settings › Plugins without reinstalling the app." },
    ],
  },
  {
    date: "2026-09-22",
    changes: [
      { category: "New",      text: "Workspace layouts — switch between Standard, Workflow, and Canvas Focus presets." },
      { category: "New",      text: "Splash screen on launch and a native menu bar on macOS." },
      { category: "Improved", text: "The app now warns you before closing with unsaved changes, remembers its window size and position, and shows conversion progress in the taskbar." },
      { category: "Improved", text: "Refreshed Light and Dark theme colors." },
      { category: "Improved", text: "Widget Zoom (90%, 100%, 110%) now scales node windows." },
      { category: "Fixed",    text: "A crash when opening the Appearance tab in Settings." },
    ],
  },
  {
    date: "2026-09-12",
    changes: [
      { category: "New",      text: "Group By node — group rows by a column and calculate sums, averages, counts, and more for every group." },
      { category: "New",      text: "Page Filter node — use a column of page numbers to choose which PDF pages get converted." },
    ],
  },
  {
    date: "2026-09-07",
    changes: [
      { category: "Improved", text: "Dark mode now covers every node's Configure window, including grids, checklists, and the formula editor." },
      { category: "Improved", text: "Simpler Settings — the Theme switch now lives under Appearance." },
      { category: "Fixed",    text: "External links now open in your web browser instead of inside the app." },
    ],
  },
  {
    date: "2026-09-05",
    changes: [
      { category: "New",      text: "Sort, Aggregate, Input Data, Text Parser, and Bridge nodes, plus a reworked Summary node." },
      { category: "New",      text: "Dark mode, available in Settings." },
      { category: "New",      text: "Analysis node category, home to Summary and Aggregate." },
      { category: "New",      text: "Help › Documentation now opens the online docs." },
      { category: "Fixed",    text: "PDF extraction no longer merges a section's total row into the row above it." },
      { category: "Fixed",    text: "The right-click menu now works when several nodes are selected." },
    ],
  },
  {
    date: "2026-09-03",
    changes: [
      { category: "New",      text: "Add Column node — build conditional columns with IF / ELSE IF rules, no formulas needed." },
      { category: "New",      text: "Formula functions IF, AND, OR, NOT, and CONTAINS, plus comparison operators." },
      { category: "New",      text: "Excel-style click-and-drag cell selection with copy, in Browse and data previews." },
      { category: "Improved", text: "Filter Builder is now simply called Filter." },
    ],
  },
  {
    date: "2026-09-02",
    changes: [
      { category: "New",      text: "Export node — save your results to Excel (.xlsx) or CSV." },
      { category: "New",      text: "Unpivot Columns and Pivot Columns nodes for reshaping tables between long and wide formats." },
      { category: "New",      text: "Concatenate node — stack the rows of several tables into one." },
      { category: "New",      text: "Formula editor with syntax highlighting, autocomplete, and argument hints." },
      { category: "Fixed",    text: "Text that wraps onto several lines inside a PDF cell now stays in one row instead of creating a blank row." },
      { category: "Fixed",    text: "Column guides can now split values inside a single word, such as date ranges." },
    ],
  },
  {
    date: "2026-08-31",
    changes: [
      { category: "New",      text: "Cascade Fill node — fill empty cells up or down from the nearest value." },
      { category: "New",      text: "Copy cells from any table preview with Ctrl+C or right-click › Copy." },
      { category: "New",      text: "Float is now available as a Change Type target." },
      { category: "Improved", text: "Hold Ctrl while drag-selecting to add to your current selection." },
      { category: "Fixed",    text: "Tables now reopen in the positions you left them." },
      { category: "Fixed",    text: "Column type icons in previews now show each column's real type." },
    ],
  },
  {
    date: "2026-08-30",
    changes: [
      { category: "New",      text: "First version of Altera Data Suite — PDF Converter plus a node-based workflow canvas for cleaning and transforming your extracted data." },
    ],
  },
];

const CATEGORY_STYLES: Record<ChangeCategory, { bg: string; color: string }> = {
  New:      { bg: "#fff4ef", color: COLOR_PRIMARY },
  Improved: { bg: "#f0f5ff", color: "#2255cc" },
  Fixed:    { bg: "#f0faf4", color: "#1a7a45" },
};

function formatDate(iso: string, lang: string): string {
  return new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

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
        {CHANGELOG.map((entry, i) => (
          <div key={entry.date} className={styles.entry}>
            <div className={styles.meta}>
              <div className={styles.versionRow}>
                <span className={styles.version}>{formatDate(entry.date, lang)}</span>
                {i === 0 && (
                  <span className={styles.latestBadge}>{c.latestLabel}</span>
                )}
              </div>
            </div>

            <div className={styles.changes}>
              {entry.changes.map((ch, i) => (
                <div key={i} className={styles.change}>
                  <span
                    className={styles.tag}
                    style={{
                      background: CATEGORY_STYLES[ch.category].bg,
                      color: CATEGORY_STYLES[ch.category].color,
                      fontWeight: 600,
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
