export const LAYOUTS: Record<string, { label: string; example: string; witness: string }> = {
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
