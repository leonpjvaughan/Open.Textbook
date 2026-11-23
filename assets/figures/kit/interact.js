// @ts-nocheck
import { button, field, slider } from "./controls.js";
export function react(controls, draw, options = {}) {
  const { initial = true } = options;
  const list = [controls].flat().filter(Boolean);
  for (const control of list) control.addEventListener("input", draw);
  for (const control of list) control.addEventListener("change", draw);
  if (initial) draw();
  return list;
}
export function notify(control) {
  control.dispatchEvent(new Event("input", { bubbles: true }));
  control.dispatchEvent(new Event("change", { bubbles: true }));
}
export function seed(number = 1) {
  let state = Number(number) >>> 0 || 1;
  const next = () => {
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
  button(parent, {
    label: "◀ Back",
    name: "Previous step",
    onClick: () => input.go(input.index - 1),
  });
  button(parent, { label: "Next ▶", name: "Next step", onClick: () => input.go(input.index + 1) });
  return input;
}
/**
 * @returns {HTMLTableElement & {update: Function}} `update(rows, highlight)` swaps the
 *   body without rebuilding the table, so a highlight can follow a slider cheaply.
 */
export function table(
  parent,
  { columns = [], rows = [], caption = "", highlight = -1, id = "" } = {},
) {
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
 * @param {object} o
 * @param {(t: number) => void} o.onFrame  draws the frame at `t` in `[0, 1]`
 * @param {number} [o.duration]  milliseconds for one pass; default 5000
 * @param {number} [o.still]  the frame to show when motion is off; default 1
 * @param {boolean} [o.loop]  default false, so the figure comes to rest
 * @returns {{scrub: HTMLInputElement, play: HTMLButtonElement, stop: Function}}
 */
export function animate(
  parent,
  { onFrame, duration = 5000, label = "Time", still = 1, loop = false } = {},
) {
  const reduced =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
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
export function check(given, { answer, tolerance = 0, unit = "" } = {}) {
  const expected = String(answer ?? "");
  let text = String(given ?? "").trim();
  if (!text) return { state: "empty", expected };
  if (unit)
    text = text.replace(
      new RegExp(`\\s*${unit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i"),
      "",
    );
  const number = (s) => {
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
    return {
      state: Math.abs(givenNumber - expectedNumber) <= tolerance ? "correct" : "wrong",
      expected,
    };
  }
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
      state:
        Number(givenNumber.toFixed(6)) === Number(expectedNumber.toFixed(6)) ? "correct" : "wrong",
      expected,
    };
  }
  return { state: "wrong", expected };
}
export function answerBox(
  parent,
  {
    answer,
    tolerance = 0,
    unit = "",
    label = "Your answer",
    readout,
    placeholder = "",
    id = "answer",
  } = {},
) {
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
        result.state === "wrong"
          ? `${said} The answer is ${result.expected}${unit ? ` ${unit}` : ""}.`
          : said;
    }
    return result.state === "correct";
  };
  button(parent, { label: "Check", name: "Check my answer", onClick: verify });
  return { input, verify };
}
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
      } catch {}
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
export function exercise({ kinds = [], seed: start = 1, only } = {}) {
  const usable = only ? kinds.filter((kind) => kind.id === only) : kinds;
  if (!usable.length) throw new Error("exercise: no kinds to generate from");
  const state = { id: "", text: "", answer: "", tolerance: 0, unit: "", at: start, count: 0 };
  const take = (index) => {
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
    get id() {
      return state.id;
    },
    get text() {
      return state.text;
    },
    get answer() {
      return state.answer;
    },
    get tolerance() {
      return state.tolerance;
    },
    get unit() {
      return state.unit;
    },
    get at() {
      return state.at;
    },
    next(nextSeed) {
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
  parent,
  {
    kinds = [],
    seed = 1,
    only,
    readout,
    caption,
    label = "Your answer",
    nextLabel = "Another question",
  } = {},
) {
  const quiz = exercise({ kinds, seed, only });
  const holder = document.createElement("p");
  holder.className = "fig-question";
  holder.style.cssText = "margin:.2rem 0 .5rem";
  if (caption) caption.replaceChildren();
  const target = caption || holder;
  if (!caption) (parent.querySelector(".fig-controls") || parent).append(holder);
  const input = field(parent, {
    id: "answer",
    label,
    name: label,
    type: "text",
    inputmode: "decimal",
  });
  const show = () => {
    target.textContent = quiz.text;
    input.value = "";
  };
  const verify = () => {
    const result = check(input.value, {
      answer: quiz.answer,
      tolerance: quiz.tolerance,
      unit: quiz.unit,
    });
    const said = {
      empty: "Type an answer first.",
      invalid: "That does not look like a number. Check what you typed.",
      correct: "Correct.",
      wrong: "Not yet. Try again, or work through the method.",
    }[result.state];
    if (readout) {
      readout.textContent =
        result.state === "wrong"
          ? `${said} The answer is ${result.expected}${quiz.unit ? ` ${quiz.unit}` : ""}.`
          : said;
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
