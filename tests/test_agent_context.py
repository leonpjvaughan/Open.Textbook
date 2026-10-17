"""The agent context map: the routing table and the repository map must not rot.

An agent that reads only the root ``AGENTS.md`` finds the rest of its context
through two tables. The routing table sends a task to the two or three files that
matter and to the skill to load; the repository map lists every top-level
directory, so nothing in the tree is a surprise. A path that does not exist sends
the agent nowhere, and a directory missing from the map is invisible, so both are
checked here.

This test is deliberately about the map, not the prose. It says that every path
the map names is real, that every area is on the map, and that every nested
``AGENTS.md`` is reachable from the root.
"""

from __future__ import annotations

import re

from textbook.book import repo_root

ROOT = repo_root()
AGENTS = ROOT / "AGENTS.md"

# Build output, vendored dependencies and local tool state. These are not part of
# the repository's source tree, so the map does not name them.
GENERATED_DIRS = {
    ".git",
    ".mypy_cache",
    ".od",
    ".od-skills",
    ".pytest_cache",
    ".ruff_cache",
    ".venv",
    ".wrangler",
    "__pycache__",
    "node_modules",
    "site",
    "var",
}

BACKTICK = re.compile(r"`([^`]+)`")

# The tasks the routing table must route. A keyword, not a title, so the wording
# can improve without breaking the test.
ROUTED_TASKS = (
    "chapter",
    "book content",
    "problem bank",
    "figure",
    "shell",
    "theming",
    "test suite",
    "deploy",
    "research",
    "adding a book",
)


def section(heading: str) -> str:
    """The text of a ``## heading`` section, up to the next one."""
    text = AGENTS.read_text(encoding="utf-8")
    match = re.search(rf"^## {re.escape(heading)}\s*$", text, re.M)
    assert match, f"AGENTS.md has no '## {heading}' section"
    rest = text[match.end() :]
    end = re.search(r"^## ", rest, re.M)
    return rest[: end.start()] if end else rest


def table(heading: str) -> list[list[str]]:
    """The rows of the first markdown table in a section, header first."""
    rows: list[list[str]] = []
    for line in section(heading).splitlines():
        line = line.strip()
        if not (line.startswith("|") and line.endswith("|")):
            continue
        cells = [cell.strip() for cell in line[1:-1].split("|")]
        if all(set(cell) <= set("-: ") for cell in cells):
            continue  # the separator row
        rows.append(cells)
    assert rows, f"'## {heading}' has no markdown table"
    return rows


def column(rows: list[list[str]], header: str) -> list[str]:
    names = rows[0]
    assert header in names, f"no '{header}' column; header is {names}"
    index = names.index(header)
    return [row[index] for row in rows[1:]]


def paths_in(cells: list[str]) -> list[str]:
    """Every backticked path in the cells. Prose and em dashes are ignored."""
    return [path for cell in cells for path in BACKTICK.findall(cell)]


def book_ids() -> list[str]:
    """Every book's id, from the directory that holds its ``book.yaml``."""
    return sorted(
        path.name for path in (ROOT / "books").iterdir() if (path / "book.yaml").is_file()
    )


def expand(path: str) -> list[str]:
    """``books/<id>/AGENTS.md`` names every book's file, not a literal path.

    The routing table sends a chapter task to the book's *own* file, and the table used
    to hardcode the first book — so an agent writing an Irish chapter was routed to the
    GCSE Mathematics file. ``<id>`` is expanded against the books that exist, which keeps
    the check below meaningful: every expanded path has to be real.
    """
    if "<id>" not in path:
        return [path]
    return [path.replace("<id>", name) for name in book_ids()]


def exists(path: str) -> bool:
    return all((ROOT / candidate.rstrip("/")).exists() for candidate in expand(path))


def top_level_directories() -> list[str]:
    return sorted(
        path.name
        for path in ROOT.iterdir()
        if path.is_dir() and path.name not in GENERATED_DIRS
    )


# --- the routing table --------------------------------------------------------


def test_the_routing_table_has_the_expected_columns():
    rows = table("Where to look")
    assert rows[0][:3] == ["If you are…", "Read", "Load"], (
        "the routing table's columns changed; update the parser and the map"
    )


def test_every_path_in_the_routing_table_exists():
    rows = table("Where to look")
    named = paths_in(column(rows, "Read")) + paths_in(column(rows, "Load"))
    missing = [path for path in named if not exists(path)]
    assert not missing, (
        "the routing table names paths that do not exist: "
        f"{missing}. Fix the table or create the files."
    )


def test_the_routing_table_covers_the_common_tasks():
    tasks = " ".join(column(table("Where to look"), "If you are…")).lower()
    missing = [task for task in ROUTED_TASKS if task not in tasks]
    assert not missing, f"the routing table no longer routes: {missing}"


# --- the repository map -------------------------------------------------------


def test_every_path_in_the_repository_map_exists():
    rows = table("Repository map")
    missing = [path for path in paths_in(column(rows, "Path")) if not exists(path)]
    assert not missing, (
        "the repository map names paths that do not exist: "
        f"{missing}. Fix the map or create the paths."
    )


def test_every_top_level_directory_is_in_the_repository_map():
    rows = table("Repository map")
    named = {path.rstrip("/").split("/")[0] for path in paths_in(column(rows, "Path"))}
    missing = [name for name in top_level_directories() if name not in named]
    assert not missing, (
        f"top-level directories absent from the repository map: {missing}. "
        "Add them to the map, or to GENERATED_DIRS if they are build output."
    )


# --- the nested files ---------------------------------------------------------


def nested_agents_files() -> list[str]:
    found: list[str] = []
    for directory in sorted(ROOT.iterdir()):
        if not directory.is_dir() or directory.name in GENERATED_DIRS:
            continue
        found.extend(path for path in directory.rglob("AGENTS.md"))
    return sorted(str(path.relative_to(ROOT)) for path in found)


def test_every_nested_agents_file_is_named_in_the_root():
    text = AGENTS.read_text(encoding="utf-8")
    missing = [path for path in nested_agents_files() if path not in text]
    assert not missing, (
        f"nested AGENTS.md files the root does not point to: {missing}"
    )


def test_the_nested_agents_files_exist_for_the_engine_and_the_books():
    """The areas that carry their own rules, so a task loads a little."""
    expected = {
        "engine/AGENTS.md",
        "assets/AGENTS.md",
        "books/AGENTS.md",
        "tests/AGENTS.md",
        "scripts/AGENTS.md",
        "research/AGENTS.md",
        "deploy/AGENTS.md",
        ".github/AGENTS.md",
    }
    found = set(nested_agents_files())
    assert expected <= found, f"missing area AGENTS.md files: {expected - found}"


def test_every_book_has_its_own_agents_file():
    """A book without one is invisible to the agent that opens it.

    The routing table sends a chapter task to ``books/<id>/AGENTS.md``, and the nearest
    file wins — so a book with no file of its own silently inherits only the root and
    ``books/AGENTS.md``, and the things that make *that* book different (its boards, its
    levels, its booklet, its traps) are nowhere. The four Irish books and ``proofs`` were
    in exactly that state while they were being written.
    """
    books_dir = ROOT / "books"
    expected = sorted(
        path.name for path in books_dir.iterdir() if path.is_dir() and (path / "book.yaml").is_file()
    )
    assert expected, "no books to check"
    missing = [name for name in expected if not (books_dir / name / "AGENTS.md").is_file()]
    assert not missing, (
        f"books with no AGENTS.md of their own: {missing}. The routing table sends a "
        "chapter task to that file, so a book without one is written from the root alone."
    )


def test_every_book_names_its_parent_agents_file():
    """A book's file must point one directory up, or it shadows the parent.

    The nearest file wins, and a nested file is additive. ``books/AGENTS.md``
    holds what is common to every book — the tier traps, the generated-file
    rules and the problem-bank schema — so an agent that reads only
    ``books/<id>/AGENTS.md`` would miss all of them unless the book names it.
    ``books/gcse-maths/AGENTS.md`` did exactly that gap when the parent was
    introduced; this is the guard that a second book cannot repeat it.
    """
    book_files = sorted((ROOT / "books").glob("*/AGENTS.md"))
    assert book_files, "no books/<id>/AGENTS.md files to check"
    missing = [
        str(path.relative_to(ROOT))
        for path in book_files
        if "books/AGENTS.md" not in path.read_text(encoding="utf-8")
    ]
    assert not missing, (
        "book AGENTS.md files that do not name their parent books/AGENTS.md: "
        f"{missing}. The closest file wins, so add a line pointing to it."
    )
