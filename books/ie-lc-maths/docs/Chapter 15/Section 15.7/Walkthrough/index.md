---
title: 15.7 Constructions 1–6 — Learn
chapter: 15
chapter_title: 'Synthetic geometry: foundations'
section: '15.7'
section_title: Constructions 1–6
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 15.7 Constructions 1–6 — Learn

**Prerequisites:** Sections 15.2, 15.5 and 15.6 — angles, the isosceles triangle, and the
perpendicular bisector.

**Objectives:** use a straight edge and compass accurately; carry out constructions 1
to 6; explain why each construction works.

By the end of this section you can build a perpendicular, a bisector and a parallel line,
and you can say why the method is correct.

## The instruments

A construction is drawn with instruments, not measured. Each instrument has a fixed job.

- A **straight edge** draws a straight line through two marked points. It has no numbers
  on it.
- A **compass** draws a circle with a given centre, passing through a given point. It can
  also copy a length: put the point on one end of a segment, open the compass to the
  other end, and carry that opening elsewhere.
- A **ruler** measures a length and marks a point at a given distance along a ray.
- A **protractor** measures an angle and marks a ray at a given angle.
- **Set squares** draw right angles and the angles $30^\circ$, $45^\circ$ and $60^\circ$.

Constructions 1, 2, 4 and 5 use only the straight edge and the compass. That is the
strictest form, and it is the one to practise.

## Construction 1: bisect a given angle

Given the angle $\angle BAC$, construct the ray that cuts it into two equal parts.

**Steps.**

1. With centre $A$, draw an arc that cuts the arm $[AB$ at $P$ and the arm $[AC$ at $Q$.
2. With centre $P$, draw an arc. With centre $Q$, and the same compass opening, draw an
   arc that crosses the first one at $R$.
3. Draw the ray $[AR$. It bisects $\angle BAC$.

**Why it works.** The arc from $A$ gives $|AP| = |AQ|$. The two arcs from $P$ and $Q$,
drawn with the same compass opening, give $|PR| = |QR|$. The side $AR$ is common to both
triangles.

So $\triangle APR \cong \triangle AQR$ by SSS. The matching angles are
$|\angle PAR| = |\angle RAQ|$, so the ray $[AR$ bisects the angle.

## Construction 2: the perpendicular bisector of a segment

Given the segment $[AB]$, construct the line through its midpoint at a right angle to it.

**Steps.**

1. With centre $A$, open the compass to more than half of $|AB|$ and draw an arc on each
   side of $AB$.
2. With centre $B$, and the same compass opening, draw arcs that cut the first two at $P$
   and $Q$.
3. Draw the line $PQ$. It is the perpendicular bisector of $[AB]$.

**Why it works.** Both arcs were drawn with the same compass opening, so $|PA| = |PB|$ and
$|QA| = |QB|$.

Let $M$ be the point where $PQ$ meets $AB$. The triangles $APQ$ and $BPQ$ have $AP = BP$,
$AQ = BQ$ and $PQ$ common, so $\triangle APQ \cong \triangle BPQ$ by SSS. Therefore
$|\angle APQ| = |\angle BPQ|$.

Now compare $\triangle APM$ and $\triangle BPM$. They have $AP = BP$,
$|\angle APM| = |\angle BPM|$, and $PM$ common, so they are congruent by SAS. Therefore
$|AM| = |MB|$, so $M$ is the midpoint of $[AB]$.

The same congruence gives $|\angle AMP| = |\angle BMP|$. Those two angles sit on the
straight line $AB$, so they add to $180^\circ$. Equal angles that add to $180^\circ$ are
each $90^\circ$. So $PQ$ is perpendicular to $AB$ at its midpoint.

## Construction 4: a perpendicular through a point on the line

Given a line $l$ and a point $P$ on it, construct the line through $P$ perpendicular
to $l$.

**Steps.**

1. With centre $P$, draw an arc that cuts $l$ at $A$ and at $B$, one on each side of $P$.
2. With centres $A$ and $B$, and a compass opening greater than half of $|AB|$, draw two
   arcs that cross at $Q$.
3. Draw the line $PQ$. It is perpendicular to $l$.

**Why it works.** The arc from $P$ gives $|PA| = |PB|$, and the two arcs give
$|QA| = |QB|$. So both $P$ and $Q$ are the same distance from $A$ as from $B$.

By Property 2 of the perpendicular bisector from Section 15.6, every point that is the
same distance from $A$ as from $B$ lies on the perpendicular bisector of $[AB]$. So $PQ$
is the perpendicular bisector of $[AB]$, and it is perpendicular to $l$.

<!-- tier:h -->

## Construction 3: a perpendicular through a point off the line

Given a line $l$ and a point $P$ not on $l$, construct the line through $P$ perpendicular
to $l$.

**Steps.**

1. With centre $P$, draw an arc that cuts $l$ at $A$ and at $B$. Open the compass far
   enough to reach the line.
2. With centres $A$ and $B$, and the same compass opening, draw two arcs on the other
   side of $l$ that cross at $Q$.
3. Draw the line $PQ$. It is perpendicular to $l$.

**Why it works.** The arc from $P$ gives $|PA| = |PB|$. The arcs from $A$ and $B$ were
drawn with the same opening, so $|QA| = |QB|$. Both $P$ and $Q$ are the same distance from
$A$ as from $B$, so by Property 2 of the perpendicular bisector, the line $PQ$ is the
perpendicular bisector of $[AB]$. That makes it perpendicular to $l$.

<!-- /tier:h -->

## Construction 5: a parallel line through a point

Given a line $l$ and a point $P$ not on $l$, construct the line through $P$ parallel
to $l$.

**Steps.**

1. Draw any line through $P$ that meets $l$ at $Q$. This line is a transversal.
2. At $P$, copy the angle $\angle PQA$ so that the copy is on the opposite side of $PQ$
   from $A$. Call the new ray $PT$.
3. The line through $P$ and $T$ is parallel to $l$.

**Why it works.** The angles $\angle PQA$ and $\angle QPT$ are alternate angles, and the
construction makes them equal. By Theorem 3 part 1, equal alternate angles make the two
lines parallel. So the new line is parallel to $l$.

**Copying an angle.** To copy $\angle PQA$ at $P$: draw an arc from $Q$ that cuts $QP$ at
$S$ and $QA$ at $U$. Draw the same arc from $P$, cutting $PQ$ at $S'$. Open the compass to
the distance $|SU|$, then draw an arc from $S'$ that cuts the arc from $P$ at $T$. The ray
$PT$ makes the same angle with $PQ$ as $QA$ does.

## Construction 6: divide a segment into equal parts

Given the segment $[AB]$, divide it into three equal parts without measuring.

**Steps.**

1. Draw a ray from $A$ at any angle to $AB$.
2. With the compass, mark off three equal segments along the ray: $|AC_1| = |C_1C_2| =
   |C_2C_3|$. Use the same compass opening each time.
3. Draw the line $C_3B$.
4. Through $C_1$ and $C_2$, draw lines parallel to $C_3B$, using Construction 5. These
   lines meet $AB$ at $D_1$ and $D_2$.
5. The points $D_1$ and $D_2$ divide $[AB]$ into three equal parts.

**Why it works.** The three parallel lines cut off equal segments on the ray from $A$,
because the compass marked them equal. The equal-intercept result says that parallel
lines which cut off equal segments on one transversal cut off equal segments on any other
transversal. So they cut off equal segments on $AB$. That result is proved in
Section 16.4.

To divide $[AB]$ into **two** equal parts, use Construction 2: the perpendicular bisector
meets $AB$ at its midpoint.

## Worked examples

**Example 1.** Bisect an angle of $90^\circ$. What is each part?

Construction 1 gives two equal parts:

$$90^\circ \div 2 = 45^\circ.$$

**Example 2.** A segment has length $21$ cm. It is divided into three equal parts by
Construction 6. Find the length of each part.

$$21 \div 3 = 7 \text{ cm}.$$

**Example 3.** An angle of $60^\circ$ is bisected, and then each half is bisected again.
Find the four angles.

The first bisection gives two angles of $30^\circ$. The second bisection gives four angles
of

$$30^\circ \div 2 = 15^\circ.$$

**Example 4.** A student constructs a perpendicular bisector but changes the compass
opening between the arc from $A$ and the arc from $B$. Explain what goes wrong.

The proof needs $|PA| = |PB|$ and $|QA| = |QB|$, and those equalities come from the same
compass opening. If the opening changes, the points $P$ and $Q$ are not the same distance
from $A$ as from $B$, so the line $PQ$ is not the perpendicular bisector. The construction
gives some other line.

> **Watch out.** The compass opening must stay the same while you draw the two arcs that
> are meant to match. Changing it between the arcs breaks the equal distances the proof
> depends on.
>
> **Re-check:** after the construction, measure the two distances from $A$ and the two
> from $B$ with the compass, without changing the opening between the two checks. They
> must match.

## Progress check

Back to the chapter problem. The glazier marks a point $M$ on the base of the pane and
constructs the line through $M$ perpendicular to the base, to check the edge is straight.

1. Name the construction used, and write the three steps.
2. Say what the construction gives, in terms of a segment and its perpendicular bisector.
3. Say which section proved the property the construction relies on.

<!-- tier:h -->

4. The glazier now needs the perpendicular from the apex of the pane to the base. The
   apex is not on the base line. Name the construction, and say why the same property
   still applies.

<!-- /tier:h -->

## You should now be able to

- name the instruments and say what each one may do;
- bisect a given angle with a straight edge and compass;
- construct the perpendicular bisector of a segment;
- construct a perpendicular through a point on a line, and through a point off it;
- construct a parallel line through a given point;
- divide a segment into two or three equal parts without measuring;
- explain why each construction works.
