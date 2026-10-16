---
title: 13.2 The equation of a line — Learn
chapter: 13
chapter_title: Coordinate geometry
section: '13.2'
section_title: The equation of a line
tier: F
refs:
- '2.2'
kind: walkthrough
---

# 13.2 The equation of a line — Learn

**Prerequisites:** finding the slope of a line through two points; rearranging
an equation.

**Objectives:** write a line as $y = mx + c$; find the equation of a line from
two points, or from one point and the slope; convert the equation to the form
$ax + by + c = 0$.

A line is fixed by two pieces of information. Usually the easiest pair is a point
on the line and the slope. Once you have both, the equation follows.

## The slope-intercept form

The simplest way to write a line is

$$y = mx + c$$

Here $m$ is the **slope** and $c$ is the **$y$-intercept**, the value of $y$ where
the line crosses the $y$-axis. Every non-vertical line has one equation of this
form.

**Example 1.** Write down the slope and the $y$-intercept of $y = 2x - 5$.

The slope is $m = 2$ and the $y$-intercept is $c = -5$. The line crosses the
$y$-axis at $(0, -5)$.

## Finding the equation from a point and a slope

If you know the slope $m$ and one point $(x_1, y_1)$, use the **point-slope form**:

$$y - y_1 = m(x - x_1)$$

Then rearrange into the form you want.

**Example 2.** Find the line with slope $3$ through $(1, 2)$.

$$y - 2 = 3(x - 1) \quad\Rightarrow\quad y - 2 = 3x - 3 \quad\Rightarrow\quad y = 3x - 1$$

Check it: when $x = 1$, $y = 3 \times 1 - 1 = 2$, which is the point you were
given.

## Finding the equation from two points

With two points, do this in two steps:

1. find the slope $m$ from the two points;
2. substitute $m$ and either point into the point-slope form.

**Example 3.** Find the line through $(2, 1)$ and $(6, 9)$.

$$m = \frac{9 - 1}{6 - 2} = \frac{8}{4} = 2$$

Using $(2, 1)$: $y - 1 = 2(x - 2)$, so $y = 2x - 3$.

**Example 4.** Write the main road through $A(-1, 1)$ and $B(7, 7)$ in the form
$ax + by + c = 0$.

From Section 13.1 the slope is $\frac{3}{4}$. Using $A$:

$$y - 1 = \frac{3}{4}(x + 1) \quad\Rightarrow\quad y = \frac{3}{4}x + \frac{7}{4}$$

Multiply every term by $4$ to clear the fractions:

$$4y = 3x + 7 \quad\Rightarrow\quad 3x - 4y + 7 = 0$$

The form $ax + by + c = 0$ has no fractions and no $y$ on its own. It is the same
line, written differently.

> **Watch out.** When you substitute a point with a negative $x$-coordinate, the
> bracket flips sign. For $A(-1, 1)$, the term is $x - (-1)$, which is $x + 1$,
> not $x - 1$. Substitute both points into your final equation as a check; if one
> of them fails, the sign is the likely cause.

## The $x$-intercept

To find where a line crosses the $x$-axis, put $y = 0$ and solve for $x$.

**Example 5.** Find where $3x + 4y = 12$ crosses the $x$-axis.

With $y = 0$, $3x = 12$, so $x = 4$. The line crosses at $(4, 0)$.

## Progress check

Back to the chapter problem. The main road runs from $A(-1, 1)$ to $B(7, 7)$.

1. Write the equation of the main road as $y = mx + c$.
2. Rewrite it in the form $ax + by + c = 0$.
3. Show that both junctions satisfy your equation.

Keep the equation. You will use its slope in Section 13.3 and its form again in
Section 13.5.

## You should now be able to

- read the slope and the $y$-intercept from $y = mx + c$;
- find the equation of a line from a point and a slope;
- find the equation of a line from two points;
- convert a line to the form $ax + by + c = 0$;
- find the $x$-intercept of a line.
