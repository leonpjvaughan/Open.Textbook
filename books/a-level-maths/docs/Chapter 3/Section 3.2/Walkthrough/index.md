---
title: 3.2 Parallel and perpendicular lines — Learn
chapter: 3
chapter_title: Coordinate geometry
section: '3.2'
section_title: Parallel and perpendicular lines
dfe:
- C1
kind: walkthrough
---

# 3.2 Parallel and perpendicular lines — Learn

**Prerequisites:** the gradient and the equation of a line from 3.1;
rearranging a formula; solving two linear equations at once.

**By the end of this section you can:** decide from their gradients whether two
lines are parallel or perpendicular; find the equation of a line parallel or
perpendicular to a given line through a point; find the midpoint of a line
segment; find the shortest distance from a point to a line.

## 1. Parallel lines

Two lines are **parallel** when they point in the same direction. Direction is
the gradient, so parallel lines have the same gradient.

$$
m_1 = m_2.
$$

**Example 1.** Find the equation of the line through $(3, -2)$ parallel to
$y = 4x - 1$.

The gradient is $4$, the same as the given line. Use $y - y_1 = m(x - x_1)$ with
the point $(3, -2)$:

$$
y - (-2) = 4(x - 3).
$$

Expand and simplify:

$$
y + 2 = 4x - 12, \qquad y = 4x - 14.
$$

The lines are parallel because both have gradient $4$. They are different lines
because the intercepts are different.

## 2. Perpendicular lines

Two lines are **perpendicular** when they meet at a right angle. Their gradients
multiply to $-1$:

$$
m_1 m_2 = -1, \qquad \text{so} \qquad m_2 = -\frac{1}{m_1}.
$$

The second gradient is the **negative reciprocal** of the first. Turn the
fraction upside down, and change the sign.

**Example 2.** A line has gradient $\frac{2}{3}$. Find the gradient of a line
perpendicular to it.

The reciprocal of $\frac{2}{3}$ is $\frac{3}{2}$. Change the sign:

$$
m_2 = -\frac{3}{2}.
$$

Check: $\frac{2}{3} \times \left(-\frac{3}{2}\right) = -1$. The product is $-1$,
so the lines are perpendicular.

A gradient of $0$ is the one case that needs care. A horizontal line has
gradient $0$, and a vertical line has no gradient at all. They are
perpendicular, and the rule $m_1 m_2 = -1$ cannot express that. Handle vertical
lines by writing their equation as $x = a$.

**Example 3.** Find the equation of the line through $(3, -2)$ perpendicular to
$2x + 3y = 6$.

Rearrange the given line to see its gradient:

$$
3y = -2x + 6, \qquad y = -\frac{2}{3}x + 2.
$$

The gradient is $-\frac{2}{3}$. The perpendicular gradient is the negative
reciprocal:

$$
m = -\frac{1}{-2/3} = \frac{3}{2}.
$$

Now use the point $(3, -2)$:

$$
y - (-2) = \frac{3}{2}(x - 3).
$$

Expand and simplify:

$$
y + 2 = \frac{3}{2}x - \frac{9}{2}, \qquad y = \frac{3}{2}x - \frac{13}{2}.
$$

Multiplying by $2$ gives the whole-number form $3x - 2y - 13 = 0$.

## 3. The midpoint of a segment

The **midpoint** of the segment joining $(x_1, y_1)$ and $(x_2, y_2)$ is the
average of the two endpoints:

$$
M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right).
$$

**Example 4.** Find the midpoint of the segment from $(1, -3)$ to $(7, 5)$.

$$
M = \left(\frac{1 + 7}{2}, \frac{-3 + 5}{2}\right) = (4, 1).
$$

The midpoint sits on the perpendicular bisector of the segment: the line through
the midpoint at right angles to the segment. Every point on that line is the
same distance from the two endpoints.

## 4. The shortest distance from a point to a line

The shortest path from a point to a line meets the line at a right angle. So the
distance is measured along the perpendicular.

To find it, follow three steps. Write the perpendicular line through the point.
Find where it meets the original line. Then work out the distance between the two
points.

**Example 5.** Find the shortest distance from $(6, 8)$ to the line
$x + y = 19$.

The line has gradient $-1$, so the perpendicular has gradient $1$. The
perpendicular through $(6, 8)$ is

$$
y - 8 = 1(x - 6), \qquad y = x + 2.
$$

Find the intersection of $y = x + 2$ with $x + y = 19$. Substitute:

$$
x + (x + 2) = 19, \qquad 2x = 17, \qquad x = \frac{17}{2}.
$$

Then $y = \frac{17}{2} + 2 = \frac{21}{2}$. The foot of the perpendicular is
$\left(\frac{17}{2}, \frac{21}{2}\right)$. The distance is

$$
\sqrt{\left(\frac{17}{2} - 6\right)^2 + \left(\frac{21}{2} - 8\right)^2}
= \sqrt{\left(\frac{5}{2}\right)^2 + \left(\frac{5}{2}\right)^2}
= \frac{5}{\sqrt{2}} = \frac{5\sqrt{2}}{2}.
$$

The same answer comes from one formula. For the line $ax + by + c = 0$ and the
point $(x_1, y_1)$, the shortest distance is

$$
\frac{\left|a x_1 + b y_1 + c\right|}{\sqrt{a^2 + b^2}}.
$$

Here $x + y - 19 = 0$, so $a = 1$, $b = 1$ and $c = -19$. Then

$$
\frac{|6 + 8 - 19|}{\sqrt{1 + 1}} = \frac{5}{\sqrt{2}}.
$$

Both routes agree. Use the three steps when a question asks for the foot of the
perpendicular, and the formula when it asks only for the distance.

> **Watch out.** Two traps come from the signs.
>
> **The negative reciprocal, not the reciprocal.** The perpendicular to a line
> of gradient $\frac{2}{3}$ has gradient $-\frac{3}{2}$, not $\frac{3}{2}$. The
> sign is what makes the product $-1$, so check the product before you carry on.
>
> **A line in the form $ax + by + c = 0$ hides its gradient.** For
> $2x + 3y = 6$ the gradient is $-\frac{2}{3}$, not $\frac{2}{3}$ and not $2$.
> **Re-check:** rearrange to make $y$ the subject first, then read the
> coefficient of $x$.

## You should now be able to

- decide whether two lines are parallel from their gradients;
- find a perpendicular gradient as the negative reciprocal;
- find the equation of a line parallel or perpendicular to a given line through
  a point;
- handle the vertical and horizontal case separately;
- find the midpoint of a segment;
- find the shortest distance from a point to a line, and the foot of the
  perpendicular.
