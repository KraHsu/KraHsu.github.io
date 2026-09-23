<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section v-reveal class="note-section reveal" id="notes">
    <div class="section note-inner">
      <div class="section-index">04 <span>{{ t("notes.index") }}</span></div>
      <div class="note-body">
        <p class="section-kicker">{{ t("notes.kicker") }}</p>
        <blockquote>{{ t("notes.quote") }}</blockquote>
        <div class="note-rule"></div>
        <p class="note-caption">{{ t("notes.caption") }}</p>
        <a class="note-link" href="https://hsublog.pages.dev" target="_blank" rel="noreferrer">{{ t("notes.link") }} <span>↗</span></a>
      </div>
    </div>
  </section>
</template>
