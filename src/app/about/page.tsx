import type { Metadata } from "next";
import styles from "./about.module.css";
import SectionBadge from "@/components/SectionBadge";
import TeamCards from "./TeamCards";
import AboutCTAButtons from "./AboutCTAButtons";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Altera Data Suite — who built it, why, and what drives it.",
  alternates: { canonical: "https://www.alteradatasuite.com/en/about" },
};

export default function AboutPage() {
  return (
    <main>

      {/* ── Hero / Team ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionBadge label="About Us" text="The team behind Altera" />
          <h1 className={styles.heading}>Built by a small team with a clear goal.</h1>
          <p className={styles.lead}>
            Altera Data Suite was created to solve a problem we kept running into —
            extracting structured data from PDFs shouldn&apos;t require hours of manual work
            or complex scripts. So we built a tool that does it in seconds.
          </p>
          <TeamCards t={[
            { role: "Co-Founder & Developer",       bio: "Mehdi built Altera to make data extraction effortless inside Orange Data Mining. Designed for speed, scale, and clarity — every widget and feature reflects real workflows and real pain points." },
            { role: "Co-Founder & Product Designer", bio: "Rayan shapes the look, feel, and experience of Altera. From the first wireframe to the final pixel, he ensures every interaction is intuitive, clean, and purposeful." },
          ]} />
        </div>
      </section>

      {/* ── Story ── */}
      <section className={styles.storySection}>
        <div className={styles.storyInner}>

          <SectionBadge label="Our Story" text="Why we built this" />

          <div className={styles.storyGrid}>
            <div className={styles.storyBlock}>
              <div className={styles.storyTitleRow}>
                <span className={styles.storyNum}>1</span>
                <h2 className={styles.storyHeading}>Where the idea came from</h2>
              </div>
              <p className={styles.storyText}>
                We both came from consulting backgrounds — working with firms including Deloitte and PwC.
                One thing became clear fast: even at that level, nobody had built a proper all-in-one
                solution for extracting data from PDFs. Payslips, invoices, reports — everything was
                handled manually or with fragile one-off scripts. That gap was the starting point.
              </p>
            </div>

            <div className={styles.storyBlock}>
              <div className={styles.storyTitleRow}>
                <span className={styles.storyNum}>2</span>
                <h2 className={styles.storyHeading}>The first widget</h2>
              </div>
              <p className={styles.storyText}>
                We started with a single PDF converter widget. It worked — and immediately we saw
                what was missing next. Orange had strong analytical capabilities but left data
                cleaning and wrangling largely unaddressed. So we kept building. Each widget
                was a direct response to a friction point in real workflows.
              </p>
            </div>

            <div className={styles.storyBlock}>
              <div className={styles.storyTitleRow}>
                <span className={styles.storyNum}>3</span>
                <h2 className={styles.storyHeading}>Why Orange Data Mining?</h2>
              </div>
              <p className={styles.storyText}>
                We didn&apos;t want to build something that lives in isolation. Orange Data Mining
                already has a strong, established ecosystem — choosing it meant our users wouldn&apos;t
                have to change how they work. Altera plugs straight into what they already know and use.
              </p>
            </div>

            <div className={styles.storyBlock}>
              <div className={styles.storyTitleRow}>
                <span className={styles.storyNum}>4</span>
                <h2 className={styles.storyHeading}>Where we&apos;re headed</h2>
              </div>
              <p className={styles.storyText}>
                The suite is still growing. More widgets are in development, existing ones
                are actively maintained, and AI is becoming a core part of how Altera extracts,
                interprets, and structures data. This isn&apos;t a finished product — it&apos;s
                an evolving toolkit built to keep pace with how data work actually happens.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>Ready to see it in action?</h2>
          <p className={styles.ctaSubtitle}>
            Watch the demo to see how Altera handles real PDFs, or explore the pricing to find the plan that fits.
          </p>
          <AboutCTAButtons lang="en" watchDemo="Watch Demo" seePricing="View Pricing" />
        </div>
      </section>

    </main>
  );
}
