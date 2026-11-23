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
  initial?: boolean;
};

export type Step = { text: string };

export type StepperOptions = {
  steps?: Step[];
  label?: string;
  id?: string;
  value?: number;
};

export type StepperElement = HTMLInputElement & {
  readonly index: number;
  readonly text: string;
  go: (step: number) => void;
};

export type TableOptions = {
  columns?: string[];
  rows?: Array<Array<string | number>>;
  caption?: string;
  highlight?: number;
  id?: string;
};

export type TableElement = HTMLTableElement & {
  update: (rows?: Array<Array<string | number>>, highlight?: number) => void;
};

export type AnimateOptions = {
  onFrame: (t: number) => void;
  duration?: number;
  label?: string;
  still?: number;
  loop?: boolean;
};

export type CheckOptions = {
  answer?: string | number;
  /** Absolute tolerance for a numeric answer; 0 means exact. */
  tolerance?: number;
  unit?: string;
};

export type Verdict = {
  state: "empty" | "invalid" | "correct" | "wrong";
  expected: string;
};

export type AnswerBoxOptions = CheckOptions & {
  label?: string;
  readout?: HTMLElement | null;
  placeholder?: string;
  id?: string;
};

export type ExerciseKind = {
  id: string;
  build: (rng: RandomSource) => {
    text: string;
    answer: string | number;
    tolerance?: number;
    unit?: string;
  };
};

export type ExerciseOptions = {
  kinds?: ExerciseKind[];
  seed?: number;
  only?: string;
};

export type PracticeOptions = ExerciseOptions & {
  readout?: HTMLElement | null;
  caption?: HTMLElement | null;
  label?: string;
  nextLabel?: string;
};

export type ExerciseState = {
  id: string;
  text: string;
  answer: string;
  tolerance: number;
  unit: string;
  at: number;
  count: number;
};

export type Exercise = {
  readonly id: string;
  readonly text: string;
  readonly answer: string;
  readonly tolerance: number;
  readonly unit: string;
  readonly at: number;
  next: (nextSeed?: number) => ExerciseState;
};

export function react(
  controls: HTMLElement | HTMLElement[],
  draw: () => void,
  options: ReactOptions = {},
): HTMLElement[] {
  const { initial = true } = options;
  const list = ([controls] as HTMLElement[]).flat().filter(Boolean);
  for (const control of list) control.addEventListener("input", draw);
  for (const control of list) control.addEventListener("change", draw);
  if (initial) draw();
  return list;
}

export function notify(control: HTMLElement): void {
  control.dispatchEvent(new Event("input", { bubbles: true }));
  control.dispatchEvent(new Event("change", { bubbles: true }));
}

export type RandomSource = {
  next: () => number;
  int: (low: number, high: number) => number;
  pick: <T>(items: T[]) => T;
  shuffle: <T>(items: T[]) => T[];
  normal: (mean?: number, deviation?: number) => number;
};

export function seed(number = 1): RandomSource {
  let state = (Number(number) >>> 0) || 1;
  const next = (): number => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    int: (low, high) => low + Math.floor(next() * (high - low + 1)),
    pick: (items) => items[Math.floor(next() * items.length)],
    shuffle: (items) => {
      const out = items.slice();
      for (let i = out.length - 1; i > 0; i -= 1) {
        const j = Math.floor(next() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
    normal: (mean = 0, deviation = 1) => {
      let total = 0;
      for (let i = 0; i < 12; i += 1) total += next();
      return mean + (total - 6) * deviation;
    },
  };
}

/**
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
  let frame: number | null = null;
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

  if (unit) text = text.replace(new RegExp(`\\s*${unit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i"), "");

  const number = (s: string): number | null => {
    let cleaned = s.replace(/[,\s]/g, "").replace(/−/g, "-").replace(/\$/g, "");
    if (!cleaned) return null;
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

export type Remembered = {
  get: () => unknown;
  set: (value: unknown) => boolean;
  clear: () => void;
};

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
      }
    },
  };
}

/**
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
    next(nextSeed?: number) {
      state.at = nextSeed === undefined ? state.at + 1 : nextSeed;
      return take(state.at);
    },
  };
  take(state.at);
  return api;
}

/**
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
