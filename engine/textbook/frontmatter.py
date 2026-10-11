"""Strict YAML front matter, parsed in one place.

Three callers need this: the lint reports it, the tier filter depends on it, and
the pipeline builds pages from it. They must agree, because the failure it guards
against is silent.

MkDocs' own front-matter loader catches a YAML error, reports nothing, and treats
the page as having no metadata. That is not cosmetic. ``tier.py`` decides which
pages belong to a Foundation build from ``tier: H`` in this same block, so a page
whose front matter fails to parse has no tier, is therefore not Higher-only, and
is built into the Foundation output — reachable by URL, absent from the
navigation — while ``mkdocs build --strict`` still exits 0.

Six pages of the first book shipped that way: an unquoted title containing a
colon, such as ``title: 11.2 Gradient and intercept: y = mx + c``, which YAML
reads as a nested mapping. Parsing is strict from here on, and a failure names
both the file and the reason.
"""

from __future__ import annotations

from pathlib import Path

import yaml

DELIMITER = "---"


class FrontMatterError(ValueError):
    """A page's front matter does not parse, so its metadata is unusable."""

    def __init__(self, path: Path | str, cause: yaml.YAMLError) -> None:
        self.path = Path(path)
        self.cause = cause
        mark = getattr(cause, "problem_mark", None)
        where = f" (line {mark.line + 1}, column {mark.column + 1})" if mark else ""
        super().__init__(f"{self.path}: front matter is not valid YAML{where}: {cause}")


def split(text: str, path: Path | str = "<unknown>") -> tuple[dict, str]:
    """Split page text into (metadata, body).

    A page with no front matter block is not an error: it simply has no metadata.
    A page with a ``---`` block that does not parse is.
    """
    if not text.startswith(DELIMITER):
        return {}, text
    end = text.find(f"\n{DELIMITER}", len(DELIMITER))
    if end == -1:
        return {}, text
    block = text[len(DELIMITER) : end]
    try:
        meta = yaml.safe_load(block)
    except yaml.YAMLError as err:
        raise FrontMatterError(path, err) from err
    return (meta if isinstance(meta, dict) else {}), text[end + len(DELIMITER) + 1 :].lstrip("\n")


def read(path: Path) -> tuple[dict, str]:
    """Read a Markdown file and split its front matter.

    Non-Markdown files, and files that are not valid UTF-8, have no front matter
    rather than being an error. This is called for every file in a build — the
    tier filter walks the whole file list, images and fonts included — so it must
    not try to decode a PNG.
    """
    path = Path(path)
    if path.suffix.lower() not in {".md", ".markdown"}:
        return {}, ""
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return {}, ""
    return split(text, path)
