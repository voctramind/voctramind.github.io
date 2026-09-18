document.addEventListener("DOMContentLoaded", () => {

  const mapItems = [
    ...document.querySelectorAll(
      ".map-item[data-target-index]"
    )
  ];

  const timeline =
    document.querySelector(".timeline");


  /*
   * Get ALL article sections, including sections
   * nested inside the later attention-compression
   * container.
   *
   * Figures are automatically excluded because
   * they do not have the .article-section class.
   */
  const sections = [
    ...document.querySelectorAll(
      "main.article-page .article-section"
    )
  ];


  /*
   * Stop if the required elements are not present.
   */
  if (
    !mapItems.length ||
    !timeline ||
    !sections.length
  ) {
    return;
  }


  /* =======================================================
     UPDATE MAP STATE
     ======================================================= */

  function setProgress(currentIndex) {

    mapItems.forEach((item, index) => {

      item.classList.remove(
        "is-complete",
        "is-current",
        "is-upcoming"
      );


      if (index < currentIndex) {

        item.classList.add(
          "is-complete"
        );

      } else if (index === currentIndex) {

        item.classList.add(
          "is-current"
        );

      } else {

        item.classList.add(
          "is-upcoming"
        );

      }

    });


    /*
     * Move the coloured progress line
     * to the current dot.
     */
    const currentDot =
      mapItems[currentIndex]
        ?.querySelector(".map-dot");

    const firstDot =
      mapItems[0]
        ?.querySelector(".map-dot");


    if (
      currentDot &&
      firstDot
    ) {

      const progress =
        Math.max(
          0,
          currentDot.offsetTop -
          firstDot.offsetTop
        );


      timeline.style.setProperty(
        "--progress-height",
        `${progress}px`
      );

    }

  }


  /* =======================================================
     DETERMINE CURRENT ARTICLE SECTION
     ======================================================= */

  function updateFromScroll() {

    /*
     * Probe slightly below the top of the viewport.
     * When the probe enters a new section,
     * that section becomes current.
     */
    const probe =
      window.scrollY +
      window.innerHeight * 0.28;


    let currentIndex = 0;


    sections.forEach(
      (section, index) => {

        const sectionTop =
          section.getBoundingClientRect().top +
          window.scrollY;


        if (
          sectionTop <= probe
        ) {

          currentIndex = index;

        }

      }
    );


    /*
     * Protect against a mismatch between
     * the number of article sections and map items.
     */
    currentIndex =
      Math.min(
        currentIndex,
        mapItems.length - 1
      );


    setProgress(currentIndex);

  }


  /* =======================================================
     SCROLL PERFORMANCE
     ======================================================= */

  let ticking = false;


  function requestUpdate() {

    if (ticking) {
      return;
    }


    ticking = true;


    requestAnimationFrame(() => {

      updateFromScroll();

      ticking = false;

    });

  }


  /* =======================================================
     EVENT LISTENERS
     ======================================================= */

  window.addEventListener(
    "scroll",
    requestUpdate,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    requestUpdate
  );


  /* =======================================================
     CLICKING THE PROGRESS MAP
     ======================================================= */

  mapItems.forEach(
    (item, index) => {

      item.addEventListener(
        "click",
        () => {

          const target =
            sections[index];


          if (!target) {
            return;
          }


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  updateFromScroll();

});
