#!/usr/bin/env python3
"""Validate a book's booklet data and emit the JSON the widget fetches.

LaTeX is rendered to MathML here, at build time, using the same KaTeX renderer as
the pages, so the booklet needs no runtime maths JavaScript.

Usage:
    python -m textbook.booklet              # every book that declares a booklet
    python -m textbook.booklet gcse-maths
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

import yaml

from . import yamlio

from . import book as books

KATEX = Path(__file__).resolve().parent / "js" / "katex-render.mjs"

TIERS = {"F", "O", "H"}


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)


def render_mathml(tex_items: list[str]) -> list[str]:
    payload = json.dumps([{"tex": tex, "display": False} for tex in tex_items])
    proc = subprocess.run(
        ["node", str(KATEX)],
        input=payload + "\n",
        capture_output=True,
        text=True,
        timeout=60,
        check=True,
    )
    return json.loads(proc.stdout.strip().splitlines()[-1])


def validate(data: dict) -> None:
    boards = set(data["meta"]["boards"])
    groups = set(data["meta"]["groups"])
    seen: set[str] = set()

    for section in data["sections"]:
        if not section.get("items"):
            fail(f"section {section['id']} has no items")
        for item in section["items"]:
            iid = item["id"]
            if iid in seen:
                fail(f"duplicate item id {iid}")
            seen.add(iid)
            if not item.get("latex", "").strip():
                fail(f"{iid}: empty latex")
            if not set(item.get("tier", [])) <= TIERS:
                fail(f"{iid}: bad tier {item.get('tier')}")
            provision = item.get("provision", {})
            if not provision:
                fail(f"{iid}: no provision")
            if not set(provision) <= boards:
                fail(f"{iid}: provision names an unknown board")
            if not set(provision.values()) <= groups:
                fail(f"{iid}: provision names an unknown group")

    for table in data.get("tables", []):
        width = len(table["columns"])
        for row in table["rows"]:
            if len(row) != width:
                fail(f"table {table['id']}: row width {len(row)} != {width}")


def build(source: Path) -> dict:
    data = yamlio.load_file(source)
    validate(data)

    latex = [item["latex"] for section in data["sections"] for item in section["items"]]
    mathml = render_mathml(latex)
    if any(m.startswith('<span class="math-error"') for m in mathml):
        bad = [
            latex[i]
            for i, m in enumerate(mathml)
            if m.startswith('<span class="math-error"')
        ]
        fail("KaTeX could not render: " + "; ".join(bad))

    cursor = 0
    for section in data["sections"]:
        for item in section["items"]:
            item["mathml"] = mathml[cursor]
            cursor += 1

    return data


def output_path(book: books.Book) -> Path:
    return book.docs / "assets" / "booklet" / "booklet.json"


def main() -> int:
    parser = argparse.ArgumentParser(description="Build the formulae booklet data.")
    parser.add_argument("books", nargs="*", help="book ids (default: all)")
    args = parser.parse_args()

    selected = (
        [books.book_by_id(b) for b in args.books]
        if args.books
        else [b for b in books.discover_books() if b.booklet_name]
    )

    for book in selected:
        if not book.booklet.is_file():
            fail(f"{book.id}: no booklet data at {book.booklet}")
        data = build(book.booklet)
        out = output_path(book)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
        items = sum(len(s["items"]) for s in data["sections"])
        print(
            f"wrote {out.relative_to(books.repo_root())} "
            f"({items} formulae, {len(data.get('tables', []))} tables)"
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
