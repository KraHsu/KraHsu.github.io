<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import genelabPromo from "../assets/genelab-promo.svg";

const { t, locale } = useI18n();

const projects = [
  { key: "genelab", index: "02", name: "GeneLab", href: "https://github.com/KraHsu/GeneLab", image: genelabPromo },
  { key: "parley", index: "03", name: "Parley", href: "https://github.com/KraHsu/parley", image: "https://raw.githubusercontent.com/KraHsu/parley/main/docs/media/readme-hero-light.svg" },
];

const grid = ref(null);
const items = ref([]);
const isMasonry = ref(false);

// Keep in sync with `.engineering-grid { gap }` in styles.css.
const GAP = 42;

function layout() {
  const gridEl = grid.value;
  if (!gridEl || items.value.length < 2) return;

  const columns = window.matchMedia("(max-width: 800px)").matches ? 1 : 2;
  const columnWidth = (gridEl.clientWidth - GAP * (columns - 1)) / columns;
  const heights = Array(columns).fill(0);

  isMasonry.value = true;
  items.value.forEach((item) => {
    item.style.width = `${columnWidth}px`;
  });

  requestAnimationFrame(() => {
    items.value.forEach((item) => {
      const column = heights.indexOf(Math.min(...heights));
      item.style.left = `${column * (columnWidth + GAP)}px`;
      item.style.top = `${heights[column]}px`;
      heights[column] += item.offsetHeight + GAP;
    });
    gridEl.style.height = `${Math.max(...heights) - GAP}px`;
  });
}

// Translated copy changes card heights, so re-flow after the DOM updates.
watch(locale, () => nextTick(layout));

onMounted(() => {
  layout();
  window.addEventListener("load", layout);
  window.addEventListener("resize", layout);
  document.fonts?.ready.then(layout);
});
onBeforeUnmount(() => {
  window.removeEventListener("load", layout);
  window.removeEventListener("resize", layout);
});
</script>

<template>
  <section v-reveal class="section engineering-section reveal" id="engineering">
    <div class="section-index">03 <span>{{ t("engineering.index") }}</span></div>
    <div class="work-content">
      <div class="section-head">
        <div>
          <p class="section-kicker">{{ t("engineering.kicker") }}</p>
          <i18n-t keypath="engineering.title" tag="h2" scope="global">
            <template #br><br /></template>
            <template #same><em>{{ t("engineering.same") }}</em></template>
          </i18n-t>
        </div>
        <p class="section-aside">{{ t("engineering.aside") }}</p>
      </div>
      <div ref="grid" class="engineering-grid" :class="{ 'is-masonry': isMasonry }">
        <a v-for="project in projects" :key="project.key" ref="items" class="engineering-item" :href="project.href" target="_blank" rel="noreferrer">
          <div class="engineering-meta"><span>{{ t("engineering.tag", { n: project.index }) }}</span><span>{{ project.name }}</span></div>
          <div class="project-media engineering-media"><img :src="project.image" :alt="t('a11y.projectImage', { name: project.name })" loading="lazy" @load="layout" /></div>
          <h3>{{ project.name }} <span>↗</span></h3>
          <p>{{ t(`engineering.${project.key}`) }}</p>
        </a>
      </div>
    </div>
  </section>
</template>
