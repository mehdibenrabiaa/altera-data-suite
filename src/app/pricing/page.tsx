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
    children: "Yes. You can upgrade from Free Trial to Professional at any time. Your data and workflows stay intact.",
  },
  {
    key: "p2",
    label: "What happens when my free trial ends?",
    children: "After 15 days your trial expires. You can continue with a Professional or Enterprise plan — nothing is deleted.",
  },
  {
    key: "p3",
    label: "Is the $99 a one-time payment or a subscription?",
    children: "It's a one-year license. You get full access including updates for 12 months. Renewal is optional — you keep using the version you have even after expiry.",
  },
  {
    key: "p4",
    label: "What does Enterprise pricing look like?",
    children: "Enterprise is scoped per team size, volume, and contract length. Get in touch at support@alteradatasuite.com and we'll put together a proposal.",
  },
  {
    key: "p5",
    label: "Do you offer refunds?",
    children: "We offer a free trial so you can validate the tool before paying. If something goes wrong after purchase, reach out and we'll work it out.",
  },
  {
    key: "p6",
    label: "Can I use Altera on multiple machines?",
    children: "The Free Trial and Professional plans are single-machine licenses. Enterprise plans include volume licensing for teams.",
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
