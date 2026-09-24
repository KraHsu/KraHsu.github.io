<script setup>
import { useI18n } from "vue-i18n";
import { useContent } from "../content";
import { useActiveSection } from "../composables/useActiveSection";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const { t } = useI18n();
const { site, l } = useContent();
const links = site.sections.filter((section) => section.nav !== false);
const active = useActiveSection(links.map((section) => section.id));
</script>

<template>
  <header class="site-header">
    <a class="wordmark" href="#top" :aria-label="t('a11y.home', { name: site.name })"><span class="mark"><img :src="site.avatar" alt="" width="29" height="29" /></span><span>{{ site.name }}</span></a>
    <nav class="nav mono-label" :aria-label="t('a11y.mainNav')">
      <a
        v-for="link in links"
        :key="link.id"
        :href="`#${link.id}`"
        :class="{ 'is-active': active === link.id }"
        :aria-current="active === link.id ? 'location' : undefined"
      >{{ l(link.label) }}</a>
    </nav>
    <div class="header-actions">
      <LanguageSwitcher />
      <a class="header-github mono-label" :href="`https://github.com/${site.github}`" target="_blank" rel="noreferrer"><span class="live-dot"></span> {{ t("nav.github") }} ↗</a>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1380px, 92vw);
  margin: 16px auto 0;
  padding: 18px 24px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--header-bg);
  box-shadow: 0 8px 30px var(--shadow);
  backdrop-filter: blur(18px);
}
.wordmark { display: inline-flex; align-items: center; gap: 11px; color: var(--ink); font: 500 12px var(--mono); letter-spacing: .08em; text-transform: uppercase; }
.mark { display: grid; width: 29px; height: 29px; place-items: center; overflow: hidden; background: var(--accent); border-radius: 50%; }
.mark img { display: block; width: 100%; height: 100%; object-fit: cover; }
.nav { display: flex; gap: clamp(18px, 3vw, 42px); margin-left: 8%; color: var(--muted); letter-spacing: .07em; }
.nav a { position: relative; transition: color .2s ease; }
.nav a::after {
  position: absolute;
  right: 0;
  bottom: -6px;
  left: 0;
  height: 1px;
  content: "";
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .3s ease;
}
.nav a:hover, .nav a.is-active { color: var(--accent); }
.nav a.is-active::after { transform: scaleX(1); }
.header-actions { display: flex; align-items: center; gap: 22px; }
.header-github { color: var(--muted); letter-spacing: .07em; transition: color .2s ease; }
.header-github:hover { color: var(--accent); }

@media (max-width: 800px) {
  .site-header { flex-wrap: wrap; row-gap: 14px; width: 90vw; padding: 14px 16px 12px; }
  .header-actions { gap: 14px; }
  /* The nav drops to its own row instead of disappearing. */
  .nav { order: 3; width: 100%; margin-left: 0; padding-top: 12px; overflow-x: auto; border-top: 1px solid var(--line); font-size: 11px; justify-content: space-between; scrollbar-width: none; }
  .nav a { flex: none; }
}
</style>
