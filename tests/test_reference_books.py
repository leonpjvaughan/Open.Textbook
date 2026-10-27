"""The map of numerical methods: a reference work whose nav comes from a registry.

The proof book is the collection's first reference work, and it is a book because
that is how the collection publishes, navigates and themes a body of pages. This is
the second, and it adds one thing the first did not need: **a sidebar without a
syllabus**. The proof book's registry is read by `:::prove`; the map's is read by
the nav and nothing else, so a page listed there is a page a reader can reach.

These tests exist because a registry is a second place a page can be forgotten. A
page that exists and is not listed is invisible; a page that is listed and does not
exist is a dead link; and a page that is authored but untitled is a browser tab that
says "Untitled". The scaffold cannot catch any of the three: it generates nothing
for this book and, by design, never overwrites an authored page.
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

# The two pages' numbers are one model's, and §1.5's test already knows how to read that
# model. Re-importing the export's conventions here would be a second copy of them, and
# the two copies would drift — which is the defect these tests exist to catch.
from test_maths_applied_ladder import SECTION as SECTION_1_5
from test_maths_applied_ladder import STIFFNESS, crossing

MAP = "numerical-methods"

#: The nine classes, in the order the tree reaches them. Written here rather than
#: read from the registry, because a test that derives its expectation from the
#: thing it tests asserts nothing: a class silently dropped from `map.yaml` would
#: drop out of this list too, and both would agree.
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
    """Both directions, because each is a different defect.

    A listed page that is missing is a dead link in the sidebar. A page that exists
    but is unlisted is a page with no way in, and it is the one that happens by
    accident: the page gets written and the registry is forgotten.

    The About page is the one exception: the scaffold generates it, so it is a page
    with no entry and no need of one. Anything *else* that is not an `index.md` is a
    defect rather than an exception — a page at `docs/notes.md` would be published at
    a URL the navigation does not know about.
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
    """A reference work is entered from its home page, not only from its sidebar.

    The home page carries the same tree as the figure, in plain Markdown, so that a
    reader with scripting off still has the whole map. That makes it a second place
    the list of classes can drift, and this is the check that keeps it honest.
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
    """The two numbers the home page prints, measured from the pages themselves.

    76 methods is the number of rows in the five tables under *Methods, A to Z*, because
    that page is the book's own claim about how many methods it names. 64 systems is the
    number of entries in the nine class pages' *Systems that live here* lists, because
    those are the systems the reduction is claimed to cover. Both are counted here rather
    than typed, so adding a method or a system fails the home page until it says the new
    number — a count in the argument that nobody recomputes is just a number.
    """
    book = map_book()
    methods = 0
    for line in (book.docs / "techniques" / "index.md").read_text(encoding="utf-8").splitlines():
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) == 4 and not set(cells[0]) <= set("-: ") and cells[0] != "method":
            methods += 1
    systems = 0
    for slug in CLASSES:
        page = (book.docs / slug / "index.md").read_text(encoding="utf-8")
        start = page.index("## Systems that live here")
        block = page[start : page.index("## What goes wrong", start)]
        systems += len(re.findall(r"^- \S", block, re.M))
    return methods, systems


def test_the_nine_kinds_table_names_and_links_every_class():
    """The reduction is the home page's whole argument, so it has to be complete.

    One table row per kind, each linking its page, is the book's claim that nine of them
    cover the field. A class missing from the table is a kind the reader cannot reach
    from the argument; a row that does not link is a name with nowhere to go. The count
    of rows is asserted too, so a tenth class cannot be added to the registry without
    the table growing a row.
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
    # Every row carries the kind's model, not only its name. The table's claim is
    # that a reader can recognise the kind from the model in front of them, and a
    # row with no equation asks them to take the recognition column on trust.
    cells = [[cell.strip() for cell in row.strip().strip("|").split("|")] for row in rows]
    assert all(len(row) == 4 for row in cells), (
        f"the nine-kinds table is not four columns: {[len(row) for row in cells]}"
    )
    missing = [row[0] for row in cells if "$" not in row[2]]
    assert missing == [], f"these kinds do not show their model: {missing}"


def test_every_method_states_its_step_in_symbols():
    """A name and a price are not enough to recognise a method you have met.

    The A–Z is the reverse lookup, and every row now carries the update the method
    repeats, or the equation it solves. A family is allowed to show its
    representative member, but it is not allowed to show nothing: a row that names
    a method and never says what it does is a glossary entry, not a technique.
    """
    rows = _table_rows(map_book().docs / "techniques" / "index.md", 4)
    assert len(rows) == 76, f"the A–Z has {len(rows)} method rows, not 76"
    missing = [row[0] for row in rows if "$" not in row[2]]
    assert missing == [], f"these methods do not state their step: {missing}"


def test_the_two_indexes_link_every_class_they_name():
    """A hop in a lookup has to be clickable, or it is a word and not a hop.

    `symptoms/` goes symptom → kind and `techniques/` goes method → kind, and both
    name the kind in a table cell. The home page offers them as two of the three
    ways in, so a bare class name here sends the reader back to the index to find
    the page the row was written to name — which is the trip the row exists to
    save. The nine-kinds table already links every kind, and this holds the pair to
    the same standard.

    Every link whose text is a class title is checked too, because a renamed class
    and a stale href are two halves of one defect and only one of them is a link
    that looks correct.
    """
    book = map_book()
    slug_of = {
        entry["title"]: entry["path"].split("/")[0]
        for entry in book.pages
        if entry.get("signature")
    }
    link = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
    unlinked, misdirected = [], []
    for index in ("symptoms", "techniques"):
        text = (book.docs / index / "index.md").read_text(encoding="utf-8")
        for line in text.splitlines():
            if not line.startswith("|"):
                continue
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
    """The page opens with an arithmetic claim: 76 methods, 64 systems, nine kinds.

    Each number is measured from the book, so the argument cannot quietly become false
    when a method is added or a system is dropped. This is the same rule as §1.5's
    stiffness ladder in `Maths Applied`: the page prints the export's number, and a test
    recomputes it.
    """
    methods, systems = _counts()
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    opening = home[: home.index("## The nine kinds")]
    assert f"**{methods}**" in opening, f"the page does not say it names {methods} methods"
    assert f"**{systems}**" in opening, f"the page does not say {systems} systems live here"
    assert f"**{len(CLASSES)}**" in opening, "the page does not say how many kinds there are"


def test_the_classes_come_first_in_tree_order():
    """The pages that are not classes come after them, in the order the tree reaches them.

    The order is the argument: a reader walking the five questions meets the boxes
    in this sequence, and a registry sorted some other way would put the symptom
    index between two classes. The two pages of argument — how to read a class off
    an equation, and how to change which one you are in — sit before the two
    indexes, because both are answers a reader reaches while still holding a model.
    """
    slug_of = lambda path: path.split("/")[0]  # noqa: E731 - a one-line helper
    assert [slug_of(e["path"]) for e in map_book().pages[:9]] == CLASSES
    assert [slug_of(e["path"]) for e in map_book().pages[9:]] == [
        "reading-the-class",
        "choosing-the-class",
        "worked-case",
        "techniques",
        "symptoms",
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
    """Several reference works, one proof registry.

    The `:::prove` directive resolves against the book that declares `proofs:`. Two
    such books would make it ambiguous, and picking whichever sorted first is the
    kind of silent break this collection spends tests on.
    """
    holders = [book.id for book in books.reference_books() if book.proofs]
    assert holders == ["proofs"], holders


@pytest.mark.parametrize("slug", CLASSES)
def test_each_class_page_names_itself_and_its_neighbours(slug):
    """A page is entered cold, from search or from a wrong answer.

    So it starts by saying what it is, in the reader's words, and it ends by naming
    the pages that neighbour it. The second matters more than it looks: the whole
    premise is that the class you chose may be the wrong one, and the reader has to
    be able to leave for the neighbour without going back to the map.
    """
    page = (map_book().docs / slug / "index.md").read_text(encoding="utf-8")
    assert "You have one of these when" in page, f"{slug} does not open by naming itself"
    assert "## Read next" in page, f"{slug} has no neighbours"
    assert "](../symptoms/index.md)" in page, f"{slug} cannot reach the symptom index"


#: The order a class page is read in. Fixed, because eight pages that each invent
#: their own order stop being a map and become eight essays.
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


def _table_rows(page: Path, columns: int, heading: str | None = None) -> list[list[str]]:
    """The rows of the Markdown tables on a page, as cells.

    A table is found by its width, because the page's other tables are a different
    width and the header row is the only row that names the columns. `heading` limits
    the search to one section, which is how a class page's *What goes wrong* table is
    told apart from any other three-column table that arrives later.
    """
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
    """The method names a cell carries: its commas, minus the ones inside brackets.

    ``Control variates, antithetic pairs`` is two methods, and ``Preconditioners
    (ILU, AMG, Jacobi)`` is one whose brackets happen to contain commas. Splitting on
    every comma would turn the second into three names the A–Z is not expected to have.
    """
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
    """Whether a class page's name is one the A–Z carries.

    Not equality: the A–Z groups synonyms in one row, and a class page says what the
    local variant is — ``GMRES with a block preconditioner`` is the ``GMRES`` row. A
    whole-word match either way is the loosest rule that still fails when a name is
    absent, which is the property this test is for.
    """
    if not candidate:
        return True
    word = lambda text: rf"(?<![\w-]){re.escape(text)}(?![\w-])"  # noqa: E731
    return any(
        candidate == name or re.search(word(candidate), name) or re.search(word(name), candidate)
        for name in names
    )


@pytest.mark.parametrize("slug", CLASSES)
def test_every_method_a_class_page_names_is_in_methods_a_to_z(slug):
    """The class page's claim: "Every method named here is in Methods, A to Z".

    That sentence makes the A–Z the second copy of every techniques table, which is
    exactly the kind of copy that rots. The asymmetry is the point: the class pages
    are the authority on what applies to a class, and the index must carry every name
    they use with its price. A method added to a class page and not to the index fails
    here, before a reader follows the link and finds nothing.
    """
    known = {
        _plain(name)
        for row in _table_rows(map_book().docs / "techniques" / "index.md", 4)
        for name in _names(row[0])
    }
    page = map_book().docs / slug / "index.md"
    missing = [
        name
        for row in _table_rows(page, 4, heading="## Techniques")
        for name in _names(row[0])
        if not _named(_plain(name), known)
    ]
    assert missing == [], f"{slug} names methods the index does not carry: {missing}"


def test_every_symptom_is_one_row_in_one_wording_on_both_pages():
    """A wrong answer is looked up by observation, and the class page is where the fix is.

    The two pages had drifted into two hand-kept lists: ``the smallest eigenvalue is
    wrong`` against ``comes out wrong``, and a cause stated twice with a different fix.
    So the symptom text is the key, and a row is the same row only when the cause and
    the fix match too. Both directions are checked — an index row whose class page has
    never heard of it is the same defect seen from the other side, and it is the one
    that arrives when somebody adds a row to the index alone.
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
    """The page quoted a ladder from §1.5, and its cells were a different model's.

    §1.5's table is the vendored export's, and `test_maths_applied_ladder.py` recomputes
    it. This compares the two pages cell for cell at the stiffnesses the export carries,
    so a page that sweeps 2 and 20 MN/m, or prints 1.053° where the export says 0.91°,
    fails here rather than in a reader's hands. The difference column keeps §1.5's sign:
    the bushed camber is further from zero than the rigid one, so the difference is
    negative, and a magnitude with a positive sign is a second convention for one number.
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
    """The ladder's conclusion, recomputed: 1.8 MN/m, not the front view's 2.

    §1.5's printed ladder rounds, so the crossing has to come from the export rather
    than from the two rows either side of a tenth of a degree — that interpolation
    gives 1.9. ``crossing`` is §1.5's own test's arithmetic, imported rather than
    restated, so the two books cannot disagree about which number the model produces.
    """
    page = (map_book().docs / "worked-case" / "index.md").read_text(encoding="utf-8")
    number = f"**{round(crossing(), 1)} MN/m**"
    assert number in page, f"the worked case does not name the export's {number}"


# --- the kinds with no caller ---------------------------------------------------


#: The four kinds no section in the collection carries a `:::class` for, so their
#: pages print the "no page names this class yet" sentence. Written out rather than
#: derived from `:::used`: a test that reads its expectation from the hook agrees with
#: itself when a callback is dropped. When a chapter fills one of these, this fails and
#: says to update `worked-case`, which names the four and would otherwise be wrong.
DEAD_ENDS = ["averaging", "elliptic", "hyperbolic", "parabolic"]


def test_the_worked_case_agrees_with_the_callers_each_kind_actually_has():
    """`:::used` is derived; the worked case's claim about it has to be too.

    The worked case names the four kinds no section carries a `:::class` for:
    averaging, elliptic, hyperbolic and parabolic. It also names the five the chapter
    does use. This is the check that the admission and the derived list are about the
    same kinds, so a reader who follows a link does not arrive at "no page names this
    class yet".
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


# --- reading the class off the equation ----------------------------------------
#
# One page in this map hands the reader a program, which is a claim of a kind the book
# has no machinery for: a printed output is evidence, and evidence nobody runs is a
# number typed into a fence. So the program is executed here, the worked table is
# recomputed by a route the page does not use, the sign table is held to three rows,
# and the figure the page mounts is held to the guided-investigation rule the
# collection runs on.

CLASSIFY = "reading-the-class"


def _classify_page() -> str:
    return (map_book().docs / CLASSIFY / "index.md").read_text(encoding="utf-8")


def test_the_program_prints_what_the_page_shows():
    """Both blocks come from the page; only one of them is executed.

    The claim is narrow and checkable: run the python block exactly as printed and
    its standard output is the text block beside it. A reader who runs the program
    gets what the page said, and an edit to either block fails here rather than in
    front of a reader learning the rule.
    """
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
    """The table teaches a rule, so its rows are rebuilt rather than believed.

    The page reaches its coefficients by applying the equation to $e^{px+qy}$; this
    reaches them by reading the derivative terms straight off the expression. Two
    routes to the same three rows, and the table has to agree with the second — a row
    out by a sign teaches a reader a rule that turns elliptic problems hyperbolic.
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
        # Six columns: equation, the three coefficients, the discriminant, the class.
        # The coefficients had cell padding nowhere, so they were once merged into a
        # single "$1$, $0$, $1$" cell; the design system now pads a cell and the table
        # sets each one in its own column.
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
    """Three signs, three classes, each row leading to the page it names.

    The table is the book's rule for the three field kinds. A sign with no row, or a
    row that does not link, leaves a reader with a class they cannot reach from the
    rule that was supposed to decide between them.
    """
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
    """Predict, test, explain — the collection's rule for a tool, on a reference page.

    This book has no Learn pages, so no other test asks it of this book. But the page
    mounts controls the reader moves, and a control with no prediction and no question
    after it is a sandbox: the beats are what make moving it a lesson rather than a
    toy. The prediction comes before the figure and the explanation after it, because
    a prediction written after the answer is not one.
    """
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



# --- the relativity case, classified -------------------------------------------
#
# `choosing-the-class` used to assert that the Einstein equations become a different
# class when the coordinate conditions change, and left the reader with the claim and
# no arithmetic. It now prints two equations, three coefficients each and the sign of
# the discriminant, so the claim is checkable — and these tests check it, the same way
# `reading-the-class`'s table is checked, by rebuilding the rows from the equations
# rather than by reading the page back to itself.

CHOOSING = "choosing-the-class"


def test_the_two_lapse_conditions_are_classified_by_the_books_own_test():
    """The lapse rows, recomputed: one parabola, one hyperbola, one sign between them.

    The page's claim is *same physics, one equation written two ways, two classes*.
    The reduction it uses is one equation in one unknown, and each row is read off by
    the rule on `reading-the-class` — three coefficients, and the sign of $B^2-4AC$.
    A row out by a sign would make the page's whole argument false while still
    looking like arithmetic, which is why the coefficients are asserted too.

    The elliptic row lands on `parabolic`, and that is the point rather than a slip:
    the test counts characteristic directions in the two variables it is handed, and
    an equation with no time derivative has none. The page says so in the prose. This
    test holds the arithmetic to what the page prints; the page holds the reader to
    what the arithmetic means.
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
        # Seven columns: name, equation, the three coefficients, the discriminant,
        # the class the sign names.
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
    """One equation is not the Einstein system, and the page has to say so.

    The reduction classifies the lapse equation. Ten metric components, four
    equations, and a coupling that can turn two hyperbolic equations into a system
    that is neither: the page states all of that, because a map whose hardest case is
    argued honestly is worth more than one that claims a four-equation system falls
    out of a two-variable test. This checks the qualifier survives an edit.
    """
    page = (map_book().docs / CHOOSING / "index.md").read_text(encoding="utf-8")
    section = re.sub(r"\s+", " ", page[page.index("## The same equations, classified") :])
    for claim in (
        "reduction, not a proof",  # the qualifier itself
        "ten independent components",  # what the real system has instead
        "can couple into a system that is not",  # why the reduction stops here
    ):
        assert claim in section, f"the relativity section no longer says {claim!r}"


def test_the_method_tables_name_each_field_on_a_phone():
    """A card per method only works if each field still says what it is.

    At 390px the A–Z's four columns became clipped, so each row is a card below
    44rem. The first version of that dropped the column names with the header row, and
    a price like "A bracket. Certain, and slow" then said nothing about what it was a
    price for — the header is the label, and on a card it belongs on the field. This
    pins the labels to the stylesheet, because the layout has no other record of them:
    a screenshot proves it once, and a test proves it stays.
    """
    stylesheet = (
        books.repo_root()
        / "books/numerical-methods/docs/assets/stylesheets/book-local.css"
    ).read_text(encoding="utf-8")
    card = stylesheet[stylesheet.index("@media (max-width: 43.99rem)") :]
    assert ".method-index table" in card, "the card layout is scoped to the A–Z"
    assert "display: none" in card.split(".method-index thead", 1)[1][:120], (
        "the header row must be hidden, because the labels replace it"
    )
    labels = re.findall(r'content: "([^"]+)"', card)
    assert labels == [
        "Class",
        "The step, in symbols",
        "What it needs, and what it costs",
    ], f"the card's field labels are {labels}"
    assert "td:nth-child(1)::before" in card and "content: none" in card, (
        "the method's own name is the card heading, so it carries no label"
    )
