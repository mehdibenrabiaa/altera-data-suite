import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

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
    <html lang={lang} className={poppins.variable} suppressHydrationWarning>
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
      </body>
      <Script id="gtm" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NB48QT5W');
      `}</Script>
    </html>
  );
}
