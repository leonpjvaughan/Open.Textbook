/* Dragging: moving a thing on the drawing.
 *
 * **The design rule, and it is enforced rather than documented.** A draggable handle
 * must not be the only way to reach its value, because a pointer is not a keyboard. So
 * `draggable()` *requires* a backing control — the range input that is the accessible
 * source of truth — and treats the pointer as an enhancement on top of it:
 *
 *   * the **control** is the value, and it is focusable, labelled and keyboard-driven
 *     because it is a native `<input type="range">`;
 *   * the **handle** is a pointer target that writes to that control and notifies it,
 *     so there is one change path and the two cannot disagree;
 *   * the handle gets **no** `tabindex` of its own, so a reader tabbing through the
 *     figure meets one focus stop per value rather than two that do the same thing.
 *
 * Ten of the 209 modules already handle a pointer event and every one of them is
 * keyboard-reachable only because it *also* offers a slider. That accident is the
 * rule here: it is now a contract, and `draggable()` throws without a control rather
 * than quietly shipping an unreachable figure.
 *
 * What it is for: moving a point on a scatter graph, a vertex of a triangle, the
 * boundary on a number line, a quartile on a box plot, a force vector. Ten modules
 * want it and no kit helper existed.
 */

import { notify } from "./interact.js";

/**
 * The options `draggable()` takes.
 *
 * A real TypeScript type rather than JSDoc: a `@param` on a destructured binding with
 * a default is silently ignored, so `{ cursor = "grab" } = {}` would leave every other
 * option typed `{}`. `label()` in `text.js` is the worked example.
 */
export type DragOptions = {
  /**
   * **Required** — the range input that holds the value and provides the keyboard
   * path. The pointer writes to it.
   */
  control?: HTMLInputElement | null;
  /** The drawing surface, for the coordinate transform. Required. */
  svg?: SVGSVGElement | null;
  /** Map a viewBox point to a value. The caller owns this because it owns the geometry. */
  toValue?: (point: { x: number; y: number }) => number;
  /** Called after the value changes, or just use `react()` instead. */
  onMove?: (value: number) => void;
  /** The pointer cursor; `grab` by default. */
  cursor?: string;
};

/** What `draggable()` returns: a way to remove the listeners. */
export type DragControl = { destroy: () => void };

/**
 * A point in the drawing's own viewBox coordinates.
 *
 * The drawing scales with the panel, so a pointer's screen position is not a viewBox
 * position. `getScreenCTM()` is the mapping the browser already maintains, and its
 * inverse is the only correct way to undo it — the alternative, dividing by the
 * rendered width and multiplying by the viewBox width, is wrong the moment the
 * drawing has a margin, a transform or an aspect-ratio letterbox.
 */
function viewBoxPoint(svg: SVGSVGElement, event: PointerEvent): DOMPoint | SVGPoint | null {
  const ctm = svg.getScreenCTM && svg.getScreenCTM();
  if (!ctm) return null;
  const matrix = ctm.inverse();
  if (typeof DOMPoint === "function") {
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix);
  }
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(matrix);
}

/**
 * Make an SVG element draggable, reporting through a control that already exists.
 *
 * @param {SVGElement} element  what the reader grabs
 * @param {object} o
 * @param {HTMLInputElement} o.control  **required** — the range input that holds the
 *   value and provides the keyboard path. The pointer writes to it.
 * @param {SVGSVGElement} o.svg  the drawing surface, for the coordinate transform
 * @param {(point: {x: number, y: number}) => number} o.toValue  map a viewBox point to
 *   a value. The caller owns this because only the caller knows the geometry.
 * @param {() => void} [o.onMove]  called after the value changes (or just use `react`)
 * @param {string} [o.cursor]  the pointer cursor; default `grab`
 * @returns {{destroy: Function}} a way to remove the listeners
 */
export function draggable(
  element: SVGElement,
  { control, svg, toValue, onMove, cursor = "grab" }: DragOptions = {},
): DragControl {
  if (!control) {
    throw new Error(
      "draggable: a control is required. The handle must not be the only way to reach " +
        "the value, so pass the range input that holds it — the pointer is an enhancement.",
    );
  }
  if (!svg) throw new Error("draggable: the drawing surface is required, to map the pointer into the viewBox");
  if (typeof toValue !== "function") throw new Error("draggable: toValue must map a viewBox point to a value");

  element.style.cursor = cursor;
  // Without this a touch drag scrolls the page instead of moving the handle, which
  // is the failure that only appears on the device nobody tested on.
  element.style.touchAction = "none";

  let dragging = false;

  const write = (point: { x: number; y: number }) => {
    const value = toValue(point);
    if (!Number.isFinite(value)) return;
    control.value = String(value);
    notify(control);
    if (onMove) onMove(value);
  };

  const onDown = (event: PointerEvent) => {
    if (event.button !== undefined && event.button !== 0) return;
    const point = viewBoxPoint(svg, event);
    if (!point) return;
    // `setPointerCapture` is what lets a drag continue when the pointer leaves the
    // handle, which it always does on the way to the target. It **throws** when the
    // pointer id is not active — a synthesised event, or a pointer that was released
    // between the event and this handler — and capture is a convenience, so a failure
    // must not abort the drag that the reader actually made.
    if (element.setPointerCapture && event.pointerId !== undefined) {
      try {
        element.setPointerCapture(event.pointerId);
      } catch {
        /* no capture, but the drag still tracks through the move events */
      }
    }
    dragging = true;
    event.preventDefault();
    write(point);
  };

  const onMoveEvent = (event: PointerEvent) => {
    if (!dragging) return;
    const point = viewBoxPoint(svg, event);
    if (!point) return;
    event.preventDefault();
    write(point);
  };

  const onUp = () => {
    dragging = false;
  };

  element.addEventListener("pointerdown", onDown);
  element.addEventListener("pointermove", onMoveEvent);
  element.addEventListener("pointerup", onUp);
  element.addEventListener("pointercancel", onUp);

  return {
    destroy() {
      element.removeEventListener("pointerdown", onDown);
      element.removeEventListener("pointermove", onMoveEvent);
      element.removeEventListener("pointerup", onUp);
      element.removeEventListener("pointercancel", onUp);
    },
  };
}
