import type { Metadata } from "next";
import DocsIndex from "./DocsIndex";
import { DEFAULT_T } from "./docsText";

export const metadata: Metadata = {
  title: "Docs — Altera Data Suite",
  description:
    "Learn how to use every Altera node — step-by-step guides, configuration references, and output details for every feature.",
};

export default function DocsPage() {
  return <DocsIndex lang="en" t={DEFAULT_T} />;
}
