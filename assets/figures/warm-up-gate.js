// A gate on the Warm-up's answers: write your own first, then look.
//
// Every *Practise with help* page opens with closed-book recall, and the answers sit in a
// `<details>` a reader can open before thinking. That is not recall, it is reading.
// `research/pedagogy.md` says retrieval is the most secure recommendation it makes, and a
// reveal a reader can take without trying removes the retrieval.
//
// So the answers stay where they are and the gate goes in front of them. The reader
// writes their answers, presses the button, and the `<details>` opens.
//
// **No score and no storage.** This does not mark anything and keeps nothing: the module
// cannot know whether an answer is right, because the answers in the page are prose with
// their reasons attached ("56. If you used 7 x 7 = 49 and added one more 7, that also
// works"). A gate that pretended to mark would be worse than no gate. What it can do is
// make the reader commit before they look, which is the whole of the retrieval.
//
// With scripting off the `<details>` works exactly as it did, so nothing is lost.
import { UI_FONT, button, panel, textarea } from "./kit.js";

/**
 * The answers this warm-up hides: the last `<details>` before the figure.
 *
 * Found by **document order** rather than by walking siblings. The renderer may wrap
 * the figure — it did, in a `<p>`, until the hook emitted a block element — and a
 * sibling walk breaks the moment the wrapper changes. `compareDocumentPosition` asks
 * the question that is actually meant: which `<details>` comes before me?
 */
function answersBefore(el) {
  let found = null;
  for (const details of document.querySelectorAll("details")) {
    if (details.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) {
      found = details;
    }
  }
  return found;
}

export function mount(el) {
  const answers = answersBefore(el);
  if (!answers) {
    // Nothing to gate. Saying so is better than rendering a control that does nothing,
    // because the next author to mount this on a page with no `<details>` will see it.
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

  // The gate. `toggle` fires after `open` has already changed, so closing it again is
  // what keeps the answers hidden — there is no way to disable a `<details>`.
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

  // A reader who has already opened the answers in this session should not be gated
  // again on the next visit to the page, but the page is rebuilt on every load, so
  // there is nothing to carry. `committed` is per page view, deliberately: the point is
  // to make the reader think once, not to lock a page.
  readout.textContent = "";
  attempt.style.cssText += `;${UI_FONT}`;
}
