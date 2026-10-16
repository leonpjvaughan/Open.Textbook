---
title: 20.6 Parallelograms and their corollaries — Learn
chapter: 20
chapter_title: Synthetic geometry, constructions and proof
section: '20.6'
section_title: Parallelograms and their corollaries
tier: O
refs:
- GT.3
kind: walkthrough
---

# 20.6 Parallelograms and their corollaries — Learn

**Prerequisites:** the congruence tests from Section 20.4, the triangle angle sum
from Section 20.3, and the alternate angles fact.

**Objectives:** prove that the opposite sides of a parallelogram are equal; prove
the corollaries about opposite angles and the diagonals; prove the converse.

By the end of this section you can find any side or angle of a parallelogram, and
you can prove the results that make it work.

## What a parallelogram is

A **parallelogram** is a quadrilateral with both pairs of opposite sides parallel.
Write the corners in order as $ABCD$. Then $AB$ is parallel to $DC$, and $AD$ is
parallel to $BC$.

A **diagonal** of a quadrilateral joins two opposite corners. A parallelogram has
two diagonals, $AC$ and $BD$.

The definition says nothing about the sides being equal. That is a theorem, and it
is the first one here.

## The opposite sides are equal

**Theorem 9.** In a parallelogram, the opposite sides are equal.

**Proof.** Let $ABCD$ be a parallelogram. Draw the diagonal $BD$.

Because $AB$ is parallel to $DC$, the alternate angles $\angle ABD$ and
$\angle BDC$ are equal. Because $AD$ is parallel to $BC$, the alternate angles
$\angle ADB$ and $\angle DBC$ are equal.

The diagonal $BD$ is common to the two triangles $DAB$ and $BCD$. Two angles and
the included side match, so the triangles are congruent by ASA.

Matching sides in congruent triangles are equal, so $|AB|=|CD|$ and $|AD|=|CB|$.
The opposite sides are equal.

**Example 1.** In a parallelogram, one side is 9 cm. Write down the length of the
opposite side.

**9 cm**, because opposite sides of a parallelogram are equal.

## The corollaries

A **corollary** is a result that follows quickly from a theorem already proved.
Three corollaries follow from Theorem 9.

**Corollary 1.** The opposite angles of a parallelogram are equal.

The same diagonal $BD$ splits the parallelogram into the congruent triangles
$DAB$ and $BCD$. Matching angles give $\angle A=\angle C$. Use the other diagonal
$AC$ in the same way to get $\angle B=\angle D$.

**Corollary 2.** Adjacent angles of a parallelogram add to 180°.

The sides $AB$ and $DC$ are parallel, and $AD$ is a transversal. The angles at $A$
and $D$ are interior angles on the same side of the transversal, so they add to
180°. The same argument works at every pair of adjacent corners.

**Corollary 3.** The angles of a parallelogram add to 360°.

Draw one diagonal. It splits the parallelogram into two triangles. Each triangle
has angles that add to 180°, so the four angles of the parallelogram add to
$2\times180=360°$. This argument works for every quadrilateral.

**Example 2.** In a parallelogram, one angle is 70°. Work out the opposite angle
and the angle next to it.

The opposite angle is **70°**, because opposite angles are equal. The angle next
to it is $180-70=110°$, because adjacent angles add to 180°.

## The diagonals bisect one another

**Theorem.** The diagonals of a parallelogram bisect one another.

**Proof.** Let the diagonals $AC$ and $BD$ meet at $E$.

Because $AD$ is parallel to $BC$, the alternate angles give
$\angle EAD=\angle ECB$ and $\angle EDA=\angle EBC$.

Opposite sides of a parallelogram are equal, so $|AD|=|BC|$.

Two angles and the included side match, so triangle $ADE$ is congruent to triangle
$CBE$ by ASA. Matching sides give $|AE|=|EC|$ and $|DE|=|EB|$. So $E$ is the
midpoint of each diagonal, and the diagonals bisect one another.

**Example 3.** A diagonal divides a parallelogram of area 48 cm² into two
triangles. Work out the area of one triangle.

$$48\div2=24$$

The area of one triangle is **24 cm²**. The diagonal makes two congruent
triangles, and congruent triangles have equal areas.

## The converse

**Theorem (converse).** If the opposite sides of a convex quadrilateral are
equal, the quadrilateral is a parallelogram.

**Proof.** Let $ABCD$ have $|AB|=|CD|$ and $|AD|=|CB|$. Draw the diagonal $BD$.

The triangles $ABD$ and $CDB$ have $|AB|=|CD|$, $|AD|=|CB|$, and the side $BD$
common. So they are congruent by SSS.

Matching angles give $\angle ABD=\angle BDC$. These are alternate angles, so $AB$
is parallel to $DC$. In the same way $AD$ is parallel to $BC$. The quadrilateral
is a parallelogram.

## Rhombuses and rectangles

A **rhombus** has four equal sides. Both pairs of opposite sides are equal, so by
the converse it is a parallelogram. Its diagonals bisect one another, and they
cross at a right angle.

A **rectangle** has four right angles. Its opposite sides are parallel, so it is a
parallelogram, and its diagonals are equal as well as bisecting one another.

> **Watch out.** The alternate angles in the proof come from the parallel sides,
> and the parallel sides come from the definition of a parallelogram. If you have
> not been told that the sides are parallel, do not use alternate angles. Check
> what the question gives you before you start, and draw the diagonal that makes
> the two triangles share a side.

## Progress check

Back to the chapter problem. In this section you proved that the angles of a
parallelogram add to 360°, by splitting it into two triangles whose angles add to
180° each.

Write one sentence explaining why that argument also proves that the angles of
*any* quadrilateral add to 360°. You are using the chapter's central result to
prove something new, which is how geometry is built.

## You should now be able to

- write down the opposite sides and opposite angles of a parallelogram;
- use the fact that adjacent angles add to 180°;
- prove that the opposite sides of a parallelogram are equal;
- prove that the diagonals bisect one another;
- prove the converse, from equal opposite sides to a parallelogram;
- explain why a rhombus and a rectangle are parallelograms.
