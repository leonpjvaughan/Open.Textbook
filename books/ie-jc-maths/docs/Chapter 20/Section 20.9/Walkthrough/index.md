---
title: 20.9 Circles and their theorems — Learn
chapter: 20
chapter_title: Synthetic geometry, constructions and proof
section: '20.9'
section_title: Circles and their theorems
tier: H
refs:
- GT.3
kind: walkthrough
---

# 20.9 Circles and their theorems — Learn

**Prerequisites:** the isosceles theorem from Section 20.5, the triangle angle sum
from Section 20.3, and the exterior angle result.

**Objectives:** use and prove the angle-at-the-centre theorem; prove the angle in
a semicircle; use the same-arc result and the cyclic quadrilateral result.

By the end of this section you can find angles in a circle and say which theorem
you used.

## The parts of a circle

A **circle** is the set of points at a fixed distance from a centre. The fixed
distance is the **radius**. A line from the centre to the circle is also a radius,
and a line across the circle through the centre is a **diameter**, which is twice
the radius.

A **chord** is a line joining two points of the circle. A **diameter** is the
longest chord, and it passes through the centre.

An **arc** is a part of the circle. An angle **stands on** an arc when the two
lines that make the angle meet the circle at the ends of that arc.

A **cyclic quadrilateral** is a quadrilateral whose four corners lie on a circle.

## The angle at the centre

**Theorem.** The angle at the centre standing on an arc is twice the angle at the
circumference standing on the same arc.

:::prove angle-at-the-centre

**Proof.** Let $O$ be the centre, and let $A$, $B$ and $C$ be points of the
circle. Join $B$ to $O$, and continue the line to the far side of the circle at
$D$. So $BD$ is a diameter through $O$.

Look at triangle $OAB$. The sides $OA$ and $OB$ are both radii, so they are equal.
The triangle is isosceles, and the angles opposite the equal sides are equal:

$$|\angle OAB|=|\angle ABO|$$

Now look at the angle $\angle AOD$. It is the exterior angle of triangle $OAB$ at
$O$, made by continuing $BO$ to $D$. The exterior angle equals the sum of the two
interior opposite angles, so

$$|\angle AOD|=|\angle OAB|+|\angle ABO|=2|\angle ABO|$$

In the same way, triangle $OBC$ is isosceles, so

$$|\angle COD|=2|\angle CBO|$$

Add the two results:

$$|\angle AOC|=2|\angle ABO|+2|\angle CBO|=2|\angle ABC|$$

The angle at the centre is twice the angle at the circumference.

**Example 1.** The angle at the circumference standing on an arc is 38°. Work out
the angle at the centre standing on the same arc.

$$2\times38=76$$

The angle at the centre is **76°**.

**Example 2.** The angle at the centre standing on an arc is 130°. Work out the
angle at the circumference standing on the same arc.

$$130\div2=65$$

The angle at the circumference is **65°**.

## The angle in a semicircle

A **semicircle** is half a circle, cut off by a diameter.

**Corollary.** Each angle in a semicircle is a right angle.

:::prove angle-in-a-semicircle

**Proof.** Let $BC$ be a diameter and $A$ another point of the circle. The angle at
the centre standing on the arc $BC$ is the straight angle $BOC$, which is 180°.

The angle at the centre is twice the angle at the circumference, so

$$|\angle BAC|=180°\div2=90°$$

Each angle in a semicircle is a right angle.

**Example 3.** $BC$ is a diameter of a circle and $A$ is another point on the
circle. Work out the angle $BAC$.

$$180\div2=90$$

The angle is **90°**.

The converse also holds. If the angle standing on a chord is a right angle, then
the chord is a diameter.

**Proof.** The angle at the centre standing on the same arc is twice the right
angle, so it is 180°. An angle at the centre of 180° is a straight angle, so the
two radii to the ends of the chord form one straight line. That line passes
through the centre, so the chord is a diameter.

## Angles on the same arc

**Corollary.** All angles at points of the circle standing on the same arc are
equal.

Each of them is half of the same angle at the centre, by the theorem. So they are
all equal to one another.

**Example 4.** Two angles at the circumference stand on the same arc, on the same
side of the chord. One is 51°. Write down the other.

The other angle is **51°**, because all angles standing on the same arc are equal.

## The cyclic quadrilateral

**Corollary.** In a cyclic quadrilateral, the opposite angles add to 180°.

**Proof.** Take a pair of opposite angles of the cyclic quadrilateral. The two
angles at the centre standing on the arcs they cut off add to 360°, because
together they make a full turn.

Each angle of the quadrilateral is half the angle at the centre standing on the
same arc. So the two opposite angles add to half of 360°, which is 180°.

**Example 5.** A cyclic quadrilateral has an angle of 112°. Work out the opposite
angle.

$$180-112=68$$

The opposite angle is **68°**.

**Example 6.** A triangle has its three corners on a circle of radius 5 cm, and
one side is a diameter. Work out the length of that side.

$$2\times5=10$$

The side is **10 cm**. A diameter is twice the radius, and the angle opposite it is
90°, by the angle in a semicircle.

> **Watch out.** Check that the two angles stand on the **same arc**. The angle at
> the centre and the angle at the circumference must meet the circle at the same
> two points. If the point at the circumference lies on the near arc instead of
> the far arc, the angle at the centre that doubles it is the reflex angle, the
> one greater than 180°.

## Progress check

Back to the chapter problem. The circle theorems in this section rest on two
results you proved earlier: the isosceles theorem and the triangle angle sum.

Write one sentence naming the isosceles fact used in the proof of the
angle-at-the-centre theorem, and say where that fact was proved. This shows how
one chapter builds a whole chain of results.

## You should now be able to

- name the centre, radius, diameter, chord and arc of a circle;
- use the angle-at-the-centre theorem, and explain why it works;
- use the angle in a semicircle, and its converse;
- use the result that angles on the same arc are equal;
- use the cyclic quadrilateral result;
- find an angle in a circle and name the theorem you used.
