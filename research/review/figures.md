# Review: the interactive figures and widgets

A review of the 176 figure modules (`books/*/docs/assets/figures/*.js`), the
shared loader (`assets/figures/figures.js`), the booklet widget
(`assets/booklet/booklet.js`) and the settings runtime (`assets/settings/settings.js`).

This is a review, not a repair. Nothing outside this file was changed.

## Verdict

The house pattern is real and it is followed. Every one of the 176 modules has
`role="img"` and an `aria-label` on its drawing, a live readout, native
`<input>`/`<select>`/`<button>` controls and no colour literal; no module injects
runtime maths; no module adds a `document` or `window` listener, uses
`requestAnimationFrame` or a canvas. The page-level contract is met almost
everywhere: **175 of the 176 figure directives have a predict prompt within 40
lines of the directive.**

What the automated checks cannot see is where the drawing and the words disagree.
That is the dominant failure, and it clusters in the newest, smallest GCSE modules
and in a handful of large A-level ones. Of the **52 modules I read in full**, 14
have a defect that misleads a reader. The mechanical classes — a drawing that
leaves the frame, a drawing that never changes, a `fig-*` class applied to HTML —
were measured on all 174 slugs on the built site, so those counts are population
counts and not sample estimates.

**14 blocking, 15 worth doing, 7 taste.**

The three most significant:

1. **`gcse-maths/ch14-lines.js:18-19`** — the two lines are drawn with gradients
   3.5 and −1.75 while the labels beside them (lines 23-24) say `y = 2x + 1` and
   `y = -x + 7`. They cross at (1.33, 4.67); the solution dots sit at (2, 5) and
   lie on neither line. The picture contradicts the answer the same figure prints.
2. **`gcse-maths/ch12-parabola.js:18,23,26`** — the turning point is drawn at
   `sy(-4) = 301` in a 290-unit viewBox, so the vertex marker and its label are
   outside the canvas at *every* setting of the only slider (measured).
3. **`a-level-physics/grating-orders.js:57`** — `highest = Math.floor(ratio)` where
   the order limit is `Math.floor(1 / ratio)`. Because λ/d never exceeds 0.7 over
   the whole control range, the highest order is 0 for every setting, so the figure
   draws a single straight-through ray and never a diffraction pattern — while the
   readout quotes a first-order angle of up to 44.4° for a ray that is not drawn.

Two families recur below and are worth naming once: **the drawing leaves the
frame** (14 modules measured) and **the drawing never changes** (4 modules
measured). Both have one fix each, applied per module.

## Method and sample

`node --check` passes on all 176 modules and on the three shared files (verified
before citing any of them).

The sample was chosen so it can be audited and repeated. The strata overlap, so the
total is not the sum of the right-hand column:

| Stratum | Rule | Candidates | Read |
|---|---|---|---|
| Every module over 150 lines | `wc -l` > 150 | 22 figure modules | 17 |
| Every module with 4 or more controls | count of `<input>/<button>/<select>` | 14 | 7 |
| The smallest GCSE modules | ≤ 45 lines in `gcse-maths` | 24 | 21 |
| Cross-book coverage | one per book, plus `proofs` | — | 6 |
| Shared runtime | loader, `booklet.js`, `settings.js` | 3 | 3 |

**52 of the 176 figure modules (30%) were read in full**, plus the loader, the
booklet and the settings runtime; the list is in the appendix. Every module was
then *measured* in a browser, driven to each control's extremes, by scratch
harnesses under `/tmp/pi-delegate/del-108/` (`corpus.cjs`, `extremes.cjs`,
`verify.cjs`, `measure.cjs`, `targeted.cjs`, `arcs.cjs`, `perf.cjs`,
`booklet.cjs`). The harnesses load the built pages from `site/` by route
interception, in the manner of `scripts/audit-figures.cjs`, and record for each
module: whether the SVG markup differs at all across the control extremes; whether
any drawn element's box falls outside the SVG's box, at the default and at every
extreme; and the smallest drawn text size in CSS pixels at a 390 px viewport.

`node scripts/audit-figures.cjs site --only ch7-scale --json /tmp/…` reproduces
the point that the audit is blind to the largest one of these classes (see B4).

## Blocking

### B1 `books/gcse-maths/docs/assets/figures/ch14-lines.js:18-19`

The drawn lines are hard-coded pixel endpoints that do not match the equations the
figure labels them with, nor the dots it plots.

```js
      <line x1="70" y1="220" x2="250" y2="45" class="fig-accent"></line>   // gradient 3.5
      <line x1="70" y1="45" x2="430" y2="220" class="fig-good"></line>     // gradient -1.75
```

With `px = 70 + 90x` and `py = 220 - 25y`, those are the segments (0,0)→(2,7) and
(0,7)→(4,0); the labels at lines 23-24 call them `y = 2x + 1` and `y = -x + 7`
(gradients 2 and −1), and the dots at lines 21-22 are plotted from those equations
at (2, 5). Measured: the drawn lines cross at (1.33, 4.67). **Reader:** they look
for where the lines cross, read off about x = 1.3, and the readout tells them the
values match at x = 2. The figure's whole job is that crossing. **Smallest
remediation:** derive both endpoints from the same `y1`/`y2` used for the dots —
draw each segment from x = 0 to x = 4 with `py(2x+1)` and `py(-x+7)`.

### B2 `books/gcse-maths/docs/assets/figures/ch12-parabola.js:12,18,23,26`

`sy = y => 205 - y * 24`, so the vertex at y = −4 is drawn at 205 + 96 = **301** in
a viewBox 290 units high. Measured at both slider extremes: `circle.fig-warn []`
and `text.text-warn [turning point]` are outside the SVG box. **Reader:** the
turn to the label "turning point" in the drawing is not there, and the bottom of
the parabola is cut off, so the readout's "turning point (0, -4)" has no picture.
**Remediation:** `205 - y * 18` (vertex at 277) or a 330-unit viewBox.

### B3 `books/gcse-maths/docs/assets/figures/ch6-interest.js:12-14`

The growth scale is 0.7 px per pound against a 150-unit-high viewBox, and both
curves are drawn from `start`. Measured at 10 years: the simple polyline reaches
y = −230 and the compound one y = −320. The compound curve — the thing the figure
exists to show — leaves the frame at about year 4 of 10, and there is no y-axis to
say so. **Reader:** "compound grows faster" is visible only in the readout; the
drawing shows one gentle line and a line that vanishes. **Remediation:** scale to
the final compound balance (`start * (1+rate)**years - start`) so both curves end
inside the frame.

### B4 `books/gcse-maths/docs/assets/figures/ch7-scale.js:7`

The only graphic on the figure is an HTML div wearing a shape class:

```html
<div class="bar fig-accent" style="height:100%;width:30%"></div>
```

`.fig-accent` sets `fill` and `stroke` (extra.css:140). Neither paints an HTML
box. Measured: `backgroundColor: rgba(0,0,0,0)`, `fill: rgb(47,102,144)`. **Reader:**
the "scale bar" is an empty outlined rectangle that never moves; the slider changes
only the sentence below. The audit reports `problems: []` for this figure — its
measurement of `ch7-scale` records three text paints and no shape at all, so the
one non-text element is invisible to it. **Remediation:** `background: var(--tb-fig-accent)`
on the bar, or draw it as an SVG `<rect>`.

### B5 `books/gcse-maths/docs/assets/figures/ch4-fraction-strip.js:22,25`

The same class error on a `<span>`, with `opacity` as the only differentiator:

```js
cells.push(`<span class="${fill}" style="…opacity:${opacity};border:1px solid currentColor"></span>`);
```

`fill` is `fig-accent`/`fig-warn`/`fig-ink`; measured, every cell has
`backgroundColor: rgba(0,0,0,0)`, so opacity dims only the 1 px border. **Reader:**
a row of empty boxes with faint edges, never a shaded strip. Line 25 also prints a
raw float: at n = 4 the readout reads *"4 equal parts: two thirds corresponds to
2.6666666666666665 parts."* (measured at n = 4, 5, 7, 8). **Remediation:** set a
background on the cell from `var(--tb-fig-accent)`/`var(--tb-fig-ink)`, and format
the count (`Number(shaded.toFixed(2))`).

### B6 `books/gcse-maths/docs/assets/figures/ch15-functions.js:8`

```html
<p class="readout text-accent" aria-live="polite" role="img" aria-label="A linear function rule and the rule for its inverse"></p>
```

`role="img"` replaces the element's content with its accessible name, so the live
region can never announce the value it is updated with. **Reader:** this figure *is*
a sentence, and a screen-reader user hears only the static caption "A linear
function rule and the rule for its inverse" however the sliders move.
**Remediation:** delete `role="img"` from the readout (keep it on drawings).
`ch3-index-laws.js:11` and `rounding-slider.js:20` carry the same pairing.

### B7 `books/gcse-maths/docs/assets/figures/ch10-geometric.js:9,21`

```html
<ol class="terms" role="img" aria-label="Five terms of a geometric sequence…"></ol>
```

The list is the figure: five numbers. `role="img"` makes its children
presentational, so those five numbers are not exposed — the accessible name is
generic and never contains them. Measured: at ratio 1.5 the terms are 2, 3, 6, 9,
13.5 and none of them reaches assistive tech. **Remediation:** drop `role="img"` and
leave it a list, or fold the terms into the live readout. Line 21 has the same
class error as B4/B5 — `item.className = n === 5 ? "fig-good" : "fig-ink"` on an
`<li>` — so the intended highlight of the fifth term never appears either.

### B8 `books/a-level-maths/docs/assets/figures/ch14-normal-test.js:168,196`

The shaded band is the **critical region** (its boundaries come from
`CRITICAL_Z[alpha]`, lines 11 and 125-126), whose probability is α. The `aria-label`
asserts otherwise:

```js
`z equals ${z.toFixed(2)}. The shaded tail has probability ${pv.toFixed(4)}, `
```

Measured at x̄ = 506, σ = 4, n = 16: *"the shaded tail has probability 1.0000"*
while the shading on screen is the 5% critical region. **Reader:** a screen-reader
user is told the picture shows something it does not, and the number disagrees with
the readout in the same figure. **Remediation:** either shade the tail beyond the
observation, or say "the shaded region is the critical region at the 5% level".

The same module draws the "seen" marker at `toPx(xbar)` (line 168) while the axis
spans only ±4 standard errors, so the marker leaves the frame for most of the
slider. Measured outside the SVG box at x̄ = 494, x̄ = 506, σ = 2, n = 64 and for
every α and tail value: `line.fig-line`, `text.fig-accent [seen]`. **Reader:** the
slider that is supposed to move the observation appears to do nothing. **Fix:**
fit the axis to the data (`span = Math.max(4 * standardError, Math.abs(xbar - 500) * 1.2)`)
or clamp the marker to the frame edge with a small arrow.

### B9 `books/a-level-physics/docs/assets/figures/grating-orders.js:57,101-102`

`ratio = λ/d`; the number of orders that fit is `floor(d/λ)`, not `floor(λ/d)`.
Over the sliders' whole range (λ ≤ 700 nm, ≥ 100 lines/mm ⇒ d ≥ 1 µm) the ratio is
0.04–0.7, so `highest` is 0 at every setting. Measured at λ = 700 nm,
1000 lines/mm: *"The highest order is 0, so 1 maxima are drawn"* — the loop at
line 75 draws only n = 0 — while the same readout says *"The first-order maximum
is at 44.4°"*, and no such ray exists. **Reader:** the figure's own prompt
("Increase the number of lines per millimetre: does the pattern spread out or pack
together?") can never be answered from the drawing. **Remediation:**
`const highest = Math.floor(1 / ratio);`. The count at line 101 also needs to be
the `count` the loop actually drew, and "1 maxima" should be "1 maximum".

### B10 `books/a-level-maths/docs/assets/figures/ch9-cobweb.js:165-167`

```js
const converged = values.length > 2 && Math.abs(values[values.length - 1] - PHI) < 0.01;
```

Four iterates are not enough to reach φ to 1%. Measured, selecting
"x = 1 + 1 / x" (the rearrangement the module's own header calls the one that
"spirals"): the readout shows the iterates *1.0000, 2.0000, 1.5000, 1.6667,
1.6000* — a textbook cobweb closing on 1.618 — and the verdict below it says
*"This rearrangement is moving away from the fixed point, not towards it."*
**Reader:** the figure tells them the opposite of what its own drawing shows, on
the case the section is built on. **Remediation:** judge convergence from the
contraction (`Math.abs(gPrime(PHI)) < 1`), or from `|x_{n+1} - x_n|` shrinking, or
iterate 20 times before judging.

### B11 `books/a-level-maths/docs/assets/figures/ch5-r-form.js:67-70`

```js
const alpha = Math.atan2(b, a);            // line 57: in (-pi, pi]
… cx = xToPx(alpha)                        // line 70: but the plot spans t in [0, 2pi)
```

Whenever `b < 0`, `alpha` is negative and the peak marker is drawn at a negative
`t`, off the left edge of the plot. That is 5 of the slider's 11 values (all
`b < 0`), not an edge case. Measured at b = −5: `circle.fig-warn` outside the SVG
box; the true peak of the wave is at t = alpha + 2π ≈ 5.25 rad, near x = 345.
**Reader:** the marker that identifies the single wave's maximum is simply absent
for half the settings. **Remediation:** `const peakT = ((alpha % TAU) + TAU) % TAU;`
before converting to pixels.

### B12 `books/gcse-maths/docs/assets/figures/ch13-trig.js:21-25`

The mapping is 65 px per unit of amplitude in a 230-unit-high viewBox centred at
110, so the curve's peak leaves the frame as soon as `a ≥ 2`:

```js
<circle cx="157" cy="${110 - a * 65}" r="5" class="fig-good" />
<text x="164" y="${100 - a * 65}" class="text-good">maximum</text>
```

Measured at a = 3: `circle.fig-good`, `circle.fig-warn`, `text.text-good
[maximum]`, `text.text-warn [minimum]` all outside the SVG box; at a = 2 the curve
is clipped at the top and bottom and the two markers are outside. **Reader:** the
amplitude slider is the whole investigation, and on two of its three settings the
curve is cut off and the maximum and minimum vanish — which reads as an amplitude
that has stopped growing. **Remediation:** 30 px per unit (peak at 20 for a = 3),
or `max="2"`.

### B13 `books/gcse-maths/docs/assets/figures/ch17-construction.js:24-27`

Three defects in one figure, all measured:

- `const y = Math.sqrt(Math.max(0, r*r - 90*90))` and line 27 — the readout says
  *"the crossings are 0 units above and below the segment"* for r = 60, 85 and 90.
  At r ≤ 90 (= half the 180-unit base) the arcs do not meet at all. The
  `Math.max(0, …)` that prevents a `NaN` also turns "no crossing" into a claim of
  coincidence.
- The endpoints are drawn as `A r r 0 1 0` — a semicircle from (A.x+r, 95) to
  (A.x−r, 95). Measured, both arcs have bbox y ∈ [−5, 95], so *both* are the upper
  semicircles and they meet only above the segment, while the readout claims
  crossings "above **and below**".
- At r = 135 and 140 the crossings are at y = −5.6 and 195.6 (and −12.2 and
  202.2) in a 190-unit viewBox, so at the top of the range the construction's
  result is off-canvas.

**Remediation:** clamp the slider to about 95–130; draw each arc as the full
circle (or the half that passes through both intersections); and say "the arcs do
not meet" when r is below half the base.

### B14 `books/proofs/docs/assets/figures/angles-on-a-line.js:111-114`

The three angles at the top corner are printed to whole degrees and the readout
claims they add to 180°. Measured over the slider's 81 positions, the printed trio
sums to 180 in 53 of them, 179 in 16 and 181 in 12 — **28 positions, 35%, where
the numbers the reader can see contradict the sentence that says they add up.**
The module's own comment acknowledges the rounding. **Reader:** in a proof book
whose page is *this sum*, a third of the way along the slider the figure appears to
be wrong. **Remediation:** print one decimal place, or compute the apex so that the
three angles are exact (choose the apex height from the two base angles rather than
the slider position).

## Worth doing

### W1 Mobile legibility is the largest finding by count

Of the 133 modules that draw text, **70 render their smallest label below 7 px at a
390 px viewport; the median smallest label is 6.9 px.** The worst: `si-prefix-scale`
4.4 px; `repeated-readings` 5.0; `binding-energy`, `de-broglie`, `decay-curve`,
`electric-field`, `gravitational-field`, `photoelectric-effect` 5.2–5.3;
`grating-orders` 5.3. Measured at 390 px for `grating-orders`: the SVG box is
321 × **330** with `fitScale 0.535`, so the drawing occupies 176 px of a 330 px
box and an 11 px label is drawn at 5.9 px.

The cause is one shared habit: ~60 modules write a fixed pixel `height` equal to
the viewBox height (`viewBox="0 0 600 330" … height="330"`). At phone width the
*drawing* scales down but the box does not, so the figure both wastes vertical
space and shrinks its own text. Modules without the attribute (`ch14-lines`,
`ch12-parabola`) hug their content and lose nothing. **Remediation:** drop the
`height` attribute (keep `width="100%"`), and lift the smallest `font-size` values
(9–11) so the floor at 390 px is about 9 px.

### W2 The rest of the "outside the frame" family

Measured on every slug by driving each control to its extremes. Each needs the
same treatment: clamp the marker to the frame, or size the scale for the range the
controls can reach.

| Module | Line | State that escapes | What leaves |
|---|---|---|---|
| `ch11-coordinate-line.js` | 16-22 | m = ±3, c = ±3 | `circle.fig-good` — the plotted points |
| `ch2-quadratic-explorer.js` | 82 | b = ±8, c = −9 | `circle.fig-accent` — the vertex marker |
| `proofs/discriminant-graph.js` | 101 | b = 6, c = −6 | `circle.fig-accent` — the vertex (`sy(-15) = 335` in a 320 box) |
| `ch7-gradient-explorer.js` | 97 | a = 2.4, h = 1.5 | the chord and point Q (a + h = 3.9 passes X_MAX = 2.5). The tangent on line 96 is clamped; the chord is not |
| `ch16-force-balance.js` | 99 | both magnitudes 12, both directions 0° | the resultant arrow, entirely outside the 460-wide viewBox |
| `circular-motion.js` | 78 | r = 0.5 | `arrowLength = 40 + a·1.5` reaches 715 px on a 600-wide canvas at r = 0.5, v = 15 |
| `ch15-thrown-ball.js` | 46 | u = 20, t = 4.0 (the top of the slider) | the downward velocity arrowhead, below the ground line — the module's header comment claims the whole flight stays on the track |
| `ch16-inclined-plane.js` | 108-110 | 0° | both component arrows are zero-length, so two stray arrowheads sit on the block |

`ch22-vector-translation.js` and `ch9-newton-raphson.js` also put a line outside
the box (a grid line and the y-axis when `xMin > 0`); neither carries information.

### W3 Three physics drawings never change

Measured: the SVG markup is byte-identical at every control extreme, for both
figures and after clicking every button.

- `a-level-physics/capacitor-discharge.js:60-82` — the curve is plotted against
  `t / (5τ)` with the axis ticked 0…5, so it is scale-invariant by construction.
  **Reader:** "Double the resistance: what happens to the time constant?" and the
  graph does not move; only the readout changes. The ticks also have no unit: they
  count time constants, while the readout quotes the half-life in ms.
- `gcse-physics/circuit-current.js:47-86` — the wires, resistor and ammeter are
  hard-coded; nothing in the drawing depends on V or R.
- `a-level-physics/motional-emf.js:74-95` — `rodX` is a constant (line 74). In
  particular the control labelled **"Length of the rod (metres)"** (line 20) does
  not change the drawn rod at all, so the label does not describe what the control
  does.

**Remediation:** give the drawing one value-carrying element (an ammeter needle, a
current-arrow width, a time-axis in seconds), or make the figure Tier 0 and let the
readout stand alone.

### W4 `books/gcse-maths/docs/assets/figures/ch24-chart-choice.js:18`

```js
row.className = index === 1 ? 'fig-good' : 'fig-accent';
```

on a `<p>` holding the bar text. `fig-*` paints `fill`/`stroke`, which does nothing
to HTML text, so the intended contrast between the bus row and the other two never
appears; the "bar chart" is a run of `▰` characters in one colour.
**Remediation:** `text-good`/`text-accent`, or draw the bars as SVG rects.

### W5 `books/gcse-maths/docs/assets/figures/ch15-functions.js:14`

`For f(x) = ${a}x + (${b})` prints *"2x + (-5)"* and the inverse
*"(x − (-5)) / 2"*. The `signed()` helper used in
`ch2-quadratic-explorer.js:19` is exactly the fix.

### W6 `books/a-level-physics/docs/assets/figures/momentum-collision.js:194-201`

One sentence gives the same two velocities twice, once raw and once rounded:

> *After: (3 kg × 0.7142857142857143 m s⁻¹) + (4 kg × 2.7142857142857144 m s⁻¹) = 2.1 + 10.9 = 13.0 …* **Trolley A moves off at 0.7 m s⁻¹** …

Measured by driving mₐ = 3, m_b = 4, uₐ = 3, u_b = 1 in bounce mode.
**Remediation:** `signed(vA)` → `one(vA)` in `afterLine`, as the outcome line
already does.

### W7 `books/gcse-maths/docs/assets/figures/ch5-map-scale.js:6`

```html
<line … class="fig-ink fig-grid" stroke-width="3"></line>
```

Two classes, both setting `stroke`; `.fig-grid` is declared later in extra.css, so
the map segment is painted in the grid colour at the 3.08:1 floor rather than in
ink. **Remediation:** drop `fig-grid`. (The same figure's slider also changes only
the readout — the line never moves — so the drawing is inert in the sense of W3.)

### W8 `books/gcse-maths/docs/assets/figures/ch25-boxplot.js:22-23`

The tick labels sit 8–10 px left of the values they name (`x(12) = 175` but the
label is at 165; `x(q1) = 230` but the label is at 222), and there is a "0" at
x = 48 where the mapping puts 0 at x = 55, with no data there at all.
**Remediation:** draw each label at `x(value)` with `text-anchor="middle"`, and
drop the spurious zero.

### W9 `books/gcse-maths/docs/assets/figures/ch23-spinner.js:9,16`

The control is "Red sectors" and the `aria-label` says "Ten equal spinner sectors",
but the drawing is a horizontal strip of ten 20 × 32 rectangles with a 1 px
outline. A reader looking for sectors of a circle finds a bar chart, and the
unselected sectors are outlines (`fig-grid` sets `fill: none`) rather than a second
filled colour. **Remediation:** draw the sectors as an annular path, or rename the
figure to what it is ("a strip of ten equal parts").

### W10 `books/gcse-maths/docs/assets/figures/ch16-point.js:19`

```js
bar.style.background = `linear-gradient(90deg, var(--tb-accent) 0 …, var(--tb-ink-lighter) …, currentColor …)`;
```

This is the only module that paints with tokens outside the figure family. The
contrast invariant covers `--tb-fig-*` against the figure panel; `--tb-accent` and
`--tb-ink-lighter` are not measured there, so this figure's actual paint is outside
the check (the audit records `fig-ink` for it, which is not what fills the bar).
**Remediation:** use `var(--tb-fig-accent)` and `var(--tb-ink)`. The same figure
also calls a three-colour gradient "three angle sectors around a point", which is
the metaphor problem of W9.

### W11 `assets/booklet/booklet.js:146,446`

Two measured defects in the Tables tab:

- `.bk-count` is set from `state.data.tables.length` while the rendered list is
  tier-filtered, so a Foundation reader is told "3 tables" and shown 2. (Measured
  on `gcse-maths/higher/chapter-1/section-1.1`.)
- The search box stays visible and does nothing: typing `zzz` on the Tables tab
  leaves both tables rendered and gives no feedback. (The formulae tab filters,
  the tables tab does not.)

**Remediation:** count the filtered rows; hide or disable the search box on the
Tables tab. Separately, `applyRect` (line 311) restores a saved panel rect with no
clamping, so a rect saved on a wider window can place the panel off-screen while
the button reports `aria-expanded="true"`; clamp or drop a rect that falls outside
the viewport.

Measured and *not* a problem: the per-keystroke `renderContent()` costs 0.29 ms for
the 14-item GCSE booklet, so a debounce is not needed at these data sizes. Recorded
here so it is not re-raised.

### W12 `books/gcse-physics/docs/assets/figures/series-parallel.js:63-98,115`

Removing the right-hand lamp in **series** replaces it with a dashed gap; in
**parallel** the lamp symbol is drawn in the grid colour with a "removed" label, so
a removed lamp looks like a connected but unlit one — precisely the distinction the
page exists to draw. **Remediation:** break the branch in the parallel drawing too.
(The lamps' resistance is never given, though the readout's 0.25 A / 0.50 A / 1.0 A
follow from 12 Ω lamps; a reader cannot check the numbers.)

### W13 `books/a-level-maths/docs/assets/figures/ch11-sampling-variability.js:83,123,136`

This is the only figure in the collection whose drawing does not change when a
slider moves — it needs a *second* control ("Take a new sample") to teach at all,
and it is the only non-deterministic module. That is defensible for variability,
but it is an interaction that is solved differently from the other 175 and should
be deliberate. **Remediation:** re-draw on the sample-size slider as well, so the
house pattern holds.

### W14 Two slugs name two different figures

`electric-field.js` and `heating-curve.js` exist in both `a-level-physics` and
`gcse-physics` and are different figures (the two `electric-field` modules differ
by 167 lines: parallel plates vs a charged sphere). 176 module files, 174 distinct
slugs. The generated coverage table therefore lists 174 figures, and
`--only electric-field` can address only whichever page it finds first.
**Remediation:** make the slug unique per figure (`plates-electric-field`,
`sphere-electric-field`), which also makes the audit's per-slug map unambiguous.

### W15 `books/gcse-maths/docs/assets/figures/ch18-transform.js:36-39`

The image point is only drawn after the slider moves (`readout` is seeded with
"Choose a scale factor to test your prediction", which is good), but the SVG's
`aria-label` (line 7) never mentions the image or the scale factor, so the one
thing the figure shows is missing from its name. **Remediation:** set the label in
`update()` as the other modules do.

## Taste

Not defects; recorded so the decision is explicit.

1. **Only 75 of 176 modules carry an in-figure `<em>` prompt.** The other 101
   leave the Explain beat to the page prose — and the page prose does carry it, so
   this is a style difference and not a P6 failure. The four exceptions, all in the
   Proofs book, are `trapezium-double`, `semicircle-angle`,
   `polygon-triangulation` and `pythagoras-rearrangement`, which have neither an
   in-figure prompt nor a reader-directed explain prompt nearby. For a book whose
   figures illustrate a proof rather than run an investigation, that reads as
   deliberate.
2. **`ch6-interest.js:14` labels the series by colour** ("Blue: simple · Green:
   compound"). Under a themed bundle the accent and good colours need not be blue
   or green, and colour is the only key in the drawing.
3. **Clamping a curve to the frame edge reads as a feature that is not there.**
   `ch9-newton-raphson.js:162` and `discriminant-graph.js:72` flatten the curve at
   `yMin`/`yMax`, which looks like a turning point. A faint "continues" arrow at the
   edge would say the opposite.
4. **~40 modules carry the same inline `style="font:14px system-ui;max-width:…"`
   on their wrapper.** It duplicates what one class could do and stops a page from
   restyling figures.
5. **`ch9-cobweb.js:162` prints internal vocabulary** ("staircase:", "cobweb:",
   "diverges:") as the readout's opening word. Fine if the page has just introduced
   the word; otherwise it is a label the reader has to decode.
6. **Five modules put `role="img"` on a container that holds several children**
   (`ch10-geometric.js:9`, `ch24-chart-choice.js:7`, `ch7-scale.js:7`,
   `ch16-point.js:9`, `ch4-fraction-strip.js:9`), which hides the children. Where
   the children are the content it is blocking (B7); elsewhere the accessible name
   carries the numbers, or the live readout does.
7. **`assets/figures/figures.js` is duplicated into six files**, but by the
   pipeline rather than by hand (`engine/src/textbook/pipeline.py:548`), so it is one
   source. No action.

## What I checked and found clean

- **`assets/figures/figures.js`** — the slug regex rejects anything outside
  `[a-z0-9-]`, the `customElements.get` guard makes the duplicates harmless, and a
  failed import leaves a readable message rather than an empty box.
- **`assets/settings/settings.js`** — a native `<dialog>`, focus returned to the
  trigger on `close`, one delegated `change` listener rather than one per radio,
  `trigger.hidden = false` only after enhancement. Nothing to change.
- **Lifecycle.** No module adds a `document`/`window` listener, a `ResizeObserver`
  or a timer; there is no `requestAnimationFrame` and no canvas anywhere. Every
  figure and both widgets add listeners only to their own elements, so nothing needs
  a `disconnectedCallback`; `booklet.js`'s drag handlers remove themselves on
  `pointerup`.
- **Performance.** The rebuild-the-`innerHTML`-on-`input` pattern is uniform across
  the 176 modules and costs 0.2–0.9 ms per input event on the heaviest figures
  (measured: `ch4-binomial-approximation` 0.94 ms, `ch16-pull-at-an-angle` 0.34 ms,
  `ch9-newton-raphson` 0.23 ms over 400 evaluations). No throttling is warranted.
- **Geometry that is right**, verified by reading and measurement: the arrowheads
  and arc sweeps in `ch17-bearing-dial.js` (the clockwise sweep, including the
  long way round for a bearing over 180°), `ch5-ambiguous-case.js` (the fitted scale
  and the three cases no-triangle/one/two with the obtuse branch), `ch21-centre-angle.js`
  (the centre angle really is twice the circumference angle), `ch2-inverse-reflection.js`
  (the reflected line `1/m, -c/m` clips correctly), `ch16-pull-at-an-angle.js`
  (the lift-vs-weight branch and the leaving-the-floor case), `ch4-arithmetic-total.js`
  (the running-total bars and the separate term line), `momentum-collision.js`
  (momentum and the elastic/inelastic test), `ch11-gradient-intercept.js`
  (`visibleLine` clips the line to the grid properly), and `ch14-binomial-tail.js`
  (critical regions and p-values).
- **Accessibility beyond the name**, checked in all 176: every control is a native
  `input`/`select`/`button` with no `<div>` handlers, no `keydown` shims and no
  pointer-only interaction; every readout carries `aria-live="polite"`; the
  accessibility defects found are the three `role="img"`-on-a-live-region modules
  (B6, and `ch3-index-laws`, `rounding-slider`) and the five `role="img"`
  containers (T6).
- **Theming.** No module contains a colour literal, and none uses a CSS variable
  other than the `--tb-*` family. `ch16-point.js` reads the wrong subset (W10).

## Appendix: what was read, and what was only measured

### Read in full (55 files: 52 figure modules, 30% of the corpus, plus 3 shared)

```
assets/figures/figures.js
assets/booklet/booklet.js
assets/settings/settings.js

a-level-maths (18)
  ch16-pull-at-an-angle, ch10-vector-components, ch9-newton-raphson,
  ch2-inequality-region, ch14-normal-test, ch14-binomial-tail, ch15-thrown-ball,
  ch2-inverse-reflection, ch5-ambiguous-case, ch5-trig-solution-set,
  ch4-arithmetic-total, ch9-cobweb, ch7-gradient-explorer, ch16-force-balance,
  ch5-r-form, ch2-quadratic-explorer, ch16-inclined-plane,
  ch11-sampling-variability
a-level-physics (6)
  momentum-collision, grating-orders, circular-motion, motional-emf,
  capacitor-discharge, si-prefix-scale
gcse-maths (24)
  ch14-lines, ch12-parabola, ch13-trig, ch17-construction, ch7-scale,
  ch4-fraction-strip, ch6-interest, ch11-gradient-intercept, ch24-chart-choice,
  ch23-spinner, ch25-boxplot, ch16-point, ch10-geometric, ch15-functions,
  ch19-circle-measures, ch18-transform, ch11-coordinate-line,
  ch21-centre-angle, ch5-map-scale, ch17-bearing-dial, ch20-right-triangle,
  ch3-index-laws, ch2-multiples, rounding-slider
gcse-physics (2)
  series-parallel, circuit-current
proofs (2)
  discriminant-graph, angles-on-a-line
```

### Named in a stratum but not read (so the sample can be finished)

`ch4-binomial-approximation`, `ch2-modulus-fold`, `ch9-trapezium`,
`ch13-binomial-cumulative`, `ch11-mean-standard-deviation` (all over 150 lines);
`ch10-vector-addition`, `density-mass-volume`, `ch2-transform-explorer`,
`ch5-wave-explorer`, `profit-slider`, `power-energy` (all 4 or more controls);
`ch22-vector-translation`, `ch8-frame-area`, `ch9-inequality-line` (small GCSE);
`vector-addition` (a-level-physics); the other 10 modules in `proofs`; and 36 of
`gcse-physics`. Any of these is the next place to look.

### Measured but not read line by line

All 174 slugs on the built site were loaded in a browser, each control driven to
its extremes, and each of the three measurements taken: distinct SVG states, drawn
elements outside the SVG box, smallest drawn text at 390 px. Findings that come
from that pass (W1, W2, B2's marker, B8's marker, the inertness in W3, the
`fig-*`-on-HTML counts) are population counts over all 174, not sample estimates.
Everything else is drawn from the 52 modules above, so the semantic-defect rate
(14 blocking) is a rate over the modules I read, not over 176.

### Reproducing

```bash
# syntax, all 176 modules plus the three shared files
for f in books/*/docs/assets/figures/*.js assets/{figures/figures,booklet/booklet,settings/settings}.js; \
  do node --check "$f" || echo "FAIL $f"; done

# the measurement of one figure's paint, at the audit's own resolution
node scripts/audit-figures.cjs site --only ch7-scale --json /tmp/ch7.json

# the scratch harnesses, in /tmp/pi-delegate/del-108/
PLAYWRIGHT_PATH=… CHROME_PATH=… node corpus.cjs  site /tmp/corpus.json   # all 174 slugs
PLAYWRIGHT_PATH=… CHROME_PATH=… node extremes.cjs site                     # extremes + readouts
PLAYWRIGHT_PATH=… CHROME_PATH=… node verify.cjs                           # the cited numbers
```
