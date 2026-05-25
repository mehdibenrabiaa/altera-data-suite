"use client";

import { usePathname, useRouter } from "next/navigation";
import { Select } from "antd";
import { LOCALES } from "@/i18n/dictionaries";

const FLAGS: Record<string, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
  de: "🇩🇪",
  nl: "🇳🇱",
};

interface Props {
  currentLang: string;
  langNames: Record<string, string>;
}

export default function LanguageSwitcher({ currentLang, langNames }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLang: string) => {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/") || `/${newLang}`);
  };

  return (
    <Select
      value={currentLang}
      onChange={handleChange}
      size="small"
      variant="borderless"
      style={{ minWidth: 110 }}
      options={LOCALES.map((code) => ({
        value: code,
        label: (
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span>{FLAGS[code]}</span>
            <span>{langNames[code] ?? code.toUpperCase()}</span>
          </span>
        ),
      }))}
      aria-label="Select language"
    />
  );
}
