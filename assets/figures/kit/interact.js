/* Interaction: redrawing, randomness, stepping, sampling, animation, checking.
 *
 * The layer that makes a figure *do* something over time or in response to the
 * reader, as opposed to drawing a state. Everything here is built on the native
 * controls in `controls.js`, which is deliberate: **a composite control is a
 * rearrangement of accessible primitives, not a new interaction**. A stepper is a
 * slider and two buttons; an animation is a slider over time and a play button. A
 * reader who needs the keyboard, or a screen reader, or reduced motion, is served by
 * the primitives rather than by a parallel implementation.
 */

import { button, field, slider } from "./controls.js";

/**
 * Run `draw` whenever any control changes, and once now.
 *
 * Every figure does this by hand, and doing it by hand is how a figure ends up
 * drawing only after the first `input` event — the image point that appeared only
 * once the slider moved.
 */
export function react(controls, draw, options = {}) {
  const { initial = true } = options;
  const list = [controls].flat().filter(Boolean);
  for (const control of list) control.addEventListener("input", draw);
  for (const control of list) control.addEventListener("change", draw);
  // `initial: false` for a control whose change is a *side effect* rather than a
  // redraw — a slider that takes a new random sample must not take one on load,
  // and the faithful wiring is `react(slider, render, { initial: false })` plus
  // its own listener for the sample.
  if (initial) draw();
  return list;
}

/** Tell `react()` a composite control has changed, through the one path it listens to. */
export function notify(control) {
  control.dispatchEvent(new Event("input", { bubbles: true }));
  control.dispatchEvent(new Event("change", { bubbles: true }));
}

/**
 * A deterministic random number generator.
 *
 * **Why seeded rather than `Math.random`.** Three reasons, and the first is the one
 * that matters:
 *
 *   * a figure that samples must be **reproducible**, or two readers comparing what
 *     they saw are comparing different data. The collection's Tier-2 rule already
 *     requires determinism for a committed sweep; randomness in a figure is the same
 *     requirement;
 *   * `check-figure-kit.cjs` and `tests/test_figure_browser.py` cannot assert anything
 *     about a figure whose data changes on every load;
 *   * a reader who wants another sample should get one on purpose, not by accident.
 *
 * One module in 209 uses `Math.random`, so this is not a retrofit — it is the
 * primitive that makes sampling figures and generated practice possible at all.
 *
 * ```js
 * const rng = seed(7);
 * rng.int(1, 6);          // a die, reproducible from 7
 * rng.pick(["a", "b"]);   // one of them
 * rng.shuffle([1, 2, 3]); // a new order
 * ```
 */
export function seed(number = 1) {
  let state = (Number(number) >>> 0) || 1;
  const next = () => {
    // mulberry32: 32 bits of state, uniform enough for a textbook, and identical on
    // every engine because it uses only integer ops.
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    /** An integer in `[low, high]`, both ends included. */
    int: (low, high) => low + Math.floor(next() * (high - low + 1)),
    /** One element, uniformly. */
    pick: (items) => items[Math.floor(next() * items.length)],
    /** A new array in a new order; the input is not modified. */
    shuffle: (items) => {
      const out = items.slice();
      for (let i = out.length - 1; i > 0; i -= 1) {
        const j = Math.floor(next() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
    /** A normal deviate, by the sum of twelve uniforms. */
    normal: (mean = 0, deviation = 1) => {
      let total = 0;
      for (let i = 0; i < 12; i += 1) total += next();
      return mean + (total - 6) * deviation;
    },
  };
}

/**
 * A procedure the reader advances one step at a time.
 *
 * Four modules hand-build this and two of them are the most useful figures in the
 * Irish books — Kruskal beside Prim, and Dijkstra settlement by settlement. What they
 * share is the shape: a list of steps, a drawing per step, and a sentence of
 * narration. Long division, a compass construction, an induction proof, Gaussian
 * elimination and a nuclear decay chain are the same shape.
 *
 * The returned control **is the step slider**, with `.index` and `.go()` attached, so
 * `react(stepper, draw)` and `stepper.index` work like any other control. Prev and
 * Next move the slider and `notify()` it, so there is one change path and no way for
 * the buttons and the slider to disagree.
 *
 * @param {object} o
 * @param {Array<{text: string}>} o.steps  the narration, one per step
 * @param {string} [o.label]  the visible label for the step control
 * @returns {HTMLInputElement & {index: number, go: Function, text: string}}
 */
export function stepper(parent, { steps = [], label = "Step", id = "step", value = 0 } = {}) {
  const last = Math.max(0, steps.length - 1);
  const input = slider(parent, {
    id,
    label,
    min: 0,
    max: last,
    step: 1,
    value: Math.min(value, last),
    show: true,
  });
  Object.defineProperty(input, "index", { get: () => Number(input.value) });
  Object.defineProperty(input, "text", { get: () => (steps[input.index] || {}).text || "" });
  input.go = (n) => {
    const next = Math.max(0, Math.min(last, Math.round(Number(n))));
    if (next === input.index) return;
    input.value = String(next);
    notify(input);
  };
  button(parent, { label: "◀ Back", name: "Previous step", onClick: () => input.go(input.index - 1) });
  button(parent, { label: "Next ▶", name: "Next step", onClick: () => input.go(input.index + 1) });
  return input;
}

/**
 * A small table of values, beside the drawing that shows the same numbers.
 *
 * One module in 209 builds a table, and the topics that want one are everywhere — a
 * sequence and its differences, a probability distribution, grouped frequency, an
 * input-output table, a set of readings. **Table → rule → graph → formula** is the
 * same figure with a different highlight, and this is the missing quarter of it.
 *
 * A real `<table>` with a `<caption>` and `<th scope="col">`, because it is tabular
 * data and a screen reader should be able to say so.
 *
 * @returns {HTMLTableElement & {update: Function}} `update(rows, highlight)` swaps the
 *   body without rebuilding the table, so a highlight can follow a slider cheaply.
 */
export function table(parent, { columns = [], rows = [], caption = "", highlight = -1, id = "" } = {}) {
  const el = document.createElement("table");
  el.className = "fig-table";
  if (id) el.id = id;
  el.style.cssText = "border-collapse:collapse;margin:.6rem 0 0;font-size:.95em";
  if (caption) {
    const cap = document.createElement("caption");
    cap.textContent = caption;
    cap.style.cssText = "text-align:left;padding-bottom:.25rem";
    el.append(cap);
  }
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  for (const column of columns) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = column;
    th.style.cssText = "text-align:right;padding:.15rem .6rem;border-bottom:1px solid currentColor";
    headRow.append(th);
  }
  head.append(headRow);
  el.append(head);
  const body = document.createElement("tbody");
  el.append(body);
  el.update = (nextRows = rows, nextHighlight = highlight) => {
    body.replaceChildren();
    nextRows.forEach((cells, index) => {
      const tr = document.createElement("tr");
      // The highlight follows the slider, and it is not the only signal: the row's
      // own cells are marked up so the value is readable rather than merely shaded.
      if (index === nextHighlight) tr.className = "fig-row-active";
      cells.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = String(cell);
        td.style.cssText = "text-align:right;padding:.15rem .6rem";
        tr.append(td);
      });
      body.append(tr);
    });
  };
  el.update(rows, highlight);
  (parent.querySelector(".fig-controls") || parent).append(el);
  return el;
}

/**
 * A process shown in time, with a scrubber and a stopping point.
 *
 * Nothing in the collection animates, and the one measurement the project has
 * (`research/design/background-effects.md`) found that the *looks-free* CSS
 * animation was the worst citizen on the page — 180 ms/s of main-thread time on an
 * idle one — while an explicit render loop idled below it. So motion here is an
 * explicit loop, and it **stops**.
 *
 * The design rule is that every animation must also work as a still. Two things
 * enforce it. `onFrame(t)` is called for any `t`, so the scrubber reaches every frame
 * a reader could want; and when the reader has asked for reduced motion the loop does
 * not start, the scrubber is placed on `still` (the end state by default), and the
 * figure is complete without moving.
 *
 * @param {object} o
 * @param {(t: number) => void} o.onFrame  draws the frame at `t` in `[0, 1]`
 * @param {number} [o.duration]  milliseconds for one pass; default 5000
 * @param {number} [o.still]  the frame to show when motion is off; default 1
 * @param {boolean} [o.loop]  default false, so the figure comes to rest
 * @returns {{scrub: HTMLInputElement, play: HTMLButtonElement, stop: Function}}
 */
export function animate(parent, { onFrame, duration = 5000, label = "Time", still = 1, loop = false } = {}) {
  const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrub = slider(parent, {
    id: "t",
    label,
    min: 0,
    max: 1,
    step: 0.01,
    value: reduced ? still : 0,
    show: false,
    name: `${label}, 0 to 1`,
    format: (v) => v.toFixed(2),
  });
  let frame = null;
  let playing = false;
  const play = button(parent, {
    label: "Play",
    name: "Play the animation",
    pressed: false,
    onClick: () => {
      if (playing) {
        stop();
        return false;
      }
      start();
      return true;
    },
  });

  function stop() {
    playing = false;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    play.textContent = "Play";
    play.setAttribute("aria-pressed", "false");
  }

  function start() {
    // Reduced motion is honoured by not starting, but the button still works:
    // asking for motion explicitly is not the same as being given it.
    playing = true;
    play.textContent = "Pause";
    play.setAttribute("aria-pressed", "true");
    const from = Number(scrub.value) >= 1 ? 0 : Number(scrub.value);
    const began = performance.now();
    const tick = (now) => {
      if (!playing) return;
      const t = Math.min(1, from + (now - began) / duration);
      scrub.value = String(t);
      onFrame(t);
      if (t >= 1 && !loop) {
        stop();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  // A hidden tab should not be computing frames nobody can see — the same finding
  // that made the page backgrounds opt-in.
  const onVisibility = () => {
    if (document.hidden) stop();
  };
  document.addEventListener("visibilitychange", onVisibility);
  scrub.addEventListener("input", () => {
    stop();
    onFrame(Number(scrub.value));
  });
  onFrame(Number(scrub.value));
  return { scrub, play, stop };
}

/**
 * Compare a reader's answer with the answer the bank already proved.
 *
 * The collection's promise is that **a computer checks every answer**, and the
 * problem-bank verifier does that at build time against the CAS. This is the reader's
 * side of the same promise, and it is deliberately narrow: it compares what the
 * reader typed with the value CI already proved, so nothing new is being claimed.
 *
 * It is **not** an algebra engine and must not become one. A numeric comparison with
 * a tolerance, and a normalised string comparison for a short exact answer, is the
 * whole contract. The moment it tries to decide whether two expressions are
 * equivalent it needs a CAS, and that is a different project.
 *
 * Four outcomes, and the distinction between the last two is the one that matters to
 * a reader: **wrong** is a mistake worth thinking about, **invalid** is a typing
 * problem that needs no thought. Reporting a unit or a stray letter as "wrong"
 * teaches the wrong thing.
 *
 * @param {string|number} given  what the reader typed
 * @param {object} o
 * @param {string|number} o.answer  the value the bank holds
 * @param {number} [o.tolerance]  absolute tolerance for a numeric answer; default 0,
 *   which means "the number they wrote is the number the bank holds"
 * @param {string} [o.unit]  a unit to strip from the reader's answer, so `6.0 N` is
 *   accepted where the answer is `6.0` and the unit is on the label
 * @returns {{state: "empty"|"invalid"|"correct"|"wrong", expected: string}}
 */
export function check(given, { answer, tolerance = 0, unit = "" } = {}) {
  const expected = String(answer ?? "");
  let text = String(given ?? "").trim();
  if (!text) return { state: "empty", expected };

  // `6.0 N`, `6.0N` and `6.0 newtons` are all the answer `6.0` with its unit written
  // down, and a reader who writes the unit is being careful, not wrong.
  if (unit) text = text.replace(new RegExp(`\\s*${unit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i"), "");

  const number = (s) => {
    let cleaned = s.replace(/[,\s]/g, "").replace(/−/g, "-").replace(/\$/g, "");
    if (!cleaned) return null;
    // A fraction is a legitimate way to write a fraction, and `2/3` is how a reader
    // answers a probability question. Only a simple `a/b` of two numbers is evaluated:
    // this is not an expression parser, and a check is not the place to become one.
    const fraction = /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/.exec(cleaned);
    if (fraction) {
      const denominator = Number(fraction[2]);
      if (denominator === 0) return null;
      cleaned = String(Number(fraction[1]) / denominator);
    }
    const value = Number(cleaned);
    return Number.isFinite(value) ? value : null;
  };
  const givenNumber = number(text);
  const expectedNumber = number(expected);

  if (tolerance > 0) {
    if (givenNumber === null || expectedNumber === null) return { state: "invalid", expected };
    return { state: Math.abs(givenNumber - expectedNumber) <= tolerance ? "correct" : "wrong", expected };
  }

  // A non-numeric answer is only "invalid" when the answer is a number. Where both
  // sides are words — "acute", "undirected" — they are compared as words.
  if (expectedNumber !== null && givenNumber === null) return { state: "invalid", expected };

  const normalise = (s) =>
    s
      .replace(/[,\s]/g, "")
      .replace(/−/g, "-")
      .replace(/[×x]/gi, "*")
      .replace(/\$/g, "")
      .toLowerCase();
  if (normalise(text) === normalise(expected)) return { state: "correct", expected };
  if (givenNumber !== null && expectedNumber !== null) {
    return {
      state: Number(givenNumber.toFixed(6)) === Number(expectedNumber.toFixed(6)) ? "correct" : "wrong",
      expected,
    };
  }
  return { state: "wrong", expected };
}

/**
 * A field, a Check button, and the verdict in the figure's live readout.
 *
 * The composition that makes `check()` usable without every module re-deciding how a
 * verdict is announced. The readout is the panel's, so it is already a polite live
 * region and the verdict is spoken; the verdict is also written in words, never by
 * colour alone.
 */
export function answerBox(parent, { answer, tolerance = 0, unit = "", label = "Your answer", readout, placeholder = "", id = "answer" } = {}) {
  const input = field(parent, {
    id,
    label,
    name: label,
    type: "text",
    placeholder,
    inputmode: "decimal",
  });
  const verify = () => {
    const result = check(input.value, { answer, tolerance, unit });
    const said = {
      empty: "Type an answer first.",
      invalid: "That does not look like a number. Check what you typed.",
      correct: "Correct.",
      wrong: "Not yet. Try again, or check the method.",
    }[result.state];
    if (readout) {
      readout.textContent =
        result.state === "wrong" ? `${said} The answer is ${result.expected}${unit ? ` ${unit}` : ""}.` : said;
    }
    return result.state === "correct";
  };
  button(parent, { label: "Check", name: "Check my answer", onClick: verify });
  return { input, verify };
}

/**
 * Remember something small in the reader's own browser.
 *
 * The relevance prompt is meant to "recur, revisit, and be stored client-side"
 * (`research/pedagogy.md` P3) and is currently prose that goes nowhere. This is the
 * storage, and it is deliberately the whole of it: one key, JSON, and a silent
 * failure. A reader in private mode, or with storage disabled, gets a figure that
 * works and forgets rather than a figure that breaks.
 */
export function remember(key, fallback = null) {
  const read = () => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  };
  return {
    get: read,
    set(value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    clear() {
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* storage is not available, and that is not an error worth surfacing */
      }
    },
  };
}
