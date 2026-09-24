import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alteradatasuite.com"),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Altera Data Suite",
    images: [{ url: "/altera_logo_hero_section.webp", width: 1200, height: 630, alt: "Altera Data Suite" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/altera_logo_hero_section.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = (await headers()).get("x-locale") ?? "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2's default state -- must run BEFORE
            gtm.js below loads, so every Google tag in the container
            (GA4, Ads, ...) starts denied and holds off setting/reading
            any analytics or ad cookie until CookieConsent.tsx pushes an
            explicit "granted" update (immediately, if a past accept is
            already in localStorage; otherwise only once the user clicks
            Accept). Belongs in a real <head> -- a beforeInteractive
            script rendered as a body/html sibling isn't valid document
            structure. */}
        <Script id="consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}</Script>
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NB48QT5W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <CookieConsent lang={lang} />
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NB48QT5W');
        `}</Script>
      </body>
    </html>
  );
}
