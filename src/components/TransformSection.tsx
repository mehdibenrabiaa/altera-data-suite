import Image from "next/image";
import styles from "./TransformSection.module.css";
import ResultTable from "./ResultTable";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

export default function TransformSection() {
  return (
    <section className={styles.section}>
      <SectionBadge label="How It Works" text="Powerful Tools, Simple Workflow" />
      <SectionHeading
        heading="Parse Hundreds of Pages, Instantly"
        subtitle="Drop in any payslip, invoice, or report — even hundreds of pages — and Altera Data Suite extracts every row into clean, structured data ready for analysis."
        subtitleMaxWidth={580}
      />

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Your PDF Input</h3>
          <p className={styles.cardDesc}>
            Load any multi-page payslip, invoice, or report, and use Altera
            Nodes to extract and organize your data effortlessly.
          </p>
          <div className={styles.preview}>
            <Image
              src="/input_pdf.png"
              alt="PDF payslip input"
              width={956}
              height={1234}
              style={{ width: "100%", height: "auto", display: "block" }}
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Your Structured Output</h3>
          <p className={styles.cardDesc}>
            Every row extracted, cleaned, and ready to query, export, or feed
            directly into your next step.
          </p>
          <div className={styles.preview}>
            <ResultTable />
          </div>
        </div>
      </div>
    </section>
  );
}
