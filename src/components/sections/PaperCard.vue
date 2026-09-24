<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useContent } from "../../content";
import { formatStars } from "../../composables/useRepoStars";
import ContentImage from "../ContentImage.vue";

const props = defineProps({
  paper: { type: Object, required: true },
  itemLabel: { type: String, required: true },
  stars: { type: Number, default: undefined },
});
const { t } = useI18n();
const { l } = useContent();

const BUILT_IN_LABELS = ["context", "date", "venue"];
const metaLabel = (label) => (BUILT_IN_LABELS.includes(label) ? t(`paper.${label}`) : l(label));

// Collapse long author lists, but never hide the site owner.
const authors = computed(() => props.paper.authors ?? []);
const visibleAuthors = computed(() => {
  const selfIndex = authors.value.findIndex((author) => author.self);
  return props.paper.visibleAuthors ?? Math.max(5, selfIndex + 1);
});
const hiddenCount = computed(() => Math.max(0, authors.value.length - visibleAuthors.value));
const showAllAuthors = ref(false);
const authorsId = computed(() => `authors-${props.paper.number}`);
</script>

<template>
  <article class="paper-card">
    <div class="paper-top mono-label">
      <span>{{ paper.number }} / {{ itemLabel }}</span>
      <span>{{ paper.title }}<template v-if="stars !== undefined"> · <span class="stars" :title="t('a11y.stars')">★ {{ formatStars(stars) }}</span></template></span>
    </div>
    <a v-if="paper.image" class="project-media paper-media" :href="paper.href" target="_blank" rel="noreferrer" :aria-label="t('a11y.repo', { name: paper.title })">
      <ContentImage :image="paper.image" :alt="l(paper.image.alt) ?? t('a11y.image', { name: paper.title })" />
    </a>
    <h3><a class="paper-title" :href="paper.href" target="_blank" rel="noreferrer">{{ paper.title }} <span>↗</span></a></h3>
    <p>{{ l(paper.description) }}</p>
    <div v-if="authors.length || paper.meta?.length" class="paper-meta">
      <div v-if="authors.length" class="paper-meta-row">
        <span class="paper-meta-label">{{ t("paper.authors") }}</span>
        <span class="paper-meta-value author-list">
          <span :id="authorsId">
            <span v-for="(author, index) in authors" v-show="showAllAuthors || index < visibleAuthors" :key="author.name"><template v-if="index > 0"> · </template><component :is="author.self ? 'strong' : 'span'">{{ author.name }}<sup v-if="author.marks">{{ author.marks }}</sup></component></span>
          </span>
          <button v-if="hiddenCount" type="button" class="author-toggle" :aria-controls="authorsId" :aria-expanded="showAllAuthors" @click="showAllAuthors = !showAllAuthors">
            {{ showAllAuthors ? t("paper.fewerAuthors") : t("paper.moreAuthors", { n: hiddenCount }) }}
          </button>
          <span v-if="paper.authorNotes" class="author-key">{{ l(paper.authorNotes) }}</span>
        </span>
      </div>
      <div v-for="(row, index) in paper.meta" :key="index" class="paper-meta-row">
        <span class="paper-meta-label">{{ metaLabel(row.label) }}</span>
        <span class="paper-meta-value">
          {{ row.text ? `${l(row.text)} ` : "" }}
          <a v-if="row.link" :href="row.link.href" target="_blank" rel="noreferrer">{{ l(row.link.text) }} ↗</a>
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.paper-card {
  display: flex;
  flex-direction: column;
  padding: 18px;
  border: 1px solid var(--line);
  background: var(--surface);
  transition: border-color .25s ease, transform .25s ease, background .25s ease, box-shadow .25s ease;
}
.paper-card:hover { border-color: var(--accent); background: var(--panel); box-shadow: 0 18px 42px var(--shadow); transform: translateY(-6px); }
.paper-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 20px; color: var(--faint); font-size: 11px; }
.paper-card:hover .paper-top { color: var(--accent); }
.stars { white-space: nowrap; }
.paper-card h3 { margin: 0 0 11px; font: 500 34px var(--sans); letter-spacing: -.06em; }
.paper-card h3 span { color: var(--accent); font: 400 15px var(--mono); }
.paper-title { color: inherit; }
.paper-card > p { max-width: 760px; margin-bottom: 0; color: var(--muted); font-size: 16px; line-height: 1.7; }

.paper-media { display: flex; min-height: 390px; margin-top: 0; align-items: center; justify-content: center; }
.paper-media::after { position: absolute; inset: 16px; pointer-events: none; content: ""; border: 1px solid var(--line); }
.paper-media :deep(img) { padding: 14px 48px; }
.paper-card:hover .paper-media :deep(img) { transform: scale(1.025); }

.paper-meta { --label-width: 108px; margin-top: 30px; border-top: 1px solid var(--line); }
/* Each row is its own grid: rules span the full row and label/value share a text baseline. */
.paper-meta-row { position: relative; display: grid; grid-template-columns: var(--label-width) minmax(0, 1fr); align-items: baseline; border-bottom: 1px solid var(--line); }
.paper-meta-row::before { position: absolute; top: 0; bottom: 0; left: var(--label-width); width: 1px; content: ""; background: var(--line); }
.paper-meta-label { padding: 14px 14px 14px 0; color: var(--faint); font: 400 11px/1.65 var(--mono); letter-spacing: .08em; text-transform: uppercase; }
.paper-meta-value { margin: 0; padding: 14px 0 14px 18px; color: var(--muted); font: 400 14px/1.65 var(--sans); }
.paper-meta-value a { color: var(--ink); text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 4px; }
.author-list { display: block; }
.author-list strong { color: var(--ink); font-weight: 700; }
.author-list sup { color: var(--accent); font: 500 10px var(--mono); }
.author-toggle { margin-left: 10px; padding: 0; border: 0; color: var(--accent); background: none; font: 500 11px var(--mono); letter-spacing: .04em; cursor: pointer; }
.author-toggle:hover { text-decoration: underline; text-underline-offset: 4px; }
.author-key { display: block; margin-top: 8px; color: var(--faint); font: 400 11px var(--mono); letter-spacing: .02em; }

@media (max-width: 800px) {
  .paper-media { min-height: 250px; }
  .paper-media :deep(img) { padding: 14px 24px; }
  .paper-meta-row { grid-template-columns: minmax(0, 1fr); padding: 14px 0; }
  .paper-meta-row::before { display: none; }
  .paper-meta-label { padding: 0 0 4px; }
  .paper-meta-value { padding: 0; }
}
</style>
