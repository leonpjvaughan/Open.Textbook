# HANDOFF — Interactive Maths Textbook: portable marimo + MkDocs stack

**Date:** 2026-10-10
**Status:** proposed. No code exists yet. Nothing has been built or committed.
**Repo state:** `/home/leon/Work/Chatbot` is a scratch workspace, not a git repo.

---

## MISSION

Establish a **static, backend-free interactive maths textbook** in which:

1. **marimo-derived markdown is the canonical content format.** A page is a `.md`
   file containing prose plus marimo cells. That same format is accepted by four
   different renderers.
2. **MkDocs renders and ships the site** (GitHub Pages, no server, no backend).
3. **Quarto, MyST/Jupyter Book, and Astro/MDX remain viable alternative
   renderers** for the same content, proven by CI — not aspirational.
4. Interactivity is delivered in **tiers**, defaulting to cheap pure-JS figures and
   reaching for Python-in-browser only where it earns its keep.

### The one clarification that makes or breaks this

"Use all 3 shells *and* render everything with MkDocs" is achievable, but **not by
making one file serve four renderers**. The four marimo integrations each require a
*different code-fence dialect* (see CONTEXT). The flexibility is real at the
**format** level — one authoring vocabulary, four consumers — and is obtained by
**one tested codemod per non-primary dialect**, not by hoping the syntaxes align.

So: MkDocs is the shipped target. Quarto / MyST / MDX are *port targets* validated
in CI. Per-page renderer choice is a future option, not phase 1.

---

## SCOPE

Create and own only these paths:

```
math-book/
├── content/                 # canonical marimo markdown; pages live here
│   ├── index.md
│   └── 01-limits/
│       ├── index.md
│       └── epsilon-delta.md
├── figures/
│   ├── js/                  # pure-JS figures (JSXGraph, plotly, mathjs)
│   ├── py/                  # build-time generators (sympy, numpy) → JSON
│   └── data/                # committed precomputed sweeps
├── exercises/               # client-side generators + answer checkers
├── scripts/
│   └── port_fences.py       # idempotent fence-dialect codemod
├── renderers/
│   ├── mkdocs/              # PRIMARY — mkdocs.yml, overrides, hooks
│   ├── quarto/              # port target
│   ├── myst/                # port target
│   └── astro/               # port target
├── tests/
└── .github/workflows/
```

Phase 1 delivers `content/`, `figures/`, `renderers/mkdocs/`, `tests/`, and a
deploy workflow. The other three renderer dirs are added only once the fence
codemod exists and passes its tests.

---

## OUT_OF_SCOPE

Do **not** do any of the following without a new decision:

- **Print / PDF.** Explicitly ruled out. Web-only. Do not add LaTeX/PDF toolchains,
  and do not adopt PreTeXt.
- **Any backend.** No server, no serverless functions, no assessment service.
  This rules out WeBWorK and STACK (both require a server) and any host that
  cannot serve pure static files.
- **Threaded Pyodide / `SharedArrayBuffer`.** GitHub Pages cannot set response
  headers, so COOP/COEP is unavailable there. Single-threaded Pyodide only.
  Do not migrate hosts to enable threads.
- **Writing actual mathematical content.** This handoff builds the stack, not the
  book. Placeholder prose and one or two demonstrator figures only.
- **GeoGebra.** Its licence requires a commercial licence for commercial use.
  Do not embed it. Desmos needs an API key; also skip.
- **Adopting the 0.0.x marimo plugins as the shipped path.** See CONTEXT risk note.

---

## CONTEXT

### 1. Architecture: marimo is a cell runtime, not a site generator

marimo's publishing model is **islands**: you scatter marimo cells through ordinary
prose, and *all cells on a page compile into one shared reactive app*. The host
document places each result at its authored position. The static output renders at
build time; a browser runtime (Pyodide) then hydrates so controls and dependent
cells stay live.

Consequence: in all four integrations **there is no notebook file**. The notebook
*is* the page. `.md` and `.qmd` are interchangeable to marimo's editor, so the
authoring loop is: open the page in marimo → edit cells reactively → save → the
same file is your site content.

### 2. The fence dialect divergence — the central engineering problem

| Renderer | Plugin | Canonical fence | Cell options |
|---|---|---|---|
| **MkDocs** (primary) | `mkdocs-marimo` 0.2.1 (PyPI) | ``python {marimo}`` | none documented |
| **Quarto** | `quarto-marimo` (GitHub) | ``python {.marimo}`` (also ``{python .marimo}``) | Quarto `#|` YAML at cell top |
| **MyST** | `jupyter-book-marimo` 0.0.3 (PyPI) | ``{marimo} python`` | directive options |
| **MDX** | `@marimo-team/mdx-marimo` 0.0.5 (npm) | ``python marimo`` | `editor=true`, fence meta |

Quarto and MkDocs differ by a single dot. MyST is a directive. MDX is a bare word.
**The codemod must be idempotent and round-trip tested.** Treat
`scripts/port_fences.py` as the highest-risk artifact in the repo.

### 3. Interactivity tiers — pick the cheapest that works

| Tier | Mechanism | Runtime cost | Use when |
|---|---|---|---|
| **0** | Prose + KaTeX rendered at build time | none | default for all text and maths |
| **1** | Pure-JS figure (JSXGraph, plotly, mathjs, three) | ~50 KB | reader manipulates a *parameter* |
| **2** | Build-time Python → JSON, JS animates over it | ~50 KB | a parameter *family*; heavy maths done once |
| **3** | marimo island (Pyodide in browser) | multi-MB | reader must change the *mathematics* |
| **4** | `marimo export html-wasm` output, iframed | multi-MB, isolated | self-contained heavy notebook |

**Policy:** default to Tier 1 or 2. Tier 2 is the technique that rescues the
original "pre-run the notebook" instinct: sweep the parameter space in CI, commit
the data, let JS interpolate. Tier 3/4 only when the reader genuinely needs to
author or vary the computation itself. Never make a Tier-3 page the entry point.

### 4. Verified facts (checked 2026-10-10)

**marimo:** `marimo` 0.25.1 on PyPI. Export surface, from
`docs.marimo.io/guides/exporting/`:

- `marimo export html` — non-interactive HTML snapshot
- `marimo export html-wasm` — "Self-contained, interactive HTML powered by WebAssembly"
- `marimo export md` — "Markdown with code blocks"; `--flavor mdx` emits MDX source
- `marimo export ipynb` — Jupyter escape hatch (`--sort top-down` for script order)
- `marimo export {pdf,script,session}`
- `marimo convert nb.ipynb -o nb.py`

**Plugin maturity — this is the key risk signal:**

| Package | Version | Status |
|---|---|---|
| `quarto-marimo` | GitHub only | requires Quarto ≥1.9.20, Python ≥3.10, marimo ≥0.23.16; no docs flag |
| `mkdocs-marimo` | 0.2.1 | README: "under active development" |
| `@marimo-team/mdx-marimo` | **0.0.5** | prerelease |
| `jupyter-book-marimo` | **0.0.3** | prerelease |

Two of the four integrations are `0.0.x`. Do not make them load-bearing.

**Toolchain versions (for pinning):** Quarto 1.10.19, mystmd 1.11.0, jupyter-book
2.1.7, Astro 7.3.8, `@astrojs/mdx` 8.0.3, KaTeX 0.19.0, MathJax 4.1.3, Temml
0.14.0, JSXGraph 1.14.0, mathjs 15.2.0, nerdamer 2.0.0, three 0.186.1, MathBox
2.3.2-rc1, `@observablehq/plot` 0.6.17, pyodide (npm) 314.0.7.

**Maths rendering:** KaTeX for speed at build time; MathJax 4 when screen-reader
accessibility matters (it emits real MathML). Temml is the MathML-first
alternative. Do not ship both to a page.

**Compute with no backend:** mathjs (numeric, matrices) + nerdamer (symbolic:
differentiate, simplify, solve) makes "type a function, see its derivative" pure
client-side. **Caveat:** robust symbolic equivalence checking of arbitrary student
input is genuinely hard. Prefer numeric tolerance or structured answer formats.

**Exercises:** client-side generation with a seeded PRNG so problems are shareable
by URL; `localStorage` for progress. No server.

**Hosting:** GitHub Pages serves `.wasm` with correct MIME. It **cannot set custom
response headers**, hence no threaded Pyodide. Pages limits: ~1 GB site, soft
bandwidth cap — keep rendered video out of git history or use LFS.

### 5. Accepted decisions

- D1: Web-only, static, GitHub Pages. No backend, ever.
- D2: Canonical content = marimo markdown in `content/`.
- D3: MkDocs is the only renderer wired to deploy in phase 1.
- D4: The other three renderers are CI-proven ports, added after the codemod.
- D5: Interactivity tier policy as in §3, defaulting to Tier 1/2.
- D6: `marimo export html-wasm` + iframe is the sanctioned path for heavy figures,
  because it uses only marimo's stable CLI and never a 0.0.x plugin.
- D7: Pin every toolchain version listed in §4.

---

## ACCEPTANCE

Observable, checkable completion criteria:

1. `math-book/` exists with the SCOPE layout for phase 1.
2. `mkdocs build --strict` succeeds and emits `site/`.
3. The built site contains **zero** runtime JS for Tier-0 pages: prose and maths are
   pre-rendered; no KaTeX or MathJax JS is loaded on those pages.
4. One working Tier-1 figure (pure JS, no Python) embedded in a content page.
5. One working Tier-2 figure: a build-time Python script writes JSON into
   `figures/data/`, and a JS figure animates over it. Verified by re-running the
   generator and confirming byte-identical output.
6. `scripts/port_fences.py` converts canonical content to MyST and MDX dialects,
   is **idempotent** (running twice changes nothing), and round-trips back.
7. `tests/` proves criteria 5 and 6 and fails loudly if either regresses.
8. A GitHub Actions workflow deploys `site/` to Pages from the default branch.
9. `.agents/planning/handoff.md`'s D1–D7 are upheld: no backend, no PDF target, no threaded Pyodide.

---

## VERIFICATION

Required checks, to be run and their **actual output reported**:

```bash
# structure + primary build
cd math-book && mkdocs build --strict

# no-JS check for Tier-0 pages (must find no katex/mathjax script tags)
grep -rE '<script[^>]+(katex|mathjax)' site/index.html && echo "FAIL" || echo "PASS"

# codemod idempotency and round-trip
python scripts/port_fences.py --to myst content/ /tmp/myst-out
python scripts/port_fences.py --to myst /tmp/myst-out /tmp/myst-out2
diff -r /tmp/myst-out /tmp/myst-out2                # must be empty
python scripts/port_fences.py --to canonical /tmp/myst-out /tmp/roundtrip
diff -r content /tmp/roundtrip                      # must be empty

# tier-2 data regeneration determinism
python figures/py/generate.py && git diff --exit-code figures/data/

# tests
pytest tests/ -q
```

Report the literal command and its literal result. **Do not claim a check passed
without having run it.** If a check cannot run in the available environment, say so
explicitly and mark the criterion unverified rather than complete.

---

## ESCALATE_WHEN

Stop and hand back, with the failing evidence attached, if any of these appear:

1. **Fence dialects prove irreconcilable.** e.g. a renderer mangles cells that
   another renderer needs verbatim, or the round-trip test cannot be made to pass
   without content-specific special cases. This invalidates D4 — report which
   dialect and the minimal failing page.
2. **`mkdocs-marimo` 0.2.1 cannot render islands in a `--strict` build**, or its
   output requires the same page to be built twice. Two 0.0.x-adjacent plugins
   failing is evidence to drop islands entirely and use Tier 4 iframes only.
3. **A Tier-2 figure needs runtime Python after all** — i.e. the parameter space
   cannot be precomputed because it is unbounded or the sweep is too large to
   commit. Reclassify the figure rather than silently making the page Tier 3.
4. **Deploy requires response headers.** If anything needs COOP/COEP, stop:
   changing hosts is a decision, not an implementation detail.
5. **Site budget is breached** (~1 GB or video in git history). Report the
   culprit artifacts before doing anything else.

---

## EXECUTION

- **Model class:** mid rung. This is greenfield scaffolding with a clear shape;
  it does not warrant escalation up front.
- **Reasoning effort:** moderate for the MkDocs shell; **raise effort for
  `scripts/port_fences.py`** — it holds four interacting invariants at once and has
  no automatic oracle beyond the round-trip test it defines.
- **Assurance:** medium-high. Independent review of the codemod and of the tier
  policy as actually implemented. Assurance is the thing that matters here, more
  than model class — an unreviewed high-rung codemod is worse than a reviewed
  mid-rung one.
- **Isolation:** build in a git worktree / fresh directory. Do not touch
  `AGENTS.md`, `CLAUDE.md`, or anything outside `math-book/`.
- **Escalation:** escalate one rung only on evidence from ESCALATE_WHEN, and pass
  the failing artifact up rather than re-attempting in place.

---

## OPEN DECISIONS FOR THE HUMAN

Not blockers for phase 1, but they change later phases:

1. **Subject and flavour.** Geometry/analysis (favours JSXGraph + three.js) or
   algebra/discrete (favours mathjs + nerdamer symbolic)? This sets the Tier-1
   defaults.
2. **Reader-runnable code.** Should readers ever see and edit Python (Tier 3), or
   should the Python stay entirely hidden behind the figures? Choosing "hidden"
   collapses the stack to Tiers 0–2 plus occasional Tier-4 iframes, and removes
   every 0.0.x dependency.
3. **Auto-checked exercises.** Confirming yes pulls in `exercises/`, PRNG seeding,
   answer-checking policy, and `localStorage` — meaningful extra scope.
4. **Is MkDocs genuinely the ship target**, or a placeholder until `quarto-marimo`
   matures? Being honest about this now avoids building a codemod you discard.
