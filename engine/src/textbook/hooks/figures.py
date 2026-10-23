"""Expand the line-anchored ``:::figure <slug>`` directive into the portable
``<maths-figure data-figure="<slug>">`` element, and inject the figure loader
only into pages that use it.

Known slugs are the book's own — discovered from ``<docs>/assets/figures/*.js`` —
**plus the shared library** in ``assets/figures/``, so a module that more than one
book mounts is available to all of them by its filename. An unknown slug fails the
build.

A book's own module may not share a name with a shared one: two modules with one
slug would make a page's meaning depend on build order, and the book can always
rename its own. That is an error here rather than an override, and it is the reason
the library is worth having — a duplicated figure has to be noticed.
"""

from __future__ import annotations

import re

from .. import config as cfg
from .. import scaffold
from ._fences import transform_outside_fences

MARKER = re.compile(r"^:::[ \t]*figure[ \t]+([a-z0-9-]+)[ \t]*$", re.M)
ASSET = "assets/figures/figures.js"
# Which files in a figures directory are not figures: the loader and the kit.
# Read from the scaffold so the directive's registry and the scaffold's symlinks
# cannot disagree about it.
SHARED = scaffold.SHARED_FIGURE_FILES


def figures_dir(config):
    return cfg.docs_dir(config) / "assets" / "figures"


def module_paths(config) -> dict[str, Path]:
    """Every figure this book can mount, by slug, and the file it comes from.

    One map, because three things have to agree about it: which slugs a page may
    name, which name the build copies each module to, and which name the page tells
    the loader to import. They used to be computed separately — the slugs here and
    the copies in `pipeline` — which is how a figure can exist and still fail.
    """
    directory = figures_dir(config)
    modules: dict[str, Path] = {}
    if directory.is_dir():
        for path in sorted(directory.glob("*.js")):
            if path.name not in SHARED:
                modules[path.stem] = path
    modules.update(scaffold.shared_figure_modules())
    return modules


def local_slugs(config) -> set[str]:
    """The slugs this book's own figures directory provides."""
    path = figures_dir(config)
    if not path.is_dir():
        return set()
    return {p.stem for p in path.glob("*.js") if p.name not in SHARED}


def shadowing_slugs(config) -> list[str]:
    """Slugs provided both by this book and by the shared library.

    A book that defines its own ``slope-field`` while the library also has one is a
    mistake worth failing on: the slug no longer says which figure a page means, and
    the book's copy would silently win or silently lose depending on the order the
    build happens to write them in.
    """
    return sorted(local_slugs(config) & set(scaffold.shared_figure_modules()))


def root_prefix(page) -> str:
    """The path back to the site root. See `config.root_prefix` for why it is there.

    It was `"../" * (url.count("/") + 1)` — the same answer by a different route.
    """
    return cfg.root_prefix(page.url or "")


def on_page_markdown(markdown, page, config, files):
    modules = module_paths(config)
    known = set(modules)
    shadowing = shadowing_slugs(config)
    if shadowing:
        raise ValueError(
            f"figures: {page.file.src_path} is in a book that defines "
            f"{', '.join(shadowing)}, which the shared library already provides "
            f"({scaffold.FIGURE_LIBRARY}). Rename the book's own module: two modules "
            "with one slug make a page's meaning depend on build order."
        )
    used: set[str] = set()

    def replace(match: re.Match[str]) -> str:
        slug = match.group(1)
        if slug not in known:
            raise ValueError(
                f"figures: unknown figure '{slug}' in {page.file.src_path} "
                f"(known: {', '.join(sorted(known)) or 'none'})"
            )
        used.add(slug)
        # **The `<div>` is load-bearing.** Python-Markdown treats an unknown tag as
        # inline, so a bare `<maths-figure>` came back wrapped in a `<p>` — 524 of them
        # across 508 pages — and `<p><div class="fig">` is invalid once `panel()` has
        # put its own `<div>` inside. It also left every figure with no element sibling,
        # which a module that needs to reach the block above it cannot work around.
        # A `<div>` is a block tag Python-Markdown knows, so it passes through unwrapped.
        #
        # `data-figure-src` is the name the build writes the module under: content,
        # not the build label, so a module that did not change keeps its URL and a
        # cached copy is still the one served. The loader falls back to
        # `data-figure` when the attribute is absent, which is what keeps one
        # module readable in the Quarto / MyST / MDX ports, where nothing is hashed.
        filename = (config.get("figure_modules") or {}).get(slug) or scaffold.addressed_name(
            modules[slug]
        )
        return (
            f'<div><maths-figure data-figure="{slug}" '
            f'data-figure-src="{filename}"></maths-figure></div>'
        )

    markdown = transform_outside_fences(markdown, lambda text: MARKER.sub(replace, text))
    if used:
        src = root_prefix(page) + ASSET
        markdown += f'\n\n<script type="module" src="{src}"></script>\n'
    return markdown
