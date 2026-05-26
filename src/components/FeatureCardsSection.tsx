import Image from "next/image";
import styles from "./FeatureCardsSection.module.css";

interface FeatureCardT {
  label: string;
  line1: string;
  line2: string;
}

interface Props {
  t: FeatureCardT[];
}

const IMAGES = ["/HERO BOXE1.webp", "/HERO BOXE2.webp", "/HERO BOXE3.webp"];
const STYLE_KEYS = ["cardLeft", "cardCenter", "cardRight"] as const;

export default function FeatureCardsSection({ t }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {t.map((card, i) => (
          <div
            key={i}
            className={`${styles.card} ${styles[STYLE_KEYS[i]]}`}
          >
            <Image
              src={IMAGES[i]}
              alt={card.label}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className={styles.cardBody}>
              <p className={styles.label}>{card.label}</p>
              <p className={styles.title}>
                {card.line1}
                <br />
                {card.line2}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
