/* =========================================================
   MODEL MECHANICS — Knowledge Map
   ========================================================= */

const nodes = [

  /* =========================================================
     TRANSFORMER
     ========================================================= */

  {
    id: "transformer",
    label: "TRANSFORMER",
    type: "category",
    family: "transformer",
    x: 28,
    y: 34,
    connections: [
      "attention",
      "position",
      "parameter-reduction",
      "lora"
    ]
  },

  {
    id: "attention",
    label: "ATTENTION",
    type: "topic",
    family: "transformer",
    x: 10,
    y: 25,
    research: true,
    href: "Transformer/Attention/attention.html"
  },

  {
    id: "position",
    label: "POSITION EMBEDDINGS",
    type: "topic",
    family: "transformer",
    x: 17,
    y: 57,
    href: "Transformer/Pos_embed/position-embeddings.html"
  },

  {
    id: "parameter-reduction",
    label: "PARAMETER REDUCTION",
    type: "topic",
    family: "transformer",
    x: 18,
    y: 14,
    research: true
  },

  {
    id: "lora",
    label: "LoRA",
    type: "topic",
    family: "transformer",
    x: 15,
    y: 40
  },


  /* =========================================================
     FOUNDATIONS
     ========================================================= */

  {
    id: "foundations",
    label: "FOUNDATIONS",
    type: "category",
    family: "foundations",
    x: 50,
    y: 42,
    connections: [
      "normalisation",
      "activation-functions",
      "optimizers"
    ]
  },

  {
    id: "normalisation",
    label: "NORMALISATION",
    type: "topic",
    family: "foundations",
    x: 45,
    y: 11
  },

  {
    id: "activation-functions",
    label: "ACTIVATION FUNCTIONS",
    type: "topic",
    family: "foundations",
    x: 57,
    y: 60
  },

  {
    id: "optimizers",
    label: "OPTIMIZERS",
    type: "topic",
    family: "foundations",
    x: 55,
    y: 28
  },


  /* =========================================================
     SSM
     ========================================================= */

  {
    id: "ssm",
    label: "STATE SPACE MODELS",
    type: "category",
    family: "ssm",
    x: 80,
    y: 31,
    connections: [
      "mamba",
      "rnn-to-cnn",
      "hippo-s4"
    ]
  },

  {
    id: "mamba",
    label: "MAMBA",
    type: "topic",
    family: "ssm",
    x: 73,
    y: 19
  },

  {
    id: "rnn-to-cnn",
    label: "CNN VIEW OF RNN",
    type: "topic",
    family: "ssm",
    x: 85,
    y: 16
  },

  {
    id: "hippo-s4",
    label: "HIPPO/S4",
    type: "topic",
    family: "ssm",
    x: 90,
    y: 45
  },


  /* =========================================================
     GENERATIVE AI
     SSM / TEAL FAMILY
     ========================================================= */

  {
    id: "generative-ai",
    label: "GENERATIVE AI",
    type: "category",
    family: "ssm",
    x: 37,
    y: 69,
    connections: [
      "diffusion",
      "vae",
      "gan"
    ]
  },

  {
    id: "diffusion",
    label: "DIFFUSION",
    type: "topic",
    family: "ssm",
    x: 27,
    y: 76
  },

  {
    id: "vae",
    label: "VAE",
    type: "topic",
    family: "ssm",
    x: 32,
    y: 94
  },

  {
    id: "gan",
    label: "GAN",
    type: "topic",
    family: "ssm",
    x: 48,
    y: 91
  },


  /* =========================================================
     INTERESTING STUFF
     TRANSFORMER / VIOLET FAMILY
     ========================================================= */

  {
    id: "interesting-stuff",
    label: "INTERESTING STUFF",
    type: "category",
    family: "transformer",
    x: 83,
    y: 79,
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
    x: 75,
    y: 95
  },

  {
    id: "double-descent",
    label: "DOUBLE DESCENT",
    type: "topic",
    family: "transformer",
    x: 75,
    y: 61
  }

];


/* =========================================================
   DESCRIPTIONS
   ========================================================= */

const descriptions = {

  transformer:
    "The Transformer architecture and the mechanisms that make attention-based models work.",

  attention:
    "How attention allows a model to selectively relate different positions in a sequence.",

  position:
    "How models represent positional information in sequences, including sinusoidal embeddings and RoPE.",

  "parameter-reduction":
    "Methods for reducing the number of trainable parameters while retaining model capability.",

  lora:
    "Low-Rank Adaptation for parameter-efficient fine-tuning of large models.",

  foundations:
    "Core mechanisms that appear across neural network architectures.",

  normalisation:
    "Normalisation mechanisms that control activation statistics and improve neural network training.",

  "activation-functions":
    "Nonlinear functions that determine how neural networks transform their intermediate representations.",

  optimizers:
    "Algorithms that update model parameters during training to minimise an objective.",

  ssm:
    "State Space Models provide an alternative framework for modelling long sequences and temporal dynamics.",

  mamba:
    "A selective state space architecture designed for efficient sequence modelling.",

  "rnn-to-cnn":
    "A view of recurrent sequence processing through the lens of convolution and state space structure.",

  "hippo-s4":
    "The mathematical foundations connecting HiPPO projections and structured state space models such as S4.",

  "generative-ai":
    "Generative models that learn to create new data from learned representations or distributions.",

  diffusion:
    "Generative models based on progressively adding and reversing noise.",

  vae:
    "Variational Autoencoders learn structured latent representations through probabilistic encoding and decoding.",

  gan:
    "Generative Adversarial Networks learn generation through competition between a generator and discriminator.",

  "interesting-stuff":
    "Interesting empirical phenomena that reveal unexpected behaviour in modern neural networks.",

  grokking:
    "The phenomenon where a model suddenly generalises long after it has apparently memorised the training data.",

  "double-descent":
    "The non-monotonic relationship between model complexity and generalisation error."

};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const web =
  document.querySelector(".mechanics-web");

const nodesContainer =
  document.getElementById("mechanicsNodes");

const svg =
  document.getElementById("mechanicsLines");

const topicPanel =
  document.getElementById("mechanicsTopicPanel");

const topicTitle =
  document.getElementById("mechanicsTopicTitle");

const topicText =
  document.getElementById("mechanicsTopicText");

const topicKicker =
  document.getElementById("mechanicsTopicKicker");


/* =========================================================
   CREATE NODES
   ========================================================= */

function createNodes() {

  nodesContainer.innerHTML = "";

  nodes.forEach(node => {

    const element = document.createElement("div");

    /*
     * IMPORTANT:
     * These class names MUST match mechanics.css:
     *
     * .mechanics-node.category
     * .mechanics-node.topic
     * .mechanics-node.family-transformer
     * .mechanics-node.family-ssm
     * .mechanics-node.family-foundations
     */

    element.classList.add(
      "mechanics-node",
      node.type === "category"
        ? "category"
        : "topic",
      `family-${node.family}`
    );

    element.dataset.id = node.id;
    element.dataset.family = node.family;

    element.style.left = `${node.x}%`;
    element.style.top = `${node.y}%`;

    element.textContent = node.label;

    if (node.research) {
      element.classList.add("research-topic");
    }

    element.addEventListener("click", event => {

      event.stopPropagation();

      if (node.href) {
        window.location.href = node.href;
        return;
      }

      showTopic(node.id);

      if (node.type === "category") {
        highlightNode(node.id);
      }

    });

    nodesContainer.appendChild(element);

  });

}


/* =========================================================
   NODE CENTER
   ========================================================= */

function getNodeCenter(element, webRect) {

  const rect =
    element.getBoundingClientRect();

  return {
    x:
      rect.left +
      rect.width / 2 -
      webRect.left,

    y:
      rect.top +
      rect.height / 2 -
      webRect.top
  };

}


/* =========================================================
   DRAW CONNECTIONS
   ========================================================= */

function drawConnections() {

  svg.innerHTML = "";

  const webRect =
    web.getBoundingClientRect();

  nodes.forEach(parent => {

    if (!parent.connections) return;

    const parentElement =
      document.querySelector(
        `[data-id="${parent.id}"]`
      );

    if (!parentElement) return;

    const parentCenter =
      getNodeCenter(
        parentElement,
        webRect
      );

    parent.connections.forEach(childId => {

      const child =
        nodes.find(
          node => node.id === childId
        );

      if (!child) return;

      const childElement =
        document.querySelector(
          `[data-id="${child.id}"]`
        );

      if (!childElement) return;

      const childCenter =
        getNodeCenter(
          childElement,
          webRect
        );

      const line =
        document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

      /*
       * IMPORTANT:
       * CSS expects:
       *
       * .mechanics-line.family-ssm
       * .mechanics-line.family-transformer
       * .mechanics-line.family-foundations
       */

      line.classList.add(
        "mechanics-line",
        `family-${parent.family}`
      );

      line.dataset.parent =
        parent.id;

      line.dataset.child =
        child.id;

      line.setAttribute(
        "x1",
        parentCenter.x
      );

      line.setAttribute(
        "y1",
        parentCenter.y
      );

      line.setAttribute(
        "x2",
        childCenter.x
      );

      line.setAttribute(
        "y2",
        childCenter.y
      );

      svg.appendChild(line);

    });

  });

}


/* =========================================================
   UPDATE LINE POSITIONS
   ========================================================= */

function updateLinePositions() {

  const webRect =
    web.getBoundingClientRect();

  document
    .querySelectorAll(".mechanics-line")
    .forEach(line => {

      const parentElement =
        document.querySelector(
          `[data-id="${line.dataset.parent}"]`
        );

      const childElement =
        document.querySelector(
          `[data-id="${line.dataset.child}"]`
        );

      if (!parentElement || !childElement) {
        return;
      }

      const parentCenter =
        getNodeCenter(
          parentElement,
          webRect
        );

      const childCenter =
        getNodeCenter(
          childElement,
          webRect
        );

      line.setAttribute(
        "x1",
        parentCenter.x
      );

      line.setAttribute(
        "y1",
        parentCenter.y
      );

      line.setAttribute(
        "x2",
        childCenter.x
      );

      line.setAttribute(
        "y2",
        childCenter.y
      );

    });

}


/* =========================================================
   SHOW TOPIC
   ========================================================= */

function showTopic(id) {

  const node =
    nodes.find(
      n => n.id === id
    );

  if (!node) return;

  topicTitle.textContent =
    node.label;

  topicText.textContent =
    descriptions[id] ||
    "This topic is part of the Model Mechanics journey.";

  if (topicKicker) {

    topicKicker.textContent =
      node.type === "category"
        ? "MODEL MACHINERY"
        : "TOPIC";

  }

  topicPanel.classList.add(
    "visible"
  );

}


/* =========================================================
   HIGHLIGHT CATEGORY
   ========================================================= */

function highlightNode(id) {

  /*
   * Remove previous active state.
   */

  document
    .querySelectorAll(".mechanics-node")
    .forEach(element => {

      element.classList.remove(
        "active"
      );

    });

  document
    .querySelectorAll(".mechanics-line")
    .forEach(line => {

      line.classList.remove(
        "active"
      );

    });


  /*
   * Activate selected parent.
   */

  const parentElement =
    document.querySelector(
      `[data-id="${id}"]`
    );

  if (parentElement) {

    parentElement.classList.add(
      "active"
    );

  }


  /*
   * Activate its connections.
   *
   * CSS deliberately keeps active lines
   * visually identical to normal lines.
   */

  document
    .querySelectorAll(
      `.mechanics-line[data-parent="${id}"]`
    )
    .forEach(line => {

      line.classList.add(
        "active"
      );

    });

}


/* =========================================================
   INITIALISE
   ========================================================= */

function initialise() {

  if (
    !web ||
    !nodesContainer ||
    !svg
  ) {
    console.warn(
      "Model Mechanics: map elements not found."
    );
    return;
  }

  createNodes();

  requestAnimationFrame(() => {

    drawConnections();

    requestAnimationFrame(() => {

      updateLinePositions();

    });

  });

}


/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
  "resize",
  () => {

    requestAnimationFrame(
      updateLinePositions
    );

  }
);


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initialise
  );

} else {

  initialise();

}
