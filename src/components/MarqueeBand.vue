<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useContent } from "../content";

const { t } = useI18n();
const { site, l } = useContent();
const words = computed(() => l(site.marquee));
// One group is repeated until it is wider than the viewport; two identical groups loop at -50%.
const group = computed(() => Array(4).fill(words.value).flat());
</script>

<template>
  <section class="marquee" :aria-label="t('a11y.interests')">
    <p class="sr-only">{{ words.join(", ") }}</p>
    <div class="marquee-track" aria-hidden="true">
      <div v-for="copy in 2" :key="copy" class="marquee-group">
        <template v-for="(word, index) in group" :key="index"><span>{{ word }}</span><i>✳</i></template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee { overflow: hidden; width: 100%; padding: 20px 0 22px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); color: var(--muted); }
.marquee-track { display: flex; width: max-content; animation: marquee 120s linear infinite; font: 500 11px var(--mono); letter-spacing: .1em; white-space: nowrap; }
/* Trailing padding equals the gap so both halves are exactly the same width. */
.marquee-group { display: flex; align-items: center; gap: 38px; padding-right: 38px; }
.marquee i { color: var(--accent); font-style: normal; }
.marquee:hover .marquee-track { animation-play-state: paused; }

@keyframes marquee { to { transform: translateX(-50%); } }
</style>
