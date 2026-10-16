---
title: 14.6 Composing transformations — Learn
chapter: 14
chapter_title: Transformation geometry
section: '14.6'
section_title: Composing transformations
tier: H
refs:
- '2.4'
kind: walkthrough
---

# 14.6 Composing transformations — Learn

**Prerequisites:** all of Sections 14.1 to 14.5.

**Objectives:** apply two transformations in order; find the single transformation that
has the same effect as a composition; know when the order matters.

By the end of this section you can combine two transformations into one, and you can say
whether the result depends on the order.

## Doing one, then the other

A **composition** of two transformations means doing the first one, then doing the second
one to the image. The composition is itself a transformation, because it takes every
point to exactly one image point.

Write the composition left to right in the order you perform it. "Translate, then
reflect" means translate first and reflect the image.

**Example 1.** Translate the point $(1,2)$ by the vector $\binom{3}{1}$, then translate
the image by the vector $\binom{-5}{4}$.

First translation:

$$(1,2) \to (4,3)$$

Second translation, applied to $(4,3)$:

$$(4,3) \to (-1,7)$$

The two translations together moved the point by $\binom{3}{1} + \binom{-5}{4} =
\binom{-2}{5}$. So the composition is the single translation $\binom{-2}{5}$.

> **Translations compose to a translation.** Two translations add their vectors.

## Reflecting twice

Two reflections in **parallel** lines give a translation. The distance moved is twice the
distance between the lines.

**Example 2.** Reflect the point $(2,5)$ in the line $x = 1$, then in the line $x = 4$.

First reflection:

$$(2,5) \to (0,5)$$

Second reflection:

$$(0,5) \to (8,5)$$

The composition moved the point from $(2,5)$ to $(8,5)$, a shift of 6 to the right. The
lines are 3 apart, and twice 3 is 6, which agrees.

Two reflections in **intersecting** lines give a rotation. The angle of the rotation is
twice the angle between the lines, and the centre is the point where the lines meet.

**Example 3.** Reflect the point $(3,4)$ in the line $y = x$, then in the $x$-axis.

First reflection:

$$(3,4) \to (4,3)$$

Second reflection:

$$(4,3) \to (4,-3)$$

The map $(x,y) \to (y,-x)$ is a rotation of $90^\circ$ clockwise about the origin. The
lines $y = x$ and the $x$-axis meet at $45^\circ$, and twice $45^\circ$ is $90^\circ$,
which agrees.

The table collects the results.

| First transformation | Second transformation | Composition |
|---|---|---|
| Translation | Translation | a translation |
| Reflection in a line | Reflection in a parallel line | a translation |
| Reflection in a line | Reflection in an intersecting line | a rotation |
| Rotation | Rotation about the same centre | a rotation |
| Translation | Rotation | a rotation |

## Order matters

For most pairs of transformations, the order changes the answer. Composition is **not
commutative**.

**Example 4.** Start with $(2,3)$. Translate by $\binom{1}{1}$, then rotate by
$90^\circ$ anticlockwise about the origin.

Translate first:

$$(2,3) \to (3,4)$$

Then rotate:

$$(3,4) \to (-4,3)$$

The final image is $(-4,3)$.

**Example 5.** Start with $(2,3)$ again, but this time rotate first and translate second.

Rotate first:

$$(2,3) \to (-3,2)$$

Then translate:

$$(-3,2) \to (-2,3)$$

The final image is $(-2,3)$, which is not $(-4,3)$. The order mattered.

## Undoing a transformation

The **inverse** of a transformation undoes it, and takes each image back to its object.

- The inverse of a translation by $\binom{a}{b}$ is the translation by $\binom{-a}{-b}$.
- The inverse of a rotation by $\theta$ about $C$ is the rotation by $\theta$ in the
  opposite direction about $C$.
- The inverse of a reflection in a line is the same reflection, because reflecting twice
  returns the point to where it started.

> **Watch out.** The common mistake is to do the transformations in the order they are
> written rather than the order they are said. "Reflect, then translate" means reflect
> first. Doing the translate first gives a different image in most cases, and Example 5
> shows how far apart the two answers can be.
>
> **Re-check:** perform the first transformation and write the intermediate image down.
> Then apply the second transformation to that written image, not to the original point.

## Progress check

Back to the chapter problem. Two border copies come from turns: the copy made by a
$90^\circ$ anticlockwise rotation about the origin, and the copy made by a half-turn.

The tile has corners $A(1,1)$, $B(4,1)$ and $C(1,3)$. Apply the $90^\circ$ anticlockwise
rotation twice, once after the other, and work out the final three corners.

Compare the final corners with the half-turn copy from Section 14.3. They should match.
Say which single transformation has the same effect as the two quarter-turns together,
and why that had to be so.

## You should now be able to

- apply two transformations in the order given, using the intermediate image;
- combine two translations by adding their vectors;
- replace two reflections in parallel lines with a single translation;
- replace two reflections in intersecting lines with a single rotation;
- say that the order of a composition matters, and give an example;
- write down the inverse of a translation, a rotation or a reflection.
