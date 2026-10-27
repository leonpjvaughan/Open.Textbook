---
title: 17.2 Distance and midpoint — Learn
chapter: 17
chapter_title: Coordinate geometry
section: '17.2'
section_title: Distance and midpoint
tier: O
refs:
- GT.5
kind: walkthrough
---

# 17.2 Distance and midpoint — Learn

**Prerequisites:** plotting points from Section 17.1, subtracting negative numbers
from Section 1.2, and square roots from Section 2.4.

**Objectives:** find the horizontal and vertical steps between two points; find the
distance between two points; find the midpoint of a line segment.

By the end of this section, you can measure a segment and find the point halfway
along it.

## The two steps

Two points on a grid are joined by a straight segment. That segment is the
longest side of a right-angled triangle.

- The **horizontal step** is the change in $x$. Work it out as $x_2-x_1$.
- The **vertical step** is the change in $y$. Work it out as $y_2-y_1$.

These two steps are the two shorter sides of the triangle. The segment itself is
the longest side.

**Example 1.** Find the horizontal and vertical steps from $A(1,2)$ to $B(5,8)$.

The horizontal step is the change in $x$.

$$x_2-x_1 = 5-1 = 4$$

The vertical step is the change in $y$.

$$y_2-y_1 = 8-2 = 6$$

The steps are 4 across and 6 up.

## The distance between two points

The distance $d$ between two points is found from the two steps. Square each step,
add the squares, and take the square root.

$$d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$

Here $(x_1,y_1)$ and $(x_2,y_2)$ are the two points.

This is the coordinate form of Pythagoras' theorem. You will meet that theorem,
and its proof, in Chapter 18. Here you can use the result to measure any segment.

Because each step is squared, the order of the two points does not matter. The
distance is always a positive number.

**Example 2.** Find the distance between $A(1,2)$ and $B(5,8)$.

The steps are 4 and 6. Square them and add.

$$4^2 + 6^2 = 16 + 36 = 52$$

Take the square root.

$$d = \sqrt{52} \approx 7.21$$

The distance is $\sqrt{52}$, which is about 7.21 units. The answer is left as a
surd when 52 is not a square number.

**Example 3.** Find the distance between $A(1,2)$ and $B(4,6)$.

The steps are 3 across and 4 up. Square them and add.

$$3^2 + 4^2 = 9 + 16 = 25$$

Take the square root.

$$d = \sqrt{25} = 5$$

The distance is 5 units. When the sum of the squares is a square number, the
distance is a whole number.

## The midpoint of a segment

The **midpoint** $M$ of a segment is the point exactly halfway between its two
endpoints. It is found by averaging the two $x$-coordinates and the two
$y$-coordinates.

$$M = \left(\frac{x_1+x_2}{2},\ \frac{y_1+y_2}{2}\right)$$

The midpoint is an average, so add the coordinates and halve. Do not subtract.

**Example 4.** Find the midpoint of the segment joining $A(2,4)$ and $B(8,10)$.

Average the $x$-coordinates.

$$\frac{2+8}{2} = 5$$

Average the $y$-coordinates.

$$\frac{4+10}{2} = 7$$

The midpoint is $(5,7)$.

**Example 5.** Find the midpoint of the segment joining $A(-3,5)$ and $B(7,-1)$.

Average the $x$-coordinates.

$$\frac{-3+7}{2} = 2$$

Average the $y$-coordinates.

$$\frac{5+(-1)}{2} = 2$$

The midpoint is $(2,2)$.

**Example 6.** The midpoint of a segment is $(4,3)$, and one end is $(1,1)$. Find
the other end.

The midpoint is the average of the two ends, so the two ends add to twice the
midpoint.

$$2 \times 4 = 8 \qquad 8 - 1 = 7$$

$$2 \times 3 = 6 \qquad 6 - 1 = 5$$

The other end is $(7,5)$.

## Watch out

Distance and midpoint use the two coordinates in different ways.

> **Watch out.** For the segment from $(2,3)$ to $(6,9)$, the common error is to
> find the midpoint by subtracting: $(6-2,9-3)=(4,6)$.
>
> A midpoint is the average, so add and halve: $(4,6)$ is not the midpoint. The
> average is $\left(\frac{2+6}{2},\frac{3+9}{2}\right)=(4,6)$ only by coincidence
> here. Use $(-3,5)$ and $(7,-1)$: the difference gives $(10,-6)$, which is wrong,
> and the average gives $(2,2)$, which is right.
>
> **Re-check:** the midpoint must lie on the segment, between the two ends. The
> point $(10,-6)$ does not.

A second trap is forgetting to square each step. The distance is
$\sqrt{4^2+6^2}$, not $\sqrt{4+6}$. Square first, add second, and take the root
last.

## Progress check

Return to the chapter problem. The gate is at $G(1,2)$ and the kiosk is at
$K(9,8)$.

1. Find the horizontal and vertical steps from the gate to the kiosk.
2. Find the length of the main path.
3. A bench sits at the midpoint of the main path. Find the coordinates of the
   bench.

In Section 17.3 you will measure how steep the main path is.

## You should now be able to

- find the horizontal and vertical steps between two points;
- find the distance between two points using
  $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$;
- leave a distance as a surd when it is not a whole number;
- find the midpoint of a segment by averaging the coordinates;
- find a missing endpoint when you know the midpoint and one end;
- check a midpoint by seeing that it lies between the two ends.
