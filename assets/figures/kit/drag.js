// @ts-nocheck
import { notify } from "./interact.js";

function viewBoxPoint(svg, event) {
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
export function draggable(element, { control, svg, toValue, onMove, cursor = "grab" } = {}) {
  if (!control) {
    throw new Error(
      "draggable: a control is required. The handle must not be the only way to reach " +
        "the value, so pass the range input that holds it — the pointer is an enhancement.",
    );
  }
  if (!svg)
    throw new Error(
      "draggable: the drawing surface is required, to map the pointer into the viewBox",
    );
  if (typeof toValue !== "function")
    throw new Error("draggable: toValue must map a viewBox point to a value");
  element.style.cursor = cursor;
  element.style.touchAction = "none";
  let dragging = false;
  const write = (point) => {
    const value = toValue(point);
    if (!Number.isFinite(value)) return;
    control.value = String(value);
    notify(control);
    if (onMove) onMove(value);
  };
  const onDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    const point = viewBoxPoint(svg, event);
    if (!point) return;
    if (element.setPointerCapture && event.pointerId !== undefined) {
      try {
        element.setPointerCapture(event.pointerId);
      } catch {}
    }
    dragging = true;
    event.preventDefault();
    write(point);
  };
  const onMoveEvent = (event) => {
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
