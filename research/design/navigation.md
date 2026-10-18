# Previous / next at the end of a page

**Question.** A reader who reaches the bottom of a page should be able to carry on
without going back to the contents. On a phone the contents are a drawer, so the
alternative is a scroll to the masthead and a tap — and a reader who has just finished
a section is exactly the reader most likely to carry on.

## What the pattern is

Every documentation site of the last decade ends a page the same way: two large targets,
`← Previous` on the left and `Next →` on the right, both labelled with the **destination**
rather than "next page". The useful refinements are all about saying *where* the link
goes before it is read:

- **The destination's own title is the label.** "Next" alone tells a reader nothing they
  did not already know from the arrow.
- **An eyebrow names the kind of move** — page, section, chapter, chapter review. This is
  the part that makes a pager work in a book rather than a flat document: "Next chapter"
  is a different promise from "Next page", and it is the only line that fits on a phone.
- **Two targets, then one.** A two-column split is comfortable from about `44rem`; below
  that, each half is under the 44px a thumb needs, so they stack full-width.
- **A spacer when one side is empty**, because a lone "next" that drifts left reads as
  "previous".
- **Out of the search index** (`data-pagefind-ignore`), or every excerpt quotes "Next
  section".
- **`rel="prev"` / `rel="next"` on the anchors, and `<link rel>` in the head**, rendered
  from the same neighbour: the machine-readable half of the same fact, for a crawler, an
  extension and a print stylesheet. This is the "back end" of the feature on a static
  site — the links are computed at build time, so there is no JavaScript, no runtime
  state, and it works offline and in print.

## What this book does

`pipeline.pager_for` gives every page its previous and next, from **`nav_paths`** — the
same list the sidebar is built from, so the pager cannot disagree with the contents.

Two deliberate differences from the sidebar:

1. **The reading order is not the reference order.** The sidebar lists the glossary
   first, so following "next" from the cover would land a reader in the glossary.
   Reference material reads *after* the course, so the glossary is the tail of the chain
   and nothing else moves.
2. **A chapter's index and its Review are named.** A neighbour that is `Chapter 1/index.md`
   is "Chapter contents", not the next chapter; a neighbour that is `Chapter 1/Review/`
   is the end of the chapter rather than the start of the next.

The first and last pages get one target and a spacer; the cover's next is Chapter 1 and
the last page has no next. The 404 is not in the chain and carries no pager.

## What was rejected

- **A sticky bar at the bottom.** It would sit over the content on a phone, over the
  booklet panel, and over a figure — and every figure is already a panel with its own
  controls.
- **Keyboard shortcuts** (`[`/`]`). The links are in the tab order, and a shortcut that
  competes with a browser's is worse than one more tab stop. Revisit only if a reader
  asks for it.
- **Chapter-level links on every page** (both "previous chapter" and "previous page").
  Four links at the foot is a menu, not a pager; the eyebrow already says when a move
  crosses a chapter boundary.
- **A generated `next` that skips pages** (Learn → next section's Learn). A reader who
  wants the practise pages is not served by skipping them, and the chain must be a chain
  or "previous" stops retracing "next".

## Measured

- 458 pages in `gcse-maths` higher; the pager adds ~90 bytes of markup and one `<nav>`
  per page.
- `tests/test_pager.py` pins the chain's symmetry, the eyebrows' eight cases, the body
  and head agreeing, the spacer, the search-index exclusion, and that the 404 has none.
