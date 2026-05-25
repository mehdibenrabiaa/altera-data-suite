"use client";

import { Rate } from "antd";
import styles from "./TestimonialsSection.module.css";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

interface TestimonialCard {
  name: string;
  role: string;
  text: string;
}

interface TestimonialsT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  subtitle: string;
  cards: TestimonialCard[];
}

interface Props {
  t: TestimonialsT;
}

const AVATAR_META = [
  { initials: "KR", color: "#4a6fa5" },
  { initials: "JA", color: "#5a7a5a" },
  { initials: "MB", color: "#7a5a8a" },
  { initials: "TR", color: "#8a6a4a" },
];

export default function TestimonialsSection({ t }: Props) {
  return (
    <section className={styles.section}>
      <SectionBadge label={t.badgeLabel} text={t.badgeText} />
      <SectionHeading
        heading={t.heading}
        subtitle={t.subtitle}
        subtitleMaxWidth={540}
      />

      <div className={styles.grid}>
        {t.cards.map((card, i) => {
          const meta = AVATAR_META[i] ?? { initials: card.name.slice(0, 2).toUpperCase(), color: "#666" };
          return (
            <div key={card.name} className={styles.card}>
              <span className={styles.quote}>&ldquo;</span>
              <Rate disabled defaultValue={5} style={{ fontSize: 16, color: "#ff5d02" }} />
              <p className={styles.text}>{card.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: meta.color }}>
                  {meta.initials}
                </div>
                <div className={styles.authorInfo}>
                  <p className={styles.name}>{card.name}</p>
                  <p className={styles.role}>{card.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
