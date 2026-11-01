#!/usr/bin/env python3
"""Render a book as static HTML without a third-party site generator.

This is the "own the pipeline" build: the engine's hooks do the transformations,
the design system is plain CSS, navigation comes from ``curriculum.yaml``, and
this module supplies the last mile — Markdown to HTML, the page shell, the search
index, and link validation.

    python -m textbook.pipeline --book gcse-maths --profile higher
    python -m textbook.pipeline --chapter 1          # a subset, for fast checks
    python -m textbook.pipeline --serve              # rebuild on change

Why it exists: MkDocs 1.x is unmaintained (no release since 2024-08-30, and the
repository was closed to outside contribution in October 2026), Material for
MkDocs reaches end of life on 2027-05-05, and neither MkDocs 2.0 nor Zensical
will run these hooks — Zensical ignores ``hooks:`` silently, exiting 0 with
``--strict`` reporting no issue, which would ship a site with every directive,
tier filter and maths render missing.

The hooks are reused **unchanged**. They read only ``page.url``,
``page.file.src_path``, ``config["extra"]`` and ``files``, so a plain dict and a
``SimpleNamespace`` are enough to drive them.
"""

from __future__ import annotations

import argparse
import html
import json
import logging
import posixpath
from functools import lru_cache
import re
import shutil
import subprocess
import sys
import time
import unicodedata
import urllib.parse
from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path
from string import Template
from types import SimpleNamespace

import markdown
from markdown.extensions.toc import TocExtension
from pymdownx.arithmatex import ArithmatexExtension

from . import backgrounds
from . import book as books
from . import config as cfg
from . import portal
from . import scaffold
from . import themes
from .frontmatter import FrontMatterError
from .frontmatter import read as read_page
from .frontmatter import split as split_front_matter
from . import hooks
from .hooks import MARKDOWN_HOOKS, prefs
from .themes import default_bundle, ordered_bundles
from .urls import href, prefix_for, slugify, url_for  # re-exported: callers and tests use these

log = logging.getLogger("textbook.pipeline")

TEMPLATES = Path(__file__).resolve().parent / "templates"
CSS = Path(__file__).resolve().parent / "css"
PAGE_TEMPLATE = TEMPLATES / "page.html"
SHELL_CSS = CSS / "shell.css"

#: The sheets the shell links, in cascade order, as site-relative paths.
#:
#: The order is behaviour at every level — the shared design system, then the
#: book's authored sheets, then the engine shell, then the Settings runtime — so it
#: lives here rather than in the template, where adding a seventh sheet is a line in
#: the wrong place waiting to happen. The build writes them in this order and the
#: page links them in this order, from one list.
STYLESHEETS: tuple[str, ...] = (
    "assets/stylesheets/themes.css",
    "assets/stylesheets/extra.css",
    "assets/stylesheets/book.css",
    "assets/stylesheets/book-local.css",
    "assets/stylesheets/shell.css",
    "assets/stylesheets/settings.css",
)


def stylesheet_sources(book: books.Book) -> dict[str, Path]:
    """Where each sheet is authored, by its site-relative path.

    A site path is not a repository path for three of them: two are the shared
    design system in ``assets/``, one belongs to the renderer in ``engine/``, and the
    pair called ``book`` are the book's own.
    """
    root = Path(books.repo_root())
    return {
        "assets/stylesheets/themes.css": root / "assets/stylesheets/themes.css",
        "assets/stylesheets/extra.css": root / "assets/stylesheets/extra.css",
        "assets/stylesheets/book.css": book.docs / "assets/stylesheets/book.css",
        "assets/stylesheets/book-local.css": book.docs / "assets/stylesheets/book-local.css",
        "assets/stylesheets/shell.css": SHELL_CSS,
        "assets/stylesheets/settings.css": root / "assets/stylesheets/settings.css",
    }


#: Hash and naming live in the scaffold, because the figure hook needs the same
#: answer as the copy that writes the file, and `hooks` may not import `pipeline`.
digest = scaffold.digest
addressed_name = scaffold.addressed_name


def hashed_stylesheets(book: books.Book) -> dict[str, str]:
    """Site-relative sheet path -> the path it is written and linked under.

    **Content, not the build label.** A sheet that did not change keeps its URL
    across a deploy, so a reader's cached copy of a book keeps resolving its
    stylesheet instead of fetching the same bytes under a new name. That is what
    makes an offline download survive a release, and it is why the cache name is
    allowed to rotate while these names do not.

    A sheet that is not authored is simply absent from the result, and a page does
    not link what the build did not write.
    """
    written: dict[str, str] = {}
    for relative, source in stylesheet_sources(book).items():
        if not source.is_file():
            continue
        stem, suffix = posixpath.splitext(relative)
        written[relative] = f"{stem}.{scaffold.digest(source)}{suffix}"
    return written


def addressed_assets(book: books.Book) -> dict[str, str]:
    """Every asset a page links directly, by logical path, addressed.

    The stylesheets are computed from their sources; the three runtimes are added
    here because they are copied from one place but linked from another. `booklet.js`
    is absent for a book without one, and the page then carries no script for it.

    `booklet.json` keeps its name on purpose: the widget finds it with
    ``new URL("booklet.json", script.src)``, so it is a *sibling* of the script —
    and it is fetched, not imported, so the worker treats it as network-first.
    """
    addressed = dict(hashed_stylesheets(book))
    # The booklet is the one that depends on the book: a book without one ships
    # neither the script nor the data, and a manifest that named it would point at a
    # file the build deliberately did not write. `tools assets` checks exactly that,
    # which is how this was found — five profiles were claiming a booklet they do not
    # have.
    runtimes = [
        "assets/settings/settings.js",
        "assets/settings/service-worker.js",
        "assets/offline/offline.js",
    ]
    if book.booklet_name:
        runtimes.append("assets/booklet/booklet.js")
    for relative in runtimes:
        source = Path(books.repo_root()) / relative
        if source.is_file():
            addressed[relative] = scaffold.addressed_url(relative)
    return addressed


def stylesheet_links(prefix: str, sheets: dict[str, str]) -> str:
    """The ``<link>`` block for one page, in cascade order, skipping absent sheets."""
    return "\n".join(
        f'<link rel="stylesheet" href="{html.escape(prefix + sheets[relative], quote=True)}">'
        for relative in STYLESHEETS
        if relative in sheets
    )


def asset_manifest(
    book: books.Book,
    sheets: dict[str, str],
    figures: dict[str, str],
    pages: dict[str, int] | None = None,
) -> str:
    """The build's own record of where every named asset was written.

    A content-addressed name cannot be guessed from the source tree, so the build
    has to say what it did. This is what the tests and the tools read instead of
    reconstructing a hash, and it is the seed of the offline manifest: a download
    list is a route list plus these URLs.
    """
    return (
        json.dumps(
            {
                "book": book.id,
                "build": portal.build_label(),
                "assets": sheets,
                "figures": figures,
                "pages": pages or {},
                # What the download would cost on the wire, before compression. The
                # figure a reader is shown is this one, so it is measured here rather
                # than guessed in the browser.
                "bytes": sum((pages or {}).values()),
            },
            indent=2,
            sort_keys=True,
        )
        + "\n"
    )

# The hooks that transform page Markdown, in order. This is the same order as
# hooks/__init__.py, which cannot express it by listing files because several
# hooks want the same event.
# The markdown hook chain, re-exported so a caller can inspect what runs without
# importing the package. Defined in `hooks/__init__.py` because that is where the
# order belongs, and importing it here rather than repeating it is what makes the
# docstring there true. `tests/test_render_hooks.py` asserts they are one object.
#
# `render_page` calls `hooks.on_page_markdown` — the package's own composition —
# so the chain that runs and the chain this names cannot be two different things.
MARKDOWN_HOOKS = MARKDOWN_HOOKS

# Only the extensions the content actually uses. The retired MkDocs shell also
# declared admonition, attr_list, pymdownx.details and pymdownx.superfences;
# measured usage across all 457 pages of the first book is zero, zero, zero and
# one.
#
# **`fenced_code` is not optional.** Without it a ``` fence is not a block at all:
# Python-Markdown reads the backticks back as inline code, so every fenced block in
# the collection shipped as `<p><code>python …</code></p>` — the info string printed
# to the reader as a word, and the line breaks collapsed by HTML, which destroys an
# ASCII probability tree and a stem-and-leaf plot outright. The first book measured
# zero fences; `maths-applied` then shipped five, and the second measured zero for
# the wrong reason.
#
# These are Extension *instances*. The ``{name: {options}}`` mapping a config
# file accepts is sugar: Python-Markdown wants a name or an Extension.
EXTENSIONS = [
    "md_in_html",  # <details markdown="1">
    "tables",
    "fenced_code",  # ``` blocks: preformatted text, not inline code
    ArithmatexExtension(generic=True),  # $...$ delimiters for the maths hook
    # Every heading gets an id, so a fragment can name a section. Until this was
    # enabled the only anchors were 83 hand-written `<a id>` elements, invisible
    # to the reader, and `check_links` had to reject a heading slug because no
    # heading had one. `permalink=False` because the id is for linking to, not
    # for printing a paragraph mark beside every heading.
    TocExtension(permalink=False),
]

# Shared stylesheets, in load order. book.css is generated per book by the
# scaffold and copied from the book's own docs assets; settings.css is the
# reader Settings control's stylesheet, shared with the landing page.
SHARED_CSS = ("themes.css", "extra.css", "portal.css", "settings.css")

# Links to source .md paths in rendered HTML. The suffix stays in the captured
# group so url_for can tell 'a/b/index.md' from 'a/b/index'; stripping it here
# would yield 'a/b/index/' instead of 'a/b/'.
HTML_LINK = re.compile(r'(href|src)="([^"]+?\.md)(#[^"]*)?"')
SCRIPT_STYLE = re.compile(r"<(script|style)\b.*?</\1>", re.S | re.I)
MATH_ERROR = re.compile(r'<span class="math-error"')
# `href="…"` and `src="…"`, and not a longer attribute that happens to end in one.
# `data-figure-src` names a figure module and is not a request the page makes, so
# matching it here reported every figure as a broken link.
ATTR_LINK = re.compile(r'(?<![\w-])(?:href|src)="([^"]+)"')
# The anchor targets in a rendered page. Fragments are resolved against these,
# so a link to an anchor that was deleted or renamed fails the build.
ID_ATTR = re.compile(r'\bid="([^"]*)"')

# Pagefind builds the search index over the rendered HTML after the build. It is
# installed by npm beside KaTeX, which the build already needs, so it adds no new
# kind of dependency. Running it is a separate step, and skippable, so tests do
# not pay for indexing.
@lru_cache(maxsize=None)
def pagefind() -> Path:
    """The Pagefind binary, resolved on first use rather than at import.

    A module-level `PAGEFIND = books.repo_root() / ...` captured the answer at
    import, so it depended on the cwd and `TEXTBOOK_ROOT` *at that moment* rather
    than at the moment the build ran.
    """
    return books.repo_root() / "node_modules" / ".bin" / "pagefind"


# --- paths and URLs -----------------------------------------------------------


def booklet_widget(book: books.Book, prefix: str, filename: str = "booklet.js") -> str:
    """The formulae-booklet `<script>` a page carries, or the empty string.

    A classic deferred script rather than a module: it resolves its sibling
    ``booklet.json`` from ``document.currentScript.src``, which is null in a
    module — so the JSON keeps its name and only the script is addressed. A book
    without a booklet gets no element at all, so no page fetches data that is not
    there.
    """
    if not book.booklet_name:
        return ""
    return f'<script src="{prefix}assets/booklet/{filename}" defer></script>'


def masthead_section(meta: dict) -> str:
    """The page's section, as the masthead names it, or the empty string.

    A course page carries ``section`` and ``section_title`` in its front matter, and
    a reader who arrives from a search result or a deep link has no way to tell which
    section they are in: the masthead says the book and nothing else. The section is
    printed beside the book's name, in the same link, so it also says where the link
    goes. A page without the front matter gets no element rather than an empty one.
    """
    section = str(meta.get("section") or "").strip()
    title = str(meta.get("section_title") or "").strip()
    if not section and not title:
        return ""
    label = f"{section} {title}".strip()
    return f'<span class="masthead__section">{html.escape(label)}</span>'


# --- navigation ---------------------------------------------------------------


def pairs(node) -> list[tuple[str, object]]:
    """Normalise a nav node into (title, child) pairs.

    ``build_nav_list`` mixes shapes: a value is a ``str`` (a page), a ``list`` of
    dicts (a section) or a ``dict``. MkDocs accepts all three, so this does too.
    """
    if isinstance(node, list):
        return [(key, value) for entry in node for key, value in entry.items()]
    if isinstance(node, dict):
        return list(node.items())
    return []


def leaves(node) -> list[str]:
    """Every Markdown path beneath a nav node."""
    out: list[str] = []
    for _title, child in pairs(node):
        out.extend([child] if isinstance(child, str) else leaves(child))
    return out


def render_nav(
    nav,
    current_url: str,
    leaf_cache: dict[int, set[str]] | None = None,
    subtree_cache: dict[tuple[int, str], str] | None = None,
) -> str:
    """Nested ``<ul>``, sections collapsible with ``<details>``.

    Two memos carry work *across* pages, because the nav is one object shared by
    every page of a build and only the current-page marking differs between them.

    ``leaf_cache`` precomputes each node's leaf set once per build, so the
    open/closed decision is linear rather than quadratic and is not redone for
    every page. Without it, each of the 458 pages re-slugged the whole sidebar —
    measured at 3.4s of a 17s build.

    ``subtree_cache`` precomputes the rendered HTML of every subtree that does
    *not* contain the current page. That HTML is identical on every page, so
    rebuilding it re-slugged and re-quoted all 60 KiB of the sidebar for each
    page. Only the path from the root to the current page is rebuilt; its
    siblings come from the memo. The root is part of the key because hrefs are
    qualified with the page's ``../`` prefix, and depth varies across a book.

    A caller that renders one page omits both and gets caches private to the
    call.
    """
    root = prefix_for(current_url)
    cache: dict[int, set[str]] = {} if leaf_cache is None else leaf_cache
    rendered: dict[tuple[int, str], str] = {} if subtree_cache is None else subtree_cache

    def leaf_urls(node) -> set[str]:
        key = id(node)
        if key not in cache:
            cache[key] = {url_for(path) for path in leaves(node)}
        return cache[key]

    def render(node, inside: bool) -> str:
        # ``inside`` is true only along the root-to-current-page path, the one
        # part of the tree whose HTML changes from page to page.
        if not inside and (cached := rendered.get((id(node), root))) is not None:
            return cached
        items = []
        for title, child in pairs(node):
            if isinstance(child, str):
                url = url_for(child)
                current = url == current_url
                css = "nav__link nav__link--current" if current else "nav__link"
                aria = ' aria-current="page"' if current else ""
                items.append(
                    f'<li><a class="{css}" href="{href(root + url)}"{aria}>'
                    f"{html.escape(title)}</a></li>"
                )
            else:
                child_inside = current_url in leaf_urls(child)
                open_ = " open" if child_inside else ""
                items.append(
                    f"<li><details{open_}><summary>{html.escape(title)}</summary>"
                    f"<ul class='nav__list'>{render(child, child_inside)}</ul></details></li>"
                )
        markup = "".join(items)
        if not inside:
            rendered[(id(node), root)] = markup
        return markup

    return f"<ul class='nav__list'>{render(nav, True)}</ul>"


def nav_for(book: books.Book, included_tiers: frozenset[str]) -> list:
    """The nav, built from a book's own registry — a curriculum or a proof list.

    The book's own declarations travel with it: which page kinds its sections have
    and which optional depth pages they offer. Passing them here rather than
    defaulting inside the nav builder is what keeps one build from listing a page
    that the same build will not write.
    """
    return scaffold.build_nav_list(
        book.strands,
        book.chapters,
        included_tiers=included_tiers,
        proofs=book.proofs,
        page_kinds=book.section_page_kinds,
        deepers=book.deeper_pages,
        pages=book.pages,
    )


def chapter_subset(book: books.Book, chapter: int, included_tiers=None) -> list:
    """Only one chapter's nav entry, so a subset build has a small sidebar.

    ``included_tiers`` follows the build's tier. A lower-tier subset must not list
    sections it does not build: the sidebar would link to pages that are not there,
    and once the link check actually ran that showed up as a broken link on every
    page of the subset. The default keeps a standalone caller — a test rendering one
    page without a build — permissive.
    """
    if included_tiers is None:
        included_tiers = frozenset(book.tier_codes)
    wanted = f"Chapter {chapter}:"
    for entry in nav_for(book, included_tiers):
        for title, child in pairs(entry):
            if title.startswith(wanted):
                return [{title: child}]
    raise SystemExit(f"no chapter {chapter} in {book.title}")


def _level(path: str, depth: int) -> str:
    """The first `depth` components of a source path, for grouping neighbours."""
    return "/".join(path.split("/")[:depth])


def _pager_eyebrow(
    current: str, target: str, forward: bool, reference: bool = False
) -> str:
    """What the move is, in the reader's words: page, section, chapter, chapter review.

    The eyebrow is the whole value of a pager over a bare arrow: "Next section" tells a
    reader where the link goes before they read the title, and on a phone it is the only
    part of the label that fits on one line.

    The two special cases are the ones a reader would otherwise misread: a neighbour
    that is a chapter's own index page is *contents*, not the next chapter, and a
    chapter's Review is the end of the chapter rather than the start of the next.

    ``reference`` is a book that declares `qualification: Reference` — the proof book
    and the map of problem classes. It has no chapters and no sections, so a depth-2
    path is *one entry* rather than a chapter index, and the course rules below would
    call the next entry "Next chapter" on every page of a book that has none.
    """
    if target == "index.md":
        return "Contents"
    if target.startswith("Glossary/"):
        return "Glossary"
    direction = "Next" if forward else "Previous"
    if reference:
        return f"{direction} page"
    parts = target.split("/")
    same_chapter = _level(current, 1) == _level(target, 1)
    if len(parts) == 2 and parts[-1] == "index.md":
        return "Chapter contents" if same_chapter else f"{direction} chapter"
    if len(parts) >= 3 and parts[-2] == "Review":
        return "Chapter review" if same_chapter else f"{direction} chapter"
    if not same_chapter:
        return f"{direction} chapter"
    if _level(current, 2) != _level(target, 2):
        return f"{direction} section"
    return f"{direction} page"


def pager_for(paths: list[str], book: books.Book) -> dict[str, tuple[dict | None, dict | None]]:
    """Every page's previous and next, from the **nav order** the sidebar uses.

    The reading order is `nav_paths`, so the pager cannot disagree with the contents
    list — the same rule `nav_for` follows for the sidebar itself. Titles come from
    the page's own front matter, because the nav's leaf titles are the page *kind*
    ("Learn") and a pager that says only "Learn" says nothing about where it goes.
    """
    # **The sidebar's order is a reference order, and the pager's is a reading order.**
    # They differ in two places.
    #
    # The glossary is listed first and reads last, so following "next" from the cover
    # does not land a reader in the reference material.
    #
    # A section's depth pages are listed with the section and are **not part of the
    # thread**: they are offered by the page that raises the question, and the chapter
    # has to be readable end to end without one. Treated as ordinary pages they sat
    # between a section and the next one, so the pager's eyebrow said "Next section"
    # and went to an optional detour. They are skipped here, and each one borrows the
    # pager of the page that offers it, so a reader who takes the detour can step back
    # onto the thread from it.
    reference = book.qualification == books.REFERENCE
    deeper = {page["path"] for page in book.deeper_pages}
    ordered = [
        p for p in paths if p not in deeper and not p.startswith("Glossary/")
    ] + [p for p in paths if p.startswith("Glossary/") and p not in deeper]
    order: dict[str, tuple[dict | None, dict | None]] = {}
    titles: dict[str, str] = {}
    for md_path in paths:
        source = book.docs / md_path
        title = ""
        if source.exists():
            try:
                meta, _ = read_page(source)
                title = str((meta or {}).get("title") or "").strip()
            except FrontMatterError:
                title = ""
        if not title:
            title = "Contents" if md_path == "index.md" else md_path.rsplit(".", 1)[0]
        titles[md_path] = title

    for index, md_path in enumerate(ordered):
        previous = None
        following = None
        if index > 0:
            target = ordered[index - 1]
            previous = {
                "href": url_for(target),
                "title": titles[target],
                "eyebrow": _pager_eyebrow(
                    md_path, target, forward=False, reference=reference
                ),
            }
        if index + 1 < len(ordered):
            target = ordered[index + 1]
            following = {
                "href": url_for(target),
                "title": titles[target],
                "eyebrow": _pager_eyebrow(
                    md_path, target, forward=True, reference=reference
                ),
            }
        order[md_path] = (previous, following)

    # A depth page reads *after* the page that offers it and *before* the next one on
    # the thread: stepping back from it returns to the page that raised the question,
    # and stepping forward rejoins the thread. Handing it the offering page's own pair
    # sent a reader who took the detour back one page too far.
    anchor = ""
    for md_path in paths:
        if md_path in deeper:
            if anchor in order:
                order[md_path] = (
                    {
                        "href": url_for(anchor),
                        "title": titles[anchor],
                        "eyebrow": _pager_eyebrow(
                            md_path, anchor, forward=False, reference=reference
                        ),
                    },
                    order[anchor][1],
                )
        else:
            anchor = md_path
    return order


def nav_paths(nav, subset: str | None = None) -> list[str]:
    """Every Markdown path in a nav, optionally restricted to one chapter."""
    out: list[str] = []
    for entry in nav:
        for path in leaves(entry):
            first = path.split("/")[0]
            if subset is None or first == subset:
                out.append(path)
    return out


# --- context ------------------------------------------------------------------


def make_config(book: books.Book, profile: str) -> dict:
    """A plain dict satisfies the hooks, which only ever call ``config.get()``.

    The assembly lives in `config.from_parts`, because the `extra` block is an engine
    contract that six test files used to copy by hand — and two of the copies had
    already drifted. One constructor means a hook that reads a new key cannot pass in
    production and silently misbehave in a test.
    """
    return cfg.from_parts(book.docs, book=book, profile=profile)


def proofs_dir(book: books.Book) -> str:
    """The reference work's directory, relative to the repository root."""
    return cfg.proofs_dir(book)


def proofs_base_url() -> str:
    """Where the proof book publishes, root-absolute."""
    return cfg.proofs_base_url()


def make_page(md_path: str, url: str) -> SimpleNamespace:
    """The whole surface the hooks read off a page."""
    return SimpleNamespace(url=url, file=SimpleNamespace(src_path=md_path))


# --- links --------------------------------------------------------------------


def rewrite_source_links(content: str) -> str:
    """Rewrite links to source ``.md`` paths as site URLs.

    Runs on rendered HTML rather than on Markdown, so it sees one shape of link
    whether the markdown came from an author, from a hook (``toc.py`` writes
    ``Chapter N/index.md``) or from raw HTML a hook emitted.

    Hrefs stay *relative*, which matches the source: a link written on
    ``Chapter 1/index.md`` is relative to ``Chapter 1/``. That stays correct
    after rendering because the output path mirrors the source path.
    """

    def repl(match: re.Match[str]) -> str:
        attr, target, frag = match.group(1), match.group(2), match.group(3) or ""
        decoded = urllib.parse.unquote(target)
        # An absolute URL that happens to end in .md is not a source path. Without
        # this guard 'https://x.dev/a.md' becomes 'https:/x.dev/a/'.
        if decoded.startswith(("http://", "https://", "//", "mailto:", "data:")):
            return match.group(0)
        return f'{attr}="{href(url_for(decoded))}{frag}"'

    return HTML_LINK.sub(repl, content)


# --- page rendering -----------------------------------------------------------


@dataclass
class RenderedPage:
    """One built page. The search index is built from the HTML itself."""

    url: str
    title: str

    @property
    def output(self) -> str:
        return f"{self.url}index.html"



#: A table, and the comment that can mark it. `<!-- table: cards -->` on the line above
#: a table says its rows are records rather than a column to compare, which is what the
#: card layout below 60rem needs to know. Python-Markdown passes the comment through, so
#: the marker arrives here and is consumed by this pattern instead of being printed. A
#: class would be tidier and needs `attr_list`, which this collection measured at zero
#: uses and does not load.
TABLE = re.compile(
    r"(?:(?P<marker><!--\s*table:\s*cards\s*-->)\s*)?<table\b.*?</table>", re.S | re.I
)
THEAD = re.compile(r"<thead\b.*?</thead>", re.S | re.I)
CELL = re.compile(r"<th\b[^>]*>(.*?)</th>", re.S | re.I)
TD = re.compile(r"<td\b(?P<attrs>[^>]*)>", re.I)
TAG = re.compile(r"<[^>]+>")


def label_cells(table: str) -> str:
    """Give every `<td>` its column's heading as `data-label`.

    A table becomes a stack of records below 60rem only if each cell can say what it
    is: the header row scrolls away with the columns, so the label has to travel with
    the value. Reading it from the `<th>`s rather than from a second list in the CSS
    means the label and the heading cannot come apart.
    """
    head = THEAD.search(table)
    if not head:
        return table
    headings = [html.unescape(TAG.sub("", cell)).strip() for cell in CELL.findall(head.group(0))]
    if not headings:
        return table
    body = table[head.end():]
    index = 0

    def relabel(match: "re.Match[str]") -> str:
        nonlocal index
        label = headings[index % len(headings)]
        index += 1
        if "data-label=" in match.group("attrs"):
            return match.group(0)
        return f'<td{match.group("attrs")} data-label="{html.escape(label, quote=True)}">'

    return table[: head.end()] + TD.sub(relabel, body)


def wrap_tables(html_text: str) -> str:
    """Put every table in a scroll container.

    A worked example or a data table is routinely wider than a phone. Without a
    wrapper the table widens the *page* rather than scrolling inside it, and
    anything pinned to the viewport — the masthead controls, the booklet button —
    is pushed off the right edge. That is how a reader lost the settings button.
    """
    def wrap(match: "re.Match[str]") -> str:
        table = match.group(0)
        if match.group("marker"):
            # The marker is part of the match, so taking it off the front is also what
            # stops it being printed; nothing else in the collection reads a comment.
            table = table.replace(match.group("marker"), "", 1).lstrip()
            table = table.replace("<table", '<table class="table--cards"', 1)
        table = label_cells(table)
        # **Focusable, and named.** A scroll container is operable only if a keyboard
        # can reach it: Chromium 127 focuses one by itself, Safari and Firefox do not,
        # so a table that scrolls would be unreadable to a keyboard user on those
        # engines (WCAG 2.1.1). `role="group"` gives the tab stop something to be, and
        # the label says what scrolling it does — the hint a sighted reader gets from
        # the cut-off column and a screen reader cannot.
        return (
            '<div class="table-scroll" tabindex="0" role="group" '
            'aria-label="Table. Scroll sideways to see every column.">'
            f"{table}</div>"
        )

    return TABLE.sub(wrap, html_text)


def render_pager(pager, prefix: str) -> tuple[str, str]:
    """The previous/next block, and the `<link rel>`s that say the same thing.

    **Both, from one model.** The block is what a reader uses; `<link rel="prev">` and
    `<link rel="next">` are the machine-readable form of the same fact, which a
    browser extension, a crawler and a print stylesheet read. Rendering them from the
    same neighbour means they cannot disagree.

    A page with no neighbour on one side keeps a spacer, so a lone "next" does not
    drift into the "previous" position and read as one.
    """
    previous, following = pager
    if not previous and not following:
        return "", ""
    parts = ['<nav class="pager" aria-label="Page navigation" data-pagefind-ignore>']
    links = []
    for neighbour, direction in ((previous, "prev"), (following, "next")):
        if neighbour:
            href = html.escape(prefix + neighbour["href"], quote=True)
            parts.append(
                f'<a class="pager__link pager__link--{direction}" href="{href}" rel="{direction}">'
                f'<span class="pager__eyebrow">{html.escape(neighbour["eyebrow"])}</span>'
                f'<span class="pager__title">{html.escape(neighbour["title"])}</span></a>'
            )
            links.append(f'<link rel="{direction}" href="{href}">')
        else:
            parts.append('<span class="pager__spacer" aria-hidden="true"></span>')
    parts.append("</nav>")
    return "\n".join(parts), "\n".join(links)


def render_page(
    book: books.Book,
    profile: str,
    config: dict,
    nav,
    md_path: str,
    template: Template,
    settings: tuple[str, str] = ("", ""),
    build: str = "",
    leaf_cache: dict[int, set[str]] | None = None,
    subtree_cache: dict[tuple[int, str], str] | None = None,
    pager: tuple[dict | None, dict | None] = (None, None),
    assets: dict[str, str] | None = None,
) -> tuple[str, RenderedPage, bool]:
    """Render one page of one profile. Returns (html, index entry, maths error).

    ``profile`` is the build's own profile id, passed in rather than read back
    out of ``config``: it is what the page's canonical URL is built from, and a
    page must declare the profile it was actually built for. A Foundation page
    that names the Higher URL as its canonical tells a crawler the Foundation
    edition is a duplicate of the Higher one.
    """
    meta, body = read_page(book.docs / md_path)
    url = url_for(md_path)
    page = make_page(md_path, url)

    # Through the package, not the tuple: "run every hook in order" used to be
    # written twice, here and in `hooks/__init__.py`, so the chain the pipeline ran
    # and the chain the package documented were two implementations that happened to
    # agree. The wrappers were dead code with a live duplicate.
    body = hooks.on_page_markdown(body, page, config, [])

    content = markdown.markdown(body, extensions=EXTENSIONS, output_format="html5")
    content = hooks.on_page_content(content, page, config, [])
    content = wrap_tables(rewrite_source_links(content))

    title = str(meta.get("title") or md_path)
    prefix = prefix_for(url)
    trigger, dialog = settings
    # The booklet widget is a classic deferred script: it reads
    # ``document.currentScript.src`` to find its sibling JSON, so it must be a
    # real script element rather than a module. A book without a booklet gets no
    # element at all, so no page ever fetches data that is not there.
    booklet = booklet_widget(
        book,
        prefix,
        posixpath.basename(
            (assets or {}).get("assets/booklet/booklet.js", "assets/booklet/booklet.js")
        ),
    )
    pager_html, pager_head_html = render_pager(pager, prefix)
    rendered = template.substitute(
        title=html.escape(title),
        description=html.escape(str(meta.get("description") or book.description)),
        site_title=html.escape(book.title),
        masthead_section=masthead_section(meta),
        canonical=canonical_url(book, profile, url),
        content=content,
        pager=pager_html,
        pager_head=pager_head_html,
        nav=render_nav(nav, url, leaf_cache, subtree_cache),
        stylesheets=stylesheet_links(prefix, assets or {}),
        # The registration script is root-absolute (one worker for the collection,
        # written by the portal); the Settings runtime is beside the page, so it
        # takes the page's prefix.
        worker_script=html.escape(
            "/" + (assets or {}).get("assets/settings/service-worker.js", "assets/settings/service-worker.js"),
            quote=True,
        ),
        settings_js=html.escape(
            prefix + (assets or {}).get("assets/settings/settings.js", "assets/settings/settings.js"),
            quote=True,
        ),
        offline_js=html.escape(
            prefix + (assets or {}).get("assets/offline/offline.js", "assets/offline/offline.js"),
            quote=True,
        ),
        prefix=prefix,
        build=html.escape(build, quote=True),
        settings_trigger=trigger,
        settings_dialog=dialog,
        booklet_script=booklet,
        prefs_script=prefs.snippet(config),
        background=backgrounds.resolve(
            books.load_collection(), book.backgrounds, section=str(meta.get("section") or "") or None,
            chapter=meta.get("chapter"),
        )
        or "",
    )
    return rendered, RenderedPage(url=url, title=title), bool(MATH_ERROR.search(content))


def run_pagefind(out: Path) -> bool:
    """Build the search index over the rendered HTML. False if unavailable."""
    binary = pagefind()
    if not binary.exists():
        return False
    finished = subprocess.run(
        [str(binary), "--site", str(out), "--quiet"],
        capture_output=True,
        text=True,
    )
    if finished.returncode != 0:
        # Present and failing is a defect; absent is a feature this build does not
        # have. `indexed` was not part of `BuildResult.ok`, so a full book whose
        # search index failed shipped a site whose search box says "Search is
        # unavailable" while the gate stayed green — the one-chapter build the
        # tests indexed was fine.
        raise RuntimeError(
            "pagefind is installed but failed, so the built site has no working "
            f"search: {(finished.stderr or '').strip()[:400]}"
        )
    return True


def canonical_url(book: books.Book, profile: str, url: str) -> str:
    """Absolute URL for a page of one profile, from the collection's base URL.

    The profile is the one *being built*, never the book's default: a tiered
    book is one build per profile, so a Foundation page must canonicalise to
    the Foundation URL or the whole edition reads as a duplicate. The prefix is
    ``scaffold.site_url``, the same derivation the profile's landing URL uses,
    so a page's canonical and its profile's ``site_url`` cannot drift apart.
    """
    root = scaffold.site_url(book, profile)
    return f"{root}{href(url)}" if root else ""


# --- outputs ------------------------------------------------------------------


def sitemap(book: books.Book, profile: str, pages: list[RenderedPage]) -> str:
    """An XML sitemap for one profile, or empty when no base URL is configured.

    The ``<loc>``s must name the profile this build wrote: a sitemap that lists
    the default profile's URLs from every profile's directory advertises the
    wrong pages for all but the default.
    """
    root = scaffold.site_url(book, profile)
    if not root:
        return ""
    urls = "".join(f"<url><loc>{root}{href(p.url)}</loc></url>" for p in pages)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f"{urls}</urlset>"
    )


def _copy_file(source: Path, destination: Path) -> str:
    """Copy one file into place, creating its directory, and name it for the log."""
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)
    return destination.name


@dataclass(frozen=True)
class AssetRow:
    """One kind of asset the build puts in the output, and where its files go.

    ``sources`` pairs each source with its destination, and is either files or
    directories: a directory is copied through ``select``, which returns the files
    to take from it. A ``label`` makes the row report one *counted* entry instead
    of one per file, which is what keeps a book's dozens of figure modules from
    being dozens of lines of build log. ``writes`` is the row that produces text
    rather than copying a file — the two the portal generates.

    ``needed`` is the predicate: only the booklet and a book's own figures are
    conditional. ``missing`` is what a missing source means — ``skip`` for an asset
    a book may not have, ``all`` for a group that is useless in pieces (the
    booklet's widget fetches its sibling from the same directory), and ``fail`` for
    a file the engine owns, where absence is a defect and the build must say so
    rather than ship pages with no stylesheet.

    ``rename`` decides a destination from the source and its logical destination,
    and is how a content-addressed file is written under the name the page links.
    It takes both because a content hash is a property of the **source**: reading it
    from the destination before the copy is a file that is not there yet.
    """

    sources: tuple[tuple[Path, Path], ...] = ()
    needed: Callable[[books.Book], bool] = lambda book: True
    writes: tuple[tuple[Path, Callable[[], str]], ...] = ()
    missing: str = "skip"
    select: Callable[[Path], list[Path]] | None = None
    rename: Callable[[Path, Path], Path] | None = None
    label: str = ""
    report_zero: bool = False

    def copy(self) -> list[str]:
        """Copy the row, and name what it copied."""

        def destination_of(source: Path, destination: Path) -> Path:
            return self.rename(source, destination) if self.rename else destination

        if self.writes:
            for path, produce in self.writes:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(produce(), encoding="utf-8")
            return [path.name for path, _ in self.writes]
        if self.missing == "all" and not all(
            source.exists() for source, _ in self.sources
        ):
            return []
        copied: list[str] = []
        seen = False
        for source, destination in self.sources:
            if self.select is None:
                if self.missing != "skip" or source.exists():
                    copied.append(_copy_file(source, destination_of(source, destination)))
                    seen = True
                continue
            if not source.is_dir():
                continue
            seen = True
            if self.label:
                # A counted row makes its directory even with nothing to put in it,
                # so the output tree does not depend on whether a book happens to
                # have any figures.
                destination.mkdir(parents=True, exist_ok=True)
            copied.extend(
                _copy_file(
                    path,
                    destination_of(path, destination / path.relative_to(source)),
                )
                for path in self.select(source)
            )
        if not self.label:
            return copied
        # One entry per file is noise for a directory of modules, so a labelled row
        # reports how many it copied — and nothing at all when there were none,
        # unless the row asked for the zero.
        if not seen or (not copied and not self.report_zero):
            return []
        return [f"{len(copied)} {self.label}"]


def copy_assets(
    book: books.Book,
    out: Path,
    assets: dict[str, str] | None = None,
    figures: dict[str, str] | None = None,
    pages: dict[str, int] | None = None,
) -> list[str]:
    """Copy the shared design system, the shell, and this book's own assets.

    The rows below are data because **the order is behaviour**: a later copy wins,
    so the cascade — the shared design system, then the engine's own shell, then
    the book's generated and then its authored sheets — is the order of these rows.
    Adding a kind of asset is a row, not another branch.

    ``assets`` is the content-addressed map ``addressed_assets`` produced for this
    build. The pages were rendered against it, so the files have to be written under
    the same names or every page links a 404; a row that can produce one of them
    therefore carries the rename, and one that cannot is unaffected by it.
    """
    root = Path(books.repo_root())
    asset_root = root / "assets"
    assets = assets if assets is not None else addressed_assets(book)
    addressed = {out / relative: out / hashed for relative, hashed in assets.items()}

    def rename(source: Path, destination: Path) -> Path:
        return addressed.get(destination, destination)

    def addressed_module(source: Path, destination: Path) -> Path:
        """A figure module's site name: the source's content, and nothing else.

        The library's `kit.js` never reaches this — it is a shared file, not a
        module — so the 213 modules that import `./kit.js` keep resolving.
        """
        return destination.with_name(scaffold.addressed_name(source))

    sheet_dir = out / "assets" / "stylesheets"
    figure_dir = out / "assets" / "figures"

    rows = [
        # Every shared file, from the one list that declares them — repository path
        # and site path are the same string, so there is nothing to map. This
        # replaces a hardcoded `SHARED_CSS` loop that had to be kept in step with the
        # symlinks the scaffold created, which is the pair of lists the engine review
        # flagged: an asset added to one and not the other was either a broken link
        # or a file the pages requested and the build never wrote.
        AssetRow(
            tuple((root / relative, out / relative) for relative in scaffold.SHARED_FILES),
            rename=rename,
        ),
        # A shared directory's whole contents. The kit is a library of layers rather
        # than one file, and a barrel that imports a layer the build did not copy is a
        # figure that fails to mount — with the build green, because an asset reached
        # only at runtime is not a link on any page.
        AssetRow(
            tuple((root / relative, out / relative) for relative in scaffold.SHARED_DIRS),
            select=lambda directory: [path for path in sorted(directory.rglob("*")) if path.is_file()],
        ),
        # The shell is the engine's own stylesheet, not a shared asset: it is part of
        # the renderer rather than the design system a book composes, so a missing one
        # fails the build instead of quietly shipping pages with no shell.
        AssetRow(((SHELL_CSS, sheet_dir / "shell.css"),), missing="fail", rename=rename),
        # The book's generated stylesheet, and then its author-local one, last in the
        # cascade. `book-local.css` is authored, not generated, and may be empty; a
        # book that has one must ship it or its own component rules silently disappear.
        AssetRow(
            (
                (book.docs / "assets" / "stylesheets" / "book.css", sheet_dir / "book.css"),
                (book.docs / "assets" / "stylesheets" / "book-local.css", sheet_dir / "book-local.css"),
            ),
            rename=rename,
        ),
        # The formulae booklet: the shared widget and the book's generated data,
        # copied together so the widget's sibling fetch resolves. A book without a
        # booklet ships neither the script nor a request for one.
        AssetRow(
            (
                (asset_root / "booklet" / "booklet.js", out / "assets" / "booklet" / "booklet.js"),
                (
                    book.docs / "assets" / "booklet" / "booklet.json",
                    out / "assets" / "booklet" / "booklet.json",
                ),
            ),
            needed=lambda built: bool(built.booklet_name),
            missing="all",
            rename=rename,
        ),
        # The Settings runtime's service-worker registration. The registration script
        # is loaded by the deferred <script> every page carries; without it in the
        # output a profile served on its own would 404 on that request. `settings.js`
        # itself is a shared file and arrives with `SHARED_FILES` above; only the
        # registration script is this build's own.
        AssetRow(
            (
                (asset_root / "settings" / "service-worker.js", out / "assets" / "settings" / "service-worker.js"),
            ),
            rename=rename,
        ),
        # The PWA: the manifest and the worker. Written from the portal rather than
        # copied raw, so the worker carries the same build label the pages do and the
        # cache rotates on every deploy. They belong at the deployment root, but a
        # profile built on its own needs them beside its pages for the root-absolute
        # links in the shell to resolve.
        AssetRow(
            writes=(
                (out / "manifest.webmanifest", portal.manifest),
                (out / "sw.js", portal.service_worker),
            )
        ),
        # The tab icon and the home-screen icon: three files, one motif (see
        # assets/icons/). The tab icon is declared in the page shell, which reaches it
        # by the same prefix-relative path the stylesheets use.
        AssetRow(
            tuple(
                (asset_root / "icons" / name, out / "assets" / "icons" / name)
                for name in ("app-icon.svg", "favicon.svg", "apple-touch-icon.png")
            )
        ),
        # This book's own data files — the numbers a figure draws, emitted by the
        # tool that computed them (see `books/maths-applied`). Copied as a
        # directory because a payload is a payload, not a module: it must not sit
        # in `figures/`, where every file is required to export `mount()`.
        AssetRow(
            ((book.docs / "assets" / "data", out / "assets" / "data"),),
            select=lambda directory: [
                path for path in sorted(directory.rglob("*")) if path.is_file()
            ],
            label="data files",
        ),
        # This book's own images — a photograph, a scan, a credit-bearing plate.
        # Never a figure: a figure is drawn by a module so it follows the reader's
        # bundle, and an image cannot.
        AssetRow(
            ((book.docs / "assets" / "images", out / "assets" / "images"),),
            select=lambda directory: [
                path for path in sorted(directory.rglob("*")) if path.is_file()
            ],
            label="images",
        ),
        # This book's own figure modules. A symlink in the book's figures directory is
        # a shared file: on a platform that does not check symlinks out as links
        # (`git clone` on Windows without developer mode) it is a text file naming its
        # target, so copying it would put a 36-byte "module" in the site — a green
        # build, a broken browser, and nothing in the output to say so. `figures.js`
        # and `kit.js` arrive with `SHARED_FILES` above.
        AssetRow(
            ((book.docs / "assets" / "figures", figure_dir),),
            select=lambda directory: [
                path
                for path in sorted(directory.glob("*.js"))
                if not path.is_symlink() and path.name not in scaffold.SHARED_FIGURE_FILES
            ],
            rename=addressed_module,
            label="figure modules",
            report_zero=True,
        ),
        # The shared figure library: every module in `assets/figures/` that more than
        # one book mounts, copied **flat** beside the loader because a figure is
        # mounted by bare slug. A book's own module of the same name is an error rather
        # than an override — see `shared_figure_modules` — so there is nothing to
        # decide here.
        AssetRow(
            ((root / scaffold.FIGURE_LIBRARY, figure_dir),),
            select=lambda directory: [
                path
                for path in sorted(directory.glob("*.js"))
                if path.name not in scaffold.SHARED_FIGURE_FILES
            ],
            rename=addressed_module,
            label="shared figure modules",
        ),
    ]

    copied: list[str] = []
    for row in rows:
        if row.needed(book):
            copied.extend(row.copy())
    # The record of what was written, and under what name. A content-addressed
    # name cannot be derived from the source tree by whoever reads the output — a
    # test, a tool, the offline download list — so the build states it.
    (out / "assets" / "manifest.json").write_text(
        asset_manifest(book, assets, figures or {}, pages), encoding="utf-8"
    )
    copied.append("manifest.json")
    return copied

def sibling_roots(exclude: str | None = None) -> tuple[str, ...]:
    """Where the collection's *other* books publish, root-relative.

    The collection is one site: every book is a separate build with its own output
    directory, and they are published side by side under one origin. So a link
    from a page in one book to a page in another is a real link that this build
    cannot verify — the files are not in this output directory and never will be.

    Skipping such a link is not the same as assuming it works. The other book's own
    build checks its own links, and the directive that writes these hrefs resolves
    its target against a registry, so an id that names no page fails a build rather
    than producing a dead link. What this cannot catch is a book removed from the
    collection while a page still links to it, and `tests/test_proofs.py` is what
    covers that.
    """
    roots = []
    for other in books.discover_books():
        if other.id == exclude:
            continue
        for profile in other.profiles:
            roots.append(other.deploy_path(profile.id))
    return tuple(roots)


def check_links(
    out: Path,
    pages: list[RenderedPage],
    scope: str | None = None,
    siblings: tuple[str, ...] = (),
    root_pages: tuple[str, ...] = (),
) -> list[str]:
    """Every internal link in every built page must resolve to a built file.

    This replaces ``mkdocs build --strict``, and it goes one step beyond it: a
    link's *fragment* must name an ``id`` in the target file. MkDocs discarded
    the fragment, so ``page/#handle`` was checked as ``page/`` and passed whether
    or not the anchor existed — a check that could not fail. Here the resolved
    target's ids are read and the fragment must be one of them, so a deleted
    anchor or a heading whose slug changed is reported.

    The ids accepted are those already in the output: a heading gets one from the
    Markdown ``toc`` extension, and a page may also write one explicitly as
    ``<a id="…"></a>`` where its chosen name differs from the generated slug. A
    fragment naming neither is reported, so a deleted anchor or a renamed heading
    still fails the build.

    ``<script>`` bodies are excluded because the search client builds its hrefs
    at runtime.

    ``scope`` limits checking to one chapter, for subset builds: the cover links
    to all 25 chapters and the sidebar to the built one, so without it a subset
    build reports every unbuilt chapter as broken. Links to the site root are
    always checked, since the cover is built by every build.

    ``siblings`` are the other books' deploy roots. A link into one of them is
    outside this build and is skipped — see `sibling_roots` for why that is not
    the same as assuming it works.

    ``root_pages`` are the collection pages the portal writes at the site root,
    beside the books rather than inside this build. Like a sibling root, such a
    page is not absent by accident: `portal.legal_page` generates it and the
    deploy tests check that it exists.

    Every page carries the whole sidebar, so a full book is around 200,000 link
    targets. Resolution is therefore done lexically against one listing of the
    output directory. Calling ``Path.resolve()`` per link instead walks the
    filesystem a component at a time, which measured as the single largest cost
    of a whole build. Target ids are cached per file, so a page linked to from a
    hundred fragments is read once.
    """
    built = {path.relative_to(out).as_posix() for path in out.rglob("*")}
    ids_by_file: dict[str, set[str]] = {}

    def ids_of(relative: str) -> set[str]:
        if relative not in ids_by_file:
            html_text = SCRIPT_STYLE.sub(
                "", (out / relative).read_text(encoding="utf-8")
            )
            ids_by_file[relative] = set(ID_ATTR.findall(html_text))
        return ids_by_file[relative]

    broken: list[str] = []
    for page in pages:
        if page.output not in built:
            broken.append(f"{page.url}: page was not written")
            continue
        text = SCRIPT_STYLE.sub("", (out / page.output).read_text(encoding="utf-8"))
        base = posixpath.dirname(page.output)
        for target in ATTR_LINK.findall(text):
            if target.startswith(("http://", "https://", "mailto:", "#", "data:")):
                continue
            path, _, fragment = target.partition("#")
            path = urllib.parse.unquote(path.split("?")[0])
            fragment = urllib.parse.unquote(fragment)
            if not path:
                continue
            # Only a leading slash means "from the site root". Treating every
            # href as if it did would silently accept bare root-relative links,
            # which break as soon as a page is nested.
            root_relative = path.lstrip("/")
            if path.startswith("/") and any(
                root_relative == root or root_relative.startswith(f"{root}/")
                for root in root_pages
            ):
                continue  # a collection page the portal writes at the site root
            if path.startswith("/") and any(
                root_relative == root or root_relative.startswith(f"{root}/")
                for root in siblings
            ):
                continue  # another book of the collection, built separately
            joined = root_relative if path.startswith("/") else posixpath.join(base, path)
            candidate = posixpath.normpath(joined)
            if candidate.startswith(".."):
                broken.append(f"{page.url} -> {target} (escapes the output directory)")
                continue
            if scope and candidate != "." and not candidate.startswith(f"{scope}/"):
                continue  # outside this subset build, not a broken link
            # The file a fragment is resolved against: the exact file, or the
            # index of a directory. A path that resolves to neither is broken
            # whatever the fragment says.
            target_file = None
            if f"{candidate.rstrip('/')}/index.html" in built:
                target_file = f"{candidate.rstrip('/')}/index.html"
            elif candidate in built and (out / candidate).is_file():
                target_file = candidate
            elif candidate == "." and "index.html" in built:
                target_file = "index.html"
            if target_file is None and candidate not in built:
                broken.append(f"{page.url} -> {target}")
                continue
            if fragment and (
                target_file is None or fragment not in ids_of(target_file)
            ):
                broken.append(f"{page.url} -> {target} (no #{fragment})")
    return broken


# --- build --------------------------------------------------------------------


@dataclass
class BuildResult:
    """What a build produced, for the CLI and for tests."""

    out: Path
    pages: list[RenderedPage] = field(default_factory=list)
    broken: list[str] = field(default_factory=list)
    maths_errors: list[str] = field(default_factory=list)
    assets: list[str] = field(default_factory=list)
    indexed: bool = False
    seconds: float = 0.0

    @property
    def ok(self) -> bool:
        return not self.broken and not self.maths_errors


def build(
    book_id: str,
    profile: str | None = None,
    out: Path | None = None,
    chapter: int | None = None,
    full_nav: bool = False,
    clean: bool = True,
    index: bool = True,
) -> BuildResult:
    """Render a book, or one chapter of it, to a directory of static HTML."""
    started = time.time()
    book = books.book_by_id(book_id)
    profile = profile or book.default_profile.id
    # An unknown profile used to be accepted: it built to a new directory and,
    # because the tier filter read `profile != "foundation"`, built it as Higher.
    # A typo in a CI matrix then published a whole extra edition of a book rather
    # than failing. Found by noticing `site/gcse-physics/all/` — a directory no
    # profile owns — while measuring figures.
    declared = [p.id for p in book.profiles]
    if profile not in declared:
        raise ValueError(
            f"{book.id} has no profile {profile!r}; it declares {', '.join(declared)}"
        )
    out = out or Path(books.repo_root()) / "site" / book.deploy_path(profile)
    # Which sections this build writes, from the declared `tier_filter` and never
    # from the literal profile id: a book may name its lower-tier profile anything,
    # and keying on the id shipped higher-only sections to the wrong reader whenever
    # the two differed. See `Book.tiers_included`.
    included_tiers = book.tiers_included(book.tier_filter_for(profile))
    config = make_config(book, profile)
    template = Template(PAGE_TEMPLATE.read_text(encoding="utf-8"))
    # The Settings control is the one the landing page uses: same trigger, same
    # dialog, built from the same bundles. Computed once per build, not per page.
    settings = (portal.settings_trigger(), portal.settings_dialog(book=book))
    build_label = portal.build_label()
    # Where each stylesheet is written and linked, computed once per build: the
    # pages reference it and `copy_assets` writes to it, and a second computation
    # is a second answer.
    assets = addressed_assets(book)
    # The same map the hook writes into a page's `data-figure-src` and the copy uses
    # for the filename. Computed once: a per-page hash of 43 modules across 458 pages
    # is 20,000 reads of the same files.
    modules = hooks.figures.module_paths(config)
    figure_modules = {slug: scaffold.addressed_name(path) for slug, path in modules.items()}
    config["figure_modules"] = figure_modules

    if clean and out.exists():
        shutil.rmtree(out)

    # A configured animation id that is not registered is a typo, and a typo
    # that renders nothing is exactly the failure the registry exists to catch.
    # Checked here, beside the build, rather than at render time per page.
    problems = backgrounds.validate(
        books.load_collection().get("backgrounds"), "collection.yaml"
    ) + backgrounds.validate(book.backgrounds, "book.yaml")
    if problems:
        raise ValueError("backgrounds: " + "; ".join(problems))

    # Two forms of "the chapter being built", for two consumers that work on
    # different names. `nav_paths` walks source paths, so it wants the source
    # prefix; `check_links` walks slugged output paths, so it wants the URL
    # prefix. Passing the source form to both was the bug: no output path can
    # start with `Chapter 1/`, so a subset build skipped every link and still
    # reported `broken 0`.
    subset = f"Chapter {chapter}" if chapter else None
    link_scope = url_for(f"Chapter {chapter}/index.md").rstrip("/") if chapter else None
    full = nav_for(book, included_tiers)
    paths = nav_paths(full, subset=subset)
    nav = full if (full_nav or not subset) else chapter_subset(book, chapter, included_tiers)

    # The masthead links to the book's cover, and every chapter links back to it,
    # so a subset build must still emit it or those links 404. A full build picks
    # it up from the nav; a subset does not.
    cover = "index.md"
    if cover not in paths and (book.docs / cover).exists():
        paths.insert(0, cover)

    # Slugging maps the source layout onto URLs, so two source paths could in
    # principle land on the same one. A collision would silently overwrite a page.
    seen: dict[str, str] = {}
    for md_path in paths:
        url = url_for(md_path)
        if url in seen:
            raise ValueError(
                f"URL collision: {seen[url]!r} and {md_path!r} both publish to {url!r}"
            )
        seen[url] = md_path

    result = BuildResult(out=out)
    # One nav, two memos, shared by every page: the sidebar is the same object on
    # all of them, so its leaf sets and its unchanged subtrees are computed once
    # per build rather than once per page. See `render_nav`.
    nav_cache: dict[int, set[str]] = {}
    nav_render_cache: dict[tuple[int, str], str] = {}
    # The reading order the sidebar already declares, so the pager cannot disagree
    # with the contents list. Built once: it reads each page's front matter for a
    # title, and a page must not read its neighbours on every render.
    pager_map = pager_for(paths, book)
    # Every page this build wrote, and how many bytes each is: the download list and
    # the size a reader is shown both come from here.
    page_bytes: dict[str, int] = {}
    for md_path in paths:
        source = book.docs / md_path
        if not source.exists():
            result.broken.append(f"{md_path}: listed in the nav but not on disk")
            continue
        rendered, entry, maths_failed = render_page(
            book,
            profile,
            config,
            nav,
            md_path,
            template,
            settings=settings,
            build=build_label,
            leaf_cache=nav_cache,
            subtree_cache=nav_render_cache,
            pager=pager_map.get(md_path, (None, None)),
            assets=assets,
        )
        destination = out / entry.output
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(rendered, encoding="utf-8")
        # Bytes as written, which is what a download has to fetch — not the
        # compressed size, because a reader's device stores what it decodes.
        page_bytes["/" + entry.url] = len(rendered.encode("utf-8")) if entry.url else len(
            rendered.encode("utf-8")
        )
        result.pages.append(entry)
        if maths_failed:
            result.maths_errors.append(entry.url)

    result.assets = copy_assets(
        book, out, assets=assets, figures=figure_modules, pages=page_bytes
    )
    result.indexed = run_pagefind(out) if index else False
    # The same 404 the landing page uses, rather than a second one. It loads the
    # bundle stylesheet from the site root and applies the reader's own scheme and
    # theme before paint, so a missing page is painted from the reader's bundle
    # instead of a hardcoded one — which is what this had, and every reader of
    # every bundle got the editorial palette on a 404. Root-absolute paths are
    # what make that safe at any depth, which is why the page carries no linked
    # stylesheet of its own.
    (out / "404.html").write_text(portal.not_found(), encoding="utf-8")
    if xml := sitemap(book, profile, result.pages):
        (out / "sitemap.xml").write_text(xml, encoding="utf-8")
    (out / "robots.txt").write_text("User-agent: *\nAllow: /\n", encoding="utf-8")

    result.broken.extend(
        check_links(
            out,
            result.pages,
            scope=link_scope,
            siblings=sibling_roots(exclude=book.id),
            root_pages=portal.root_page_slugs(),
        )
    )
    result.seconds = time.time() - started
    return result


def report(result: BuildResult) -> None:
    size = sum(
        (result.out / page.output).stat().st_size
        for page in result.pages
        if (result.out / page.output).exists()
    )
    print(f"pages      {len(result.pages)}")
    print(f"html       {size / 1024:.0f} KiB")
    print(f"assets     {', '.join(result.assets)}")
    print(f"search     {'pagefind' if result.indexed else 'not indexed'}")
    print(f"build      {result.seconds:.2f}s")
    if result.maths_errors:
        print(f"maths      {len(result.maths_errors)} page(s) failed to render")
        for url in result.maths_errors[:10]:
            print(f"             {url}")
    if result.broken:
        print(f"broken     {len(result.broken)} link(s)")
        for entry in result.broken[:10]:
            print(f"             {entry}")


# --- serve --------------------------------------------------------------------


def watch_paths(book_id: str):
    """Every file whose change should trigger a rebuild.

    Wider than the page sources on purpose. A build also reads the curriculum
    (the navigation and which pages exist), ``book.yaml`` (the tier axis, theme,
    profiles and booklet), ``collection.yaml`` (base URL, backgrounds, licence),
    the theme bundles (the before-paint tokens and the bundle list), the book's
    own assets (its figure modules and ``book-local.css``, which `copy_assets`
    ships), and the engine's own templates and CSS. Watching only the Markdown
    made ``--serve`` silently stale after a figure or a curriculum edit: the
    change produced no rebuild, so it looked like the edit had done nothing.
    """
    root = Path(books.repo_root())
    book = books.book_by_id(book_id)
    yield from book.docs.rglob("*.md")
    # The files a build reads directly. Guarded by `is_file`, because a book
    # without a booklet names a path that is not there, and `serve` stats every
    # watched path.
    for single in (
        book.curriculum,
        book.root / "book.yaml",
        book.booklet,
        root / "collection.yaml",
    ):
        if single.is_file():
            yield single
    docs_assets = book.docs / "assets"
    if docs_assets.is_dir():
        yield from docs_assets.rglob("*")
    for directory in (root / "assets", root / "themes"):
        if directory.is_dir():
            yield from directory.rglob("*")
    engine = Path(__file__).resolve().parent
    yield from engine.rglob("*.py")
    yield from engine.rglob("*.html")
    yield from engine.rglob("*.css")


def _drop_caches() -> None:
    """Forget the parsed configuration so a rebuild reads the changed files.

    ``book`` and ``themes`` cache their parses for the length of a process (see
    ``book.py``). A one-shot build pays nothing for that, but ``--serve`` would
    otherwise rebuild from the values read at startup, so a watched
    ``book.yaml``, ``curriculum.yaml`` or theme bundle would trigger a rebuild
    that changed nothing.
    """
    books.load_book.cache_clear()
    books.qualification_order.cache_clear()
    books.load_collection.cache_clear()
    books._curriculum.cache_clear()
    themes._bundles.cache_clear()


def serve(book_id: str, profile: str, chapter: int | None, port: int) -> None:
    """Build, serve the output, and rebuild when a source changes."""
    import http.server
    import socketserver

    result = build(book_id, profile, chapter=chapter)
    report(result)

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(result.out), **kwargs)

        def log_message(self, *args):
            pass

    class Server(socketserver.ThreadingTCPServer):
        # Without this, restarting the server within the TIME_WAIT window of the
        # previous run fails with EADDRINUSE. Threading keeps a slow request from
        # blocking the rebuild poll.
        allow_reuse_address = True
        daemon_threads = True

    def stamp() -> float:
        return max((p.stat().st_mtime for p in watch_paths(book_id)), default=0.0)

    with Server(("", port), Handler) as httpd:
        httpd.timeout = 1.0
        print(f"serving http://localhost:{port}  (ctrl-c to stop)")
        previous = stamp()
        while True:
            httpd.handle_request()
            current = stamp()
            if current > previous:
                previous = current
                print("change detected, rebuilding")
                _drop_caches()
                report(build(book_id, profile, chapter=chapter))
                previous = stamp()


# --- CLI ----------------------------------------------------------------------


def main() -> int:
    parser = argparse.ArgumentParser(description="Render a book without a site generator.")
    parser.add_argument("--book", default="gcse-maths")
    parser.add_argument("--profile", default=None, help="profile id, e.g. higher")
    parser.add_argument("--out", type=Path, default=None)
    parser.add_argument("--chapter", type=int, default=None, help="build one chapter")
    parser.add_argument(
        "--full-nav",
        action="store_true",
        help="render every chapter in the sidebar even for a subset build",
    )
    parser.add_argument("--no-index", action="store_true", help="skip Pagefind")
    parser.add_argument("--serve", action="store_true")
    parser.add_argument("--port", type=int, default=8123)
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(message)s")

    if args.serve:
        serve(args.book, args.profile or "higher", args.chapter, args.port)
        return 0

    try:
        result = build(
            args.book, args.profile, args.out, args.chapter, args.full_nav,
            index=not args.no_index,
        )
    except FrontMatterError as err:
        log.error("%s", err)
        log.error(
            "The build refuses to guess: an unquoted title containing ': ' is "
            "invalid YAML, and a page with no metadata has no tier."
        )
        return 2
    except KeyError as err:
        log.error("unknown book or profile: %s", err)
        return 2
    except ValueError as err:
        # The authoring errors: an unknown `:::figure` slug, a `:::problems` name
        # that matches no bank, a `:::prove` id in no registry, a background that
        # is not registered, a profile the book does not declare. Each raises a
        # `ValueError` with a message written for a person, and every one used to
        # reach the terminal as a traceback — the same shape of failure that
        # `FrontMatterError` was given a log line for. The build failed either way;
        # only the diagnostic was inconsistent.
        log.error("%s", err)
        return 2

    report(result)
    return 0 if result.ok else 1


if __name__ == "__main__":
    sys.exit(main())
