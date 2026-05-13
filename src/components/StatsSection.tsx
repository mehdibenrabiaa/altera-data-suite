import Image from "next/image";
import styles from "./StatsSection.module.css";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

const STATS_LEFT = [
  {
    value: "98%",
    label: "Extraction Accuracy",
    desc: "Parse payslips, invoices, and reports with near-perfect field accuracy.",
  },
  {
    value: "10×",
    label: "Faster Than Manual Entry",
    desc: "Automate tedious copy-paste workflows and reclaim hours every week.",
  },
];

const STATS_RIGHT = [
  {
    value: "500+",
    label: "Pages Per Batch",
    desc: "Drop in massive multi-page PDFs and get structured output in seconds.",
  },
  {
    value: "24/7",
    label: "Always Available",
    desc: "No servers, no queues — runs entirely on your machine, anytime.",
  },
];

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <SectionBadge label="By the Numbers" text="Real Results, Real Impact" />
      <SectionHeading
        heading="Built for speed. Designed for accuracy."
        subtitle="Altera Data Suite turns hours of manual data entry into seconds of automated extraction — at any scale."
        subtitleMaxWidth={540}
      />

      <div className={styles.layout}>
        {/* Left stats */}
        <div className={styles.statCol}>
          {STATS_LEFT.map((s) => (
            <div key={s.value} className={styles.stat}>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statDesc}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Center illustration */}
        <Image
          src="/convertion_design.svg"
          alt="Conversion design illustration"
          width={420}
          height={320}
          className={styles.chartImg}
        />

        {/* Right stats */}
        <div className={`${styles.statCol} ${styles.statColRight}`}>
          {STATS_RIGHT.map((s) => (
            <div key={s.value} className={styles.stat}>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
