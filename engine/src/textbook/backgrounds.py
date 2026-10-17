"""Where an animated background may run, and which one.

**Nothing ships one yet, deliberately.** No topic in this book needs one, the
collection's own rule is that decoration competes with the practice budget
(`AGENTS.md`), and the honest prior is that motion distracts a reader reading
mathematics. What lives here is the *seam*, so adding one later is a registry
entry and a config line rather than a change to the shell.

Measured before deciding, not after: `research/design/background-effects.md`
has the numbers, and the finding that decided the shape is that a canvas or
WebGL effect is *cheaper* than a CSS animation because it can stop.

## Scopes, narrowest first

A page resolves to exactly one animation id, or none:

| Scope | Where it is written | Meaning |
|---|---|---|
| `sections: {"5.3": field}` | `book.yaml` | one section |
| `chapters: {"5": field}` | `book.yaml` | a whole chapter |
| `default: field` | `book.yaml` | every page of the book |
| `site: field` | `collection.yaml` | the landing page |

The narrowest match wins, so a chapter can set a background for its sections and
one section can turn it off again with `null`. That is the "map an animation to
the whole site, to a chapter, or to a section" requirement, and it is the whole
of the requirement: nothing else decides.

## The page states it; nothing consumes it yet

`templates/page.html` carries the resolved id as `data-background` on `<html>`.
A runtime added with the first animation reads that attribute and mounts into a
named slot — the masthead, or another piece of chrome, never the reading column.
Until then the attribute is a declaration with no consumer, which is what makes
the later change small: the mapping is already data, and already tested.

## Why an id and not a module path

Config names an animation; `ANIMATIONS` names the module. A configured id that is
not registered fails the build, exactly as an unknown `:::figure` slug does, so a
typo is caught at build time rather than rendering nothing at runtime in
production.
"""

from __future__ import annotations

#: Registered animations: id -> the module the runtime would import.
#:
#: Empty on purpose. The first entry lands with the first animation, and its
#: module must: read its colours from `--tb-*` on the page (a canvas cannot read
#: a CSS custom property, so it takes them from computed style — see
#: `research/design/background-effects/palette.js`), stop on
#: `prefers-reduced-motion`, pause when the tab is hidden or the slot is
#: offscreen, and leave the page complete with scripting off.
ANIMATIONS: dict[str, str] = {}


def resolve(
    collection: dict | None,
    book: dict | None = None,
    section: str | None = None,
    chapter: int | str | None = None,
) -> str | None:
    """The animation that applies to one page, or ``None``.

    ``book`` is the mapping under ``backgrounds:`` in `book.yaml` — possibly
    empty — not the whole file. ``collection`` is the whole of `collection.yaml`,
    because the landing page is not in a book and resolves from the site scope.

    Narrowest match wins. ``None`` and a missing key both mean "nothing here",
    which is what lets a section switch off a chapter's background.
    """
    book_bg = book if isinstance(book, dict) else {}
    sections = book_bg.get("sections") or {}
    chapters = book_bg.get("chapters") or {}

    if section is not None and isinstance(sections, dict) and str(section) in sections:
        return _animation(sections[str(section)])
    if chapter is not None and isinstance(chapters, dict) and str(chapter) in chapters:
        return _animation(chapters[str(chapter)])
    if "default" in book_bg:
        return _animation(book_bg["default"])

    site_bg = (collection or {}).get("backgrounds") or {}
    if isinstance(site_bg, dict) and "site" in site_bg:
        return _animation(site_bg["site"])
    return None


def _animation(value: object) -> str | None:
    """A configured value as an animation id, or ``None`` for "nothing here"."""
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def validate(backgrounds: dict | None, where: str = "backgrounds") -> list[str]:
    """Every configured animation id must be registered.

    Takes one `backgrounds:` mapping — from `book.yaml` or from `collection.yaml`
    — and returns the problems rather than raising, so the caller can report them
    beside the file they came from. An unknown id is a typo, and a typo that
    silently renders nothing is exactly the failure this exists to prevent.
    """
    problems: list[str] = []
    if not backgrounds:
        return problems
    if not isinstance(backgrounds, dict):
        return [f"{where}: expected a mapping"]
    for scope in ("site", "default"):
        value = _animation(backgrounds.get(scope))
        if value and value not in ANIMATIONS:
            problems.append(f"{where}.{scope}: {value!r} is not a registered animation")
    for scope in ("chapters", "sections"):
        group = backgrounds.get(scope) or {}
        if not isinstance(group, dict):
            problems.append(f"{where}.{scope}: expected a mapping")
            continue
        for key, raw in group.items():
            value = _animation(raw)
            if value and value not in ANIMATIONS:
                problems.append(
                    f"{where}.{scope}.{key}: {value!r} is not a registered animation"
                )
    return problems
