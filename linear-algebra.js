/* =========================================================
   LINEAR ALGEBRA — Sequential Learning Ladder
   Add your topics to the `topics` array in the order you want.
   Each item can have: title, subtitle, description, href.
   ========================================================= */

const topics = [
  // Example structure (replace with your actual topics):
  // {
  //   title: "Vectors",
  //   subtitle: "Representation, magnitude and direction",
  //   description: "A short introduction to vectors and their operations.",
  //   href: "Linear-Algebra/vectors.html"
  // }
];

const pathContainer = document.getElementById("linearAlgebraPath");
const topicTitle = document.getElementById("laTopicTitle");
const topicDescription = document.getElementById("laTopicDescription");
const topicKicker = document.getElementById("laTopicKicker");
const topicLink = document.getElementById("laTopicLink");

function showTopic(index) {
  const topic = topics[index];
  if (!topic) return;

  document.querySelectorAll(".la-step").forEach((step, i) => {
    step.classList.toggle("is-active", i === index);
    step.setAttribute("aria-pressed", i === index ? "true" : "false");
  });

  topicKicker.textContent = `STEP ${String(index + 1).padStart(2, "0")}  /  LINEAR ALGEBRA`;
  topicTitle.textContent = topic.title;
  topicDescription.textContent = topic.description || topic.subtitle || "";

  if (topic.href) {
    topicLink.href = topic.href;
    topicLink.hidden = false;
  } else {
    topicLink.hidden = true;
    topicLink.removeAttribute("href");
  }
}

function renderPath() {
  pathContainer.innerHTML = "";

  if (!topics.length) {
    const empty = document.createElement("div");
    empty.className = "la-empty-state";
    empty.textContent = "Your learning ladder will appear here once the topics are added.";
    pathContainer.appendChild(empty);
    return;
  }

  topics.forEach((topic, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "la-step";
    button.setAttribute("aria-pressed", "false");

    const number = document.createElement("span");
    number.className = "la-step-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const copy = document.createElement("span");
    copy.className = "la-step-copy";

    const title = document.createElement("span");
    title.className = "la-step-title";
    title.textContent = topic.title;

    copy.appendChild(title);

    if (topic.subtitle) {
      const subtitle = document.createElement("span");
      subtitle.className = "la-step-subtitle";
      subtitle.textContent = topic.subtitle;
      copy.appendChild(subtitle);
    }

    const mark = document.createElement("span");
    mark.className = "la-step-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = "→";

    button.append(number, copy, mark);
    button.addEventListener("click", () => showTopic(index));
    pathContainer.appendChild(button);
  });

  showTopic(0);
}

renderPath();
