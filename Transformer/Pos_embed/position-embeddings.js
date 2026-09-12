document.addEventListener("DOMContentLoaded", () => {
  const items = [...document.querySelectorAll(".map-item[data-target]")];

  const sections = items
    .map(item => document.getElementById(item.dataset.target))
    .filter(Boolean);

  const timeline = document.querySelector(".timeline");

  if (!items.length || !sections.length) return;

  function setProgress(currentIndex) {
    items.forEach((item, index) => {
      item.classList.remove(
        "is-complete",
        "is-current",
        "is-upcoming"
      );

      if (index < currentIndex) {
        item.classList.add("is-complete");
      } else if (index === currentIndex) {
        item.classList.add("is-current");
      } else {
        item.classList.add("is-upcoming");
      }
    });

    /*
     * Extend the coloured progress line exactly to
     * the centre of the current tracker dot.
     */
    if (timeline && items[currentIndex]) {
      const dot = items[currentIndex].querySelector(".map-dot");

      if (dot) {
        const progress =
          dot.offsetTop + dot.offsetHeight / 2;

        timeline.style.setProperty(
          "--progress",
          `${progress}px`
        );
      }
    }
  }

  function updateFromScroll() {
    const probe =
      window.scrollY + window.innerHeight * 0.28;

    let currentIndex = 0;

    sections.forEach((section, index) => {
      if (section.offsetTop <= probe) {
        currentIndex = index;
      }
    });

    setProgress(currentIndex);
  }

  /*
   * Keep scrolling smooth and avoid running the layout
   * calculation excessively often.
   */
  let ticking = false;

  function requestUpdate() {
    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {
      updateFromScroll();
      ticking = false;
    });
  }

  window.addEventListener(
    "scroll",
    requestUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestUpdate,
    { passive: true }
  );

  /*
   * Clicking a tracker item immediately marks it as current.
   * The normal anchor navigation then scrolls to the section.
   */
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      setProgress(index);
    });
  });

  /*
   * Initial state.
   */
  updateFromScroll();
});
