/*
 * Whether a figure's ink is inside the drawing it declares.
 *
 * A figure is an SVG with a `viewBox`: the box is the drawing, and anything outside it
 * is not drawn. That is what makes the defect this file exists for so quiet — an
 * element outside the box is painted correctly, contrast-checked correctly and
 * announced correctly, and the reader sees an empty frame. `dynamics-table` drew its
 * five rows at y = 300…512 in a 300-unit canvas and no check looked, because the
 * collection had a contract on what a figure *says* and on how it is *painted*, and
 * none on where it puts the ink.
 *
 * The decision lives here rather than in the page so it can be tested under plain
 * `node` — see `canvas --cases` — and because the two rules are the whole subject:
 *
 *   * **a text element must be inside.** A label is a thing to read, and half a
 *     clipped word is not a label;
 *   * **a mark may cross the edge, but must have ink inside.** A ray drawn to an
 *     instant centre 1,295 units off the canvas is intentional: the `viewBox` is the
 *     crop. `wishbone-hero` does exactly that, and a single rule for both would either
 *     fail it or miss a row of labels drawn below the frame.
 */
/** The default slack, in user units. Sub-pixel rounding is not a defect. */
export const TOLERANCE = 0.5;
/** How far `inner` reaches outside `outer`, in user units. Negative means inside. */
export function overflow(inner, outer) {
    return Math.max(outer.x - inner.x, outer.y - inner.y, inner.x + inner.width - (outer.x + outer.width), inner.y + inner.height - (outer.y + outer.height));
}
/** Do the two boxes overlap at all, allowing `tolerance` at the edges? */
export function overlaps(a, b, tolerance = TOLERANCE) {
    return (a.x < b.x + b.width + tolerance &&
        b.x < a.x + a.width + tolerance &&
        a.y < b.y + b.height + tolerance &&
        b.y < a.y + a.height + tolerance);
}
/**
 * Is this element drawn outside the drawing?
 *
 * `over` is the worst overflow in user units, which is what a report needs to say —
 * "20 units below the frame" is actionable and "outside" is not.
 */
export function outside(ink, box, canvas, tolerance = TOLERANCE) {
    const over = overflow(box, canvas);
    if (ink === "text")
        return { outside: over > tolerance, over };
    // A mark that reaches the canvas is drawn, so the crop is working as intended.
    return { outside: !overlaps(box, canvas, tolerance), over };
}
/** Transform a box through a matrix, returning the axis-aligned box it covers. */
export function transformBox(box, m) {
    const [a, b, c, d, e, f] = m;
    const points = [
        [box.x, box.y],
        [box.x + box.width, box.y],
        [box.x, box.y + box.height],
        [box.x + box.width, box.y + box.height],
    ].map(([x, y]) => ({ x: a * x + c * y + e, y: b * x + d * y + f }));
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y };
}
