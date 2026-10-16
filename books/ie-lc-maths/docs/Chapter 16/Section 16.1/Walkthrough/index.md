---
title: 16.1 Quadrilaterals and parallelograms — Learn
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.1'
section_title: Quadrilaterals and parallelograms
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 16.1 Quadrilaterals and parallelograms — Learn

**Prerequisites:** Chapter 15 — the axioms, congruence, parallel lines and the angle sum
of a triangle.

**Objectives:** name the quadrilaterals; say what makes a parallelogram, a rectangle, a
rhombus and a square; prove that the opposite sides and opposite angles of a
parallelogram are equal.

By the end of this section you can name any quadrilateral on the page, and you can prove
what is true about a parallelogram.

## Polygons and quadrilaterals

A **polygon** is a closed chain of line segments laid end to end. The segments do not
cross, and no two of them make a straight angle. The segments are the **sides** of the
polygon, and the points where they meet are the **vertices**.

A polygon is **convex** when the segment joining any two of its points stays inside the
polygon. Every polygon in this chapter is convex. A **quadrilateral** is a polygon with
four vertices.

Two sides of a quadrilateral that do not meet are **opposite sides**. Two angles that do
not share a side are **opposite angles**. The other pairs are **adjacent**.

## The named quadrilaterals

Four quadrilaterals have their own names. Each name is a definition, so it is a promise
about the shape.

| Shape | Definition |
|---|---|
| **Rectangle** | a quadrilateral with a right angle at all four vertices |
| **Rhombus** | a quadrilateral with all four sides equal |
| **Square** | a rectangle that is also a rhombus |
| **Parallelogram** | a quadrilateral in which both pairs of opposite sides are parallel |

A polygon is **equilateral** when all its sides are equal. It is **regular** when all its
sides and all its angles are equal. A square is a regular quadrilateral.

Two of these names overlap. A square is a rectangle, and a square is also a rhombus. A
rectangle need not be a rhombus, and a rhombus need not be a rectangle.

> **Proposition 3.** Every rectangle is a parallelogram.

**Proof.** Let $ABCD$ be a rectangle, so every angle is $90^\circ$. Extend the side $AB$
past $A$ to a point $E$.

The angles $\angle EAD$ and $\angle ADC$ are alternate angles at the transversal $AD$.
The angle $\angle EAD$ is supplementary to the right angle $\angle DAB$, so
$|\angle EAD| = 180^\circ - 90^\circ = 90^\circ$. And $|\angle ADC| = 90^\circ$, because
$ABCD$ is a rectangle.

The two alternate angles are equal, so $AB \parallel DC$ by Theorem 3 part 1. The same
argument with the side $AD$ gives $AD \parallel BC$. Both pairs of opposite sides are
parallel, so the rectangle is a parallelogram. $\blacksquare$

## Theorem 9: the parallelogram

> **Theorem 9.** In a parallelogram, opposite sides are equal, and opposite angles are
> equal.

**Proof.** Let $ABCD$ be a parallelogram, with $AB \parallel DC$ and $AD \parallel BC$.
Draw the diagonal $BD$.

The line $BD$ is a transversal of the parallel lines $AB$ and $DC$. The angles
$\angle ABD$ and $\angle BDC$ are alternate angles, so
$$|\angle ABD| = |\angle BDC|.$$

The same line $BD$ is a transversal of the parallel lines $AD$ and $BC$. The angles
$\angle ADB$ and $\angle DBC$ are alternate angles, so
$$|\angle ADB| = |\angle DBC|.$$

The side $BD$ is common to the two triangles $DAB$ and $BCD$. So the triangles have two
equal angles and the side between them equal, which is ASA. Therefore
$$\triangle DAB \cong \triangle BCD.$$

The matching parts of congruent triangles are equal. So
$$|AB| = |DC|, \qquad |AD| = |BC|, \qquad |\angle DAB| = |\angle BCD|.$$

That gives both pairs of opposite sides and one pair of opposite angles. For the other
pair, add the two angles at $B$ and the two angles at $D$. The Protractor Axiom lets us
add them:
$$|\angle ABC| = |\angle ABD| + |\angle DBC| = |\angle BDC| + |\angle ADB| = |\angle CDA|.$$

So both pairs of opposite angles are equal. $\blacksquare$

> **Corollary 1.** A diagonal divides a parallelogram into two congruent triangles.

The proof is the congruence in Theorem 9. The diagonal $BD$ gave
$\triangle DAB \cong \triangle BCD$, and the other diagonal does the same.

The proof of Theorem 9 uses three things: the alternate angles theorem, the ASA
congruence test, and the Protractor Axiom for adding the angles at $B$ and $D$.

## Two more facts about a parallelogram

Two angles that share a side are **consecutive angles**. In a parallelogram, consecutive
angles are supplementary.

> **Consecutive angles.** In a parallelogram, two angles that share a side add to
> $180^\circ$.

**Proof.** Let $ABCD$ be a parallelogram, with $AD \parallel BC$ and $AB$ as transversal.
The angles $\angle DAB$ and $\angle ABC$ lie on the same side of the transversal, between
the two parallel lines. The alternate angle to $\angle DAB$ is supplementary to
$\angle ABC$, and the alternate angles are equal, so the two consecutive angles add to
$180^\circ$. The same argument works at every vertex. $\blacksquare$

## Worked examples

**Example 1.** In a parallelogram $ABCD$, $|AB| = 14$ cm. Find $|DC|$.

The sides $AB$ and $DC$ are opposite sides, so they are equal by Theorem 9.
$$|DC| = |AB| = 14 \text{ cm}.$$

**Example 2.** In a parallelogram $ABCD$, $|\angle A| = 68^\circ$. Find the other three
angles.

The angle $\angle C$ is opposite $\angle A$, so $|\angle C| = 68^\circ$ by Theorem 9.

The angles $\angle B$ and $\angle D$ are consecutive to $\angle A$, so each is
supplementary to it:
$$|\angle B| = |\angle D| = 180^\circ - 68^\circ = 112^\circ.$$

Check: $68 + 112 + 68 + 112 = 360$, which is the angle sum of the quadrilateral.

**Example 3.** A parallelogram has adjacent sides of $9$ cm and $7$ cm. Find its
perimeter.

Opposite sides are equal, so the four sides are $9$, $7$, $9$ and $7$ cm.
$$9 + 7 + 9 + 7 = 32 \text{ cm}.$$

**Example 4.** A rhombus has a side of $6$ cm. Find its perimeter.

A rhombus has all four sides equal, so the perimeter is $4 \times 6 = 24$ cm.

**Example 5.** A quadrilateral has two opposite sides of $8$ cm, and the other two
opposite sides of $11$ cm. Is it a parallelogram?

Not necessarily. Theorem 9 says that a parallelogram has opposite sides equal. The
converse is a different statement, and it is proved in Section 16.2. For now, the given
information matches what a parallelogram would show, but it does not yet prove one.

> **Watch out.** Opposite angles of a parallelogram are equal, and consecutive angles are
> supplementary. These are different pairs. A student who writes $68^\circ$ for all four
> angles has used the opposite-angle rule on the consecutive pairs as well.
>
> **Re-check:** find the two angles that share a side. Add them. If the total is not
> $180^\circ$, one of the four angles is wrong.

## Progress check

Back to the chapter problem. The plan of the field is a quadrilateral $ABCD$ with
$AB \parallel DC$ and $AD \parallel BC$. The plan marks $|AB| = 60$ m and
$|BC| = 25$ m, and the corner at $B$ is a right angle.

1. Name the shape of the field, using the definition from this section.
2. Find $|DC|$ and $|AD|$, and say which theorem you used.
3. Find the other three angles of the field.
4. The corner at $B$ is a right angle. Say what the field is called, and which
   proposition from this section tells you.

Keep the four angles and the two side lengths. Section 16.5 uses them to find the
diagonal.

## You should now be able to

- say what a polygon, a convex polygon and a quadrilateral are;
- name opposite sides, opposite angles and adjacent sides;
- state the definitions of a rectangle, a rhombus, a square and a parallelogram;
- prove that every rectangle is a parallelogram;
- prove that the opposite sides and opposite angles of a parallelogram are equal;
- use a diagonal to split a parallelogram into two congruent triangles;
- find the angles of a parallelogram from one angle.
