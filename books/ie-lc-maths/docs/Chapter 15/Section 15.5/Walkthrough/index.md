---
title: 15.5 The isosceles triangle and its converse — Learn
chapter: 15
chapter_title: 'Synthetic geometry: foundations'
section: '15.5'
section_title: The isosceles triangle and its converse
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 15.5 The isosceles triangle and its converse — Learn

**Prerequisites:** Sections 15.3 and 15.4 — congruent triangles and the angle sum.

**Objectives:** prove that the angles opposite the equal sides of an isosceles triangle
are equal, and prove the converse; compare sides and angles in a triangle; use the
triangle inequality.

By the end of this section you can use equal sides to find angles, and equal angles to
find sides.

## Three kinds of triangle

A triangle is **isosceles** when two of its sides are equal. It is **equilateral** when
all three sides are equal. It is **scalene** when no two sides are equal.

In an isosceles triangle the two equal sides meet at one vertex. That vertex is the
**apex**, and the side opposite it is the **base**. The two angles at the ends of the
base are the **base angles**.

## Theorem 2: the isosceles triangle

> **Theorem 2.** 
>
> 1. In an isosceles triangle the angles opposite the equal sides are equal.
> 2. Conversely, if two angles of a triangle are equal, then the triangle is isosceles.

**Proof of part 1.** Let $\triangle ABC$ have $|AB| = |AC|$. We compare the triangle with
itself, with the labels $B$ and $C$ exchanged. That is, we compare $\triangle ABC$ with
$\triangle ACB$.

- $|AB| = |AC|$, which is given.
- $|AC| = |AB|$, the same two sides the other way round.
- $|\angle A| = |\angle A|$, the same angle.

So $\triangle ABC \cong \triangle ACB$ by SAS. The congruence matches $B$ with $C$, so
$$|\angle B| = |\angle C|. \quad \blacksquare$$

**Proof of part 2.** Now suppose $|\angle B| = |\angle C|$. Compare $\triangle ABC$ with
$\triangle ACB$ again.

- $|\angle B| = |\angle C|$, which is given.
- $|\angle C| = |\angle B|$, the same two angles the other way round.
- $|BC| = |CB|$, the same side.

So $\triangle ABC \cong \triangle ACB$ by ASA. The congruence matches $A$ with $A$ and
$B$ with $C$, so $|AB| = |AC|$, and the triangle is isosceles. $\blacksquare$

**The alternative proof, and a corollary.** Let $D$ be the midpoint of the base $[BC]$,
so $|BD| = |DC|$. Then $\triangle ABD \cong \triangle ACD$ by SSS, because $|AB| = |AC|$
and $|AD|$ is common.

The congruence gives $|\angle BAD| = |\angle DAC|$ and $|\angle ADB| = |\angle ADC|$. The
angles $\angle ADB$ and $\angle ADC$ sit on the straight line $BC$, so they add to
$180^\circ$. Equal angles that add to $180^\circ$ are each $90^\circ$.

> **Corollary.** In an isosceles triangle, the line from the apex to the midpoint of the
> base bisects the angle at the apex and is perpendicular to the base.

## Theorem 7: comparing sides and angles

> **Theorem 7.**
>
> 1. In $\triangle ABC$, if $|AC| > |AB|$, then $|\angle ABC| > |\angle ACB|$.
> 2. Conversely, if $|\angle ABC| > |\angle ACB|$, then $|AC| > |AB|$.

In words: the greater side is opposite the greater angle, and the greater angle is
opposite the greater side.

**Proof of part 1.** Suppose $|AC| > |AB|$. Take the point $D$ on the segment $[AC]$ with
$|AD| = |AB|$. The Protractor Axiom lets us mark that distance.

The triangle $ABD$ is isosceles, so $|\angle ABD| = |\angle ADB|$ by Theorem 2 part 1.

The angle $\angle ADB$ is an exterior angle of the triangle $BDC$. By Theorem 6 it equals
the sum of the two interior opposite angles, so
$$|\angle ADB| = |\angle DBC| + |\angle BCD| > |\angle BCD| = |\angle ACB|.$$

The ray $BD$ lies inside the angle $\angle ABC$, so $|\angle ABD| < |\angle ABC|$. Putting
the pieces together,
$$|\angle ACB| < |\angle ADB| = |\angle ABD| < |\angle ABC|. \quad \blacksquare$$

**Proof of part 2.** This is a proof by contradiction. Suppose
$|\angle ABC| > |\angle ACB|$, and suppose for a moment that $|AC|$ is **not** greater
than $|AB|$. Then there are two cases.

- If $|AC| = |AB|$, the triangle is isosceles, so $|\angle ABC| = |\angle ACB|$ by
  Theorem 2 part 1. That contradicts the assumption.
- If $|AC| < |AB|$, then part 1 with the letters exchanged gives
  $|\angle ACB| > |\angle ABC|$. That also contradicts the assumption.

Neither case can happen, so $|AC| > |AB|$. $\blacksquare$

## Theorem 8: the triangle inequality

> **Theorem 8 (Triangle Inequality).** Two sides of a triangle are together greater than
> the third.

**Proof.** Let $\triangle ABC$ be any triangle. Choose the point $D$ on the ray $AB$,
beyond $B$, with $|BD| = |BC|$. Then
$$|AD| = |AB| + |BD| = |AB| + |BC|.$$

The point $B$ lies inside the angle $\angle ACD$, so $|\angle BCD| < |\angle ACD|$.

The triangle $BCD$ is isosceles, because $|BD| = |BC|$. So $|\angle BCD| = |\angle BDC|$
by Theorem 2 part 1. Since $B$ lies on the segment $AD$, the angle $\angle BDC$ is the
same as the angle $\angle ADC$, so
$$|\angle ADC| = |\angle BDC| = |\angle BCD| < |\angle ACD|.$$

In the triangle $ADC$, the greater angle is opposite the greater side, by Theorem 7
part 2. Since $|\angle ACD| > |\angle ADC|$, the side opposite $\angle ACD$ is longer:
$$|AD| > |AC|.$$

So $|AB| + |BC| > |AC|$. The same argument from either of the other two vertices gives
the other two inequalities. $\blacksquare$

## Worked examples

**Example 1.** An isosceles triangle has an apex angle of $100^\circ$. Find each base
angle.

The two base angles are equal, by Theorem 2 part 1. Let each be $x$.
$$100 + x + x = 180$$
$$2x = 80$$
$$x = 40^\circ$$

Each base angle is $40^\circ$.

**Example 2.** An isosceles triangle has a base angle of $55^\circ$. Find the apex angle.

The two base angles are equal, so both are $55^\circ$.
$$55 + 55 = 110 \qquad |\angle \text{apex}| = 180 - 110 = 70^\circ$$

**Example 3.** In $\triangle ABC$, $|\angle B| = |\angle C| = 68^\circ$. Show that the
triangle is isosceles.

Two angles are equal, so by Theorem 2 part 2 the sides opposite them are equal:
$$|AC| = |AB|.$$

The triangle is isosceles, with apex at $A$.

**Example 4.** In a triangle, $|\angle A| = 80^\circ$, $|\angle B| = 60^\circ$ and
$|\angle C| = 40^\circ$. Which side is longest?

The longest side is opposite the largest angle. The largest angle is $\angle A = 80^\circ$,
so the longest side is $BC$.

**Example 5.** An equilateral triangle has all three sides equal. Find each angle.

Two sides are equal, so the angles opposite them are equal, by Theorem 2 part 1. Repeating
the argument for each pair of sides, all three angles are equal. Let each be $x$.
$$3x = 180 \qquad x = 60^\circ$$

Each angle of an equilateral triangle is $60^\circ$.

> **Watch out.** In an isosceles triangle, the two equal angles are the **base angles**,
> not the apex angle. A student who writes $|\angle \text{apex}| = 55^\circ$ when a base
> angle is $55^\circ$ has paired the equal angles with the wrong vertex.
>
> **Re-check:** find the two equal sides first. The angles opposite those two sides are
> the equal pair, and the third angle is the odd one out.

## Progress check

Back to the chapter problem. The glazier's panel has a second pane, and it is isosceles.
The two equal sides meet at an apex angle of $100^\circ$.

1. Find each base angle, and say which theorem makes the two base angles equal.
2. The glazier draws the line from the apex to the midpoint of the base. Say what that
   line does to the apex angle, and what angle it makes with the base.
3. One side of the pane is $40$ cm. Say which other side is also $40$ cm, and why.

## You should now be able to

- say what isosceles, equilateral and scalene mean, and name the apex and the base;
- prove both parts of the isosceles triangle theorem;
- find the base angles from the apex angle, and the apex angle from a base angle;
- prove that the line from the apex to the midpoint of the base is perpendicular to the
  base;
- use the greater side and the greater angle together;
- use the triangle inequality to test whether three lengths can form a triangle.
