import ChatBot from "@/components/ChatBot";
import Hero from "@/components/Hero";
import WidgetsSection from "@/components/WidgetsSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ResultShowcaseSection from "@/components/ResultShowcaseSection";
import FAQSection from "@/components/FAQSection";
import CustomWidgetSection from "@/components/CustomWidgetSection";

export default function Home() {
  return (
    <main>
      <Hero />
<ResultShowcaseSection />
      <StatsSection />
      <WidgetsSection />
      <PricingSection />
      <TestimonialsSection />
      <CustomWidgetSection />
      <FAQSection />
      <ChatBot />
    </main>
  );
}
