---
title: 4.6 Geometric sequences and series, and the sum to infinity — Learn
chapter: 4
chapter_title: Sequences and series
section: '4.6'
section_title: Geometric sequences and series, and the sum to infinity
refs:
- D5
kind: walkthrough
---

# 4.6 Geometric sequences and series, and the sum to infinity — Learn

**Prerequisites:** the sequences in Section 4.3; sigma notation in Section 4.4;
the laws of indices from Section 2.1, including negative powers.

**By the end of this section you can:** find the $n$th term of a geometric
sequence; find the sum of a finite geometric series; find the common ratio from
two terms; decide when a geometric series converges; and find its sum to
infinity.

## 1. The common ratio

A **geometric sequence** is made by multiplying by the same amount at every step.
That fixed multiplier is the **common ratio**, written $r$. With first term $a$,

$$
u_n = a r^{n-1}.
$$

$$
3, \; 6, \; 12, \; 24, \; \dots
$$

Here $a = 3$ and $r = 2$, because each term is twice the one before. A common
ratio between $0$ and $1$ makes the sequence fall; a negative ratio makes the
terms alternate in sign.

## 2. The sum of a finite geometric series

The sum of the first $n$ terms is

$$
S_n = \frac{a(1 - r^n)}{1 - r}, \qquad r \ne 1.
$$

:::prove geometric-series

**Example 1.** For $3, 6, 12, \dots$, work out the 10th term and the sum of the
first 10 terms.

The 10th term is

$$
u_{10} = 3(2)^{10-1} = 3(512) = 1536.
$$

The sum uses $a = 3$, $r = 2$ and $n = 10$:

$$
S_{10} = \frac{3(1 - 2^{10})}{1 - 2}
= \frac{3(1 - 1024)}{-1} = 3(1023) = 3069.
$$

The sum is $3069$. Notice that the sum is about twice the last term, which is
what a ratio of $2$ gives.

## 3. Finding the common ratio

Two terms are enough to find $r$, because the ratio between them is a power of
$r$.

**Example 2.** A geometric sequence has first term $8$ and third term $18$. Find
the two possible values of the common ratio.

The third term is $a r^2 = 18$, so

$$
8r^2 = 18 \implies r^2 = \frac{18}{8} = \frac{9}{4},
$$

$$
r = \frac{3}{2} \quad \text{or} \quad r = -\frac{3}{2}.
$$

Both values fit the information given. A question that says the terms are
positive picks the positive value.

## 4. The sum to infinity

When $|r| < 1$, each term is smaller than the one before and the running total
settles on a fixed value. That value is the **sum to infinity**:

$$
S_\infty = \frac{a}{1 - r}, \qquad |r| < 1.
$$

When $|r| \ge 1$, the running total does not settle. The terms do not shrink, or
they grow, so the series **diverges** and has no sum to infinity. The condition
$|r| < 1$ is part of the answer, not an extra.

**Example 3.** The online appeal in the chapter problem raises £600 in month 1
and 80% of the previous month after that. Work out the most the appeal can ever
raise.

Here $a = 600$ and $r = 0.8$, and $|0.8| < 1$, so the series converges:

$$
S_\infty = \frac{600}{1 - 0.8} = \frac{600}{0.2} = 3000.
$$

The appeal can never raise more than £3000, however long it runs. After a year it
has already collected most of that.

**Example 4.** Work out the exact total raised by the appeal in the first 12
months, and compare it with the sum to infinity.

Use the finite sum with $n = 12$:

$$
S_{12} = \frac{600(1 - 0.8^{12})}{1 - 0.8} = 3000(1 - 0.8^{12}).
$$

Now $0.8^{12} = 0.068719476736$, so

$$
S_{12} = 3000(0.931280523264) = 2793.84 \text{ (to the nearest penny)}.
$$

The appeal raises £2793.84 in the first year, which is £206.16 short of the
£3000 it can never quite reach.

## 5. A recurring decimal as a geometric series

A recurring decimal is an infinite geometric series, which is why it can be
written as a fraction.

**Example 5.** Write $0.777\dots$ as a fraction.

Write the decimal as a sum:

$$
0.777\dots = 0.7 + 0.07 + 0.007 + \dots
$$

This is geometric with $a = 0.7$ and $r = 0.1$, and $|0.1| < 1$, so

$$
0.777\dots = \frac{0.7}{1 - 0.1} = \frac{0.7}{0.9} = \frac{7}{9}.
$$

## 6. Try it: the geometric sum explorer

**Predict first.** The figure draws the running total of a geometric series as
more terms are added. Before you touch the control, predict what happens to the
running total when $r = 1.2$, and what happens when $r = 0.6$. Write both
predictions down.

:::figure ch4-series-explorer

**Test.** Move the slider for $r$ and watch the running total. Keep an eye on the
line that marks the sum to infinity. The readout names the first term, the common
ratio and the limit.

**Explain.** For $r = 0.6$, describe in two sentences why the running total
creeps towards one value and never passes it. Then say what changes when $r$
rises above $1$.

> **Watch out.** The exponent is the commonest trap.
>
> **Using $r^n$ for the $n$th term.** The $n$th term is $a r^{n-1}$. For
> $3, 6, 12, \dots$ the 4th term is $3(2)^3 = 24$. Writing $3(2)^4 = 48$ has
> taken one step too many, because the first term is the starting value.
> **Re-check:** put $n = 1$. The formula must give $a r^0 = a$.
>
> **Using the sum to infinity when the series diverges.** The formula
> $S_\infty = \frac{a}{1 - r}$ needs $|r| < 1$. For the quiz night in the chapter
> problem the income rises by £50 each month, so it is not geometric at all; for
> $2 + 4 + 8 + \dots$ the ratio is $2$, so $|r| \ge 1$ and there is no sum to
> infinity. **Re-check:** write $|r| < 1$ beside every use of the formula.

## Progress check

Return to the chapter problem. The online appeal has $a = 600$ and $r = 0.8$.

1. Work out the finite sum $S_{12}$ with the formula for a geometric series.
2. Work out the sum to infinity, and say what it means for the fund.
3. The total after 12 months is £2793.84. How much of the £3000 total is left
   for the months after the first year?
4. Explain why you cannot use the same formula for the quiz night income.

## You should now be able to

- identify the first term and the common ratio of a geometric sequence;
- find the $n$th term with $u_n = a r^{n-1}$;
- find the sum of a finite geometric series with $S_n = \dfrac{a(1 - r^n)}{1 - r}$;
- find the common ratio from two given terms;
- decide whether a geometric series converges, using $|r| < 1$;
- find the sum to infinity of a convergent geometric series;
- write a recurring decimal as a fraction.
