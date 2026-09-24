<script setup>
import { useContent } from "../content";
import RichText from "./RichText.js";

defineProps({ section: { type: Object, required: true } });
const { l } = useContent();
</script>

<template>
  <div class="section-head">
    <div>
      <p v-if="section.kicker" class="section-kicker mono-label">{{ l(section.kicker) }}</p>
      <RichText v-if="section.title" tag="h2" class="display-title" :text="l(section.title)" />
    </div>
    <p v-if="section.aside" class="section-aside">{{ l(section.aside) }}</p>
  </div>
</template>
