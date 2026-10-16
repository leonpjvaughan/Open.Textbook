---
title: 13.7 Dividing a line segment in a given ratio — Learn
chapter: 13
chapter_title: Coordinate geometry
section: '13.7'
section_title: Dividing a line segment in a given ratio
tier: H
refs:
- '2.2'
kind: walkthrough
---

# 13.7 Dividing a line segment in a given ratio — Learn

**Prerequisites:** coordinates; fractions; the midpoint formula.

**Objectives:** find the point that divides a segment in a given ratio; use the
section formula; recognise the midpoint as the ratio $1 : 1$.

The midpoint cuts a segment into two equal parts. This section answers the harder
question: where is the point that cuts a segment into two parts of any given
ratio?

## The section formula

Let $A(x_1, y_1)$ and $B(x_2, y_2)$ be the endpoints. Suppose the point $P$
divides the segment so that

$$AP : PB = m : n$$

Then the coordinates of $P$ are

$$P = \left(\frac{n x_1 + m x_2}{m + n}, \frac{n y_1 + m y_2}{m + n}\right)$$

The segment is split into $m + n$ equal parts, and $P$ is $m$ of those parts from
$A$. So $P$ is the fraction $\frac{m}{m+n}$ of the way from $A$ to $B$. Writing
that fraction as a weighted average of the two endpoints gives the formula.

Notice which endpoint is multiplied by which number. The endpoint $A$ is
multiplied by $n$, the *second* part of the ratio, and $B$ is multiplied by $m$,
the *first* part. The ratio $m : n$ describes $AP : PB$, not $PA : PB$.

## The midpoint is the special case

When $m = n = 1$, the formula becomes

$$P = \left(\frac{1 \times x_1 + 1 \times x_2}{2}, \frac{1 \times y_1 + 1 \times y_2}{2}\right)
= \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$$

That is the midpoint formula from Section 13.1. The midpoint is the point that
divides a segment in the ratio $1 : 1$.

## Examples

**Example 1.** Find the point that divides the segment from $(2, 4)$ to $(8, 10)$
in the ratio $1 : 2$.

Here $m = 1$ and $n = 2$, so $m + n = 3$:

$$P = \left(\frac{2 \times 2 + 1 \times 8}{3}, \frac{2 \times 4 + 1 \times 10}{3}\right)
= \left(\frac{12}{3}, \frac{18}{3}\right) = (4, 6)$$

The point is $(4, 6)$, one third of the way from the first endpoint.

**Example 2.** Find the point that divides the segment from $A(-1, 1)$ to
$B(7, 7)$ in the ratio $2 : 3$.

Here $m = 2$ and $n = 3$, so $m + n = 5$:

$$P = \left(\frac{3 \times (-1) + 2 \times 7}{5}, \frac{3 \times 1 + 2 \times 7}{5}\right)
= \left(\frac{11}{5}, \frac{17}{5}\right)$$

The point is $\left(\frac{11}{5}, \frac{17}{5}\right)$, which is $(2.2, 3.4)$.

**Example 3.** Find the two points that divide the segment from $(0, 0)$ to
$(9, 6)$ into three equal parts.

The first point divides the segment in the ratio $1 : 2$:

$$\left(\frac{2 \times 0 + 1 \times 9}{3}, \frac{2 \times 0 + 1 \times 6}{3}\right) = (3, 2)$$

The second point divides it in the ratio $2 : 1$:

$$\left(\frac{1 \times 0 + 2 \times 9}{3}, \frac{1 \times 0 + 2 \times 6}{3}\right) = (6, 4)$$

Together with the endpoints, the four points $(0, 0)$, $(3, 2)$, $(6, 4)$ and
$(9, 6)$ are evenly spaced.

> **Watch out.** The most common error is swapping $m$ and $n$. Check your answer
> with the ratio: if $AP : PB = 1 : 3$, the point must be closer to $A$ than to
> $B$. If your point is closer to $B$, the two numbers are the wrong way round.
> Also, a ratio of $2 : 3$ gives fifths, not halves; keep the fractions exact.

## Progress check

Back to the chapter problem. A bus stop divides the main road from $A(-1, 1)$ to
$B(7, 7)$ in the ratio $2 : 3$.

1. Find the coordinates of the bus stop.
2. Check that the bus stop is closer to $A$ than to $B$.
3. Find how far the bus stop is from $A$ in units, and in metres.

## You should now be able to

- use the section formula to divide a segment in a given ratio;
- recognise the midpoint as the case $1 : 1$;
- divide a segment into three or more equal parts;
- check a ratio answer by comparing the two distances.
