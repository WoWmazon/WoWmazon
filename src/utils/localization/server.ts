import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, LocaleTypes } from "./settings";

const initI18next = async (lang: LocaleTypes, ns: string) => {
  const i18nInstance = createInstance(); // i18n 인스턴스 생성 및 초기화
  await i18nInstance
    .use(initReactI18next) // react-i18next 초기화
    .use(
      resourcesToBackend(//동적으로 언어와 네임스페이스에따라 JSON번역파일가져옴
        (language: string, namespace: typeof ns) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lang, ns));

  return i18nInstance;
};

export async function createTranslation(lang: LocaleTypes, ns: string) {
  const i18nextInstance = await initI18next(lang, ns);

  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
  };
}
