<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm, rt } = useI18n();
// Repeat the head of the list so the loop seam is filled.
const items = computed(() => {
  const words = tm("marquee").map((word) => rt(word));
  return [...words, ...words.slice(0, 2)];
});
</script>

<template>
  <section class="marquee" :aria-label="t('a11y.interests')">
    <div class="marquee-track">
      <template v-for="(item, index) in items" :key="index"><span>{{ item }}</span><i>✳</i></template>
    </div>
  </section>
</template>
