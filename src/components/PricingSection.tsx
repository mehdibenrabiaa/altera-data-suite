"use client";

import { useState } from "react";
import { Segmented, Typography } from "antd";
import styles from "./PricingSection.module.css";
import { COLOR_PRIMARY } from "@/lib/theme";
import PricingCard from "./PricingCard";
import SectionBadge from "./SectionBadge";
import SectionHeading from "./SectionHeading";

const { Text } = Typography;

interface PricingPlan {
  name: string;
  subtitle: string;
  features: string[];
}

interface PricingT {
  badgeLabel: string;
  badgeText: string;
  heading: string;
  subtitle: string;
  popularBadge: string;
  getBtn: string;
  period: string;
  billingMonthly: string;
  billingYearly: string;
  periodMonthly: string;
  discountNote: string;
  letsTalk: string;
  includesLabel: string;
  plans: PricingPlan[];
}

interface Props {
  t?: PricingT;
  lang?: string;
}

const DEFAULT_T: PricingT = {
  badgeLabel:     "Pricing",
  badgeText:      "Simple Plans, Powerful Features",
  heading:        "Pick the plan that fits your workflow.",
  subtitle:       "Start Free. Upgrade When It Delivers Value",
  popularBadge:   "POPULAR",
  getBtn:         "Get",
  period:         "/year",
  billingMonthly: "Monthly",
  billingYearly:  "Yearly",
  periodMonthly:  "/month",
  discountNote:   "Annual billing saves you 10%",
  letsTalk:       "Let's Talk",
  includesLabel:  "Includes",
  plans: [
    { name: "Free Trial",   subtitle: "All-In-One Solution for a short period",  features: ["Limited PDF Processing","AI Features Not Included","15 Days Trial Period","10+ Widgets","Minimal Support","Single Machine License","Free Updates & Improvements"] },
    { name: "Professional", subtitle: "All-In-One Solution for PDF Parsing",      features: ["Unlimited PDF Processing","AI-Powered Smart Tools","1 year license subscription","10+ Widgets","Email Support","Single Machine License","Free Updates & Improvements"] },
    { name: "Enterprise",   subtitle: "All Features + Tailored Prices",           features: ["Unlimited PDF Processing","AI-Powered Smart Tools","Custom Pricing","10+ Widgets","Video Call Assistance","Volume Licensing","Free Updates & Improvements"] },
  ],
};

const MONTHLY_PRICE = 99;
const YEARLY_PRICE  = Math.round(MONTHLY_PRICE * 12 * 0.9); // 1069

const PLAN_META = [
  { priceMonthly: 0,             priceYearly: 0,           popular: false, color: "#595959", hrefSlug: "docs"  },
  { priceMonthly: MONTHLY_PRICE, priceYearly: YEARLY_PRICE, popular: true,  color: COLOR_PRIMARY, hrefSlug: undefined },
  { priceMonthly: undefined,     priceYearly: undefined,   popular: false, color: COLOR_PRIMARY, hrefSlug: "about" },
];

export default function PricingSection({ t = DEFAULT_T, lang = "en" }: Props) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const isYearly = billing === "yearly";

  return (
    <section className={styles.section}>
      <SectionBadge label={t.badgeLabel} text={t.badgeText} />
      <SectionHeading heading={t.heading} subtitle={t.subtitle} subtitleMaxWidth={420} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 36 }}>
        <Segmented
          value={billing}
          onChange={(v) => setBilling(v as "monthly" | "yearly")}
          options={[
            { label: t.billingMonthly, value: "monthly" },
            { label: t.billingYearly,  value: "yearly"  },
          ]}
          style={{ fontSize: 14, padding: "3px 4px" }}
        />
        <Text style={{ fontSize: 13, color: "#c44400", fontWeight: 700 }}>
          {t.discountNote}
        </Text>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", gap: 24, flexWrap: "wrap" }}>
        {t.plans.map((plan, i) => {
          const meta = PLAN_META[i];
          const price  = isYearly ? meta.priceYearly  : meta.priceMonthly;
          const period = isYearly ? t.period           : t.periodMonthly;
          const href   = meta.hrefSlug ? `/${lang}/${meta.hrefSlug}` : undefined;
          return (
            <PricingCard
              key={plan.name}
              title={plan.name}
              price={price}
              period={period}
              subtitle={plan.subtitle}
              features={plan.features}
              badge={meta.popular ? t.popularBadge : undefined}
              color={meta.color}
              btnLabel={price !== undefined ? `${t.getBtn} ${plan.name}` : t.letsTalk}
              letsTalk={t.letsTalk}
              includesLabel={t.includesLabel}
              href={href}
            />
          );
        })}
      </div>
    </section>
  );
}
