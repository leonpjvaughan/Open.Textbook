---
title: 9.4 Infinite geometric series — Learn
chapter: 9
chapter_title: Sequences and series
section: '9.4'
section_title: Infinite geometric series
tier: H
refs:
- '4.1'
kind: walkthrough
---

# 9.4 Infinite geometric series — Learn

**Prerequisites:** Section 9.3 — geometric series.

**Objectives:** decide when an infinite geometric series has a sum; find it; use it on a
recurring decimal.

By the end of this section you can add up an infinite number of terms — sometimes — and say
exactly when it can be done and why.

## An infinite series does not always have a sum

Add $1 + 2 + 4 + 8 + \dots$ and the total grows without bound. Add
$1 + \dfrac{1}{2} + \dfrac{1}{4} + \dots$ and the total creeps towards $2$ and never
passes it.

Both are infinite geometric series. One has a finite sum and one does not, and the
difference is the common ratio.

When $|r| < 1$, each term is smaller than the last and the terms shrink towards zero, so
the total settles down. When $|r| \ge 1$, the terms do not shrink, so the total does not
settle.

> **The sum to infinity.** If $|r| < 1$, the geometric series has a sum to infinity
> $$S_\infty = \frac{a}{1 - r}$$
> If $|r| \ge 1$, it has no finite sum.

**Example 1.** Find the sum to infinity of $8 + 4 + 2 + \dots$

$a = 8$, $r = \dfrac{1}{2}$, and $|r| < 1$, so

$$S_\infty = \frac{8}{1 - \frac{1}{2}} = 16$$

**Example 2.** Find the sum to infinity of $6 - 2 + \dfrac{2}{3} - \dots$

Here $r = -\dfrac{1}{3}$, and $\left|-\frac{1}{3}\right| < 1$, so the sum exists:

$$S_\infty = \frac{6}{1 - \left(-\frac{1}{3}\right)} = \frac{6}{\frac{4}{3}} = \frac{9}{2}$$

A negative ratio makes the terms alternate in sign, which does not stop the sum converging
— only the **size** of $r$ matters.

## Why the condition is needed

The sum to infinity is the value $S_n$ approaches as $n$ grows. From the finite-sum
formula,

$$S_n = \frac{a(1 - r^n)}{1 - r}$$

everything depends on $r^n$. When $|r| < 1$ the powers shrink towards zero and $S_n$
settles on $\dfrac{a}{1-r}$. Otherwise $r^n$ does not shrink, and $S_n$ does not settle.

## Recurring decimals

This gives a way to write any recurring decimal as a fraction.

**Example 3.** Write $0.777\dots$ as a fraction.

$$0.777\dots = \frac{7}{10} + \frac{7}{100} + \frac{7}{1000} + \dots$$

a geometric series with $a = \dfrac{7}{10}$ and $r = \dfrac{1}{10}$:

$$S_\infty = \frac{\frac{7}{10}}{1 - \frac{1}{10}} = \frac{\frac{7}{10}}{\frac{9}{10}} = \frac{7}{9}$$

> **Watch out.** Always check $|r| < 1$ **before** using the formula. It is possible to
> compute $\dfrac{a}{1-r}$ on a series that diverges and get a number that means nothing.
> State the check in your answer; examiners look for it.

## Progress check

Back to the chapter problem. Plan B's amount grows by 10% each month, so $r = 1.1$ and
$|r| > 1$ — it has **no** sum to infinity, which is exactly why the saving plan has to
stop after 24 months.

Write down which of Plan A and Plan B has a sum to infinity, and why the other does not.
Then finish the 24-month comparison: Plan A gives €6720 and Plan B gives about €4425. Say
which is larger and by how much, and notice that the plan that looked more exciting is the
one that loses.

## You should now be able to

- decide whether an infinite geometric series has a sum, and say why;
- find the sum to infinity when it exists;
- explain the role of $r^n$ in the formula;
- write a recurring decimal as a fraction using a geometric series.
