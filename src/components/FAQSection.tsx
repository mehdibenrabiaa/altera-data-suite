"use client";

import { Collapse } from "antd";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";
import { essentialFaqItems } from "@/data/faqItems";
import styles from "./FAQSection.module.css";

interface FAQSectionProps {
  items?: { key: string; label: string; children: string }[];
}

export default function FAQSection({
  items = essentialFaqItems,
}: FAQSectionProps) {
  return (
    <section className={styles.section}>
      <SectionBadge label="FAQ" text="Got questions? We've got answers." />
      <SectionHeading
        heading="Everything you need to know"
        subtitle="Can't find what you're looking for? Reach out and we'll get back to you."
      />
      <div className={styles.list}>
        <Collapse
          accordion
          items={items}
          bordered={false}
          style={{ background: "transparent" }}
        />
      </div>
    </section>
  );
}
