# Decisions

A dated, appendable log of decisions that need to be findable. It is a record,
not an essay: newest entries at the top, each one short and specific. Anything
that is work rather than a decision belongs in `todo.md`.

---

## 2026-10-11 — The theme bundles are ours

**Decision.** The collection ships six theme bundles, all original work designed
in this repository. The third-party palettes are gone.

**Why.** The bundles were named after other people's palettes (Catppuccin,
Gruvbox, Kanagawa, Tokyo Night, Synthwave '84, Arc Blueberry) and carried their
hex values. Their licences are permissive, but shipping them made the collection
depend on getting someone else's attribution exactly right. That is a risk with
no upside for a static textbook, so we designed our own in the same directions.

**What replaced what.** Seven bundles were deleted and four were written. Two
were kept.

| Deleted | Replaced by | Direction |
|---|---|---|
| Catppuccin, Gruvbox | Harbour | soft, low-chroma, cool |
| Arc Blueberry, Tokyo Night | Neon | cyberpunk glass terminal |
| Synthwave '84, Archwave | Phosphor | CRT amber and acid green |
| Kanagawa | Glass | glassmorphism developer OS |

`Clean` (monochrome) and `Editorial` (warm paper, serif) were already ours and
are unchanged. The four new directions — Harbour, Neon, Phosphor, Glass — come
from a mood board of other work and are direction only: every value here was
chosen and checked for this collection. The vivid light members are the
deliberate hard case, because a light cyberpunk terminal is a contradiction;
each is built on purpose from its dark member's hues and says so in the file,
rather than being a mechanical inversion of the dark palette.

**Provenance.** `themes/*.yaml` records, per member, that the palette is
`original: true`. The loader requires `source`/`observed` for anything that is
genuinely observed from, or derived from, another project, and refuses an
original member that claims to be observed.

**Licence.** The palettes are original work by this collection, released under
the collection's own licence: content under CC BY 4.0, engine source under MIT.
No third-party palette hex or attribution is carried.
