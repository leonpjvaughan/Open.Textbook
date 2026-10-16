/* The controls: sliders, switches, choices, buttons and text fields.
 *
 * Every control here obeys the same contract, which is what lets `react()` bind any
 * of them without knowing what they are:
 *
 *   * it is a **native** element — `<input>`, `<select>`, `<button>`, `<textarea>` —
 *     so the keyboard, the screen reader and the platform's own behaviour all work
 *     without being rebuilt;
 *   * it has a visible label **and** an accessible name, and the two can differ when
 *     the accessible one should say more;
 *   * it has a `.value` a module can read, and it fires `input` and `change` when the
 *     value moves — including the composite ones, so `react(control, draw)` is all a
 *     module ever writes.
 *
 * The panel and its grid come from `frame.js`; nothing here decides layout.
 */

import { UI_FONT } from "./frame.js";

/** Where a control goes: the panel's control column if the parent was a panel. */
function mount(parent, holder) {
  (parent.querySelector(".fig-controls") || parent).append(holder);
}

/**
 * A slider, with a visible label and an accessible name.
 *
 * @returns {HTMLInputElement} the input, ready to read `.value` from.
 */
export function slider(parent, options = {}) {
  const {
    id = "",
    label = "",
    // A module whose slider had no value displayed gains one, which changes what
    // the reader sees. `show: false` keeps the previous behaviour; `unit` puts a
    // unit after the number, which is why "200 ohm" does not have to live in the
    // label.
    show = true,
    unit = "",
    // The accessible name, when it should say more than the visible label. A
    // distinct, more descriptive name was being replaced by the shorter visible
    // one.
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
  const paint = () => {
    // The raw value, not `fmt`: a slider's value is whatever its `step` produced, so
    // it is already clean, and rounding it to a fixed number of places would
    // truncate a `step="0.001"` control at 3.14159 to 3.1416.
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
export function toggle(parent, options = {}) {
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
export function chooser(parent, options = {}) {
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
    option.value = choice.value;
    option.textContent = choice.label;
    select.append(option);
  }
  if (value !== undefined) select.value = String(value);
  holder.append(select);
  mount(parent, holder);
  return select;
}

/**
 * A button. The kit's one control that is an **action** rather than a value.
 *
 * Ten of the 209 modules build a `<button>` themselves and four of those set
 * `aria-pressed`, which is the right thing and was re-derived each time. A button
 * does not fire `input` or `change`, so it is bound with `onClick` rather than
 * `react()`.
 *
 * @param {object} o
 * @param {string} [o.pressed]  give it a boolean to get a **toggle button** —
 *   `aria-pressed` follows `onClick`'s return value, or the `pressed` property set by
 *   the caller. Without it the button is an action.
 * @returns {HTMLButtonElement}
 */
export function button(parent, { id = "", label = "", name = "", onClick, pressed } = {}) {
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
 * A `<select>` is right when the list is long or unfamiliar. It is wrong for two to
 * four named alternatives, where the reader should see all of them at once: a
 * transformation, a sign convention, a model, a method. Radios in a `<fieldset>` give
 * that, and the arrow keys move within the group natively.
 *
 * The returned `<fieldset>` carries a **`.value`**, set like a `<select>`'s, so
 * `react(fieldset, draw)` and `fieldset.value` work exactly as they do for the other
 * controls. Without that the kit would have two binding idioms and a module would
 * have to know which it held.
 */
export function segmented(parent, { id = "", label = "", name = "", choices = [], value } = {}) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "fig-control fig-segmented";
  fieldset.style.cssText = `${UI_FONT};border:0;margin:0;padding:0`;
  if (id) fieldset.classList.add(id);
  const legend = document.createElement("legend");
  legend.textContent = label;
  legend.style.cssText = `${UI_FONT};padding:0`;
  fieldset.append(legend);
  const groupName = name || id || `fig-seg-${Math.random().toString(36).slice(2, 8)}`;
  const inputs = [];
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
    get: () => (fieldset.querySelector("input:checked") || inputs[0] || { value: "" }).value,
    set: (next) => {
      for (const input of inputs) input.checked = String(input.value) === String(next);
    },
  });
  mount(parent, fieldset);
  return fieldset;
}

/**
 * A text or number field.
 *
 * The kit had no way to take an answer, which is why nothing in the collection can
 * ask a reader to *produce* a value rather than read one. `inputmode` matters on a
 * phone: `decimal` brings up the number pad, and without it a reader types a minus
 * sign on a full keyboard.
 */
export function field(parent, { id = "", label = "", name = "", type = "text", value = "", placeholder = "", inputmode } = {}) {
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
export function textarea(parent, { id = "", label = "", name = "", rows = 3, value = "", placeholder = "" } = {}) {
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
