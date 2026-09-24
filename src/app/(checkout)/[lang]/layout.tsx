import { notFound } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdProvider from "@/components/AntdProvider";
import CheckoutHeader from "@/components/CheckoutHeader";
import PageTransition, { PageTransitionProvider } from "@/components/PageTransition";
import { hasLocale, LOCALES } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Deliberately its own route group, separate from (main)/[lang]/layout.tsx
// -- the checkout flow gets a minimal logo-only header and no footer
// (standard checkout-page convention: fewer exits = fewer abandoned
// carts), which a shared [lang] layout can't do since a layout always
// wraps every route nested under it.
export default async function CheckoutLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <AntdRegistry>
      <AntdProvider>
        <PageTransitionProvider>
          <CheckoutHeader lang={lang} />
          <PageTransition>{children}</PageTransition>
        </PageTransitionProvider>
      </AntdProvider>
    </AntdRegistry>
  );
}
