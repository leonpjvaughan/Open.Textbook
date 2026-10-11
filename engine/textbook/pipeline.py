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

from . import book as books
from . import config as cfg
from . import scaffold
from .frontmatter import FrontMatterError
from .frontmatter import read as read_page
from .frontmatter import split as split_front_matter
from .hooks import figures, maths, problems, tier, toc

log = logging.getLogger("textbook.pipeline")

TEMPLATES = Path(__file__).resolve().parent / "templates"
CSS = Path(__file__).resolve().parent / "css"
PAGE_TEMPLATE = TEMPLATES / "page.html"
SHELL_CSS = CSS / "shell.css"

# The hooks that transform page Markdown, in order. This is the same order as
# hooks/__init__.py, which cannot express it by listing files because several
# hooks want the same event.
MARKDOWN_HOOKS = (tier, toc, figures, problems)

# Only the extensions the content actually uses. base.yml also declares
# admonition, attr_list, pymdownx.details and pymdownx.superfences; measured
# usage across all 457 pages of the first book is zero, zero, zero and one.
#
# These are Extension *instances*. The ``{name: {options}}`` mapping that MkDocs
# accepts is MkDocs sugar: Python-Markdown wants a name or an Extension.
EXTENSIONS = [
    "md_in_html",  # <details markdown="1">
    "tables",
    ArithmatexExtension(generic=True),  # $...$ delimiters for the maths hook
]

# Shared stylesheets, in load order. book.css is generated per book by the
# scaffold and copied from the book's own docs assets.
SHARED_CSS = ("themes.css", "extra.css", "portal.css")

# Links to source .md paths in rendered HTML. The suffix stays in the captured
# group so url_for can tell 'a/b/index.md' from 'a/b/index'; stripping it here
# would yield 'a/b/index/' instead of 'a/b/'.
HTML_LINK = re.compile(r'(href|src)="([^"]+?\.md)(#[^"]*)?"')
SCRIPT_STYLE = re.compile(r"<(script|style)\b.*?</\1>", re.S | re.I)
MATH_ERROR = re.compile(r'<span class="math-error"')
ATTR_LINK = re.compile(r'(?:href|src)="([^"]+)"')

# Pagefind builds the search index over the rendered HTML after the build. It is
# installed by npm beside KaTeX, which the build already needs, so it adds no new
# kind of dependency. Running it is a separate step, and skippable, so tests do
# not pay for indexing.
PAGEFIND = books.repo_root() / "node_modules" / ".bin" / "pagefind"


# --- paths and URLs -----------------------------------------------------------


# URL segments for the page kinds whose directory names are ours, not the
# reader's. AGENTS.md is explicit that internal words must never reach the reader,
# and a URL is read in the address bar, the sitemap and every search result, so
# the published path uses the same vocabulary the navigation does.
SLUG_OVERRIDES = {
    "Walkthrough": "learn",
    "Guided problems": "practise-with-help",
    "Problems": "practise",
}

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
    """The relative path back to the site root: one ``../`` per directory level."""
    depth = len([part for part in url.strip("/").split("/") if part])
    return "../" * depth


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


def render_nav(nav, current_url: str) -> str:
    """Nested ``<ul>``, sections collapsible with ``<details>``.

    The open/closed decision precomputes the leaf set once per node, so rendering
    a 25-chapter sidebar is linear rather than quadratic.
    """
    root = prefix_for(current_url)
    cache: dict[int, set[str]] = {}

    def leaf_urls(node) -> set[str]:
        key = id(node)
        if key not in cache:
            cache[key] = {url_for(path) for path in leaves(node)}
        return cache[key]

    def render(node) -> str:
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
                open_ = " open" if current_url in leaf_urls(child) else ""
                items.append(
                    f"<li><details{open_}><summary>{html.escape(title)}</summary>"
                    f"<ul class='nav__list'>{render(child)}</ul></details></li>"
                )
        return "".join(items)

    return f"<ul class='nav__list'>{render(nav)}</ul>"


def nav_for(book: books.Book, include_higher: bool) -> list:
    """The nav MkDocs would be handed, built from curriculum.yaml."""
    return scaffold.build_nav_list(
        book.strands, book.chapters, include_higher=include_higher
    )


def chapter_subset(book: books.Book, chapter: int) -> list:
    """Only one chapter's nav entry, so a subset build has a small sidebar."""
    wanted = f"Chapter {chapter}:"
    for entry in nav_for(book, include_higher=True):
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
    """A plain dict satisfies the hooks, which only ever call ``config.get()``."""
    return {
        "extra": {
            "book": book.id,
            "book_dir": book.rel(book.root),
            "tier_profile": profile,
        },
        "docs_dir": str(book.docs),
    }


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


def render_page(
    book: books.Book, config: dict, nav, md_path: str, template: Template
) -> tuple[str, RenderedPage, bool]:
    """Render one page. Returns (html, index entry, had a maths error)."""
    meta, body = read_page(book.docs / md_path)
    url = url_for(md_path)
    page = make_page(md_path, url)

    for hook in MARKDOWN_HOOKS:
        body = hook.on_page_markdown(body, page, config, [])

    content = markdown.markdown(body, extensions=EXTENSIONS, output_format="html5")
    content = maths.on_page_content(content, page, config, [])
    content = rewrite_source_links(content)

    title = str(meta.get("title") or md_path)
    rendered = template.substitute(
        title=html.escape(title),
        description=html.escape(str(meta.get("description") or book.description)),
        site_title=html.escape(book.title),
        canonical=canonical_url(book, url),
        content=content,
        nav=render_nav(nav, url),
        prefix=prefix_for(url),
    )
    return rendered, RenderedPage(url=url, title=title), bool(MATH_ERROR.search(content))


def run_pagefind(out: Path) -> bool:
    """Build the search index over the rendered HTML. False if unavailable."""
    if not PAGEFIND.exists():
        return False
    finished = subprocess.run(
        [str(PAGEFIND), "--site", str(out), "--quiet"],
        capture_output=True,
        text=True,
    )
    if finished.returncode != 0:
        log.warning("pagefind failed: %s", (finished.stderr or "").strip()[:400])
        return False
    return True


def canonical_url(book: books.Book, url: str) -> str:
    """Absolute URL for a page, from the collection's base URL."""
    base = str(books.load_collection().get("base_url", "")).strip().rstrip("/")
    if not base:
        return ""
    return f"{base}/{book.deploy_path(book.default_profile.id)}/{href(url)}"


# --- outputs ------------------------------------------------------------------


def sitemap(book: books.Book, pages: list[RenderedPage]) -> str:
    """An XML sitemap, or an empty string when no base URL is configured."""
    base = str(books.load_collection().get("base_url", "")).strip().rstrip("/")
    if not base:
        return ""
    root = f"{base}/{book.deploy_path(book.default_profile.id)}/"
    urls = "".join(f"<url><loc>{root}{href(p.url)}</loc></url>" for p in pages)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f"{urls}</urlset>"
    )


NOT_FOUND = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found</title>
<!-- Self-contained: a 404 can be served for a request at any depth, under any
     book's subpath, so linked stylesheets have no reliable base. -->
<style>
body { margin: 0; background: #faf9f5; color: #1f1e1b;
  font: 16px/1.7 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
.wrap { max-width: 40rem; margin: 4rem auto; padding: 0 1rem; }
a { color: #23577d; }
@media (prefers-color-scheme: dark) {
  body { background: #171614; color: #e9e7e1; }
  a { color: #8cc0e8; }
}
</style>
</head><body><div class="wrap">
<h1>Page not found</h1>
<p>That page is not here. Use the contents list, or start again from the book cover.</p>
</div></body></html>
"""


def copy_assets(book: books.Book, out: Path) -> list[str]:
    """Copy the shared design system, the shell, and this book's figure modules."""
    copied: list[str] = []
    sheets = out / "assets" / "stylesheets"
    sheets.mkdir(parents=True, exist_ok=True)

    shared = Path(books.repo_root()) / "assets" / "stylesheets"
    for name in SHARED_CSS:
        source = shared / name
        if source.exists():
            shutil.copy2(source, sheets / name)
            copied.append(name)
    shutil.copy2(SHELL_CSS, sheets / "shell.css")
    copied.append("shell.css")

    generated = book.docs / "assets" / "stylesheets" / "book.css"
    if generated.exists():
        shutil.copy2(generated, sheets / "book.css")
        copied.append("book.css")

    loader = Path(books.repo_root()) / "assets" / "figures" / "figures.js"
    if loader.exists():
        dest = out / "assets" / "figures" / "figures.js"
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(loader, dest)
        copied.append("figures.js")

    modules = book.docs / "assets" / "figures"
    if modules.is_dir():
        dest = out / "assets" / "figures"
        dest.mkdir(parents=True, exist_ok=True)
        count = 0
        for module in sorted(modules.glob("*.js")):
            shutil.copy2(module, dest / module.name)
            count += 1
        copied.append(f"{count} figure modules")
    return copied


def check_links(out: Path, pages: list[RenderedPage], scope: str | None = None) -> list[str]:
    """Every internal link in every built page must resolve to a built file.

    This replaces ``mkdocs build --strict``. ``<script>`` bodies are excluded
    because the search client builds its hrefs at runtime.

    ``scope`` limits checking to one chapter, for subset builds: the cover links
    to all 25 chapters and the sidebar to the built one, so without it a subset
    build reports every unbuilt chapter as broken. Links to the site root are
    always checked, since the cover is built by every build.

    Every page carries the whole sidebar, so a full book is around 200,000 link
    targets. Resolution is therefore done lexically against one listing of the
    output directory. Calling ``Path.resolve()`` per link instead walks the
    filesystem a component at a time, which measured as the single largest cost
    of a whole build.
    """
    built = {path.relative_to(out).as_posix() for path in out.rglob("*")}
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
            path = urllib.parse.unquote(target.split("#")[0].split("?")[0])
            if not path:
                continue
            # Only a leading slash means "from the site root". Treating every
            # href as if it did would silently accept bare root-relative links,
            # which break as soon as a page is nested.
            joined = path.lstrip("/") if path.startswith("/") else posixpath.join(base, path)
            candidate = posixpath.normpath(joined)
            if candidate.startswith(".."):
                broken.append(f"{page.url} -> {target} (escapes the output directory)")
                continue
            if scope and candidate != "." and not candidate.startswith(f"{scope}/"):
                continue  # outside this subset build, not a broken link
            if candidate in built or f"{candidate.rstrip('/')}/index.html" in built:
                continue
            if candidate == "." and "index.html" in built:
                continue
            broken.append(f"{page.url} -> {target}")
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
    out = out or Path(books.repo_root()) / "site" / book.deploy_path(profile)
    include_higher = profile != "foundation"
    config = make_config(book, profile)
    template = Template(PAGE_TEMPLATE.read_text(encoding="utf-8"))

    if clean and out.exists():
        shutil.rmtree(out)

    subset = f"Chapter {chapter}" if chapter else None
    full = nav_for(book, include_higher)
    paths = nav_paths(full, subset=subset)
    nav = full if (full_nav or not subset) else chapter_subset(book, chapter)

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
    for md_path in paths:
        source = book.docs / md_path
        if not source.exists():
            result.broken.append(f"{md_path}: listed in the nav but not on disk")
            continue
        rendered, entry, maths_failed = render_page(book, config, nav, md_path, template)
        destination = out / entry.output
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(rendered, encoding="utf-8")
        result.pages.append(entry)
        if maths_failed:
            result.maths_errors.append(entry.url)

    result.assets = copy_assets(book, out)
    result.indexed = run_pagefind(out) if index else False
    (out / "404.html").write_text(NOT_FOUND, encoding="utf-8")
    if xml := sitemap(book, result.pages):
        (out / "sitemap.xml").write_text(xml, encoding="utf-8")
    (out / "robots.txt").write_text("User-agent: *\nAllow: /\n", encoding="utf-8")

    result.broken.extend(check_links(out, result.pages, scope=subset))
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
    """Everything that should trigger a rebuild."""
    book = books.book_by_id(book_id)
    yield from book.docs.rglob("*.md")
    yield from (Path(books.repo_root()) / "assets").rglob("*")
    yield from (Path(__file__).resolve().parent).rglob("*.py")
    yield from (Path(__file__).resolve().parent).rglob("*.html")
    yield from (Path(__file__).resolve().parent).rglob("*.css")


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
            "MkDocs would swallow this and build the page with no metadata, "
            "including no tier."
        )
        return 2
    except KeyError as err:
        log.error("unknown book or profile: %s", err)
        return 2

    report(result)
    return 0 if result.ok else 1


if __name__ == "__main__":
    sys.exit(main())
