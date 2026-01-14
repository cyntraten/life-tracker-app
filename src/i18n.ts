import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import ru from "./locales/ru/translation.json";
import en from "./locales/en/translation.json";

i18next
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "ru",
    fallbackLng: "en",
    resources: {
      ru: {
        translation: ru,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18next;
