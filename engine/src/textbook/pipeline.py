#!/usr/bin/env python3
"""Render a book as static HTML: Markdown to HTML, the page shell, the search
index and link validation.

The engine's hooks are reused unchanged. They read only ``page.url``,
``page.file.src_path``, ``config["extra"]`` and ``files``, so a plain dict and a
``SimpleNamespace`` drive them.
"""

from __future__ import annotations

import argparse
import html
import json
import logging
import posixpath
import re
import shutil
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
from . import search
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
#: The order is behaviour at every level, so the build writes and the page links
#: from this one list rather than from the template.
STYLESHEETS: tuple[str, ...] = (
    "assets/stylesheets/themes.css",
    "assets/stylesheets/extra.css",
    "assets/stylesheets/book.css",
    "assets/stylesheets/book-local.css",
    "assets/stylesheets/shell.css",
    "assets/stylesheets/search.css",
    "assets/stylesheets/settings.css",
)


def stylesheet_sources(book: books.Book) -> dict[str, Path]:
    """Where each sheet is authored, by its site-relative path.

    Not every site path is under the book: two are the shared design system in
    ``assets/``, one belongs to the renderer in ``engine/``, and the ``book`` pair
    are the book's own.
    """
    root = Path(books.repo_root())
    return {
        "assets/stylesheets/themes.css": root / "assets/stylesheets/themes.css",
        "assets/stylesheets/extra.css": root / "assets/stylesheets/extra.css",
        "assets/stylesheets/book.css": book.docs / "assets/stylesheets/book.css",
        "assets/stylesheets/book-local.css": book.docs / "assets/stylesheets/book-local.css",
        "assets/stylesheets/shell.css": SHELL_CSS,
        "assets/stylesheets/search.css": root / "assets/stylesheets/search.css",
        "assets/stylesheets/settings.css": root / "assets/stylesheets/settings.css",
    }


#: Hash and naming live in the scaffold: the figure hook needs the same answer as
#: the copy that writes the file, and `hooks` may not import `pipeline`.
digest = scaffold.digest
addressed_name = scaffold.addressed_name


def hashed_stylesheets(book: books.Book) -> dict[str, str]:
    """Site-relative sheet path -> the path it is written and linked under.

    Content-addressed, not build-labelled: an unchanged sheet keeps its URL across
    a deploy, so a cached or downloaded book keeps resolving its stylesheet. A
    sheet that is not authored is absent from the result.
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

    The stylesheets are computed from their sources; the runtimes are copied from
    one place but linked from another. ``booklet.json`` keeps its name because the
    widget resolves it as a sibling of ``script.src``.
    """
    addressed = dict(hashed_stylesheets(book))
    # A book without a booklet ships neither the script nor the data, so the
    # manifest must not name it. `tools assets` checks that.
    runtimes = [
        "assets/search/search.js",
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

    A content-addressed name cannot be guessed from the source tree, so the tests
    and tools read this. It also seeds the offline download list.
    """
    return (
        json.dumps(
            {
                "book": book.id,
                "build": portal.build_label(),
                "assets": sheets,
                "figures": figures,
                "pages": pages or {},
                # Wire cost before compression; the reader sees this figure, so it
                # is measured here rather than guessed in the browser.
                "bytes": sum((pages or {}).values()),
            },
            indent=2,
            sort_keys=True,
        )
        + "\n"
    )

# The Markdown hook chain, re-exported so a caller can inspect what runs without
# importing the package. `render_page` calls the package's own composition, so the
# chain that runs and the chain this names cannot differ.
MARKDOWN_HOOKS = MARKDOWN_HOOKS

# Only the extensions the content uses. These are Extension *instances*: a config
# mapping of ``{name: {options}}`` is sugar, and Python-Markdown wants a name or an
# Extension.
EXTENSIONS = [
    "md_in_html",  # <details markdown="1">
    "tables",
    # Not optional: without it a ``` fence is read back as inline code, so every
    # fenced block ships as `<p><code>python …</code></p>` with its line breaks
    # collapsed.
    "fenced_code",
    ArithmatexExtension(generic=True),  # $...$ delimiters for the maths hook
    # Gives every heading an id, so a fragment can name a section.
    # `permalink=False`: the id is for linking to, not for printing a mark.
    TocExtension(permalink=False),
]

# Shared stylesheets, in load order. book.css is generated per book.
SHARED_CSS = ("themes.css", "extra.css", "portal.css", "settings.css")

# Links to source .md paths in rendered HTML. The suffix stays in the captured
# group so url_for can tell 'a/b/index.md' from 'a/b/index'; stripping it here
# would yield 'a/b/index/' instead of 'a/b/'.
HTML_LINK = re.compile(r'(href|src)="([^"]+?\.md)(#[^"]*)?"')
SCRIPT_STYLE = re.compile(r"<(script|style)\b.*?</\1>", re.S | re.I)
MATH_ERROR = re.compile(r'<span class="math-error"')
# `href="…"` and `src="…"`, but not a longer attribute ending in one:
# `data-figure-src` names a figure module and is not a request the page makes.
ATTR_LINK = re.compile(r'(?<![\w-])(?:href|src)="([^"]+)"')
# Anchor targets in a rendered page; a link to a deleted or renamed anchor fails
# the build.
ID_ATTR = re.compile(r'\bid="([^"]*)"')

def booklet_widget(book: books.Book, prefix: str, filename: str = "booklet.js") -> str:
    """The formulae-booklet `<script>` a page carries, or the empty string.

    A classic deferred script, not a module: it resolves its sibling
    ``booklet.json`` from ``document.currentScript.src``, which is null in a
    module. A book without a booklet gets no element.
    """
    if not book.booklet_name:
        return ""
    return f'<script src="{prefix}assets/booklet/{filename}" defer></script>'


#: The first heading of a page, and the title/kind split inside it. The kind is
#: authored into the title (`1.1 Place value — Learn`) by the scaffold, so it cannot
#: be moved by editing content without a 2,215-file diff: the split is a render step.
FIRST_H1 = re.compile(r"(<h1\b[^>]*>)(.*?)(</h1>)", re.S)
TITLE_KIND = re.compile(r"^(.*\S)\s+—\s+([^<>]+)$", re.S)


def split_page_kind(content: str) -> str:
    """Wrap the page kind that ends the first ``<h1>`` in ``span.page-kind``.

    Every generated title carries its page kind after an em dash, and every one of
    those titles is front matter and a heading, so a content edit is a 2,215-file
    diff. The split happens here instead: the text is unchanged and only the
    wrapping is added, which is what lets a stylesheet treat the kind separately.

    The ``id`` attribute is **not** touched. It is derived from the whole title, so
    every existing deep link ends in ``…-learn`` and a split that rebuilt the id
    would break all of them; a test pins a page whose title carries a suffix.

    The heading also gets ``data-pagefind-ignore``: it is the search result's title,
    which the page's metadata returns without the kind, and indexing it as body text
    made every excerpt start by repeating it.
    """
    match = FIRST_H1.search(content)
    if not match:
        return content
    opening = match.group(1)
    if "data-pagefind-ignore" not in opening:
        opening = f"{opening[:-1]} data-pagefind-ignore>"
    parts = TITLE_KIND.match(match.group(2))
    if not parts:
        return (
            content[: match.start()]
            + opening
            + match.group(2)
            + match.group(3)
            + content[match.end():]
        )
    title, kind = parts.group(1), parts.group(2).strip()
    if not kind:
        return content
    rebuilt = (
        f'{opening}{title} <span class="page-kind">— {kind}</span>{match.group(3)}'
    )
    return content[: match.start()] + rebuilt + content[match.end():]


#: Internal page kind -> the reader-facing name. The authored title suffix
#: (`… — Learn`) wins where a page has one; this answers for the pages whose kind
#: lives only in front matter, such as a review or a depth page.
SEARCH_KINDS: dict[str, str] = {
    "walkthrough": "Learn",
    "learn": "Learn",
    "guided-problems": "Practise with help",
    "practise-with-help": "Practise with help",
    "problems": "Practise",
    "practise": "Practise",
    "review": "Review",
    "deeper": "Going deeper",
}


def split_title_kind(title: str) -> tuple[str, str]:
    """The title without its authored kind, and that kind if it had one."""
    parts = TITLE_KIND.match(title.strip())
    if not parts:
        return title.strip(), ""
    return parts.group(1).strip(), parts.group(2).strip()


def page_type(book: books.Book, meta: dict, md_path: str, authored: str) -> str:
    """What kind of page a result is, in the reader's words.

    Every row carries one, so a search result names its page type rather than
    repeating the title's tail. The authored suffix wins because it is what the
    page says; front matter and the path answer for the pages that have no suffix.
    """
    if authored:
        return authored
    kind = str(meta.get("kind") or "").strip()
    if kind in SEARCH_KINDS:
        return SEARCH_KINDS[kind]
    if md_path == "index.md":
        return "Book"
    if md_path.startswith("Glossary/"):
        return "Glossary"
    if md_path.endswith("/index.md") and md_path.startswith("Chapter "):
        return "Chapter overview"
    if book.id == "proofs":
        return "Proof"
    if book.qualification == books.REFERENCE:
        return "Reference"
    return "Page"


def search_meta(book: books.Book, profile: str, meta: dict, title: str, md_path: str) -> str:
    """The `<meta>` tags Pagefind returns with a result.

    Pagefind's default title is the first `<h1>`, and every generated title carries
    its kind after an em dash. The title returned here is the one the page is
    *about*; the kind becomes its own value, so a row can print both without
    splitting strings in the browser.

    The values are attributes on empty `<meta>` elements: they are returned with
    every result, and nothing is added to the page the reader reads.
    """
    clean, authored = split_title_kind(title)
    section = " ".join(
        str(part).strip()
        for part in (meta.get("section"), meta.get("section_title"))
        if str(part or "").strip()
    )
    values = {
        "title": clean,
        "type": page_type(book, meta, md_path, authored),
        "section": section,
        "chapter": str(meta.get("chapter_title") or "").strip(),
        "book": book.title,
        # Only a book with more than one edition needs to say which one a result
        # belongs to; "Read" or "Proofs" beside the book's own title is noise.
        "edition": book.profile(profile).name if len(book.profiles) > 1 else "",
    }
    return "\n".join(
        f'<meta data-pagefind-meta="{key}[content]" content="{html.escape(value, quote=True)}">'
        for key, value in values.items()
        if value
    )


def masthead_section(meta: dict) -> str:
    """The page's section, as the masthead names it, or the empty string.

    A reader arriving from a search result or a deep link cannot otherwise tell
    which section they are in. A page without the front matter gets no element.
    """
    section = str(meta.get("section") or "").strip()
    title = str(meta.get("section_title") or "").strip()
    if not section and not title:
        return ""
    label = f"{section} {title}".strip()
    return f'<span class="masthead__section">{html.escape(label)}</span>'


def pairs(node) -> list[tuple[str, object]]:
    """Normalise a nav node into (title, child) pairs.

    A value is a ``str`` (a page), a ``list`` of dicts (a section) or a ``dict``.
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

    Both memos carry work *across* pages: the nav is one object shared by every
    page of a build, and only the current-page marking differs. ``leaf_cache``
    precomputes each node's leaf set; ``subtree_cache`` the rendered HTML of every
    subtree that does not contain the current page. The root is part of the key
    because hrefs carry the page's ``../`` prefix, which varies with depth.

    A caller that renders one page omits both and gets caches private to the call.
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
        # ``inside`` is true only along the root-to-current-page path: the one part
        # of the tree whose HTML changes from page to page.
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
    """The nav, built from a book's own registry: a curriculum or a proof list.

    The book's declarations travel with it, which keeps one build from listing a
    page that the same build will not write.
    """
    return scaffold.build_nav_list(
        book.strands,
        book.chapters,
        included_tiers=included_tiers,
        proofs=book.proofs,
        page_kinds=book.section_page_kinds,
        deepers=book.deeper_pages,
        pages=book.pages,
        section_page_label=book.section_page_label,
    )


def chapter_subset(book: books.Book, chapter: int, included_tiers=None) -> list:
    """Only one chapter's nav entry, so a subset build has a small sidebar.

    ``included_tiers`` follows the build's tier: a lower-tier subset must not list
    sections it does not build or the sidebar links to pages that are not there.
    The default keeps a standalone caller permissive.
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

    The two special cases are the ones a reader would otherwise misread: a
    neighbour that is a chapter's own index page is *contents*, and a chapter's
    Review ends the chapter rather than starting the next.

    ``reference`` marks a book with `qualification: Reference`, which has no
    chapters or sections, so its depth-2 paths are single entries.
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
    """Every page's previous and next, in the order the sidebar lists them.

    Reading order is `nav_paths`, so the pager cannot disagree with the contents
    list. Titles come from the page's own front matter: the nav's leaf titles are
    the page *kind* ("Learn"), which says nothing about where the link goes.
    """
    # The sidebar's order is a reference order; the pager's is a reading order.
    #
    # The glossary is listed first and reads last, so "next" from the cover does not
    # land the reader in the reference material.
    #
    # A section's depth pages are offered by the page that raises the question and are
    # not part of the thread: the chapter must be readable without one. Each borrows
    # the pager of the page that offers it, so a reader on the detour can step back
    # onto the thread.
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

    # A depth page reads after the page that offers it and before the next one on the
    # thread: stepping back returns to the offering page, stepping forward rejoins
    # the thread.
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

    The assembly lives in `config.from_parts`: the ``extra`` block is an engine
    contract, and one constructor keeps a hook that reads a new key from passing in
    production and misbehaving in a test.
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

    Runs on rendered HTML, so it sees one shape of link whether the Markdown came
    from an author, from a hook or from raw HTML. Hrefs stay relative, matching the
    source, because the output path mirrors the source path.
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



#: A table, and the comment that can mark it. `<!-- table: cards -->` above a table
#: says its rows are records rather than a column to compare, which the card layout
#: below 60rem needs. Python-Markdown passes the comment through, so the marker is
#: consumed by this pattern instead of being printed.
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
    is: the header row scrolls away with the columns. Reading the label from the
    `<th>`s means the label and the heading cannot come apart.
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

    A wide table would otherwise widen the page rather than scroll inside it, pushing
    anything pinned to the viewport off the right edge.
    """
    def wrap(match: "re.Match[str]") -> str:
        table = match.group(0)
        if match.group("marker"):
            # Taking the marker off the front is also what stops it being printed.
            table = table.replace(match.group("marker"), "", 1).lstrip()
            table = table.replace("<table", '<table class="table--cards"', 1)
        table = label_cells(table)
        # Focusable and named. A scroll container is operable only if a keyboard can
        # reach it: Chromium 127 focuses one by itself, Safari and Firefox do not, so
        # a scrolling table would be unreadable to a keyboard user there (WCAG
        # 2.1.1). The label gives the tab stop something to be, and says what
        # scrolling it does.
        return (
            '<div class="table-scroll" tabindex="0" role="group" '
            'aria-label="Table. Scroll sideways to see every column.">'
            f"{table}</div>"
        )

    return TABLE.sub(wrap, html_text)


def render_pager(pager, prefix: str) -> tuple[str, str]:
    """The previous/next block, and the `<link rel>`s that say the same thing.

    Both come from one neighbour, so they cannot disagree. A page with no neighbour
    on one side keeps a spacer, so a lone "next" does not drift into the "previous"
    position and read as one.
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

    ``profile`` is passed in rather than read back out of ``config``: it builds the
    page's canonical URL, and a page must canonicalise to the profile it was built
    for, or the Foundation edition reads as a duplicate of the Higher one.
    """
    meta, body = read_page(book.docs / md_path)
    url = url_for(md_path)
    page = make_page(md_path, url)

    # Through the package, not the tuple: writing "run every hook in order" here as
    # well would make the chain the pipeline runs and the chain the package
    # documents two implementations that happen to agree.
    body = hooks.on_page_markdown(body, page, config, [])

    content = markdown.markdown(body, extensions=EXTENSIONS, output_format="html5")
    content = hooks.on_page_content(content, page, config, [])
    content = split_page_kind(content)
    content = wrap_tables(rewrite_source_links(content))

    title = str(meta.get("title") or md_path)
    prefix = prefix_for(url)
    trigger, dialog = settings
    # A classic deferred script: it reads ``document.currentScript.src`` to find its
    # sibling JSON, so it must be a real script element, not a module.
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
        search_meta=search_meta(book, profile, meta, title, md_path),
        canonical=canonical_url(book, profile, url),
        content=content,
        pager=pager_html,
        pager_head=pager_head_html,
        nav=render_nav(nav, url, leaf_cache, subtree_cache),
        stylesheets=stylesheet_links(prefix, assets or {}),
        # The registration script is root-absolute (one worker for the collection,
        # written by the portal); the Settings runtime is beside the page.
        worker_script=html.escape(
            "/" + (assets or {}).get("assets/settings/service-worker.js", "assets/settings/service-worker.js"),
            quote=True,
        ),
        settings_js=html.escape(
            prefix + (assets or {}).get("assets/settings/settings.js", "assets/settings/settings.js"),
            quote=True,
        ),
        search_js=html.escape(
            prefix + (assets or {}).get("assets/search/search.js", "assets/search/search.js"),
            quote=True,
        ),
        search_prefer=html.escape(f"/{book.deploy_path(profile)}/", quote=True),
        offline_js=html.escape(
            prefix + (assets or {}).get("assets/offline/offline.js", "assets/offline/offline.js"),
            quote=True,
        ),
        prefix=prefix,
        build=html.escape(build, quote=True),
        settings_trigger=trigger,
        settings_dialog=dialog,
        booklet_script=booklet,
        theme_color_metas=prefs.theme_color_metas(),
        prefs_script=prefs.snippet(config),
        background=backgrounds.resolve(
            books.load_collection(), book.backgrounds, section=str(meta.get("section") or "") or None,
            chapter=meta.get("chapter"),
        )
        or "",
    )
    return rendered, RenderedPage(url=url, title=title), bool(MATH_ERROR.search(content))


def canonical_url(book: books.Book, profile: str, url: str) -> str:
    """Absolute URL for a page of one profile, from the collection's base URL.

    The profile is the one *being built*, never the book's default, or every
    non-default edition reads as a duplicate. The prefix is ``scaffold.site_url``,
    the same derivation the profile's landing URL uses, so the two cannot drift.
    """
    root = scaffold.site_url(book, profile)
    return f"{root}{href(url)}" if root else ""


# --- outputs ------------------------------------------------------------------


def sitemap(book: books.Book, profile: str, pages: list[RenderedPage]) -> str:
    """An XML sitemap for one profile, or empty when no base URL is configured.

    The ``<loc>``s must name the profile this build wrote, or every directory
    advertises the default profile's pages.
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

    ``sources`` pairs each source with its destination; a directory is copied via
    ``select``. ``label`` reports one counted line, not one per file. ``writes``
    produces text rather than copying. ``missing`` says what an absent source means:
    ``skip``, ``all`` (a group useless in pieces) or ``fail`` (the engine owns it).
    ``rename`` gets the source as well as the destination because a content hash is
    a property of the source.
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
                # A counted row makes its directory even with nothing to put in it, so
                # the output tree does not depend on whether a book has any figures.
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
        # reports a count, and nothing when there were none unless asked.
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

    The rows are data because **the order is behaviour**: a later copy wins, so the
    cascade is the order of these rows. Adding a kind of asset is a row, not
    another branch.

    ``assets`` is the content-addressed map the pages were rendered against, so the
    files must be written under the same names or every page links a 404.
    """
    root = Path(books.repo_root())
    asset_root = root / "assets"
    assets = assets if assets is not None else addressed_assets(book)
    addressed = {out / relative: out / hashed for relative, hashed in assets.items()}

    def rename(source: Path, destination: Path) -> Path:
        return addressed.get(destination, destination)

    def addressed_module(source: Path, destination: Path) -> Path:
        """A figure module's site name: the source's content, and nothing else.

        `kit.js` never reaches this: it is a shared file, not a module, so the
        modules that import `./kit.js` keep resolving.
        """
        return destination.with_name(scaffold.addressed_name(source))

    sheet_dir = out / "assets" / "stylesheets"
    figure_dir = out / "assets" / "figures"

    rows = [
        # Every shared file, from the one list that declares them: repository path and
        # site path are the same string, so nothing needs mapping.
        AssetRow(
            tuple((root / relative, out / relative) for relative in scaffold.SHARED_FILES),
            rename=rename,
        ),
        # A shared directory's whole contents. The kit is a library of layers, and a
        # barrel that imports a layer the build did not copy is a figure that fails to
        # mount — with the build green, because a runtime-only asset is no page's link.
        AssetRow(
            tuple((root / relative, out / relative) for relative in scaffold.SHARED_DIRS),
            select=lambda directory: [path for path in sorted(directory.rglob("*")) if path.is_file()],
        ),
        # The shell belongs to the renderer, not to the design system a book composes,
        # so a missing one fails the build instead of shipping pages with no shell.
        AssetRow(((SHELL_CSS, sheet_dir / "shell.css"),), missing="fail", rename=rename),
        # The book's generated stylesheet, then its author-local one, last in the
        # cascade. `book-local.css` may be empty; a book that has one must ship it or
        # its own component rules silently disappear.
        AssetRow(
            (
                (book.docs / "assets" / "stylesheets" / "book.css", sheet_dir / "book.css"),
                (book.docs / "assets" / "stylesheets" / "book-local.css", sheet_dir / "book-local.css"),
            ),
            rename=rename,
        ),
        # The formulae booklet: the shared widget and the book's generated data,
        # copied together so the widget's sibling fetch resolves.
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
        # The service-worker registration script. Every page loads it; without it in the
        # output a profile served on its own would 404. `settings.js` arrives with
        # `SHARED_FILES` above.
        AssetRow(
            (
                (asset_root / "settings" / "service-worker.js", out / "assets" / "settings" / "service-worker.js"),
            ),
            rename=rename,
        ),
        # The PWA: the manifest and the worker, written from the portal so the worker
        # carries the same build label the pages do and the cache rotates on deploy.
        # They belong at the deployment root, but a profile built on its own needs them
        # beside its pages for the shell's root-absolute links to resolve.
        AssetRow(
            writes=(
                (out / "manifest.webmanifest", portal.manifest),
                (out / "sw.js", portal.service_worker),
            )
        ),
        # The tab icon and the home-screen icon: three files, one motif (see
        # assets/icons/), reached by the same prefix-relative path as the stylesheets.
        AssetRow(
            tuple(
                (asset_root / "icons" / name, out / "assets" / "icons" / name)
                for name in ("app-icon.svg", "favicon.svg", "apple-touch-icon.png")
            )
        ),
        # This book's own data files, emitted by the tool that computed them (see
        # `books/maths-applied`). Not in `figures/`, where every file must export
        # `mount()`.
        AssetRow(
            ((book.docs / "assets" / "data", out / "assets" / "data"),),
            select=lambda directory: [
                path for path in sorted(directory.rglob("*")) if path.is_file()
            ],
            label="data files",
        ),
        # This book's own images: a photograph, a scan, a credit-bearing plate. Never a
        # figure: a figure follows the reader's bundle, an image cannot.
        AssetRow(
            ((book.docs / "assets" / "images", out / "assets" / "images"),),
            select=lambda directory: [
                path for path in sorted(directory.rglob("*")) if path.is_file()
            ],
            label="images",
        ),
        # This book's own figure modules. A symlink here is a shared file: on a platform
        # that checks symlinks out as plain files it is a text file naming its target,
        # so copying it would put a 36-byte "module" in the site — a green build and a
        # broken browser. `figures.js` and `kit.js` arrive with `SHARED_FILES`.
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
        # The shared figure library: every module more than one book mounts, copied
        # flat beside the loader because a figure is mounted by bare slug. A book's own
        # module of the same name is an error rather than an override — see
        # `shared_figure_modules`.
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
    # The record of what was written, and under what name: a content-addressed name
    # cannot be derived from the source tree by whoever reads the output.
    (out / "assets" / "manifest.json").write_text(
        asset_manifest(book, assets, figures or {}, pages), encoding="utf-8"
    )
    copied.append("manifest.json")
    return copied

def sibling_roots(exclude: str | None = None) -> tuple[str, ...]:
    """Where the collection's *other* books publish, root-relative.

    Every book is a separate build published side by side under one origin, so a
    cross-book link is real but unverifiable here. The other book's own build checks
    its links, and the directive that writes these hrefs resolves against a registry.
    A book removed from the collection while a page links to it is covered by
    `tests/test_proofs.py`.
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

    A link's *fragment* must also name an ``id`` in the target file. The ids accepted
    are those already in the output: one from the ``toc`` extension, or one a page
    writes as ``<a id="…"></a>``. ``<script>`` bodies are excluded because the search
    client builds its hrefs at runtime.

    ``scope`` limits checking to one chapter for subset builds. ``siblings`` are the
    other books' deploy roots and ``root_pages`` the collection pages the portal
    writes at the site root; both are skipped, for the reasons in `sibling_roots`.

    Every page carries the whole sidebar, so resolution is lexical against one
    listing of the output directory rather than ``Path.resolve()`` per link, which
    measured as the largest cost of a whole build. Target ids are cached per file.
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
            # href as if it did would accept bare root-relative links, which break
            # as soon as a page is nested.
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
) -> BuildResult:
    """Render a book, or one chapter of it, to a directory of static HTML.

    Search is not this function's job any more: one index is built over the whole
    assembled site by `textbook.search`, because a result should be able to come
    from any book. `serve` builds that index beside the one book it serves.
    """
    started = time.time()
    book = books.book_by_id(book_id)
    profile = profile or book.default_profile.id
    # An unknown profile must fail: it would build to a new directory and, because
    # the tier filter keys on the profile, publish a whole extra edition.
    declared = [p.id for p in book.profiles]
    if profile not in declared:
        raise ValueError(
            f"{book.id} has no profile {profile!r}; it declares {', '.join(declared)}"
        )
    out = out or Path(books.repo_root()) / "site" / book.deploy_path(profile)
    # Which sections this build writes, from the declared `tier_filter` and never
    # from the literal profile id: a book may name its lower-tier profile anything.
    # See `Book.tiers_included`.
    included_tiers = book.tiers_included(book.tier_filter_for(profile))
    config = make_config(book, profile)
    template = Template(PAGE_TEMPLATE.read_text(encoding="utf-8"))
    # The Settings control the landing page uses: same trigger, same dialog. Once
    # per build, not per page.
    settings = (portal.settings_trigger(), portal.settings_dialog(book=book))
    build_label = portal.build_label()
    # Where each stylesheet is written and linked: the pages reference it and
    # `copy_assets` writes to it, so a second computation is a second answer.
    assets = addressed_assets(book)
    # The same map the hook writes into a page's `data-figure-src` and the copy uses
    # for the filename. Computed once: a per-page hash would re-read every module for
    # every page.
    modules = hooks.figures.module_paths(config)
    figure_modules = {slug: scaffold.addressed_name(path) for slug, path in modules.items()}
    config["figure_modules"] = figure_modules

    if clean and out.exists():
        shutil.rmtree(out)

    # A configured animation id that is not registered is a typo, and a typo that
    # renders nothing is what the registry exists to catch.
    problems = backgrounds.validate(
        books.load_collection().get("backgrounds"), "collection.yaml"
    ) + backgrounds.validate(book.backgrounds, "book.yaml")
    if problems:
        raise ValueError("backgrounds: " + "; ".join(problems))

    # Two forms of "the chapter being built", for two consumers that work on
    # different names: `nav_paths` walks source paths and `check_links` walks slugged
    # output paths. Passing the source form to both meant a subset build skipped every
    # link and still reported `broken 0`.
    subset = f"Chapter {chapter}" if chapter else None
    link_scope = url_for(f"Chapter {chapter}/index.md").rstrip("/") if chapter else None
    full = nav_for(book, included_tiers)
    paths = nav_paths(full, subset=subset)
    nav = full if (full_nav or not subset) else chapter_subset(book, chapter, included_tiers)

    # The masthead links to the book's cover and every chapter links back to it, so
    # a subset build must still emit it or those links 404.
    cover = "index.md"
    if cover not in paths and (book.docs / cover).exists():
        paths.insert(0, cover)

    # Slugging maps the source layout onto URLs, so two source paths could land on
    # the same one and silently overwrite a page.
    seen: dict[str, str] = {}
    for md_path in paths:
        url = url_for(md_path)
        if url in seen:
            raise ValueError(
                f"URL collision: {seen[url]!r} and {md_path!r} both publish to {url!r}"
            )
        seen[url] = md_path

    result = BuildResult(out=out)
    # One nav, two memos, shared by every page: the sidebar is the same object on all
    # of them. See `render_nav`.
    nav_cache: dict[int, set[str]] = {}
    nav_render_cache: dict[tuple[int, str], str] = {}
    # The reading order the sidebar declares, built once: it reads each page's front
    # matter for a title, and a page must not read its neighbours on every render.
    pager_map = pager_for(paths, book)
    # Every page this build wrote and its byte length: the download list and the size a
    # reader is shown both come from here.
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
    # The same 404 the landing page uses, rather than a second one: it loads the
    # bundle stylesheet from the site root and applies the reader's own scheme before
    # paint. Root-absolute paths are what make that safe at any depth.
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

    Wider than the page sources on purpose: a build also reads the curriculum,
    ``book.yaml``, ``collection.yaml``, the theme bundles, the book's own assets and
    the engine's templates and CSS. Watching only the Markdown left ``--serve``
    silently stale after a figure or curriculum edit.
    """
    root = Path(books.repo_root())
    book = books.book_by_id(book_id)
    yield from book.docs.rglob("*.md")
    # The files a build reads directly. Guarded by `is_file`, because a book without
    # a booklet names a path that is not there and `serve` stats every watched path.
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

    ``book`` and ``themes`` cache their parses for the life of the process (see
    ``book.py``); ``--serve`` would otherwise rebuild from the values read at
    startup.
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
    # The page imports the collection's one index from the deployment root. Served
    # on its own, this book *is* the deployment root, so indexing its output here
    # keeps search working in development without a second loader path.
    report(result)
    search.report(search.build(result.out))

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(result.out), **kwargs)

        def log_message(self, *args):
            pass

    class Server(socketserver.ThreadingTCPServer):
        # Without this, restarting within the TIME_WAIT window fails with EADDRINUSE.
        # Threading keeps a slow request from blocking the rebuild poll.
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
                rebuilt = build(book_id, profile, chapter=chapter)
                report(rebuilt)
                search.report(search.build(rebuilt.out))
                previous = stamp()


# --- CLI ----------------------------------------------------------------------


def main() -> int:
    parser = argparse.ArgumentParser(description="Render a book without a site generator.")
    parser.add_argument("--book", default="gcse-maths")
    parser.add_argument("--profile", default=None, help="profile id, e.g. higher")
    parser.add_argument("--out", type=Path, default=None)
    parser.add_argument("--chapter", type=int, default=None, help="build one chapter")
    parser.add_argument("--full-nav", action="store_true",
                        help="render every chapter in the sidebar even for a subset build")
    parser.add_argument("--serve", action="store_true")
    parser.add_argument("--port", type=int, default=8123)
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(message)s")

    if args.serve:
        serve(args.book, args.profile or "higher", args.chapter, args.port)
        return 0

    try:
        result = build(args.book, args.profile, args.out, args.chapter, args.full_nav)
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
        # that matches no bank, a `:::prove` id in no registry, a background that is
        # not registered, a profile the book does not declare. Each message is
        # written for a person, so it becomes a log line, not a traceback.
        log.error("%s", err)
        return 2

    report(result)
    return 0 if result.ok else 1


if __name__ == "__main__":
    sys.exit(main())
