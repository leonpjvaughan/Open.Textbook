// Tier-1 guided investigation: the laws of indices, with a fresh question every time.
//
// This is the first figure in the collection that changes what a reader **does** rather
// than what they see: it generates a question, takes an answer, checks it, and offers
// another. The page asks the reader to use the index laws, and a fixed set of questions
// can be memorised — a generated one cannot.
//
// **The honest limit.** Every banked answer in this collection is proved by a CAS at
// build time. A generated answer cannot be, so this claims something different and
// weaker: the answer is computed by the same function that wrote the question, so the
// two cannot disagree. The *generator* is what is checked — 300 seeds at a time, in
// `node tools/dist/cli.js kit-pure` — and the page must not say "checked by a
// computer".
//
// The question is written in **plain text**, not LaTeX: the maths hook runs at build
// time, so `$...$` a module injects at runtime would reach the reader as dollar signs.
// A generated question uses the symbols a reader would type.
//
// Nothing here carries a colour. The question is prose, the field is a native input and
// the verdict is words.
import { practice, panel } from "./kit.js";

// Every kind draws its parameters and states the answer in terms of them, so the two
// cannot drift apart.
const KINDS = [
  {
    id: "multiply",
    build(rng) {
      const base = rng.pick([2, 3, 5, 10]);
      const m = rng.int(2, 5);
      const n = rng.int(2, 4);
      return { text: `Work out ${base}^${m} × ${base}^${n}.`, answer: base ** (m + n) };
    },
  },
  {
    id: "divide",
    build(rng) {
      const base = rng.pick([2, 3, 5]);
      const n = rng.int(1, 3);
      const m = n + rng.int(1, 3);
      return { text: `Work out ${base}^${m} ÷ ${base}^${n}.`, answer: base ** (m - n) };
    },
  },
  {
    id: "power",
    build(rng) {
      const base = rng.pick([2, 3, 5]);
      const m = rng.int(2, 3);
      const n = rng.int(2, 3);
      return { text: `Work out (${base}^${m})^${n}.`, answer: base ** (m * n) };
    },
  },
  {
    id: "zero",
    build(rng) {
      const base = rng.int(2, 12);
      return { text: `Write down the value of ${base}^0.`, answer: 1 };
    },
  },
];

export function mount(el) {
  const { readout, caption } = panel(el, {
    label: "A question about the laws of indices, with a box to answer it and a box to check it",
    drawing: false,
    prompt: "",
  });
  // A figure that draws nothing still needs something said before the reader works: the
  // three beats are prose in the page, so this only has to introduce the question.
  caption.style.cssText = `${caption.style.cssText};font-weight:600`;
  practice(el, { kinds: KINDS, seed: 1, readout, caption, label: "Your answer" });
  readout.textContent = "Work it out with the index laws, then check. The question changes when you ask for another.";
}
