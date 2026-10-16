---
title: 20.8 The theorem of Pythagoras as a theorem — Learn
chapter: 20
chapter_title: Synthetic geometry, constructions and proof
section: '20.8'
section_title: The theorem of Pythagoras as a theorem
tier: O
refs:
- GT.3
kind: walkthrough
---

# 20.8 The theorem of Pythagoras as a theorem — Learn

**Prerequisites:** the square of a number and its square root, the triangle angle
sum from Section 20.3, and similar triangles from Section 20.7.

**Objectives:** state Pythagoras' theorem; prove it with similar triangles; prove
its converse; use the theorem and the converse to solve problems.

By the end of this section you can state the theorem, prove it, and use both the
theorem and its converse.

## The theorem

In a right-angled triangle, the side opposite the right angle is the
**hypotenuse**. It is the longest side.

**Theorem.** In a right-angled triangle, the square of the hypotenuse equals the
sum of the squares of the other two sides.

If the two shorter sides are $a$ and $b$, and the hypotenuse is $c$, then

$$a^2+b^2=c^2$$

You have used this result before. Here is why it is true.

:::prove pythagoras

## The proof

Take a right-angled triangle $ABC$ with the right angle at $B$. The hypotenuse is
$AC$.

Draw the perpendicular from $B$ to the hypotenuse, meeting it at $D$. So $BD$ is
at a right angle to $AC$.

Now compare the two smaller triangles with the whole triangle.

**Triangles $ABC$ and $ADB$.** They share the angle at $A$. Both have a right
angle: the angle at $B$ in the whole triangle, and the angle at $D$ in the small
one. Two equal angles make the triangles similar by the AA test.

Matching sides of similar triangles are in the same ratio, so

$$\frac{|AC|}{|AB|}=\frac{|AB|}{|AD|}$$

Cross-multiply:

$$|AB|^2=|AC|\times|AD|$$

**Triangles $ABC$ and $BDC$.** In the same way, they share the angle at $C$ and
both have a right angle, so they are similar. Matching sides give

$$\frac{|AC|}{|BC|}=\frac{|BC|}{|DC|}$$

so

$$|BC|^2=|AC|\times|DC|$$

**Add the two results.**

$$|AB|^2+|BC|^2=|AC|\times|AD|+|AC|\times|DC|$$

$$|AB|^2+|BC|^2=|AC|\times(|AD|+|DC|)$$

The point $D$ lies on $AC$, so $|AD|+|DC|=|AC|$. Therefore

$$|AB|^2+|BC|^2=|AC|^2$$

The square of the hypotenuse equals the sum of the squares of the other two
sides. That is Pythagoras' theorem.

## Using the theorem

**Example 1.** A right-angled triangle has legs of 6 cm and 8 cm. Find the
hypotenuse.

$$6^2+8^2=36+64=100 \qquad \sqrt{100}=10$$

The hypotenuse is **10 cm**.

**Example 2.** A right-angled triangle has a hypotenuse of 25 cm and one leg of
24 cm. Find the other leg.

$$25^2-24^2=625-576=49 \qquad \sqrt{49}=7$$

The other leg is **7 cm**.

Notice the subtraction. When you are given the hypotenuse and one leg, you
subtract to find the other leg.

**Example 3.** A rectangle is 9 m by 12 m. Find the length of a diagonal.

A diagonal is the hypotenuse of a right-angled triangle with legs 9 m and 12 m.

$$9^2+12^2=81+144=225 \qquad \sqrt{225}=15$$

The diagonal is **15 m**.

## The converse

The converse is the other direction. It starts from the equation and reaches the
right angle.

**Theorem (converse).** If the square of one side of a triangle equals the sum of
the squares of the other two sides, the angle opposite the first side is a right
angle.

**Proof.** Take a triangle with sides $a$, $b$ and $c$, where $a^2+b^2=c^2$.

Construct a second triangle with a right angle between two sides of length $a$ and
$b$. By Pythagoras' theorem, the hypotenuse of this new triangle has length $c$.

The two triangles have three pairs of equal sides: $a$, $b$ and $c$. So they are
congruent by SSS. Matching angles give the angle opposite $c$ equal to the right
angle in the new triangle. That angle is 90°.

**Example 4.** A triangle has sides of 8 cm, 15 cm and 17 cm. Decide whether it is
right-angled.

$$8^2+15^2=64+225=289 \qquad 17^2=289$$

The two values match, so by the converse of Pythagoras the triangle is
right-angled.

**Example 5.** A triangle has sides of 4 cm, 5 cm and 6 cm. Decide whether it is
right-angled.

$$4^2+5^2=16+25=41 \qquad 6^2=36$$

The two values are different, so the triangle is not right-angled.

## RHS, and Pythagorean triples

The congruence test RHS needs Pythagoras. In a right-angled triangle, the theorem
finds the third side from the hypotenuse and one other side. So if two right-angled
triangles have equal hypotenuses and one equal side, their third sides are equal,
and SSS makes them congruent.

A **Pythagorean triple** is a set of three whole numbers that fit $a^2+b^2=c^2$.
The best known are 3, 4, 5; 5, 12, 13; 8, 15, 17; and 7, 24, 25.

**Example 6.** Show that 7, 24 and 25 form a Pythagorean triple.

$$7^2+24^2=49+576=625 \qquad 25^2=625$$

The two values match, so 7, 24 and 25 form a triple.

> **Watch out.** The hypotenuse is always opposite the right angle, and it is
> always the longest side. Identify it before you substitute. Add the squares to
> find the hypotenuse; subtract to find a leg. A common error is to subtract when
> the hypotenuse is the side you are looking for.

## Progress check

Back to the chapter problem. You began this chapter asking why the angles of a
triangle add to 180°. In this section you used that result to prove another
theorem, because the similar triangles need equal angles.

Write one sentence saying which earlier result the proof of Pythagoras depends on.
This is how the tower of geometry is built: each level stands on the level below.

## You should now be able to

- state Pythagoras' theorem and name the hypotenuse;
- prove the theorem using similar triangles;
- use the theorem to find a hypotenuse or a leg;
- prove and use the converse of the theorem;
- explain why RHS is a valid congruence test;
- recognise a Pythagorean triple.
