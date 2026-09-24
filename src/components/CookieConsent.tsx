"use client";

import { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

// Kept local to this component (not the big src/dictionaries/*.json files)
// since this is the only thing that needs it and it's a fixed, tiny
// vocabulary -- five languages, four strings each.
const COPY: Record<string, { message: string; accept: string; decline: string; privacy: string }> = {
  en: {
    message: "We use cookies to understand how you use the site and improve it. Analytics cookies stay off until you accept.",
    accept: "Accept",
    decline: "Decline",
    privacy: "Privacy Policy",
  },
  de: {
    message: "Wir verwenden Cookies, um zu verstehen, wie Sie die Website nutzen, und um sie zu verbessern. Analyse-Cookies bleiben deaktiviert, bis Sie zustimmen.",
    accept: "Akzeptieren",
    decline: "Ablehnen",
    privacy: "Datenschutzrichtlinie",
  },
  es: {
    message: "Utilizamos cookies para entender cómo usas el sitio y mejorarlo. Las cookies analíticas permanecen desactivadas hasta que las aceptes.",
    accept: "Aceptar",
    decline: "Rechazar",
    privacy: "Política de privacidad",
  },
  fr: {
    message: "Nous utilisons des cookies pour comprendre comment vous utilisez le site et l'améliorer. Les cookies analytiques restent désactivés tant que vous ne les acceptez pas.",
    accept: "Accepter",
    decline: "Refuser",
    privacy: "Politique de confidentialité",
  },
  nl: {
    message: "We gebruiken cookies om te begrijpen hoe u de site gebruikt en om deze te verbeteren. Analytische cookies blijven uit totdat u ze accepteert.",
    accept: "Accepteren",
    decline: "Weigeren",
    privacy: "Privacybeleid",
  },
};

const STORAGE_KEY = "altera-cookie-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

// Google's own Consent Mode v2 signal -- GTM/GA4 (and any other Google tag
// in the container) read this off the same dataLayer the GTM loader below
// pushes to, and hold off setting/reading analytics or ad cookies until
// "granted" is pushed. This is what actually stops tracking, not just
// hiding the banner -- layout.tsx pushes the "denied" default before the
// GTM script tag even loads, so nothing fires before the user has chosen.
function pushConsent(granted: boolean) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    "consent",
    "update",
    {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    },
  ]);
}

export default function CookieConsent({ lang }: { lang: string }) {
  const [visible, setVisible] = useState(false);
  const copy = COPY[lang] ?? COPY.en;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") {
      // Re-apply a past decision -- layout.tsx's default script always
      // starts every fresh page load at "denied" until this runs.
      pushConsent(stored === "granted");
    } else {
      setVisible(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    pushConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p className={styles.message}>
        {copy.message}{" "}
        <a href={`/${lang}/privacy`} className={styles.link}>
          {copy.privacy}
        </a>
      </p>
      <div className={styles.actions}>
        <button className={styles.decline} onClick={() => choose(false)}>
          {copy.decline}
        </button>
        <button className={styles.accept} onClick={() => choose(true)}>
          {copy.accept}
        </button>
      </div>
    </div>
  );
}
