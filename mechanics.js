/* =========================================================
   MODEL MECHANICS — KNOWLEDGE MAP
   ========================================================= */

const nodes = [

  /* =========================================================
     TRANSFORMER CLUSTER
     ========================================================= */

  {
    id: "transformer",
    label: "TRANSFORMER/LLMs",
    type: "category",
    family: "transformer",
    x: 28,
    y: 35,
    connections: [
      "attention",
      "position",
      "norms",
      "parameter-reduction",
      "lora",
      "act"
    ]
  },

  {
    id: "attention",
    label: "ATTENTION",
    type: "topic",
    family: "transformer",
    x: 13,
    y: 30,
    href: "Transformer/Attention/attention.html",
    connections: ["transformer"]
  },

  {
    id: "position",
    label: "POSITION EMBEDDINGS",
    type: "topic",
    family: "transformer",
    x: 23,
    y: 50,
    href: "Transformer/Pos_embed/position-embeddings.html",
    connections: ["transformer"]
  },

  {
    id: "norms",
    label: "NORMALISATION",
    type: "topic",
    family: "transformer",
    x: 33,
    y: 25,
    href: "normalisation.html",
    connections: ["transformer"]
  },

  {
    id: "parameter-reduction",
    label: "PARAMETER-REDUCTION",
    type: "topic",
    family: "transformer",
    x: 20,
    y: 15,
    href: "parameter-reduction.html",
    connections: ["transformer"]
  },

  {
    id: "lora",
    label: "LORA",
    type: "topic",
    family: "transformer",
    x: 34,
    y: 40,
    href: "lora.html",
    connections: ["transformer"]
  },

  {
    id: "act",
    label: "ACTIVATION-FUNCTIONS",
    type: "topic",
    family: "transformer",
    x: 54,
    y: 50,
    href: "Models/activation.html",
    connections: ["transformer"]
  },


  /* =========================================================
     STATE SPACE MODELS
     ========================================================= */

  {
    id: "ssm",
    label: "STATE SPACE MODELS",
    type: "category",
    family: "ssm",
    x: 82,
    y: 50,
    connections: [
      "mamba",
      "RNN_to_CNN",
      "Hippo/S4"
    ]
  },

  {
    id: "mamba",
    label: "MAMBA",
    type: "topic",
    family: "ssm",
    x: 66,
    y: 28,
    connections: ["ssm"]
  },

  {
    id: "RNN_to_CNN",
    label: "CNN VIEW OF RNN",
    type: "topic",
    family: "ssm",
    x: 75,
    y: 25,
    href: "Models/RNN_to_CNN.html",
    connections: ["mamba"]
  },

  {
    id: "Hippo/S4",
    label: "HiPPO/S4",
    type: "topic",
    family: "ssm",
    x: 70,
    y: 60,
    href: "Models/S4.html",
    connections: [
      "RNN_to_CNN",
      "mamba",
      "ssm"
    ]
  },


  /* =========================================================
     GENERATIVE AI
     SSM / CYAN FAMILY
     ========================================================= */

  {
    id: "generative-ai",
    label: "GENERATIVE AI",
    type: "category",
    family: "ssm",
    x: 38,
    y: 80,
    connections: [
      "diffusion"
    ]
  },

  {
    id: "diffusion",
    label: "DIFFUSION",
    type: "topic",
    family: "ssm",
    x: 19,
    y: 88,
    href: "diffusion.html",
    connections: ["generative-ai"]
  },


  /* =========================================================
     INTERESTING STUFF
     TRANSFORMER / VIOLET FAMILY
     ========================================================= */

  {
    id: "interesting",
    label: "INTERESTING STUFF",
    type: "category",
    family: "transformer",
    x: 72,
    y: 78,
    connections: [
      "grokking",
      "double-descent"
    ]
  },

  {
    id: "grokking",
    label: "GROKKING",
    type: "topic",
    family: "transformer",
    x: 58,
    y: 87,
    href: "grokking.html",
    connections: ["interesting"]
  },

  {
    id: "double-descent",
    label: "DOUBLE DESCENT",
    type: "topic",
    family: "transformer",
    x: 87,
    y: 85,
    href: "double-descent.html",
    connections: ["interesting"]
  }

];


/* =========================================================
   DOM
   ========================================================= */

const nodesContainer =
  document.getElementById("mechanicsNodes");

const svg =
  document.getElementById("mechanicsLines");

const topicKicker =
  document.getElementById("mechanicsTopicKicker");

const topicTitle =
  document.getElementById("mechanicsTopicTitle");

const topicText =
  document.getElementById("mechanicsTopicText");


/* =========================================================
   TOPIC DESCRIPTIONS
   ========================================================= */

const descriptions = {

  transformer:
    "The architecture that brought attention, positional representations and normalisation together into a powerful sequence model.",

  attention:
    "How queries, keys and values let a model decide which parts of a sequence matter to one another.",

  position:
    "How a model can represent order when attention itself has no inherent notion of position.",

  norms:
    "Why normalisation is needed in deep networks, and how different normalisation choices affect optimisation and representation.",

  "parameter-reduction":
    "Methods for reducing the number of trainable parameters while adapting or extending large neural networks.",

  lora:
    "A parameter-efficient adaptation method that learns low-rank updates instead of updating all model weights.",

  act:
    "Nonlinear functions that allow neural networks to represent complex transformations.",

  ssm:
    "A mathematical framework for representing long-range sequence dynamics through a latent state.",

  mamba:
    "A selective state-space approach that revisits sequence modelling through efficient recurrent state updates.",

  "RNN_to_CNN":
    "A convolutional view of recurrent sequence processing and its connection to state-space models.",

  "Hippo/S4":
    "The HiPPO and S4 framework for constructing structured state-space models capable of representing long-range dependencies.",

  "generative-ai":
    "Models that learn to generate new data by learning the structure of a data distribution.",

  diffusion:
    "A generative framework that learns to reverse a gradual corruption process and recover structure from noise.",

  interesting:
    "Interesting phenomena in deep learning that reveal surprising behaviour in optimisation, generalisation and model capacity.",

  grokking:
    "A surprising phenomenon where a model appears to memorise first and only later suddenly discovers a generalising solution.",

  "double-descent":
    "Why increasing model capacity can sometimes make test error rise and then fall again."

};


/* =========================================================
   CREATE NODES
   ========================================================= */

function createNodes() {

  nodesContainer.innerHTML = "";

  nodes.forEach(node => {

    const element =
      document.createElement("button");

    element.type = "button";

    element.className =
      `mechanics-node ${node.type} ` +
      `${node.family ? `family-${node.family}` : ""}`;

    element.dataset.id = node.id;

    element.textContent = node.label;


    /* -------------------------------------------------------
       RESEARCH MARKERS
       ------------------------------------------------------- */

    const researchNodes = [
      "ATTENTION",
      "PARAMETER-REDUCTION"
    ];

    if (researchNodes.includes(node.label)) {

      const star =
        document.createElement("span");

      star.className = "research-star";
      star.textContent = " ★";

      element.appendChild(star);
    }


    /* -------------------------------------------------------
       POSITION
       ------------------------------------------------------- */

    element.style.left = `${node.x}%`;
    element.style.top = `${node.y}%`;


    /* -------------------------------------------------------
       CLICK
       ------------------------------------------------------- */

    element.addEventListener("click", () => {

      if (node.href) {

        window.location.href = node.href;

      } else {

        showTopic(node);
        highlightNode(node.id);

      }

    });


    nodesContainer.appendChild(element);

  });

}


/* =========================================================
   DRAW CONNECTIONS
   ========================================================= */

function drawConnections() {

  svg.innerHTML = "";

  const map = {};

  nodes.forEach(node => {
    map[node.id] = node;
  });


  nodes.forEach(node => {

    if (!node.connections) return;

    node.connections.forEach(targetId => {

      const target = map[targetId];

      if (!target) return;


      /* -----------------------------------------------------
         DRAW EACH CONNECTION ONLY ONCE
         ----------------------------------------------------- */

      if (
        nodes.findIndex(n => n.id === node.id) >
        nodes.findIndex(n => n.id === targetId)
      ) {
        return;
      }


      const line =
        document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

      line.classList.add("mechanics-line");


      /* -----------------------------------------------------
         FAMILY COLOUR
         ----------------------------------------------------- */

      const family =
        node.family || target.family;

      if (family) {
        line.classList.add(`family-${family}`);
      }


      /* -----------------------------------------------------
         CONNECTION IDS
         ----------------------------------------------------- */

      line.dataset.from = node.id;
      line.dataset.to = target.id;

      svg.appendChild(line);

    });

  });


  updateLinePositions();

}


/* =========================================================
   UPDATE LINE POSITIONS
   ========================================================= */

function updateLinePositions() {

  const mapElement =
    document.querySelector(".mechanics-web");

  if (!mapElement) return;

  const mapRect =
    mapElement.getBoundingClientRect();

  const width = mapRect.width;
  const height = mapRect.height;


  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  svg.setAttribute(
    "viewBox",
    `0 0 ${width} ${height}`
  );


  const lines =
    svg.querySelectorAll(".mechanics-line");


  lines.forEach(line => {

    const from =
      nodes.find(
        node => node.id === line.dataset.from
      );

    const to =
      nodes.find(
        node => node.id === line.dataset.to
      );

    if (!from || !to) return;


    line.setAttribute(
      "x1",
      (from.x / 100) * width
    );

    line.setAttribute(
      "y1",
      (from.y / 100) * height
    );

    line.setAttribute(
      "x2",
      (to.x / 100) * width
    );

    line.setAttribute(
      "y2",
      (to.y / 100) * height
    );

  });

}


/* =========================================================
   SHOW TOPIC
   ========================================================= */

function showTopic(node) {

  if (topicKicker) {

    topicKicker.textContent =
      node.type === "category"
        ? "MODEL MACHINERY"
        : "MODEL MECHANICS";

  }

  if (topicTitle) {

    topicTitle.textContent =
      node.label;

  }

  if (topicText) {

    topicText.textContent =
      descriptions[node.id] ||
      "More details are coming soon.";

  }

}


/* =========================================================
   HIGHLIGHT NODE
   ========================================================= */

function highlightNode(id) {

  document
    .querySelectorAll(".mechanics-node")
    .forEach(element => {

      element.classList.remove("active");

    });


  const selected =
    nodesContainer.querySelector(
      `[data-id="${id}"]`
    );

  if (selected) {

    selected.classList.add("active");

  }


  document
    .querySelectorAll(".mechanics-line")
    .forEach(line => {

      const connected =
        line.dataset.from === id ||
        line.dataset.to === id;

      line.classList.toggle(
        "active",
        connected
      );

    });

}


/* =========================================================
   INITIALISE
   ========================================================= */

function initialiseMechanics() {

  createNodes();
  drawConnections();

}


/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
  "resize",
  updateLinePositions
);


/* =========================================================
   START
   ========================================================= */

initialiseMechanics();
