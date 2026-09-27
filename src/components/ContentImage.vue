<script setup>
// Always a wrapper, so container classes like .project-media style the <img> inside.
// With a dark variant both images are rendered; styles.css displays (and so loads) only the one matching the theme.
defineProps({
  image: { type: Object, required: true },
  alt: { type: String, default: "" },
});
</script>

<template>
  <span class="content-image">
    <template v-if="image.dark">
      <img class="theme-light-img" :src="image.src" :alt="alt" :width="image.width" :height="image.height" loading="lazy" decoding="async" />
      <img class="theme-dark-img" :src="image.dark" :alt="alt" :width="image.width" :height="image.height" loading="lazy" decoding="async" />
    </template>
    <img v-else :src="image.src" :alt="alt" :width="image.width" :height="image.height" loading="lazy" decoding="async" />
  </span>
</template>
