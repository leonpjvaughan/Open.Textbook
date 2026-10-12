---
title: The sine rule
---

# The sine rule

In any triangle, a side and the angle opposite it form a pair. The sine rule says
the ratio of a side to the sine of its opposite angle is the same for all three
pairs:

$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$$

The letters match up: side $a$ is opposite angle $A$, and so on.

This is stated in most courses as something to use. Here is why it is true.

## Before you start

You need two things:

- **The sine ratio.** In a right-angled triangle,
  $\sin\theta = \dfrac{\text{opposite}}{\text{hypotenuse}}$.
- **How to rearrange a formula.** If $b\sin A = a\sin B$ then dividing both sides
  by $\sin A \sin B$ gives $\dfrac{b}{\sin B} = \dfrac{a}{\sin A}$.

## Predict first

Below is a triangle with a line dropped from the top corner straight down to the
base, at right angles.

**Before you move anything, predict:** as the top corner slides along the top, the
height of that line changes. Which of the two sides — $a$ or $b$ — grows when the
angle opposite it grows?

Write your prediction down, then test it. Watch what happens to the height.

:::figure sine-rule-perpendicular

## The proof

Take a triangle with corners $A$, $B$ and $C$. Write the side opposite $A$ as $a$,
opposite $B$ as $b$, and opposite $C$ as $c$.

**Drop a perpendicular.** From $C$, draw a line straight down to the side $AB$,
making a right angle where it lands. Call the place it lands $D$, and call the
length $CD$ the height $h$.

That line splits the triangle into two right-angled triangles, $ACD$ and $BCD$.
Both of them contain the same $h$, and that is the whole proof: two ways of writing
one length.

**In the left-hand triangle, $ACD$:**

- the hypotenuse is $AC$, which has length $b$;
- the side opposite angle $A$ is $CD$, which has length $h$.

So the sine ratio gives

$$\sin A = \frac{h}{b} \qquad\text{so}\qquad h = b \sin A$$

**In the right-hand triangle, $BCD$:**

- the hypotenuse is $BC$, which has length $a$;
- the side opposite angle $B$ is again $CD$, with length $h$.

So

$$\sin B = \frac{h}{a} \qquad\text{so}\qquad h = a \sin B$$

**Equate the two.** Both expressions equal the same height, so they equal each
other:

$$b \sin A = a \sin B$$

Divide both sides by $\sin A \sin B$:

$$\frac{b}{\sin B} = \frac{a}{\sin A}$$

That is two thirds of the sine rule. For the third ratio, do the same thing from a
different corner — drop the perpendicular from $B$ instead of $C$ — and you get
$\dfrac{c}{\sin C}$ equal to the other two. Nothing in the argument used the shape
of the triangle, so it holds for every triangle.

## Why the perpendicular is allowed to land where it does

In the triangle above, $D$ sits between $A$ and $B$. In an obtuse triangle it can
land outside the side, and the proof needs one extra fact: $\sin(180^\circ -
\theta) = \sin\theta$. An obtuse angle and its supplement have the same sine, so
the angle you measure inside the right-angled triangle gives the same sine as the
triangle's own angle, and the algebra is unchanged.

That is worth knowing rather than skipping, because a proof that only works for
acute triangles would not be a proof of the sine rule.

## Check your understanding

1. Use the rule to write down the ratio for the third pair, given
   $\dfrac{a}{\sin A} = \dfrac{b}{\sin B}$.
2. In a triangle, $a = 9$, $A = 40^\circ$ and $B = 65^\circ$. Which ratio would
   you use to find $b$?
3. Explain why the proof needs two right-angled triangles rather than one.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$ — all three are
   equal, so the third pair joins the chain.
2. $\dfrac{b}{\sin 65^\circ} = \dfrac{9}{\sin 40^\circ}$, so
   $b = \dfrac{9\sin 65^\circ}{\sin 40^\circ} \approx 12.7$.
3. One right-angled triangle gives the height in terms of one side and one angle.
   The rule relates *two* pairs, so the height has to be written twice and the two
   expressions set equal. Without the second triangle there is nothing to equate.
</details>
