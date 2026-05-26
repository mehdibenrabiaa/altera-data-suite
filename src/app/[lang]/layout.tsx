import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AntdProvider from "@/components/AntdProvider";
import PageTransition, { PageTransitionProvider } from "@/components/PageTransition";
import { getDictionary, hasLocale, LOCALES } from "@/i18n/dictionaries";

const BASE_URL = "https://www.alteradatasuite.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const alternates: Record<string, string> = {};
  for (const locale of LOCALES) {
    alternates[locale] = `${BASE_URL}/${locale}`;
  }
  alternates["x-default"] = `${BASE_URL}/en`;

  return {
    alternates: { languages: alternates },
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <AntdRegistry>
      <AntdProvider>
        <PageTransitionProvider>
          <Navbar t={dict.nav} lang={lang} />
          <PageTransition>{children}</PageTransition>
          <Footer t={dict.footer} lang={lang} langNames={dict.lang} />
        </PageTransitionProvider>
      </AntdProvider>
    </AntdRegistry>
  );
}
