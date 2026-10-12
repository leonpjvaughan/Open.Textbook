---
title: The cosine rule
---

# The cosine rule

For any triangle, with the side $a$ opposite the angle $A$:

$$a^2 = b^2 + c^2 - 2bc\cos A$$

It looks like Pythagoras' theorem with a correction on the end, and that is exactly
what it is.

## Before you start

You need **[Pythagoras' theorem](../pythagoras/index.md)** and the cosine ratio,
$\cos\theta = \dfrac{\text{adjacent}}{\text{hypotenuse}}$ in a right-angled
triangle.

## Predict first

**Before reading on, predict:** if $A = 90^\circ$, what does $\cos A$ equal, and
what does the rule become? Work that out first — the answer says why this is
Pythagoras with something added rather than a separate rule to memorise.

## The proof

Take a triangle with corners $A$, $B$ and $C$, and sides $a$, $b$, $c$ opposite
them. Suppose $A$ is acute for now; the last section deals with an obtuse $A$.

**Drop a perpendicular** from $C$ to the side $AB$, meeting it at $D$. Call the
height $h$, and call the length $AD$ the distance $x$.

That splits the triangle into two right-angled triangles, and the proof is
Pythagoras applied to each of them.

**In the left triangle, $ACD$:**

- the hypotenuse is $AC = b$;
- the adjacent side to angle $A$ is $AD = x$.

So the cosine ratio gives

$$\cos A = \frac{x}{b} \qquad\text{so}\qquad x = b\cos A$$

and Pythagoras gives

$$h^2 = b^2 - x^2$$

**In the right triangle, $BCD$:**

- the hypotenuse is $BC = a$;
- the vertical side is $h$;
- the horizontal side is $DB$, which is the whole of $AB$ minus $AD$, so $c - x$.

Pythagoras gives

$$a^2 = h^2 + (c - x)^2$$

**Substitute.** Replace $h^2$ with $b^2 - x^2$ and expand the bracket:

$$a^2 = (b^2 - x^2) + (c^2 - 2cx + x^2)$$

The $x^2$ terms cancel:

$$a^2 = b^2 + c^2 - 2cx$$

And $x = b\cos A$, so

$$a^2 = b^2 + c^2 - 2bc\cos A$$

which is the cosine rule.

## Why it becomes Pythagoras when the angle is right

When $A = 90^\circ$, the cosine of a right angle is $0$. The correction term
$-2bc\cos A$ is therefore zero, and what is left is

$$a^2 = b^2 + c^2$$

So Pythagoras' theorem is the case of the cosine rule where the angle happens to be
a right angle. Nothing new was needed for it; it falls out.

## The obtuse case, and why it works

If $A$ is obtuse the perpendicular from $C$ lands *outside* the side $AB$, so the
picture is different: the foot $D$ sits beyond $B$ rather than between $A$ and $B$.

The algebra still works, with two changes. The length $DB$ becomes $x - c$ rather
than $c - x$, and the angle you measure inside the right-angled triangle at $A$ is
$180^\circ - A$, whose cosine is $-\cos A$. Both changes flip a sign, and they flip
it in the same place, so the final statement is unchanged.

That is worth checking rather than assuming. A proof that quietly only covered acute
angles would not be a proof of the cosine rule, and the sign that looks like a
detail is the whole reason the rule is stated with a minus.

## Check your understanding

1. Use the rule with $A = 90^\circ$ to show it becomes Pythagoras' theorem.
2. In a triangle, $b = 7$, $c = 9$ and $A = 60^\circ$. Find $a$.
3. The rule is often rearranged to $\cos A = \dfrac{b^2 + c^2 - a^2}{2bc}$. What is
   that version for?

<details markdown="1">
<summary>Answers</summary>

1. $\cos 90^\circ = 0$, so $-2bc\cos A = 0$ and $a^2 = b^2 + c^2$.
2. $a^2 = 49 + 81 - 2(7)(9)(0.5) = 130 - 63 = 67$, so $a \approx 8.19$.
3. Finding an **angle** when all three sides are known. The original form gives a
   side from two sides and the angle between them; this form solves for the angle
   instead.
</details>

## A common error

Watch the angle you use. The rule needs the angle **between** the two sides you
know — the one opposite the side you are finding. Reaching for an angle that is not
between them is the most common way to get a wrong answer, and the rule gives no
warning: it will happily compute a number for the wrong triangle.
