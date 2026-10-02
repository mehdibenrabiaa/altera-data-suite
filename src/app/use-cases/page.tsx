import type { Metadata } from "next";
import styles from "./use-cases.module.css";
import SectionBadge from "@/components/SectionBadge";
import Button from "@/components/ui/Button";

// Placeholder page -- noindex until real use-case content replaces this.
export const metadata: Metadata = {
  title: "Use Cases",
  description: "See how teams use Altera Data Suite to extract and structure data from PDFs.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://alteradatasuite.com/en/use-cases" },
};

export default function UseCasesPage() {
  return (
    <main>
      <section className={styles.section}>
        <div className={styles.inner}>
          <SectionBadge label="Use Cases" text="Coming soon" />
          <h1 className={styles.heading}>Real-world ways teams use Altera.</h1>
          <p className={styles.lead}>
            We&apos;re putting together detailed use cases for finance, consulting,
            and operations teams. Check back soon — or get in touch and we&apos;ll
            point you in the right direction today.
          </p>
          <Button type="primary" size="large" href="/en/contact" className={styles.cta}>
            Contact us
          </Button>
        </div>
      </section>
    </main>
  );
}
