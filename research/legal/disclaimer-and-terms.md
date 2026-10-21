# The disclaimer and terms: what the wording is based on

**Status:** a drafting note for the author, not legal advice. It records the
precedents and the limits of what a disclaimer can do, so a later change does
not have to rediscover them. A solicitor should review the wording before the
collection is used commercially, and the date on the page should move whenever
the terms change.

Checked on **21 October 2026**.

## What a free textbook needs to say

The books are read by 14–16-year-olds, sometimes without a teacher beside them.
The legal position and the reader's position point the same way:

- say plainly that the book is a **companion**, not a replacement for school,
  a teacher or the exam board's current specification;
- say what is actually checked (the algebra in the banks) and what is not (the
  prose, the explanations and the figures);
- say that no book is perfect, and give a route to report a mistake;
- disclaim warranties and limit liability **only so far as the law allows**;
- keep the statutory carve-outs visible, so the clause is not an unfair term;
- say that no exam board or curriculum body endorses the book;
- keep trade marks and third-party material with their owners;
- say nothing that invents a company, a paid service, an email address or a
  registered office the project does not have.

The tone matters as much as the content. A page headed "Disclaimer" with
capitals and warnings reads as a threat to a reader who has done nothing wrong.
The implemented pages use "Before you use this book" on the book page, a short
"the short version" box on the terms page, and a native expandable note on each
book's home page.

## Precedents reviewed

| Source | What it does that this collection borrowed |
|---|---|
| [Creative Commons BY 4.0, section 5](https://creativecommons.org/licenses/by/4.0/legalcode.txt) | The licence already disclaims warranties and limits liability "to the extent possible". The terms repeat that position instead of pretending the licence gives a warranty it does not. |
| [MIT OpenCourseWare: Privacy and Terms of Use](https://ocw.mit.edu/terms/) | A free educational resource states that material is provided without warranties, and that a link to a third-party site is not an endorsement. |
| [BBC Terms of Use](https://www.bbc.co.uk/usingthebbc/terms-of-use/) | A long document can still open with a plain-English "hello", a contents list and short sections. The legal pages here keep that shape without copying the BBC's wording. |
| [Consumer Rights Act 2015, s.31](https://www.legislation.gov.uk/ukpga/2015/15/section/31) | A trader cannot contract out of the consumer's statutory rights and remedies. |
| [Consumer Rights Act 2015, s.62](https://www.legislation.gov.uk/ukpga/2015/15/section/62) | An unfair term, or an unfair consumer notice, is not binding. A disclaimer has to be transparent and fair, not merely present. |
| [Consumer Rights Act 2015, s.65](https://www.legislation.gov.uk/ukpga/2015/15/section/65) | A trader cannot exclude or restrict liability for death or personal injury resulting from negligence. The carve-out in the terms is not optional. |

OpenStax's terms of use were also checked, but the page would not render its
text without JavaScript, so no claim here rests on it. The general shape — a
warranty disclaimer and a limitation of liability in a free textbook — is
common to the sources above and is not unique to any one of them.

## What the implemented text says

`engine/src/textbook/legal.py` owns the wording. It is generated into:

- a section of every book's **About this book** page;
- a short expandable note at the bottom of every book's home page;
- `site/terms/index.html`, linked from the landing page footer and every About
  page;
- `site/acknowledgements/index.html`, compiled from every
  `books/<id>/sources.yaml`, also linked from the footer and every About page.

The terms say, in this order: what the site is, what it is not, what is checked,
the warranty disclaimer, the liability limitation, the statutory carve-outs,
the exam-board and trade-mark position, the licence, external links, privacy,
changes, governing law and contact.

The acknowledgements separate **sources the book rests on** from **background
and further reading**, and they credit the software that builds and runs the
site. A source added to a book's `sources.yaml` reaches the page without a second
edit.

## What this cannot do

- **It cannot exclude everything.** Liability for death or personal injury
  caused by negligence, for fraud, and the consumer's statutory rights survive
  any disclaimer. The text says so, rather than pretending otherwise.
- **It does not replace insurance.** If the project ever charges for a book, a
  course or a service, the insurance and consumer-law position changes and the
  wording should be reviewed again.
- **It does not make a false claim true.** The site must keep doing what the
  terms say: checking the banks, correcting mistakes, and not claiming an
  endorsement it does not have.
- **It is not a substitute for advice on Irish law.** The Irish books are read
  under Irish consumer law as well. The "nothing removes a protection you have
  under the law of the country where you live" sentence is the cautious bridge,
  not a full analysis.
- **It does not create a contract where none exists.** The terms describe the
  basis on which the free site is offered; they do not turn a free read into a
  paid course.

## Follow-up

- A solicitor should review the terms before any paid edition, institutional
  licence or commercial use.
- If the project ever gains an email address, add it to the contact section; the
  current text deliberately says there is none.
- Move `LAST_UPDATED` in `legal.py` whenever the wording changes, and keep the
  date on the page in step with it.
- Re-check the statutory references if the Consumer Rights Act is amended, and
  re-check the Irish position if the collection is marketed there as a course.
