import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import it from "./locales/it/translation.json";
import es from "./locales/es/translation.json";
import nl from "./locales/nl/translation.json";
import ru from "./locales/ru/translation.json";
import ar from "./locales/ar/translation.json";
import de from "./locales/de/translation.json";
import pt from "./locales/pt/translation.json";
import zh from "./locales/zh/translation.json";
import hi from "./locales/hi/translation.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            it: { translation: it },
            es: { translation: es },
            nl: { translation: nl },
            ru: { translation: ru },
            ar: { translation: ar },
            de: { translation: de },
            pt: { translation: pt },
            zh: { translation: zh },
            hi: { translation: hi },
        },
        fallbackLng: "en",
        supportedLngs: ["en", "fr", "it", "es", "nl", "ru", "ar", "de", "pt", "zh", "hi"],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["querystring", "localStorage", "navigator"],
            caches: ["localStorage"],
        },
    });

export default i18n;
