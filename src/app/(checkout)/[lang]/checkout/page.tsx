import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, LOCALES } from "@/i18n/dictionaries";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Altera Data Suite purchase.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { plan } = await searchParams;

  return (
    <main>
      <CheckoutClient lang={lang} planKey={plan} />
    </main>
  );
}
