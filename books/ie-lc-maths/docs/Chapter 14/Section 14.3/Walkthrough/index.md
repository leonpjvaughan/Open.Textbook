---
title: 14.3 Central symmetry and rotation — Learn
chapter: 14
chapter_title: Transformation geometry
section: '14.3'
section_title: Central symmetry and rotation
tier: F
refs:
- '2.4'
kind: walkthrough
---

# 14.3 Central symmetry and rotation — Learn

**Prerequisites:** plotting coordinates; reflection from Section 14.2; clockwise and
anticlockwise turns.

**Objectives:** find the image under a quarter-turn or a half-turn about the origin;
find the image under central symmetry about a point; state the order of rotational
symmetry of a shape.

By the end of this section you can rotate a point or a shape about a point, and you can
read the rotational symmetry of a shape from its picture.

## Turning a shape

A **rotation** turns a shape about a fixed point called the **centre of rotation**. To
describe a rotation completely, you need three things:

- the centre of rotation;
- the angle of the turn;
- the direction, either clockwise or anticlockwise.

Unless a question says otherwise, we measure a turn **anticlockwise**. A turn of
$90^\circ$ anticlockwise is a quarter-turn, and a turn of $180^\circ$ is a half-turn.

**Central symmetry** is the special case of a half-turn. A shape has central symmetry
about a point $C$ when a rotation of $180^\circ$ about $C$ maps the shape onto itself.
The point $C$ is called the **centre of symmetry**.

## Rotation about the origin

The three turns about the origin have simple coordinate rules.

> **Rotation rules about the origin.**
>
> - $90^\circ$ anticlockwise: $(x,y) \to (-y,x)$.
> - $180^\circ$: $(x,y) \to (-x,-y)$.
> - $90^\circ$ clockwise: $(x,y) \to (y,-x)$.

A $90^\circ$ clockwise turn is the same as a $270^\circ$ anticlockwise turn, so the last
rule is the first one applied three times.

**Example 1.** Rotate $(4,1)$ by $90^\circ$ anticlockwise about the origin.

Use the rule $(x,y) \to (-y,x)$.

$$(4,1) \to (-1,4)$$

The point was 4 right and 1 up. After the turn it is 1 left and 4 up, which is a quarter
of a turn anticlockwise.

**Example 2.** Rotate $(2,-3)$ by $90^\circ$ clockwise about the origin.

Use the rule $(x,y) \to (y,-x)$.

$$(2,-3) \to (-3,-2)$$

**Example 3.** Rotate $(3,1)$ by $180^\circ$ about the origin.

$$(3,1) \to (-3,-1)$$

Every coordinate changes sign. This is central symmetry about the origin.

## Central symmetry about any point

For a half-turn about a point $C(c,d)$, each coordinate is reflected in the centre.

> **Central symmetry about $C(c,d)$.**
>
>
> $$(x,y) \to (2c - x,\; 2d - y).$$

**Example 4.** Find the image of $(5,1)$ under central symmetry about $C(2,3)$.

$$(5,1) \to (2 \times 2 - 5,\; 2 \times 3 - 1) = (-1,5)$$

Check: the centre $C(2,3)$ is the midpoint of $(5,1)$ and $(-1,5)$. The midpoint is
$\left(\frac{5 + (-1)}{2}, \frac{1 + 5}{2}\right) = (2,3)$, which is $C$. That is what
central symmetry means: the centre is the midpoint of each point and its image.

## What a rotation preserves

A rotation turns a shape without changing it.

- Every length is unchanged.
- Every angle is unchanged.
- The area is unchanged.
- The orientation is unchanged: unlike a reflection, a rotation does not produce a
  mirror image.

## Rotational symmetry

A shape has **rotational symmetry** when a turn of less than a full circle maps the
shape onto itself. The **order** of the symmetry is the number of positions in a full
turn that look the same.

> **Order of rotational symmetry.**
>
>
> $$\text{order} = \frac{360^\circ}{\text{angle of the smallest turn that fits}}.$$

A square fits onto itself after a quarter-turn, so its order is $360^\circ \div
90^\circ = 4$. An equilateral triangle has order $3$, because a third of a full turn
works. A shape with no rotational symmetry other than a full turn is said to have order
$1$.

**Example 5.** Find the order of rotational symmetry of a regular hexagon.

The smallest turn that fits is one sixth of a full turn, which is $60^\circ$.

$$\text{order} = \frac{360^\circ}{60^\circ} = 6$$

> **Watch out.** Two mistakes are common here. The first is turning the wrong way: a
> $90^\circ$ clockwise turn and a $90^\circ$ anticlockwise turn give different images,
> and the rules $(y,-x)$ and $(-y,x)$ are often swapped. The second is treating central
> symmetry as a reflection. A half-turn is a rotation: the image keeps its orientation.
> A reflection flips it.
>
> **Re-check:** for the direction, sketch the point and turn the page a quarter-turn in
> the direction asked. For central symmetry, check that the centre is the midpoint of a
> point and its image.

## Progress check

Back to the chapter problem. The third border copy is the tile under central symmetry
about the origin, which is a half-turn. The tile has corners $A(1,1)$, $B(4,1)$ and
$C(1,3)$.

Apply the rule $(x,y) \to (-x,-y)$ to each corner. Keep the three image corners. Section
14.5 asks whether this copy is congruent to the original, and a half-turn is one of the
transformations that preserves the shape exactly.

## You should now be able to

- rotate a point by $90^\circ$ or $180^\circ$ about the origin, in either direction;
- find the image under central symmetry about any point;
- rotate a whole shape by rotating every corner;
- say that a rotation preserves length, angle, area and orientation;
- find the order of rotational symmetry of a shape from its smallest fitting turn.
