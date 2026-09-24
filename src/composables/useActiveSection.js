import { onBeforeUnmount, onMounted, ref } from "vue";

// Tracks which section currently crosses a thin band in the middle of the viewport.
export function useActiveSection(ids) {
  const active = ref("");
  let observer;

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = entry.target.id;
        else if (active.value === entry.target.id) active.value = "";
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  });
  onBeforeUnmount(() => observer?.disconnect());

  return active;
}
