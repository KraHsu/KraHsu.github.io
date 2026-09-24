<script setup>
import { useI18n } from "vue-i18n";
import { LOCALES } from "../i18n";

const { t, locale } = useI18n();
</script>

<template>
  <div class="lang-switch" role="group" :aria-label="t('a11y.language')">
    <RouterLink
      v-for="option in LOCALES"
      :key="option.code"
      :to="option.path"
      :lang="option.code"
      :hreflang="option.code"
      :aria-current="locale === option.code ? 'true' : undefined"
      :class="{ 'is-active': locale === option.code }"
    >{{ option.label }}</RouterLink>
  </div>
</template>

<style scoped>
.lang-switch { display: inline-flex; gap: 2px; padding: 3px; border: 1px solid var(--line); border-radius: 999px; }
.lang-switch a { padding: 3px 9px; border-radius: 999px; color: var(--faint); font: 400 11px var(--mono); letter-spacing: .06em; transition: color .2s ease, background .2s ease; }
.lang-switch a:hover { color: var(--accent); }
.lang-switch a.is-active { color: var(--on-accent); background: var(--accent); }
</style>
