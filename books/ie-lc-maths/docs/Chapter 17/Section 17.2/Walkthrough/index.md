---
title: 17.2 The angle in a semicircle and related theorems — Learn
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.2'
section_title: The angle in a semicircle and related theorems
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 17.2 The angle in a semicircle and related theorems — Learn

**Prerequisites:** Section 17.1 — the chord and the centre; Section 15.5 — the isosceles
triangle and the exterior angle.

**Objectives:** use the angle at the centre; use the angles in the same segment; use the
angle in a semicircle and its converse.

By the end of this section you can find an angle from the arc it stands on, and you can
recognise a diameter from a right angle.

## Angles standing on an arc

Let $B$ and $C$ be two points of a circle. They cut the circle into two arcs. If $A$ is a
point of the circle on one arc, then the angle $\angle BAC$ is the angle **standing on**
the other arc. We also say it stands on the chord $[BC]$.

An angle at the centre stands on an arc in the same way. The theorem that links the two
is the most useful result in the chapter.

> **Theorem 19.** The angle at the centre of a circle standing on a given arc is twice the
> angle at any point of the circle standing on the same arc.

The proof is the work of Section 17.7, where the isosceles triangles are drawn and the
angles are added. It is one click away if you would like it now.

:::prove angle-at-the-centre

## Corollary 2: the angles in the same segment

> **Corollary 2.** All angles at points of the circle standing on the same arc are equal.

In symbols, if $A$, $A'$, $B$ and $C$ lie on a circle, and $A$ and $A'$ are on the same
side of the line $BC$, then

$$|\angle BAC| = |\angle BA'C|.$$

**Proof.** Each angle is half of the same angle at the centre, by Theorem 19. Two halves
of the same angle are equal. $\blacksquare$

The region between a chord and an arc is called a **segment**. Corollary 2 says that two
angles in the same segment are equal.

## Corollary 3: the angle in a semicircle

> **Corollary 3.** Each angle in a semicircle is a right angle.

In symbols, if $BC$ is a diameter and $A$ is any other point of the circle, then

$$|\angle BAC| = 90^\circ.$$

:::prove angle-in-a-semicircle

The result has a useful converse.

> **Corollary 4.** If the angle standing on a chord $[BC]$ at a point of the circle is a
> right angle, then $[BC]$ is a diameter.

**Proof.** The angle at the centre standing on the same arc is twice the right angle, so
it is $180^\circ$. An angle of $180^\circ$ at the centre is a straight angle, so the line
$BC$ passes through the centre. That makes $BC$ a diameter. $\blacksquare$

## Guided investigation: what does the centre angle do?

Do this on paper with a compass and a protractor. Nothing here can fail; you are looking
for a pattern.

**Predict.** Draw a circle and mark the centre $O$. Mark two points $B$ and $C$ on the
circle, and mark a third point $A$ on the far arc. Predict the size of the angle at the
centre $\angle BOC$ when the angle at the circle $\angle BAC$ is $40^\circ$. Write your
prediction down before you measure anything.

**Test.** Measure $\angle BAC$ and $\angle BOC$ with the protractor. Now move $A$ to a new
point on the same arc and measure both angles again. Do this for three different points
$A$. Write the pairs of measurements in a table.

**Explain.** Write your explanation in your own words. What is the relationship between
the two angles? Does moving $A$ along the arc change the angle at the circle? Does it
change the angle at the centre? Use Corollary 2 to explain one of your answers, and
Theorem 19 to explain the other.

## Worked examples

**Example 1.** $O$ is the centre of a circle. $A$ and $B$ are points of the circle with
$|\angle AOB| = 130^\circ$. $C$ is a point on the major arc. Find $|\angle ACB|$.

The angle at the centre is $130^\circ$, and the angle at $C$ stands on the same arc. By
Theorem 19, the angle at the circle is half the angle at the centre:

$$|\angle ACB| = 130^\circ \div 2 = 65^\circ.$$

**Example 2.** $BC$ is a diameter of a circle and $A$ is another point of the circle.
Given $|\angle ABC| = 35^\circ$, find $|\angle BAC|$ and $|\angle ACB|$.

The angle in a semicircle is a right angle, so

$$|\angle BAC| = 90^\circ.$$

The three angles of the triangle add to $180^\circ$:

$$|\angle ACB| = 180^\circ - 90^\circ - 35^\circ = 55^\circ.$$

**Example 3.** $A$, $B$, $C$ and $D$ are points of a circle, and $A$ and $D$ are on the
same side of the chord $BC$. Given $|\angle BAC| = 42^\circ$, find $|\angle BDC|$.

The two angles stand on the same arc $BC$, so they are equal by Corollary 2:

$$|\angle BDC| = 42^\circ.$$

**Example 4.** $O$ is the centre of a circle. $A$ and $B$ are points of the circle with
$|\angle AOB| = 130^\circ$. The point $C$ lies on the **minor** arc $AB$. Find
$|\angle ACB|$.

The angle at the centre on the minor arc is the reflex angle

$$360^\circ - 130^\circ = 230^\circ.$$

The angle $\angle ACB$ stands on the minor arc, so it is half of the reflex angle:

$$|\angle ACB| = 230^\circ \div 2 = 115^\circ.$$

The two answers $65^\circ$ and $115^\circ$ add to $180^\circ$, which is what a cyclic
quadrilateral requires in Section 17.3.

> **Watch out.** The angle at the centre must stand on the **same arc** as the angle at
> the circle. If the point $A$ is on the major arc, the angle at the centre is the
> ordinary angle. If $A$ is on the minor arc, the angle at the centre is the reflex angle.
>
> **Re-check:** mark the arc that each angle stands on. If the two angles stand on
> opposite arcs, one of them uses the reflex angle at the centre, and the two answers
> must add to $180^\circ$.

## Progress check

Back to the chapter problem. The design has a triangle $ABC$ inside the window, with the
side $BC$ along a diameter of the circle. The other two sides are $|AB| = 30$ cm and
$|AC| = 40$ cm, and the diameter is $50$ cm.

1. Find $|\angle BAC|$, and give a reason for your answer.
2. Check your answer against the prediction you made on the chapter opener.
3. The mason also marks an arc that stands at $34^\circ$ at a point on the circle. Find
   the angle it stands at the centre.

Section 17.4 uses the same triangle, and Section 17.7 proves the result you have used
here.

## You should now be able to

- state the angle at the centre theorem;
- find an angle at the circle from the angle at the centre on the same arc;
- use the angles in the same segment;
- recognise the angle in a semicircle, and use the converse to find a diameter;
- handle the reflex angle at the centre when the two angles stand on opposite arcs.
