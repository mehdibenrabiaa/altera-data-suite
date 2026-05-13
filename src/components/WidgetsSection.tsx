import Image from "next/image";
import styles from "./WidgetsSection.module.css";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

const WIDGETS = [
  {
    name: "PDF Converter",
    icon: "pdf_converter.svg",
    description:
      "Load any multi-page PDF — payslips, invoices, reports — and instantly extract every field into a clean, row-by-row table ready for analysis.",
  },
  {
    name: "Filter Builder",
    icon: "filter.svg",
    description:
      "Isolate exactly the rows you need using flexible conditions on any column. No code, no formulas — just point-and-click filtering.",
  },
  {
    name: "Regular Expressions",
    icon: "regex.svg",
    description:
      "Pull structured patterns — dates, IDs, names, amounts — out of raw text fields using powerful regex rules, visually configured.",
  },
  {
    name: "Column Manager",
    icon: "column_manager.svg",
    description:
      "Rename, reorder, or drop columns in seconds. Tailor your output schema so downstream tools always receive exactly what they expect.",
  },
];

export default function WidgetsSection() {
  return (
    <section className={styles.section}>
      <SectionBadge label="Features" text="Purpose-Built Widgets" />
      <SectionHeading
        heading="Your all-in-one solution for fast, efficient PDF parsing."
        subtitle="Purpose-built widgets that take your PDFs from raw input to structured, analysis-ready data — no code, no friction."
        subtitleMaxWidth={560}
      />

      <div className={styles.grid}>
        {WIDGETS.map((widget) => (
          <div key={widget.name} className={styles.card}>
            <div className={styles.iconWrap}>
              <Image src={`/widgets_icons/${widget.icon}`} alt={widget.name} width={40} height={40} />
            </div>
            <h3 className={styles.cardTitle}>{widget.name}</h3>
            <p className={styles.cardDesc}>{widget.description}</p>
            <span className={styles.cardLink}>Explore Now &rsaquo;</span>
          </div>
        ))}
      </div>
    </section>
  );
}
