import Image from "next/image";
import { Button } from "antd";
import SectionBadge from "./SectionBadge";
import styles from "./ResultShowcaseSection.module.css";

export default function ResultShowcaseSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left — text */}
        <div className={styles.text}>
          <SectionBadge label="Payslip Extraction" text="Fast & Accurate" className={styles.badgeLeft} />

          <h2 className={styles.heading}>
            From a static PDF to clean, structured data — in seconds.
          </h2>

          <p className={styles.subtitle}>
            Drop in any payslip, invoice, or report. Altera reads every field,
            maps it to columns, and hands you a structured table ready to
            export or analyse.
          </p>

          <div className={styles.ctas}>
            <Button type="primary" size="large" href="/trial" style={{ fontWeight: 600 }}>
              Try It Free
            </Button>
            <Button size="large" href="/demo">
              See How It Works
            </Button>
          </div>
        </div>

        {/* Right — product preview */}
        <div className={styles.preview}>
          <Image
            src="/SVG/convert_illustration.svg"
            alt="PDF to clean data conversion"
            width={600}
            height={500}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

      </div>
    </section>
  );
}
