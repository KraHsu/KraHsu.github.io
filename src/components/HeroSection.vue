<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="hero" id="top">
    <div v-reveal class="hero-copy reveal">
      <p class="eyebrow"><span class="eyebrow-line"></span> {{ t("hero.eyebrow") }}</p>
      <i18n-t keypath="hero.title" tag="h1" scope="global">
        <template #br><br /></template>
        <template #move><em>{{ t("hero.move") }}</em></template>
      </i18n-t>
      <p class="hero-lede">{{ t("hero.lede") }}</p>
      <div class="hero-subline"><span>{{ t("hero.tags") }}</span><span class="subline-dot">·</span><span>{{ t("hero.robomaster") }}</span></div>
    </div>
    <div v-reveal class="hero-art reveal reveal-delay" :aria-label="t('a11y.heroArt')">
      <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div>
      <div class="core">
        <i18n-t keypath="hero.core" tag="span" scope="global"><template #br><br /></template></i18n-t>
      </div>
      <div class="art-label art-label-top">{{ t("hero.artTop") }}</div><div class="art-label art-label-bottom">{{ t("hero.artBottom") }}</div>
      <div class="art-corner">x&nbsp; 31.2304<br />y&nbsp; 121.4737</div>
    </div>
    <div class="hero-index">{{ t("hero.scroll") }} <span>↓</span></div>
  </section>
</template>
