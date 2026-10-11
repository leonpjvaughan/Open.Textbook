# Theme bundles as light/dark groups

Research note. **Nothing here is implemented.** It records where the colour ideas
come from, what the sources actually are, and the model I would use to make the
existing bundles fit the light/dark pairing rule.

## The question

Every bundle in `themes/` must be a complete light **and** dark palette, and
`tests/test_themes.py` enforces it (`test_bundle_is_a_light_and_dark_pair`,
`test_bundle_palette_is_complete`). That is the light/dark group requirement.

The four bundles we have were assembled from sources that do not ship in pairs —
chiefly Omarchy's stock themes. So the questions are:

1. **What are those sources actually?** Omarchy is presented as a theme system
   but its unit is a single-mode palette. Mounting one as a "bundle" is a
   category error, and the bundle named `omarchy` is the symptom.
2. **Which other sources publish a genuine pair** (a family with a light and a
   dark member), so a bundle can be two observed palettes rather than one
   observed and one invented?
3. **What does "make the existing styles fit" mean concretely** — a rename, a
   schema change, or a rewrite of the palettes?

The direction the repository already took in `SHAPE.md` ("Theme bundles") answers
3 in principle: a bundle is the *reading experience*, a book supplies only a
subject tint, and the two multiply. This note keeps that and tightens only what a
bundle is allowed to be.

## What landed

The collection now ships **nine** bundles: four calm and five vivid. Each is a
light/dark group with a `family` and a `provenance` block naming each member's
source and whether it is observed or derived.

| Group | Light / dark | Source | Member states |
|---|---|---|---|
| Editorial | Paper / Ink | house | both authored here |
| Clean | White / Black | house | both authored here; `fixed:` refuses the tint |
| Catppuccin | Latte / Mocha | catppuccin/catppuccin | both observed |
| Gruvbox | Light / Dark | morhetz/gruvbox, read via Omarchy | dark observed, light derived |
| Arc Blueberry | Daybreak / Arc Blueberry | vale-c/omarchy-arc-blueberry | dark observed, light derived |
| Tokyo Night | Day / Night | folke/tokyonight.nvim | dark observed, light derived |
| Synthwave '84 | Dawn / Synthwave '84 | robb0wen/synthwave-vscode | dark observed, light derived |
| Kanagawa | Lotus / Wave | rebelot/kanagawa.nvim | both observed |
| Archwave | Dawn / Archwave | davidguttman/archwave | dark observed, light derived |

Archwave arrived after the 4 + 4 decision, on the strength of its palette, and
makes the collection nine rather than eight. It is a good palette and it is also
the closest thing to a duplicate in the set: magenta-and-cyan on deep aubergine
is the same position as Synthwave '84, with pastels instead of neon. If the menu
has to go back to eight, the choice is between those two — Synthwave is the
louder and Archwave the softer, and there is no measurement that prefers either.

`id: omarchy` is gone. The examples below are the research that produced this;
the "Candidates" section is kept as the record of the shortlist and what was not
taken.

The preview run (`test/theme-preview.cjs`) then found four defects that the
palette tests could not, all of which are fixed:

1. **An accent that only fails where no subject tint replaces it.** catppuccin
   light (`#1e66f5`, 4.34:1) and gruvbox light (`#427b58`, 4.40:1) were only ever
   measured *composed* with a book's tint, which replaces the accent. The landing
   page has no tint, so it showed the bundle's own, under AA. Fixed in the
   palettes, and guarded by `test_every_bundle_is_readable_with_no_subject_tint`.
2. **`ink_soft` on the landing card.** The card is `color-mix(ink 4%, paper)`
   and carries its body text in `ink_soft`; catppuccin light was 4.13:1 and
   kanagawa light 4.24:1 there. `ink_soft` was not checked against any surface.
   Fixed in the palettes, and `contrast_problems` now measures it against the
   card, pinned to `portal.css` by `test_the_card_surface_matches_the_stylesheet`.
3. **Material's palette stylesheet beat our link mapping.** In dark mode
   `--md-typeset-a-color` stayed Material's indigo `#5488e8` for every bundle,
   because `[data-md-color-scheme=slate][data-md-color-primary=indigo]` is
   (0,2,0) and our bare `[data-md-color-scheme]` is (0,1,0). So the bundle's
   `link` token was ignored in dark mode — 4.26:1 on gruvbox's page, 4.41:1 on
   Synthwave's, both under AA — and it also coloured the active nav item. Fixed
   in `extra.css` by tying at (0,2,0), which wins on load order.
4. **The header's title was white on the accent.** `--md-primary-bg-color` was
   Material's white, which is 2.54:1 on a light accent — and the dark scheme's
   subject tint is exactly that. Fixed by mapping it to `accent_ink`, the token
   item 17 introduced for text drawn on the accent, but which the header had
   never been given.

## Sources reviewed

### A. omarchy.org/themes is a gallery, not a palette

Measured this session:

| Check | Result |
|---|---|
| `curl https://omarchy.org/themes/` | `200`, 152,600 bytes |
| distinct GitHub theme links on the page | **140** |
| stock themes on this machine, `/usr/share/omarchy/themes/` | **22** |
| of those, `mode = "dark"` | **17** |
| of those, `mode = "light"` | **5** (`catppuccin-latte`, `flexoki-light`, `lupine`, `rose-pine` = Dawn, `white`) |

The unit of an Omarchy theme is one `colors.toml` with a single `mode`:

```toml
# /usr/share/omarchy/themes/catppuccin/colors.toml
mode = "dark"
accent = "#89b4fa"
background = "#1e1e2e"
foreground = "#cdd6f4"
```

`catppuccin` and `catppuccin-latte` are **two separate themes**, not two halves
of one. So:

- **Omarchy is a distribution of palettes, not a palette.** Naming a bundle after
  it is like naming a font after the package manager that installed it. That is
  why `id: omarchy` should go.
- Roughly 77% of the stock set is dark-only, so a gallery theme normally supplies
  **at most one** of the two members we need. A group is assembled, not found.

The user's example, [Arc Blueberry](https://github.com/vale-c/omarchy-arc-blueberry),
is one of these: `mode = "dark"`, `background = "#111422"`,
`foreground = "#bcc1dc"`, `accent = "#8eb0e6"`, `selection = "#313b62"`,
`muted = "#424761"`. It ships no light variation. Its own `vscode.json` names the
VS Code extension `BeardedBear.beardedtheme` — many gallery themes are **ports of
palettes that already exist elsewhere**, which is the useful part: the family is
the palette, and the gallery is one place it has been applied.

### B. The families behind the gallery, which do publish both

These are the real sources to draw bundles from. Hexes below are the ones I read
from each family's own publication this session.

| Family | Light member | Dark member | Notes for a textbook |
|---|---|---|---|
| **Solarized** | `base3 #fdf6e3` paper, `base00 #657b83` ink | `base03 #002b36` paper, `base0 #839496` ink | The canonical pair; deliberately low chroma and low contrast, designed for sustained reading. The eight accents are fixed (`yellow #b58900`, `orange #cb4b16`, `red #dc322f`, `magenta #d33682`, `violet #6c71c4`, `blue #268bd2`, `cyan #2aa198`, `green #859900`). |
| **Flexoki** | `paper #FFFCF0`, `black #100F0F` | same ramps | "An inky color scheme for prose and code… designed for reading and writing on digital screens… inspired by analog printing inks and warm shades of paper" (its README). Publishes a full **50–950 ramp per hue** plus 400/600 accents — one source supplies both members, which is the cheapest kind of group to maintain. |
| **Rosé Pine** | Dawn `base #faf4ed`, `text #464261` | Main `base #191724`, `text #e0def4`; Moon `base #232136` | Semantic roles from `rose-pine/palette`: `base`, `surface`, `overlay`, `muted`, `subtle`, `text`, plus `love/gold/rose/pine/foam/iris`. A ready-made map onto our tokens. |
| **Everforest** | light × hard/medium/soft | dark × hard/medium/soft | "Green based… warm and soft in order to protect developers' eyes… designed to have soft contrast" (its README). Deliberately gentle, which suits long reading. |
| **Catppuccin** | **Latte** `#eff1f5` / `#4c4f69` | **Mocha** `#1e1e2e` / `#cdd6f4` (and Frappé, Macchiato) | This is what the `omarchy` bundle already *is*. |
| **Gruvbox** | light | dark | We already ship both; our dark is Omarchy's copy and our light is derived (see below). |
| **Kanagawa** | Lotus | Wave / Dragon | Japanese-print palette; calm, low-chroma. |
| **One, Tokyo Night, GitHub, Dracula** | One Light / Day / Light | One Dark / Night / Dark / Dracula | All publish pairs except Dracula, which is dark-only. |

### C. VS Code: pairs are shipped as semantic token sets

VS Code's own "Light Modern" / "Dark Modern" is the model I would copy, because
it is a *group* in the same sense and it shows the thing WCAG hides. Read from
`microsoft/vscode`, `extensions/theme-defaults/themes/{light,dark}_modern.json`:

| Semantic role | Light Modern | Dark Modern |
|---|---|---|
| `editor.background` | `#FFFFFF` | `#1F1F1F` |
| `editor.foreground` | `#3B3B3B` | `#CCCCCC` |
| `focusBorder` / `button.background` | `#005FB8` | `#0078D4` |
| `textLink.foreground` | `#005FB8` | **`#4daafc`** |
| `panel.border` | `#E5E5E5` | `#2B2B2B` |
| `sideBar.background` | `#F8F8F8` | `#181818` |

Two things to take:

1. **The same role resolves to a different value per mode.** The accent is not
   carried across; it is re-picked. `#005FB8` in light becomes `#0078D4` in dark,
   not the same hex on a different surface.
2. **In light, link and accent are the same colour. In dark, the link is much
   lighter than the accent** (`#4daafc` vs `#0078D4`). That is the polarity
   asymmetry, expressed by a real product team, and it is why our dark members
   need their own tuning rather than a shade of the light member.

### D. OpenDesign: directions and the colour reference

From the local daemon (`od tools directions --json`, `od plugin list`,
`od /api/skills`):

- **Five built-in directions**, each a mood + font stacks + an OKLCH palette +
  a "posture" list: `editorial-monocle`, `modern-minimal`, `human-approachable`,
  `tech-utility`, `brutalist-experimental`. Our `editorial` bundle is closest to
  `editorial-monocle`, whose palette is `bg oklch(98% 0.004 95)`,
  `fg oklch(20% 0.018 70)`, `border oklch(90% 0.006 95)`,
  `accent oklch(52% 0.10 28)` — note the **accent chroma is only 0.10**, and its
  posture says "one accent color, used at most twice". That is a discipline worth
  borrowing: a textbook's accent should be a signal, not decoration.
- **Design-system plugins** that describe our neighbourhood: `editorial`,
  `paper`, `publication`, `warm-editorial`, `clean`, `kami`. `kami` is the most
  specific and the most useful: warm parchment (`#f5f4ed`, never `#ffffff`), one
  ink-blue accent (`#1B365D`), hierarchy carried by a serif at a single weight,
  "no cool grays, no hard shadows". `warm-editorial` gives the same idea with a
  terracotta accent and "never use pure black or pure white".
- **The `color-expert` skill** (catalogue entry → upstream
  `meodai/skill.color-expert`, ~200 reference files). The passages that matter:

  > "The chroma of a color can be perceived differently between light and dark
  > modes as a result of the [Helmholtz–Kohlrausch effect]… For dark mode, less
  > saturated tones may appear more appropriate and can be less strain on a
  > users' eyes." — `colorandcontrast/ui-design.md`

  > "Relative luminance contrast performs poorly for evaluating contrast in dark
  > mode. Light text colors on dark backgrounds need increased relative luminance
  > contrast." — `colorandcontrast/accessibility.md`

  > "Polarity-sensitive (light-on-dark ≠ dark-on-light)… Light text on dark
  > backgrounds needs MORE contrast than dark text on light backgrounds at the
  > same sizes. WCAG 2.x treats them identically — APCA doesn't." … "WCAG 2
  > contrast fails most with dark colors." — `techniques/apca-myndex-contrast.md`

  APCA's published levels (Bronze): `Lc 75` body text, `Lc 60` medium text,
  `Lc 45` large text, `Lc 30` spot reading/icons; Bridge-PCA `Lc 72` ≈ WCAG
  `4.5:1`. And from `chroma-vs-saturation.md`: chroma is distance from the equal-
  lightness grey; saturation is a ratio that "demands less chroma at low
  brightness" — which is why a naive HSL inversion of a light palette misbehaves
  in dark mode.

## Findings

**F1 — `omarchy` is the wrong name, and the wrong kind of source.** It is a
distribution. Its stock themes are single-mode, so it cannot supply a group. The
bundle should be renamed to the palette it actually is: **Catppuccin** (Latte +
Mocha). Keep the note that it was read from Omarchy's copy, because that is the
provenance of the hexes.

**F2 — A light/dark group is two palettes, not one palette inverted.** The
perceptual problems differ, and the sources agree: grey text and chromatic text
behave differently on dark surfaces, dark surfaces need more luminance contrast,
and dark mode wants less chroma. So each member is authored and checked on its
own.

**F3 — Our contrast invariant is one-sided.** `MIN_CONTRAST` applies the same
WCAG ratio to both schemes. That is exactly the symmetry APCA exists to criticise,
and `ink 7:1` on paper is *stricter* than needed in light and *weaker* than needed
in dark. WCAG is still the compliance bar and should stay; APCA is the right
second check for the dark member.

**F4 — A ramp-based family is the cheap group.** Flexoki and Solarized publish
hues as ramps, so both members come from one source and one commit, and adding a
bundle is a mapping rather than a construction. A family that publishes one
flavour (Arc Blueberry, Dracula, Nord) requires a derived member; that is
allowed, but it must be labelled (see the model).

**F5 — The gallery is still the best *discovery* surface.** 140 themes is a good
place to find a hue direction; it is a bad place to find a pair. Use it to pick
families, then go the family's own repository for the two members and the
provenance.

**F6 — `themes/gruvbox.yaml`'s framing is wrong.** Its header calls Omarchy "a
family of palettes". It is not a family; it is a catalogue. The provenance text
should say what was read and from where, and stop implying a taxonomy.

## The model I would adopt

> **A bundle is a group: one named palette family, a complete light member, a
> complete dark member, and a recorded provenance for each member — the source,
> and whether the member is observed from that source or derived for this
> collection.**

That is a one-paragraph statement of the rule the code already half-enforces. In
`themes/<id>.yaml`:

```yaml
id: catppuccin
title: Catppuccin
description: >-
  Soft, muted and even-tempered: Latte on paper, Mocha on midnight. Low chroma
  and gentle rules, which is what keeps it comfortable over a long chapter.

group:
  family: Catppuccin
  light:
    name: Latte
    source: https://github.com/catppuccin/catppuccin
    observed: true          # hexes read from the upstream palette
  dark:
    name: Mocha
    source: https://github.com/catppuccin/catppuccin
    observed: true
```

and for a family with one member:

```yaml
group:
  family: Gruvbox
  light:
    name: Light
    source: https://github.com/morhetz/gruvbox
    observed: false         # derived here, from Gruvbox's own hues
    note: >-
      Omarchy ships gruvbox dark only. The light member is derived from the same
      upstream hues and is not an upstream palette; it is checked by the same
      contrast invariant as any other.
  dark:
    name: Dark
    source: https://github.com/morhetz/gruvbox
    observed: true
```

`observed: false` is the only interesting flag. It is what stops a derived
palette from being presented as something the upstream project published, and it
is exactly the honesty the current `gruvbox.yaml` header already tries to express
in prose.

### The token map

Mapping an OpenDesign direction (or any family) onto our 14 tokens is the whole
translation, and it is worth writing down once:

| Direction role | Our token | Note |
|---|---|---|
| `bg` | `paper` | never pure `#ffffff` for a reading bundle (see `kami`, `warm-editorial`) |
| `surface` | `code_bg`, and the figure panel | the panel is `color-mix(paper 92%, ink 8%)`, not a token |
| `fg` | `ink` | |
| `muted` | `ink_soft` | |
| (fainter) | `ink_lighter` | |
| `border` | `rule` | |
| `accent` | `accent`, `accent_light`, `accent_dark` | |
| (text on accent) | `accent_ink` | ours; the direction grammar has no equivalent |
| `link` | `link` | re-picked per mode, per VS Code |
| status / marks | `fig_warn`, `fig_good`, `fig_grid` | ours |

## Candidates

The shortlist the eight were drawn from, and what was not taken. The menu is a
reading choice, not a catalogue: each group costs a line in `collection.yaml`
and multiplies by book × scheme in the contrast test (cheap), but it also costs
the reader attention (not cheap). Eight was the ceiling agreed for now.

| Group | Light / dark members | Status | Why |
|---|---|---|---|
| **Editorial** | house pair | taken — calm | the calm default, serif display |
| **Clean** | house pair | taken — calm | monochrome by design; `fixed:` refuses the tint |
| **Catppuccin** | Latte / Mocha | taken — calm | the rename of `omarchy`; low chroma, gentle rules |
| **Gruvbox** | Light (derived) / Dark | taken — calm | warm earth, a second serif family |
| **Arc Blueberry** | Daybreak (derived) / Arc Blueberry | taken — vivid | the user's example; one bright accent on midnight navy |
| **Tokyo Night** | Day (derived) / Night | taken — vivid | blue and violet; upstream's own light is generated, not authored |
| **Synthwave '84** | Dawn (derived) / Synthwave '84 | taken — vivid | the loudest of the four; magenta on purple-black |
| **Kanagawa** | Lotus / Wave | taken — vivid | the only new group whose two members are both the family's own |
| **Archwave** | Dawn (derived) / Archwave | taken — vivid | a 5th vivid, added after the 4 + 4 split; soft vaporwave pastels |
| Solarized | Light / Dark | **not taken** | both observed and designed for sustained reading, but the six-group plan became 4 calm + 4 vivid, and Catppuccin and Gruvbox already occupy the low-chroma calm slot |
| Flexoki | Light / Dark | **not taken** | the cheapest group to maintain (one ramp per hue), and the best remaining candidate if a calm group is swapped |
| Rosé Pine | Dawn / Moon | **not taken** | softer and cooler; would overlap Kanagawa |
| Everforest | Light / Dark | **not taken** | deliberately soft green; overlaps Gruvbox |

Four of the five vivid lights are **derived**, which is the honest consequence
of what the upstream projects publish: vivid palettes are usually dark-only, and
an inversion is not a palette. Each says so in a `note`. If a vivid group whose
light is genuinely observed is wanted, Kanagawa is the one that already has it —
and Solarized, Flexoki and Everforest are the observed-pair groups still on the
table.

## What to do about the existing bundles

Concretely, in order:

1. `themes/omarchy.yaml` → `themes/catppuccin.yaml`; `id: catppuccin`,
   `title: Catppuccin`, and a description that names Latte and Mocha. The header
   keeps the provenance ("read from `/usr/share/omarchy/themes/catppuccin*`") —
   that is where the hexes came from, and it stays true.
2. `themes/gruvbox.yaml` header: drop "a second member of the Omarchy family";
   state the family and the derived light member. Add `group:` as above.
3. Add `group:` to `editorial` and `clean`, with `family: <house>` and a note
   that both members are authored in this repository (they are not upstream
   palettes, and pretending otherwise would be worse).
4. `collection.yaml`: menu order; `default_theme` stays `editorial`.
5. Re-run `python -m textbook.scaffold` (regenerates `themes.css` **and** the
   `themes`/`theme_info` blocks inside `renderers/mkdocs/<book>.<profile>.yml`)
   and `python -m textbook.portal`. Both are generated, so both must ride in the
   same commit as the rename or the drift check fails.
6. Update the places that name the old id: `AGENTS.md` (the screenshot example
   `--theme omarchy`, and the "stock Omarchy palettes" sentence — that one is a
   *provenance* claim and stays), `SHAPE.md` (same), `tests/test_themes.py` (the
   `[default-omarchy]` id in a docstring), `todo.md` item 17.
7. When a new family is added, record its licence and attribution. The palette
   projects are permissively licensed, but the collection credits upstreams, and
   item 11 (colophon) is where that belongs.

## Enforcement to add

The current tests check completeness and contrast. To make the model real, add:

1. **`family` and provenance are required.** `load_bundle` rejects a bundle with
   no `group.family`, or without a `name`/`source`/`observed` for each member.
   `test_a_bundle_may_not_invent_a_token` already sets the precedent for a
   `load_bundle`-level rejection with a clear message.
2. **A derived member is labelled.** If `observed: false`, a `note` is required —
   prose that says what was derived and from what. This is the machine-checkable
   version of what `gruvbox.yaml` already says in a comment.
3. **The id names the family, not the distribution.** A test that `"omarchy"` is
   not a bundle id, with the finding recorded above as the reason, so the mistake
   cannot return.
4. **An APCA check on the dark member** (F3), in pure Python — the formula is
   short and the thresholds are published. WCAG stays as the compliance bar; APCA
   is the second opinion that stops a dark palette passing on a technicality.
   Start with `ink` on `paper`, `link` on `paper`, `accent` on `paper` and
   `accent_ink` on `accent`, at the Bronze levels (`ink` Lc 75, others Lc 60 or
   Lc 45 by role), and see which of the current palettes fail before choosing the
   threshold — the point of the check is what it finds, not the number.
5. **A sourced note** that the figure-token thresholds and the dark-mode
   asymmetry live in `themes.py` next to the values, as they already do.

## Open questions

- **How many groups?** Six proposed. The collection currently has four, and the
  theme menu is a reading choice, so this is a product decision before it is an
  engineering one.
- **Is `editorial` still the right default?** It is the calmest and the most
  "long reading rather than looking at", which matches the collection's stated
  purpose. I would keep it.
- **Do we want a vivid bundle at all?** Arc Blueberry is beautiful and it is the
  opposite of the six above. If the answer is yes, it is the first group whose
  light member would have to be derived, and it should be labelled as such.
- **Attribution.** Palettes are collective work; the colophon (item 11) should
  name each family and its licence. Not a blocker, but it is the reason the
  provenance field is worth having in the data rather than only in prose.
