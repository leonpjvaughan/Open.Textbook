---
title: 5.4 The Argand diagram and modulus — Learn
chapter: 5
chapter_title: Complex numbers
section: '5.4'
section_title: The Argand diagram and modulus
tier: O
refs:
- '4.4'
kind: walkthrough
---

# 5.4 The Argand diagram and modulus — Learn

**Prerequisites:** Section 5.3 — the conjugate; Pythagoras' theorem.

**Objectives:** plot a complex number on the Argand diagram; find a modulus; find the
distance between two complex numbers.

By the end of this section you can turn complex arithmetic into geometry, and read a
modulus off a diagram.

## Plotting a complex number

A complex number $a + bi$ carries two real numbers, so it can be drawn as a point with two
coordinates.

The **Argand diagram** is a plane with the real part on the horizontal axis — the **real
axis** — and the imaginary part on the vertical axis — the **imaginary axis**.

- $3 + 4i$ is the point $(3, 4)$;
- $-1 + 2i$ is the point $(-1, 2)$;
- $3i$ is the point $(0, 3)$, on the imaginary axis.

The Argand diagram is a Cartesian plane with different labels. Every fact you know about
coordinates applies.

:::figure argand-diagram

**Predict, then test.** Before you move the sliders, write down where you expect
$\bar z$ to be relative to $z$. Then move the number and watch the conjugate. Write down
the rule in one sentence, then move the number into a different quadrant and check that
the rule still holds. Finally, set the imaginary part to zero and describe what happens
to the modulus — and say why that answer makes sense.

## The modulus

The **modulus** of $z = a + bi$, written $|z|$, is its distance from the origin.

$$|z| = \sqrt{a^2 + b^2}$$

This is Pythagoras' theorem: $a$ across, $b$ up, and $|z|$ the hypotenuse.

**Example 1.** Find $|5 + 12i|$.

$$|5 + 12i| = \sqrt{25 + 144} = \sqrt{169} = 13$$

**Example 2.** Find $|2 - 2i|$.

$$|2 - 2i| = \sqrt{4 + 4} = \sqrt{8} = 2\sqrt{2}$$

Leave it as a surd unless the question asks for a decimal. $\sqrt{8}$ is correct but not
simplified; $2\sqrt{2}$ is.

The modulus is never negative, and it is zero only for $z = 0$. It is the complex
equivalent of "size", which is why it is written with the same bars as absolute value.

## The modulus and the conjugate

From Section 5.3, $z\bar z = a^2 + b^2$. Comparing with the formula for the modulus,

$$z\bar z = |z|^2$$

**Example 3.** For $z = 3 + 4i$, $z\bar z = 25$ and $|z| = 5$, and indeed $5^2 = 25$.

The modulus has one more useful property: **the modulus of a product is the product of
the moduli**.

$$|zw| = |z|\,|w|$$

**Example 4.** For $z = 3 + 4i$ and $w = 5 - 12i$, $|z| = 5$ and $|w| = 13$, so
$|zw| = 65$. Multiplying first gives $zw = 63 - 16i$, and
$|63 - 16i| = \sqrt{3969 + 256} = \sqrt{4225} = 65$. Both routes agree.

## Distance between two points

The distance between the points representing $z_1$ and $z_2$ is

$$|z_2 - z_1|$$

because subtracting moves $z_1$ to the origin and the modulus then measures the distance
from there.

**Example 5.** Find the distance between $1 + 2i$ and $4 + 6i$.

$$|(4 + 6i) - (1 + 2i)| = |3 + 4i| = 5$$

On the diagram the horizontal gap is $3$ and the vertical gap is $4$, so the distance is
the hypotenuse of a $3$-$4$-$5$ triangle. The algebra and the picture agree, as they must.

> **Watch out.** $|z|$ is a distance and is never negative, but the **imaginary part** can
> be. For $z = 3 - 4i$, $|z| = 5$ and $\operatorname{Im}(z) = -4$. Do not confuse the
> size of the number with the signed vertical coordinate.

## Progress check

Back to the chapter problem. The two complex roots are $1 + 2i$ and $1 - 2i$.

Plot all three roots of the cubic — $3$, $1 + 2i$ and $1 - 2i$ — on one Argand diagram.
Then find the distance between the two complex roots, and the modulus of each. The two
moduli should be equal, and the distance between the two points should be twice the
imaginary part. Say why both of those had to be true, given that the two roots are
conjugates.

## You should now be able to

- plot a complex number on the Argand diagram and read a point back as a complex number;
- find the modulus of a complex number, and simplify the surd;
- use $z\bar z = |z|^2$ and $|zw| = |z||w|$;
- find the distance between two points on the Argand diagram.
