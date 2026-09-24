<script setup>
import { useContent } from "../../content";
import SectionHead from "../SectionHead.vue";

defineProps({ section: { type: Object, required: true } });
const { l } = useContent();
</script>

<template>
  <section :id="section.id" v-reveal class="section section-grid about-section reveal">
    <div class="section-index mono-label">{{ section.number }} <span>{{ l(section.label) }}</span></div>
    <div class="about-content">
      <SectionHead :section="section" />
      <div class="about-columns"><p v-for="(paragraph, index) in section.paragraphs" :key="index">{{ l(paragraph) }}</p></div>
      <div v-if="section.interests?.length" class="interest-list mono-label"><span v-for="(interest, index) in section.interests" :key="index">{{ l(interest) }}</span></div>
    </div>
  </section>
</template>

<style scoped>
.about-section { padding: 160px 0; }
.about-content { min-width: 0; max-width: 850px; }
.about-content :deep(.display-title) { margin-bottom: 70px; }
.about-columns { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 7vw; max-width: 800px; color: var(--muted); font-size: 17px; line-height: 1.8; }
.interest-list { display: flex; flex-wrap: wrap; gap: 12px 42px; margin-top: 70px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--faint); }
.interest-list span:first-child { color: var(--accent); }

:lang(zh-CN) .about-columns { text-align: justify; }

@media (max-width: 800px) {
  .about-section { padding: 95px 0 110px; }
  .about-content :deep(.display-title) { margin-bottom: 45px; }
  .about-columns { grid-template-columns: 1fr; gap: 22px; }
  .interest-list { margin-top: 48px; }
}
</style>
