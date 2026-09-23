<script setup>
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const { t } = useI18n();
const links = ["now", "research", "engineering", "notes"];
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="#top" :aria-label="t('a11y.home')"><span class="mark"><img src="https://github.com/KraHsu.png?size=96" alt="" /></span><span>CHARLES HSU</span></a>
    <nav class="nav" :aria-label="t('a11y.mainNav')">
      <a v-for="link in links" :key="link" :href="`#${link}`">{{ t(`nav.${link}`) }}</a>
    </nav>
    <div class="header-actions">
      <LanguageSwitcher />
      <a class="header-github" href="https://github.com/KraHsu" target="_blank" rel="noreferrer"><span class="live-dot"></span> {{ t("nav.github") }} ↗</a>
    </div>
  </header>
</template>
