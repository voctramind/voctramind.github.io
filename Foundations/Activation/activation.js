document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ACTIVATION FUNCTIONS — SECTION PROGRESSION
     ========================================================= */

  const items = [
    ...document.querySelectorAll(".map-item")
  ];

  const sections = [
    ...document.querySelectorAll(
      "main.article-page .article-section"
    )
  ];

  const timeline =
    document.querySelector(".timeline");


  /* =========================================================
     SAFETY CHECK
     ========================================================= */

  if (
    !items.length ||
    !sections.length ||
    !timeline
  ) {
    return;
  }


  /* =========================================================
     SET CURRENT / COMPLETED STATES
     ========================================================= */

  function setState(currentIndex) {

    items.forEach((item, index) => {

      item.classList.remove(
        "active",
        "done"
      );


      if (index < currentIndex) {

        item.classList.add("done");

      } else if (index === currentIndex) {

        item.classList.add("active");

      }

    });


    /* ---------------------------------------------------------
       COLOURED PROGRESS LINE
       --------------------------------------------------------- */

    const firstDot =
      items[0]?.querySelector(".map-dot");

    const currentDot =
      items[currentIndex]?.querySelector(".map-dot");


    if (
      firstDot &&
      currentDot
    ) {

      const progress =
        currentDot.offsetTop -
        firstDot.offsetTop;


      timeline.style.setProperty(
        "--progress-height",
        `${Math.max(0, progress)}px`
      );

    }

  }


  /* =========================================================
     DETERMINE CURRENT SECTION FROM SCROLL
     ========================================================= */

  function updateFromScroll() {

    /*
       The probe sits slightly below the top of the viewport.

       When a section passes this point,
       that section becomes the current section.
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
       Prevent an index mismatch if the number
       of map items and article sections differ.
    */

    currentIndex =
      Math.min(
        currentIndex,
        items.length - 1
      );


    setState(currentIndex);

  }


  /* =========================================================
     REQUESTANIMATIONFRAME SCROLL HANDLING
     ========================================================= */

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


  /* =========================================================
     SCROLL EVENT
     ========================================================= */

  window.addEventListener(
    "scroll",
    requestUpdate,
    {
      passive: true
    }
  );


  /* =========================================================
     RESIZE EVENT
     ========================================================= */

  window.addEventListener(
    "resize",
    requestUpdate
  );


  /* =========================================================
     CLICKING A PROGRESSION ITEM
     ========================================================= */

  items.forEach(
    (item, index) => {

      item.addEventListener(
        "click",
        (event) => {

          const target =
            sections[index];


          if (!target) {
            return;
          }


          /*
             Prevent the browser's instant anchor jump.
             We handle scrolling ourselves.
          */

          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


  /* =========================================================
     INITIAL STATE
     ========================================================= */

  updateFromScroll();

});
