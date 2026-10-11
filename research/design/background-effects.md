# Background effects: can we ship them?

**Verdict: yes, and not the way it is usually done.** A canvas or WebGL field is
affordable and, surprisingly, *cheaper than the obvious CSS animation* — because
it can stop. Measured against a page the pipeline actually ships, on the shipped
content security policy.

Recommendation at the end. Everything above it is measurement.

## What was measured

Prototypes and harness live beside this note. `measure.cjs` serves `site/` over
real HTTP (so `transferSize` is populated), sends the shipped CSP from
`site/_headers`, injects one variant into the real chapter-1 Learn page, and
records frame timing, main-thread task time, bytes, idle behaviour and the
Tier-0 state.

```bash
# rebuild first: python -m textbook.portal && python -m textbook.pipeline --book gcse-maths --profile higher
PLAYWRIGHT_PATH=… CHROME_PATH=… node research/design/background-effects/measure.cjs \
  --variants baseline,gradient-static,gradient-animated,dots,field-2d,field-gl,fluid \
  --seconds 6 --repeat 3 --json /tmp/bg.json
```

### While the reader is interacting (6 s, pointer moving)

| variant | fps | drops | task ms | script ms | heap MB | bytes added |
|---|---|---|---|---|---|---|
| baseline (no injection) | 60.3 | 0 | 104 | 11 | 0.1 | — |
| static gradient | 60.2 | 0 | 108 | 11 | 0.1 | +1 kB |
| **CSS animated gradient** | 60.2 | 0 | **932** | 15 | 0.1 | +1 kB |
| dots | 60.1 | 0 | 374 | 76 | 0.6 | +9 kB |
| 2D field | 60.1 | 0 | 343 | 70 | 1.3 | +10 kB |
| WebGL field | 60.1 | 0 | 314 | 57 | 0.2 | +12 kB |
| **fluid solver** | 60.1 | 0 | 327 | 90 | 0.3 | **+22 kB** |

Every variant holds 60 fps with no dropped frames. The interesting column is
`task ms`: the CSS animation spends **9× the baseline** on the main thread to
draw a gradient, because it animates a paint property and never yields.

### With no input for 3.5 s, then a 2 s window

| variant | still looping | task ms/s |
|---|---|---|
| baseline | n/a | 0.1 |
| static gradient | no | 0.1 |
| **CSS animated gradient** | **yes** | **180** |
| dots | no | 0.1 |
| 2D field | no | 0.1 |
| WebGL field | no | 0.1 |
| fluid solver | no | 0.2 |

This is the finding that decides the question. The canvas and WebGL effects
**settle when nothing is happening** — under 0.3 ms/s, indistinguishable from
idle. The CSS animation keeps costing 180 ms/s forever, on a page nobody is
looking at.

### Throttled to 4× slower CPU, the shape a phone has

| variant | fps | task ms | idle ms/s |
|---|---|---|---|
| baseline | 60.3 | 386 | 0.7 |
| **CSS animated gradient** | 60.1 | **2550** | **435** |
| WebGL field | 60.2 | 916 | 0.9 |
| fluid solver | 60.1 | 1061 | **0.3** |

Frame rate never moves — this is all main-thread cost, which is battery and heat.
The fluid is 2.7× the baseline while active and then idles *below* it. The CSS
gradient is 6.6× while active and never stops.

### Everything else tested

- **Budget:** 12 requests / 146 kB baseline → 13 / 168 kB with the fluid. Largest
  single addition 22 kB. `DOMContentLoaded` is unchanged within noise.
- **Tier-0 (scripting off):** 15,728 characters of text and 39 MathML elements
  present, **zero canvas elements**. The effect fails to nothing.
- **CSP:** the shipped policy was sent on every response; no console error, no
  CSP violation, in any variant. Canvas and WebGL need no policy change.
- **`prefers-reduced-motion`:** every prototype reads
  `matchMedia("(prefers-reduced-motion: reduce)")` and stops. The CSS variants
  also carry the media query in the stylesheet.
- **Offscreen and hidden:** the canvas variants pause on `visibilitychange` and
  on an `IntersectionObserver` — which is why they idle.
- **Palette:** `palette.js` reads the `--tb-*` tokens from the computed style of
  `body` and hands them to the shader as uniforms. A canvas cannot read a CSS
  custom property, so this is the same discipline as `var(--tb-accent)` one layer
  down, and it is what keeps the rule that no page or figure carries a colour.
  It re-reads on a bundle or scheme change.

## What this means

**Ship it as an opt-in on the three vivid themes, and never as a CSS animation.**

The naive version — a CSS animated gradient, the thing that looks free — is the
worst option measured: it cannot stop, and it is the most expensive of the lot
per frame. The engineering-heavy version is the well-behaved one, because an
explicit render loop is also an explicit *stopping* point.

The conditions it ships under:

- **Off by default, on per theme, remembered per reader** — the same origin-wide
  key discipline as `textbook:theme`. A reader who chooses a vivid bundle may be
  offered it; nobody gets it by surprise.
- **`prefers-reduced-motion` stops it**, and the page must be complete without
  it. Measured: it is.
- **It pauses offscreen and on hidden**, and on no-input idle. Measured: the
  canvas variants already do.
- **The ceiling is ~25 kB and no change to `DOMContentLoaded`.** The fluid is at
  22 kB, so anything new that pushes past it needs a reason.
- **Scripting off is unchanged.** It fails to nothing.

## For the Physics book, where the field *is* the content

This is the interesting case, and it is a different decision from decoration.
An electromagnetic field visualisation that a reader can disturb and watch settle
is a teaching surface, so it competes with figures rather than with the
decoration budget — the rule that hooks, applications and tools are at most about
a quarter of a chapter. The measured cost shape is the same, and the field
already exists here as `field-gl.js`; what Physics needs is the physics in it,
not the plumbing.

## What is not established

- **GPU was headless Chromium on this machine**, not a phone. Frame *rate* held
  at 60 everywhere, so the risk is thermal and battery rather than jank — and
  that is the number a desk cannot measure.
- **A phone's actual battery cost** for the fluid is not measured here. The idle
  figure is the proxy and it is a good one, but it is a proxy.
- **The blob-worker probe** in the prototype reports whether the CSP permits a
  worker; it was not run against the shipped policy, because none of the variants
  needs one. If a future effect wants a worker, run it first.
- **Visual quality is not judged here.** These are measuring instruments, not
  designs. Whether a moving background helps or distracts a reader reading
  mathematics is a pedagogical question, and the honest prior is that it
  distracts — which is the argument for opt-in rather than on.
