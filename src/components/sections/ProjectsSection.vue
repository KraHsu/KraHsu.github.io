<script setup>
import { useI18n } from "vue-i18n";
import { useContent } from "../../content";
import { formatStars, useRepoStars } from "../../composables/useRepoStars";
import ContentImage from "../ContentImage.vue";
import SectionHead from "../SectionHead.vue";
import SectionFootnote from "../SectionFootnote.vue";

const props = defineProps({ section: { type: Object, required: true } });
const { t } = useI18n();
const { l } = useContent();
const stars = useRepoStars(props.section.items.map((project) => project.repo).filter(Boolean));
</script>

<template>
  <section :id="section.id" v-reveal class="section section-grid projects-section reveal">
    <div class="section-index mono-label">{{ section.number }} <span>{{ l(section.label) }}</span></div>
    <div class="projects-content">
      <SectionHead :section="section" />
      <div class="project-grid">
        <a v-for="project in section.items" :key="project.number" class="project-item" :href="project.href" target="_blank" rel="noreferrer">
          <div class="project-meta mono-label">
            <span>{{ project.number }} / {{ l(section.itemLabel) }}</span>
            <span>{{ project.name }}<template v-if="stars[project.repo] !== undefined"> · <span class="stars" :title="t('a11y.stars')">★ {{ formatStars(stars[project.repo]) }}</span></template></span>
          </div>
          <ContentImage v-if="project.image" class="project-media" :image="project.image" :alt="l(project.image.alt) ?? t('a11y.image', { name: project.name })" />
          <h3>{{ project.name }} <span>↗</span></h3>
          <p>{{ l(project.description) }}</p>
        </a>
      </div>
      <SectionFootnote v-if="section.footnote" :footnote="section.footnote" />
    </div>
  </section>
</template>

<style scoped>
.projects-section { padding-bottom: 150px; }
.projects-content { min-width: 0; }
.project-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 42px; align-items: start; }
.project-item { display: flex; flex-direction: column; padding: 0 0 30px; border-top: 1px solid var(--line); transition: border-color .25s ease; }
.project-item:hover { border-top-color: var(--accent); }
.project-meta { display: flex; justify-content: space-between; gap: 12px; padding-top: 18px; color: var(--faint); font-size: 11px; }
.project-item:hover .project-meta { color: var(--accent); }
.stars { white-space: nowrap; }
.project-media { margin: 18px 0 24px; }
.project-item:hover .project-media :deep(img) { transform: scale(1.015); }
.project-item h3 { margin: 0 24px 9px; font: 500 31px var(--sans); letter-spacing: -.06em; }
.project-item h3 span { color: var(--accent); font: 400 15px var(--mono); }
.project-item p { max-width: 520px; margin: 0 24px; color: var(--muted); font-size: 16px; line-height: 1.7; }

@media (max-width: 800px) {
  .projects-section { padding: 95px 0 110px; }
  .project-grid { grid-template-columns: minmax(0, 1fr); }
  .project-item h3, .project-item p { margin-right: 0; margin-left: 0; }
}
</style>
