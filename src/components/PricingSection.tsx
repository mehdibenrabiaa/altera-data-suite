"use client";

import { Flex } from "antd";
import styles from "./PricingSection.module.css";
import PricingCard from "./PricingCard";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

const PLANS = [
  {
    name: "Free Trial",
    price: 0,
    subtitle: "All-In-One Solution for a short period",
    accentColor: "#595959",
    popular: false,
    features: [
      {
        title: "Limited PDF Processing",
        desc: "Extract up to 500 PDF pages per month with full accuracy.",
      },
      {
        title: "AI Features Not Included",
        desc: "Create and run up to 5 automated parsing workflows.",
      },
      {
        title: "15 Days Trial Period",
        desc: "Create and run up to 5 automated parsing workflows.",
      },
      {
        title: "10+ Widgets",
        desc: "Export your structured data to CSV and Excel formats.",
      },
      {
        title: "Minimal Support",
        desc: "Get assistance via email with a 48-hour response time.",
      },
      {
        title: "Single Machine License",
        desc: "Use on one device with full feature access.",
      },
      {
        title: "Free Updates & Improvements",
        desc: "Join our community forum for tips, templates, and peer support.",
      },
    ],
  },
  {
    name: "Professional",
    price: 99,
    subtitle: "All-In-One Solution for PDF Parsing",
    accentColor: "#FD4728",
    popular: true,
    features: [
      {
        title: "Unlimited PDF Processing",
        desc: "Extract up to 500 PDF pages per month with full accuracy.",
      },
      {
        title: "AI-Powered Smart Tools",
        desc: "Create and run up to 5 automated parsing workflows.",
      },
      {
        title: "1 year license subscription",
        desc: "Create and run up to 5 automated parsing workflows.",
      },
      {
        title: "10+ Widgets",
        desc: "Export your structured data to CSV and Excel formats.",
      },
      {
        title: "Email Support",
        desc: "Get assistance via email with a 48-hour response time.",
      },
      {
        title: "Single Machine License",
        desc: "Use on one device with full feature access.",
      },
      {
        title: "Free Updates & Improvements",
        desc: "Join our community forum for tips, templates, and peer support.",
      },
    ],
  },
  {
    name: "Enterprise",
    subtitle: "All Features + Tailored Prices",
    accentColor: "#fa541c",
    popular: false,
    features: [
      {
        title: "Unlimited PDF Processing",
        desc: "No caps — process as many PDF pages as your business requires.",
      },
      {
        title: "AI-Powered Smart Tools",
        desc: "Advanced automation and intelligent parsing workflows built into your system.",
      },
      {
        title: "Custom Pricing",
        desc: "Pricing tailored to your license volume, usage, and contract duration.",
      },
      {
        title: "10+ Widgets",
        desc: "REST API for seamless integration with your internal tools and workflows.",
      },
      {
        title: "Video Call Assistance",
        desc: "Personal setup, training sessions, and guided implementation for your team.",
      },
      {
        title: "Volume Licensing",
        desc: "If built-in widgets are not enough, we design and deliver custom widgets tailored to your exact workflow needs.",
      },
      {
        title: "Free Updates & Improvements",
        desc: "Continuous access to new features, improvements, and platform updates.",
      },
    ],
  },
];

export default function PricingSection() {
  return (
    <section className={styles.section}>
      <SectionBadge label="Pricing" text="Simple Plans, Powerful Features" />
      <SectionHeading
        heading="Pick the plan that fits your workflow."
        subtitle="Start Free. Upgrade When It Delivers Value"
        subtitleMaxWidth={420}
      />

      <Flex justify="center" gap={24} wrap>
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.name}
            title={plan.name}
            price={
              "price" in plan ? (plan as { price: number }).price : undefined
            }
            subtitle={plan.subtitle}
            features={plan.features.map((f) => f.title)}
            badge={plan.popular ? "POPULAR" : undefined}
            color={plan.accentColor}
            btnLabel={`Get ${plan.name}`}
          />
        ))}
      </Flex>
    </section>
  );
}
