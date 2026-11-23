import { UI_FONT, button, panel, textarea } from "./kit.js";

/**
 * @param {HTMLElement} el  the figure's mount point, in document order
 * @returns {HTMLDetailsElement | null} the answers, or `null` when the page has none
 */
function answersBefore(el) {
  /** @type {HTMLDetailsElement | null} */
  let found = null;
  for (const details of document.querySelectorAll("details")) {
    if (details.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) {
      found = details;
    }
  }
  return found;
}

/** @param {HTMLElement} el  what the figure is mounted into */
export function mount(el) {
  const answers = answersBefore(el);
  if (!answers) {
    el.textContent = "Warm-up gate: no answers block found before this figure.";
    return;
  }

  const { readout } = panel(el, {
    drawing: false,
    prompt: "Write your answers first. Then check them.",
  });

  const attempt = textarea(el, {
    id: "warm-up-answers",
    label: "Your answers",
    name: "Your answers to the warm-up questions above",
    rows: 2,
    placeholder: "Just the numbers is enough.",
  });

  let committed = false;

  answers.addEventListener("toggle", () => {
    if (answers.open && !committed) {
      answers.open = false;
      readout.textContent = "Write your answers first, then press the button.";
    }
  });

  const reveal = button(el, {
    id: "warm-up-reveal",
    label: "Show the answers",
    name: "Show the answers to the warm-up questions",
    onClick: () => {
      if (!attempt.value.trim() && !committed) {
        readout.textContent =
          "Write something first — even one of the answers. The point is to try before you look.";
        attempt.focus();
        return;
      }
      committed = true;
      answers.open = true;
      readout.textContent = "Compare yours with these. Where they differ, work out which is right.";
      answers.scrollIntoView({ block: "nearest" });
    },
  });
  reveal.setAttribute("type", "button");

  readout.textContent = "";
  attempt.style.cssText += `;${UI_FONT}`;
}
