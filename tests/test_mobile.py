"""The shell must not be wider than the screen it is on.

The reader's report was a settings button they could not reach on Android. Two
causes, both invisible to a desktop browser and to every other check in the gate:
a wide table and a wide display equation widened the *page* instead of scrolling
inside their column, and the masthead — three controls beside a book title — ran
off the right edge at 360px.

`tools check-mobile` measures the real thing in a browser, five widths across one
page of each kind from every book in the build, and runs in the `preview` CI
job. These are the fast, browser-free assertions that the rules it depends on are
still there, so deleting one fails in the main gate too rather than only in the
browser job.
"""

from __future__ import annotations

import pytest

from textbook.book import repo_root

SHELL_CSS = repo_root() / "engine" / "src" / "textbook" / "css" / "shell.css"
PAGE = repo_root() / "engine" / "src" / "textbook" / "templates" / "page.html"


def shell() -> str:
    return SHELL_CSS.read_text(encoding="utf-8")


def test_a_wide_table_scrolls_instead_of_widening_the_page():
    css = shell()
    assert ".table-scroll" in css, (
        "nothing contains a wide table, so it widens the page and pushes the "
        "masthead controls off the right edge"
    )
    block = css[css.index(".table-scroll") :]
    assert "overflow-x: auto" in block[:200], "the table wrapper does not scroll"


def test_a_wide_display_equation_scrolls_too():
    """MathML has no line-breaking, so a wide equation cannot wrap.

    Measured at 360px: the widest equation on a Learn page was 360px inside a
    328px column, which made the document 16px wide.
    """
    css = shell()
    assert 'math[display="block"]' in css, "a wide display equation widens the page"
    block = css[css.index('math[display="block"]') :]
    assert "overflow-x: auto" in block[:200], "the equation is not given a scroll container"


def test_the_masthead_has_phone_width_rules():
    """Two rows at phone width: brand and section, then search and actions.

    The row used to wrap as a flex row, which put the search under the actions and
    measured 146px; a phone reader also passed the book name and the section three
    times before the page's title. The grid names the two rows, so the parts cannot
    drift back into one wrapping line.
    """
    css = shell()
    narrow = css[css.index("@media (max-width: 48rem)") :]
    head = narrow[:900]
    assert "display: grid" in head, "the phone masthead is not a two-row grid"
    assert "grid-template-areas" in head, "the phone rows are not named"
    assert '"brand brand"' in head, "the book title does not take the first row"
    assert '"search actions"' in head, "the search does not share the second row"
    assert "--tb-masthead-height" in head, "the sticky offset does not follow the shorter bar"


def test_the_search_is_a_sibling_of_the_actions_not_a_child():
    """A flex item cannot escape its parent to take a row of its own.

    This is the structural half of the phone-width fix: the CSS above only works
    because the search is not nested inside `.masthead__actions`.
    """
    page = PAGE.read_text(encoding="utf-8")
    actions = page[page.index('class="masthead__actions"') :]
    actions = actions[: actions.index("</div>")]
    assert "search-input" not in actions, (
        "the search is back inside the actions, so it cannot take its own row"
    )
    assert 'class="search tb-search"' in page


def test_the_masthead_names_the_section_a_page_is_in():
    """T1: a reader who lands from a search result could not tell the section.

    The masthead said the book and nothing else, so 1.2's Learn page and 1.5's
    were indistinguishable in the one piece of chrome every page carries. The
    label comes from the page's own front matter, and a page without it gets no
    element rather than an empty one.
    """
    from textbook import pipeline

    assert pipeline.masthead_section(
        {"section": "1.2", "section_title": "One rigid triangle"}
    ) == '<span class="masthead__section">1.2 One rigid triangle</span>'
    assert pipeline.masthead_section({"title": "Chapter 1"}) == ""
    assert pipeline.masthead_section({"section": "", "section_title": ""}) == ""
    # The template puts it inside the brand's link, beside the book's name.
    page = PAGE.read_text(encoding="utf-8")
    brand = page[page.index('class="masthead__brand"') :]
    assert "$masthead_section" in brand[:120]
    assert ".masthead__section" in shell()


# --- a table wider than a phone ------------------------------------------------
#
# `check-mobile` fails when a *page* is wider than the screen, and a table cannot make
# a page wider: `wrap_tables` puts every one in a `.table-scroll`, so the check is
# satisfied by the wrapper that hides the problem. A table whose last column sits past
# the right edge therefore read as a pass — 18 tables in the two reference books, the
# worst 172px over, and §1.5's fifth column at x = 404 in a 390 viewport.


def test_the_check_measures_a_table_against_its_container():
    """The rule, in the source, so deleting it fails in the main gate.

    The browser-free half of the pair below: `check-mobile` must compare a table's
    width with its wrapper's, exempt `table--cards`, and say the overflow in pixels.
    """
    source = (repo_root() / "tools" / "src" / "commands" / "check-mobile.ts").read_text(
        encoding="utf-8"
    )
    assert 'table.classList.contains("table--cards")' in source, (
        "the table pass no longer exempts a card table, which has no columns to lose"
    )
    assert 'table.closest(".table-scroll")' in source, (
        "the table pass no longer measures against its scroll container"
    )
    assert "wider than its container at 390px" in source, (
        "the finding no longer says how far past the container the table is"
    )


def test_a_table_40px_too_wide_fails_the_check(tmp_path):
    """And the behaviour: a planted table, one book's wrapper, and a non-zero exit.

    A browser test, skipped where Playwright is absent — the audit is its own job. The
    page is 358px of container with a 400px table inside it, which is the shape the
    collection had.
    """
    import json
    import os
    import shutil
    import subprocess

    candidates = (
        "playwright",
        "/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright",
    )
    if shutil.which("node") is None:
        pytest.skip("node is not on PATH; the mobile check cannot run")
    if not any(
        subprocess.run(
            ["node", "-e", f"require({json.dumps(c)})"],
            capture_output=True,
            check=False,
            env={**os.environ, "PLAYWRIGHT_PATH": c},
        ).returncode
        == 0
        for c in candidates
    ):
        pytest.skip("playwright is not installed; set PLAYWRIGHT_PATH")

    site = tmp_path / "site"
    site.mkdir()
    (site / "index.html").write_text(
        "<!doctype html><html><body><main>"
        '<div class="table-scroll" style="width:358px;overflow:auto">'
        '<table style="width:400px"><thead><tr><th>a wide heading</th></tr></thead>'
        "<tbody><tr><td>one</td></tr></tbody></table></div>"
        "</main></body></html>",
        encoding="utf-8",
    )
    tools = repo_root() / "tools" / "dist" / "cli.js"
    assert tools.is_file(), "the tools CLI is missing; run `npm run build`"
    result = subprocess.run(
        ["node", str(tools), "check-mobile", str(site)],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert result.returncode != 0, result.stdout[-1500:]
    assert "wider than its container at 390px" in result.stdout, result.stdout[-1500:]


# --- the routes come from the build, not from a book's name ---------------------
#
# `check-mobile` held one book's learn route and one practise route, and `kit` held
# that book's root. A build of any other book measured a request the static server
# answered with something else: 980px of fallback, or a module the browser could not
# import. "Does this book work on a phone" had never been answerable for eleven of
# the twelve books, and the command that would have said so was pointing at the
# wrong one.


def test_no_command_names_a_book_route_to_measure():
    """A book's route in a command is a measurement that can only be about one book.

    The routes come from the build (`tools/src/lib/routes.ts`), and a command that
    names one has stopped measuring the book it was given. The renderer's layout
    witnesses are the one exception, and they live in `lib/layouts.ts` rather than in
    a command so that this test needs no exemption at all.
    """
    offenders = []
    commands = repo_root() / "tools" / "src" / "commands"
    for path in sorted(commands.glob("*.ts")):
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if '"/gcse-maths/' in line:
                offenders.append(f"{path.name}:{number}: {line.strip()}")
    assert not offenders, (
        "a command names one book's page to measure, so every other book's build "
        "measures the miss instead of the book:\n  " + "\n  ".join(offenders)
    )


def test_the_measuring_commands_derive_their_routes_from_the_build():
    """The other half, also browser-free: the calls that read the build are there.

    Deleting the discovery and going back to a constant would leave the test above
    passing while the defect returned, so the wiring is asserted too.
    """
    commands = repo_root() / "tools" / "src" / "commands"
    mobile = (commands / "check-mobile.ts").read_text(encoding="utf-8")
    assert "sampleRoutes(" in mobile, "check-mobile no longer samples the build's pages"
    assert "routeFile(" in mobile, "check-mobile does not check that --route exists"
    assert 'help: "measure this page instead' in mobile, "--route is not in the surface"
    kit = (commands / "kit.ts").read_text(encoding="utf-8")
    assert "figurePage(" in kit, "kit no longer finds a page that mounts a figure"
    assert "figureAssets(" in kit, "kit no longer derives the kit's path from the page"
    routes = (repo_root() / "tools" / "src" / "lib" / "routes.ts").read_text(
        encoding="utf-8"
    )
    for name in ("pageRoutes", "bookRoot", "sampleRoutes", "figureAssets", "figurePage"):
        assert f"export function {name}" in routes, f"{name} is gone from lib/routes.ts"


def test_the_offline_check_samples_a_page_that_mounts_a_figure(tmp_path):
    """The build's first learn page can hold no figure, and then there is no loader to cache.

    `main` failed its first release job on exactly that: `offline site` sampled
    `/a-level-maths/chapter-1/section-1.1/learn/`, which mounts no figure, and reported
    "the figure loader did not reach the runtime cache" on a collection where nothing was
    wrong. The default is now the first learn page that mounts one.
    """
    import json
    import shutil
    import subprocess

    node = shutil.which("node")
    if node is None:
        pytest.skip("node is not on PATH; the route discovery cannot run")
    routes = repo_root() / "tools" / "dist" / "lib" / "routes.js"
    assert routes.is_file(), "the tools are not built; run `npm run build`"

    site = tmp_path / "site"
    for book in ("a-level-maths", "gcse-maths/higher"):
        figures = site / book / "assets/figures"
        figures.mkdir(parents=True)
        for name in ("figures.js", "kit.js"):
            (figures / name).write_text("", encoding="utf-8")
    bare = site / "a-level-maths/chapter-1/section-1.1/learn"
    bare.mkdir(parents=True)
    (bare / "index.html").write_text("<!doctype html><p>no figure here</p>", encoding="utf-8")
    mounted = site / "gcse-maths/higher/chapter-1/section-1.1/learn"
    mounted.mkdir(parents=True)
    (mounted / "index.html").write_text(
        '<!doctype html><script type="module" src="../../../assets/figures/figures.js">'
        '<maths-figure data-figure="x"></maths-figure>',
        encoding="utf-8",
    )

    script = (
        f"import {{ firstRoute, firstFigureRoute }} from {json.dumps(str(routes))};\n"
        f"console.log(firstRoute({json.dumps(str(site))}, 'learn'));\n"
        f"console.log(firstFigureRoute({json.dumps(str(site))}));\n"
    )
    done = subprocess.run(
        [node, "--input-type=module", "-e", script],
        capture_output=True,
        text=True,
        check=False,
        cwd=repo_root(),
    )
    assert done.returncode == 0, done.stderr
    first_learn, first_figure = done.stdout.strip().splitlines()
    assert first_learn == "/a-level-maths/chapter-1/section-1.1/learn/"
    assert first_figure == "/gcse-maths/higher/chapter-1/section-1.1/learn/", (
        "the offline check samples a page with no figure, so there is no loader to find "
        "in the runtime cache"
    )


# --- the booklet button and the paragraph under it ------------------------------
#
# `.bk-fab` is `position: fixed`, 108x39 at 390px, 1.1rem off the bottom right. The
# content column kept 4rem below the pager, which is not enough: the last paragraph of
# a page ended underneath the button. The reserve is the button's own height plus a
# rem of clearance, on top of the reading room the column had.


def test_the_content_column_reserves_the_floating_button():
    from textbook.book import repo_root as root

    css = (root() / "engine" / "src" / "textbook" / "css" / "shell.css").read_text(
        encoding="utf-8"
    )
    block = css[css.index(".content {") :]
    block = block[: block.index("}")]
    match = __import__("re").search(r"padding:\s*[^;]*?\b([\d.]+)rem\s*;", block)
    assert match, "the content column's padding is no longer a single shorthand"
    reserve = float(match.group(1)) * 16
    # 39px tall, 1.1rem off the bottom, plus the 1rem gap the handoff asks for.
    needed = 39 + 1.1 * 16 + 16
    assert reserve >= needed, (
        f"the content column reserves {reserve:.0f}px at the bottom; the floating "
        f"booklet button needs {needed:.0f}px clear, so the last paragraph sits under it"
    )
