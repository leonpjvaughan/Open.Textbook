/* The controls: sliders, switches, choices, buttons and text fields.
 *
 * Every control here obeys the same contract, so `react()` can bind any of them
 * without knowing what it holds: a **native** element, a visible label and an
 * accessible name, a `.value`, and `input`/`change` when the value moves. Layout
 * comes from `frame.js`.
 */

import { UI_FONT } from "./frame.js";

/** Where a control goes: the panel's control column if the parent was a panel. */
function mount(parent: HTMLElement, holder: HTMLElement): void {
  (parent.querySelector(".fig-controls") || parent).append(holder);
}

/**
 * The options a slider takes.
 *
 * A TypeScript type: a `@param` on a destructured binding with a default is silently
 * ignored, and `tsc` strips the annotation when it emits.
 */
export type SliderOptions = {
  /** The input's `class`, and the stem of its readout's. */
  id?: string;
  /** The visible label. */
  label?: string;
  /** `false` for a slider with no number beside it. */
  show?: boolean;
  /** A unit after the number, rather than in the label. */
  unit?: string;
  /** The accessible name, when it should say more than the visible label. */
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  /** The starting value; the minimum by default. */
  value?: number;
  /** How the readout is formatted; the raw value by default. */
  format?: (value: number) => string;
};

/** The options a checkbox takes. */
export type ToggleOptions = {
  id?: string;
  label?: string;
  name?: string;
  checked?: boolean;
};

/** One entry in a list of alternatives, for `chooser()` and `segmented()`. */
export type Choice = { value: string | number; label: string };

/** The options a drop-down takes. */
export type ChooserOptions = {
  id?: string;
  label?: string;
  name?: string;
  choices?: Choice[];
  /** The chosen value; the first option by default. */
  value?: string | number;
};

/** The options a button takes. */
export type ButtonOptions = {
  id?: string;
  label?: string;
  name?: string;
  /**
   * What the click does. A boolean return value moves the button's `aria-pressed`,
   * which is how a toggle button stays a value rather than becoming a new idiom.
   */
  onClick?: (event?: Event) => unknown;
  /** Give it a boolean to get a **toggle button** rather than an action. */
  pressed?: boolean;
};

/** The options a text field takes. */
export type FieldOptions = {
  id?: string;
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  /** `decimal` brings up the number pad on a phone. */
  inputmode?: string;
};

/** The options a multi-line field takes. */
export type TextareaOptions = {
  id?: string;
  label?: string;
  name?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
};

/** One part of a `builder()`'s palette. */
export type BuilderPart = { id: string; label: string };

/** The options a builder takes. */
export type BuilderOptions = {
  id?: string;
  label?: string;
  name?: string;
  parts?: BuilderPart[];
  /** The parts already added, in order. */
  value?: string[];
  /** The most the reader may add; 0 means no limit. */
  max?: number;
};

/** One key on a `notate()` keypad. */
export type NotateKey = { text: string; name?: string };

/** The options a keypad takes. */
export type NotateOptions = {
  /** The field the keys insert into. Required: a keypad with no field types nowhere. */
  input?: HTMLInputElement | HTMLTextAreaElement | null;
  label?: string;
  keys?: NotateKey[];
};

/**
 * A slider, with a visible label and an accessible name.
 *
 * @returns {HTMLInputElement} the input, ready to read `.value` from.
 */
export function slider(parent: HTMLElement, options: SliderOptions = {}): HTMLInputElement {
  const {
    id = "",
    label = "",
    // A module whose slider had no value displayed gains one, which changes what the
    // reader sees; `show: false` keeps the old behaviour. `unit` keeps it out of the label.
    show = true,
    unit = "",
    // The accessible name, when it should say more than the visible label.
    name = "",
    min = 0,
    max = 1,
    step = 1,
    value = min,
    format,
  } = options;
  const holder = document.createElement("label");
  holder.className = "fig-control";
  holder.style.cssText = UI_FONT;
  holder.textContent = label ? `${label} ` : "";

  const input = document.createElement("input");
  input.type = "range";
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  if (id) input.className = id;
  input.setAttribute("aria-label", name || label || id);

  if (!show) {
    holder.append(input);
    mount(parent, holder);
    return input;
  }

  const out = document.createElement("output");
  out.className = id ? `${id}-out` : "fig-out";
  const paint = (): void => {
    // The raw value, not `fmt`: a slider's value is whatever its `step` produced, and
    // rounding it would truncate a `step="0.001"` control to four places.
    const number = format ? format(Number(input.value)) : input.value;
    out.textContent = unit ? `${number} ${unit}` : number;
  };

  holder.append(input, out);
  mount(parent, holder);
  input.addEventListener("input", paint);
  paint();
  return input;
}

/** A checkbox, with a visible label and an accessible name. */
export function toggle(parent: HTMLElement, options: ToggleOptions = {}): HTMLInputElement {
  const { id = "", label = "", name = "", checked = false } = options;
  const holder = document.createElement("label");
  holder.className = "fig-control";
  holder.style.cssText = UI_FONT;
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  if (id) input.className = id;
  input.setAttribute("aria-label", name || label || id);
  holder.append(input, document.createTextNode(label ? ` ${label}` : ""));
  mount(parent, holder);
  return input;
}

/** A drop-down, with a visible label and an accessible name. */
export function chooser(parent: HTMLElement, options: ChooserOptions = {}): HTMLSelectElement {
  const { id = "", label = "", name = "", choices = [], value } = options;
  const holder = document.createElement("label");
  holder.className = "fig-control";
  holder.style.cssText = UI_FONT;
  holder.textContent = label ? `${label} ` : "";
  const select = document.createElement("select");
  if (id) select.className = id;
  select.setAttribute("aria-label", name || label || id);
  for (const choice of choices) {
    const option = document.createElement("option");
    option.value = String(choice.value);
    option.textContent = choice.label;
    select.append(option);
  }
  if (value !== undefined) select.value = String(value);
  holder.append(select);
  mount(parent, holder);
  return select;
}

/**
 * The options `button()` takes, for the compiled copy.
 *
 * `tsc` strips the annotations when it emits, so `kit/controls.js` needs this to type
 * `button()` for the `.js` modules. The TypeScript type above is what this file is
 * checked against.
 *
 * @typedef {object} ButtonOptions
 * @property {string} [id]
 * @property {string} [label]  the visible words
 * @property {string} [name]  the accessible name, when it should say more
 * @property {(event?: Event) => unknown} [onClick]  a boolean return moves `aria-pressed`
 * @property {boolean} [pressed]  give it a boolean to get a **toggle button**
 */

/**
 * A button. The kit's one control that is an **action** rather than a value.
 *
 * A button fires no `input` or `change`, so it is bound with `onClick` rather than
 * `react()`. **`@type` rather than `@param`**, because a `@param` cannot name a
 * destructured parameter: it reports a missing name and falls back to the defaults,
 * which loses `onClick`.
 *
 * @type {(parent: HTMLElement, options?: ButtonOptions) => HTMLButtonElement}
 */
export function button(parent: HTMLElement, { id = "", label = "", name = "", onClick, pressed }: ButtonOptions = {}): HTMLButtonElement {
  const holder = document.createElement("span");
  holder.className = "fig-control";
  holder.style.cssText = UI_FONT;
  const el = document.createElement("button");
  el.type = "button";
  if (id) el.className = id;
  el.textContent = label;
  el.setAttribute("aria-label", name || label || id);
  if (pressed !== undefined) el.setAttribute("aria-pressed", String(Boolean(pressed)));
  if (onClick) {
    el.addEventListener("click", (event) => {
      const state = onClick(event);
      if (pressed !== undefined && typeof state === "boolean") {
        el.setAttribute("aria-pressed", String(state));
      }
    });
  }
  holder.append(el);
  mount(parent, holder);
  return el;
}

/**
 * A row of mutually exclusive choices — the "alternative" form.
 *
 * A `<select>` is right for a long or unfamiliar list, and wrong for two to four named
 * alternatives the reader should see at once. Radios in a `<fieldset>` give that, and
 * the arrow keys move within the group natively.
 *
 * The returned `<fieldset>` carries a **`.value`**, set like a `<select>`'s, so
 * `react(fieldset, draw)` and `fieldset.value` work as for every other control.
 */
export function segmented(
  parent: HTMLElement,
  { id = "", label = "", name = "", choices = [], value }: ChooserOptions = {},
): HTMLFieldSetElement & { value: string } {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "fig-control fig-segmented";
  fieldset.style.cssText = `${UI_FONT};border:0;margin:0;padding:0`;
  if (id) fieldset.classList.add(id);
  const legend = document.createElement("legend");
  legend.textContent = label;
  legend.style.cssText = `${UI_FONT};padding:0`;
  fieldset.append(legend);
  const groupName = name || id || `fig-seg-${Math.random().toString(36).slice(2, 8)}`;
  const inputs: HTMLInputElement[] = [];
  for (const choice of choices) {
    const item = document.createElement("label");
    item.className = "fig-segment";
    item.style.cssText = `${UI_FONT};display:inline-flex;align-items:center;gap:.25rem;margin-right:.6rem`;
    const input = document.createElement("input");
    input.type = "radio";
    input.name = groupName;
    input.value = String(choice.value);
    input.checked = value !== undefined && String(value) === String(choice.value);
    input.setAttribute("aria-label", choice.label);
    item.append(input, document.createTextNode(choice.label));
    fieldset.append(item);
    inputs.push(input);
  }
  // Read and write like a `<select>`, so `react()` and a module's own code have one
  // shape to learn.
  Object.defineProperty(fieldset, "value", {
    get: () =>
      (fieldset.querySelector("input:checked") as HTMLInputElement | null || inputs[0] || { value: "" }).value,
    set: (next) => {
      for (const input of inputs) input.checked = String(input.value) === String(next);
    },
  });
  mount(parent, fieldset);
  return fieldset as HTMLFieldSetElement & { value: string };
}

/**
 * A text or number field.
 *
 * `inputmode` matters on a phone: `decimal` brings up the number pad, and without it
 * a reader types a minus sign on a full keyboard.
 */
export function field(parent: HTMLElement, { id = "", label = "", name = "", type = "text", value = "", placeholder = "", inputmode }: FieldOptions = {}): HTMLInputElement {
  const holder = document.createElement("label");
  holder.className = "fig-control";
  holder.style.cssText = UI_FONT;
  holder.textContent = label ? `${label} ` : "";
  const input = document.createElement("input");
  input.type = type;
  input.value = String(value);
  if (id) input.className = id;
  if (placeholder) input.placeholder = placeholder;
  input.setAttribute("aria-label", name || label || id);
  input.style.cssText = `${UI_FONT};max-width:8rem`;
  if (inputmode) input.setAttribute("inputmode", inputmode);
  else if (type === "number") input.setAttribute("inputmode", "decimal");
  holder.append(input);
  mount(parent, holder);
  return input;
}

/** A multi-line field, for the reader's own writing. */
export function textarea(
  parent: HTMLElement,
  { id = "", label = "", name = "", rows = 3, value = "", placeholder = "" }: TextareaOptions = {},
): HTMLTextAreaElement {
  const holder = document.createElement("label");
  holder.className = "fig-control";
  holder.style.cssText = `${UI_FONT};grid-column:1 / -1;display:block`;
  if (label) {
    const span = document.createElement("span");
    span.textContent = label;
    holder.append(span);
  }
  const input = document.createElement("textarea");
  input.rows = rows;
  input.value = String(value);
  if (id) input.className = id;
  if (placeholder) input.placeholder = placeholder;
  input.setAttribute("aria-label", name || label || id);
  input.style.cssText = `${UI_FONT};width:100%;margin-top:.25rem`;
  holder.append(input);
  mount(parent, holder);
  return input;
}

/** The element a builder returns: a `div` that reads and writes like a control. */
export type BuilderElement = HTMLDivElement & {
  /** The part ids, in the order they were added. */
  value: string[];
  reset: (next?: string[]) => void;
};

/**
 * A builder: a palette of parts the reader adds to an assembly.
 *
 * The same shape fits a circuit, a tree diagram, a Venn region, a prime-factor tree,
 * a net folding into a solid, a nuclear equation, and a proof assembled from reasons:
 * a set of parts, a way to add and remove them, and a drawing that follows.
 *
 * **It assembles, and the module validates.** Whether the assembly is *right* is the
 * page's lesson, so `builder()` never judges. The container carries a `.value` — the
 * part ids in the order they were added — so `react(container, draw)` works as for
 * any other control.
 *
 * The parts are buttons with `aria-pressed`, so adding and removing is one key each
 * and a screen reader announces the state.
 *
 * @param {object} o
 * @param {Array<{id: string, label: string}>} o.parts
 * @param {string[]} [o.value]  the parts already added, in order
 * @param {number} [o.max]  the most the reader may add; 0 means no limit
 * @returns {HTMLElement & {value: string[], reset: Function}}
 */
export function builder(
  parent: HTMLElement,
  { id = "build", label = "", name = "", parts = [], value = [], max = 0 }: BuilderOptions = {},
): BuilderElement {
  const holder = document.createElement("div") as BuilderElement;
  holder.className = "fig-control fig-builder";
  holder.style.cssText = `${UI_FONT};grid-column:1 / -1`;
  if (id) holder.classList.add(id);

  if (label) {
    const heading = document.createElement("p");
    heading.textContent = label;
    heading.style.cssText = `${UI_FONT};margin:0 0 .25rem`;
    holder.append(heading);
  }

  const row = document.createElement("div");
  row.style.cssText = "display:flex;flex-wrap:wrap;gap:.35rem";
  const order = value.slice();
  const buttons = new Map<string, HTMLButtonElement>();

  const announce = () => {
    // **Do not assign `holder.value` here.** Its setter resets and notifies, so doing
    // it inside the notify recurses until the stack runs out. The getter reads `order`.
    for (const [partId, button] of buttons) {
      const on = order.includes(partId);
      button.setAttribute("aria-pressed", String(on));
      button.dataset.count = String(order.filter((x) => x === partId).length);
    }
    // `input` and `change`, dispatched here rather than imported from `interact.js`:
    // that module imports this one, so the dependency only goes one way.
    holder.dispatchEvent(new Event("input", { bubbles: true }));
    holder.dispatchEvent(new Event("change", { bubbles: true }));
  };

  for (const part of parts) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = part.label;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", part.label);
    button.style.cssText = UI_FONT;
    button.addEventListener("click", () => {
      if (max && order.length >= max) return;
      order.push(part.id);
      announce();
    });
    buttons.set(part.id, button);
    row.append(button);
  }

  const undo = document.createElement("button");
  undo.type = "button";
  undo.textContent = "Undo";
  undo.setAttribute("aria-label", "Remove the last part");
  undo.style.cssText = UI_FONT;
  undo.addEventListener("click", () => {
    order.pop();
    announce();
  });
  row.append(undo);
  holder.append(row);

  holder.reset = (next = []) => {
    order.length = 0;
    order.push(...next);
    announce();
  };
  Object.defineProperty(holder, "value", { get: () => order.slice(), set: (next) => holder.reset(next) });
  mount(parent, holder);
  announce();
  return holder;
}

/**
 * A small mathematics keypad, for typing an answer on a phone.
 *
 * `x^2` and `3/4` are awkward on a phone keyboard, and a formula editor such as
 * `mathlive` (5.6 MB unpacked) would be the project's largest dependency. Each key
 * inserts plain text at the caret and fires `input`, so the receiver is still an
 * ordinary text field and the checker still reads a string. It deliberately does not
 * render the mathematics — the maths hook does that at build time.
 */
export function notate(parent: HTMLElement, { input, label = "", keys }: NotateOptions = {}): HTMLDivElement {
  if (!input) throw new Error("notate: an input is required, because the keypad inserts into one");
  const holder = document.createElement("div");
  holder.className = "fig-control fig-notate";
  holder.style.cssText = `${UI_FONT};grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:.25rem;margin-top:.25rem`;
  if (label) holder.setAttribute("aria-label", label);

  const KEYS = keys || [
    { text: "/", name: "fraction bar" },
    { text: "^", name: "power" },
    { text: "(", name: "open bracket" },
    { text: ")", name: "close bracket" },
    { text: "−", name: "minus" },
    { text: "π", name: "pi" },
    { text: "√", name: "root" },
    { text: "°", name: "degrees" },
  ];

  for (const key of KEYS) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = key.text;
    button.setAttribute("aria-label", `Insert ${key.name || key.text}`);
    button.style.cssText = `${UI_FONT};min-width:2.2rem`;
    button.addEventListener("click", () => {
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? start;
      input.value = input.value.slice(0, start) + key.text + input.value.slice(end);
      const caret = start + key.text.length;
      input.focus();
      if (input.setSelectionRange) input.setSelectionRange(caret, caret);
      // `input` rather than `change`: a keypad press is a value the moment it lands.
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    holder.append(button);
  }
  mount(parent, holder);
  return holder;
}
