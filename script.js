const root = document.documentElement;
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--mx", `${event.clientX}px`);
  root.style.setProperty("--my", `${event.clientY}px`);
}, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

const engineeringGrid = document.querySelector(".engineering-grid");
const engineeringItems = engineeringGrid ? [...engineeringGrid.querySelectorAll(".engineering-item")] : [];

function layoutEngineeringMasonry() {
  if (!engineeringGrid || engineeringItems.length < 2) return;

  const columns = window.matchMedia("(max-width: 800px)").matches ? 1 : 2;
  const gap = 42;
  const columnWidth = (engineeringGrid.clientWidth - gap * (columns - 1)) / columns;
  const heights = Array(columns).fill(0);

  engineeringGrid.classList.add("is-masonry");
  engineeringItems.forEach((item) => {
    item.style.width = `${columnWidth}px`;
  });

  requestAnimationFrame(() => {
    engineeringItems.forEach((item) => {
      const column = heights.indexOf(Math.min(...heights));
      item.style.left = `${column * (columnWidth + gap)}px`;
      item.style.top = `${heights[column]}px`;
      heights[column] += item.offsetHeight + gap;
    });
    engineeringGrid.style.height = `${Math.max(...heights) - gap}px`;
  });
}

engineeringItems.forEach((item) => {
  item.querySelectorAll("img").forEach((image) => image.addEventListener("load", layoutEngineeringMasonry));
});
window.addEventListener("load", layoutEngineeringMasonry);
window.addEventListener("resize", layoutEngineeringMasonry);
layoutEngineeringMasonry();
