<script setup>
import { useI18n } from "vue-i18n";
import { useTheme } from "../composables/useTheme";

const { t } = useI18n();
const { theme, toggle } = useTheme();
// Both icons are rendered and CSS shows the right one, so the prerendered HTML doesn't depend on the theme.
</script>

<template>
  <button
    type="button"
    class="toolbar-chip theme-toggle"
    :aria-label="t('a11y.darkTheme')"
    :aria-pressed="theme === null ? undefined : theme === 'dark'"
    @click="toggle"
  >
    <span class="icons">
      <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </svg>
      <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
/* Size, colour, and hover come from the toolbar chip; the icons stack in their own grid cell. */
.theme-toggle { width: 26px; padding: 0; }
.icons { display: grid; place-items: center; }
svg { grid-area: 1 / 1; width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; transition: opacity .3s ease, transform .4s ease; }
/* Show the moon in light mode (switch to dark) and the sun in dark mode. */
.icon-sun { opacity: 0; transform: rotate(-60deg) scale(.6); }
:root[data-theme="dark"] .icon-sun { opacity: 1; transform: none; }
:root[data-theme="dark"] .icon-moon { opacity: 0; transform: rotate(60deg) scale(.6); }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .icon-sun { opacity: 1; transform: none; }
  :root:not([data-theme]) .icon-moon { opacity: 0; }
}
</style>
