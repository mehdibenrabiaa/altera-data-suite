"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALES } from "@/i18n/dictionaries";
import { ChevronDownIcon, CheckCircleFilledIcon } from "@/components/icons";
import styles from "./LanguageSwitcher.module.css";

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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleChange = (newLang: string) => {
    setOpen(false);
    if (newLang === currentLang) return;
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/") || `/${newLang}`);
  };

  // Replaces the native <select>'s own outside-click/ESC dismissal --
  // only wired up while the menu is actually open.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.wrapper} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.flag}>{FLAGS[currentLang]}</span>
        <span>{langNames[currentLang] ?? currentLang.toUpperCase()}</span>
        <ChevronDownIcon size={14} className={open ? styles.chevronOpen : undefined} />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === currentLang}
                className={styles.option}
                onClick={() => handleChange(code)}
              >
                <span className={styles.flag}>{FLAGS[code]}</span>
                <span className={styles.optionLabel}>{langNames[code] ?? code.toUpperCase()}</span>
                {code === currentLang && (
                  <CheckCircleFilledIcon size={14} className={styles.checkIcon} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
