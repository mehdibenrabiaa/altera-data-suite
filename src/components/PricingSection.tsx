"use client";

import { Typography } from "antd";
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
  bestValueBadge: string;
  getBtn: string;
  period: string;
  periodMonthly: string;
  oneTime: string;
  includesLabel: string;
  topUpNote: string;
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
  subtitle:       "Every plan includes AI credits. Top up anytime.",
  popularBadge:   "POPULAR",
  bestValueBadge: "BEST VALUE",
  getBtn:         "Get",
  period:         "/year",
  periodMonthly:  "/month",
  oneTime:        "one-time",
  includesLabel:  "Includes",
  topUpNote:      "Run out of AI credits? Top up anytime — extra credit packs start at $9.",
  plans: [
    { name: "Monthly",   subtitle: "All-In-One Solution, billed monthly",                    features: ["Unlimited PDF Processing","1,000 AI Credits / month","10+ Nodes","Email Support","Single Machine License","Free Updates & Improvements"] },
    { name: "Yearly",    subtitle: "Save 20% vs monthly billing",                              features: ["Unlimited PDF Processing","15,000 AI Credits / year","10+ Nodes","Priority Email Support","Single Machine License","Free Updates & Improvements"] },
    { name: "Lifetime",  subtitle: "Pay once, own it forever",                                features: ["Unlimited PDF Processing","1,000 AI Credits every month, for life","10+ Nodes","Priority Support","Single Machine License","Free Updates for 1 Year"] },
  ],
};

const MONTHLY_PRICE  = 99;
const YEARLY_PRICE   = Math.round(MONTHLY_PRICE * 12 * 0.8); // 950, ~20% off monthly
const LIFETIME_PRICE = 2699;

const PLAN_META = [
  { price: MONTHLY_PRICE,  periodKey: "periodMonthly" as const, badgeKey: undefined,            color: "#595959", hrefSlug: undefined },
  { price: YEARLY_PRICE,   periodKey: "period" as const,         badgeKey: "popularBadge" as const,   color: COLOR_PRIMARY, hrefSlug: undefined },
  { price: LIFETIME_PRICE, periodKey: "oneTime" as const,        badgeKey: "bestValueBadge" as const, color: "#B8860B", hrefSlug: undefined },
];

export default function PricingSection({ t = DEFAULT_T, lang = "en" }: Props) {
  return (
    <section className={styles.section}>
      <SectionBadge label={t.badgeLabel} text={t.badgeText} />
      <SectionHeading heading={t.heading} subtitle={t.subtitle} subtitleMaxWidth={420} />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
        {t.plans.map((plan, i) => {
          const meta   = PLAN_META[i];
          const price  = meta.price;
          const period = meta.periodKey ? t[meta.periodKey] : undefined;
          const href   = meta.hrefSlug ? `/${lang}/${meta.hrefSlug}` : undefined;
          return (
            <PricingCard
              key={plan.name}
              title={plan.name}
              price={price}
              period={period}
              subtitle={plan.subtitle}
              features={plan.features}
              badge={meta.badgeKey ? t[meta.badgeKey] : undefined}
              color={meta.color}
              btnLabel={`${t.getBtn} ${plan.name}`}
              includesLabel={t.includesLabel}
              href={href}
            />
          );
        })}
      </div>

      <Text style={{ display: "block", textAlign: "center", fontSize: 13, color: "#c44400", fontWeight: 600 }}>
        {t.topUpNote}
      </Text>
    </section>
  );
}
