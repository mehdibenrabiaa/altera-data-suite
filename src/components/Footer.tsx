import SamePageLink from "./SamePageLink";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "./Footer.module.css";
import { COLOR_TEXT_MUTED } from "@/lib/theme";

interface FooterDict {
  tagline: string;
  productHeading: string;
  companyHeading: string;
  connectHeading: string;
  contactHeading: string;
  emailLabel: string;
  phoneLabel: string;
  copyright: string;
  langSwitcherLabel: string;
  legalHeading: string;
  links: {
    features: string;
    changelog: string;
    pricingPlan: string;
    docs: string;
    aboutUs: string;
    customWidgets: string;
    terms: string;
    privacy: string;
    refund: string;
  };
}

const SOCIAL_LINKS = [
  {
    label: "X.com",
    href: "https://x.com/alteradatasuite",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mehdi-benrabiaa-7551a217b/?skipRedirect=true",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

interface Props {
  t: FooterDict;
  lang: string;
  langNames: Record<string, string>;
}

export default function Footer({ t, lang, langNames }: Props) {
  const productLinks = [
    { label: t.links.features, href: `/${lang}/features` },
    { label: t.links.changelog, href: `/${lang}/changelog` },
    { label: t.links.pricingPlan, href: `/${lang}/pricing` },
    { label: t.links.docs, href: `/${lang}/docs` },
  ];

  const companyLinks = [
    { label: t.links.aboutUs, href: `/${lang}/about` },
    { label: t.links.customWidgets, href: `/${lang}/custom` },
    { label: t.links.terms, href: `/${lang}/terms` },
    { label: t.links.privacy, href: `/${lang}/privacy` },
    { label: t.links.refund, href: `/${lang}/refund` },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <Image
              src="/Altera_logo.svg"
              alt="Altera Data Suite logo"
              width={32}
              height={32}
              className={styles.logo}
              style={{ width: "auto" }}
              loading="lazy"
              unoptimized
            />
          </div>
          <p className={styles.brandDesc}>{t.tagline}</p>
        </div>

        {/* Product */}
        <div className={styles.col}>
          <p className={styles.colHeading}>{t.productHeading}</p>
          <ul className={styles.colList}>
            {productLinks.map((l) => (
              <li key={l.href}>
                <SamePageLink href={l.href} className={styles.colLink}>
                  {l.label}
                </SamePageLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className={styles.col}>
          <p className={styles.colHeading}>{t.companyHeading}</p>
          <ul className={styles.colList}>
            {companyLinks.map((l) => (
              <li key={l.href}>
                <SamePageLink href={l.href} className={styles.colLink}>
                  {l.label}
                </SamePageLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className={styles.col}>
          <p className={styles.colHeading}>{t.connectHeading}</p>
          <ul className={styles.colList}>
            {SOCIAL_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.colLink}
                >
                  {l.icon}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <p className={styles.colHeading}>{t.contactHeading}</p>
          <ul className={styles.colList}>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>{t.emailLabel}</span>
              <a
                href="mailto:support@alteradatasuite.com"
                className={styles.colLink}
              >
                support@alteradatasuite.com
              </a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactLabel}>{t.phoneLabel}</span>
              <span className={styles.contactValue}>+212 619 018 921</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()} Altera Data Suite. {t.copyright}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: COLOR_TEXT_MUTED }}>
            {t.langSwitcherLabel}:
          </span>
          <LanguageSwitcher currentLang={lang} langNames={langNames} />
        </div>
      </div>
    </footer>
  );
}
