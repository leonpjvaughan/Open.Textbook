---
title: 16.7 Constructions 7–15 — Learn
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.7'
section_title: Constructions 7–15
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 16.7 Constructions 7–15 — Learn

**Prerequisites:** Sections 16.1 to 16.6, and constructions 1 to 6 from Section 15.7.

**Objectives:** divide a segment into any number of equal parts; mark a segment of a given
length and an angle of a given size; construct a triangle from three sides, from two sides
and the included angle, and from two angles and the included side; construct a
right-angled triangle and a rectangle.

By the end of this section you can set out any triangle or rectangle from a drawing, with
a straight edge and compass, and say why each construction is correct.

## The instruments

The instruments were described in Section 15.7. A **straight edge** draws a line through
two marked points. A **compass** draws a circle with a given centre, passing through a
given point, and copies a length. A **ruler** measures and marks a length. A **protractor**
measures and marks an angle. **Set squares** draw right angles and the angles $30^\circ$,
$45^\circ$ and $60^\circ$.

The constructions in this section use the compass and straight edge wherever they can, and
the ruler and protractor where a measured length or angle is part of the data.

## Construction 7: divide a segment into any number of equal parts

Construction 6 divided a segment into $2$ or $3$ equal parts. The same method works for
any number.

**Steps.** To divide $[AB]$ into $n$ equal parts:

1. Draw a ray from $A$ at any angle to $AB$.
2. With the compass, mark off $n$ equal segments along the ray, using the same opening
   each time.
3. Draw the line from the last mark to $B$.
4. Through each of the other marks, draw a line parallel to that line, using
   Construction 5. These lines meet $AB$ at the division points.

**Why it works.** The parallel lines cut off equal segments on the ray from $A$, because
the compass marked them equal. By Theorem 11, they cut off equal segments on any other
transversal, so they cut off $n$ equal segments on $AB$.

## Construction 8: a segment of a given length on a given ray

**Steps.** Given a ray with endpoint $A$ and a length $d$:

1. Open the compass to the length $d$, or set the ruler to $d$.
2. With centre $A$, mark the point $B$ on the ray at distance $d$.

**Why it works.** Part 4 of the Ruler Axiom says there is exactly one point on the ray at
a given distance from $A$. The construction marks that point.

## Construction 9: an angle of a given size

**Steps.** Given a ray with endpoint $A$ and a number of degrees $d$:

1. Place the protractor with its centre at $A$ and its base along the ray.
2. Mark a point at the angle $d$ on the correct side of the ray.
3. Draw the ray from $A$ through that point.

**Why it works.** Part 2 of the Protractor Axiom says there is exactly one ray on each
side of the line making an angle of $d$ degrees with the given ray. The construction
marks that ray.

## Constructions 10 to 12: a triangle from three pieces of data

Each of the congruence tests from Section 15.3 gives a construction. The data of the
construction is the data of the test.

### Construction 10: a triangle, given the lengths of three sides

**Steps.**

1. Draw one side $AB$ with the given length, using Construction 8.
2. With centre $A$, draw an arc of radius equal to the second side.
3. With centre $B$, draw an arc of radius equal to the third side.
4. The two arcs meet at the third vertex $C$. Draw $AC$ and $BC$.

**Why it works.** The two arcs place $C$ at the correct distance from $A$ and from $B$.
The triangle has the three given sides, so it is congruent to any other triangle with
those sides, by SSS.

### Construction 11: a triangle, given two sides and the included angle

**Steps.**

1. Draw one side $AB$ with the given length.
2. At $A$, construct the given angle, using Construction 9.
3. On the new ray, mark the second side $AC$ with its given length.
4. Draw $BC$.

**Why it works.** The two sides and the angle between them are the given data, so the
triangle is fixed by SAS.

### Construction 12: a triangle, given two angles and the included side

**Steps.**

1. Draw the given side $AB$.
2. At $A$, construct the first given angle.
3. At $B$, construct the second given angle, on the same side of $AB$.
4. The two rays meet at the third vertex $C$.

**Why it works.** The side $AB$ lies between the two given angles, so the triangle is
fixed by ASA. The third angle is determined as well, because the three angles add to
$180^\circ$.

## Constructions 13 and 14: a right-angled triangle

### Construction 13: given the hypotenuse and one other side

**Steps.**

1. Draw the given side $AB$.
2. Construct the perpendicular to $AB$ at $B$, using Construction 4.
3. With centre $A$ and radius equal to the hypotenuse, draw an arc cutting the
   perpendicular at $C$.
4. Draw $AC$.

**Why it works.** The perpendicular at $B$ makes $\angle B$ a right angle. The arc from
$A$ makes $AC$ the hypotenuse, with the given length. The two right-angled triangles with
the same hypotenuse and the same side are congruent by RHS, so the triangle is fixed. The
third side is found by Pythagoras.

### Construction 14: given one side and one acute angle

**Steps.**

1. Draw the given side $AB$.
2. Construct a right angle at one end of $AB$, using Construction 4.
3. At the other end, construct the given acute angle, using Construction 9.
4. The two rays meet at the third vertex $C$.

**Why it works.** The right angle and the given acute angle are two angles, and the given
side lies between them, so the triangle is fixed by ASA. There are several cases, because
the given side may be the hypotenuse, a leg, or the side next to the acute angle. Each
case is drawn the same way.

## Construction 15: a rectangle, given the side lengths

**Steps.**

1. Draw one side $AB$ with its given length.
2. Construct the perpendicular to $AB$ at $A$, and at $B$, using Construction 4.
3. On the perpendicular at $B$, mark $C$ with the second given length, using
   Construction 8.
4. Construct the perpendicular to $BC$ at $C$. It meets the perpendicular at $A$ at $D$.

**Why it works.** The angles at $A$ and $B$ are right angles by construction, and the
angle at $C$ is a right angle by construction, so the angle at $D$ is also a right angle,
because the four angles add to $360^\circ$. A quadrilateral with four right angles is a
rectangle, and a rectangle is a parallelogram by Proposition 3. The opposite sides are
equal by Theorem 9, so the side $CD$ has the length of $AB$, and $AD$ has the length of
$BC$.

## Worked examples

**Example 1.** A segment is $24$ cm long. Divide it into four equal parts.

By Construction 7, mark four equal segments along a ray, join the last mark to the end of
the segment, and draw parallels through the other marks. Each part is

$$24 \div 4 = 6 \text{ cm}.$$

**Example 2.** Construct a triangle with sides of $5$ cm, $6$ cm and $7$ cm. Which
congruence test does the construction use?

Use Construction 10. Draw the $7$ cm side, then draw an arc of radius $5$ cm from one end
and an arc of radius $6$ cm from the other end. The construction uses SSS.

**Example 3.** A right-angled triangle has a hypotenuse of $13$ cm and one leg of $5$ cm.
Construct it, and find the third side.

Use Construction 13. Draw the $5$ cm leg, construct a perpendicular at one end, and draw
an arc of radius $13$ cm from the other end. The third side is found by Pythagoras:

$$\sqrt{13^2 - 5^2} = \sqrt{144} = 12 \text{ cm}.$$

**Example 4.** Construct a rectangle with sides of $60$ mm and $25$ mm.

Use Construction 15. Draw the $60$ mm side, construct perpendiculars at both ends, mark
$25$ mm on one perpendicular, and complete the rectangle.

**Example 5.** Construct a triangle with two angles of $40^\circ$ and $65^\circ$, and the
side between them $8$ cm long.

Use Construction 12. Draw the $8$ cm side, then construct $40^\circ$ at one end and
$65^\circ$ at the other. The third angle is $180^\circ - 40^\circ - 65^\circ = 75^\circ$.

> **Watch out.** A construction is checked by its arcs, not by the finished outline. A
> student who rubs out the arcs leaves no evidence that the equal lengths or the equal
> angles were built correctly.
>
> **Re-check:** leave every arc on the page. Check one of the equal distances with the
> compass at the end, without changing the opening between the two checks.

## Progress check

Back to the chapter problem. The farmer must set out the field on the ground, as a
rectangle $60$ m by $25$ m, with a gate $24$ m along the long side.

1. Name the construction used to draw a side of $60$ m along a marked ray.
2. Name the construction used to make each corner a right angle.
3. Name the construction used to divide the $60$ m side at the gate, $24$ m from one end.
4. To check the right angle on site, the farmer measures $60$ m, $25$ m and the diagonal.
   What length must the diagonal be? Which theorem tells you?
5. Name the construction used to build the whole rectangle from its two side lengths.

Keep the five constructions. The Review brings the whole chapter together.

## You should now be able to

- divide a segment into any number of equal parts without measuring;
- mark a segment of a given length on a ray;
- mark an angle of a given number of degrees;
- construct a triangle from three sides, from two sides and the included angle, and from
  two angles and the included side;
- construct a right-angled triangle from the hypotenuse and a side, and from a side and
  an acute angle;
- construct a rectangle from its side lengths;
- say which congruence test justifies each construction.
