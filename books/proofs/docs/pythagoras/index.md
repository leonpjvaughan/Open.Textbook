---
title: Pythagoras' theorem
---

# Pythagoras' theorem

In a right-angled triangle, the square on the longest side is the sum of the
squares on the other two:

$$a^2 + b^2 = c^2$$

where $c$ is the side opposite the right angle.

This is one of the oldest results in mathematics and it has hundreds of proofs. The
one here needs no algebra at all — only a square drawn four times.

## Before you start

You need to know what a square is: four equal sides and four right angles. That is
the whole prerequisite, which is why this proof is the one to meet first.

## Predict first

Below, four copies of the same right-angled triangle are arranged inside a square,
leaving a tilted hole in the middle.

**Before you move anything, predict:** the tilted hole is a square. What is the
length of each of its sides? Then watch what happens to the hole as you change the
triangle.

:::figure pythagoras-rearrangement

## The proof

Take any right-angled triangle with the right angle between the sides $a$ and $b$,
and the hypotenuse $c$.

**Step 1: build a big square.** Arrange four copies of the triangle so that each
one sits with its hypotenuse facing inwards. The four triangles now form a large
square whose side is $a + b$.

Why is the outside shape a square, and not some other quadrilateral? Two reasons:

- All four outer sides have length $a + b$, because each is one $a$ and one $b$ end
  to end.
- Each corner of the outer shape is made of the triangle's two acute angles. Those
  two angles add to $90^\circ$, because the triangle's third angle is the right
  angle and all three add to $180^\circ$. So every corner is a right angle.

Four equal sides and four right angles: it is a square.

**Step 2: find the hole.** The four hypotenuses are the sides of the hole left in
the middle. They are all length $c$, and the hole's corners are right angles by the
same argument as above. So the hole is a square of area $c^2$.

**Step 3: count the same area two ways.**

The big square has side $a + b$, so its area is

$$(a + b)^2$$

And the big square is also made of the four triangles plus the hole. Each triangle
has area $\tfrac{1}{2}ab$, so the four of them have area

$$4 \times \tfrac{1}{2}ab = 2ab$$

Add the hole, which has area $c^2$:

$$(a + b)^2 = 2ab + c^2$$

**Step 4: expand and simplify.**

$$a^2 + 2ab + b^2 = 2ab + c^2$$

Subtract $2ab$ from both sides:

$$a^2 + b^2 = c^2$$

That is Pythagoras' theorem, and nothing in the argument used the particular
triangle, so it holds for every right-angled triangle.

## Check your understanding

1. State the area of the hole in terms of the triangle's sides, and say which side
   of the theorem you have used.
2. Explain why subtracting $2ab$ from both sides is allowed.
3. The proof needs the four triangles to be identical. Where is that used?

<details markdown="1">
<summary>Answers</summary>

1. The hole has area $c^2$, the square on the hypotenuse.
2. Both sides are equal to begin with, and subtracting the same amount from two
   equal quantities leaves them equal. It is the same as the step you would take
   solving an equation.
3. It gives all four hypotenuses the same length, so the hole's sides are equal;
   and it makes each corner the sum of the same two angles, so each is $90^\circ$.
   Without identical triangles the outer shape and the hole would not be squares,
   and there would be no areas to compare.
</details>

## A common error

Watch out for applying the theorem when the triangle has no right angle. The
statement names the hypotenuse, and a hypotenuse only exists opposite a right
angle. If there is no right angle, the relationship is different — the cosine rule
in a mathematics book, and the parallelogram rule when adding two forces.
