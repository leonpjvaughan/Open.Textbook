---
title: 17.3 Cyclic quadrilaterals — Learn
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.3'
section_title: Cyclic quadrilaterals
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 17.3 Cyclic quadrilaterals — Learn

**Prerequisites:** Section 17.2 — the angle at the centre, the angles in the same segment
and the angle in a semicircle; Section 15.2 — angles on a straight line.

**Objectives:** recognise a cyclic quadrilateral; use the opposite angles of a cyclic
quadrilateral; use the converse as a test; use the exterior angle.

By the end of this section you can find a missing angle of a four-sided pane, and you can
decide whether four given points lie on one circle.

## What a cyclic quadrilateral is

A **quadrilateral** is a shape with four straight sides. It is **convex** when every
interior angle is less than $180^\circ$, so no corner points inward.

A **cyclic quadrilateral** is a quadrilateral whose four vertices lie on one circle. The
circle is called the **circumcircle** of the quadrilateral.

## Corollary 5: the opposite angles

> **Corollary 5.** If $ABCD$ is a cyclic quadrilateral, then its opposite angles sum to
> $180^\circ$. In symbols,
>
>
> $$|\angle ABC| + |\angle ADC| = 180^\circ.$$

**Proof.** Let $O$ be the centre of the circle. The angle $\angle ABC$ stands on the arc
$AC$ that does not contain $B$. The angle $\angle ADC$ stands on the other arc $AC$, the
one that does not contain $D$.

The two arcs together make the whole circle, so the two angles at the centre add to
$360^\circ$. By Theorem 19, each angle at the circle is half of its own angle at the
centre. So

$$|\angle ABC| + |\angle ADC| = \tfrac12 \times 360^\circ = 180^\circ. \qquad \blacksquare$$

The same argument applies to the other pair, so $|\angle BAD| + |\angle BCD| = 180^\circ$
as well.

## The exterior angle

Extend one side of a cyclic quadrilateral. The angle between the extended side and the
next side is an **exterior angle**.

> **The exterior angle of a cyclic quadrilateral.** The exterior angle at a vertex is equal
> to the interior opposite angle.

**Proof.** Let $ABCD$ be cyclic, and extend the side $AB$ past $B$. The exterior angle at
$B$ and the interior angle $\angle ABC$ lie on a straight line, so they add to $180^\circ$.
Corollary 5 gives $|\angle ABC| + |\angle ADC| = 180^\circ$. Both the exterior angle and
$\angle ADC$ are $180^\circ - |\angle ABC|$, so they are equal. $\blacksquare$

## The converse: a test for four points on a circle

The result works in the other direction too, and that makes it a test.

> **Converse to Corollary 5.** If a convex quadrilateral has a pair of opposite angles
> adding to $180^\circ$, then it is cyclic.

**Why the test works.** Let $ABCD$ be convex with $|\angle ABC| + |\angle ADC| = 180^\circ$.
Draw the circle through $A$, $B$ and $C$. On the arc of this circle on the same side of
$AC$ as $D$, choose a point $D'$.

The quadrilateral $ABCD'$ is cyclic, so its opposite angles sum to $180^\circ$:

$$|\angle ABC| + |\angle AD'C| = 180^\circ.$$

Comparing the two sums, $|\angle AD'C| = |\angle ADC|$. The points $D$ and $D'$ lie on the
same side of the line $AC$, and equal angles on the same side of a chord put the two
points on the same circle, by the converse to Corollary 2.

The points $A$, $D'$ and $C$ lie on the circle we drew, so $D$ lies on that circle as
well. Three points fix a circle, so there is only one. Therefore $ABCD$ is cyclic.
$\blacksquare$

## Worked examples

**Example 1.** $ABCD$ is a cyclic quadrilateral with $|\angle BAD| = 85^\circ$. Find
$|\angle BCD|$.

The angles at $A$ and at $C$ are opposite, so they sum to $180^\circ$:

$$|\angle BCD| = 180^\circ - 85^\circ = 95^\circ.$$

**Example 2.** A cyclic quadrilateral has two opposite angles of $x$ and $3x$. Find $x$.

Opposite angles sum to $180^\circ$:

$$x + 3x = 180$$

$$4x = 180$$

$$x = 45.$$

The two angles are $45^\circ$ and $135^\circ$.

**Example 3.** $ABCD$ is cyclic. The side $AB$ is extended past $B$, and the exterior angle
at $B$ is $118^\circ$. Find $|\angle ADC|$.

The exterior angle equals the interior opposite angle:

$$|\angle ADC| = 118^\circ.$$

**Example 4.** A convex quadrilateral has angles $95^\circ$, $85^\circ$, $80^\circ$ and
$100^\circ$, in order. Is it cyclic?

Check the opposite pairs. The first and third angles are opposite:

$$95 + 80 = 175 \neq 180.$$

So a pair of opposite angles does not add to $180^\circ$, and the quadrilateral is **not**
cyclic. The other pair gives $85 + 100 = 185$, which is also not $180$.

> **Watch out.** Opposite angles sum to $180^\circ$. Angles next to each other have no
> such rule, and in a cyclic quadrilateral an adjacent pair adds to $180^\circ$ only when
> the quadrilateral happens to have a right angle.
>
> **Re-check:** label the four vertices in order around the circle, then join the two
> pairs that are opposite. Only those two pairs sum to $180^\circ$.

## Progress check

Back to the chapter problem. The mason sets a four-sided glass pane $PQRS$ in the window.
The four corners of the pane lie on the circle, so the pane is a cyclic quadrilateral. The
angle at $Q$ measures $76^\circ$.

Find $|\angle PSR|$, and give a reason for your answer. Then say what the exterior angle
at $Q$ would measure, and explain why.

Section 17.4 leaves the pane and looks at the bars that touch the rim of the window.

## You should now be able to

- say what a cyclic quadrilateral is;
- state and prove that its opposite angles sum to $180^\circ$;
- find a missing angle from the opposite pair;
- use the exterior angle, and say why it equals the interior opposite angle;
- decide whether a convex quadrilateral is cyclic from its angles.
