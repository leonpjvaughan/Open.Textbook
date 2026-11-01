---
title: 14.1 Translations — Learn
chapter: 14
chapter_title: Transformation geometry
section: '14.1'
section_title: Translations
tier: F
refs:
- '2.4'
kind: walkthrough
---

# 14.1 Translations — Learn

**Prerequisites:** plotting points on a coordinate grid; reading and writing coordinates.

**Objectives:** describe a translation as a shift; find the image of a point or a shape
under a translation; say what a translation preserves.

By the end of this section you can translate any point or shape, and you can read the
translation off a diagram.

## Sliding a shape

A **translation** moves every point of a shape the same distance in the same direction.
The shape does not turn and it does not change size. It slides.

Think of a book pushed across a table. Every corner of the book moves the same amount in
the same direction. The book keeps its shape, and its edges stay parallel to where they
were.

The original shape is called the **object**. The shape after the transformation is called
the **image**. A single letter with a dash, such as $A'$, names the image of point $A$.

## The translation vector

A translation is described completely by a **translation vector**. The vector is written
as a column of two numbers:

$$\binom{a}{b}$$

- the top number $a$ is the horizontal shift: right is positive, left is negative;
- the bottom number $b$ is the vertical shift: up is positive, down is negative.

For example, $\binom{4}{-2}$ means **4 right and 2 down**.

> **The translation rule.** Under the translation $\binom{a}{b}$, the point $(x,y)$ maps
> to the image
>
>
> $$(x + a,\; y + b).$$
>
>
> Add the top number to the $x$-coordinate and the bottom number to the
> $y$-coordinate.

## Finding an image

**Example 1.** Translate the point $P(3,-2)$ by the vector $\binom{4}{5}$.

Add the horizontal shift to the $x$-coordinate, and the vertical shift to the
$y$-coordinate.

$$P' = (3 + 4,\; -2 + 5) = (7,3)$$

The point moved 4 right and 5 up, so the image is further right and higher. That agrees
with the signs of the vector.

**Example 2.** Translate the point $Q(-1,4)$ by the vector $\binom{-3}{-6}$.

Both numbers are negative, so the point moves left and down.

$$Q' = (-1 - 3,\; 4 - 6) = (-4,-2)$$

**Example 3.** Translate the triangle with corners $R(0,0)$, $S(2,0)$ and $T(1,3)$ by the
vector $\binom{2}{1}$.

Translate each corner separately.

$$R' = (0 + 2,\; 0 + 1) = (2,1) \qquad S' = (2 + 2,\; 0 + 1) = (4,1) \qquad T' = (1 + 2,\; 3 + 1) = (3,4)$$

The image triangle has corners $(2,1)$, $(4,1)$ and $(3,4)$. It is the same size and the
same shape as the object, because every corner moved by the same vector.

## Finding the vector

Sometimes you know where a point started and where it finished, and you want the vector.
Subtract the object coordinate from the image coordinate.

**Example 4.** A translation takes $P(1,2)$ to $P'(5,5)$. Find the translation vector.

$$a = 5 - 1 = 4 \qquad b = 5 - 2 = 3$$

The vector is $\binom{4}{3}$: 4 right and 3 up.

**Example 5.** A translation takes $M(3,-1)$ to $M'(-2,4)$. Find the image of the origin
$O(0,0)$ under the same translation.

First find the vector.

$$a = -2 - 3 = -5 \qquad b = 4 - (-1) = 5$$

The vector is $\binom{-5}{5}$. Now apply it to the origin.

$$O' = (0 - 5,\; 0 + 5) = (-5,5)$$

## What a translation preserves

A translation moves a shape without changing it. So the image is **congruent** to the
object: the two shapes have exactly the same size and shape.

- Every length is unchanged.
- Every angle is unchanged.
- The area is unchanged.
- The orientation is unchanged: the image is not a mirror image of the object.

> **Watch out.** The most common mistake is to add the vector to the wrong coordinate.
> For the point $(3,5)$ and the vector $\binom{2}{-1}$, the correct image is $(5,4)$:
> the 2 goes to the $x$-coordinate and the $-1$ goes to the $y$-coordinate. A student who
> swaps them writes $(2,4)$ or $(5,-1)$, and both are wrong.
>
> **Re-check:** say the vector in words before you add it. "Two right and one down" tells
> you which coordinate each number touches.

## Progress check

Back to the chapter problem. The tile has corners $A(1,1)$, $B(4,1)$ and $C(1,3)$. The
first border copy is the tile translated by $\binom{5}{0}$.

Work out the three image corners. The vector has a horizontal part of 5 and a vertical
part of 0, so the tile slides right and stays at the same height. Keep the three image
corners. Section 14.5 uses them to decide whether this copy is congruent to the original.

## You should now be able to

- write a translation as a vector and read it in words;
- find the image of a point by adding the vector to its coordinates;
- find the image of a shape by translating every corner;
- find the translation vector by subtracting the object coordinate from the image
  coordinate;
- say that a translation preserves length, angle, area and orientation.
