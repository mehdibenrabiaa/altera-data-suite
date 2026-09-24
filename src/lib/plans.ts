import { COLOR_PRIMARY } from "./theme";

export type PlanKey = "monthly" | "yearly" | "lifetime";

export interface PlanMeta {
  key: PlanKey;
  name: string;
  subtitle: string;
  price: number;
  period: string;
  features: string[];
  color: string;
  badge?: "popular" | "bestValue";
  // Paddle Price ID (pri_...), from a NEXT_PUBLIC_ env var referenced
  // literally so Next.js can inline it at build time -- same convention
  // as NEXT_PUBLIC_API_URL elsewhere in this codebase. Undefined until
  // set in the deploy platform.
  priceId: string | undefined;
}

const MONTHLY_PRICE = 99;
const YEARLY_PRICE = Math.round(MONTHLY_PRICE * 12 * 0.8); // ~20% off monthly
const LIFETIME_PRICE = 2699;

export const PLANS: PlanMeta[] = [
  {
    key: "monthly",
    name: "Monthly",
    subtitle: "All-In-One Solution, billed monthly",
    price: MONTHLY_PRICE,
    period: "/month",
    color: "#595959",
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_MONTHLY,
    features: [
      "Unlimited PDF Processing",
      "1,000 AI Credits / month",
      "10+ Nodes",
      "Email Support",
      "Single Machine License",
      "Free Updates & Improvements",
    ],
  },
  {
    key: "yearly",
    name: "Yearly",
    subtitle: "Save 20% vs monthly billing",
    price: YEARLY_PRICE,
    period: "/year",
    color: COLOR_PRIMARY,
    badge: "popular",
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_YEARLY,
    features: [
      "Unlimited PDF Processing",
      "15,000 AI Credits / year",
      "10+ Nodes",
      "Priority Email Support",
      "Single Machine License",
      "Free Updates & Improvements",
    ],
  },
  {
    key: "lifetime",
    name: "Lifetime",
    subtitle: "Pay once, own it forever",
    price: LIFETIME_PRICE,
    period: "one-time",
    color: "#B8860B",
    badge: "bestValue",
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_LIFETIME,
    features: [
      "Unlimited PDF Processing",
      "1,000 AI Credits every month, for life",
      "10+ Nodes",
      "Priority Support",
      "Single Machine License",
      "Free Updates for 1 Year",
    ],
  },
];

export function getPlan(key: string | undefined): PlanMeta | undefined {
  return PLANS.find((p) => p.key === key);
}
