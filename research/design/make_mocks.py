#!/usr/bin/env python3
"""Generate theme-direction mocks for review.

This is a design exploration, not part of any published book. It renders the same
lesson page in several candidate directions, from "one shared design system with a
subject tint" through to genuinely subject-native treatments, so the directions
can be compared side by side.

    python research/design/make_mocks.py        # writes var/mockups/
    node tools/dist/cli.js screenshot var/mockups <out> --schemes light,dark -- ...

Every mock links the real assets/stylesheets/extra.css, so what is shown is the
real token layer with per-direction overrides — not a drawing of what it might
look like.
"""

from __future__ import annotations

import pathlib
import shutil

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "var" / "mockups"
EXTRA_CSS = ROOT / "assets" / "stylesheets" / "extra.css"


def lesson(subject: str, kicker: str) -> str:
    return f"""
<article class="page">
  <p class="eyebrow">{kicker}</p>
  <h1>Compound interest</h1>
  <p class="lead">Interest paid on interest. Each year the amount grows by a
  fixed multiplier, so the same percentage adds a bigger amount every year.</p>

  <div class="anchor">
    <p class="anchor__label">The chapter problem</p>
    <p>Ana puts £400 into an account paying 3.5% a year. She leaves it alone.
    How much is in the account after 4 years?</p>
  </div>

  <h2>Worked example</h2>
  <div class="worked">
    <p class="worked__q">Work out the value after 4 years.</p>
    <p class="eq">400 × 1.035<sup>4</sup></p>
    <p class="eq">= <strong>£458.99</strong></p>
    <p class="reason">A 3.5% increase is a multiplier of 1 + 0.035 = 1.035.
    Four years means the multiplier is used four times.</p>
  </div>

  <div class="watchout">
    <p class="watchout__label">Watch out</p>
    <p>Adding 3.5% of £400 four times gives £456.00. Compound interest pays
    interest on the interest, so the real total is higher.</p>
  </div>

  <h2>Explore</h2>
  <figure class="figure">
    <div class="figure__canvas">
      <svg viewBox="0 0 320 120" role="img" aria-label="Growth of £400 at 3.5% a year">
        <polyline points="10,110 90,96 170,78 250,56 310,32"
                  fill="none" stroke="var(--tb-fig-accent)" stroke-width="2.5"/>
        <line x1="10" y1="112" x2="310" y2="112" stroke="var(--tb-fig-grid)" stroke-width="1"/>
        <circle cx="250" cy="56" r="4" fill="var(--tb-fig-accent)"/>
      </svg>
    </div>
    <figcaption>£400 growing at 3.5% a year, with the 4-year value marked.</figcaption>
  </figure>

  <h2>Practise</h2>
  <ol class="problems">
    <li>Work out the value of £250 after 3 years at 4% a year.</li>
    <li>A car worth £12,000 loses 15% of its value each year. Find its value
    after 3 years. <span class="tier">H</span></li>
    <li>Which is worth more after 5 years: £500 at 3% a year, or £450 at 5% a
    year? Give a reason.</li>
  </ol>
  <details class="answers">
    <summary>Answers</summary>
    <p>1. £281.22 &nbsp;·&nbsp; 2. £7,369.50 &nbsp;·&nbsp; 3. £579.64 against
    £574.30, so the first.</p>
  </details>
  <p class="subject-note">{subject}</p>
</article>
"""


# --- the shared mock components, written once in terms of the tokens ----------

COMPONENTS = """
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--tb-paper);
  color: var(--tb-ink);
  font-family: var(--mock-body-font, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif);
  font-size: 17px;
  line-height: 1.65;
}
.page { max-width: 62ch; margin: 0 auto; padding: 44px 24px 64px; }
.eyebrow {
  margin: 0 0 6px;
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tb-ink-soft);
}
h1 {
  font-family: var(--mock-display-font, Georgia, serif);
  font-size: 2rem;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 0 0 10px;
}
h2 {
  font-family: var(--mock-display-font, Georgia, serif);
  font-size: 1.15rem;
  margin: 34px 0 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--tb-rule);
}
.lead { font-size: 1.06rem; color: var(--tb-ink-soft); margin: 0 0 22px; }

.anchor {
  background: var(--mock-anchor-bg, color-mix(in srgb, var(--tb-accent) 7%, var(--tb-paper)));
  border-left: 3px solid var(--tb-accent);
  border-radius: var(--mock-radius, 8px);
  padding: 14px 18px;
  margin: 0 0 8px;
}
.anchor p { margin: 0; }
.anchor__label {
  font-size: 0.74rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--tb-accent);
  margin-bottom: 4px !important;
}

.worked { border-left: 3px solid var(--tb-rule); padding-left: 16px; }
.worked__q { margin: 0 0 8px; }
.eq {
  font-family: var(--mock-math-font, Georgia, serif);
  font-size: 1.12rem;
  margin: 0 0 4px;
}
.reason { color: var(--tb-ink-soft); font-size: 0.95rem; margin: 8px 0 0; }

.watchout {
  background: var(--mock-warn-bg, color-mix(in srgb, var(--tb-fig-warn) 9%, var(--tb-paper)));
  border-left: 3px solid var(--tb-fig-warn);
  border-radius: var(--mock-radius, 8px);
  padding: 14px 18px;
  margin: 22px 0 0;
}
.watchout p { margin: 0; }
.watchout__label {
  font-size: 0.74rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--tb-fig-warn);
  margin-bottom: 4px !important;
}

.figure { margin: 0 0 8px; }
.figure__canvas {
  background: var(--mock-figure-bg, transparent);
  border: 1px solid var(--tb-rule);
  border-radius: var(--mock-radius, 8px);
  padding: 12px;
}
.figure svg { display: block; width: 100%; height: auto; }
figcaption { font-size: 0.88rem; color: var(--tb-ink-soft); margin-top: 8px; }

.problems { padding-left: 22px; }
.problems li { margin-bottom: 8px; }
.tier {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 8px;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--tb-fig-warn);
  vertical-align: 1px;
}
.answers {
  margin-top: 18px;
  border: 1px solid var(--tb-rule);
  border-radius: var(--mock-radius, 8px);
  padding: 10px 16px;
  background: var(--mock-card-bg, transparent);
}
.answers summary { cursor: pointer; color: var(--tb-ink-soft); font-size: 0.95rem; }
.answers p { margin: 10px 0 0; font-size: 0.95rem; }
.subject-note {
  margin-top: 40px;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tb-ink-soft);
}
"""

PREPAINT = """
<script>
/* Mirror Material's behaviour for the mock: the token layer keys off
 * data-md-color-scheme, which the real site sets from the reader's choice. */
(function () {
  var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-md-color-scheme", dark ? "slate" : "default");
})();
</script>
"""


def page(title: str, direction: str, css: str, body: str, head_extra: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-direction="{direction}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="extra.css">
<style>
body {{ visibility: hidden; }}
html[data-md-color-scheme] body {{ visibility: visible; }}
{COMPONENTS}
{css}
</style>
{PREPAINT}
{head_extra}
</head>
<body>
{body}
</body>
</html>
"""


# --- the directions -----------------------------------------------------------

MATH_MONO = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace'

DIRECTIONS: dict[str, dict] = {
    "a-house": {
        "title": "A · House",
        "blurb": "The design system as it stands: warm paper, blue accent.",
        "subject": "Mathematics",
        "css": """
/* A — the house theme, unchanged. Shown as the baseline for comparison. */
""",
        "tint_comparison": True,
    },
    "b-tint": {
        "title": "B · Shared core, subject tint",
        "blurb": "Identical surfaces and structure; only the hue changes.",
        "subject": "Physics",
        "css": """
/* B — nothing changes but the hue. Surfaces, rules and layout stay identical. */
html[data-direction="b-tint"][data-md-color-scheme="default"] {
  --tb-accent: #6d4aa8;
  --tb-accent-light: #8a6bc4;
  --tb-accent-dark: #4f3380;
  --tb-link: #5a3c96;
}
html[data-direction="b-tint"][data-md-color-scheme="slate"] {
  --tb-accent: #b79ce6;
  --tb-accent-light: #cbb6f0;
  --tb-accent-dark: #8a6bc4;
  --tb-link: #cbb6f0;
}
""",
        "tint_comparison": True,
    },
    "c-temperature": {
        "title": "C · Shared core, subject temperature",
        "blurb": "The tint, plus the paper, ink and rules warmed or cooled to match.",
        "subject": "Chemistry",
        "css": """
/* C — tint plus temperature: the surfaces themselves move, not just the accent. */
html[data-direction="c-temperature"][data-md-color-scheme="default"] {
  --tb-accent: #0f766e;
  --tb-accent-light: #14958a;
  --tb-accent-dark: #0b5a54;
  --tb-link: #0d6b64;
  --tb-paper: #f5f8f3;
  --tb-ink: #1b211c;
  --tb-ink-soft: #566057;
  --tb-rule: #dde5da;
  --tb-code-bg: #eaf0e7;
  --tb-fig-warn: #9a5b2a;
  --tb-fig-good: #2f7d4f;
  --tb-fig-grid: #cfdcc9;
}
html[data-direction="c-temperature"][data-md-color-scheme="slate"] {
  --tb-accent: #5fd3c4;
  --tb-accent-light: #8ce4d8;
  --tb-accent-dark: #2f9c90;
  --tb-link: #8ce4d8;
  --tb-paper: #121916;
  --tb-ink: #e4ece6;
  --tb-ink-soft: #a8b6ab;
  --tb-rule: #26322b;
  --tb-code-bg: #1a231e;
  --tb-fig-warn: #e0a878;
  --tb-fig-good: #7fc79b;
  --tb-fig-grid: #2f3d34;
}
""",
        "tint_comparison": True,
    },
    "d-native": {
        "title": "D · Subject-native",
        "blurb": "Blueprint grid, monospace labels, amber highlight — a physics voice.",
        "subject": "Physics",
        "css": f"""
/* D — a subject-native treatment: the structure is recognisably a physics
   working page. Grid paper under everything, technical labels, thin rules. */
html[data-direction="d-native"] {{
  --mock-body-font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --mock-display-font: {MATH_MONO};
  --mock-radius: 2px;
  --mock-anchor-bg: color-mix(in srgb, var(--tb-accent) 10%, var(--tb-paper));
  --mock-figure-bg:
    repeating-linear-gradient(0deg, transparent 0 15px, var(--mock-grid) 15px 16px),
    repeating-linear-gradient(90deg, transparent 0 15px, var(--mock-grid) 15px 16px);
}}
html[data-direction="d-native"][data-md-color-scheme="default"] {{
  --tb-accent: #0e7490;
  --tb-accent-light: #0891b2;
  --tb-accent-dark: #155e75;
  --tb-link: #0e7490;
  --tb-paper: #f4f7f9;
  --tb-ink: #101a20;
  --tb-ink-soft: #4d606b;
  --tb-rule: #d3dde3;
  --mock-grid: #e2eaee;
  --tb-fig-warn: #b45309;
  --tb-fig-grid: #cbd8de;
}}
html[data-direction="d-native"][data-md-color-scheme="slate"] {{
  --tb-accent: #38bdf8;
  --tb-accent-light: #7dd3fc;
  --tb-accent-dark: #0284c7;
  --tb-link: #7dd3fc;
  --tb-paper: #0b1217;
  --tb-ink: #dce8ee;
  --tb-ink-soft: #8fa6b2;
  --tb-rule: #1e2c35;
  --mock-grid: #131f26;
  --tb-fig-warn: #fbbf24;
  --tb-fig-grid: #22333d;
}}
html[data-direction="d-native"] h1 {{ font-size: 1.7rem; letter-spacing: -0.02em; }}
html[data-direction="d-native"] h2 {{
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 6px;
}}
html[data-direction="d-native"] .eyebrow,
html[data-direction="d-native"] .anchor__label,
html[data-direction="d-native"] .watchout__label,
html[data-direction="d-native"] .subject-note {{
  font-family: {MATH_MONO};
}}
html[data-direction="d-native"] .worked {{
  border-left: 1px dashed var(--tb-rule);
}}
html[data-direction="d-native"] .anchor,
html[data-direction="d-native"] .watchout {{
  border-left-width: 2px;
  border-top: 1px solid var(--tb-rule);
  border-right: 1px solid var(--tb-rule);
  border-bottom: 1px solid var(--tb-rule);
}}
""",
        "tint_comparison": False,
    },
    "e-print": {
        "title": "E · Editorial print",
        "blurb": "High-contrast serif, boxed rules, a single red accent. A printed-textbook voice.",
        "subject": "Mathematics",
        "css": """
/* E — the wildcard: a printed-textbook personality. Serif throughout, rules
   instead of fills, one red accent used sparingly. */
html[data-direction="e-print"] {
  --mock-body-font: Georgia, "Iowan Old Style", "Times New Roman", serif;
  --mock-display-font: Georgia, serif;
  --mock-math-font: Georgia, serif;
  --mock-radius: 0;
  --mock-anchor-bg: transparent;
  --mock-warn-bg: transparent;
}
html[data-direction="e-print"][data-md-color-scheme="default"] {
  --tb-accent: #9a1b1b;
  --tb-accent-light: #b83232;
  --tb-accent-dark: #75120f;
  --tb-link: #9a1b1b;
  --tb-paper: #fbfaf7;
  --tb-ink: #14120f;
  --tb-ink-soft: #57524a;
  --tb-rule: #cec9bf;
  --tb-fig-warn: #9a1b1b;
  --tb-fig-good: #2f6b45;
  --tb-fig-grid: #d8d2c6;
}
html[data-direction="e-print"][data-md-color-scheme="slate"] {
  --tb-accent: #e5897f;
  --tb-accent-light: #f0aba2;
  --tb-accent-dark: #c2645a;
  --tb-link: #f0aba2;
  --tb-paper: #15130f;
  --tb-ink: #eeeae2;
  --tb-ink-soft: #b3aca0;
  --tb-rule: #33302a;
  --tb-fig-warn: #e5897f;
  --tb-fig-good: #86c39d;
  --tb-fig-grid: #3a3630;
}
html[data-direction="e-print"] .page { max-width: 58ch; }
html[data-direction="e-print"] h1 {
  font-size: 2.2rem;
  text-align: left;
}
html[data-direction="e-print"] h2 {
  font-size: 1.02rem;
  border-bottom: 2px solid var(--tb-ink);
  padding-bottom: 4px;
  text-transform: none;
}
html[data-direction="e-print"] .anchor,
html[data-direction="e-print"] .watchout {
  border: 1px solid var(--tb-rule);
  border-left: 4px solid var(--tb-accent);
  padding: 16px 20px;
}
html[data-direction="e-print"] .watchout { border-left-color: var(--tb-fig-warn); }
html[data-direction="e-print"] .eyebrow {
  font-family: Georgia, serif;
  letter-spacing: 0.14em;
}
html[data-direction="e-print"] figcaption { font-style: italic; }
""",
        "tint_comparison": False,
    },
}


def tint_board() -> str:
    """The same components in three subject hues, for the shared-core directions."""

    panel = """
<div class="panel">
  <p class="panel__name">{name}</p>
  <div class="mini" style="--mini-accent: {accent}; --mini-accent-soft: {soft};">
    <p class="mini__eyebrow">Section 6.4</p>
    <p class="mini__title">Compound interest</p>
    <p class="mini__body">Each year the amount grows by a fixed multiplier, so
    the same percentage adds a bigger amount every year.</p>
    <div class="mini__anchor"><span>Chapter problem</span>Ana puts £400 into an
    account paying 3.5% a year.</div>
    <div class="mini__row">
      <span class="mini__chip">Figure</span>
      <span class="mini__chip">Watch out</span>
      <span class="mini__chip mini__chip--solid">Practise</span>
    </div>
  </div>
</div>
"""

    maths = panel.format(name="Mathematics", accent="#2f6690", soft="#4a7fae")
    physics = panel.format(name="Physics", accent="#6d4aa8", soft="#8a6bc4")
    chemistry = panel.format(name="Chemistry", accent="#0f766e", soft="#14958a")

    css = """
body { background: var(--tb-paper); color: var(--tb-ink); margin: 0; }
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
h1 {
  grid-column: 1 / -1;
  font-family: Georgia, serif;
  font-size: 1.5rem;
  margin: 0 0 4px;
}
.intro {
  grid-column: 1 / -1;
  margin: 0 0 14px;
  color: var(--tb-ink-soft);
  font-size: 0.95rem;
  max-width: 70ch;
}
.panel__name {
  margin: 0 0 8px;
  font-size: 0.76rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--tb-ink-soft);
}
.mini {
  border: 1px solid var(--tb-rule);
  border-top: 3px solid var(--mini-accent);
  border-radius: 8px;
  padding: 16px 18px 18px;
  background: var(--tb-paper);
}
.mini__eyebrow {
  margin: 0 0 6px;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tb-ink-soft);
}
.mini__title {
  margin: 0 0 8px;
  font-family: Georgia, serif;
  font-size: 1.15rem;
  color: var(--mini-accent);
}
.mini__body { margin: 0 0 12px; font-size: 0.92rem; color: var(--tb-ink-soft); }
.mini__anchor {
  border-left: 3px solid var(--mini-accent);
  background: color-mix(in srgb, var(--mini-accent) 7%, var(--tb-paper));
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 0.86rem;
  margin-bottom: 14px;
}
.mini__anchor span {
  display: block;
  font-size: 0.66rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--mini-accent);
  margin-bottom: 3px;
}
.mini__row { display: flex; gap: 8px; flex-wrap: wrap; }
.mini__chip {
  border: 1px solid var(--mini-accent);
  color: var(--mini-accent);
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 0.8rem;
}
.mini__chip--solid { background: var(--mini-accent); color: var(--tb-paper); }
"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Shared core, subject tint</title>
<link rel="stylesheet" href="extra.css">
<style>
body {{ visibility: hidden; }}
html[data-md-color-scheme] body {{ visibility: visible; }}
{css}
</style>
{PREPAINT}
</head>
<body>
<section class="board">
  <h1>One design system, three subjects</h1>
  <p class="intro">Identical surfaces, rules, spacing and type. Only the accent
  changes — the cheapest way to give each subject its own identity, and the one
  that keeps the collection looking like one collection.</p>
  {maths}
  {physics}
  {chemistry}
</section>
</body>
</html>
"""


def contact_sheet() -> str:
    """All directions on one page, so the whole set can be reviewed at once."""
    cells = "".join(
        f'<figure><figcaption>{spec["title"]} — {spec["blurb"]}</figcaption>'
        f'<iframe src="{slug}.html" title="{spec["title"]}"></iframe></figure>'
        for slug, spec in DIRECTIONS.items()
    )
    cells += (
        '<figure><figcaption>F · Tint board — the same components in three '
        'subject hues</figcaption><iframe src="tint-board.html" '
        'title="Tint board"></iframe></figure>'
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Theme directions</title>
<style>
  body {{
    margin: 0;
    background: #dddad2;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    color: #23211d;
  }}
  .sheet {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    padding: 18px;
  }}
  figure {{ margin: 0; }}
  figcaption {{
    font-size: 12px;
    line-height: 1.45;
    padding: 0 2px 7px;
  }}
  iframe {{
    display: block;
    width: 100%;
    height: 1180px;
    border: 1px solid #b8b4aa;
    background: #fff;
  }}
</style>
</head>
<body>
<div class="sheet">{cells}</div>
</body>
</html>
"""


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(EXTRA_CSS, OUT / "extra.css")

    for slug, spec in DIRECTIONS.items():
        body = lesson(spec["subject"], f"{spec['title'].split(' · ')[1]} · {spec['subject']}")
        (OUT / f"{slug}.html").write_text(
            page(spec["title"], slug, spec["css"], body), encoding="utf-8"
        )
        print(f"wrote {slug}.html")

    (OUT / "tint-board.html").write_text(tint_board(), encoding="utf-8")
    (OUT / "board.html").write_text(contact_sheet(), encoding="utf-8")
    print("wrote tint-board.html")
    print("wrote board.html")
    print(f"\n{' | '.join(DIRECTIONS)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
