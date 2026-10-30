---
title: 16.2 Corollaries of the parallelogram theorems — Learn
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.2'
section_title: Corollaries of the parallelogram theorems
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 16.2 Corollaries of the parallelogram theorems — Learn

**Prerequisites:** Section 16.1 — the definitions of the quadrilaterals, and Theorem 9.

**Objectives:** use the converses of Theorem 9; prove that a rhombus is a parallelogram;
prove that the diagonals of a parallelogram bisect one another, and use the converse.

By the end of this section you can decide whether a quadrilateral is a parallelogram from
its sides, its angles or its diagonals.

## The angle sum of a quadrilateral

Before the converses, we need one more fact.

> **The angle sum of a quadrilateral.** The four angles of a quadrilateral add to
> $360^\circ$.

**Proof.** Let $ABCD$ be a quadrilateral. Draw the diagonal $AC$. It splits the
quadrilateral into the two triangles $ABC$ and $ACD$.

The angles of each triangle add to $180^\circ$, by Theorem 4. The six angles of the two
triangles are the four angles of the quadrilateral, with the two parts of $\angle A$ and
the two parts of $\angle C$ counted separately. Adding the two triangles gives

$$|\angle A| + |\angle B| + |\angle C| + |\angle D| = 180^\circ + 180^\circ = 360^\circ.
\quad \blacksquare$$

## The two converses of Theorem 9

A true statement can have more than one valid converse. Theorem 9 has two.

> **Converse 1 of Theorem 9.** If the opposite angles of a convex quadrilateral are
> equal, then it is a parallelogram.

**Proof.** Let $ABCD$ be a convex quadrilateral with $|\angle A| = |\angle C|$ and
$|\angle B| = |\angle D|$.

The four angles add to $360^\circ$, so

$$|\angle A| + |\angle B| + |\angle C| + |\angle D| = 360^\circ.$$

Substitute the two equalities:

$$2|\angle A| + 2|\angle B| = 360^\circ, \qquad |\angle A| + |\angle B| = 180^\circ.$$

The angles $\angle A$ and $\angle B$ lie on the same side of the transversal $AB$, between
the lines $AD$ and $BC$. They add to $180^\circ$, so the alternate angles at the
transversal are equal, and $AD \parallel BC$ by Theorem 3 part 1.

The same argument with $|\angle A| + |\angle D| = 180^\circ$ gives $AB \parallel DC$. Both
pairs of opposite sides are parallel, so $ABCD$ is a parallelogram. $\blacksquare$

> **Converse 2 of Theorem 9.** If the opposite sides of a convex quadrilateral are equal,
> then it is a parallelogram.

**Proof.** Let $ABCD$ be a convex quadrilateral with $|AB| = |DC|$ and $|AD| = |BC|$.
Draw the diagonal $BD$.

The triangles $DAB$ and $BCD$ have three pairs of equal sides:

- $|AB| = |DC|$, which is given;
- $|AD| = |BC|$, which is given;
- $|BD| = |DB|$, the same side.

So $\triangle DAB \cong \triangle BCD$ by SSS.

The congruence gives $|\angle ABD| = |\angle BDC|$. Those are alternate angles at the
transversal $BD$, so $AB \parallel DC$ by Theorem 3 part 1. It also gives
$|\angle ADB| = |\angle DBC|$, so $AD \parallel BC$.

Both pairs of opposite sides are parallel, so $ABCD$ is a parallelogram. $\blacksquare$

## One pair is enough

> **Proposition 4.** A quadrilateral in which one pair of opposite sides is equal and
> parallel is a parallelogram.

**Proof.** Let $ABCD$ be a quadrilateral with $|AB| = |DC|$ and $AB \parallel DC$. Draw
the diagonal $BD$.

The angles $\angle ABD$ and $\angle BDC$ are alternate angles at the parallel lines $AB$
and $DC$, so they are equal.

The triangles $DAB$ and $BCD$ have $|AB| = |DC|$, the angle $\angle ABD = \angle BDC$, and
the side $BD$ common. So $\triangle DAB \cong \triangle BCD$ by SAS.

The congruence gives $|\angle ADB| = |\angle DBC|$, so $AD \parallel BC$ by Theorem 3
part 1. Both pairs of opposite sides are parallel, so $ABCD$ is a parallelogram.
$\blacksquare$

> **Proposition 5.** Every rhombus is a parallelogram.

**Proof.** A rhombus has all four sides equal, so $|AB| = |DC|$ and $|AD| = |BC|$. Both
pairs of opposite sides are equal, so the rhombus is a parallelogram by Converse 2 of
Theorem 9. $\blacksquare$

## Theorem 10: the diagonals

> **Theorem 10.** The diagonals of a parallelogram bisect one another.

**Proof.** Let $ABCD$ be a parallelogram, with $AD \parallel BC$. Let the diagonals $AC$
and $BD$ meet at $E$.

The angles $\angle EAD$ and $\angle ECB$ are alternate angles at the parallel lines $AD$
and $BC$, so they are equal. The angles $\angle EDA$ and $\angle EBC$ are also alternate
angles at the same parallel lines, so they are equal.

The sides $AD$ and $BC$ are opposite sides of the parallelogram, so $|AD| = |BC|$ by
Theorem 9.

The triangles $ADE$ and $CBE$ have two equal angles and the side between them equal, so

$$\triangle ADE \cong \triangle CBE \quad \text{by ASA.}$$

Therefore $|AE| = |EC|$ and $|DE| = |EB|$. The point $E$ is the midpoint of both
diagonals, so the diagonals bisect one another. $\blacksquare$

> **Proposition 6 (Converse).** If the diagonals of a quadrilateral bisect one another,
> then the quadrilateral is a parallelogram.

**Proof.** Let $ABCD$ be a quadrilateral whose diagonals $AC$ and $BD$ meet at $E$, with
$|AE| = |EC|$ and $|BE| = |ED|$.

The angles $\angle AEB$ and $\angle CED$ are vertically opposite, so they are equal by
Theorem 1. The triangles $AEB$ and $CED$ have $|AE| = |EC|$, the equal angle, and
$|BE| = |ED|$, so they are congruent by SAS.

Therefore $|\angle EAB| = |\angle ECD|$. These are alternate angles at the transversal
$AC$, so $AB \parallel DC$.

The same argument with the triangles $AED$ and $CEB$ gives $AD \parallel BC$. Both pairs
of opposite sides are parallel, so $ABCD$ is a parallelogram. $\blacksquare$

## A corollary for the rhombus

> **Corollary.** The diagonals of a rhombus are perpendicular.

**Proof.** A rhombus is a parallelogram by Proposition 5, so its diagonals bisect one
another at a point $E$, by Theorem 10. Let the rhombus be $ABCD$.

The triangles $ABE$ and $ADE$ have $|AB| = |AD|$, because all four sides of a rhombus are
equal, and $|BE| = |DE|$, because the diagonals bisect one another. The side $AE$ is
common. So $\triangle ABE \cong \triangle ADE$ by SSS.

The congruence gives $|\angle AEB| = |\angle AED|$. Those two angles sit on the straight
line $BD$, so they add to $180^\circ$. Equal angles that add to $180^\circ$ are each
$90^\circ$. So the diagonals are perpendicular. $\blacksquare$

## Worked examples

**Example 1.** A quadrilateral $ABCD$ has $|\angle A| = |\angle C| = 100^\circ$ and
$|\angle B| = |\angle D| = 80^\circ$. Is it a parallelogram?

The opposite angles are equal, so it is a parallelogram by Converse 1 of Theorem 9.
Check the consecutive angles: $100 + 80 = 180$, which agrees.

**Example 2.** A quadrilateral has sides of $7$, $9$, $7$ and $9$ cm, in order. Is it a
parallelogram?

The opposite sides are equal, so it is a parallelogram by Converse 2 of Theorem 9.

**Example 3.** A quadrilateral $ABCD$ has $|AB| = |DC| = 12$ cm, and
$AB \parallel DC$. Is it a parallelogram?

One pair of opposite sides is equal and parallel, so it is a parallelogram by
Proposition 4. The other pair of sides must also be equal and parallel, by Theorem 9.

**Example 4.** The diagonals of a parallelogram meet at $E$. Given $|AE| = 5$ cm and
$|BE| = 4$ cm, find $|EC|$ and $|ED|$.

The diagonals bisect one another, by Theorem 10. So $E$ is the midpoint of both
diagonals:

$$|EC| = |AE| = 5 \text{ cm}, \qquad |ED| = |BE| = 4 \text{ cm}.$$

**Example 5.** A quadrilateral has diagonals of $10$ cm and $8$ cm that bisect one
another. Is it a parallelogram?

The diagonals bisect one another, so it is a parallelogram by Proposition 6. Each half of
the first diagonal is $5$ cm, and each half of the second is $4$ cm.

> **Watch out.** A true statement can have a false converse. It is true that the diagonals
> of a rhombus are perpendicular, but it is not true that a quadrilateral with
> perpendicular diagonals is a rhombus. A kite has perpendicular diagonals and is not a
> rhombus, because a rhombus needs all four sides equal.
>
> **Re-check:** before you use a converse, name the property you have been given. Then
> check that the property appears in the converse. A rhombus gives perpendicular
> diagonals, but perpendicular diagonals do not give a rhombus.

## Progress check

Back to the chapter problem. The surveyor is checking the plan of the field, the
quadrilateral $ABCD$ with $|AB| = 60$ m and $|BC| = 25$ m.

1. The surveyor measures $|DC| = 60$ m, and finds that $AB \parallel DC$. Which
   proposition makes the field a parallelogram?
2. The diagonals of the field meet at $E$. Write down what Theorem 10 says about $|AE|$
   and $|EC|$.
3. A second plot has opposite sides of $60$, $25$, $60$ and $25$ m. Which converse makes
   it a parallelogram?
4. The surveyor checks a third plot and finds its diagonals are perpendicular. Can the
   surveyor conclude that the plot is a rhombus? Explain.

Keep the answers. Section 16.5 uses the diagonals of the field.

## You should now be able to

- prove that the angles of a quadrilateral add to $360^\circ$;
- use both converses of Theorem 9;
- use Proposition 4, where one pair of opposite sides is equal and parallel;
- prove that every rhombus is a parallelogram;
- prove that the diagonals of a parallelogram bisect one another;
- use the converse, where bisecting diagonals make a parallelogram;
- prove that the diagonals of a rhombus are perpendicular;
- explain why a true statement can have a false converse.
