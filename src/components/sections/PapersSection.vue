<script setup>
import { useContent } from "../../content";
import { useRepoStars } from "../../composables/useRepoStars";
import SectionHead from "../SectionHead.vue";
import SectionFootnote from "../SectionFootnote.vue";
import PaperCard from "./PaperCard.vue";

const props = defineProps({ section: { type: Object, required: true } });
const { l } = useContent();
const stars = useRepoStars(props.section.items.map((paper) => paper.repo).filter(Boolean));
</script>

<template>
  <section :id="section.id" v-reveal class="section section-grid papers-section reveal">
    <div class="section-index mono-label">{{ section.number }} <span>{{ l(section.label) }}</span></div>
    <div class="papers-content">
      <SectionHead :section="section" />
      <div class="paper-list">
        <PaperCard v-for="paper in section.items" :key="paper.number" :paper="paper" :item-label="l(section.itemLabel)" :stars="stars[paper.repo]" />
      </div>
      <SectionFootnote v-if="section.footnote" :footnote="section.footnote" />
    </div>
  </section>
</template>

<style scoped>
.papers-section { padding-bottom: 100px; }
.papers-content { min-width: 0; }
.paper-list { display: grid; gap: 28px; }

@media (max-width: 800px) {
  .papers-section { padding: 95px 0 110px; }
}
</style>
