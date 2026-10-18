// The reader's own answer to the chapter's relevance prompt, kept so they can read it
// back.
//
// `research/pedagogy.md` P3 asks the relevance prompt to "recur, revisit, and be stored
// client-side". It recurred and was not stored: a reader who wrote three paragraphs over
// a chapter had no way to read them again, so the prompt was an exercise rather than a
// record. This is the storage.
//
// **The prompt itself stays prose in the page.** That is deliberate. A reader with
// scripting off still meets the question and can still answer it in a notebook; what
// this adds is the keeping, not the asking. Putting the prompt in an attribute would
// have made the question itself depend on JavaScript.
//
// The storage key is the page's own path, so it needs no per-chapter plumbing and two
// chapters cannot collide. A book is self-contained and a reader may read several, and
// the path already names both.
import { button, panel, remember, textarea } from "./kit.js";

/** Where a chapter's answer is kept. The path is unique per chapter per book. */
function keyFor() {
  return `textbook:relevance:${window.location.pathname}`;
}

/** @param {HTMLElement} el  what the figure is mounted into */
export function mount(el) {
  // The panel's own readout is the status line, and that is not a detail: it carries
  // `aria-live="polite"`, so "Saved" reaches a screen reader. A `<p>` written here
  // instead would look the same and say nothing.
  const { readout, caption } = panel(el, {
    // No drawing, so no accessible name for one. A figure that draws nothing and is
    // named as an image hides its own text from a screen reader.
    drawing: false,
    prompt: "Write your answer below. It is kept in this browser, and you can change it later.",
  });

  const store = remember(keyFor(), null);
  const earlier = store.get();

  const answer = textarea(el, {
    id: "relevance-answer",
    label: "Your answer",
    name: "Your answer to the relevance question above",
    rows: 4,
    value: earlier && typeof earlier === "object" ? earlier.text || "" : "",
    placeholder: "Two or three sentences is plenty.",
  });

  /**
   * What the reader is told, which is about *their* answer and not about saving.
   *
   * @param {boolean} saved  whether the store took the answer
   */
  function describe(saved) {
    if (saved) return "Saved in this browser. Only you can see it.";
    return "This browser is not keeping your answer, so copy it somewhere if it matters.";
  }

  function describeEarlier() {
    if (!(earlier && earlier.text)) return "";
    const when = earlier.at ? new Date(earlier.at) : null;
    const stamp = when && !Number.isNaN(when.getTime()) ? when.toLocaleDateString() : "earlier";
    return (
      `You wrote this on ${stamp}. Read it back: has your answer changed? ` +
      "Change it if it has, or leave it as it is."
    );
  }

  caption.textContent = describeEarlier();

  const save = () => {
    readout.textContent = describe(store.set({ text: answer.value, at: new Date().toISOString() }));
  };

  answer.addEventListener("input", save);
  answer.addEventListener("change", save);

  if (earlier && earlier.text) {
    const clear = button(el, {
      id: "relevance-clear",
      label: "Start again",
      name: "Clear your answer and start again",
      onClick: () => {
        store.clear();
        answer.value = "";
        caption.textContent = "";
        readout.textContent = "Your earlier answer has been removed from this browser.";
      },
    });
    clear.setAttribute("type", "button");
  }

  // A reader who returns to a chapter they have answered should see it, not an empty box
  // they have to guess about.
  readout.textContent = describeEarlier() ? describe(true) : "";
}
