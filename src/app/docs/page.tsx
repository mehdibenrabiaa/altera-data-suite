import type { Metadata } from "next";
import DocsClient from "./DocsClient";

export const metadata: Metadata = {
  title: "Docs — Altera Data Suite",
  description:
    "Learn how to use every Altera widget — step-by-step guides, configuration references, and output details for every feature.",
};

export default function DocsPage() {
  return <DocsClient />;
}
