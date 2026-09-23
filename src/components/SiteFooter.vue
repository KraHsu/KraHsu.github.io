<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer-section" id="contact">
    <div class="section footer-inner">
      <div class="footer-top"><p class="section-kicker">{{ t("footer.kicker") }}</p><span class="footer-status"><span class="live-dot"></span> {{ t("footer.status") }}</span></div>
      <div class="footer-main">
        <i18n-t keypath="footer.title" tag="h2" scope="global">
          <template #br><br /></template>
          <template #em><em>{{ t("footer.em") }}</em></template>
        </i18n-t>
        <div class="footer-links">
          <a href="mailto:charles040318@gmail.com">charles040318@gmail.com ↗</a>
          <a href="https://github.com/KraHsu" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://space.bilibili.com/86698256" target="_blank" rel="noreferrer">{{ t("footer.bilibili") }} ↗</a>
          <a href="https://blog.csdn.net/CharlesHsuu" target="_blank" rel="noreferrer">{{ t("footer.csdn") }} ↗</a>
        </div>
      </div>
      <div class="footer-bottom"><span>© {{ year }} Charles Hsu</span><span>{{ t("footer.made") }}</span></div>
    </div>
  </footer>
</template>
