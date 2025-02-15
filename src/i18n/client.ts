"use client";

import i18next from "i18next";
import { useEffect, useState } from "react";
import {
  initReactI18next,
  useTranslation as useTranslationOriginal,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages } from "./config";
import useStoreLanguage from "./use-store-language";
import useStoreLanguageActions from "./use-store-language-actions";
import useLanguage from "./use-language";
import { runsOnServerSide } from "../runs-on-server-side/runs-on-server-side";

interface TranslationOptions {
  keyPrefix?: string;
}

const i18nInstance = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  );

try {
  await i18nInstance.init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });
} catch (error) {
  console.error('Failed to initialize i18next:', error);
}

export function useTranslation(namespace: string, options?: TranslationOptions) {
  const language = useLanguage();
  const { language: cookies } = useStoreLanguage();
  const { setLanguage: setCookie } = useStoreLanguageActions();
  const originalInstance = useTranslationOriginal(namespace, options);
  const { i18n } = originalInstance;
  if (runsOnServerSide && language && i18n.resolvedLanguage !== language) {
    i18n.changeLanguage(language);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLanguage, setActiveLanguage] = useState(i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLanguage === i18n.resolvedLanguage) return;
      setActiveLanguage(i18n.resolvedLanguage);
    }, [activeLanguage, i18n.resolvedLanguage]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!language || i18n.resolvedLanguage === language) return;
      i18n.changeLanguage(language);
    }, [language, i18n]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies === language) return;
      setCookie(language);
    }, [language, cookies, setCookie]);
  }

  return originalInstance;
}
