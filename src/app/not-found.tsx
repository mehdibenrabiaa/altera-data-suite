import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import NotFoundButton from "./NotFoundButton";
import { COLOR_PRIMARY } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
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
      <p style={{ fontSize: 160, fontWeight: 700, color: COLOR_PRIMARY, lineHeight: 1, margin: "0 0 8px", letterSpacing: "-6px" }}>
        404
      </p>
      <SectionHeading
        heading="Page not found"
        subtitle="The page you're looking for doesn't exist or has been moved."
        subtitleMaxWidth={480}
      />
      <NotFoundButton />
    </main>
  );
}
