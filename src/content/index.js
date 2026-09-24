import { computed } from "vue";
import { useI18n } from "vue-i18n";
import site from "../../content/site.js";
import { LOCALES } from "../i18n";

const SECTION_TYPES = ["about", "papers", "projects", "quote"];
const images = import.meta.glob("/content/images/*", { eager: true, import: "default" });

const pad = (n) => String(n).padStart(2, "0");
const isLocalized = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value) && "en" in value && Object.keys(value).every((key) => key === "en" || key === "zh");

export function localize(value, key) {
  return isLocalized(value) ? value[key] ?? value.en : value;
}

function resolveImageUrl(name, where) {
  if (/^(https?:)?\/\//.test(name)) return name;
  const url = images[`/content/images/${name}`];
  if (!url) throw new Error(`[content] ${where}: "${name}" is not in content/images/`);
  return url;
}

function resolveImage(value, where) {
  if (!value) return null;
  const image = typeof value === "string" ? { src: value } : value;
  return { ...image, src: resolveImageUrl(image.src, where), dark: image.dark && resolveImageUrl(image.dark, where) };
}

function normalize(config) {
  const ids = new Set();
  let itemCount = 0;

  const sections = config.sections.map((section, index) => {
    if (!SECTION_TYPES.includes(section.type)) throw new Error(`[content] sections[${index}]: unknown type "${section.type}"`);
    if (ids.has(section.id)) throw new Error(`[content] sections[${index}]: duplicate id "${section.id}"`);
    ids.add(section.id);

    // Cards are numbered across sections, so the running count reads 01, 02, 03… down the page.
    const items = section.items?.map((item, i) => ({
      ...item,
      number: pad(++itemCount),
      href: item.href ?? (item.repo && `https://github.com/${item.repo}`),
      image: resolveImage(item.image, `${section.id}.items[${i}]`),
    }));
    return { ...section, number: pad(index + 1), items };
  });

  return { ...config, sections, contactNumber: pad(sections.length + 1) };
}

// Lists every `{ en }` without a `zh`, so gaps show up while editing rather than on the live page.
function findMissingTranslations(value, path = "site", missing = []) {
  if (isLocalized(value)) {
    if (value.zh === undefined) missing.push(path);
  } else if (Array.isArray(value)) {
    value.forEach((entry, i) => findMissingTranslations(entry, `${path}[${i}]`, missing));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => findMissingTranslations(entry, `${path}.${key}`, missing));
  }
  return missing;
}

export const content = normalize(site);

if (import.meta.env.DEV) {
  const missing = findMissingTranslations(site);
  if (missing.length) console.warn(`[content] missing "zh" for:\n  ${missing.join("\n  ")}`);
}

export function useContent() {
  const { locale } = useI18n();
  const key = computed(() => LOCALES.find((option) => option.code === locale.value)?.contentKey ?? "en");
  const l = (value) => localize(value, key.value);
  return { site: content, l };
}
