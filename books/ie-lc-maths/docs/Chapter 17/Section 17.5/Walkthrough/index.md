---
title: 17.5 The special points of a triangle — Learn
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.5'
section_title: The special points of a triangle
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 17.5 The special points of a triangle — Learn

**Prerequisites:** Section 17.1 — the perpendicular bisector and the centre; Section 15.6
— the perpendicular bisector; Section 16.4 — similar triangles and the midpoint theorem.

**Objectives:** find the circumcentre, the incentre, the centroid and the orthocentre of a
triangle; say which lines meet at each one; use the right-angled triangle case.

By the end of this section you can name the four special points, build each one, and say
what it is for.

## Four sets of lines, four points

A triangle has four famous points inside or near it. Each one is the meeting place of
three lines, and each set of lines is different. That is the whole idea of the section.

| The lines | The point | What it is for |
|---|---|---|
| The perpendicular bisectors of the sides | the **circumcentre** | the centre of the circle through the three vertices |
| The bisectors of the angles | the **incentre** | the centre of the circle inside, touching all three sides |
| The lines from each vertex to the midpoint of the opposite side | the **centroid** | the balance point of the triangle |
| The lines from each vertex perpendicular to the opposite side | the **orthocentre** | the meeting point of the three heights |

The line from a vertex to the midpoint of the opposite side is a **median**. The line from
a vertex perpendicular to the opposite side is an **altitude**.

Three lines that meet at one point are **concurrent**. The four results below say that
each of the four sets is concurrent.

## Proposition 17: the circumcentre

> **Proposition 17.** The perpendicular bisectors of the three sides of a triangle meet at
> one point, the circumcentre. The circle with this point as centre, through the three
> vertices, is the circumcircle.

**Proof.** Let the triangle be $ABC$. The perpendicular bisector of a segment is the set
of points the same distance from its two ends, by Property 2 of the perpendicular
bisector.

Let the perpendicular bisectors of $AB$ and of $AC$ meet at $O$. The perpendicular
bisectors are not parallel, because $AB$ and $AC$ meet at $A$. So the point $O$ exists.

The point $O$ is on the perpendicular bisector of $AB$, so
$$|OA| = |OB|.$$

The point $O$ is on the perpendicular bisector of $AC$, so
$$|OA| = |OC|.$$

The two right-hand sides are equal, so $|OB| = |OC|$. That makes $O$ a point on the
perpendicular bisector of $BC$ as well. So all three perpendicular bisectors pass through
$O$. $\blacksquare$

## Proposition 18: the incentre

> **Proposition 18.** The bisectors of the three angles of a triangle meet at one point,
> the incentre. The circle with this point as centre, touching all three sides, is the
> incircle.

**Why it works.** A point on the bisector of an angle is the same perpendicular distance
from the two arms of the angle. To see this, drop the perpendiculars from the point to the
two arms. The two right-angled triangles have the bisected angle equal, a right angle
equal, and the bisector common, so they are congruent. The two perpendicular distances are
therefore equal.

Let the bisectors of the angles at $A$ and at $B$ meet at $I$. The point $I$ is the same
distance from $AB$ as from $AC$, and also the same distance from $BA$ as from $BC$. So
$I$ is the same distance from all three sides, and therefore it lies on the bisector of
the angle at $C$ too.

The circle with centre $I$ and that common distance as radius touches all three sides,
because the radius to each side is perpendicular to it. $\blacksquare$

## Proposition 19: the centroid

> **Proposition 19.** The three medians of a triangle meet at one point, the centroid.

**Proof.** Let $M$ be the midpoint of $BC$, let $N$ be the midpoint of $CA$, and let $P$
be the midpoint of $AB$. Let the medians $AM$ and $BN$ meet at $G$.

In the triangle $ABC$, the segment $MN$ joins the midpoints of $BC$ and $CA$. So $MN$ is
parallel to $BA$ and half its length, by the midpoint theorem.

The triangles $GAB$ and $GMN$ are similar. The angle at $G$ is common, and the angles at
$A$ and at $M$ are equal because $AB$ is parallel to $MN$. The ratio of the sides is
$$|AB| \div |MN| = 2,$$

so $|GA| = 2|GM|$. The centroid divides each median in the ratio $2:1$, with the longer
part next to the vertex.

Now let the median $CP$ meet the median $AM$ at $G'$. The same argument, with the
midpoints $M$ and $P$, gives $|G'A| = 2|G'M|$. So $G'$ divides $AM$ in the ratio $2:1$ as
well. There is only one point on $AM$ that divides it in that ratio, so $G' = G$. All
three medians pass through $G$. $\blacksquare$

## Proposition 20: the orthocentre

> **Proposition 20.** The three altitudes of a triangle meet at one point, the
> orthocentre.

**Proof.** Let the triangle be $ABC$. Through $A$ draw the line parallel to $BC$, through
$B$ the line parallel to $AC$, and through $C$ the line parallel to $AB$. The three lines
make a larger triangle $A'B'C'$.

The quadrilateral $ABCB'$ is a parallelogram, so $AB'$ is parallel to $BC$ and has the same
length. The quadrilateral $ACBC'$ is also a parallelogram, so $AC'$ is parallel to $BC$
and has the same length. Both $AB'$ and $AC'$ lie on the line through $A$ parallel to
$BC$, on opposite sides of $A$. So $A$ is the midpoint of $B'C'$.

The same argument shows that $B$ is the midpoint of $C'A'$, and $C$ is the midpoint of
$A'B'$. So the perpendicular bisector of $B'C'$ is the line through $A$ perpendicular to
$B'C'$. That line is the altitude of $ABC$ from $A$, because $B'C'$ is parallel to $BC$.

The three altitudes of $ABC$ are therefore the three perpendicular bisectors of
$A'B'C'$. By Proposition 17 the perpendicular bisectors of $A'B'C'$ meet at one point, so
the three altitudes of $ABC$ meet at one point. $\blacksquare$

## The right-angled triangle

A right-angled triangle is the case worth remembering.

> **Right-angled triangle.** If $ABC$ has a right angle at $A$, then the circumcentre is
> the midpoint of the hypotenuse $BC$, and the orthocentre is $A$.

**Why.** The angle at $A$ is a right angle, so $BC$ is a diameter of the circumcircle, by
Corollary 4. The centre of a circle is the midpoint of every diameter, so the circumcentre
is the midpoint of $BC$. The altitude from $B$ is the line $BA$, because $AB$ is
perpendicular to $AC$. The altitude from $C$ is the line $CA$. Those two altitudes meet at
$A$, so the orthocentre is $A$.

The median from the right angle to the hypotenuse is half the hypotenuse, because the
midpoint of the hypotenuse is the circumcentre, and every radius is the same length.

## Worked examples

**Example 1.** A triangle has vertices $A(0,0)$, $B(8,0)$ and $C(0,6)$. Find the
circumcentre and the circumradius.

The sides $AB$ and $AC$ lie along the axes, so they are perpendicular, and the angle at
$A$ is a right angle. The hypotenuse is $BC$.

The midpoint of $BC$ is
$$\left(\frac{8+0}{2}, \frac{0+6}{2}\right) = (4,3).$$

So the circumcentre is $(4,3)$. The circumradius is half of $|BC|$:
$$|BC| = \sqrt{8^2 + 6^2} = \sqrt{100} = 10,$$

so the circumradius is $5$.

**Example 2.** A triangle has sides $6$ cm, $8$ cm and $10$ cm. Find the circumradius and
say where the orthocentre lies.

The triangle is right-angled, because $6^2 + 8^2 = 36 + 64 = 100 = 10^2$. The hypotenuse
is the $10$ cm side, so the circumradius is $10 \div 2 = 5$ cm.

The orthocentre is the vertex of the right angle, the corner between the $6$ cm side and
the $8$ cm side.

**Example 3.** The sides of a triangle are $6$ cm, $8$ cm and $10$ cm. Find the radius of
the incircle.

The area of the right-angled triangle is
$$\tfrac12 \times 6 \times 8 = 24 \text{ cm}^2.$$

Join the incentre to each vertex. The triangle is split into three triangles, each with
height equal to the inradius $r$ and base equal to one side. Their areas add to the whole
area:
$$\tfrac12 r (6 + 8 + 10) = 24.$$

$$12r = 24$$

$$r = 2 \text{ cm}.$$

The incircle has radius $2$ cm.

**Example 4.** Name the point where each set of lines meets: the medians, the angle
bisectors, the altitudes.

The medians meet at the centroid. The angle bisectors meet at the incentre. The altitudes
meet at the orthocentre.

> **Watch out.** The four points come from four different sets of lines. The perpendicular
> bisectors give the circumcentre, and the angle bisectors give the incentre. A student who
> swaps them gets the wrong circle: the circumcircle passes through the vertices, and the
> incircle touches the sides.
>
> **Re-check:** ask what the circle does. If it passes through the corners, the point is
> the circumcentre. If it touches the sides, the point is the incentre.

## Progress check

Back to the chapter problem. The window contains the triangle $ABC$ with $|AB| = 30$ cm,
$|AC| = 40$ cm and $|BC| = 50$ cm. The angle at $A$ is a right angle, because
$30^2 + 40^2 = 50^2$.

1. Explain why the centre $O$ of the window is the circumcentre of the triangle $ABC$,
   and state the circumradius.
2. State where the orthocentre of the triangle is.
3. The mason wants to balance the triangular pane on a point. Which special point is
   that, and on which line does it lie?

## You should now be able to

- name the four special points and the four sets of lines;
- say that the perpendicular bisectors meet at the circumcentre;
- say that the angle bisectors meet at the incentre;
- prove that the medians meet at the centroid, using similar triangles;
- prove that the altitudes meet at the orthocentre;
- use the right-angled triangle case for the circumcentre and the orthocentre.
