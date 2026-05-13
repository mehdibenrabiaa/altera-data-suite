import styles from "./ConvertSection.module.css";

export default function ConvertSection() {
  return (
    <section className={styles.section}>
      <p className={styles.tagline}>From a messy PDF to clean data — in seconds.</p>
      <img
        src="/SVG/convert_illustration.svg"
        alt="PDF to clean data conversion"
        className={styles.illustration}
      />
    </section>
  );
}
