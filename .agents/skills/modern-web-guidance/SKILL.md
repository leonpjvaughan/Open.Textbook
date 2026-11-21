---
name: modern-web-guidance
description: Query the pinned Google/Chrome Modern Web Guidance pack before writing HTML, CSS, or client-side JavaScript — 210 guides across 16 disciplines, searched by English query and read in full. Use when authoring or reviewing markup, styles, a browser-facing module, a service worker, or a figure's DOM and events, and when deciding whether a platform API or a library is the current answer.
---

# Modern Web Guidance

The web platform moves faster than any model's training data. This repository
writes browser-facing code — the page template, the shell CSS, the figure
modules, the service worker — and a hazard here is a pattern that was current
when the model learned it and is legacy now.

The pack is a **source of guidance, not a gate**. It teaches; `textbook.lint`,
`tools types`, `canvas`, `audit` and `pytest` decide. Nothing in this repository
fails a build because a guide was not consulted, and a green gate does not mean
the guidance was followed.

## The commands

Pinned at `modern-web-guidance@1.0.1` in `package.json`, installed, and run
through `npm` so the version cannot drift:

```bash
npm run guidance -- search "container query card layout"   # ids and descriptions
npm run guidance -- retrieve "light-dismiss-a-dialog"      # one guide, in full
npm run guidance -- list                                   # all 210 use cases
npm run guidance:legacy                                    # a report, not a gate
```

`npm run guidance -- ...` is `modern-web-guidance ...`. `search`, `retrieve` and
`list` are **subcommands, not flags**, so the first word after `--` names the
command and the query follows it.

**`retrieve` writes the guide to a temp file and prints the path**, because
guides run past the CLI's stdout limit. Read that path with the file reader, not
with `head` or `cat`.

## The sequence

1. **Search by the thing you are about to write**, in plain English:
   "sticky header", "focus ring", "form validation", "lazy image", "reduced
   motion", "swipe gesture".
2. **Retrieve the two or three ids that name your task.** The description is not
   the guidance; retrieve before writing.
3. **Write the platform API first.** A guide that says `<dialog>`, `<details>`,
   `popover`, container queries, `:has()`, or `view-transition` is telling you a
   library is no longer the answer. Adapt the example to this repository's
   stack, which is plain ES modules and progressive enhancement, not React.
4. **Say which guide you followed** in the commit body or the page's review
   note when the choice is a departure from the earlier habit.

## What it does not do

| Claim | Reality |
| --- | --- |
| A gate | No. `legacy-scan` is a JSON report and exits 0 on findings. Never add it to `check.sh` expecting a failure. |
| Full coverage scan | No. `legacy-scan` runs a subset of rules across part of the catalogue, as its own output states. The catalogue is the value. |
| Deterministic on a modern codebase | Weak: silence is not proof. Treat findings as leads, and the absence of findings as no information. |
| An answer about type, layout or the build | No. It is the browser platform only. |

**What the scan reads, and what it skips.** It skips documentation and test
directories by default. It does **not** know that `research/` is a scratch area,
so its six findings in `research/design/background-effects/` are outside this
repository's scope: that tree is where background experiments were drawn, it is
not built, shipped or loaded by a page, and modernising it would change nothing a
reader sees. Read a finding there as "this pattern exists in a sketch", and say
so rather than fixing it. The shipped code is `assets/`, `engine/`, `tools/` and
`books/*/docs/assets/`; the generated `assets/figures/kit/*.js` is read only
through its source beside it, because fixing the output is undone by the next
build.

## Where it matters in this repository

- **Markup and progressive enhancement** — `engine/src/textbook/templates/`,
  hooks that emit HTML. A dialog, a disclosure or a popover should be the
  platform's unless there is a reason.
- **The shell and the cascade** — `engine/src/textbook/css/shell.css`,
  `themes/`. Light-dom `<dialog>` styling, `@container`, `:has()`, focus
  visibility and reduced motion are exactly what the pack covers.
- **Figure modules** — `assets/figures/`, `books/*/docs/assets/figures/`.
  Pointer events, keyboard operability, and animation that respects
  `prefers-reduced-motion` live here.
- **`sw.js` and the offline path** — caching and update semantics have moved.

It does not cover the maths, the prose, the tier model or the build; those are
this repository's own rules and its own agents files.
