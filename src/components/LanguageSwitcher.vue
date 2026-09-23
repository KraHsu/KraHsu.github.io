<script setup>
import { useI18n } from "vue-i18n";
import { SUPPORTED_LOCALES, setLocale } from "../i18n";

const { t, locale } = useI18n();
</script>

<template>
  <div class="lang-switch" role="group" :aria-label="t('a11y.language')">
    <button
      v-for="option in SUPPORTED_LOCALES"
      :key="option.code"
      type="button"
      :lang="option.code"
      :aria-pressed="locale === option.code"
      :class="{ 'is-active': locale === option.code }"
      @click="setLocale(option.code)"
    >{{ option.label }}</button>
  </div>
</template>
