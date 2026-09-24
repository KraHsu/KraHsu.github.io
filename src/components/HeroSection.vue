<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useContent } from "../content";
import RichText from "./RichText.js";

const { t } = useI18n();
const { site, l } = useContent();
const hero = site.hero;

const heroEl = ref(null);
const art = ref(null);
let frame = 0;
let offset = { x: 0, y: 0 };

// Normalised pointer offset from the artwork centre, in [-1, 1]; layers scale it by depth in CSS.
function paint() {
  frame = 0;
  art.value?.style.setProperty("--px", offset.x.toFixed(3));
  art.value?.style.setProperty("--py", offset.y.toFixed(3));
}
function track(event) {
  const box = art.value.getBoundingClientRect();
  const clamp = (value) => Math.max(-1, Math.min(1, value));
  offset = {
    x: clamp((event.clientX - (box.left + box.width / 2)) / (box.width / 2)),
    y: clamp((event.clientY - (box.top + box.height / 2)) / (box.height / 2)),
  };
  frame ||= requestAnimationFrame(paint);
}
function reset() {
  offset = { x: 0, y: 0 };
  frame ||= requestAnimationFrame(paint);
}

onMounted(() => {
  const canTilt = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
  if (!canTilt) return;
  heroEl.value.addEventListener("pointermove", track, { passive: true });
  heroEl.value.addEventListener("pointerleave", reset);
});
onBeforeUnmount(() => {
  heroEl.value?.removeEventListener("pointermove", track);
  heroEl.value?.removeEventListener("pointerleave", reset);
  cancelAnimationFrame(frame);
});
</script>

<template>
  <section ref="heroEl" class="hero" id="top">
    <div v-reveal class="hero-copy reveal">
      <p class="eyebrow mono-label"><span class="eyebrow-line"></span> {{ l(hero.eyebrow) }}</p>
      <RichText tag="h1" :text="l(hero.title)" />
      <p class="hero-lede">{{ l(hero.lede) }}</p>
      <div class="hero-subline mono-label">
        <template v-for="(tag, index) in hero.tags" :key="index"><span v-if="index > 0" class="subline-dot">·</span><span>{{ l(tag) }}</span></template>
      </div>
    </div>
    <div ref="art" v-reveal class="hero-art reveal reveal-delay" role="img" :aria-label="t('a11y.heroArt')">
      <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div>
      <div class="core">
        <RichText :text="l(hero.core)" />
      </div>
      <div class="art-label art-label-top mono-label">{{ l(hero.artLabels.top) }}</div><div class="art-label art-label-bottom mono-label">{{ l(hero.artLabels.bottom) }}</div>
      <div class="art-corner mono-label">x&nbsp; {{ hero.coordinates[0] }}<br />y&nbsp; {{ hero.coordinates[1] }}</div>
    </div>
    <div class="hero-index mono-label">{{ t("hero.scroll") }} <span>↓</span></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, .95fr);
  gap: 7vw;
  width: min(1380px, 92vw);
  min-height: 790px;
  margin: 0 auto;
  padding: 130px 0 100px;
  align-items: center;
}
.eyebrow { display: flex; align-items: center; gap: 12px; color: var(--accent); }
.eyebrow-line { display: inline-block; width: 42px; height: 1px; background: var(--accent); }
h1 { max-width: 840px; margin: 32px 0; font: 600 clamp(72px, 10.5vw, 160px)/.88 var(--sans); letter-spacing: -.095em; }
.hero-lede { max-width: 600px; margin-bottom: 36px; color: var(--muted); font-size: 19px; line-height: 1.75; }
.hero-subline { display: flex; flex-wrap: wrap; gap: 12px; color: var(--faint); }
.subline-dot { color: var(--accent); }

.hero-art { --px: 0; --py: 0; position: relative; width: min(560px, 100%); aspect-ratio: 1; justify-self: end; }
.hero-art::before { position: absolute; inset: 13%; content: ""; border: 1px solid var(--line-strong); border-radius: 50%; }
.hero-art::after { position: absolute; inset: 25%; content: ""; border: 1px dashed var(--accent-soft); border-radius: 50%; }
/* `translate` composes with the spinning `transform`, so depth parallax never fights the orbit keyframes. */
.orbit, .core, .art-label, .art-corner { transition: translate .6s cubic-bezier(.2, .7, .2, 1); }
.orbit {
  position: absolute;
  inset: 8%;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  animation-duration: 22s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  translate: calc(var(--px) * 6px) calc(var(--py) * 6px);
}
.orbit::after { position: absolute; top: 2%; left: 50%; width: 8px; height: 8px; content: ""; border-radius: 50%; background: var(--accent); box-shadow: 0 0 22px var(--accent); }
.orbit-one { transform: rotate(18deg) scaleY(.4); animation-name: orbit-one-spin; }
.orbit-two { inset: 20%; border-color: var(--accent-soft); transform: rotate(-30deg) scaleY(.55); animation-name: orbit-two-spin; animation-duration: 15s; translate: calc(var(--px) * 12px) calc(var(--py) * 12px); }
.orbit-two::after { top: 92%; }
.orbit-three { inset: 30%; border-style: dashed; transform: rotate(64deg) scaleY(.7); animation-name: orbit-three-spin; animation-duration: 28s; translate: calc(var(--px) * 18px) calc(var(--py) * 18px); }
.orbit-three::after { width: 5px; height: 5px; background: var(--ink); box-shadow: 0 0 0 1px var(--accent); }
.core {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  width: 150px;
  height: 150px;
  place-items: center;
  color: var(--on-accent);
  background: var(--accent);
  border-radius: 50%;
  box-shadow: 0 0 80px var(--accent-soft);
  transform: translate(-50%, -50%);
  translate: calc(var(--px) * 26px) calc(var(--py) * 26px);
}
.core span { font: 600 15px/1.05 var(--mono); letter-spacing: -.05em; }
.art-label, .art-corner { position: absolute; color: var(--muted); font-size: 10px; translate: calc(var(--px) * -8px) calc(var(--py) * -8px); }
.art-label-top { top: 6%; right: 8%; }
.art-label-bottom { right: 10%; bottom: 9%; color: var(--accent); }
.art-corner { bottom: 12%; left: 3%; line-height: 1.8; color: var(--faint); }
.hero-index { position: absolute; bottom: 28px; left: 0; color: var(--faint); font-size: 10px; }
.hero-index span { margin-left: 12px; color: var(--accent); font-size: 15px; }

@keyframes orbit-one-spin { from { transform: rotate(18deg) scaleY(.4); } to { transform: rotate(378deg) scaleY(.4); } }
@keyframes orbit-two-spin { from { transform: rotate(-30deg) scaleY(.55); } to { transform: rotate(-390deg) scaleY(.55); } }
@keyframes orbit-three-spin { from { transform: rotate(64deg) scaleY(.7); } to { transform: rotate(424deg) scaleY(.7); } }

:lang(zh-CN) h1 { font-size: clamp(54px, 7vw, 104px); line-height: 1.08; letter-spacing: -.02em; }
:lang(zh-CN) .hero-lede { text-align: justify; }

@media (max-width: 800px) {
  /* minmax(0, …) keeps long words from widening the column past the viewport. */
  .hero { grid-template-columns: minmax(0, 1fr); min-height: auto; gap: 62px; width: 90vw; padding: 90px 0; }
  h1 { font-size: clamp(62px, 17vw, 100px); }
  :lang(zh-CN) h1 { font-size: clamp(46px, 13vw, 80px); }
  .hero-art { width: min(460px, 96vw); justify-self: center; }
  .hero-index { bottom: 18px; }
}
</style>
