<script setup>
import { onBeforeUnmount, onMounted, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import SiteHeader from "./components/SiteHeader.vue";
import HeroSection from "./components/HeroSection.vue";
import MarqueeBand from "./components/MarqueeBand.vue";
import NowSection from "./components/NowSection.vue";
import ResearchSection from "./components/ResearchSection.vue";
import EngineeringSection from "./components/EngineeringSection.vue";
import NotesSection from "./components/NotesSection.vue";
import SiteFooter from "./components/SiteFooter.vue";

const { t, locale } = useI18n();

watchEffect(() => {
  document.documentElement.lang = locale.value;
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));
});

const root = document.documentElement;
function trackPointer(event) {
  root.style.setProperty("--mx", `${event.clientX}px`);
  root.style.setProperty("--my", `${event.clientY}px`);
}
onMounted(() => window.addEventListener("pointermove", trackPointer, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("pointermove", trackPointer));
</script>

<template>
  <div class="cursor-glow" aria-hidden="true"></div>
  <a class="skip-link" href="#main">{{ t("a11y.skip") }}</a>
  <SiteHeader />
  <main id="main">
    <HeroSection />
    <MarqueeBand />
    <NowSection />
    <ResearchSection />
    <EngineeringSection />
    <NotesSection />
    <SiteFooter />
  </main>
</template>
