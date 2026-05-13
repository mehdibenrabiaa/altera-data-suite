import Image from "next/image";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";
import styles from "./CustomWidgetSection.module.css";

export default function CustomWidgetSection() {
  return (
    <section className={styles.section}>
      {/* Left — logo */}
      <div>
        <Image
          src="/SVG/altera_logo_white.svg"
          alt="Altera Data Suite"
          width={72}
          height={72}
          className={styles.logo}
        />
      </div>

      {/* Right — content */}
      <div className={styles.content}>
        <SectionBadge
          label="Custom Widgets"
          text="Built around your exact needs."
          className={styles.badgeLeft}
        />

        <SectionHeading
          heading="Need a custom widget that fits your exact workflow? We build it for you."
          subtitle="Every team works with different documents — different structures, different fields, different outputs. If none of our existing widgets match what you need, we'll design and build one from scratch. We map your PDF layout, define the extraction logic, and deliver a widget that drops straight into your Orange Data Mining workspace. No workarounds, no manual cleanup — just clean, structured data exactly the way you need it. Get in touch and we'll scope it together at a price that makes sense."
          className={styles.headingLeft}
        />

        <div className={styles.table}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>What you get</span>
            <span className={styles.rowValue}>
              A fully functional widget built for your PDF
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Turnaround</span>
            <span className={styles.rowValue}>
              Scoped together based on complexity
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Pricing</span>
            <span className={styles.rowValue}>
              Fair and transparent — no hidden fees
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Contact</span>
            <span className={styles.rowValue}>
              <a
                href="mailto:support@alteradatasuite.com"
                className={styles.link}
              >
                support@alteradatasuite.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
