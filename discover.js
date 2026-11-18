/* =========================================================
   VOCTRAMIND — DISCOVER SPEECH
   A Speech AI knowledge map using the Model Mechanics
   design system and interaction pattern.
   ========================================================= */

const nodes = [
  /* ========================= ASR GALAXY ========================= */
  {
    id: "asr",
    label: "AUTOMATIC SPEECH RECOGNITION",
    type: "category",
    family: "transformer",
    x: 25, y: 25,
    connections: ["ctc", "rnnt", "attention-asr", "llm-asr", "contextual-asr"]
  },
  {
    id: "ctc",
    label: "CTC",
    type: "topic",
    family: "transformer",
    x: 8, y: 12,
    href: "Speech/CTC/ctc.html"
  },
  {
    id: "rnnt",
    label: "RNN-T",
    type: "topic",
    family: "transformer",
    x: 7, y: 35
  },
  {
    id: "attention-asr",
    label: "ATTENTION / SEQ2SEQ",
    type: "topic",
    family: "transformer",
    x: 24, y: 8
  },
  {
    id: "llm-asr",
    label: "LLM-BASED ASR",
    type: "topic",
    family: "transformer",
    x: 43, y: 13
  },
  {
    id: "contextual-asr",
    label: "CONTEXTUAL ASR",
    type: "topic",
    family: "transformer",
    x: 43, y: 36
  },

  /* ====================== SSL GALAXY ====================== */
  {
    id: "ssl",
    label: "SELF-SUPERVISED LEARNING",
    type: "category",
    family: "ssm",
    x: 75, y: 25,
    connections: [
      "wav2vec",
      "hubert",
      "wavlm",
      "data2vec",
      "xlsr",
      "masked-prediction"
    ]
  },
  {
    id: "wav2vec",
    label: "WAV2VEC 2.0",
    type: "topic",
    family: "ssm",
    x: 60, y: 9
  },
  {
    id: "hubert",
    label: "HUBERT",
    type: "topic",
    family: "ssm",
    x: 76, y: 7
  },
  {
    id: "wavlm",
    label: "WAVLM",
    type: "topic",
    family: "ssm",
    x: 92, y: 12
  },
  {
    id: "data2vec",
    label: "DATA2VEC-AQC",
    type: "topic",
    family: "ssm",
    x: 59, y: 38
  },
  {
    id: "xlsr",
    label: "XLS-R",
    type: "topic",
    family: "ssm",
    x: 78, y: 42
  },
  {
    id: "masked-prediction",
    label: "MASKED PREDICTION",
    type: "topic",
    family: "ssm",
    x: 94, y: 35
  },

  /* ====================== SPEAKER VERIFICATION GALAXY ====================== */
  {
    id: "sv",
    label: "SPEAKER VERIFICATION",
    type: "category",
    family: "foundations",
    x: 25, y: 72,
    connections: [
      "speaker-embeddings",
      "aam",
      "phantom-aam",
      "scoring-backends",
      "et-morph"
    ]
  },
  {
    id: "speaker-embeddings",
    label: "SPEAKER EMBEDDINGS",
    type: "topic",
    family: "foundations",
    x: 7, y: 57
  },
  {
    id: "aam",
    label: "AAM-SOFTMAX",
    type: "topic",
    family: "foundations",
    x: 24, y: 53
  },
  {
    id: "phantom-aam",
    label: "PHANTOM-AAM",
    type: "topic",
    family: "foundations",
    x: 43, y: 59,
    research: true
  },
  {
    id: "scoring-backends",
    label: "PLDA / TESA",
    type: "topic",
    family: "foundations",
    x: 8, y: 85
  },
  {
    id: "et-morph",
    label: "ET-MORPH",
    type: "topic",
    family: "foundations",
    x: 42, y: 86,
    research: true
  },

  /* ====================== DIARIZATION GALAXY ====================== */
  {
    id: "diarization",
    label: "DIARIZATION",
    type: "category",
    family: "generative",
    x: 75, y: 72,
    connections: [
      "vad",
      "diar-embeddings",
      "clustering",
      "overlap",
      "end-to-end"
    ]
  },
  {
    id: "vad",
    label: "VOICE ACTIVITY DETECTION",
    type: "topic",
    family: "generative",
    x: 59, y: 57
  },
  {
    id: "diar-embeddings",
    label: "SPEAKER REPRESENTATIONS",
    type: "topic",
    family: "generative",
    x: 77, y: 53
  },
  {
    id: "clustering",
    label: "CLUSTERING",
    type: "topic",
    family: "generative",
    x: 94, y: 60
  },
  {
    id: "overlap",
    label: "OVERLAP-AWARE DIARIZATION",
    type: "topic",
    family: "generative",
    x: 59, y: 86
  },
  {
    id: "end-to-end",
    label: "END-TO-END DIARIZATION",
    type: "topic",
    family: "generative",
    x: 92, y: 85
  }
];


/* =========================================================
   TOPIC DESCRIPTIONS
   ========================================================= */

const descriptions = {
  asr: "The ASR galaxy maps the main ways to convert speech into text: alignment-based training with CTC, transducer models such as RNN-T, attention-based sequence modelling, and newer LLM-based and context-aware systems.",

  ctc: "Connectionist Temporal Classification trains speech recognition models without requiring frame-level alignments. It sums the probabilities of all frame-level paths that collapse to the target transcript. Open this topic to explore the CTC learning page.",

  rnnt: "RNN-Transducer combines an acoustic encoder with a prediction network and a joint network. It models output generation while supporting streaming recognition.",

  "attention-asr": "Attention-based encoder–decoder ASR learns to map acoustic representations to token sequences through cross-attention. Unlike CTC, it directly models dependencies between output tokens.",

  "llm-asr": "LLM-based ASR connects speech representations to a language model, often using a pretrained speech encoder and an LLM decoder. The interface must align acoustic information with the language model's token space.",

  "contextual-asr": "Contextual ASR uses information such as names, domain vocabulary, dialogue history, or task context to improve recognition of words that are acoustically ambiguous or rare.",

  ssl: "Self-supervised learning (SSL) learns useful speech representations from large amounts of unlabelled audio. Different methods construct pretraining targets through contrastive prediction, masked-unit prediction, or teacher representations.",

  wav2vec: "wav2vec 2.0 masks latent speech representations and learns to identify the correct quantized targets among distractors, combining a convolutional feature encoder with a Transformer context network.",

  hubert: "HuBERT predicts clustered hidden units for masked regions. Its offline pseudo-labels provide a target that can be refined over successive pretraining iterations.",

  wavlm: "WavLM combines masked speech prediction with denoising-oriented training, aiming to learn representations useful across speech tasks, including speaker-related tasks.",

  data2vec: "data2vec predicts latent representations from a teacher network rather than predicting raw input or discrete labels. data2vec-aqc is relevant to efficient speech representation learning and SLAM-ASR experiments.",

  xlsr: "XLS-R extends wav2vec 2.0-style self-supervised speech pretraining across many languages, supporting multilingual and cross-lingual transfer.",

  "masked-prediction": "Masked prediction hides portions of an input representation and trains a model to recover targets at those positions. The target may be discrete units or continuous teacher representations.",

  sv: "Speaker Verification (SV) determines whether two speech segments belong to the same speaker. The galaxy links representation learning, discriminative objectives, and scoring backends.",

  "speaker-embeddings": "Speaker embeddings compress a variable-length utterance into a fixed-dimensional representation intended to preserve speaker identity while being robust to phonetic content and nuisance variation.",

  aam: "Additive Angular Margin Softmax (AAM-Softmax) strengthens angular separation between speaker classes and is a widely used discriminative training objective for speaker embeddings.",

  "phantom-aam": "Phantom-AAM modifies the competition in the angular classification objective to encourage improved intra-class compactness without adding model parameters. The gold star marks a topic connected to published research.",

  "scoring-backends": "Scoring backends compare enrollment and test representations. Cosine scoring is simple; PLDA models between- and within-speaker variability; neural backends such as TESA learn a speaker-authentication score.",

  "et-morph": "ET-Morph is a residual morphing mechanism for speaker-verification scoring, transforming trial representations in a learned, trial-dependent way. The gold star marks a topic connected to published research.",

  diarization: "Speaker diarization answers 'who spoke when?' It segments an audio recording and assigns speaker identities to speech regions, including the harder case where speakers overlap.",

  vad: "Voice Activity Detection identifies speech versus non-speech regions. It often supports diarization pipelines, although robust diarization may need to reason jointly about speech activity and speaker turns.",

  "diar-embeddings": "Speaker representations map speech segments or local frames into a space where segments from the same speaker can be associated across time.",

  clustering: "Clustering groups speech segments or embeddings into speaker identities. Practical systems must handle variable segment duration, channel effects, speaker similarity, and the number of speakers.",

  overlap: "Overlap-aware diarization handles intervals in which multiple speakers talk simultaneously, rather than forcing each frame to belong to only one speaker.",

  "end-to-end": "End-to-end diarization predicts speaker-attributed activity directly, often using multi-label frame-level outputs or permutation-invariant objectives instead of a fully modular clustering pipeline."
};


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const web = document.querySelector(".mechanics-web");
const nodesContainer = document.getElementById("mechanicsNodes");
const svg = document.getElementById("mechanicsLines");

const topicPanel = document.getElementById("mechanicsTopicPanel");
const topicTitle = document.getElementById("mechanicsTopicTitle");
const topicText = document.getElementById("mechanicsTopicText");
const topicKicker = document.getElementById("mechanicsTopicKicker");


/* =========================================================
   RESPONSIVE POSITIONS
   ========================================================= */

function getPosition(node) {
  // Desktop: wide constellation layout.
  if (web.getBoundingClientRect().width > 800) {
    return { x: node.x, y: node.y };
  }

  // Mobile/tablet: arrange galaxies in separate horizontal bands.
  const mobile = {
    "asr": [50, 10],
    "ctc": [15, 4],
    "rnnt": [15, 16],
    "attention-asr": [50, 4],
    "llm-asr": [85, 4],
    "contextual-asr": [85, 16],

    "ssl": [50, 32],
    "wav2vec": [15, 26],
    "hubert": [50, 25],
    "wavlm": [85, 26],
    "data2vec": [15, 38],
    "xlsr": [50, 39],
    "masked-prediction": [85, 38],

    "sv": [50, 55],
    "speaker-embeddings": [15, 49],
    "aam": [50, 48],
    "phantom-aam": [85, 49],
    "scoring-backends": [25, 62],
    "et-morph": [75, 62],

    "diarization": [50, 79],
    "vad": [15, 73],
    "diar-embeddings": [50, 72],
    "clustering": [85, 73],
    "overlap": [25, 86],
    "end-to-end": [75, 86]
  };

  const point = mobile[node.id] || [node.x, node.y];

  return {
    x: point[0],
    y: point[1]
  };
}


/* =========================================================
   CREATE NODES
   ========================================================= */

function createNodes() {
  nodesContainer.innerHTML = "";

  nodes.forEach(node => {
    const position = getPosition(node);

    const element = document.createElement("button");

    element.type = "button";

    element.classList.add(
      "mechanics-node",
      node.type === "category" ? "category" : "topic",
      `family-${node.family}`
    );

    element.dataset.id = node.id;
    element.dataset.family = node.family;

    element.style.left = `${position.x}%`;
    element.style.top = `${position.y}%`;

    element.textContent = node.label;

    if (node.research) {
      element.classList.add("research-topic");
    }

    element.setAttribute(
      "aria-label",
      node.label.replace(" ★", "")
    );

    element.addEventListener("click", event => {
      event.stopPropagation();

      // CTC opens its dedicated learning page.
      if (node.href) {
        window.location.href = node.href;
        return;
      }

      showTopic(node.id);

      if (node.type === "category") {
        highlightNode(node.id);
      } else {
        highlightTopic(node.id);
      }
    });

    nodesContainer.appendChild(element);
  });
}


/* =========================================================
   NODE GEOMETRY
   ========================================================= */

function centerOf(element, webRect) {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2 - webRect.left,
    y: rect.top + rect.height / 2 - webRect.top
  };
}


function nodeEdgePoint(element, towardX, towardY, webRect) {
  const rect = element.getBoundingClientRect();

  const cx = rect.left + rect.width / 2 - webRect.left;
  const cy = rect.top + rect.height / 2 - webRect.top;

  const dx = towardX - cx;
  const dy = towardY - cy;

  if (!dx && !dy) {
    return { x: cx, y: cy };
  }

  const halfW = rect.width / 2;
  const halfH = rect.height / 2;

  const scale =
    1 / Math.max(
      Math.abs(dx) / halfW,
      Math.abs(dy) / halfH
    );

  return {
    x: cx + dx * scale,
    y: cy + dy * scale
  };
}


/* =========================================================
   DRAW GALAXY CONNECTIONS
   ========================================================= */

function drawConnections() {
  svg.innerHTML = "";

  const webRect = web.getBoundingClientRect();

  svg.setAttribute(
    "viewBox",
    `0 0 ${webRect.width} ${webRect.height}`
  );

  nodes.forEach(parent => {
    if (!parent.connections) return;

    const parentElement =
      nodesContainer.querySelector(
        `[data-id="${parent.id}"]`
      );

    if (!parentElement) return;

    const parentCenter = centerOf(parentElement, webRect);

    parent.connections.forEach(childId => {
      const child = nodes.find(item => item.id === childId);

      const childElement =
        nodesContainer.querySelector(
          `[data-id="${childId}"]`
        );

      if (!child || !childElement) return;

      const childCenter = centerOf(childElement, webRect);

      const start = nodeEdgePoint(
        parentElement,
        childCenter.x,
        childCenter.y,
        webRect
      );

      const end = nodeEdgePoint(
        childElement,
        parentCenter.x,
        parentCenter.y,
        webRect
      );

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

      line.classList.add(
        "mechanics-line",
        `family-${parent.family}`
      );

      line.dataset.parent = parent.id;
      line.dataset.child = childId;

      line.setAttribute("x1", start.x);
      line.setAttribute("y1", start.y);
      line.setAttribute("x2", end.x);
      line.setAttribute("y2", end.y);

      svg.appendChild(line);
    });
  });
}


/* =========================================================
   UPDATE CONNECTION POSITIONS
   ========================================================= */

function updateLinePositions() {
  if (!web || !svg) return;

  const webRect = web.getBoundingClientRect();

  svg.setAttribute(
    "viewBox",
    `0 0 ${webRect.width} ${webRect.height}`
  );

  svg.querySelectorAll(".mechanics-line").forEach(line => {
    const parentElement =
      nodesContainer.querySelector(
        `[data-id="${line.dataset.parent}"]`
      );

    const childElement =
      nodesContainer.querySelector(
        `[data-id="${line.dataset.child}"]`
      );

    if (!parentElement || !childElement) return;

    const parentCenter = centerOf(parentElement, webRect);
    const childCenter = centerOf(childElement, webRect);

    const start = nodeEdgePoint(
      parentElement,
      childCenter.x,
      childCenter.y,
      webRect
    );

    const end = nodeEdgePoint(
      childElement,
      parentCenter.x,
      parentCenter.y,
      webRect
    );

    line.setAttribute("x1", start.x);
    line.setAttribute("y1", start.y);
    line.setAttribute("x2", end.x);
    line.setAttribute("y2", end.y);
  });
}


/* =========================================================
   TOPIC INFORMATION PANEL
   ========================================================= */

function showTopic(id) {
  const node = nodes.find(item => item.id === id);

  if (!node) return;

  topicTitle.textContent = node.label.replace(" ★", "");

  topicText.textContent =
    descriptions[id] ||
    "This topic is part of the Discover Speech journey.";

  topicKicker.textContent =
    node.type === "category"
      ? "SPEECH AI GALAXY"
      : "SPEECH AI TOPIC";

  topicPanel.classList.add("visible");
}


/* =========================================================
   ACTIVE NODE AND CONNECTION HIGHLIGHTING
   ========================================================= */

function clearHighlight() {
  nodesContainer
    .querySelectorAll(".mechanics-node")
    .forEach(element => {
      element.classList.remove("active");
    });

  svg
    .querySelectorAll(".mechanics-line")
    .forEach(line => {
      line.classList.remove("active");
    });
}


function highlightNode(id) {
  clearHighlight();

  const parent =
    nodesContainer.querySelector(`[data-id="${id}"]`);

  if (parent) {
    parent.classList.add("active");
  }

  svg
    .querySelectorAll(
      `.mechanics-line[data-parent="${id}"]`
    )
    .forEach(line => {
      line.classList.add("active");
    });
}


function highlightTopic(id) {
  clearHighlight();

  const element =
    nodesContainer.querySelector(`[data-id="${id}"]`);

  if (element) {
    element.classList.add("active");
  }

  const parent = nodes.find(
    item =>
      item.connections &&
      item.connections.includes(id)
  );

  if (parent) {
    const category =
      nodesContainer.querySelector(
        `[data-id="${parent.id}"]`
      );

    if (category) {
      category.classList.add("active");
    }

    const line = svg.querySelector(
      `.mechanics-line[data-parent="${parent.id}"][data-child="${id}"]`
    );

    if (line) {
      line.classList.add("active");
    }
  }
}


/* =========================================================
   INITIALISATION
   ========================================================= */

function initialise() {
  if (!web || !nodesContainer || !svg) return;

  createNodes();

  requestAnimationFrame(() => {
    drawConnections();

    requestAnimationFrame(() => {
      updateLinePositions();
    });
  });
}


/* =========================================================
   RESPONSIVE RESIZE
   Rebuild node positions when switching desktop/mobile.
   ========================================================= */

let previousMobileLayout =
  web.getBoundingClientRect().width <= 800;

window.addEventListener("resize", () => {
  requestAnimationFrame(() => {
    const mobileLayout =
      web.getBoundingClientRect().width <= 800;

    if (mobileLayout !== previousMobileLayout) {
      previousMobileLayout = mobileLayout;

      createNodes();
      drawConnections();
    }

    updateLinePositions();
  });
});


/* =========================================================
   START
   ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initialise
  );
} else {
  initialise();
}
