"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";

export default function AboutCTAButtons() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
      <Button type="primary" size="large" onClick={() => router.push("/demo")} style={{ fontWeight: 600 }}>
        Watch Demo
      </Button>
      <Button size="large" onClick={() => router.push("/pricing")}>
        View Pricing
      </Button>
    </div>
  );
}
