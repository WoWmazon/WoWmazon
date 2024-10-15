"use client";

import { useEffect } from "react";
import i18next, { i18n } from "i18next";
import {
  initReactI18next,
  useTranslation as useTransAlias,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { type LocaleTypes, getOptions, locales } from "./settings";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: LocaleTypes, namespace: string) => {
      return import(`./locales/${language}/${namespace}.json`);
    })
  )
  .init({
    ...getOptions(),
    lng: undefined, 
    detection: {
      order: ["path"],
    },
    preload: runsOnServerSide ? locales : [],
  });

export const useTranslation = (lng: LocaleTypes, ns: string) => {
  const translator = useTransAlias(ns);
  const { i18n } = translator;

  if (runsOnServerSide && lng) {
    i18n.changeLanguage(lng);
  } else {
    useCustomTranslationImplem(i18n, lng);
  }
  return translator;
};

const useCustomTranslationImplem = (i18n: i18n, lng: LocaleTypes): void => {
  useEffect(() => {
    if (!lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
};
