import { onBeforeUnmount, onMounted, ref } from "vue";

const STORAGE_KEY = "theme";
// Must match the backgrounds in styles.css so the browser chrome matches the page.
const THEME_COLORS = { light: "#eff1f5", dark: "#1e1e2e" };

function readStored() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function writeStored(value) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // The choice just won't persist.
  }
}

// The initial theme is resolved by the inline script in index.html; this keeps it in sync afterwards.
export function useTheme() {
  // null until mounted, so the prerendered markup never depends on the reader's theme.
  const theme = ref(null);
  let systemDark;

  function apply(value) {
    document.documentElement.dataset.theme = value;
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute("content", THEME_COLORS[value]));
    theme.value = value;
  }

  // Follow the system again whenever the reader lands back on its preference, so there is no separate "auto" state.
  function toggle() {
    const next = theme.value === "dark" ? "light" : "dark";
    const system = systemDark.matches ? "dark" : "light";
    writeStored(next === system ? null : next);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reducedMotion) document.startViewTransition(() => apply(next));
    else apply(next);
  }

  function onSystemChange(event) {
    if (!readStored()) apply(event.matches ? "dark" : "light");
  }

  onMounted(() => {
    systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    apply(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    systemDark.addEventListener("change", onSystemChange);
  });
  onBeforeUnmount(() => systemDark?.removeEventListener("change", onSystemChange));

  return { theme, toggle };
}
