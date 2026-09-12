/* =========================================================
   MODEL MECHANICS — EDITABLE KNOWLEDGE MAP
   ========================================================= */

/*
  EDIT THIS SECTION to change the map.

  x / y = position as percentages of the map area.
  type = "category" for large conceptual nodes.
  type = "topic" for clickable topics.

  connections = IDs of nodes that should be connected.
*/

const nodes = [
  /* =========================
     TRANSFORMER CLUSTER
     ========================= */

  {
    id: "transformer",
    label: "TRANSFORMER/LLMs",
    type: "category",
    x: 28,
    y: 35,
    connections: [
      "attention",
      "position",
      "norms",
      "parameter-reduction",
      "lora"
    ]
  },

  {
    id: "attention",
    label: 'ATTENTION',
    type: "topic",
    x: 13,
    y: 30,
    href: "Transformer/Attention/attention.html",
    connections: ["transformer"]
  },

  {
    id: "position",
    label: "POSITION EMBEDDINGS",
    type: "topic",
    x: 23,
    y: 50,
    href: "Transformer/Pos_embed/position-embeddings.html",
    connections: ["transformer"]
  },

  {
    id: "norms",
    label: "NORMALISATION",
    type: "topic",
    x: 33,
    y: 25,
    href: "normalisation.html",
    connections: ["transformer"]
  },

  {
    id: "parameter-reduction",
    label: 'PARAMETER-REDUCTION',
    type: "topic",
    x: 20,
    y: 15,
    href: "parameter-reduction.html",
    connections: ["transformer"]
  },
  
  {
    id: "lora",
    label: 'LORA',
    type: "topic",
    x: 34,
    y: 40,
    href: "lora.html",
    connections: ["transformer"]
  },



{
    id: "act",
    label: 'ACTIVATION-FUNCTIONS',
    type: "topic",
    x: 54,
    y: 50,
    href: "Models/activation.html",
    connections: ["transformer"]
  },


  /* =========================
     FOUNDATIONS
     ========================= */

  {
    id: "foundations",
    label: "FOUNDATIONS",
    type: "category",
    x: 72,
    y: 85,
    connections: [
      "initialisation",
      "grokking",
      "double-descent"
    ]
  },

  {
    id: "backprop",
    label: "BACK PROPAGATION",
    type: "topic",
    x: 66,
    y: 90,
    href: "Models/backprop.html",
    connections: ["foundations"]
  },

  {
    id: "initialisation",
    label: "INITIALISATION",
    type: "topic",
    x: 66,
    y: 90,
    href: "initialisation.html",
    connections: ["foundations"]
  },

  {
    id: "grokking",
    label: "GROKKING",
    type: "topic",
    x: 82,
    y: 90,
    href: "grokking.html",
    connections: ["foundations"]
  },

  {
    id: "double-descent",
    label: "DOUBLE DESCENT",
    type: "topic",
    x: 85,
    y: 85,
    href: "double-descent.html",
    connections: ["foundations"]
  },


  /* =========================
     MAMBA / SSM
     ========================= */

  {
    id: "mamba",
    label: "MAMBA",
    type: "topic",
    x: 66,
    y: 28,
    connections: [
      "ssm"
    ]
  },

  {
    id: "ssm",
    label: "STATE SPACE MODELS",
    type: "category",
    x: 82,
    y: 50,
    connections: ["mamba","RNN_to_CNN","Hippo/S4"]
  },

  {
    id: "RNN_to_CNN",
    label: "CNN VIEW OF RNN",
    type: "topic",
    x: 75,
    y: 25,
    href: "Models/RNN_to_CNN.html",
    connections: ["mamba"]
  },

  {
    id: "Hippo/S4",
    label: "HiPPO/S4",
    type: "topic",
    x: 70,
    y: 60,
    href: "Models/S4.html",
    connections: ["RNN_to_CNN","mamba","ssm"]
  },




  /* =========================
     GENERATIVE AI
     ========================= */

  {
    id: "generative-ai",
    label: "GENERATIVE AI",
    type: "category",
    x: 40,
    y: 82,
    connections: [
      "diffusion"
    ]
  },

  {
    id: "diffusion",
    label: "DIFFUSION",
    type: "topic",
    x: 22,
    y: 84,
    href: "diffusion.html",
    connections: ["generative-ai"]
  }
];


/* =========================================================
   DOM
   ========================================================= */

const nodesContainer = document.getElementById("mechanicsNodes");
const svg = document.getElementById("mechanicsLines");

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

  foundations:
    "Ideas that reveal how optimisation, model capacity and training dynamics shape what neural networks learn.",

  initialisation:
    "How the starting point of optimisation affects signal propagation, gradients and ultimately learning.",

  grokking:
    "A surprising phenomenon where a model appears to memorise first and only later suddenly discovers a generalising solution.",

  "double-descent":
    "Why increasing model capacity can sometimes make test error rise and then fall again.",

  mamba:
    "A selective state-space approach that revisits sequence modelling through efficient recurrent state updates.",

  ssm:
    "A mathematical framework for representing long-range sequence dynamics through a latent state.",

  "generative-ai":
    "Models that learn to generate new data by learning the structure of a data distribution.",

  diffusion:
    "A generative framework that learns to reverse a gradual corruption process and recover structure from noise."
};


/* =========================================================
   CREATE NODES
   ========================================================= */

function createNodes() {

  nodesContainer.innerHTML = "";

  nodes.forEach(node => {

    const element = document.createElement("button");

    element.type = "button";

    element.className =
      `mechanics-node ${node.type}`;

    element.dataset.id = node.id;

    element.textContent = node.label;

    const researchNodes = ["ATTENTION", "PARAMETER-REDUCTION"];
    if (researchNodes.includes(node.label)) {
      const star = document.createElement("span");
      star.className = "research-star";
      star.textContent = " ★";
      element.appendChild(star);
    }

    element.style.left = `${node.x}%`;
    element.style.top = `${node.y}%`;

    element.addEventListener("click", () => {

      if (node.href) {
        window.location.href = node.href;
      } else {
        showTopic(node);
      }

      
      highlightNode(node.id);


    });

    nodesContainer.appendChild(element);
  });
}


/* =========================================================
   DRAW CONNECTIONS
   ========================================================= */

function drawConnections() {

 svg.innerHTML = `
  <defs>
    <linearGradient
      id="mechanicsGradient"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%">
      
      <stop offset="0%" stop-color="#d32dff"/>
      <stop offset="50%" stop-color="#6d65ff"/>
      <stop offset="100%" stop-color="#19cfff"/>
      
    </linearGradient>
  </defs>
`;
  const map = {};

  nodes.forEach(node => {
    map[node.id] = node;
  });

  nodes.forEach(node => {

    if (!node.connections) return;

    node.connections.forEach(targetId => {

      const target = map[targetId];

      if (!target) return;

      /*
        Only draw each connection once.
      */

      if (
        nodes.findIndex(n => n.id === node.id) >
        nodes.findIndex(n => n.id === targetId)
      ) {
        return;
      }

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

      line.classList.add("mechanics-line");

      line.dataset.from = node.id;
      line.dataset.to = targetId;

      line.setAttribute(
        "x1",
        `${node.x}%`
      );

      line.setAttribute(
        "y1",
        `${node.y}%`
      );

      line.setAttribute(
        "x2",
        `${target.x}%`
      );

      line.setAttribute(
        "y2",
        `${target.y}%`
      );

       line.setAttribute(
        "stroke",
        "url(#mechanicsGradient)"
      );


      svg.appendChild(line);
    });
  });
}


/* =========================================================
   HIGHLIGHT CONNECTED CLUSTER
   ========================================================= */

function highlightNode(id) {

  const selected = nodes.find(
    node => node.id === id
  );

  if (!selected) return;

  const connected = new Set([
    id,
    ...(selected.connections || [])
  ]);

  /*
    Highlight nodes
  */

  document
    .querySelectorAll(".mechanics-node")
    .forEach(element => {

      const nodeId = element.dataset.id;

      element.classList.toggle(
        "active",
        connected.has(nodeId)
      );
    });


  /*
    Highlight lines
  */

  document
    .querySelectorAll(".mechanics-line")
    .forEach(line => {

      const from = line.dataset.from;
      const to = line.dataset.to;

      line.classList.toggle(
        "active",
        from === id || to === id
      );
    });


  /*
    Show description
  */

  showTopic(selected);
}


/* =========================================================
   TOPIC PANEL
   ========================================================= */

function showTopic(node) {

  topicKicker.textContent =
    node.type === "category"
      ? "MODEL MECHANICS"
      : "EXPLORE";

  topicTitle.textContent =
    node.label;

  topicText.textContent =
    descriptions[node.id] ||
    "Explore this idea and the questions surrounding it.";
}


/* =========================================================
   INITIALISE
   ========================================================= */

createNodes();
drawConnections();

