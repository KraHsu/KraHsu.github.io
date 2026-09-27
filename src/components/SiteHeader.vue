<script setup>
import { useI18n } from "vue-i18n";
import { useContent } from "../content";
import { useActiveSection } from "../composables/useActiveSection";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import ThemeToggle from "./ThemeToggle.vue";

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
    <div class="toolbar">
      <LanguageSwitcher />
      <span class="toolbar-divider" aria-hidden="true"></span>
      <ThemeToggle />
      <span class="toolbar-divider" aria-hidden="true"></span>
      <a class="toolbar-chip header-github" :href="`https://github.com/${site.github}`" target="_blank" rel="noreferrer" :aria-label="t('nav.github')">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" /></svg>
        <span class="github-label">{{ t("nav.github") }} <span class="arrow">↗</span></span>
      </a>
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
/* One pill for all header controls; each segment is a .toolbar-chip (styles.css). */
.toolbar { display: inline-flex; align-items: center; gap: 2px; padding: 3px; border: 1px solid var(--line); border-radius: 999px; }
.toolbar-divider { width: 1px; height: 14px; margin: 0 3px; background: var(--line); }
.header-github svg { width: 13px; height: 13px; fill: currentColor; }
/* ↗ isn't in the mono face, so its fallback (and width) differs per language; pin it to one character cell. */
.arrow { display: inline-block; width: 1ch; text-align: center; }

@media (max-width: 800px) {
  .site-header { flex-wrap: wrap; row-gap: 14px; width: 90vw; padding: 14px 16px 12px; }
  /* The nav drops to its own row instead of disappearing. */
  .nav { order: 3; width: 100%; margin-left: 0; padding-top: 12px; overflow-x: auto; border-top: 1px solid var(--line); font-size: 11px; justify-content: space-between; scrollbar-width: none; }
  .nav a { flex: none; }
}
/* Small phones keep the GitHub mark and drop its label. */
@media (max-width: 420px) {
  .github-label { display: none; }
  .header-github { width: 26px; padding: 0; }
  .toolbar { gap: 0; }
  .toolbar-divider { margin: 0 2px; }
  .lang-switch :deep(.toolbar-chip) { width: 38px; }
}
</style>
