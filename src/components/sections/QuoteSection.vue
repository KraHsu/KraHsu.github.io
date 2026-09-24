<script setup>
import { useContent } from "../../content";

defineProps({ section: { type: Object, required: true } });
const { l } = useContent();
</script>

<template>
  <section :id="section.id" v-reveal class="quote-section reveal">
    <div class="section section-grid quote-inner">
      <div class="section-index mono-label">{{ section.number }} <span>{{ l(section.label) }}</span></div>
      <div class="quote-body">
        <p v-if="section.kicker" class="section-kicker mono-label">{{ l(section.kicker) }}</p>
        <blockquote class="display-title">{{ l(section.quote) }}</blockquote>
        <div class="quote-rule"></div>
        <p v-if="section.caption" class="quote-caption">{{ l(section.caption) }}</p>
        <a v-if="section.link" class="quote-link" :href="section.link.href" target="_blank" rel="noreferrer">{{ l(section.link.text) }} <span>↗</span></a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quote-section { background: var(--note-bg); }
.quote-inner { padding: 150px 0 165px; }
.quote-inner .section-index span { color: var(--accent); }
.quote-body { max-width: 780px; }
.quote-body .section-kicker { color: var(--muted); }
blockquote { max-width: 850px; margin: 0 0 50px; font-family: var(--serif); font-style: italic; letter-spacing: -.04em; }
:lang(zh-CN) blockquote { font-style: normal; letter-spacing: -.02em; }
.quote-rule { width: 100%; height: 1px; background: var(--line-strong); }
.quote-caption { max-width: 500px; margin: 30px 0; color: var(--muted); font-size: 16px; line-height: 1.7; }
.quote-link { display: inline-flex; gap: 14px; margin-top: 30px; color: var(--ink); font: 500 13px var(--mono); text-transform: uppercase; transition: color .2s ease; }
.quote-caption + .quote-link { margin-top: 0; }
.quote-link:hover { color: var(--accent); }

@media (max-width: 800px) {
  .quote-inner { padding: 95px 0 110px; }
  blockquote { margin-bottom: 45px; }
}
</style>
