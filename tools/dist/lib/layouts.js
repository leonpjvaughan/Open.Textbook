/*
 * The route layouts `preview` knows.
 *
 * They are not interchangeable: the renderer decides the path, and a run that
 * names the wrong one must stop before it measures a 404. `witness` is a page
 * only that renderer writes, so its presence is what makes the assertion
 * concrete rather than stylistic.
 *
 * They live here rather than in the command because they are not routes a check
 * measures: they identify a renderer. Keeping the paths out of `commands/` is
 * what lets `tests/test_mobile.py` say, without exceptions, that no command
 * names a book's page to measure.
 */
export const LAYOUTS = {
    pipeline: {
        label: "the pipeline (`python -m textbook.pipeline`) — the site",
        example: "/gcse-maths/higher/chapter-1/section-1.1/learn/",
        witness: "gcse-maths/higher/chapter-1/section-1.1/learn/index.html",
    },
    mkdocs: {
        label: "the parked MkDocs shell — only if MkDocs is un-parked",
        example: "/gcse-maths/higher/Chapter 1/Section 1.1/Walkthrough/",
        witness: "gcse-maths/higher/Chapter 1/Section 1.1/Walkthrough/index.html",
    },
};
