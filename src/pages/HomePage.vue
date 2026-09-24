<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import { LOCALES } from "../i18n";
import { useContent } from "../content";
import SiteHeader from "../components/SiteHeader.vue";
import HeroSection from "../components/HeroSection.vue";
import MarqueeBand from "../components/MarqueeBand.vue";
import AboutSection from "../components/sections/AboutSection.vue";
import PapersSection from "../components/sections/PapersSection.vue";
import ProjectsSection from "../components/sections/ProjectsSection.vue";
import QuoteSection from "../components/sections/QuoteSection.vue";
import SiteFooter from "../components/SiteFooter.vue";

const SECTION_COMPONENTS = { about: AboutSection, papers: PapersSection, projects: ProjectsSection, quote: QuoteSection };
const CJK_FONTS = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600&family=Noto+Serif+SC:wght@400&display=swap";

const { t, locale } = useI18n();
const { site, l } = useContent();
const SITE_URL = site.url;
const current = computed(() => LOCALES.find((option) => option.code === locale.value));

useHead(computed(() => ({
  htmlAttrs: { lang: locale.value },
  title: l(site.meta.title),
  meta: [
    { name: "description", content: l(site.meta.description) },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: l(site.meta.title) },
    { property: "og:description", content: l(site.meta.description) },
    { property: "og:url", content: SITE_URL + current.value.path },
    { property: "og:locale", content: current.value.ogLocale },
    { property: "og:image", content: `${SITE_URL}/og.png` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  link: [
    { rel: "canonical", href: SITE_URL + current.value.path },
    ...LOCALES.map((option) => ({ rel: "alternate", hreflang: option.code, href: SITE_URL + option.path })),
    { rel: "alternate", hreflang: "x-default", href: `${SITE_URL}/` },
    // Google Fonts slices CJK faces by unicode-range, so only glyphs on the page are fetched.
    ...(locale.value === "zh-CN" ? [{ rel: "stylesheet", href: CJK_FONTS }] : []),
  ],
})));

const glow = ref(null);
let frame = 0;
let pointer = { x: 0, y: 0 };

function paintGlow() {
  frame = 0;
  glow.value?.style.setProperty("transform", `translate(${pointer.x - 210}px, ${pointer.y - 210}px)`);
}
function trackPointer(event) {
  pointer = { x: event.clientX, y: event.clientY };
  frame ||= requestAnimationFrame(paintGlow);
}

// Touch screens have no hover position to follow.
let finePointer;
onMounted(() => {
  finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (finePointer.matches) window.addEventListener("pointermove", trackPointer, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("pointermove", trackPointer);
  cancelAnimationFrame(frame);
});
</script>

<template>
  <div ref="glow" class="cursor-glow" aria-hidden="true"></div>
  <a class="skip-link" href="#main">{{ t("a11y.skip") }}</a>
  <SiteHeader />
  <main id="main">
    <HeroSection />
    <MarqueeBand />
    <component :is="SECTION_COMPONENTS[section.type]" v-for="section in site.sections" :key="section.id" :section="section" />
    <SiteFooter />
  </main>
</template>

<style scoped>
.cursor-glow {
  position: fixed;
  z-index: 0;
  display: none;
  width: 420px;
  height: 420px;
  pointer-events: none;
  opacity: var(--glow-opacity);
  border-radius: 50%;
  background: var(--accent);
  filter: blur(130px);
  transform: translate(calc(50vw - 210px), calc(50vh - 210px));
  transition: transform .25s ease-out;
}
@media (hover: hover) and (pointer: fine) {
  .cursor-glow { display: block; }
}
</style>
