import Image from "next/image";
import styles from "./StatsSection.module.css";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

interface StatItem {
  value: string;
  label: string;
  desc: string;
}

interface StatsT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  subtitle: string;
  items: StatItem[];
}

interface Props {
  t: StatsT;
}

export default function StatsSection({ t }: Props) {
  const left = t.items.slice(0, 2);
  const right = t.items.slice(2, 4);

  return (
    <section className={styles.section}>
      <SectionBadge label={t.badgeLabel} text={t.badgeText} />
      <SectionHeading
        heading={t.heading}
        subtitle={t.subtitle}
        subtitleMaxWidth={540}
      />

      <div className={styles.layout}>
        <div className={styles.statCol}>
          {left.map((s) => (
            <div key={s.value} className={styles.stat}>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statDesc}>{s.desc}</p>
            </div>
          ))}
        </div>

        <Image
          src="/convertion_design_color.svg"
          alt="Conversion design illustration"
          width={420}
          height={320}
          className={styles.chartImg}
          style={{ height: "auto" }}
          loading="lazy"
          unoptimized
        />

        <div className={`${styles.statCol} ${styles.statColRight}`}>
          {right.map((s) => (
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
