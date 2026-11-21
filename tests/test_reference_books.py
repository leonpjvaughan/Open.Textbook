"""The map of numerical methods: a reference work whose nav comes from a registry.

A page that is unlisted is invisible, a listed page that is missing is a dead link,
and an authored page without a title renders as "Untitled".
"""

from __future__ import annotations

import contextlib
import io
import re
from pathlib import Path

import pytest
import sympy as sp

from textbook import book as books
from textbook.hooks import usedin

# §1.5's test already reads this model; importing it keeps the two books in step.
from test_maths_applied_ladder import SECTION as SECTION_1_5
from test_maths_applied_ladder import STIFFNESS, crossing

MAP = "numerical-methods"

#: Written out, not read from the registry: an expectation derived from the subject
#: agrees with a class silently dropped from `map.yaml`.
CLASSES = [
    "optimisation",
    "averaging",
    "eigenvalue",
    "linear-system",
    "root",
    "saddle-point",
    "elliptic",
    "parabolic",
    "hyperbolic",
]


def map_book():
    return books.book_by_id(MAP)


def test_the_map_is_a_reference_work_and_has_no_syllabus():
    book = map_book()
    assert book.qualification == books.REFERENCE
    assert book.chapters == [], "a reference work with a chapter plan is a course"
    assert book.strands == []
    assert book.tier_axis == {}
    assert book.boards == ()
    assert not book.booklet_name
    assert book.oracles == ()


def test_every_listed_page_exists_and_every_page_is_listed():
    """Both directions: a listed page with no file is a dead link, a file with no
    listing is a page with no way in.
    """
    book = map_book()
    listed = {entry["path"] for entry in book.pages}
    authored = {
        page.relative_to(book.docs).as_posix()
        for page in book.docs.rglob("*.md")
        if page.name == "index.md" and page.parent != book.docs
    }
    stray = [
        page.relative_to(book.docs).as_posix()
        for page in book.docs.rglob("*.md")
        if page.name != "index.md" and page.relative_to(book.docs).as_posix() != "colophon.md"
    ]
    assert stray == [], f"a page that is not part of the map: {stray}"
    assert listed - authored == set(), "listed in map.yaml, but no page exists"
    assert authored - listed == set(), "a page exists, but map.yaml does not list it"


def test_every_page_has_a_title():
    """The browser tab, the search result and the pager all read it."""
    book = map_book()
    for entry in book.pages:
        text = (book.docs / entry["path"]).read_text(encoding="utf-8")
        match = re.match(r"---\n(.*?)\n---\n", text, re.S)
        assert match, f"{entry['path']} has no front matter"
        assert re.search(r"^title:\s*\S", match.group(1), re.M), (
            f"{entry['path']} has no title"
        )


def test_the_home_page_links_every_page_in_the_registry():
    """The home page repeats the tree in plain Markdown, so it is a second copy
    of the class list and this keeps the two from drifting.
    """
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    missing = [
        entry["path"]
        for entry in book.pages
        if f"]({entry['path']})" not in home
    ]
    assert missing == [], f"the home page does not link {missing}"


def _counts() -> tuple[int, int]:
    """The two numbers the home page prints, counted rather than typed: method
    blocks in the A–Z and entries in the class pages' systems lists.
    """
    book = map_book()
    methods = len(_methods_a_to_z())
    systems = 0
    for slug in CLASSES:
        page = (book.docs / slug / "index.md").read_text(encoding="utf-8")
        start = page.index("## Systems that live here")
        block = page[start : page.index("## What goes wrong", start)]
        systems += len(re.findall(r"^- \S", block, re.M))
    return methods, systems


def test_the_nine_kinds_table_names_and_links_every_class():
    """One row per kind, each linking its page, so no class is missing from the
    argument and a tenth class cannot be added without the table growing.
    """
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    unlinked = [
        entry["title"]
        for entry in book.pages
        if entry.get("signature")
        and f"[{entry['title']}]({entry['path']})" not in home
    ]
    assert unlinked == [], f"the home page never links {unlinked}"
    rows = [
        line
        for line in home.splitlines()
        if line.startswith("|")
        and re.search(r"\]\((" + "|".join(CLASSES) + r")/index\.md\)", line)
    ]
    assert len(rows) == len(CLASSES), f"the nine-kinds table has {len(rows)} rows"
    cells = [[cell.strip() for cell in row.strip().strip("|").split("|")] for row in rows]
    assert all(len(row) == 4 for row in cells), (
        f"the nine-kinds table is not four columns: {[len(row) for row in cells]}"
    )
    missing = [row[0] for row in cells if "$" not in row[2]]
    assert missing == [], f"these kinds do not show their model: {missing}"


def test_every_method_states_its_step_in_symbols():
    """Every A–Z row carries the update the method repeats or the equation it
    solves; a name and a price alone is a glossary entry, not a technique.
    """
    methods = _methods_a_to_z()
    assert len(methods) == 77, f"the A–Z has {len(methods)} method blocks, not 77"
    missing = [method["name"] for method in methods if "$" not in method["step"]]
    assert missing == [], f"these methods do not state their step: {missing}"


def test_the_two_indexes_link_every_class_they_name():
    """`symptoms/` and `techniques/` both name a kind in a cell, so each name is a
    link to the right page; a renamed class and a stale href fail together.
    """
    book = map_book()
    slug_of = {
        entry["title"]: entry["path"].split("/")[0]
        for entry in book.pages
        if entry.get("signature")
    }
    link = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
    unlinked, misdirected = [], []
    # The A–Z names its class on each method's `Class:` line, `symptoms/` in a cell.
    lines: list[tuple[str, str]] = []
    for method in _methods_a_to_z():
        lines.append(("techniques", f"Class: {method['class']}"))
    for line in (book.docs / "symptoms" / "index.md").read_text(encoding="utf-8").splitlines():
        if line.startswith("|"):
            lines.append(("symptoms", line))
    for index, line in lines:
        for match in link.finditer(line):
            if match.group(1) in slug_of:
                wanted = f"../{slug_of[match.group(1)]}/"
                if match.group(2) != wanted:
                    misdirected.append((index, match.group(1), match.group(2), wanted))
        plain = link.sub("", line)
        for title in slug_of:
            if re.search(rf"(?<![\w-]){re.escape(title)}(?![\w-])", plain):
                unlinked.append((index, title, line))
    assert unlinked == [], f"a class named but not linked: {unlinked}"
    assert misdirected == [], f"a class linked to the wrong page: {misdirected}"


def test_the_home_page_states_the_counts_it_claims():
    """The page opens with an arithmetic claim, and each number is measured from
    the book so adding a method cannot quietly make the argument false.
    """
    methods, systems = _counts()
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    opening = home[: home.index("## The nine kinds")]
    assert f"**{methods}**" in opening, f"the page does not say it names {methods} methods"
    assert f"**{systems}**" in opening, f"the page does not say {systems} systems live here"
    assert f"**{len(CLASSES)}**" in opening, "the page does not say how many kinds there are"


def test_the_counting_table_sums_to_the_method_blocks():
    """The counting table's entries column must equal the method blocks below it.
    """
    text = (map_book().docs / "techniques" / "index.md").read_text(encoding="utf-8")
    rows = [line for line in text.splitlines() if line.startswith("| [")]
    counts = [int(line.rsplit("|", 2)[1]) for line in rows]
    assert len(counts) == 5, rows
    assert sum(counts) == len(_methods_a_to_z()), (counts, len(_methods_a_to_z()))


def test_the_landing_card_counts_pages_and_methods():
    """The card counts pages and methods, not the "0 chapters" every reference
    work shares; both numbers are measured rather than typed.
    """
    from textbook import portal

    book = map_book()
    methods, _systems = _counts()
    card = portal.card(book)
    assert "0 chapters" not in card
    assert "0 sections" not in card
    assert f"{len(book.pages)} pages" in card
    assert f"{methods} methods" in card


def test_the_classes_come_first_in_tree_order():
    """The nine classes come first, then the argument and the indexes, in the
    order the tree reaches them; the order is the argument.
    """
    slug_of = lambda path: path.split("/")[0]  # noqa: E731 - a one-line helper
    assert [slug_of(e["path"]) for e in map_book().pages[:9]] == CLASSES
    assert [slug_of(e["path"]) for e in map_book().pages[9:]] == [
        "error",
        "order",
        "checking",
        "reading-the-class",
        "choosing-the-class",
        "worked-case",
        "techniques",
        "symptoms",
        "systems",
        "averaging",
        "averaging",
        "averaging",
        "averaging",
        "optimisation",
        "eigenvalue",
        "linear-system",
        "root",
        "saddle-point",
        "elliptic",
        "parabolic",
        "hyperbolic",
    ]


def test_no_stub_page_survives_in_the_book():
    """Every page here is authored. The scaffold writes none for a reference work."""
    book = map_book()
    stubs = [
        page.relative_to(book.docs).as_posix()
        for page in book.docs.rglob("*.md")
        if "scaffold:stub" in page.read_text(encoding="utf-8")
    ]
    assert stubs == [], f"a stub page in a reference work: {stubs}"


def test_only_the_proof_book_holds_the_proof_registry():
    """`:::prove` resolves against the one book declaring `proofs:`; two would
    make it ambiguous.
    """
    holders = [book.id for book in books.reference_books() if book.proofs]
    assert holders == ["proofs"], holders


@pytest.mark.parametrize("slug", CLASSES)
def test_each_class_page_names_itself_and_its_neighbours(slug):
    """A page entered cold says what it is, and a wrong class must be able to
    leave for its neighbour without going back to the map.
    """
    page = (map_book().docs / slug / "index.md").read_text(encoding="utf-8")
    assert "You have one of these when" in page, f"{slug} does not open by naming itself"
    assert "## Read next" in page, f"{slug} has no neighbours"
    assert "](../symptoms/index.md)" in page, f"{slug} cannot reach the symptom index"


#: Fixed, because nine pages with their own order are nine essays, not a map.
SKELETON = [
    "## What you are modelling",
    "## The model you write down",
    "## What it becomes on a computer",
    "## The signature",
    "## Flags that matter here",
    "## Techniques",
    "## Systems that live here",
    "## What goes wrong",
    "## Used in this collection",
    "## Read next",
]


@pytest.mark.parametrize("slug", CLASSES)
def test_a_class_page_keeps_the_shared_skeleton(slug):
    """A lookup with nine pages is only a lookup if the ninth reads like the first."""
    page = (map_book().docs / slug / "index.md").read_text(encoding="utf-8")
    positions = [page.find(heading) for heading in SKELETON]
    missing = [h for h, p in zip(SKELETON, positions) if p < 0]
    assert missing == [], f"{slug} is missing {missing}"
    assert positions == sorted(positions), f"{slug} has the headings out of order"


# --- the two indexes are views of the class pages --------------------------------


def _methods_a_to_z() -> list[dict[str, str]]:
    """The A–Z's method blocks, in page order: heading, class link, step, price."""
    text = (map_book().docs / "techniques" / "index.md").read_text(encoding="utf-8")
    blocks = re.findall(
        r'<a id="([\w-]+)"></a>\n### (.+?)\n(.*?)(?=\n(?:<a id=|</div>))',
        text,
        re.S,
    )
    methods = []
    for anchor, name, body in blocks:
        parts = [part.strip() for part in re.split(r"\n\s*\n", body.strip()) if part.strip()]
        if len(parts) < 3 or not parts[0].startswith("Class:"):
            continue
        klass = parts[0][len("Class:") :].strip()
        # A wrapped step or price is one line once rendered, so join it here.
        step = " ".join(parts[1].splitlines())
        price = " ".join(parts[2].splitlines())
        methods.append(
            {"anchor": anchor, "name": name, "class": klass, "step": step, "price": price}
        )
    return methods


def _table_rows(page: Path, columns: int, heading: str | None = None) -> list[list[str]]:
    """The rows of the Markdown tables on a page, as cells; a table is found by
    its width, and `heading` limits the search to one section."""
    text = page.read_text(encoding="utf-8")
    if heading is not None:
        text = text[text.index(heading) :].split("\n## ", 1)[0]
    rows = []
    for line in text.splitlines():
        if not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) != columns:
            continue
        if set(cells[0]) <= set("-: ") or cells[0].lower() in ("method", "technique", "symptom"):
            continue
        rows.append(cells)
    return rows


def _names(cell: str) -> list[str]:
    """The method names a cell carries: its commas outside brackets, with link
    markup stripped so the text is the name and the URL is not.

    ``Control variates, antithetic pairs`` is two methods; ``Preconditioners (ILU,
    AMG, Jacobi)`` is one whose brackets happen to contain commas.
    """
    cell = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", cell)
    parts, depth, current = [], 0, ""
    for char in cell:
        if char == "(":
            depth += 1
        elif char == ")":
            depth -= 1
        if char == "," and depth == 0:
            parts.append(current)
            current = ""
        else:
            current += char
    parts.append(current)
    return [part.strip() for part in parts if part.strip()]


def _plain(name: str) -> str:
    """A name as the index compares it: no bracketed qualifier, no dash variants."""
    return re.sub(r"\s*\(.*?\)", "", name).replace("–", "-").replace("—", "-").strip().lower()


def _named(candidate: str, names: set[str]) -> bool:
    """Whether a class page's name is one the A–Z carries; whole-word either way,
    because the A–Z groups synonyms and a page may name its local variant."""
    if not candidate:
        return True
    word = lambda text: rf"(?<![\w-]){re.escape(text)}(?![\w-])"  # noqa: E731
    return any(
        candidate == name or re.search(word(candidate), name) or re.search(word(name), candidate)
        for name in names
    )


@pytest.mark.parametrize("slug", CLASSES)
def test_every_method_a_class_page_names_is_in_methods_a_to_z(slug):
    """The class page claims every method it names is in the A–Z, which makes the
    index a second copy of the techniques tables; a name added to one and not the
    other fails here.
    """
    known = {
        _plain(name)
        for method in _methods_a_to_z()
        for name in _names(method["name"])
    }
    page = map_book().docs / slug / "index.md"
    missing = [
        name
        for row in _table_rows(page, 4, heading="## Techniques")
        for name in _names(row[0])
        if not _named(_plain(name), known)
    ]
    assert missing == [], f"{slug} names methods the index does not carry: {missing}"


@pytest.mark.parametrize("slug", CLASSES)
def test_every_method_a_class_page_names_links_to_its_entry(slug):
    """Every name in a class page's technique table is a link to its A–Z entry; a
    renamed entry and a stale anchor are the same defect seen from each end.
    """
    page = map_book().docs / slug / "index.md"
    text = page.read_text(encoding="utf-8")
    assert "<!-- table: cards -->\n| technique |" in text, (
        f"{slug}'s technique table is not a stack of records below 60rem"
    )
    anchors = {method["anchor"] for method in _methods_a_to_z()}
    for row in _table_rows(page, 4, heading="## Techniques"):
        links = re.findall(r"\[([^\]]+)\]\(([^)]*)\)", row[0])
        assert links, f"{slug} names a method with no link: {row[0]}"
        # The text outside the links is the separator between them, never a name.
        outside = re.sub(r"\[[^\]]*\]\([^)]*\)", "", row[0])
        assert not re.search(r"[A-Za-z]", outside), (
            f"{slug} has a method name outside a link: {row[0]}"
        )
        known = {f"../techniques/#{anchor}" for anchor in anchors}
        broken = [target for _text, target in links if target not in known]
        assert broken == [], f"{slug} links to methods the A–Z does not carry: {broken}"


def test_every_symptom_is_one_row_in_one_wording_on_both_pages():
    """Symptom text is the key, and a row is the same row only when its cause and
    fix match too; both directions are checked, including an index row a class page
    has never heard of.
    """
    index: dict[str, tuple[str, str, str]] = {}
    for symptom, classes, cause, fix in _table_rows(
        map_book().docs / "symptoms" / "index.md", 4
    ):
        assert symptom not in index, f"the symptom index has two rows for {symptom!r}"
        index[symptom] = (classes, cause, fix)

    for slug in CLASSES:
        page = map_book().docs / slug / "index.md"
        for symptom, cause, fix in _table_rows(page, 3, heading="## What goes wrong"):
            assert symptom in index, f"{slug} names a symptom the index does not: {symptom!r}"
            classes, page_cause, page_fix = index[symptom]
            assert (page_cause, page_fix) == (cause, fix), (
                f"{symptom!r} has two versions, on {slug} and on the symptom index"
            )
            assert f"](../{slug}/)" in classes, (
                f"the symptom index does not send {symptom!r} to {slug}"
            )

    for symptom, (classes, cause, fix) in index.items():
        for slug in re.findall(r"\]\(\.\./([a-z-]+)/\)", classes):
            rows = {
                row[0]: (row[1], row[2])
                for row in _table_rows(
                    map_book().docs / slug / "index.md", 3, heading="## What goes wrong"
                )
            }
            assert rows.get(symptom) == (cause, fix), (
                f"the symptom index cites {slug} for {symptom!r}, and that page does not carry it"
            )


# --- the worked case quotes one model ------------------------------------------


def _ladder(page: Path, columns: int) -> dict[float, list[str]]:
    """A stiffness ladder as a page prints it, keyed by stiffness."""
    rows: dict[float, list[str]] = {}
    for row in _table_rows(page, columns):
        match = re.fullmatch(r"([0-9.]+) MN/m", row[0])
        if match:
            rows[float(match.group(1))] = row[1:]
    return rows


def test_the_worked_cases_ladder_is_section_1_5s_ladder():
    """The worked case quotes §1.5's ladder cell for cell at the export's
    stiffnesses; a page that sweeps other values or prints a different number fails.
    """
    section = _ladder(SECTION_1_5, 5)
    worked = _ladder(map_book().docs / "worked-case" / "index.md", 4)
    assert sorted(worked) == list(STIFFNESS), (
        f"the worked case sweeps {sorted(worked)} MN/m, the export carries {list(STIFFNESS)}"
    )
    for stiffness, cells in worked.items():
        assert cells == section[stiffness][1:], (
            f"{stiffness} MN/m: the worked case says {cells}, §1.5 says {section[stiffness][1:]}"
        )


def test_the_worked_case_names_the_exports_tenth_of_a_degree_stiffness():
    """The ladder's conclusion comes from the export's crossing, not from
    interpolating the printed rows; §1.5's arithmetic is imported, not restated."""
    page = (map_book().docs / "worked-case" / "index.md").read_text(encoding="utf-8")
    number = f"**{round(crossing(), 1)} MN/m**"
    assert number in page, f"the worked case does not name the export's {number}"


# --- the kinds with no caller ---------------------------------------------------


#: Written out rather than derived from `:::used`, so a dropped caller cannot make
#: the test agree with itself; when a chapter fills one, update `worked-case`.
DEAD_ENDS = ["elliptic", "hyperbolic", "parabolic"]


def test_the_worked_case_agrees_with_the_callers_each_kind_actually_has():
    """`:::used` is derived; the worked case's claim about which kinds have no
    caller must agree with it.
    """
    for slug in CLASSES:
        callers = usedin.used_in(slug)
        if slug in DEAD_ENDS:
            assert callers == [], (
                f"a page now names {slug}; the worked case must stop saying none does"
            )
        else:
            assert callers, f"{slug} has lost its callers, or the worked case is now wrong"
    worked = (map_book().docs / "worked-case" / "index.md").read_text(encoding="utf-8")
    missing = [slug for slug in DEAD_ENDS if f"](../{slug}/index.md)" not in worked]
    assert missing == [], f"the worked case does not name the kinds with no caller: {missing}"

    named = len(CLASSES) - len(DEAD_ENDS)
    words = {3: "Three", 4: "Four", 5: "Five", 6: "Six"}
    assert f"names {words[named].lower()} of them" in worked, (
        f"the worked case does not say it names {named} kinds"
    )
    assert f"{words[len(DEAD_ENDS)]} more" in worked, (
        f"the worked case does not say {len(DEAD_ENDS)} kinds have no caller"
    )

def test_the_optimisation_example_is_the_tolerance_problem():
    """The class page's example is the problem §1.5 actually solves."""
    page = (map_book().docs / "optimisation" / "index.md").read_text(encoding="utf-8")
    assert "Choosing a bush stiffness so the corner's camber meets a tolerance." in page
    assert "flat over the travel" not in page


# --- every detail page's program is run, not believed ---------------------------
#
# A printed output is evidence, and evidence nobody runs is a number typed into a
# fence. Skeleton and width rules are in `tests/rules.py`; this needs a process.

DETAIL_HEADING = "## What this page answers"


def _detail_pages():
    for page in sorted(map_book().docs.rglob("*.md")):
        if "assets" in page.parts:
            continue
        text = page.read_text(encoding="utf-8")
        if DETAIL_HEADING in text:
            yield page.relative_to(map_book().docs).as_posix(), text


def test_the_regression_page_states_the_mean_point_fact():
    """The least-squares line passes through (x-bar, y-bar), and the page's own
    program prints both, so the fact is checkable rather than asserted."""
    page = (map_book().docs / "averaging" / "regression" / "index.md").read_text(
        encoding="utf-8"
    )
    assert "passes through" in page
    assert "(\\bar x, \\bar y)" in page
    assert "mean point  (2.0, 3.0)" in page
    assert "line at x-bar 3.0" in page


def test_every_detail_program_prints_what_its_page_shows():
    """Run each python block exactly as printed and compare its standard output
    with the text block beside it; an edit to either fails here."""
    failures = []
    for name, text in _detail_pages():
        code = re.findall(r"```python\n(.*?)```", text, re.S)
        shown = re.findall(r"```text\n(.*?)```", text, re.S)
        if len(code) != len(shown):
            failures.append(f"{name}: {len(code)} programs, {len(shown)} outputs")
            continue
        for index, (source, expected) in enumerate(zip(code, shown)):
            printed = io.StringIO()
            try:
                with contextlib.redirect_stdout(printed):
                    exec(compile(source, f"{name}#{index}", "exec"), {})
            except Exception as error:  # noqa: BLE001 - the page's program is the subject
                failures.append(f"{name}#{index}: {type(error).__name__}: {error}")
                continue
            if printed.getvalue() != expected:
                failures.append(
                    f"{name}#{index}: printed output differs from the page"
                )
    assert failures == [], "\n".join(failures)


# --- reading the class off the equation ----------------------------------------
#
# The page hands the reader a program, so it is executed here, its table rebuilt by
# another route, and its figure held to the guided-investigation rule.

CLASSIFY = "reading-the-class"


def _classify_page() -> str:
    return (map_book().docs / CLASSIFY / "index.md").read_text(encoding="utf-8")


def test_the_program_prints_what_the_page_shows():
    """Run the page's only python block and compare its output with its only
    text block; an edit to either fails here."""
    page = _classify_page()
    code = re.findall(r"```python\n(.*?)```", page, re.S)
    shown = re.findall(r"```text\n(.*?)```", page, re.S)
    assert len(code) == 1, f"the page holds {len(code)} program blocks, not one"
    assert len(shown) == 1, f"the page holds {len(shown)} output blocks, not one"
    printed = io.StringIO()
    with contextlib.redirect_stdout(printed):
        exec(compile(code[0], f"{CLASSIFY}/index.md", "exec"), {})
    assert printed.getvalue() == shown[0], (
        "the page's printed output is not what its program prints"
    )


def test_the_worked_table_is_recomputed_from_the_equations():
    """The page applies the equation to $e^{px+qy}$; this reads the derivative
    terms straight off the expression, and the three rows must agree.
    """
    x, y, t = sp.symbols("x y t")
    u = sp.Function("u")
    D = sp.diff
    worked = {
        "Laplace": (D(u(x, y), x, 2) + D(u(x, y), y, 2), u(x, y), (x, y)),
        "Heat": (D(u(x, t), x, 2) - D(u(x, t), t), u(x, t), (x, t)),
        "Wave": (D(u(x, t), t, 2) - D(u(x, t), x, 2), u(x, t), (x, t)),
    }
    rows = {}
    for line in _classify_page().splitlines():
        if not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        # Six columns: equation, three coefficients, discriminant, class.
        if len(cells) == 6 and cells[0].split(":")[0] in worked:
            rows[cells[0].split(":")[0]] = cells
    assert set(rows) == set(worked), f"the worked table holds {sorted(rows)}, not three rows"
    for name, (pde, unknown, vars) in worked.items():
        A = pde.coeff(D(unknown, vars[0], 2))
        B = pde.coeff(D(unknown, vars[0], vars[1]))
        C = pde.coeff(D(unknown, vars[1], 2))
        delta = sp.simplify(B**2 - 4 * A * C)
        verdict = "hyperbolic" if delta > 0 else "parabolic" if delta == 0 else "elliptic"
        printed = [
            cell.strip("$ ").replace("\u2212", "-") for cell in rows[name][1:4]
        ]
        expected = [str(A), str(B), str(C)]
        assert printed == expected, f"{name}: the page prints {printed}, the equation gives {expected}"
        discriminant = rows[name][4].strip("$ ").replace("\u2212", "-")
        assert discriminant == str(delta), (
            f"{name}: the page prints B² − 4AC = {discriminant}, the equation gives {delta}"
        )
        assert rows[name][5] == verdict, (
            f"{name}: the page says {rows[name][5]}, the sign of the discriminant says {verdict}"
        )


def test_the_sign_table_carries_one_row_per_class():
    """Three signs, three classes, each row linking the page it names."""
    page = _classify_page()
    for sign, slug in (
        ("$\\Delta > 0$", "hyperbolic"),
        ("$\\Delta = 0$", "parabolic"),
        ("$\\Delta < 0$", "elliptic"),
    ):
        rows = [line for line in page.splitlines() if line.startswith("|") and sign in line]
        assert len(rows) == 1, f"the sign {sign} is on {len(rows)} table rows"
        assert f"](../{slug}/index.md)" in rows[0], f"the sign {sign} does not lead to {slug}"


def test_the_figure_on_that_page_is_guided():
    """A reference book has no Learn pages, so this is the only check that the
    page's figure follows Predict → Test → Explain in order around it."""
    page = _classify_page()
    figure = page.find(":::figure discriminant")
    assert figure != -1, f"{CLASSIFY} mounts no figure"
    beats = {beat: page.find(f"**{beat}") for beat in ("Predict", "Test", "Explain")}
    missing = [beat for beat, position in beats.items() if position == -1]
    assert not missing, f"the figure has no {', '.join(missing)} step"
    assert beats["Predict"] < figure < beats["Test"] < beats["Explain"], (
        "the beats are not in order around the figure: "
        f"{beats}, figure at {figure}"
    )



# --- the relativity case, classified ------------------------------------------
#
# The page prints two equations, three coefficients each and the discriminant's sign,
# and these tests rebuild the rows from the equations rather than reading the page back
# to itself.

CHOOSING = "choosing-the-class"


def test_the_two_lapse_conditions_are_classified_by_the_books_own_test():
    """Same physics, two ways of writing one equation, two classes: each lapse
    row is rebuilt from its coefficients and the sign of $B^2-4AC$.

    The elliptic row lands on `parabolic` because an equation with no time
    derivative has no characteristic directions; the page says so in prose.
    """
    x, t = sp.symbols("x t", real=True)
    u = sp.Function("u")
    D = sp.diff
    # Each equation as the page writes it: moved to one side, in (space, time).
    equations = {
        "elliptic": D(u(x, t), x, 2) - u(x, t),
        "hyperbolic": D(u(x, t), t, 2) - D(u(x, t), x, 2),
    }
    page = (map_book().docs / CHOOSING / "index.md").read_text(encoding="utf-8")
    rows = {}
    for line in page.splitlines():
        if not line.startswith("|"):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        # Seven columns: name, equation, three coefficients, discriminant, class.
        if len(cells) == 7 and cells[0] in equations:
            rows[cells[0]] = cells
    assert set(rows) == set(equations), (
        f"the lapse table holds {sorted(rows)}, not {sorted(equations)}"
    )
    for name, pde in equations.items():
        A = pde.coeff(D(u(x, t), x, 2))
        B = pde.coeff(D(u(x, t), x, t))
        C = pde.coeff(D(u(x, t), t, 2))
        delta = sp.simplify(B**2 - 4 * A * C)
        printed = [cell.strip("$ ").replace("\u2212", "-") for cell in rows[name][2:5]]
        assert printed == [str(A), str(B), str(C)], (
            f"{name}: the page prints {printed}, the equation gives {[str(A), str(B), str(C)]}"
        )
        shown = rows[name][5].strip("$ ").replace("\u2212", "-")
        assert shown == str(delta), f"{name}: the page prints B² − 4AC = {shown}, not {delta}"
        verdict = "hyperbolic" if delta > 0 else "parabolic" if delta == 0 else "elliptic"
        assert rows[name][6] == verdict, (
            f"{name}: the page says {rows[name][6]}, the sign of the discriminant says {verdict}"
        )


def test_the_relativity_claim_says_what_it_is_a_reduction_of():
    """The reduction classifies the lapse equation only, and the page has to say
    so: ten metric components and a coupling that can turn two hyperbolic equations
    into neither.
    """
    page = (map_book().docs / CHOOSING / "index.md").read_text(encoding="utf-8")
    section = re.sub(r"\s+", " ", page[page.index("## The same equations, classified") :])
    for claim in (
        "reduction, not a proof",  # the qualifier itself
        "ten independent components",  # what the real system has instead
        "can couple into a system that is not",  # why the reduction stops here
    ):
        assert claim in section, f"the relativity section no longer says {claim!r}"


def test_the_a_to_z_is_a_contents_table_and_a_section_per_class():
    """The A–Z is a contents table jumping to five sections, and inside a section
    each method is a heading with a class link, a step and a price.
    """
    text = (map_book().docs / "techniques" / "index.md").read_text(encoding="utf-8")
    sections = re.findall(r'<a id="([\w-]+)"></a>\n\n## (.+)', text)
    assert [title for _, title in sections] == [
        "Finding a state",
        "Linear systems",
        "Eigenvalues",
        "Moving problems",
        "Averaging",
    ], f"the A–Z's sections are {[title for _, title in sections]}"

    contents = [line for line in text.splitlines() if line.startswith("| [")]
    assert len(contents) == len(sections), (
        f"the contents table has {len(contents)} rows for {len(sections)} sections"
    )
    for (anchor, title), row in zip(sections, contents):
        assert f"[{title}](#{anchor})" in row, f"{title} does not jump to its section"
        assert row.rstrip().endswith("|"), f"the contents row for {title} is malformed"

    methods = _methods_a_to_z()
    assert len(methods) == 77, f"the A–Z has {len(methods)} methods, not 77"
    assert len({method["anchor"] for method in methods}) == 77, "two methods share an anchor"
    for method in methods:
        assert "(../" in method["class"] or "[../" in method["class"], (
            f"{method['name']}: the class line carries no link"
        )
        assert method["step"] and "$" in method["step"], f"{method['name']}: no step"
        assert method["price"], f"{method['name']}: no price"


# --- the book defines its vocabulary where it first uses it ---------------------


TERM_DEFINITIONS = {
    "index": (r"discretised", r"Once a steady problem is discretised"),
    "eigenvalue": (r"krylov", r"\*\*Krylov method\*\* builds"),
    "linear-system": (r"preconditioner", r"\*\*preconditioner\*\* is"),
    "elliptic": (r"smoother", r"\*\*smoother\*\*"),
    "saddle-point": (r"lbb", r"\*\*LBB\*\* stands"),
    "hyperbolic": (r"cfl", r"\*\*CFL condition\*\* \(Courant"),
}


def test_a_term_is_defined_where_the_book_first_uses_it():
    """A table cell has no room for a definition, so each of these words is
    defined where the page first uses it."""
    for slug, (term, definition) in TERM_DEFINITIONS.items():
        relative = "index.md" if slug == "index" else f"{slug}/index.md"
        page = map_book().docs / relative
        text = page.read_text(encoding="utf-8")
        found = re.search(definition, text)
        assert found, f"{slug} does not define {term}"
        first = text.lower().find(term)
        assert first >= found.start(), f"{slug} uses {term} before defining it"


def _newton(f, x0, steps):
    """Newton's iterates on one variable, in exact arithmetic."""
    x = sp.symbols("x")
    d = sp.diff(f, x)
    p = sp.Rational(x0)
    for _ in range(steps):
        p = sp.simplify(p - f.subs(x, p) / d.subs(x, p))
    return p


def _maximiser(expr):
    """Where one-variable expression ``expr`` peaks, in exact arithmetic."""
    x = sp.symbols("x")
    return sp.solve(sp.diff(expr, x), x)[0]


# Each entry: the regex capturing the number the page prints, and the value computed
# from the page's own statement of the problem. A page that rounds wrongly fails.
WORKED_NUMBERS = {
    "optimisation": (
        r"to zero gives\s+\$x=([-\d/]+)\$",
        sp.solve(2 * (sp.Symbol("x") - 3), sp.Symbol("x"))[0],
    ),
    "averaging": (r"1/\\sqrt\{1000\}=([\d.]+)", 1 / sp.sqrt(1000)),
    "eigenvalue": (
        r"eigenvalues \$1\$ and \$([-\d/]+)\$",
        max(sp.Matrix([[2, 1], [1, 2]]).eigenvals()),
    ),
    "linear-system": (
        r"solution \$x=([-\d/]+)\$",
        sp.Matrix([[4, 1], [1, 3]]).solve(sp.Matrix([1, 2]))[0],
    ),
    "root": (r"\$x_2=([\d.]+)\$", _newton(sp.Symbol("x") ** 2 - 2, 1, 2)),
    "saddle-point": (
        r"\\lambda=(\d+)\$",
        sp.Matrix([[1, 1], [1, 0]]).solve(sp.Matrix([2, 1]))[1],
    ),
    "elliptic": (
        r"maximum is \$([-\d/]+)\$",
        (sp.Symbol("x") * (1 - sp.Symbol("x")) / 2).subs(
            sp.Symbol("x"), _maximiser(sp.Symbol("x") * (1 - sp.Symbol("x")) / 2)
        ),
    ),
    "parabolic": (r"\^2/2=([\d.]+)\$", sp.Rational(1, 10) ** 2 / 2),
    "hyperbolic": (r"\\Delta x/a=([\d.]+)\$", sp.Rational(1, 10) / 2),
}


def test_every_class_page_works_one_number():
    """Each class page's one worked number is parsed from the page and compared
    with the value recomputed here from the page's own statement of the problem.
    """
    for slug, (pattern, value) in WORKED_NUMBERS.items():
        page = (map_book().docs / slug / "index.md").read_text(encoding="utf-8")
        assert "**Worked number.**" in page, slug
        match = re.search(pattern, page, re.S)
        assert match, f"{slug}: the printed number no longer matches {pattern}"
        shown = match.group(1)
        printed = sp.sympify(shown)
        if "." in shown:
            places = len(shown.split(".")[1])
            error = abs(printed - sp.N(value, places + 3))
            assert error <= sp.Rational(1, 2) * sp.Rational(1, 10) ** places, (
                slug,
                shown,
                sp.N(value, places + 3),
            )
        else:
            assert sp.simplify(printed - value) == 0, (slug, shown, value)


def test_a_level_11_4_points_at_the_fit_it_does_not_derive():
    """The course uses the least-squares line and links the working one hop away."""
    text = (
        books.repo_root()
        / "books"
        / "a-level-maths"
        / "docs"
        / "Chapter 11"
        / "Section 11.4"
        / "Walkthrough"
        / "index.md"
    ).read_text(encoding="utf-8")
    assert "/numerical-methods/averaging/regression/" in text
    assert r"(\bar x, \bar y)" in text


def test_the_nine_kinds_table_is_marked_for_cards_and_labels_every_cell():
    """Below 60rem a row becomes a card only because of the `<!-- table: cards -->`
    marker above the table; without it the table silently scrolls sideways on a
    phone and no other check notices.
    """
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    marker = home.index("<!-- table: cards -->")
    table = home[marker : marker + 800]
    assert "| Kind |" in table.splitlines()[1], "the marker must sit directly above the table"
    assert table.count("<!-- table: cards -->") == 1


@pytest.mark.parametrize("slug", CLASSES)
def test_a_class_page_prints_its_registry_signature_verbatim(slug):
    """Each class page prints its registry signature verbatim: `:::class` prints the
    same sentence elsewhere, and two wordings would define the class twice.

    Whitespace is normalised because the page wraps its lines and the registry does not.
    """
    book = map_book()
    entry = next(page for page in book.pages if page["path"].startswith(f"{slug}/"))
    text = " ".join((book.docs / slug / "index.md").read_text(encoding="utf-8").split())
    signature = " ".join(str(entry["signature"]).split())
    assert signature in text, (
        f"{slug}'s page does not print its registry signature.\n"
        f"  registry: {signature}\n"
        f"  page:     {text[text.find('You have one of these when') :][:160]}"
    )


def test_a_one_word_edit_on_either_side_is_caught():
    """The check above is only worth having if it fails on the edit it describes."""
    entry = {"signature": "a rule has to hold at a point, and the rule bends with the answer."}
    text = "**You have one of these when** a rule has to hold at a point, and the rule bends with the answer."
    assert " ".join(entry["signature"].split()) in " ".join(text.split())
    edited_page = text.replace("bends", "changes")
    assert " ".join(entry["signature"].split()) not in " ".join(edited_page.split())


def test_the_class_directive_capitalises_the_stored_signature():
    """Stored lowercase because a page prints it after "…when"; capitalised where
    it stands alone."""
    from textbook.hooks import classes

    html = classes.render({"title": "Root finding", "signature": "a rule bends.", "url": "/x/"})
    assert '<p class="classlink__note">A rule bends.</p>' in html


def test_the_linear_system_list_is_one_list_and_the_definition_is_not_in_it():
    """The five situations are one list, with the preconditioner definition after
    it rather than inside it where a scanning reader skips it.
    """
    page = (map_book().docs / "linear-system/index.md").read_text(encoding="utf-8")
    situations = [
        "**Dense and small.**",
        "**Sparse and large.**",
        "**Symmetric positive definite.**",
        "**Symmetric indefinite.**",
        "**Rectangular.**",
    ]
    positions = [page.find(item) for item in situations]
    assert all(position >= 0 for position in positions), "a situation is missing"
    between = page[positions[0] : positions[-1]]
    assert "\n\n" not in between, (
        "something interrupts the five situations; the list is split again"
    )
    assert "**preconditioner**" in page[positions[-1] :], (
        "the preconditioner is still inside the list"
    )


def test_the_three_flags_are_defined_in_prose_not_in_a_table_cell():
    """A flag that changes the method in every class needs a paragraph; the home
    page's table is the summary, not the only place a flag is defined.
    """
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    assert "### The three flags, in words" in home
    for flag in ("**Non-linear.**", "**Stiff.**", "**Geometry not known in advance.**"):
        assert flag in home, f"the home page does not define {flag}"
    prose = home.split("### The three flags, in words", 1)[1]
    assert prose.count("\n\n") >= 6


def test_discretise_is_defined_before_its_first_use_in_reading_order():
    """Reading order is the registry's order, and the first page that uses
    `discretise` is the one that has to define it."""
    book = map_book()
    first = None
    for entry in book.pages:
        text = (book.docs / entry["path"]).read_text(encoding="utf-8")
        if "discretis" in text:
            first = (entry["path"], text)
            break
    assert first, "the book never uses `discretise`"
    path, text = first
    # Normalised: the page is hard-wrapped, and the gloss may straddle a line break.
    flat = " ".join(text.split())
    use = flat.index("discretis")
    gloss = "cut into cells"
    assert gloss in flat, f"{path} uses `discretise` with no gloss"
    assert flat.index(gloss) <= use, f"{path} defines `discretise` after it uses it"



def test_stiff_is_the_flag_and_the_bush_has_a_stiffness():
    """One word, one meaning: `stiff` as a flag, never of a bush or a spring."""
    book = map_book()
    offenders = []
    for path in sorted(book.docs.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        for match in re.finditer(r"[Hh]ow stiff|stiff (bush|spring)", text):
            offenders.append(f"{path.relative_to(book.docs)}: {match.group(0)}")
    assert offenders == [], offenders


def test_the_contents_list_is_derived_from_the_headings():
    """The contents list is built from the rendered `<h2 id=…>` headings, so it
    cannot rot when a section is added; a page with four or fewer gets nothing.
    """
    from textbook.hooks import contents

    five = "".join(f'<h2 id="h{i}">Section {i}</h2>' for i in range(5))
    nav = contents.render(five)
    assert nav.count("<li>") == 5
    for i in range(5):
        assert f'href="#h{i}"' in nav

    four = "".join(f'<h2 id="h{i}">Section {i}</h2>' for i in range(4))
    assert contents.render(four) == ""

    # The list is rendered for the page, not asked for by it; a page whose own index
    # would duplicate it can opt out.
    book = map_book()
    techniques = (book.docs / "techniques/index.md").read_text(encoding="utf-8")
    assert techniques.count("\n## ") >= contents.MINIMUM, (
        "the A–Z is under the threshold, so this test no longer covers the page it was written for"
    )
    built = contents.on_page_content(
        "<p>Intro.</p>" + "".join(f'<h2 id="h{i}">S{i}</h2>' for i in range(contents.MINIMUM)),
        None,
        None,
        None,
    )
    assert 'class="contents"' in built
    assert built.index("Intro") < built.index('class="contents"'), "the list did not follow the intro"


@pytest.mark.parametrize("slug", CLASSES)
def test_a_class_page_offers_a_property_keyed_way_into_its_techniques(slug):
    """A property-keyed table comes before the method-keyed one, so a reader
    holding "sparse and symmetric" can recognise before recalling; every method in
    the second table appears in the first.
    """
    page = (map_book().docs / slug / "index.md").read_text(encoding="utf-8")
    assert "| what your model is | the methods that fit | the price |" in page, slug
    property_at = page.index("| what your model is |")
    method_at = page.index("| technique | what it does |")
    assert property_at < method_at, f"{slug}: the method-keyed table comes first"

    property_rows = page[property_at:method_at]
    end = page.find("\n## ", method_at)
    method_rows = page[method_at : end if end > 0 else len(page)]
    methods = re.findall(r"^\| \[([^\]|]+)\]", method_rows, re.M)
    assert methods, f"{slug} has no method rows"
    offered = property_rows.lower()
    missing = [name for name in methods if name.lower() not in offered]
    assert missing == [], f"{slug}: the property table does not offer {missing}"
    # and no row ranks a method
    assert "best" not in property_rows.lower().replace("best one", ""), slug


@pytest.mark.parametrize("slug", CLASSES)
def test_a_class_page_names_the_class_it_is_most_often_mistaken_for(slug):
    """Classification is learned by discriminating near-misses: each page carries a
    **this, not that** row linking the look-alike it is most often confused with.
    """
    book = map_book()
    page = (book.docs / slug / "index.md").read_text(encoding="utf-8")
    match = re.search(
        r"^\*\*([^*]+), not \[([^\]]+)\]\(\.\./([a-z-]+)/\)\.\*\*", page, re.M
    )
    assert match, f"{slug} has no look-alike row with a link"
    title = next(e["title"] for e in book.pages if e["path"].startswith(f"{slug}/"))
    assert match.group(1).strip().lower() == title.lower(), (slug, match.group(1))
    # The neighbour is a hop, not a word: the link text is the class title.
    classes = {
        e["path"].split("/")[0]: e["title"]
        for e in book.pages
        if e.get("signature")
    }
    assert match.group(3) in classes, f"{slug} links {match.group(3)!r}, which is not a class"
    named = re.sub(r"^(?:a|an)\s+", "", match.group(2).strip().lower())
    assert named == classes[match.group(3)].lower(), (
        f"{slug} links {match.group(3)!r} but calls it {match.group(2)!r}"
    )


def test_every_class_names_a_different_look_alike():
    """Nine pages naming the same neighbour would describe one confusion, not nine."""
    book = map_book()
    named = {}
    for slug in CLASSES:
        page = (book.docs / slug / "index.md").read_text(encoding="utf-8")
        match = re.search(r"^\*\*[^*]+, not \[([^\]]+)\]", page, re.M)
        assert match, slug
        named[slug] = match.group(1).strip().lower()
    assert len(set(named.values())) == len(named), f"two classes name the same neighbour: {named}"


def test_symptoms_asks_the_reader_to_classify_ten_systems():
    """`Systems that live here` lists the systems; asking them back on `symptoms`,
    the moment the reader holds a wrong answer, turns the list into retrieval.
    """
    book = map_book()
    page = (book.docs / "symptoms/index.md").read_text(encoding="utf-8")
    questions = re.findall(
        r'<details markdown="1">\s*<summary>(.*?)</summary>\s*\n+\s*\[([^\]]+)\]\(\.\./([a-z-]+)/\)',
        page,
        re.S,
    )
    assert len(questions) >= 10, f"symptoms asks {len(questions)} questions"

    classes = {e["title"]: e["path"].split("/")[0] for e in book.pages if e.get("signature")}
    for summary, label, slug in questions:
        assert label in classes and classes[label] == slug, f"{summary!r} names {label!r}"

    for summary, _label, slug in questions:
        systems = re.search(
            r"## Systems that live here\n(.*?)\n## ",
            (book.docs / slug / "index.md").read_text(encoding="utf-8"),
            re.S,
        )
        assert systems, f"{slug} has no systems list"
        items = " ".join(systems.group(1).split()).lower()
        # A summary is the start of the list's own sentence: the question is the system,
        # shortened to what fits on a phone, not a second wording of it.
        assert items.count(summary.strip().lower()) >= 1, (
            f"the {slug} page does not list {summary!r}"
        )


def test_the_name_index_lists_every_method_once_and_links_its_entry():
    """The A–Z is entered by name and sorted by family, so the name index is
    generated from its own `h3` anchors: every method once, and every link resolves.
    """
    from textbook.hooks import contents

    book = map_book()
    page = (book.docs / "techniques/index.md").read_text(encoding="utf-8")
    assert ":::method-index" in page

    headings = re.findall(r'<a id="([\w-]+)"></a>\n+### (.+)', page)
    assert len(headings) >= 20, f"only {len(headings)} method headings found"
    html = "".join(f'<h3 id="{anchor}">{title}</h3>' for anchor, title in headings)
    nav = contents.render_methods(html)
    assert nav.count("<a href=") == len(headings), "the index does not list every method"
    for anchor, _title in headings:
        assert nav.count(f'href="#{anchor}"') == 1, f"{anchor} appears {nav.count(f'href=\"{anchor}\"')} times"

    names = [re.sub(r"<[^>]+>", "", n) for n in re.findall(r'href="#[^"]+">([^<]+)</a>', nav)]
    assert names == sorted(names, key=str.lower), "the index is not alphabetical"


def test_the_system_index_is_derived_from_the_class_pages():
    """The system index is built from the class pages' own *Systems that live here*
    lists, so adding a system to a page adds it here with no second edit.
    """
    from textbook import classmap
    from textbook.hooks import systems

    book = map_book()
    config = None  # `entries` reads the registry and the book from the build config
    from textbook import config as cfg

    config = cfg.from_parts(book.docs, book=book, profile=book.default_profile.id)
    rows = systems.entries(config)
    assert rows, "the system index is empty"

    listed = 0
    for slug in CLASSES:
        section = re.search(
            r"## Systems that live here\n(.*?)\n## ",
            (book.docs / slug / "index.md").read_text(encoding="utf-8"),
            re.S,
        )
        assert section, f"{slug} has no systems list"
        listed += len(
            [
                line
                for line in section.group(1).splitlines()
                if line.startswith("- ")
            ]
        )
    assert len(rows) == listed, f"the index has {len(rows)} systems, the pages list {listed}"

    registry = classmap.entries(config)
    urls = {entry["url"] for entry in registry.values()}
    for system, title, href in rows:
        assert href in urls, f"{system!r} links {href!r}, which is not a class"
        assert title in {entry["title"] for entry in registry.values()}

    page = (book.docs / "systems/index.md").read_text(encoding="utf-8")
    assert ":::systems" in page

    # The registry, the home page's ways-in list and the heading's count are one promise.
    registry = (book.root / "map.yaml").read_text(encoding="utf-8")
    assert "path: systems/index.md" in registry, "the index is not in map.yaml"
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    heading = re.search(r"^## (\w+) ways in", home, re.M)
    assert heading, "the home page has no ways-in section"
    section = home[heading.end() : home.index("\n## ", heading.end())]
    bullets = [line for line in section.splitlines() if line.startswith("- ")]
    words = {"Three": 3, "Four": 4, "Five": 5, "Six": 6}
    assert len(bullets) == words[heading.group(1)], (
        f"the heading says {heading.group(1)} and there are {len(bullets)}"
    )
    assert "systems/index.md" in section, "the ways-in list does not offer the index"


#: A system is a name, not a paragraph: 120 leaves room for a name and one clause.
MAX_SYSTEM = 120


def test_a_system_entry_is_a_name_not_a_paragraph_with_markup():
    """The index prints plain text, so a derived entry may carry no markdown the
    class page would have rendered, and must stay a name rather than a paragraph.
    """
    from textbook import config as cfg
    from textbook.hooks import systems

    book = map_book()
    config = cfg.from_parts(book.docs, book=book, profile=book.default_profile.id)
    rows = systems.entries(config)

    marked = [system for system, _title, _href in rows if re.search(r"[*`$\[\]]", system)]
    assert not marked, (
        "a system entry carries a mark the index cannot render:\n  " + "\n  ".join(marked)
    )

    long = [(len(system), system) for system, _title, _href in rows if len(system) > MAX_SYSTEM]
    assert not long, (
        f"a system entry is longer than {MAX_SYSTEM} characters, so the index has a "
        "paragraph in a name's place. Name the system and move the explanation to the "
        "class page's prose:\n  "
        + "\n  ".join(f"{n}: {s[:90]}" for n, s in sorted(long, reverse=True))
    )


@pytest.mark.parametrize("slug", CLASSES)
def test_a_single_method_in_a_property_table_is_a_link(slug):
    """A cell naming one method links it; a cell naming several stays text, because
    four links in one cell is link soup at 390px and the method table below carries
    every hop.
    """
    book = map_book()
    page = (book.docs / slug / "index.md").read_text(encoding="utf-8")
    table = page[page.index("| what your model is |") : page.index("| technique | what it does |")]
    anchors = {
        name.strip().lower(): anchor
        for anchor, name in re.findall(
            r'<a id="([\w-]+)"></a>\n+### (.+)',
            (book.docs / "techniques/index.md").read_text(encoding="utf-8"),
        )
    }

    def normalise(text: str) -> str:
        return re.sub(r"[()]", "", text.lower()).strip()

    def target(name: str) -> str | None:
        want = normalise(name)
        for heading, anchor in anchors.items():
            head = normalise(heading)
            if head == want or head.startswith(want + ","):
                return anchor
        return None

    def names(cell: str) -> list[str]:
        """The methods a cell names, splitting on commas outside brackets."""
        text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", cell)
        parts, depth, current = [], 0, ""
        for char in text:
            if char == "(":
                depth += 1
            elif char == ")":
                depth -= 1
            if char == "," and depth == 0:
                parts.append(current)
                current = ""
            else:
                current += char
        if current.strip():
            parts.append(current)
        return [part.strip() for part in parts if part.strip()]

    problems = []
    for row in [line for line in table.splitlines() if line.startswith("|")][2:]:
        cell = row.strip().strip("|").split("|")[1].strip()
        named = names(cell)
        links = re.findall(r"\[([^\]]+)\]\(../techniques/#([\w-]+)\)", cell)
        if len(named) == 1 and target(named[0]):
            if not (len(links) == 1 and links[0][1] == target(named[0])):
                problems.append(f"{slug}: {named[0]!r} is not linked to its entry")
        elif len(named) > 1 and links:
            problems.append(f"{slug}: {cell[:50]!r} names several and carries a link")
    assert problems == [], problems


def _technique_aliases() -> dict[str, str]:
    """Every name the A–Z gives a method, mapped to its anchor: the heading, plus
    its capitalised bracketed tail, since a symptom fix writes whichever comes to hand.
    """
    page = (map_book().docs / "techniques/index.md").read_text(encoding="utf-8")
    aliases: dict[str, str] = {}
    for anchor, heading in re.findall(r'<a id="([\w-]+)"></a>\n+### (.+)', page):
        # A capitalised parenthetical tail names the method again — `(AMG)`, `(SVD)`;
        # a lowercase one is a qualifier, and "exact" was a false positive.
        parts = [heading.split(",")[0]]
        parts += [p for p in re.findall(r"\(([^)]*)\)", heading)
                  if re.match(r"^[A-Z]", p.strip())]
        for part in parts:
            for piece in part.split(","):
                name = re.sub(r"^(the|a|an)\s+", "", piece.strip().lower())
                if len(name) >= 4:
                    aliases.setdefault(name, anchor)
    return aliases


def test_a_symptom_fix_that_names_a_technique_links_it():
    """A fix cell that names an A–Z entry links it, on the symptom index and on
    every class page, so a reader does not go back to the A–Z to find a name the page
    already wrote.
    """
    aliases = _technique_aliases()
    pages = [map_book().docs / "symptoms" / "index.md"] + [
        map_book().docs / slug / "index.md" for slug in CLASSES
    ]
    problems = []
    rows = 0
    linked = 0
    for path in pages:
        text = path.read_text(encoding="utf-8")
        # Only the symptom tables: a technique table's first column already links.
        if path.parent.name != "symptoms":
            text = text[text.index("## What goes wrong") :]
            following = text.find("\n## ", 3)
            text = text[: following if following > 0 else len(text)]
        for line in text.splitlines():
            if not line.startswith("|"):
                continue
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            if len(cells) not in (3, 4) or set(cells[0]) <= set("-"):
                continue
            if cells[0].lower() == "symptom":
                continue
            rows += 1
            fix = cells[-1]
            if "](../techniques/" in fix:
                linked += 1
                continue
            named = [
                alias
                for alias in aliases
                if re.search(rf"(?<![a-z-]){re.escape(alias)}(?![a-z-])", fix.lower())
            ]
            if named:
                problems.append(f"{path.parent.name}: {fix[:50]!r} names {named[0]!r}")
    assert problems == [], "a fix cell names a technique and links nothing: " + "; ".join(problems[:5])
    assert linked, "no fix cell carries a link"
