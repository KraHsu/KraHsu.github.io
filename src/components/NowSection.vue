<script setup>
import { useI18n } from "vue-i18n";

const { t, tm, rt } = useI18n();
</script>

<template>
  <section v-reveal class="section now-section reveal" id="now">
    <div class="section-index">01 <span>{{ t("now.index") }}</span></div>
    <div class="now-content">
      <p class="section-kicker">{{ t("now.kicker") }}</p>
      <i18n-t keypath="now.title" tag="h2" scope="global">
        <template #thinking><em>{{ t("now.thinking") }}</em></template>
        <template #touching><em>{{ t("now.touching") }}</em></template>
      </i18n-t>
      <div class="now-columns"><p>{{ t("now.p1") }}</p><p>{{ t("now.p2") }}</p></div>
      <div class="interest-list"><span v-for="(interest, index) in tm('now.interests')" :key="index">{{ rt(interest) }}</span></div>
    </div>
  </section>
</template>
