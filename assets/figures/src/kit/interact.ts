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
import type { ButtonOptions, SliderOptions } from "./controls.js";

/**
 * The options a function in this layer takes.
 *
 * Real TypeScript types, not JSDoc: a `@param` on a destructured binding with a
 * default is silently ignored, because the default supplies the type and the
 * annotation never applies. `label()` in `text.js` is the worked example.
 */
export type ReactOptions = {
  /** `false` for a control whose change is a side effect rather than a redraw. */
  initial?: boolean;
};

/** One step of a procedure: a line of narration. */
export type Step = { text: string };

/** The options `stepper()` takes. */
export type StepperOptions = {
  /** The narration, one entry per step. */
  steps?: Step[];
  /** The visible label for the step control. */
  label?: string;
  id?: string;
  /** The step to start on. */
  value?: number;
};

/** The slider `stepper()` returns: a range input that is also the step index. */
export type StepperElement = HTMLInputElement & {
  readonly index: number;
  readonly text: string;
  go: (step: number) => void;
};

/** The options `table()` takes. */
export type TableOptions = {
  /** The column headings. */
  columns?: string[];
  /** The body, one array of cells per row. */
  rows?: Array<Array<string | number>>;
  caption?: string;
  /** The row to mark, as the slider follows it; -1 for none. */
  highlight?: number;
  id?: string;
};

/** The table `table()` returns, which can swap its body without rebuilding. */
export type TableElement = HTMLTableElement & {
  update: (rows?: Array<Array<string | number>>, highlight?: number) => void;
};

/** The options `animate()` takes. */
export type AnimateOptions = {
  /** Draws the frame at `t` in `[0, 1]`. Required: an animation must draw. */
  onFrame: (t: number) => void;
  /** Milliseconds for one pass. */
  duration?: number;
  /** The scrubber's visible label. */
  label?: string;
  /** The frame to show when motion is off. */
  still?: number;
  /** `true` to come round again instead of resting at the end. */
  loop?: boolean;
};

/** The options `check()` takes. */
export type CheckOptions = {
  /** The value the bank already proved. */
  answer?: string | number;
  /** Absolute tolerance for a numeric answer; 0 means exact. */
  tolerance?: number;
  /** A unit to strip from the reader's answer. */
  unit?: string;
};

/** What `check()` decides, and the answer it compared against. */
export type Verdict = {
  state: "empty" | "invalid" | "correct" | "wrong";
  expected: string;
};

/** The options `answerBox()` takes. */
export type AnswerBoxOptions = CheckOptions & {
  label?: string;
  /** The panel's live readout, where the verdict is announced. */
  readout?: HTMLElement | null;
  placeholder?: string;
  id?: string;
};

/** One generated question, and the function that writes it. */
export type ExerciseKind = {
  id: string;
  build: (rng: RandomSource) => {
    text: string;
    answer: string | number;
    tolerance?: number;
    unit?: string;
  };
};

/** The options `exercise()` and `practice()` take. */
export type ExerciseOptions = {
  /** The generators to draw from. */
  kinds?: ExerciseKind[];
  /** The seed; the same seed gives the same question. */
  seed?: number;
  /** Restrict to one kind, for a page that has one. */
  only?: string;
};

/** The options `practice()` takes. */
export type PracticeOptions = ExerciseOptions & {
  /** The panel's live readout, where the verdict is announced. */
  readout?: HTMLElement | null;
  /** The panel's caption, where the question goes. */
  caption?: HTMLElement | null;
  label?: string;
  nextLabel?: string;
};

/** The state of one generated question. */
export type ExerciseState = {
  id: string;
  text: string;
  answer: string;
  tolerance: number;
  unit: string;
  /** The index of the question, which is also its seed. */
  at: number;
  count: number;
};

/** What `exercise()` returns: the current question, and how to move on. */
export type Exercise = {
  readonly id: string;
  readonly text: string;
  readonly answer: string;
  readonly tolerance: number;
  readonly unit: string;
  readonly at: number;
  next: (nextSeed?: number) => ExerciseState;
};

/**
 * Run `draw` whenever any control changes, and once now.
 *
 * Every figure does this by hand, and doing it by hand is how a figure ends up
 * drawing only after the first `input` event — the image point that appeared only
 * once the slider moved.
 */
export function react(
  controls: HTMLElement | HTMLElement[],
  draw: () => void,
  options: ReactOptions = {},
): HTMLElement[] {
  const { initial = true } = options;
  const list = ([controls] as HTMLElement[]).flat().filter(Boolean);
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
export function notify(control: HTMLElement): void {
  control.dispatchEvent(new Event("input", { bubbles: true }));
  control.dispatchEvent(new Event("change", { bubbles: true }));
}

/**
 * What `seed()` returns: a reproducible source of numbers.
 *
 * Declared as an interface so `exercise()` can name it without depending on the
 * function's inferred type, which is the shape a caller only sees after the fact.
 */
export type RandomSource = {
  next: () => number;
  /** An integer in `[low, high]`, both ends included. */
  int: (low: number, high: number) => number;
  /** One element, uniformly. */
  pick: <T>(items: T[]) => T;
  /** A new array in a new order; the input is not modified. */
  shuffle: <T>(items: T[]) => T[];
  /** A normal deviate, by the sum of twelve uniforms. */
  normal: (mean?: number, deviation?: number) => number;
};

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
export function seed(number = 1): RandomSource {
  let state = (Number(number) >>> 0) || 1;
  const next = (): number => {
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
export function stepper(parent: HTMLElement, { steps = [], label = "Step", id = "step", value = 0 }: StepperOptions = {}): StepperElement {
  const last = Math.max(0, steps.length - 1);
  const input = slider(parent, {
    id,
    label,
    min: 0,
    max: last,
    step: 1,
    value: Math.min(value, last),
    show: true,
  }) as StepperElement;
  Object.defineProperty(input, "index", { get: () => Number(input.value) });
  Object.defineProperty(input, "text", { get: () => (steps[input.index] || {}).text || "" });
  input.go = (n: number) => {
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
export function table(
  parent: HTMLElement,
  { columns = [], rows = [], caption = "", highlight = -1, id = "" }: TableOptions = {},
): TableElement {
  const el = document.createElement("table") as TableElement;
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
    nextRows.forEach((cells: Array<string | number>, index: number) => {
      const tr = document.createElement("tr");
      // The highlight follows the slider, and it is not the only signal: the row's
      // own cells are marked up so the value is readable rather than merely shaded.
      if (index === nextHighlight) tr.className = "fig-row-active";
      cells.forEach((cell: string | number) => {
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
export function animate(
  parent: HTMLElement,
  { onFrame, duration = 5000, label = "Time", still = 1, loop = false }: AnimateOptions = {} as AnimateOptions,
): { scrub: HTMLInputElement; play: HTMLButtonElement; stop: () => void } {
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
  } as ButtonOptions);

  function stop(): void {
    playing = false;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    play.textContent = "Play";
    play.setAttribute("aria-pressed", "false");
  }

  function start(): void {
    // Reduced motion is honoured by not starting, but the button still works:
    // asking for motion explicitly is not the same as being given it.
    playing = true;
    play.textContent = "Pause";
    play.setAttribute("aria-pressed", "true");
    const from = Number(scrub.value) >= 1 ? 0 : Number(scrub.value);
    const began = performance.now();
    const tick = (now: number): void => {
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
export function check(given: string | number, { answer, tolerance = 0, unit = "" }: CheckOptions = {}): Verdict {
  const expected = String(answer ?? "");
  let text = String(given ?? "").trim();
  if (!text) return { state: "empty", expected };

  // `6.0 N`, `6.0N` and `6.0 newtons` are all the answer `6.0` with its unit written
  // down, and a reader who writes the unit is being careful, not wrong.
  if (unit) text = text.replace(new RegExp(`\\s*${unit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i"), "");

  const number = (s: string): number | null => {
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

  const normalise = (s: string): string =>
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
export function answerBox(
  parent: HTMLElement,
  {
    answer,
    tolerance = 0,
    unit = "",
    label = "Your answer",
    readout,
    placeholder = "",
    id = "answer",
  }: AnswerBoxOptions = {},
): { input: HTMLInputElement; verify: () => boolean } {
  const input = field(parent, {
    id,
    label,
    name: label,
    type: "text",
    placeholder,
    inputmode: "decimal",
  });
  const verify = (): boolean => {
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

/** What `remember()` returns: one key, read, written and cleared. */
export type Remembered = {
  get: () => unknown;
  set: (value: unknown) => boolean;
  clear: () => void;
};

/**
 * Remember something small in the reader's own browser.
 *
 * The relevance prompt is meant to "recur, revisit, and be stored client-side"
 * (`research/pedagogy.md` P3) and is currently prose that goes nowhere. This is the
 * storage, and it is deliberately the whole of it: one key, JSON, and a silent
 * failure. A reader in private mode, or with storage disabled, gets a figure that
 * works and forgets rather than a figure that breaks.
 */
export function remember(key: string, fallback: unknown = null): Remembered {
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

/**
 * A generated question, with the answer that belongs to it.
 *
 * **The honest limit, stated first.** The problem-bank verifier proves every banked
 * answer at build time against a CAS. A generated question cannot be proved that way —
 * there is no bank — so this is a *different* claim: the answer is computed by the same
 * function that wrote the question, so the two cannot disagree. That is internal
 * consistency, not independent verification, and a page that uses it must not say
 * "checked by a computer".
 *
 * What makes it trustworthy anyway is that the *generator* is checked: a template whose
 * `answer` is a function of the parameters it drew is testable by generating a thousand
 * and asserting the invariants a reader would check by hand. `tests/test_figure_kit_pure.py`
 * does exactly that for the kinds the collection ships.
 *
 * @param {object} o
 * @param {Array<{id: string, build: (rng: object) => {text, answer, tolerance?, unit?}}>} o.kinds
 * @param {number} [o.seed]  the seed; the same seed gives the same question
 * @param {string} [o.only]  restrict to one kind, for a page that has one
 * @returns {{id: string, text: string, answer: string, tolerance: number, unit: string,
 *   next: Function, at: number}}
 */
export function exercise({ kinds = [], seed: start = 1, only }: ExerciseOptions = {}): Exercise {
  const usable = only ? kinds.filter((kind) => kind.id === only) : kinds;
  if (!usable.length) throw new Error("exercise: no kinds to generate from");
  const state = { id: "", text: "", answer: "", tolerance: 0, unit: "", at: start, count: 0 };

  const take = (index: number) => {
    const rng = seed(index);
    const kind = usable[index % usable.length];
    const built = kind.build(rng);
    state.id = kind.id;
    state.text = built.text;
    state.answer = String(built.answer);
    state.tolerance = built.tolerance ?? 0;
    state.unit = built.unit ?? "";
    state.count = index;
    return state;
  };

  const api = {
    get id() { return state.id; },
    get text() { return state.text; },
    get answer() { return state.answer; },
    get tolerance() { return state.tolerance; },
    get unit() { return state.unit; },
    get at() { return state.at; },
    /** Step to the next question. Passing a seed jumps to that one, which is how a
     *  reader shares "question 7" with someone else. */
    next(nextSeed?: number) {
      state.at = nextSeed === undefined ? state.at + 1 : nextSeed;
      return take(state.at);
    },
  };
  take(state.at);
  return api;
}

/**
 * Endless practice: a generated question, a box, a Check and a Next.
 *
 * The widget the collection has never had. It is `exercise()` and `answerBox()`
 * composed, so the page has to write nothing but the generators, and it is built on
 * native controls so the keyboard and the screen reader are served by the primitives.
 *
 * The question goes in the panel's `caption` — a place the frame already has for a line
 * of the figure's own prose — and the verdict goes in the live readout.
 *
 * @returns {{exercise: object, input: HTMLElement, verify: Function, next: Function}}
 */
export function practice(
  parent: HTMLElement,
  {
    kinds = [],
    seed = 1,
    only,
    readout,
    caption,
    label = "Your answer",
    nextLabel = "Another question",
  }: PracticeOptions = {},
): { exercise: Exercise; input: HTMLInputElement; verify: () => boolean } {
  const quiz = exercise({ kinds, seed, only });
  const holder = document.createElement("p");
  holder.className = "fig-question";
  holder.style.cssText = "margin:.2rem 0 .5rem";
  if (caption) caption.replaceChildren();
  const target = caption || holder;
  if (!caption) (parent.querySelector(".fig-controls") || parent).append(holder);

  // The field and the Check are built here rather than through `answerBox()`, because
  // `answerBox` brings its own Check button — and composing the two produced a widget
  // with two of them, which the browser check caught.
  const input = field(parent, { id: "answer", label, name: label, type: "text", inputmode: "decimal" });

  const show = (): void => {
    target.textContent = quiz.text;
    input.value = "";
  };

  const verify = (): boolean => {
    const result = check(input.value, { answer: quiz.answer, tolerance: quiz.tolerance, unit: quiz.unit });
    const said = {
      empty: "Type an answer first.",
      invalid: "That does not look like a number. Check what you typed.",
      correct: "Correct.",
      wrong: "Not yet. Try again, or work through the method.",
    }[result.state];
    if (readout) {
      readout.textContent =
        result.state === "wrong" ? `${said} The answer is ${result.expected}${quiz.unit ? ` ${quiz.unit}` : ""}.` : said;
    }
    return result.state === "correct";
  };
  button(parent, { label: "Check", name: "Check my answer", onClick: verify });
  button(parent, {
    label: nextLabel,
    name: "Show me another question",
    onClick: () => {
      quiz.next();
      show();
      if (readout) readout.textContent = "A new question. Work it out before you check.";
      return true;
    },
  });
  show();
  return { exercise: quiz, input, verify };
}
