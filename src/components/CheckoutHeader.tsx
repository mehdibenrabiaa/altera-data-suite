import Image from "next/image";
import SamePageLink from "./SamePageLink";
import styles from "./CheckoutHeader.module.css";

interface Props {
  lang: string;
}

// A deliberately minimal header for the checkout flow -- just the logo,
// no nav links, no footer below it -- so there's nowhere to click away
// to except finishing or abandoning the purchase. Standard checkout-page
// convention (fewer exits = fewer abandoned carts).
export default function CheckoutHeader({ lang }: Props) {
  return (
    <header className={styles.header}>
      <SamePageLink href={`/${lang}`} className={styles.logo}>
        <Image
          src="/Altera_logo.svg"
          alt="Altera Data Suite"
          width={28}
          height={28}
          style={{ height: 28, width: "auto" }}
          priority
        />
      </SamePageLink>
    </header>
  );
}
