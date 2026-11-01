---
title: 16.5 Pythagoras' theorem proved — Learn
chapter: 16
chapter_title: 'Synthetic geometry: quadrilaterals, similarity and area'
section: '16.5'
section_title: Pythagoras' theorem proved
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 16.5 Pythagoras' theorem proved — Learn

**Prerequisites:** Sections 16.1 to 16.3 — the parallelogram theorems and similar
triangles. The right angle and the hypotenuse from Section 15.6.

**Objectives:** prove Pythagoras' theorem from similar triangles; use the theorem to find
a side; prove and use the converse; use the RHS congruence test.

By the end of this section you can prove the theorem you have used since Chapter 12, and
you can use it to decide whether an angle is a right angle.

## The right-angled triangle

A triangle is **right-angled** when one of its angles is a right angle. The side opposite
the right angle is the **hypotenuse**, and it is the longest side.

The two acute angles of a right-angled triangle add to $90^\circ$, because the three
angles add to $180^\circ$. That was proved in Section 15.6.

## Theorem 14: Pythagoras

> **Theorem 14 (Pythagoras).** In a right-angled triangle, the square of the hypotenuse is
> the sum of the squares of the other two sides.

In symbols, if the right angle is at $B$, then

$$|AC|^2 = |AB|^2 + |BC|^2.$$

There is a second proof of this theorem, by cutting up four copies of the triangle and
rearranging them. It is in the shared proof book.

:::prove pythagoras

**Proof from similar triangles.** Let $\triangle ABC$ have a right angle at $B$. Draw the
perpendicular from $B$ to the hypotenuse $AC$, and let it meet $AC$ at $D$.

The triangles $ABC$ and $ADB$ both have a right angle, and they share the angle at $A$.
So they are similar by the AA rule:

$$\triangle ABC \sim \triangle ADB.$$

By Theorem 13, the corresponding sides are proportional. The hypotenuse $AC$ of the large
triangle matches the side $AB$ of the small triangle, and the side $AB$ matches the side
$AD$:

$$\frac{|AC|}{|AB|} = \frac{|AB|}{|AD|}.$$

Multiply both sides by $|AB| \times |AD|$:

$$|AB|^2 = |AC| \times |AD|.$$

Call this the first equation. The same argument at the vertex $C$ gives

$$\triangle ABC \sim \triangle BDC,$$

so

$$\frac{|AC|}{|BC|} = \frac{|BC|}{|DC|}, \qquad |BC|^2 = |AC| \times |DC|.$$

Call this the second equation. Add the two equations:

$$|AB|^2 + |BC|^2 = |AC| \times |AD| + |AC| \times |DC|.$$

Take out the common factor $|AC|$:

$$|AB|^2 + |BC|^2 = |AC| \times (|AD| + |DC|).$$

The point $D$ lies between $A$ and $C$, so $|AD| + |DC| = |AC|$. Therefore

$$|AB|^2 + |BC|^2 = |AC| \times |AC| = |AC|^2. \quad \blacksquare$$

The proof uses three things: the AA rule for similar triangles, the proportionality of
their sides, and the fact that a point on a segment splits it into two parts that add to
the whole.

## Theorem 15: the converse

> **Theorem 15 (Converse to Pythagoras).** If the square of one side of a triangle is the
> sum of the squares of the other two, then the angle opposite the first side is a right
> angle.

**Proof.** Let $\triangle ABC$ have $|AC|^2 = |AB|^2 + |BC|^2$. We prove that
$|\angle ABC| = 90^\circ$.

Draw a ray from $B$ perpendicular to $BC$, and mark the point $D$ on it with
$|BD| = |AB|$.

The triangle $DBC$ has a right angle at $B$, so Pythagoras gives

$$|DC|^2 = |BD|^2 + |BC|^2.$$

Substitute $|BD| = |AB|$:

$$|DC|^2 = |AB|^2 + |BC|^2.$$

The hypothesis says the right-hand side is $|AC|^2$, so $|DC|^2 = |AC|^2$ and therefore
$|DC| = |AC|$.

Now compare $\triangle ABC$ and $\triangle DBC$:

- $|AC| = |DC|$, from the line above;
- $|AB| = |BD|$, by the construction;
- $|BC|$ is common to both triangles.

So $\triangle ABC \cong \triangle DBC$ by SSS. The matching angles are equal, so

$$|\angle ABC| = |\angle DBC| = 90^\circ. \quad \blacksquare$$

## Proposition 9: the RHS test

> **Proposition 9 (RHS).** If two right-angled triangles have equal hypotenuses and one
> other pair of equal sides, then they are congruent.

**Proof.** Let the two triangles have right angles at $B$ and $B'$, with
$|AC| = |A'C'|$ and $|AB| = |A'B'|$.

Apply Pythagoras to each triangle:

$$|BC|^2 = |AC|^2 - |AB|^2, \qquad |B'C'|^2 = |A'C'|^2 - |A'B'|^2.$$

The two right-hand sides are equal, because $|AC| = |A'C'|$ and $|AB| = |A'B'|$. So
$|BC|^2 = |B'C'|^2$, and therefore $|BC| = |B'C'|$.

All three pairs of sides are equal, so the triangles are congruent by SSS. $\blacksquare$

The letters of RHS name the three matching parts: a **R**ight angle, the **H**ypotenuse,
and one other **S**ide.

## Worked examples

**Example 1.** A right-angled triangle has legs of $9$ cm and $12$ cm. Find the
hypotenuse.

The hypotenuse $h$ is opposite the right angle, so

$$h^2 = 9^2 + 12^2 = 81 + 144 = 225.$$

$$h = \sqrt{225} = 15 \text{ cm}.$$

**Example 2.** A right-angled triangle has a hypotenuse of $13$ cm and one leg of $5$ cm.
Find the other leg $b$.

The unknown side is a leg, so it is found by subtraction:

$$b^2 = 13^2 - 5^2 = 169 - 25 = 144.$$

$$b = \sqrt{144} = 12 \text{ cm}.$$

**Example 3.** A triangle has sides of $6$ cm, $8$ cm and $10$ cm. Is it right-angled?

The longest side is $10$ cm, so it would be the hypotenuse. Test the converse:

$$6^2 + 8^2 = 36 + 64 = 100 = 10^2.$$

The sum of the squares of the two shorter sides equals the square of the longest side, so
the triangle is right-angled. The right angle is opposite the $10$ cm side.

**Example 4.** A ladder $5$ m long leans against a vertical wall. Its foot is $3$ m from
the base of the wall. How far up the wall does the ladder reach?

The wall, the ground and the ladder make a right-angled triangle, with the ladder as the
hypotenuse and the height up the wall $h$.

$$h^2 = 5^2 - 3^2 = 25 - 9 = 16, \qquad h = 4 \text{ m}.$$

The ladder reaches $4$ m up the wall.

**Example 5.** The field of the chapter problem has sides of $60$ m and $25$ m, with a
right angle between them. Find the diagonal.

$$|AC|^2 = 60^2 + 25^2 = 3600 + 625 = 4225.$$

$$|AC| = \sqrt{4225} = 65 \text{ m}.$$

The diagonal is $65$ m.

> **Watch out.** Pythagoras' theorem works only in a right-angled triangle, and the
> hypotenuse is always the side opposite the right angle. A student who adds the squares
> of the hypotenuse and a leg has used the theorem in the wrong direction.
>
> **Re-check:** find the right angle first, and mark the side opposite it. That side is
> the hypotenuse, and it is the longest. If the side you are finding is longer than both
> given sides, add. If it is shorter, subtract.

## Progress check

Back to the chapter problem. This is where the first prediction is checked.

The field is the rectangle $ABCD$ with $|AB| = 60$ m, $|BC| = 25$ m, and a right angle at
$B$. The diagonal from $A$ to $C$ is the fence line.

1. Write down the three sides of the right-angled triangle $ABC$, and name the
   hypotenuse.
2. Apply Pythagoras' theorem to find $|AC|^2$.
3. Find $|AC|$.
4. Compare $|AC|$ with the prediction you wrote at the start of the chapter. If they
   differ, find the error in the prediction.

Keep the diagonal. Section 16.6 finds the area of the field.

## You should now be able to

- name the hypotenuse, and say why it is the longest side;
- prove Pythagoras' theorem from similar triangles;
- find the hypotenuse, and find a leg;
- use the converse to test whether a triangle is right-angled;
- prove the converse;
- use the RHS congruence test;
- apply the theorem to a real object such as a ladder or a field.
