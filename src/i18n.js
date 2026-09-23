import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = [
  { code: "en", label: "EN" },
  { code: "zh-CN", label: "中文" },
];

const STORAGE_KEY = "locale";

function readSavedLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LOCALES.some((locale) => locale.code === saved) ? saved : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: readSavedLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { en, "zh-CN": zhCN },
});

export function setLocale(code) {
  i18n.global.locale.value = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Storage can be unavailable (private mode); the choice just won't persist.
  }
}
