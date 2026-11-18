/* =========================================================
   VOCTRAMIND — ASR
   Position Embeddings-style progression behavior.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const items = Array.from(
    document.querySelectorAll(".map-item")
  );

  const sections = items
    .map(item => {
      const id = item.getAttribute("href");
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (!items.length || !sections.length) return;

  function updateProgression() {

    const trigger =
      window.scrollY + window.innerHeight * 0.30;

    let current = 0;

    sections.forEach((section, index) => {
      if (section.offsetTop <= trigger) {
        current = index;
      }
    });

    items.forEach((item, index) => {
      item.classList.remove("active", "done");

      if (index < current) {
        item.classList.add("done");
      }

      if (index === current) {
        item.classList.add("active");
      }
    });
  }

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {

      if (ticking) return;

      window.requestAnimationFrame(() => {
        updateProgression();
        ticking = false;
      });

      ticking = true;
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateProgression
  );

  updateProgression();
});
