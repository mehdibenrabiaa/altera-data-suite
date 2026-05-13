import ChatBot from "@/components/ChatBot";
import FAQSection from "@/components/FAQSection";
import { allFaqItems } from "@/data/faqItems";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Got questions about Altera? Find answers about setup, accuracy, pricing, security, and more.",
};

export default function FAQsPage() {
  return (
    <main>
      <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        Frequently Asked Questions — Altera Data Suite
      </h1>
      <FAQSection items={allFaqItems} />
      <ChatBot />
    </main>
  );
}
