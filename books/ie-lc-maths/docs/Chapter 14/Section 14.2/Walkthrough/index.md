---
title: 14.2 Axial symmetry and reflection — Learn
chapter: 14
chapter_title: Transformation geometry
section: '14.2'
section_title: Axial symmetry and reflection
tier: F
refs:
- '2.4'
kind: walkthrough
---

# 14.2 Axial symmetry and reflection — Learn

**Prerequisites:** plotting coordinates; translations from Section 14.1; the idea of a
perpendicular.

**Objectives:** reflect a point or a shape in the $x$-axis, the $y$-axis, the line
$y = x$ and a line such as $x = 3$; find a line of symmetry of a shape.

By the end of this section you can reflect any point or shape in a given mirror line, and
you can tell whether a shape has a line of symmetry.

## Flipping a shape

A **reflection** flips a shape in a line called the **mirror line**. Each point and its
image lie the same perpendicular distance from the mirror line, on opposite sides of it.
The mirror line is the perpendicular bisector of the segment joining a point to its
image.

A reflection changes the direction the shape faces. If the object goes clockwise around
its outline, the image goes anticlockwise. We say a reflection **reverses orientation**.

**Axial symmetry** is the same idea applied to one shape. A shape has **axial symmetry**
when a reflection maps the shape onto itself. The mirror line is then called a **line of
symmetry** or an **axis of symmetry**.

## Reflection in the axes

The two coordinate axes give the simplest rules.

> **Reflection rules for the axes.**
>
> - In the $x$-axis: $(x,y) \to (x,-y)$.
> - In the $y$-axis: $(x,y) \to (-x,y)$.

Reflecting in the $x$-axis keeps the point above or below the axis at the same
horizontal position, and changes the sign of the vertical coordinate. Reflecting in the
$y$-axis changes the sign of the horizontal coordinate.

**Example 1.** Reflect $(3,2)$ in the $y$-axis.

$$(3,2) \to (-3,2)$$

The $y$-coordinate stays 2, because the point stays level. The $x$-coordinate changes
sign, because the point crosses the vertical axis.

**Example 2.** Reflect $(-4,5)$ in the $x$-axis.

$$(-4,5) \to (-4,-5)$$

## Reflection in a diagonal line

Two diagonal mirror lines are worth knowing.

> **Reflection rules for the diagonals.**
>
> - In the line $y = x$: $(x,y) \to (y,x)$.
> - In the line $y = -x$: $(x,y) \to (-y,-x)$.

Reflection in $y = x$ swaps the two coordinates. Reflection in $y = -x$ swaps them and
changes both signs.

**Example 3.** Reflect $(2,5)$ in the line $y = x$.

$$(2,5) \to (5,2)$$

The two coordinates swap. Check the picture: the point $(2,5)$ is above the line
$y = x$, and its image $(5,2)$ is the same distance below it.

**Example 4.** Reflect $(-3,4)$ in the line $y = -x$.

$$(-3,4) \to (-4,3)$$

## Reflection in a line such as $x = 3$

When the mirror line is vertical, only the $x$-coordinate changes. When it is
horizontal, only the $y$-coordinate changes.

> **Reflection in a line parallel to an axis.**
>
> - In the line $x = c$: $(x,y) \to (2c - x,\; y)$.
> - In the line $y = c$: $(x,y) \to (x,\; 2c - y)$.

The number $c$ is where the mirror line crosses the axis. The image and the object are
the same distance from the line, so the image is as far past the line as the object is
in front of it.

**Example 5.** Reflect $(5,2)$ in the line $x = 3$.

$$(5,2) \to (2 \times 3 - 5,\; 2) = (1,2)$$

The object is 2 units to the right of the line $x = 3$, and the image is 2 units to the
left of it.

**Example 6.** Reflect $(2,6)$ in the line $y = 4$.

$$(2,6) \to (2,\; 2 \times 4 - 6) = (2,2)$$

## Guided investigation: which mirror line?

:::figure reflection-grid

Predict first. The figure starts with the point $P(4,2)$ and the mirror line $y = x$.
Write down where you think the image will be, and say which coordinate changes.

Now move the point and change the mirror line. Test each of the four lines in turn:
the $x$-axis, the $y$-axis, $y = x$ and $y = -x$.

Then write your explanation, in your own words: for each mirror line, which coordinate
changes, and what happens to its sign? Compare your explanation with the reflection
rules above, and correct it where the two disagree.

## What a reflection preserves

A reflection does not change any length or any angle. So the image is congruent to the
object. What it does change is the orientation.

- Every length is unchanged.
- Every angle is unchanged.
- The area is unchanged.
- The orientation is reversed: the image is a mirror image of the object.

> **Watch out.** Reflection in the line $y = x$ swaps the two coordinates, so $(2,5)$
> becomes $(5,2)$. Reflection in the $y$-axis only changes the sign of $x$, so $(2,5)$
> becomes $(-2,5)$. These two rules are often confused, and the pictures look different.
>
> **Re-check:** for the line $y = x$, ask whether the point is above or below the line.
> The image must be on the other side. For the $y$-axis, ask whether the image should be
> left or right of the axis. The sign of one coordinate settles it.

## Progress check

Back to the chapter problem. The second border copy is the tile reflected in the
$y$-axis. The tile has corners $A(1,1)$, $B(4,1)$ and $C(1,3)$.

Reflect each corner in the $y$-axis. The $y$-coordinate of each corner stays the same,
and the $x$-coordinate changes sign. Keep the three image corners. Section 14.5 asks you
to compare this copy with the original, and reflection is the one transformation that
turns the tile over.

## You should now be able to

- reflect a point in the $x$-axis, the $y$-axis, the line $y = x$ or the line $y = -x$;
- reflect a point in a line such as $x = 3$ or $y = 4$;
- reflect a whole shape by reflecting every corner;
- say that a reflection preserves length, angle and area, and reverses orientation;
- decide whether a shape has a line of symmetry.
