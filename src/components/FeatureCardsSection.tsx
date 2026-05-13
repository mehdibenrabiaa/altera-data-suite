import Image from "next/image";
import styles from "./FeatureCardsSection.module.css";

const cards = [
  {
    label: "FAST CONVERSION",
    title: (
      <>
        Drop in any PDF.
        <br />
        Clean data in seconds.
      </>
    ),
    image: "/HERO BOXE1.png",
  },
  {
    label: "CONTROLLED SETUP",
    title: (
      <>
        Define your setup.
        <br />
        Altera handles the rest.
      </>
    ),
    image: "/HERO BOXE2.png",
  },
  {
    label: "WE GIVE YOU TOOLS",
    title: (
      <>
        Smart widgets that extract,
        <br />
        and clean your data.
      </>
    ),
    image: "/HERO BOXE3.png",
  },
];

export default function FeatureCardsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {cards.map((card, i) => (
          <div
            key={i}
            className={`${styles.card} ${i === 0 ? styles.cardLeft : i === 1 ? styles.cardCenter : styles.cardRight}`}
          >
            {card.image && (
              <Image
                src={card.image}
                alt={card.label}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
            <div className={styles.cardBody}>
              <p className={styles.label}>{card.label}</p>
              <p className={styles.title}>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
