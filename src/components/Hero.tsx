"use client";

import { Button, Flex } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import FeatureCardsSection from "./FeatureCardsSection";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.section}>
      {/* Announcement pill */}
      <Link href="/changelog" className={styles.announcement}>
        <span className={styles.announcementBadge}>New ✦</span>
        <span className={styles.announcementText}>
          AI-powered extraction
        </span>
        <span className={styles.announcementArrow}>›</span>
      </Link>

      {/* Heading */}
      <h1 className={styles.heading}>
        <span style={{ color: "#2E3032" }}>The App that turns</span>
        <br />
        <span className={styles.headingGradient}>your PDFs into </span>
        <span className={styles.highlight}>clean tables</span>
      </h1>

      {/* Subtitle */}
      <p className={styles.subtitle}>
        Drop in any PDF — Altera's widgets extract, clean, and structure every
        field in seconds.
      </p>

      {/* CTAs */}
      <Flex gap={12} justify="center">
        <Button
          type="primary"
          size="large"
          href="/trial"
          style={{ fontWeight: 600 }}
        >
          Start for free
        </Button>
        <Button size="large" href="/demo" icon={<PlayCircleOutlined />}>
          Watch Demo
        </Button>
      </Flex>

      {/* Feature Cards */}
      <FeatureCardsSection />

      {/* Testimonial */}
      <div className={styles.testimonial}>
        <Image
          src="/Profile Pic.png"
          alt="Mehdi, Developer of Altera Data Suite"
          width={64}
          height={64}
          className={styles.testimonialAvatar}
        />
        <p className={styles.testimonialTitle}>Simple Setup, Instant Results</p>
        <p className={styles.testimonialQuote}>
          "We built Altera to handle any PDF — payslips, invoices, reports.
          Designed for speed, scale, and clarity from day one."
        </p>
        <p className={styles.testimonialAttribution}>
          — Mehdi, Developer of Altera Data Suite
        </p>
      </div>
    </section>
  );
}
