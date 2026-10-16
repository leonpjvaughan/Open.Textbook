---
title: 19.6 Combining transformations — Learn
chapter: 19
chapter_title: Transformations and symmetry
section: '19.6'
section_title: Combining transformations
tier: H
refs:
- GT.6
kind: walkthrough
---

# 19.6 Combining transformations — Learn

**Prerequisites:** translation from Section 19.1, reflection from Section 19.2,
central symmetry from Section 19.3, and rotation from Section 19.4.

**Objectives:** apply two transformations in order; find the single
transformation that has the same effect; know when the order matters.

By the end of this section you can put two moves together and replace them with
one.

## Two moves in a row

To **combine** two transformations, apply the first one and then apply the second
one to the image. Work one step at a time.

The two moves are often the same as one single transformation. Finding that
single move is the skill of this section.

**Example 1.** Reflect $P(1,2)$ in the line $x=0$, then reflect the image in the
line $x=2$.

First reflection:

$$P(1,2)\to(-1,2)$$

Second reflection:

$$(-1,2)\to(2\times2-(-1),\ 2)=(5,2)$$

The final image is $(5,2)$. The two lines are parallel and 2 apart, so the pair
of reflections is the same as a translation of 4 right.

## Two reflections

Two reflections have a simple result.

- Two reflections in **parallel** lines give a **translation**. The distance is
  twice the gap between the lines.
- Two reflections in **perpendicular** lines give a **half-turn** about the point
  where the lines meet.

**Example 2.** Reflect $P(4,3)$ in the line $x=2$, then reflect the image in the
line $y=1$.

First reflection:

$$P(4,3)\to(2\times2-4,\ 3)=(0,3)$$

Second reflection:

$$(0,3)\to(0,\ 2\times1-3)=(0,-1)$$

The final image is $(0,-1)$. The lines $x=2$ and $y=1$ meet at $(2,1)$ at a right
angle, so the pair of reflections is the same as a half-turn about $(2,1)$. A
half-turn about $(2,1)$ does send $(4,3)$ to $(0,-1)$.

## The order matters

Two transformations do not always commute. That means the answer can change when
you swap the order.

**Example 3.** Start with $P(3,1)$. Compare these two orders.

Reflect first, then rotate through 90° anticlockwise about the origin:

$$(3,1)\to(1,1)\to(-1,1)$$

Rotate first, then reflect:

$$(3,1)\to(-1,3)\to(5,3)$$

The two answers, $(-1,1)$ and $(5,3)$, are different. The order of the two moves
matters.

## Watch out

> **Watch out.** Do not swap the order of two transformations without checking.
> The common error is to assume that the answer is the same either way.
>
> For $P(3,1)$, reflecting in $x=2$ and then rotating gives $(-1,1)$. Rotating and
> then reflecting gives $(5,3)$. These are different points.
>
> **Re-check:** always apply the first transformation to the original point, and
> the second transformation to the image. Write down the intermediate point so
> you do not lose your place.

A second trap is the distance in the parallel-lines rule. The translation is
**twice** the gap between the lines, not the gap itself. For lines 2 apart, the
translation is 4.

## Progress check

Return to the chapter problem. The crest has centre $M(2,2)$ and a corner
$A(4,0)$.

1. Reflect $A$ in the line $x=2$, then reflect the image in the line $y=2$. Find
   the final image.
2. Which corner of the crest is it?
3. Which single transformation gives the same result?

## You should now be able to

- apply two transformations in order, one step at a time;
- replace two reflections in parallel lines with a translation;
- replace two reflections in perpendicular lines with a half-turn;
- find the centre of that half-turn as the point where the lines meet;
- check whether the order of two transformations matters;
- use twice the gap between parallel mirror lines as the translation distance.
