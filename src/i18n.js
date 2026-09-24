import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";

export const DEFAULT_LOCALE = "en";
// Each locale lives at its own URL so it can be prerendered, shared, and indexed.
// `contentKey` is the field name used for that language in content/site.js.
export const LOCALES = [
  { code: "en", contentKey: "en", label: "EN", path: "/", ogLocale: "en_US" },
  { code: "zh-CN", contentKey: "zh", label: "中文", path: "/zh/", ogLocale: "zh_CN" },
];

export function localeFromRoute(route) {
  return route.params.lang === "zh" ? "zh-CN" : DEFAULT_LOCALE;
}

// A fresh instance per app so prerendering one route never leaks into another.
export function createAppI18n() {
  return createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: { en, "zh-CN": zhCN },
  });
}
