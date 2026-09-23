let observer;

function getObserver() {
  observer ??= new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  return observer;
}

// Pair with the `.reveal` class so elements start hidden before mounting.
export const vReveal = {
  mounted(el) {
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
