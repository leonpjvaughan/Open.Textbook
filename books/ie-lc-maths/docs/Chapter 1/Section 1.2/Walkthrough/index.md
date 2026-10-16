---
title: 1.2 Irrational numbers and surds — Learn
chapter: 1
chapter_title: Number systems and arithmetic
section: '1.2'
section_title: Irrational numbers and surds
tier: O
refs:
- '3.1'
kind: walkthrough
---

# 1.2 Irrational numbers and surds — Learn

**Prerequisites:** Section 1.1 — the number systems; square numbers; Pythagoras'
theorem from the geometry course.

**Objectives:** recognise an irrational number; simplify a surd; add and multiply
surds; rationalise a denominator.

By the end of this section you can work exactly with numbers that are not
fractions, and write an answer with no surd on the bottom of a fraction.

## Numbers that are not fractions

In Section 1.1 you met the rational numbers: every number that can be written as
one integer over another. A rational number has a decimal that stops or repeats.
Every other real number is **irrational**, and its decimal never stops and never
repeats.

The most famous one is $\sqrt{2} = 1.41421\dots$. The dots hide digits that go on
for ever with no pattern.

**Why $\sqrt{2}$ is not a fraction.** Suppose it were. Then $\sqrt{2} =
\dfrac{a}{b}$ for whole numbers $a$ and $b$, with the fraction already in its
lowest terms. Squaring both sides gives

$$2 = \frac{a^2}{b^2} \qquad a^2 = 2b^2$$

So $a^2$ is even, which makes $a$ even. Write $a = 2k$. Substituting gives
$4k^2 = 2b^2$, so $b^2 = 2k^2$ and $b$ is even too. But then $a$ and $b$ share
the factor $2$, and the fraction was meant to be in lowest terms. The assumption
fails, so $\sqrt{2}$ cannot be written as a fraction.

## Surds

A **surd** is a square root that does not simplify to a whole number or a
fraction. $\sqrt{2}$, $\sqrt{3}$ and $\sqrt{50}$ are surds. $\sqrt{9}$ is not,
because it equals $3$.

A surd is an exact number. $\sqrt{2}$ is not approximately $1.414$; it is exactly
$\sqrt{2}$, and $1.414$ is a rounded version of it. Keep the surd unless a
question asks for a decimal.

The key rule is that a square root splits across a **product**:

$$\sqrt{ab} = \sqrt{a}\,\sqrt{b}$$

**Example 1.** Simplify $\sqrt{50}$.

$$50 = 25 \times 2 \qquad \sqrt{50} = \sqrt{25}\,\sqrt{2} = 5\sqrt{2}$$

Look for the largest square factor. Here it is $25$.

## Adding surds

You can add surds only when they are **like** surds: the same number under the
root. Simplify each surd first, then collect the like terms.

**Example 2.** Simplify $\sqrt{18} + \sqrt{8}$.

$$\sqrt{18} = 3\sqrt{2} \qquad \sqrt{8} = 2\sqrt{2} \qquad 3\sqrt{2} + 2\sqrt{2} = 5\sqrt{2}$$

It works like collecting $3x + 2x = 5x$, with $\sqrt{2}$ playing the part of $x$.

## Rationalising a denominator

A **rationalised** answer has no surd on the bottom of a fraction. Multiply the
top and bottom by the surd on the bottom.

**Example 3.** Write $\dfrac{6}{\sqrt{3}}$ with a whole-number denominator.

$$\frac{6}{\sqrt{3}} \times \frac{\sqrt{3}}{\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}$$

Multiplying by $\sqrt{3}$ turns the bottom into $\sqrt{3} \times \sqrt{3} = 3$.

When the bottom is a sum such as $\sqrt{5} - 2$, multiply by its **conjugate**
$\sqrt{5} + 2$. The surds cancel by the difference of two squares.

**Example 4.** Write $\dfrac{1}{\sqrt{5} - 2}$ in the form $a + b\sqrt{5}$.

$$\frac{1}{\sqrt{5} - 2} \times \frac{\sqrt{5} + 2}{\sqrt{5} + 2} = \frac{\sqrt{5} + 2}{5 - 4} = \sqrt{5} + 2$$

The bottom became $(\sqrt{5})^2 - 2^2 = 1$, so the fraction simplified to a whole
expression.

> **Watch out.** The square root splits across a product, not across a sum.
> $\sqrt{ab} = \sqrt{a}\sqrt{b}$ is true, but $\sqrt{a + b} = \sqrt{a} + \sqrt{b}$
> is false. For example, $\sqrt{9 + 16} = \sqrt{25} = 5$, while
> $\sqrt{9} + \sqrt{16} = 3 + 4 = 7$.

## Progress check

Back to the chapter problem. The room measures $4.35$ m by $3.28$ m, and a
diagonal brace runs from one corner to the opposite corner.

By Pythagoras' theorem, the brace has length

$$d = \sqrt{4.35^2 + 3.28^2} = \sqrt{29.6809}$$

Explain why this length is irrational. Then write it to 2 decimal places.

The exact length stays as a surd. A measured length on a building site is a
rounded value of it, and Section 1.7 shows what rounding too early does to a
quote.

## You should now be able to

- explain what an irrational number is, and give $\sqrt{2}$ as an example;
- say why a surd is exact, and keep it instead of a rounded decimal;
- simplify a surd by finding its largest square factor;
- add and subtract like surds;
- rationalise a denominator, including one that needs a conjugate.
