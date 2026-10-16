---
title: 19.4 Rotation — Learn
chapter: 19
chapter_title: Transformations and symmetry
section: '19.4'
section_title: Rotation
tier: O
refs:
- GT.6
kind: walkthrough
---

# 19.4 Rotation — Learn

**Prerequisites:** reading coordinates from Chapter 17, and central symmetry from
Section 19.3.

**Objectives:** describe a rotation by its centre, angle and direction; find the
image of a point or a shape under a quarter-turn or a half-turn about a centre.

By the end of this section you can turn a shape through a given angle about a
given point and write down where every point lands.

## What a rotation needs

A **rotation** turns a shape about a point. The point is the **centre of
rotation**. To describe a rotation fully you need three things:

- the centre of rotation;
- the **angle of rotation**, such as 90° or 180°;
- the direction, **clockwise** or **anticlockwise**.

A turn through 90° is a **quarter-turn**. A turn through 180° is a **half-turn**,
which is the central symmetry of Section 19.3.

A rotation keeps lengths and angles the same, so the image is congruent to the
object. A rotation keeps the orientation of a shape, unlike a reflection.

## Turning about the origin

The origin is the easiest centre. The rules are:

| Turn about the origin | Rule |
|---|---|
| 90° anticlockwise | $(x,y)\to(-y,x)$ |
| 90° clockwise | $(x,y)\to(y,-x)$ |
| 180° | $(x,y)\to(-x,-y)$ |

For a quarter-turn, the coordinates swap and one of them changes sign. For a
half-turn, both coordinates change sign.

**Example 1.** Rotate $P(3,1)$ through 90° anticlockwise about the origin.

Swap the coordinates and change the sign of the new first coordinate.

$$P(3,1)\to(-1,3)$$

The image is $(-1,3)$. The point starts on the right and turns up.

**Example 2.** Rotate $P(3,1)$ through 90° clockwise about the origin.

$$P(3,1)\to(1,-3)$$

The image is $(1,-3)$. The direction matters: the clockwise image is different
from the anticlockwise one.

**Example 3.** Rotate $P(2,5)$ through 180° about the origin.

$$P(2,5)\to(-2,-5)$$

The image is $(-2,-5)$. This is the same as a half-turn, or central symmetry,
about the origin.

## Turning about another point

To rotate about a point $(a,b)$ that is not the origin, do the same job in three
steps:

1. Find the vector from the centre to the point.
2. Apply the rule to that vector.
3. Add the centre back.

**Example 4.** Rotate $A(4,0)$ through 90° anticlockwise about the centre
$(2,2)$.

From the centre, $A$ is $(4-2,\ 0-2)=(2,-2)$.

A quarter-turn anticlockwise sends $(2,-2)$ to $(2,2)$.

Add the centre back: $(2+2,\ 2+2)=(4,4)$.

The image is $(4,4)$.

## Watch out

> **Watch out.** The direction of a quarter-turn matters. The common error is to
> use the anticlockwise rule when the question says clockwise.
>
> For $P(3,1)$ about the origin, the anticlockwise image is $(-1,3)$ and the
> clockwise image is $(1,-3)$. They are different points.
>
> **Re-check:** a quarter-turn anticlockwise sends the positive $x$-axis onto the
> positive $y$-axis. A clockwise quarter-turn sends it down, onto the negative
> $y$-axis.

A second trap is the centre. When the centre is not the origin, subtract the
centre before you rotate and add it back afterwards. Rotating about the origin
instead gives the wrong image.

## Progress check

Return to the chapter problem. The crest has centre $M(2,2)$ and a corner
$A(4,0)$.

1. Rotate $A$ through 90° anticlockwise about $M$. Which corner is the image?
2. The right shaded triangle is $MAB$. Where does the quarter-turn send it?
3. Does the quarter-turn map the crest onto itself?

In Section 19.5 you will count the axes of symmetry of the crest.

## You should now be able to

- name the three things that describe a rotation;
- use the rules for a quarter-turn and a half-turn about the origin;
- tell a clockwise turn from an anticlockwise one;
- rotate about a point that is not the origin by subtracting the centre and
  adding it back;
- keep the image congruent to the object;
- remember that a rotation keeps the orientation of a shape.
