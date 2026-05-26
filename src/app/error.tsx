"use client";

import { useEffect } from "react";
import { Button } from "antd";
import { COLOR_PRIMARY } from "@/lib/theme";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 128px)",
        padding: "60px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 600, color: COLOR_PRIMARY, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 20px" }}>
        Error
      </p>
      <h1 style={{ fontSize: 72, fontWeight: 600, color: "#1a1a1a", margin: "0 0 20px", letterSpacing: "-2px", lineHeight: 1 }}>
        Something went wrong
      </h1>
      <p style={{ fontSize: 18, color: "#888", maxWidth: 480, lineHeight: 1.65, margin: "0 0 44px" }}>
        An unexpected error occurred. Try refreshing the page or head back home.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Button type="primary" size="large" onClick={reset} style={{ fontWeight: 600 }}>
          Try again
        </Button>
        <Button size="large" href="/">
          Back to home
        </Button>
      </div>
    </main>
  );
}
