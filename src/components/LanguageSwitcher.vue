<script setup>
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { LOCALES } from "../i18n";

const { t, locale } = useI18n();
const router = useRouter();

const chips = {};
const indicator = reactive({ x: 0, width: 0 });
// The sliding indicator needs measurements, so until mount the active chip paints its own background.
const ready = ref(false);

function measure() {
  const chip = chips[locale.value];
  if (!chip) return;
  indicator.x = chip.offsetLeft;
  indicator.width = chip.offsetWidth;
  ready.value = true;
}

// Cross-fade the page while the copy swaps. The indicator and each chip get their own view-transition-name:
// the indicator group morphs (slides) between chips, and the chips, later in the DOM, paint above it.
function switchTo(option) {
  if (option.code === locale.value) return;
  const navigate = () => router.push(option.path);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reducedMotion) {
    navigate();
    return;
  }
  document.startViewTransition(async () => {
    await navigate();
    await nextTick();
  });
}

watch(locale, measure, { flush: "post" });
onMounted(() => {
  measure();
  // Chip widths depend on web fonts (the CJK face in particular loads late).
  document.fonts?.ready.then(measure);
});
</script>

<template>
  <div class="lang-switch" :class="{ 'has-indicator': ready }" role="group" :aria-label="t('a11y.language')">
    <span v-if="ready" class="lang-indicator" :style="{ width: `${indicator.width}px`, transform: `translateX(${indicator.x}px)` }" aria-hidden="true"></span>
    <a
      v-for="option in LOCALES"
      :key="option.code"
      :ref="(el) => (chips[option.code] = el)"
      :href="option.path"
      :lang="option.code"
      :style="{ viewTransitionName: `lang-chip-${option.code}` }"
      :hreflang="option.code"
      :aria-current="locale === option.code ? 'true' : undefined"
      class="toolbar-chip"
      :class="{ 'is-active': locale === option.code }"
      @click.prevent="switchTo(option)"
    >{{ option.label }}</a>
  </div>
</template>

<style scoped>
.lang-switch { position: relative; display: inline-flex; gap: 2px; }
/* Equal, fixed widths: the toolbar never shifts when the CJK web font swaps in, and the indicator only slides. */
.lang-switch .toolbar-chip { position: relative; z-index: 1; width: 44px; padding: 0; }
.lang-indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: 999px;
  background: var(--accent);
  transition: transform .4s cubic-bezier(.2, .8, .2, 1), width .4s cubic-bezier(.2, .8, .2, 1);
  view-transition-name: lang-indicator;
}
.lang-switch.has-indicator .toolbar-chip.is-active { background: transparent; }
.lang-switch.has-indicator .toolbar-chip { transition: color .4s ease, background .2s ease; }
</style>
