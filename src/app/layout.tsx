import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alteradatasuite.com"),
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
      <head>
        <link rel="preload" href="/HERO BOXE1.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
