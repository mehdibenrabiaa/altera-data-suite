import Button from "@/components/ui/Button";
import styles from "./GetStartedSection.module.css";

// Closing call to action above the footer -- the same simple "Get Started"
// band knime.com ends its homepage with, in Altera red.

interface GetStartedT {
  heading: string;
  text: string;
  download: string;
  docs: string;
}

export default function GetStartedSection({ t, lang }: { t: GetStartedT; lang: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t.heading}</h2>
        <p className={styles.text}>{t.text}</p>
        <div className={styles.buttons}>
          <Button size="large" href={`/${lang}/download`} className={styles.btnWhite} style={{ fontWeight: 600, borderRadius: 0 }}>
            {t.download}
          </Button>
          <Button size="large" href={`/${lang}/docs`} className={styles.btnOutline} style={{ fontWeight: 600, borderRadius: 0 }}>
            {t.docs}
          </Button>
        </div>
      </div>
    </section>
  );
}
