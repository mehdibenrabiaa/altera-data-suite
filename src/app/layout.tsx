import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AntdProvider from "@/components/AntdProvider";
import PageTransition from "@/components/PageTransition";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Altera Data Suite",
    template: "%s — Altera Data Suite",
  },
  description: "Turn any PDF into clean, structured data in seconds. Extract invoices, payslips, and reports with near-perfect accuracy.",
  metadataBase: new URL("https://www.alteradatasuite.com"),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Altera Data Suite",
    title: "Altera Data Suite",
    description: "Turn any PDF into clean, structured data in seconds. Extract invoices, payslips, and reports with near-perfect accuracy.",
    url: "https://www.alteradatasuite.com",
    images: [{ url: "/altera_logo_hero_section.webp", width: 1200, height: 630, alt: "Altera Data Suite" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Altera Data Suite",
    description: "Turn any PDF into clean, structured data in seconds. Extract invoices, payslips, and reports with near-perfect accuracy.",
    images: ["/altera_logo_hero_section.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AntdRegistry>
          <AntdProvider>
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
