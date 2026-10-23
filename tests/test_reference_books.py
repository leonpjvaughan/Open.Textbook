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

import re
from pathlib import Path

import pytest

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
        if len(cells) == 3 and not set(cells[0]) <= set("-: ") and cells[0] != "method":
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
    """The two indexes come after the classes, in the order the tree reaches them.

    The order is the argument: a reader walking the five questions meets the boxes
    in this sequence, and a registry sorted some other way would put the symptom
    index between two classes.
    """
    slug_of = lambda path: path.split("/")[0]  # noqa: E731 - a one-line helper
    assert [slug_of(e["path"]) for e in map_book().pages[:9]] == CLASSES
    assert [slug_of(e["path"]) for e in map_book().pages[9:]] == [
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
        for row in _table_rows(map_book().docs / "techniques" / "index.md", 3)
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


#: The five kinds no section in the collection carries a `:::class` for, so their
#: pages print the "no page names this class yet" sentence. Written out rather than
#: derived from `:::used`: a test that reads its expectation from the hook agrees with
#: itself when a callback is dropped. When a chapter fills one of these, this fails and
#: says to update `worked-case`, which names the five and would otherwise be wrong.
DEAD_ENDS = ["averaging", "elliptic", "hyperbolic"]


def test_the_worked_case_agrees_with_the_callers_each_kind_actually_has():
    """`:::used` is derived; the worked case's claim about it has to be too.

    The five questions on that page are five kinds, and two of them — the stiffness
    sweep and the bounce — are named by no section in the collection. The page now
    says so, because a reader who follows the link from it to a class page used to
    arrive at "no page names this class yet". This is the check that the admission and
    the derived list are about the same five.
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
