---
title: 13.3 Parallel and perpendicular lines — Learn
chapter: 13
chapter_title: Coordinate geometry
section: '13.3'
section_title: Parallel and perpendicular lines
tier: F
refs:
- '2.2'
kind: walkthrough
---

# 13.3 Parallel and perpendicular lines — Learn

**Prerequisites:** finding the slope of a line; writing the equation of a line.

**Objectives:** decide whether two lines are parallel or perpendicular from their
slopes; find a line through a point that is parallel or perpendicular to a given
line.

Two lines on the plane either meet or they do not. When they meet, the angle
between them is fixed by their slopes. Two special angles matter most: zero
degrees, for parallel lines, and ninety degrees, for perpendicular lines.

## Parallel lines

Two lines are **parallel** when they have the same slope. They rise at the same
rate, so they never meet.

$$m_1 = m_2$$

For example, $y = 3x + 1$ and $y = 3x - 4$ both have slope $3$, so they are
parallel. They cross the $y$-axis at different heights, which is why they are
distinct lines rather than the same one.

## Perpendicular lines

Two lines are **perpendicular** when they meet at a right angle. Their slopes are
**negative reciprocals** of each other:

$$m_1 \times m_2 = -1 \qquad\text{or}\qquad m_2 = -\frac{1}{m_1}$$

**Example 1.** A line has slope $4$. Find the slope of a line perpendicular to it.

The negative reciprocal of $4$ is $-\frac{1}{4}$, since
$4 \times \left(-\frac{1}{4}\right) = -1$.

To find a perpendicular slope, flip the fraction and change the sign. A slope of
$\frac{2}{3}$ becomes $-\frac{3}{2}$.

> **Watch out.** Perpendicular does not mean "negative". The line with slope
> $-4$ is not perpendicular to the line with slope $4$; their product is $-16$,
> not $-1$. You must flip the fraction as well as change the sign. Also, a
> horizontal line (slope $0$) is perpendicular to a vertical line, whose slope is
> undefined; the reciprocal rule does not apply to that pair.

**Example 2.** Find the line through $B(7, 7)$ perpendicular to the main road,
which has slope $\frac{3}{4}$.

The perpendicular slope is $-\frac{4}{3}$. Using the point-slope form:

$$y - 7 = -\frac{4}{3}(x - 7)$$

Multiply by $3$: $3y - 21 = -4x + 28$, so $4x + 3y = 49$.

This is the side road from the chapter problem. It leaves $B$ at a right angle to
the main road.

## The perpendicular bisector

The **perpendicular bisector** of a segment is the line through the midpoint that
meets the segment at a right angle. It is the set of points that are the same
distance from both endpoints.

**Example 3.** Find the perpendicular bisector of the segment from $A(-1, 1)$ to
$B(7, 7)$.

The midpoint is $(3, 4)$, from Section 13.1. The slope of $AB$ is $\frac{3}{4}$,
so the perpendicular bisector has slope $-\frac{4}{3}$:

$$y - 4 = -\frac{4}{3}(x - 3) \quad\Rightarrow\quad 4x + 3y = 24$$

## Progress check

Back to the chapter problem. The main road has slope $\frac{3}{4}$ and passes
through $B(7, 7)$.

1. Find the slope of a line perpendicular to the main road.
2. Find the equation of the side road that leaves $B$ at a right angle to the
   main road.
3. Show that the two slopes multiply to $-1$.

Keep the side road equation. In Section 13.5 you will prove that this side road
is a tangent to the roundabout.

## You should now be able to

- decide whether two lines are parallel from their slopes;
- find the negative reciprocal of a slope;
- decide whether two lines are perpendicular from their slopes;
- find a line through a point that is parallel or perpendicular to a given line;
- find the perpendicular bisector of a segment.
