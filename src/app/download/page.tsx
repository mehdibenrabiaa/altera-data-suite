import type { Metadata } from "next";
import styles from "./download.module.css";
import SectionBadge from "@/components/SectionBadge";
import DownloadCards from "./DownloadCards";
import SamePageLink from "@/components/SamePageLink";
import { CheckCircleFilledIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Altera Data Suite for Windows, macOS, or Linux and start extracting structured data from your PDFs in minutes.",
  alternates: { canonical: "https://alteradatasuite.com/en/download" },
};

export default function DownloadPage() {
  return (
    <main>
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionBadge label="Download" text="Get the app" />
          <h1 className={styles.heading}>Download Altera Data Suite</h1>
          <p className={styles.lead}>
            Available for Windows, macOS, and Linux. Install in minutes and start
            extracting your first PDF right away.
          </p>
          <p className={styles.trialNote}>
            <CheckCircleFilledIcon size={15} />
            15-day free trial on every plan — no credit card required.
          </p>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <DownloadCards
          lang="en"
          t={{
            windowsName: "Windows",
            windowsDetail: "Windows 10 / 11 (64-bit)",
            windowsBtn: "Download for Windows",
            macName: "macOS",
            macDetail: "macOS 12 Monterey or later",
            macBtn: "Download for macOS",
            linuxName: "Linux",
            linuxDetail: "Most major distributions",
            linuxBtn: "Download for Linux",
            comingSoon: "Coming soon",
            comingSoonNote: "In active development — stay tuned.",
          }}
        />
        <p className={styles.footnote}>
          Need help installing? See the{" "}
          <SamePageLink href="/en/docs">Quickstart guide</SamePageLink>.
        </p>
      </section>
    </main>
  );
}
