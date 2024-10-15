import type { InitOptions } from "i18next";

export const fallbackLng = "ko";
export const locales = [fallbackLng, "en"] as const;
export type LocaleTypes = (typeof locales)[number];
export const defaultNS = "common";

export const getOptions = (lang: string = fallbackLng, ns: string = defaultNS): InitOptions => ({
  supportedLngs: locales,
  fallbackLng,
  lng: lang,
  fallbackNS: defaultNS,
  defaultNS,
  ns,
});
