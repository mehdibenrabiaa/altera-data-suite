import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Altera Data Suite. Start free, upgrade when it delivers value.",
};

const pricingFaqs = [
  {
    key: "p1",
    label: "Can I switch plans later?",
    children: "Yes. You can switch between Monthly, Yearly, and Lifetime at any time. Your data and workflows stay intact.",
  },
  {
    key: "p2",
    label: "What happens when I run out of AI credits?",
    children: "AI-powered features pause until you top up — everything else in the app keeps working normally. Extra credit packs are available anytime from the app.",
  },
  {
    key: "p3",
    label: "What's the difference between the plans?",
    children: "Monthly and Yearly are recurring subscriptions billed on that cadence. Lifetime is a single one-time payment for permanent access, with a fixed monthly AI credit allowance included for as long as you use it.",
  },
  {
    key: "p5",
    label: "Do you offer refunds?",
    children: "Yes — see our 30-day money-back guarantee. If something goes wrong after purchase, reach out and we'll work it out.",
  },
  {
    key: "p6",
    label: "Can I use Altera on multiple machines?",
    children: "Monthly, Yearly, and Lifetime are all single-machine licenses.",
  },
];

export default function PricingPage() {
  return (
    <main>
      <PricingSection />
      <FAQSection items={pricingFaqs} />
    </main>
  );
}
