"""Give a chapter's overview page the shape of an opener.

Every chapter opens on a plain Markdown page, `Chapter n/index.md`, written the
same way as every other page: a title, the objectives, the chapter problem, where
the idea is used, and a roadmap. That shape is right for the author and it is one
long column for the reader, so the opener's structure is added to the rendered
HTML rather than authored 132 times.

Three things are added, all of them static markup:

* the chapter number, lifted out of the title into a quiet mono kicker, with the
  ``<h1>`` and its ``id`` left exactly as they were, so deep links keep working;
* the chapter problem, wrapped in a section the stylesheet can set as a pull
  quote, so the problem reads as the page's statement rather than one heading
  among six;
* the first section's action, a link to the page the reader would reach next,
  placed under the title.

Nothing here is revealed by a script. A reader with scripting off sees the kicker,
the problem and the action.

The action is not added by the hook itself: it is the page *after* this one in the
reading order, and a hook is given one page and not its neighbours. The pipeline
owns that order, so it calls :func:`add_action` with the neighbour it already
computed for the pager. One rule, used twice: the pager's "next" and the opener's
action cannot disagree about what comes first.
"""

from __future__ import annotations

import html
import re

#: A chapter's own page, and nothing deeper: `Chapter 1/Section 1.1/...` is a
#: section's page, not the opener.
CHAPTER_INDEX = re.compile(r"^Chapter \d+/index\.md$")

FIRST_H1 = re.compile(r"(<h1\b[^>]*>)(.*?)(</h1>)", re.S)
NUMBERED = re.compile(r"^(Chapter\s+\d+)\s*:\s*(\S.*)$", re.S)
HEADING = re.compile(r"(<h2\b[^>]*>)(.*?)(</h2>)", re.S)
TAG = re.compile(r"<[^>]+>")
END_OF_H1 = re.compile(r"</h1>", re.I)

#: The heading the chapter problem is authored under, and the Review page's
#: heading that must not be mistaken for it.
PROBLEM = "the chapter problem"
SOLVED = "the chapter problem, solved"


def is_chapter_index(src_path: str) -> bool:
    return bool(CHAPTER_INDEX.match(src_path))


def heading_text(markup: str) -> str:
    """A heading's text, with the tags of inline markup dropped."""
    return TAG.sub("", markup).strip()


def kicker(content: str) -> str:
    """Move the chapter number out of the ``<h1>`` into a kicker before the title.

    The number stays *inside* the heading element, wrapped in a span: the heading's
    text is unchanged for a screen reader, the ``id`` is untouched, and the CSS can
    set the span as a line of its own.
    """
    match = FIRST_H1.search(content)
    if not match:
        return content
    parts = NUMBERED.match(heading_text(match.group(2)))
    if not parts:
        return content
    number, title = parts.group(1).strip(), parts.group(2).strip()
    opening = match.group(1)
    body = f'<span class="chapter-kicker">{number}</span>{title}'
    return content[: match.start()] + opening + body + match.group(3) + content[match.end():]


def problem(content: str) -> str:
    """Wrap the chapter problem, from its heading to the next section, in a section."""
    for match in HEADING.finditer(content):
        label = heading_text(match.group(2)).lower()
        if not label.startswith(PROBLEM) or label.startswith(SOLVED):
            continue
        following = HEADING.search(content, match.end())
        end = following.start() if following else len(content)
        identifier = re.search(r'id="([^"]*)"', match.group(1))
        labelled = f' aria-labelledby="{identifier.group(1)}"' if identifier else ""
        quote = content[match.end(): end].strip()
        return (
            content[: match.start()]
            + f'<section class="chapter-problem"{labelled}>'
            + match.group(1)
            + match.group(2)
            + match.group(3)
            + f'<div class="chapter-problem__quote">{quote}</div>'
            + "</section>"
            + content[end:]
        )
    return content


def add_action(content: str, following: dict | None, prefix: str = "") -> str:
    """Place the first section's link under the title.

    ``following`` is the reading order's next page, the same neighbour the pager
    uses, and ``prefix`` is the page's own depth in the build, exactly as the
    pager applies it. The action is used only when that page *starts a section* —
    the pager's own word for it — because a chapter that ends without a section
    has no first section to offer and the Review is already one link away.
    """
    if not following or following.get("eyebrow") != "Next section":
        return content
    match = END_OF_H1.search(content)
    if not match:
        return content
    title = str(following.get("title") or "").strip()
    title = re.sub(r"\s+—\s+[^—]+$", "", title).strip() or title
    href = prefix + str(following.get("href") or "")
    action = (
        '<p class="chapter-start">'
        '<span class="chapter-start__label">Start the chapter</span>'
        f'<a href="{html.escape(href, quote=True)}">{html.escape(title)}</a>'
        "</p>"
    )
    return content[: match.end()] + action + content[match.end():]


def on_page_content(content: str, page, config, files) -> str:
    if not is_chapter_index(page.file.src_path):
        return content
    return problem(kicker(content))
