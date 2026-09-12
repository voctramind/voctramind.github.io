document.addEventListener("DOMContentLoaded", () => {

  const waveLayer = document.querySelector(".wave-layer");
  const wave = document.getElementById("wave");
  const networks = document.querySelectorAll(".network");

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && waveLayer && wave) {

    const start = performance.now();

    function animateWave(now) {

      const t = (now - start) / 1000;

      /*
       * Slow "breathing" motion.
       * The waveform never leaves the page and
       * there is no loop/reset seam.
       */

      const main = Math.sin(t * 0.88);
      const secondary = Math.sin(t * 0.46 + 1.2);

      const scaleX = 1 + main * 0.025;
      const scaleY = 1 + secondary * 0.018;

      const drift = main * 5;

      /*
       * Very subtle opacity breathing.
       */
      const opacity = 0.34 + ((main + 1) * 0.5) * 0.12;

      /*
       * Glow breathes with the waveform.
       */
      const glow1 = 8 + ((main + 1) * 0.5) * 8;
      const glow2 = 15 + ((secondary + 1) * 0.5) * 10;

      waveLayer.style.transform =
        `translate3d(${drift}px,0,0)
         scaleX(${scaleX})
         scaleY(${scaleY})`;

      waveLayer.style.opacity = opacity;

      wave.style.filter =
        `drop-shadow(0 0 ${glow1}px rgba(208,70,255,.18))
         drop-shadow(0 0 ${glow2}px rgba(35,170,255,.12))`;

      requestAnimationFrame(animateWave);
    }

    requestAnimationFrame(animateWave);
  }

  /*
   * Tiny independent pulse for the
   * neural/attention motifs.
   */
  if (!reduceMotion && networks.length) {

    const start = performance.now();

    function animateNetworks(now) {

      const t = (now - start) / 1000;

      networks.forEach((node, i) => {

        const p =
          (Math.sin(t * 1.05 + i * 1.8) + 1) / 2;

        node.style.opacity = 0.52 + p * 0.20;

        node.style.transform =
          `translateY(${Math.sin(t * .65 + i) * 2}px)
           scale(${.985 + p * .02})`;
      });

      requestAnimationFrame(animateNetworks);
    }

    requestAnimationFrame(animateNetworks);
  }

});
