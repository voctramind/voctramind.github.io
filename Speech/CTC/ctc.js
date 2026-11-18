/* =========================================================
   VOCTRAMIND — CONNECTIONIST TEMPORAL CLASSIFICATION
   Interactive CTC paths, trellis visualisation, and navigation
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const BLANK = "∅";
  const TARGET = ["S", "P", "E", "E", "C", "H"];
  const NUM_FRAMES = 8;

  const COLORS = {
    purple: "#8B5CF6",
    magenta: "#D946EF",
    indigo: "#6366F1",
    cyan: "#06B6D4",
    grey: "#CFCFD4",
    darkGrey: "#777777",
    lightGrey: "#E8E5EF",
    background: "#FCFBFE",
    white: "#FFFFFF"
  };

  // Match the existing legend colours.
  const PATH_COLORS = [
    COLORS.magenta, // Path 1
    COLORS.indigo,  // Path 2
    COLORS.cyan     // Path 3
  ];

  /*
   * Extended target for SPEECH:
   *
   * State:    0  1  2  3  4  5  6  7  8  9 10 11 12
   * Symbol:   ∅  S  ∅  P  ∅  E  ∅  E  ∅  C  ∅  H  ∅
   */

  const STATES = [BLANK];

  TARGET.forEach(symbol => {
    STATES.push(symbol, BLANK);
  });

  // ---------------------------------------------------------
  // 1. CTC COLLAPSE FUNCTION
  // ---------------------------------------------------------

  function collapseCTC(path) {
    const merged = [];

    path.forEach((symbol, index) => {
      if (index === 0 || symbol !== path[index - 1]) {
        merged.push(symbol);
      }
    });

    return merged
      .filter(symbol => symbol !== BLANK)
      .join("");
  }

  // ---------------------------------------------------------
  // 2. LEGAL CTC STATE TRANSITIONS
  // ---------------------------------------------------------

  function getNextStates(stateIndex) {
    const next = [stateIndex];

    if (stateIndex + 1 < STATES.length) {
      next.push(stateIndex + 1);
    }

    if (stateIndex + 2 < STATES.length) {
      const destination = stateIndex + 2;

      if (
        STATES[destination] !== BLANK &&
        STATES[destination] !== STATES[stateIndex]
      ) {
        next.push(destination);
      }
    }

    return next;
  }

  // ---------------------------------------------------------
  // 3. ENUMERATE ALL COMPLETE VALID CTC PATHS
  // ---------------------------------------------------------

  const allPaths = [];

  function enumeratePaths(time, stateIndex, path) {
    if (time === NUM_FRAMES - 1) {
      const finalLabelState = STATES.length - 2;
      const trailingBlankState = STATES.length - 1;

      if (
        stateIndex === finalLabelState ||
        stateIndex === trailingBlankState
      ) {
        allPaths.push([...path]);
      }

      return;
    }

    getNextStates(stateIndex).forEach(nextState => {
      enumeratePaths(
        time + 1,
        nextState,
        [...path, nextState]
      );
    });
  }

  enumeratePaths(0, 0, [0]);
  enumeratePaths(0, 1, [1]);

  const validPaths = allPaths.filter(path => {
    const symbols = path.map(state => STATES[state]);
    return collapseCTC(symbols) === TARGET.join("");
  });

  console.info(
    `CTC: ${validPaths.length} valid paths for SPEECH over ${NUM_FRAMES} frames.`
  );

  // ---------------------------------------------------------
  // 4. COLLECT TRANSITIONS USED BY VALID PATHS
  // ---------------------------------------------------------

  const validEdges = new Set();
  const validNodes = new Set();

  validPaths.forEach(path => {
    path.forEach((stateIndex, time) => {
      validNodes.add(`${time},${stateIndex}`);

      if (time < path.length - 1) {
        validEdges.add(
          `${time},${stateIndex},${path[time + 1]}`
        );
      }
    });
  });

  // ---------------------------------------------------------
  // 5. INTERACTIVE CANVAS TRELLIS
  // ---------------------------------------------------------

  const canvas = document.getElementById("ctcTrellisCanvas");
  const caption = document.getElementById("ctcTrellisCaption");

  const pathButtons = [
    ...document.querySelectorAll(".trellis-path-btn")
  ];

  let selectedPath = "0";

  function drawCanvasTrellis() {
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();

    if (rect.width === 0) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height || 410;

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    context.setTransform(
      pixelRatio, 0, 0, pixelRatio, 0, 0
    );

    context.clearRect(0, 0, width, height);
    context.fillStyle = COLORS.background;
    context.fillRect(0, 0, width, height);

    const left = 52;
    const right = 24;
    const top = 38;
    const bottom = 25;

    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;

    const x = time =>
      left + time * plotWidth / (NUM_FRAMES - 1);

    const y = state =>
      top + state * plotHeight / (STATES.length - 1);

    const selectedIndex =
      selectedPath === "all" ? -1 : Number(selectedPath);

    const chosenPath =
      selectedIndex >= 0
        ? validPaths[selectedIndex]
        : null;

    // The colour is determined by the selected path.
    const selectedColor =
      selectedIndex >= 0
        ? PATH_COLORS[selectedIndex] || COLORS.indigo
        : COLORS.purple;

    // -------------------------------------------------------
    // Time labels
    // -------------------------------------------------------

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "11px Inter, Arial, sans-serif";
    context.fillStyle = COLORS.darkGrey;

    for (let time = 0; time < NUM_FRAMES; time++) {
      context.fillText(`t=${time + 1}`, x(time), 16);
    }

    // -------------------------------------------------------
    // Horizontal state guides and labels
    // -------------------------------------------------------

    STATES.forEach((symbol, stateIndex) => {
      context.beginPath();
      context.moveTo(left - 8, y(stateIndex));
      context.lineTo(width - right + 4, y(stateIndex));

      context.strokeStyle = "rgba(32,33,36,0.10)";
      context.lineWidth = 1;
      context.stroke();

      context.textAlign = "right";
      context.textBaseline = "middle";
      context.font = "11px Inter, Arial, sans-serif";

      context.fillStyle =
        symbol === BLANK ? "#A2A0AA" : "#55516A";

      context.fillText(symbol, left - 15, y(stateIndex));
    });

    // -------------------------------------------------------
    // Draw legal transitions
    // -------------------------------------------------------

    for (let time = 0; time < NUM_FRAMES - 1; time++) {
      for (
        let stateIndex = 0;
        stateIndex < STATES.length;
        stateIndex++
      ) {
        getNextStates(stateIndex).forEach(nextState => {
          const edgeKey =
            `${time},${stateIndex},${nextState}`;

          const isValidEdge = validEdges.has(edgeKey);

          let stroke = COLORS.grey;
          let lineWidth = 1;
          let opacity = 0.25;

          if (selectedPath === "all") {
            if (isValidEdge) {
              stroke = COLORS.purple;
              lineWidth = 1.8;
              opacity = 0.75;
            }
          } else if (chosenPath) {
            const isSelectedEdge =
              chosenPath[time] === stateIndex &&
              chosenPath[time + 1] === nextState;

            if (isSelectedEdge) {
              // FIX: selected path uses its legend colour.
              stroke = selectedColor;
              lineWidth = 3;
              opacity = 1;
            } else if (isValidEdge) {
              stroke = COLORS.grey;
              lineWidth = 1;
              opacity = 0.30;
            }
          }

          context.beginPath();
          context.moveTo(x(time) + 4, y(stateIndex));
          context.lineTo(x(time + 1) - 4, y(nextState));

          context.strokeStyle = stroke;
          context.lineWidth = lineWidth;
          context.globalAlpha = opacity;
          context.lineCap = "round";
          context.stroke();
          context.globalAlpha = 1;
        });
      }
    }

    // -------------------------------------------------------
    // Draw state nodes
    // -------------------------------------------------------

    for (let time = 0; time < NUM_FRAMES; time++) {
      for (
        let stateIndex = 0;
        stateIndex < STATES.length;
        stateIndex++
      ) {
        const nodeKey = `${time},${stateIndex}`;
        const isValidNode = validNodes.has(nodeKey);

        const isSelectedNode =
          chosenPath !== null &&
          chosenPath[time] === stateIndex;

        let radius = isValidNode ? 3.5 : 2.3;
        let fill = COLORS.white;
        let stroke = "#B8B5C2";
        let opacity = isValidNode ? 0.85 : 0.45;

        if (selectedPath === "all" && isValidNode) {
          fill = COLORS.purple;
          stroke = COLORS.purple;
          radius = 3.6;
          opacity = 1;
        } else if (isSelectedNode) {
          // FIX: selected nodes use the same colour as the path.
          fill = selectedColor;
          stroke = selectedColor;
          radius = 5;
          opacity = 1;
        } else if (isValidNode) {
          fill = COLORS.white;
          stroke = "#A9A5B5";
        }

        context.beginPath();
        context.arc(
          x(time),
          y(stateIndex),
          radius,
          0,
          2 * Math.PI
        );

        context.fillStyle = fill;
        context.strokeStyle = stroke;
        context.lineWidth = 1.2;
        context.globalAlpha = opacity;

        context.fill();
        context.stroke();
        context.globalAlpha = 1;
      }
    }

    // -------------------------------------------------------
    // Draw the selected path's state sequence below the plot
    // -------------------------------------------------------

    if (chosenPath) {
      const symbols = chosenPath.map(state => STATES[state]);

      context.textAlign = "left";
      context.textBaseline = "alphabetic";
      context.font = "11px Inter, Arial, sans-serif";
      context.fillStyle = selectedColor;

      context.fillText(
        `Selected path: ${symbols.join("  ")}`,
        left,
        height - 5
      );
    } else {
      context.textAlign = "left";
      context.textBaseline = "alphabetic";
      context.font = "11px Inter, Arial, sans-serif";
      context.fillStyle = COLORS.purple;

      context.fillText(
        "All transitions belonging to valid paths",
        left,
        height - 5
      );
    }
  }

  // ---------------------------------------------------------
  // 6. UPDATE BUTTONS AND CAPTION
  // ---------------------------------------------------------

  function setSelectedPath(pathId) {
    selectedPath = pathId;

    pathButtons.forEach(button => {
      const active = button.dataset.path === pathId;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (caption) {
      if (pathId === "all") {
        caption.innerHTML =
          `<strong>All valid paths:</strong> ` +
          `${validPaths.length} complete alignments collapse to ` +
          `<strong>SPEECH</strong>. Purple transitions belong to ` +
          `at least one complete valid path.`;
      } else {
        const index = Number(pathId);
        const path = validPaths[index];

        if (!path) {
          caption.innerHTML =
            "<strong>No path available.</strong>";
        } else {
          const symbols = path.map(state => STATES[state]);
          const collapsed = collapseCTC(symbols);
          const pathColor = PATH_COLORS[index] || COLORS.indigo;

          caption.innerHTML =
            `<strong style="color:${pathColor}">Path ${index + 1}:</strong> ` +
            `${symbols.join(" → ")}. ` +
            `After merging consecutive repeats and removing blanks, ` +
            `the transcript is <strong>${collapsed}</strong>.`;
        }
      }
    }

    drawCanvasTrellis();
  }

  pathButtons.forEach(button => {
    button.addEventListener("click", () => {
      setSelectedPath(button.dataset.path);
    });
  });

  // ---------------------------------------------------------
  // 7. EXPANDED TARGET STATE STRIP
  // ---------------------------------------------------------

  const stateStrip = document.getElementById("stateStrip");

  if (stateStrip) {
    stateStrip.replaceChildren();

    STATES.forEach((symbol, index) => {
      const chip = document.createElement("div");
      chip.className = "ctc-state-chip";

      if (symbol === BLANK) {
        chip.classList.add("blank-state");
      }

      const label = document.createElement("span");
      label.className = "ctc-state-symbol";
      label.textContent = symbol;

      const stateIndex = document.createElement("span");
      stateIndex.className = "ctc-state-index";
      stateIndex.textContent = `s${index}`;

      chip.append(label, stateIndex);
      stateStrip.appendChild(chip);
    });
  }

  // ---------------------------------------------------------
  // 8. SECOND TRELLIS: EXPANDED TARGET SVG
  // ---------------------------------------------------------

  const trellisSvg = document.getElementById("trellisSvg");

  if (trellisSvg) {
    const NS = "http://www.w3.org/2000/svg";

    const makeSvg = (tag, attributes = {}) => {
      const element = document.createElementNS(NS, tag);

      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, String(value));
      });

      return element;
    };

    const width = 900;
    const height = 390;
    const left = 65;
    const right = 22;
    const top = 42;
    const bottom = 24;

    const x = time =>
      left + time * (width - left - right) / (NUM_FRAMES - 1);

    const y = state =>
      top + state * (height - top - bottom) / (STATES.length - 1);

    trellisSvg.replaceChildren();

    trellisSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    trellisSvg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    trellisSvg.setAttribute(
      "aria-label",
      `CTC trellis for SPEECH over ${NUM_FRAMES} frames. ` +
      `All transitions that participate in a valid path are highlighted.`
    );

    // Horizontal state guides and labels.
    STATES.forEach((symbol, stateIndex) => {
      trellisSvg.appendChild(
        makeSvg("line", {
          x1: left - 8,
          y1: y(stateIndex),
          x2: width - right,
          y2: y(stateIndex),
          stroke: "rgba(32,33,36,0.12)",
          "stroke-width": 1
        })
      );

      const label = makeSvg("text", {
        x: left - 17,
        y: y(stateIndex) + 4,
        "text-anchor": "end",
        fill: symbol === BLANK ? "#999999" : "#555555",
        "font-size": 12,
        "font-family": "Inter, Arial, sans-serif"
      });

      label.textContent = symbol;
      trellisSvg.appendChild(label);
    });

    // Time labels.
    for (let time = 0; time < NUM_FRAMES; time++) {
      const label = makeSvg("text", {
        x: x(time),
        y: 20,
        "text-anchor": "middle",
        fill: "#777777",
        "font-size": 11,
        "font-family": "Inter, Arial, sans-serif"
      });

      label.textContent = `t=${time + 1}`;
      trellisSvg.appendChild(label);
    }

    // Draw legal transitions.
    for (let time = 0; time < NUM_FRAMES - 1; time++) {
      for (
        let stateIndex = 0;
        stateIndex < STATES.length;
        stateIndex++
      ) {
        getNextStates(stateIndex).forEach(nextState => {
          const key = `${time},${stateIndex},${nextState}`;
          const isValidEdge = validEdges.has(key);

          const line = makeSvg("line", {
            x1: x(time) + 4,
            y1: y(stateIndex),
            x2: x(time + 1) - 4,
            y2: y(nextState),
            stroke: isValidEdge ? COLORS.purple : COLORS.grey,
            "stroke-width": isValidEdge ? 1.8 : 1,
            opacity: isValidEdge ? 0.8 : 0.3,
            "stroke-linecap": "round"
          });

          const title = makeSvg("title");

          title.textContent = isValidEdge
            ? `Transition from frame ${time + 1}, state ${stateIndex} ` +
              `to frame ${time + 2}, state ${nextState}: used by a valid path`
            : `Transition from frame ${time + 1}, state ${stateIndex} ` +
              `to frame ${time + 2}, state ${nextState}`;

          line.appendChild(title);
          trellisSvg.appendChild(line);
        });
      }
    }

    // Draw state nodes.
    for (let time = 0; time < NUM_FRAMES; time++) {
      for (
        let stateIndex = 0;
        stateIndex < STATES.length;
        stateIndex++
      ) {
        const isValidNode = validNodes.has(`${time},${stateIndex}`);

        const circle = makeSvg("circle", {
          cx: x(time),
          cy: y(stateIndex),
          r: isValidNode ? 3.8 : 2.5,
          fill: isValidNode ? COLORS.purple : COLORS.white,
          stroke: isValidNode ? COLORS.purple : "#A7A7AD",
          "stroke-width": 1,
          opacity: isValidNode ? 1 : 0.5
        });

        const title = makeSvg("title");

        title.textContent =
          `Frame ${time + 1}, state ${stateIndex}: ${STATES[stateIndex]}` +
          (isValidNode ? " — used by a valid path" : "");

        circle.appendChild(title);
        trellisSvg.appendChild(circle);
      }
    }

    const figureCaption = trellisSvg
      .closest("figure")
      ?.querySelector("figcaption");

    if (figureCaption) {
      figureCaption.textContent =
        `For SPEECH over ${NUM_FRAMES} frames, ${validPaths.length} ` +
        `complete valid alignments are possible. Purple transitions ` +
        `belong to at least one valid path. The diagram shows the ` +
        `trellis structure, not model probabilities or a learned alignment.`;
    }
  }

  // ---------------------------------------------------------
  // 9. NAVIGATION PROGRESS
  // ---------------------------------------------------------

  const navItems = [
    ...document.querySelectorAll(".map-item[data-target]")
  ];

  const sections = navItems
    .map(item => document.getElementById(item.dataset.target))
    .filter(Boolean);

  function updateProgress(currentId) {
    const currentIndex = navItems.findIndex(
      item => item.dataset.target === currentId
    );

    navItems.forEach((item, index) => {
      item.classList.toggle("is-complete", index < currentIndex);
      item.classList.toggle("is-current", index === currentIndex);
      item.classList.toggle("is-upcoming", index > currentIndex);
      item.classList.toggle("active", index === currentIndex);

      if (index === currentIndex) {
        item.setAttribute("aria-current", "location");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    const timeline = document.getElementById("sectionNav");

    if (timeline && currentIndex >= 0) {
      const currentItem = navItems[currentIndex];

      const progressHeight =
        currentItem.offsetTop + currentItem.offsetHeight / 2;

      timeline.style.setProperty(
        "--progress-height",
        `${Math.max(0, progressHeight)}px`
      );
    }
  }

  navItems.forEach(item => {
    item.addEventListener("click", event => {
      const target = document.getElementById(item.dataset.target);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.replaceState(null, "", `#${target.id}`);
      updateProgress(target.id);
    });
  });

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length) {
          updateProgress(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0, 0.1, 0.25, 0.5]
      }
    );

    sections.forEach(section => observer.observe(section));
  }

  // ---------------------------------------------------------
  // 10. INITIALISE
  // ---------------------------------------------------------

  if (validPaths.length > 0) {
    setSelectedPath("0");
  } else {
    drawCanvasTrellis();
  }

  if ("ResizeObserver" in window && canvas) {
    const resizeObserver = new ResizeObserver(() => {
      drawCanvasTrellis();
    });

    resizeObserver.observe(canvas);
  } else {
    window.addEventListener("resize", drawCanvasTrellis);
  }

  const initialTarget = window.location.hash.slice(1);

  updateProgress(
    sections.some(section => section.id === initialTarget)
      ? initialTarget
      : (sections[0]?.id || "")
  );

});
