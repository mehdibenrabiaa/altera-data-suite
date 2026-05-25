"use client";

import { Button } from "antd";
import WatchDemoButton from "@/components/WatchDemoButton";

interface Props {
  lang: string;
  watchDemo: string;
  seePricing: string;
}

export default function AboutCTAButtons({ lang, watchDemo, seePricing }: Props) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
      <WatchDemoButton label={watchDemo} btnType="primary" style={{ fontWeight: 600 }} />
      <Button size="large" href={`/${lang}/pricing`}>
        {seePricing}
      </Button>
    </div>
  );
}
