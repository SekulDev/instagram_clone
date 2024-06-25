import { createI18n } from "vue-i18n";

import en from "./langs/en.json";
import pl from "./langs/pl.json";

function getBrowserLanguage() {
    const currentLanguage = window.localStorage.getItem("language");
    const language = currentLanguage || navigator.language?.split("-")[0] || "en";
    return language;
}

const messages = {
    en,
    pl,
};

export const i18n = createI18n({
    legacy: false,
    locale: getBrowserLanguage(),
    fallbackLocale: "en",
    messages,
});
