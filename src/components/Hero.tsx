"use client";

import { Button, Flex } from "antd";
import Link from "next/link";
import Image from "next/image";
import FeatureCardsSection from "./FeatureCardsSection";
import WatchDemoButton from "./WatchDemoButton";
import styles from "./Hero.module.css";

interface HeroDict {
  announcementBadge: string;
  announcementText: string;
  headingPart1: string;
  headingPart2: string;
  headingPart3: string;
  subtitle: string;
  startFree: string;
  watchDemo: string;
  testimonialTitle: string;
  testimonialQuote: string;
  testimonialAttrib: string;
}

interface FeatureCardT {
  label: string;
  line1: string;
  line2: string;
}

interface Props {
  t: HeroDict;
  lang: string;
  featureCards: FeatureCardT[];
}

export default function Hero({ t, lang, featureCards }: Props) {
  return (
    <section className={styles.section}>
      {/* Announcement pill */}
      <Link href={`/${lang}/changelog`} className={styles.announcement}>
        <span className={styles.announcementBadge}>{t.announcementBadge}</span>
        <span className={styles.announcementText}>{t.announcementText}</span>
        <span className={styles.announcementArrow}>›</span>
      </Link>

      {/* Heading */}
      <h1 className={styles.heading}>
        <span style={{ color: "#2E3032" }}>{t.headingPart1}</span>
        <br />
        <span className={styles.headingGradient}>{t.headingPart2}</span>
        <span className={styles.highlight}>{t.headingPart3}</span>
      </h1>

      {/* Subtitle */}
      <p className={styles.subtitle}>{t.subtitle}</p>

      {/* CTAs */}
      <Flex gap={12} justify="center">
        <Button
          type="primary"
          size="large"
          href={`/${lang}/pricing`}
          style={{ fontWeight: 600 }}
        >
          {t.startFree}
        </Button>
        <WatchDemoButton label={t.watchDemo} />
      </Flex>

      {/* Feature Cards */}
      <FeatureCardsSection t={featureCards} />

      {/* Testimonial */}
      <div className={styles.testimonial}>
        <Image
          src="/profile-pic.webp"
          alt="Mehdi, Co-Founder & Developer of Altera Data Suite"
          width={64}
          height={64}
          className={styles.testimonialAvatar}
          priority
        />
        <p className={styles.testimonialTitle}>{t.testimonialTitle}</p>
        <p className={styles.testimonialQuote}>{t.testimonialQuote}</p>
        <p className={styles.testimonialAttribution}>{t.testimonialAttrib}</p>
      </div>
    </section>
  );
}
