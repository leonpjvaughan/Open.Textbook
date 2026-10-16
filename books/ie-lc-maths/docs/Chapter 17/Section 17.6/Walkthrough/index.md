---
title: 17.6 Constructions 16–22 — Learn
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.6'
section_title: Constructions 16–22
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 17.6 Constructions 16–22 — Learn

**Prerequisites:** Section 15.7 — constructions 1 to 6, the instruments, and the
perpendicular bisector; Section 17.4 — the tangent; Section 17.5 — the special points of a
triangle.

**Objectives:** carry out constructions 16 to 22 with a straight edge and compass; explain
why each one works.

By the end of this section you can set out a circle and a triangle from a drawing, and you
can say which theorem each construction rests on.

## The instruments, again

A construction is drawn, not measured. Use the straight edge for lines and the compass for
arcs. The compass opening must stay the same while you draw two arcs that are meant to
match. A protractor may be used where a construction calls for a given angle, and a ruler
where it calls for a given length.

## Construction 16: the circumcentre and circumcircle

Given the triangle $ABC$, construct the circle through its three vertices.

**Steps.**

1. Construct the perpendicular bisector of $AB$, using Construction 2.
2. Construct the perpendicular bisector of $BC$.
3. The two bisectors cross at $O$. That point is the circumcentre.
4. With centre $O$, draw the circle through $A$. It also passes through $B$ and $C$.

**Why it works.** The perpendicular bisectors of a triangle meet at one point, by
Proposition 17 from Section 17.5. That point is the same distance from all three vertices,
so the circle through $A$ passes through $B$ and $C$ as well.

## Construction 17: the incentre and incircle

Given the triangle $ABC$, construct the circle inside it that touches all three sides.

**Steps.**

1. Construct the bisector of the angle at $A$, using Construction 1.
2. Construct the bisector of the angle at $B$.
3. The two bisectors cross at $I$. That point is the incentre.
4. Drop the perpendicular from $I$ to one side, using Construction 3.
5. With centre $I$ and that perpendicular as radius, draw the circle. It touches all three
   sides.

**Why it works.** The angle bisectors of a triangle meet at one point, by Proposition 18.
That point is the same perpendicular distance from all three sides, so the circle touches
each side once.

## Construction 18: an angle of 60°, without a protractor

Given a ray from $A$, construct a ray that makes $60^\circ$ with it.

**Steps.**

1. With centre $A$, draw an arc that cuts the given ray at $B$.
2. With centre $B$, and the **same** compass opening, draw an arc that cuts the first arc
   at $C$.
3. Draw the ray $[AC$. The angle $\angle BAC$ is $60^\circ$.

**Why it works.** The two arcs were drawn with the same opening, so $|AB| = |AC| = |BC|$.
The triangle $ABC$ is equilateral, so its three angles are equal. They add to $180^\circ$,
so each one is $60^\circ$.

Bisecting this angle with Construction 1 gives $30^\circ$, and bisecting again gives
$15^\circ$.

## Construction 19: the tangent at a point on a circle

Given a circle with centre $O$ and a point $P$ on the circle, construct the tangent at $P$.

**Steps.**

1. Draw the radius $OP$.
2. Construct the line through $P$ perpendicular to $OP$, using Construction 4. That line
   is the tangent at $P$.

**Why it works.** A line through a point of a circle perpendicular to the radius at that
point is a tangent, by part 2 of Theorem 20. So the constructed line touches the circle at
$P$ and nowhere else.

## Construction 20: a parallelogram

Given two side lengths and the angle between them, construct the parallelogram.

**Steps.**

1. Draw the ray $[AB$ with the first side length.
2. At $A$, construct the given angle, using Construction 9. Mark the second side length
   along the new ray at $D$.
3. With centre $D$, draw an arc of radius $|AB|$. With centre $B$, draw an arc of radius
   $|AD|$. The two arcs cross at $C$.
4. Draw $BC$ and $DC$. The shape $ABCD$ is the parallelogram.

**Why it works.** By construction $|AB| = |DC|$ and $|AD| = |BC|$. A quadrilateral with
both pairs of opposite sides equal is a parallelogram, so the shape closes correctly and
the opposite sides are parallel.

## Construction 21: the centroid

Given the triangle $ABC$, construct its centroid.

**Steps.**

1. Construct the midpoint of $BC$, using Construction 2 or Construction 6.
2. Draw the median from $A$ to that midpoint.
3. Construct the midpoint of $AC$, and draw the median from $B$.
4. The two medians cross at $G$. That point is the centroid.

**Why it works.** The three medians of a triangle meet at one point, by Proposition 19. Two
medians are enough to find it, and the third passes through the same point.

## Construction 22: the orthocentre

Given the triangle $ABC$, construct its orthocentre.

**Steps.**

1. Construct the perpendicular from $A$ to $BC$, using Construction 3. That line is the
   altitude from $A$.
2. Construct the perpendicular from $B$ to $AC$.
3. The two altitudes cross at $H$. That point is the orthocentre.

**Why it works.** The three altitudes of a triangle meet at one point, by Proposition 20.
Two altitudes are enough to find it.

## Worked examples

**Example 1.** Describe how to construct an angle of $30^\circ$ without a protractor.

Construct an angle of $60^\circ$ by Construction 18, then bisect it by Construction 1. The
bisector cuts the $60^\circ$ angle into two angles of $30^\circ$.

**Example 2.** A triangle has a right angle at $A$. Where does Construction 22 put the
orthocentre, and how many altitudes must be drawn?

The altitude from $B$ is the side $BA$, because $AB$ is perpendicular to $AC$. The
altitude from $C$ is the side $CA$. The two meet at $A$, so the orthocentre is $A$. One
altitude is enough, because it meets the right angle at the vertex.

**Example 3.** A triangle has a right angle at $A$, and the hypotenuse is $BC$. Describe
the shortest construction for the circumcircle.

The circumcentre is the midpoint of the hypotenuse, so construct the perpendicular
bisector of $BC$ only. It meets $BC$ at its midpoint, which is the circumcentre. Draw the
circle with that centre through $B$.

**Example 4.** A student constructs the incentre of an equilateral triangle and the
centroid of the same triangle. What do they notice?

In an equilateral triangle the four special points are all the same point. The triangle is
symmetrical, so the median from a vertex is also the altitude and the angle bisector, and
the perpendicular bisector of the opposite side. Every set of lines meets at the centre of
the triangle.

> **Watch out.** The compass opening must stay the same while you draw the two arcs that
> are meant to match. Changing it between them breaks the equal distances the proof
> depends on.
>
> **Re-check:** after the construction, measure the two distances with the compass without
> changing the opening between the two checks. They must match.

## Progress check

Back to the chapter problem. The mason is ready to set out the window on the board. The
circle has centre $O$ and radius $25$ cm, and the triangular pane is $ABC$.

1. Name the construction the mason uses to draw the circle through $A$, $B$ and $C$, and
   write its steps.
2. The mason wants the tangent at a point $P$ of the rim. Name the construction and write
   its steps.
3. The design repeats every $60^\circ$ around the rim. Name the construction for the first
   $60^\circ$ angle, and say why it works.
4. Say which section proved each result the three constructions rely on.

## You should now be able to

- construct the circumcentre and the circumcircle of a triangle;
- construct the incentre and the incircle of a triangle;
- construct an angle of $60^\circ$ without a protractor or set square;
- construct the tangent at a point on a circle;
- construct a parallelogram from two sides and the angle between them;
- construct the centroid and the orthocentre of a triangle;
- explain why each construction works.
