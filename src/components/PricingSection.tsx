"use client";

import { Typography } from "antd";
import styles from "./PricingSection.module.css";
import { PLANS } from "@/lib/plans";
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
  checkoutSuccess: string;
  checkoutError: string;
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
  checkoutSuccess: "Check your email for your license key.",
  checkoutError:   "Checkout isn't available right now. Please try again in a moment or contact support@alteradatasuite.com.",
  plans: [
    { name: "Monthly",   subtitle: "All-In-One Solution, billed monthly",                    features: ["Unlimited PDF Processing","1,000 AI Credits / month","10+ Nodes","Email Support","Single Machine License","Free Updates & Improvements"] },
    { name: "Yearly",    subtitle: "Save 20% vs monthly billing",                              features: ["Unlimited PDF Processing","15,000 AI Credits / year","10+ Nodes","Priority Email Support","Single Machine License","Free Updates & Improvements"] },
    { name: "Lifetime",  subtitle: "Pay once, own it forever",                                features: ["Unlimited PDF Processing","1,000 AI Credits every month, for life","10+ Nodes","Priority Support","Single Machine License","Free Updates for 1 Year"] },
  ],
};

// PLANS order (lib/plans.ts) is Monthly/Yearly/Lifetime, matching
// t.plans -- zipped by index below for price/period/color/badge/priceId,
// while name/subtitle/features stay translated via t.
const PERIOD_KEYS = ["periodMonthly", "period", "oneTime"] as const;

export default function PricingSection({ t = DEFAULT_T, lang = "en" }: Props) {
  return (
    <section className={styles.section}>
      <SectionBadge label={t.badgeLabel} text={t.badgeText} />
      <SectionHeading heading={t.heading} subtitle={t.subtitle} subtitleMaxWidth={420} />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
        {t.plans.map((plan, i) => {
          const meta   = PLANS[i];
          const period = t[PERIOD_KEYS[i]];
          const badge  = meta.badge === "popular" ? t.popularBadge : meta.badge === "bestValue" ? t.bestValueBadge : undefined;
          return (
            <PricingCard
              key={plan.name}
              title={plan.name}
              price={meta.price}
              period={period}
              subtitle={plan.subtitle}
              features={plan.features}
              badge={badge}
              color={meta.color}
              btnLabel={`${t.getBtn} ${plan.name}`}
              includesLabel={t.includesLabel}
              href={`/${lang}/checkout?plan=${meta.key}`}
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
