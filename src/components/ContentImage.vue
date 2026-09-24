<script setup>
defineProps({
  image: { type: Object, required: true },
  alt: { type: String, default: "" },
});
</script>

<template>
  <picture>
    <source v-if="image.dark" :srcset="image.dark" media="(prefers-color-scheme: dark)" />
    <img :src="image.src" :alt="alt" :width="image.width" :height="image.height" loading="lazy" decoding="async" />
  </picture>
</template>
