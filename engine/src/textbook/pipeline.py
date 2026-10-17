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
from dataclasses import dataclass, field
from pathlib import Path
from string import Template
from types import SimpleNamespace

import markdown
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

log = logging.getLogger("textbook.pipeline")

TEMPLATES = Path(__file__).resolve().parent / "templates"
CSS = Path(__file__).resolve().parent / "css"
PAGE_TEMPLATE = TEMPLATES / "page.html"
SHELL_CSS = CSS / "shell.css"

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
# These are Extension *instances*. The ``{name: {options}}`` mapping a config
# file accepts is sugar: Python-Markdown wants a name or an Extension.
EXTENSIONS = [
    "md_in_html",  # <details markdown="1">
    "tables",
    ArithmatexExtension(generic=True),  # $...$ delimiters for the maths hook
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
ATTR_LINK = re.compile(r'(?:href|src)="([^"]+)"')
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


# URL segments for the page kinds whose directory names are ours, not the
# reader's. AGENTS.md is explicit that internal words must never reach the reader,
# and a URL is read in the address bar, the sitemap and every search result, so
# the published path uses the same vocabulary the navigation does.
SLUG_OVERRIDES = {directory: slug for directory, _kind, _title, slug in scaffold.PAGE_KINDS}

# Everything else slugs mechanically: 'Chapter 12' -> 'chapter-12',
# 'Section 1.1' -> 'section-1.1'. Dots survive so section numbers stay legible.
NON_SLUG = re.compile(r"[^a-z0-9.]+")


def slugify(segment: str) -> str:
    """One path segment as it appears in a published URL.

    Segments are slugged rather than used verbatim because the source layout is
    an authoring convention — 'Chapter 20/Section 20.4/Walkthrough/index.md' — and
    publishing it unchanged puts 'Chapter%2020' in every URL a reader sees.
    """
    if segment in {".", ".."}:
        return segment  # relative links must keep working
    if segment in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[segment]
    folded = unicodedata.normalize("NFKD", segment).encode("ascii", "ignore").decode()
    slug = NON_SLUG.sub("-", folded.lower()).strip(".-")
    return slug or "page"


def url_for(md_path: str) -> str:
    """``Chapter 1/Section 1.1/Walkthrough/index.md`` -> ``chapter-1/section-1.1/learn/``.

    Tolerates a path whose ``.md`` suffix has already been removed, because the
    link rewriter works on rendered HTML where it may or may not still be there.
    The root page maps to the empty string, which callers qualify with the
    current page's prefix.
    """
    path = md_path[:-3] if md_path.endswith(".md") else md_path
    if path == "index" or path.endswith("/index"):
        path = path[: -len("index")]
    segments = [slugify(part) for part in path.split("/") if part]
    return f"{'/'.join(segments)}/" if segments else ""


def href(url: str) -> str:
    """Percent-encode a URL for use in an attribute."""
    return urllib.parse.quote(url)


def prefix_for(url: str) -> str:
    """The relative path back to the site root. See `config.root_prefix`."""
    return cfg.root_prefix(url)


def booklet_widget(book: books.Book, prefix: str) -> str:
    """The formulae-booklet `<script>` a page carries, or the empty string.

    A classic deferred script rather than a module: it resolves its sibling
    ``booklet.json`` from ``document.currentScript.src``, which is null in a
    module. A book without a booklet gets no element at all, so no page fetches
    data that is not there.
    """
    if not book.booklet_name:
        return ""
    return f'<script src="{prefix}assets/booklet/booklet.js" defer></script>'


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
    """The nav, built from a book's own registry — a curriculum or a proof list."""
    return scaffold.build_nav_list(
        book.strands,
        book.chapters,
        included_tiers=included_tiers,
        proofs=book.proofs,
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

    The bundle registry is here so the before-paint script can offer exactly the
    themes in ``themes/`` without the page template holding a second list.
    """
    return {
        "extra": {
            "book": book.id,
            "book_dir": book.rel(book.root),
            "tier_profile": profile,
            # The `:::prove` hook needs three things the book itself does not
            # hold: which course the reader is in, and where the shared proof book
            # lives. Passing them here rather than letting the hook find them keeps
            # every hook resolving its paths the same way, so it works for any
            # book and a test can drive it with a hand-written config.
            "qualification": book.qualification,
            "proofs_dir": proofs_dir(book),
            "proofs_url": proofs_base_url(),
            "themes": [bundle.id for bundle in ordered_bundles()],
            "default_theme": default_bundle().id,
        },
        "docs_dir": str(book.docs),
    }


def proofs_dir(book: books.Book) -> str:
    """The reference work's directory, relative to the repository root.

    Empty when there is no reference work, and the hook then falls back to
    discovery — but a build knows, so it says.
    """
    reference = books.reference_book()
    return book.rel(reference.root) if reference else ""


def proofs_base_url() -> str:
    """Where the proof book publishes, root-absolute, so any book can link to it."""
    reference = books.reference_book()
    if reference is None:
        return "/proofs"
    return "/" + reference.deploy_path(reference.default_profile.id)


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



TABLE = re.compile(r"<table\b.*?</table>", re.S | re.I)


def wrap_tables(html_text: str) -> str:
    """Put every table in a scroll container.

    A worked example or a data table is routinely wider than a phone. Without a
    wrapper the table widens the *page* rather than scrolling inside it, and
    anything pinned to the viewport — the masthead controls, the booklet button —
    is pushed off the right edge. That is how a reader lost the settings button.
    """
    return TABLE.sub(lambda m: f'<div class="table-scroll">{m.group(0)}</div>', html_text)


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
    booklet = booklet_widget(book, prefix)
    rendered = template.substitute(
        title=html.escape(title),
        description=html.escape(str(meta.get("description") or book.description)),
        site_title=html.escape(book.title),
        canonical=canonical_url(book, profile, url),
        content=content,
        nav=render_nav(nav, url, leaf_cache, subtree_cache),
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


def copy_assets(book: books.Book, out: Path) -> list[str]:
    """Copy the shared design system, the shell, and this book's figure modules."""
    copied: list[str] = []
    root = Path(books.repo_root())
    assets = root / "assets"
    sheets = out / "assets" / "stylesheets"

    # Every shared file, from the one list that declares them — repository path and
    # site path are the same string, so there is nothing to map. This replaces a
    # hardcoded `SHARED_CSS` loop that had to be kept in step with the symlinks the
    # scaffold created, which is the pair of lists the engine review flagged: an
    # asset added to one and not the other was either a broken link or a file the
    # pages requested and the build never wrote.
    for relative in scaffold.SHARED_FILES:
        source = root / relative
        if not source.exists():
            continue
        target = out / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        copied.append(Path(relative).name)

    # A shared directory's whole contents, recursively. The kit is a library of
    # layers rather than one file, and a barrel that imports a layer the build did not
    # copy is a figure that fails to mount — with the build green, because an asset
    # reached only at runtime is not a link on any page.
    for relative in scaffold.SHARED_DIRS:
        source = root / relative
        if not source.is_dir():
            continue
        for path in sorted(source.rglob("*")):
            if not path.is_file():
                continue
            target = out / path.relative_to(root)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, target)
            copied.append(path.name)

    # The shell is the engine's own stylesheet, not a shared asset: it is part of
    # the renderer rather than the design system a book composes.
    sheets.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SHELL_CSS, sheets / "shell.css")
    copied.append("shell.css")

    generated = book.docs / "assets" / "stylesheets" / "book.css"
    if generated.exists():
        shutil.copy2(generated, sheets / "book.css")
        copied.append("book.css")

    # The book's author-local stylesheet, last in the cascade. It is authored,
    # not generated, and may be empty; a book that has one must ship it or its
    # own component rules silently disappear.
    local = book.docs / "assets" / "stylesheets" / "book-local.css"
    if local.exists():
        shutil.copy2(local, sheets / "book-local.css")
        copied.append("book-local.css")

    # The formulae booklet: the shared widget and the book's generated data,
    # copied together so the widget's sibling fetch resolves. A book without a
    # booklet ships neither the script nor a request for one.
    if book.booklet_name:
        widget = assets / "booklet" / "booklet.js"
        data = book.docs / "assets" / "booklet" / "booklet.json"
        if widget.exists() and data.exists():
            booklet_dir = out / "assets" / "booklet"
            booklet_dir.mkdir(parents=True, exist_ok=True)
            shutil.copy2(widget, booklet_dir / "booklet.js")
            shutil.copy2(data, booklet_dir / "booklet.json")
            copied.append("booklet.js")
            copied.append("booklet.json")

    # The Settings runtime and the service-worker registration. The registration
    # script is loaded by the deferred <script> every page carries; without it in
    # the output a profile served on its own would 404 on that request.
    settings_dir = out / "assets" / "settings"
    settings_dir.mkdir(parents=True, exist_ok=True)
    # `settings.js` is a shared file and arrives with `SHARED_FILES` above; only the
    # registration script is this build's own.
    for name in ("service-worker.js",):
        source = assets / "settings" / name
        if source.exists():
            shutil.copy2(source, settings_dir / name)
            copied.append(name)

    # The PWA: the manifest, the worker, and the home-screen icon. Written from
    # the portal rather than copied raw, so the worker carries the same build
    # label the pages do and the cache rotates on every deploy. They belong at
    # the deployment root, but a profile built on its own needs them beside its
    # pages for the root-absolute links in the shell to resolve.
    (out / "manifest.webmanifest").write_text(portal.manifest(), encoding="utf-8")
    copied.append("manifest.webmanifest")
    (out / "sw.js").write_text(portal.service_worker(), encoding="utf-8")
    copied.append("sw.js")

    # The tab icon and the home-screen icon: two files, one motif (see
    # assets/icons/). The tab icon is declared in the page shell, which reaches
    # it by the same prefix-relative path the stylesheets use.
    icons = assets / "icons"
    for name in ("app-icon.svg", "favicon.svg", "apple-touch-icon.png"):
        source = icons / name
        if source.exists():
            dest = out / "assets" / "icons" / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, dest)
            copied.append(name)

    # The two shared figure files come from `assets/`, **not** through the book's
    # symlinks — the same way every other shared asset in this function is read.
    #
    # Reading them through the symlink worked on Linux and broke on Windows, where
    # `git clone` without developer mode checks a symlink out as a *text file*
    # containing its target. The build then copied a 36-byte `kit.js` holding the
    # string `../../../../../assets/figures/kit.js` into the site, reported success
    # and counted it as a figure module — a green build, a broken browser, and
    # nothing in the output to say so.
    # `figures.js` and `kit.js` arrive with `SHARED_FILES` above. What is left is
    # this book's own modules — and nothing in the book's directory that is a
    # symlink, because on a platform that does not check symlinks out as links it is
    # not a module either; it is a text file naming its target.
    figures_dir = out / "assets" / "figures"

    modules = book.docs / "assets" / "figures"
    if modules.is_dir():
        figures_dir.mkdir(parents=True, exist_ok=True)
        skipped = 0
        count = 0
        for module in sorted(modules.glob("*.js")):
            # A symlink here is a shared file, and it may be a plain text file on a
            # platform that does not check symlinks out as links. Either way it is
            # not a figure, and copying it would put its target path in the site.
            if module.is_symlink() or module.name in scaffold.SHARED_FIGURE_FILES:
                skipped += 1
                continue
            shutil.copy2(module, figures_dir / module.name)
            count += 1
        copied.append(f"{count} figure modules")

    # The shared figure library: every module in `assets/figures/` that more than one
    # book mounts, copied **flat** beside the loader because a figure is mounted by
    # bare slug. A book's own module of the same name is an error rather than an
    # override — see `shared_figure_modules` — so there is nothing to decide here.
    library = root / scaffold.FIGURE_LIBRARY
    shared = 0
    if library.is_dir():
        figures_dir.mkdir(parents=True, exist_ok=True)
        for module in sorted(library.glob("*.js")):
            if module.name in scaffold.SHARED_FIGURE_FILES:
                continue
            shutil.copy2(module, figures_dir / module.name)
            shared += 1
    if shared:
        copied.append(f"{shared} shared figure modules")
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
) -> list[str]:
    """Every internal link in every built page must resolve to a built file.

    This replaces ``mkdocs build --strict``, and it goes one step beyond it: a
    link's *fragment* must name an ``id`` in the target file. MkDocs discarded
    the fragment, so ``page/#handle`` was checked as ``page/`` and passed whether
    or not the anchor existed — a check that could not fail. Here the resolved
    target's ids are read and the fragment must be one of them, so a deleted
    anchor or a heading whose slug changed is reported.

    The ids accepted are those already in the output. Headings carry none (the
    Markdown ``toc`` extension is not enabled), so a fragment naming a heading
    slug is reported rather than silently accepted: at the moment the link is
    written, that anchor cannot take the reader to the section. A page that wants
    a target writes one explicitly as ``<a id="…"></a>``.

    ``<script>`` bodies are excluded because the search client builds its hrefs
    at runtime.

    ``scope`` limits checking to one chapter, for subset builds: the cover links
    to all 25 chapters and the sidebar to the built one, so without it a subset
    build reports every unbuilt chapter as broken. Links to the site root are
    always checked, since the cover is built by every build.

    ``siblings`` are the other books' deploy roots. A link into one of them is
    outside this build and is skipped — see `sibling_roots` for why that is not
    the same as assuming it works.

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
    settings = (portal.settings_trigger(), portal.settings_dialog())
    build_label = portal.build_label()

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
        )
        destination = out / entry.output
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(rendered, encoding="utf-8")
        result.pages.append(entry)
        if maths_failed:
            result.maths_errors.append(entry.url)

    result.assets = copy_assets(book, out)
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
