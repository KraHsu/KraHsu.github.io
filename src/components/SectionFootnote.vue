<script setup>
import { useContent } from "../content";

defineProps({ footnote: { type: Object, required: true } });
const { l } = useContent();
</script>

<template>
  <a class="footnote" :href="footnote.href" target="_blank" rel="noreferrer">
    <span class="mono-label">{{ l(footnote.label) }}</span>
    <span>{{ l(footnote.text) }} <span class="footnote-arrow">→</span></span>
  </a>
</template>

<style scoped>
.footnote { display: flex; justify-content: space-between; gap: 20px; align-items: baseline; margin-top: 28px; padding: 19px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); color: var(--muted); font: 400 14px var(--mono); transition: color .2s ease, border-color .2s ease; }
.footnote .mono-label { flex: none; color: var(--faint); font-size: 11px; }
.footnote-arrow { display: inline-block; color: var(--accent); transition: transform .25s ease; }
.footnote:hover { color: var(--accent); border-bottom-color: var(--accent); }
.footnote:hover .footnote-arrow { transform: translateX(6px); }

@media (max-width: 800px) {
  .footnote { flex-direction: column; gap: 8px; }
}
</style>
