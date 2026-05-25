import type enDict from "@/dictionaries/en.json";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  de: () => import("@/dictionaries/de.json").then((m) => m.default),
  nl: () => import("@/dictionaries/nl.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof enDict;

export const LOCALES = Object.keys(dictionaries) as Locale[];
export const DEFAULT_LOCALE: Locale = "en";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
