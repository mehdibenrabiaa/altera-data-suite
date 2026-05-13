"use client";

import { Rate } from "antd";
import styles from "./TestimonialsSection.module.css";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  initials: string;
  avatarColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Karim Raaji",
    role: "Financial Consultant",
    rating: 5,
    text: "I spent years relying on tools like Power Query to extract and clean financial data from PDFs. They worked — but never cleanly, and the maintenance was constant. Finding Altera was a turning point. The extraction is accurate, the setup took minutes, and for the price it's an absolute game changer for anyone who works with financial documents on a daily basis.",
    initials: "KR",
    avatarColor: "#4a6fa5",
  },
  {
    name: "Jonathan Ashton",
    role: "Financial Quality Controller",
    rating: 5,
    text: "I found myself juggling multiple tools just to get data out of a PDF — one app for conversion, others for cleaning. But the bigger issue was privacy. Working with client data under NDA, I couldn't afford to have files processed on a third-party server. Most tools I tried did exactly that. Altera was the first solution that actually understood the core problem and solved it — everything runs locally, on my machine, and the results are clean from the start.",
    initials: "JA",
    avatarColor: "#5a7a5a",
  },
  {
    name: "Mohammed Amine Bendidi",
    role: "Financial Consultant",
    rating: 5,
    text: "Receiving volumes of data — mostly PDFs — with tight deadlines was a constant nightmare. We had skilled developers in our data lab, but the gap between what they built and what we actually needed never fully closed. Altera was different. It didn't come from a team that just knew how to code — it came from people who had lived the problem firsthand. That shows in every feature. A solution built by analysts, for analysts.",
    initials: "MB",
    avatarColor: "#7a5a8a",
  },
  {
    name: "Thomas Reeves",
    role: "Business Intelligence Lead",
    rating: 5,
    text: "What sets Altera apart from anything in the Microsoft ecosystem is that it's actually extensible in a meaningful way. With Excel or Power BI, you're locked into what exists — if a feature isn't there, you wait, and most of the time it never comes. With Altera, if a widget doesn't cover your exact use case, the team will build it for you. They can extend existing widgets or create fully custom ones from scratch. That kind of responsiveness is something enterprise software simply doesn't offer.",
    initials: "TR",
    avatarColor: "#8a6a4a",
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <SectionBadge label="Testimonials" text="What Our Users Say" />
      <SectionHeading
        heading="Trusted by teams that move fast."
        subtitle="See how Altera Data Suite helps professionals extract, structure, and act on their data — faster than ever before."
        subtitleMaxWidth={540}
      />

      <div className={styles.grid}>
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className={styles.card}>
            <span className={styles.quote}>&ldquo;</span>
            <Rate disabled defaultValue={t.rating} style={{ fontSize: 16, color: "#ff5d02" }} />
            <p className={styles.text}>{t.text}</p>
            <div className={styles.author}>
              <div
                className={styles.avatar}
                style={{ background: t.avatarColor }}
              >
                {t.initials}
              </div>
              <div className={styles.authorInfo}>
                <p className={styles.name}>{t.name}</p>
                <p className={styles.role}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
