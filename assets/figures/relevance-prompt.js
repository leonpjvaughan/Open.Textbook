import { button, panel, remember, textarea } from "./kit.js";

function keyFor() {
  return `textbook:relevance:${window.location.pathname}`;
}

/** @param {HTMLElement} el  what the figure is mounted into */
export function mount(el) {
  const { readout, caption } = panel(el, {
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

  readout.textContent = describeEarlier() ? describe(true) : "";
}
