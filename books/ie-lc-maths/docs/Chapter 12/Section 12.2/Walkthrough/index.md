---
title: 12.2 Pythagoras' theorem — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.2'
section_title: Pythagoras' theorem
tier: F
refs:
- '2.3'
kind: walkthrough
---

# 12.2 Pythagoras' theorem — Learn

**Prerequisites:** Section 12.1 — the right triangle and its sides; squaring a number
and finding a square root; simplifying a surd.

**Objectives:** use Pythagoras' theorem to find a side of a right triangle; test whether
a triangle is right-angled; use the theorem in three dimensions.

By the end of this section you can find the third side of any right triangle and decide
whether a triangle contains a right angle.

## The theorem

> **Pythagoras' theorem.** In a right triangle, the square on the hypotenuse equals the
> sum of the squares on the other two sides.
> $$a^2 + b^2 = c^2$$
> where $c$ is the hypotenuse and $a$ and $b$ are the other two sides.

The hypotenuse is the side opposite the right angle, and it is always the longest side.

**Why it is true.** Take four copies of the right triangle and arrange them inside a
square of side $a + b$. The four triangles leave a tilted square hole of side $c$.

The big square has area $(a+b)^2$. The four triangles have total area $4 \times \tfrac12 ab
= 2ab$. The hole has area $c^2$. Adding the parts gives the whole:

$$(a+b)^2 = 2ab + c^2$$

Expanding the left side, $a^2 + 2ab + b^2 = 2ab + c^2$. The $2ab$ appears on both sides,
so $a^2 + b^2 = c^2$. That is the theorem.

## Finding the hypotenuse

Add the two squares, then take the square root.

**Example 1.** A right triangle has legs of $9$ cm and $12$ cm. Find the hypotenuse.

$$c^2 = 9^2 + 12^2 = 81 + 144 = 225$$

$$c = \sqrt{225} = 15 \text{ cm}$$

**Example 2.** A rectangle is $8$ m long and $6$ m wide. Find the length of a diagonal.

The diagonal $d$ is the hypotenuse of a right triangle with legs $8$ m and $6$ m.

$$d^2 = 8^2 + 6^2 = 64 + 36 = 100 \qquad d = 10 \text{ m}$$

## Finding a shorter side

Subtract the known square from the hypotenuse square.

**Example 3.** A right triangle has hypotenuse $13$ cm and one leg $5$ cm. Find the
other leg.

$$b^2 = 13^2 - 5^2 = 169 - 25 = 144 \qquad b = 12 \text{ cm}$$

**Example 4.** A right triangle has legs $5$ cm and $7$ cm. Find the hypotenuse, leaving
the answer as a surd.

$$c^2 = 25 + 49 = 74 \qquad c = \sqrt{74} \text{ cm}$$

$\sqrt{74}$ has no whole-number square root, so leave it as a surd. A decimal answer
would only be an approximation.

> **Watch out.** The hypotenuse is the side you **add** the two squares to find. When you
> are given the hypotenuse and one other side, you **subtract**.
>
> **Re-check:** find the hypotenuse first and mark it. If your answer for a "third side"
> is longer than the hypotenuse you were given, you added when you should have
> subtracted.

## The converse: testing for a right angle

The theorem works in reverse. If the squares of the two shorter sides add to the square
of the longest side, the triangle contains a right angle.

**Example 5.** A triangle has sides $7$ cm, $24$ cm and $25$ cm. Is it right-angled?

The longest side is $25$, so test it:

$$7^2 + 24^2 = 49 + 576 = 625 = 25^2$$

The two sides agree, so the triangle is right-angled. The right angle lies between the
sides of length $7$ cm and $24$ cm, which are the two shorter sides.

If the two sides did **not** agree, the triangle would have no right angle.

## Three dimensions

The theorem also finds a diagonal through a box. Use it twice.

**Example 6.** A box is $4$ m long, $3$ m wide and $12$ m high. Find the length of the
longest diagonal $D$.

First find the diagonal of the base:

$$d^2 = 4^2 + 3^2 = 25 \qquad d = 5 \text{ m}$$

Then use that diagonal with the height:

$$D^2 = 5^2 + 12^2 = 25 + 144 = 169 \qquad D = 13 \text{ m}$$

## Progress check

Back to the chapter problem. In Section 12.1 you found the horizontal distance from the
foot of the cliff to the marker buoy: $378.8$ m. The cliff is $60$ m high.

The direct distance from the Coast Guard station, at the top of the cliff, to the buoy
is the hypotenuse of a right triangle with legs $60$ m and $378.8$ m. Find it, correct to
one decimal place.

$$d^2 = 60^2 + 378.8^2$$

The direct distance must be longer than the horizontal distance, and only slightly
longer, because the cliff is small compared with the distance. Check that your answer
has that shape.

## You should now be able to

- state Pythagoras' theorem and identify the hypotenuse;
- find the hypotenuse by adding the two squares;
- find a shorter side by subtracting, and leave a surd answer exact;
- test whether a triangle is right-angled;
- find the space diagonal of a box by using the theorem twice.
