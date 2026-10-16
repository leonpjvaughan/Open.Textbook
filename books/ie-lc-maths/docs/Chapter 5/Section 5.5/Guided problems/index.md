---
title: "5.5 Cubic equations and the conjugate root theorem — Practise with help"
chapter: 5
chapter_title: Complex numbers
section: "5.5"
section_title: Cubic equations and the conjugate root theorem
tier: H
refs:
- '4.4'
kind: guided-problems
---

# 5.5 Cubic equations and the conjugate root theorem — Practise with help

## Warm-up: remember

1. Solve $x^2 - 6x + 13 = 0$.
2. What is the sum of the roots of $x^3 - 4x^2 + x + 6 = 0$?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $x = 3 \pm 2i$ (discriminant $36 - 52 = -16$).
2. Sum $= -\dfrac{b}{a} = -\dfrac{-4}{1} = 4$.

</details>

## Practise with help

**1.** Show that $x = 2$ is a root of $x^3 - 4x^2 + x + 6 = 0$, and find the other two
roots.

<details markdown="1">
<summary>Hint</summary>

Substitute, then divide by $(x - 2)$.

<details markdown="1">
<summary>Next step</summary>

$8 - 16 + 2 + 6 = 0$. The quotient is $x^2 - 2x - 3$.

<details markdown="1">
<summary>Full working</summary>

$8 - 16 + 2 + 6 = 0$, so $x = 2$ is a root. Dividing leaves $x^2 - 2x - 3$, which
factorises as $(x - 3)(x + 1)$.

The three roots are $2$, $3$ and $-1$ — all real. A cubic does not have to have complex
roots; it has them only when the quadratic factor has a negative discriminant.

</details>
</details>
</details>

**2.** A cubic with real coefficients has $4 - i$ as one root. Write down another root.

<details markdown="1">
<summary>Hint</summary>

The conjugate root theorem.

<details markdown="1">
<summary>Next step</summary>

The conjugate of $4 - i$ is $4 + i$.

<details markdown="1">
<summary>Full working</summary>

$4 + i$ is also a root.

The coefficients are real, so the theorem applies. Complex roots of a real polynomial
come in conjugate pairs.

</details>
</details>
</details>

**3.** Find the quadratic with real coefficients whose roots are $2 \pm i$.

<details markdown="1">
<summary>Hint</summary>

Sum and product.

<details markdown="1">
<summary>Next step</summary>

Sum $= 4$, product $= 2^2 + 1^2 = 5$.

<details markdown="1">
<summary>Full working</summary>

$$x^2 - (\text{sum})x + \text{product} = x^2 - 4x + 5$$

Check by expanding $(x - 2 - i)(x - 2 + i) = (x - 2)^2 - i^2 = x^2 - 4x + 4 + 1 = x^2 - 4x + 5$.

The coefficients are real because the imaginary terms cancelled, which is what a conjugate
pair always does.

</details>
</details>
</details>

**4.** Solve $x^3 - 6x^2 + 13x - 10 = 0$.

<details markdown="1">
<summary>Hint</summary>

Try $x = 2$. Then divide and solve the quadratic.

<details markdown="1">
<summary>Next step</summary>

$8 - 24 + 26 - 10 = 0$. The quotient is $x^2 - 4x + 5$.

<details markdown="1">
<summary>Full working</summary>

$x = 2$ is a root. Dividing gives $x^2 - 4x + 5 = 0$:

$$x = \frac{4 \pm \sqrt{16 - 20}}{2} = \frac{4 \pm 2i}{2} = 2 \pm i$$

The roots are $2$, $2 + i$ and $2 - i$.

</details>
</details>
</details>

**5.** For $x^3 - 6x^2 + 13x - 10 = 0$, check the sum and the product of the roots
against the coefficients.

<details markdown="1">
<summary>Hint</summary>

Sum $= -b/a$, product $= -d/a$.

<details markdown="1">
<summary>Next step</summary>

$a = 1$, $b = -6$, $d = -10$.

<details markdown="1">
<summary>Full working</summary>

$$\text{sum} = -\frac{-6}{1} = 6 \qquad \text{product} = -\frac{-10}{1} = 10$$

Check: $2 + (2 + i) + (2 - i) = 6$, and $2(2 + i)(2 - i) = 2 \times 5 = 10$. Both agree.

The imaginary parts cancelled in both sums, as they must, because the sum and product of
a real cubic are real.

</details>
</details>
</details>

**6.** Explain why a real cubic cannot have exactly one complex root.

<details markdown="1">
<summary>Hint</summary>

How many roots has a cubic, and how do complex roots arrive?

<details markdown="1">
<summary>Next step</summary>

Complex roots come in conjugate pairs.

<details markdown="1">
<summary>Full working</summary>

By the conjugate root theorem, a non-real complex root forces its conjugate to be a root
too. So complex roots arrive in pairs.

A cubic has exactly three roots. If it had one complex root, it would have two (the root
and its conjugate), leaving one real root — and that is possible: one real root plus a
pair is exactly three. What is **not** possible is one complex root **alone**, with three
real roots as well, because that would be four roots.

So a real cubic has either three real roots, or one real root and a conjugate pair. It
cannot have one complex root by itself.

</details>
</details>
</details>

## A question from Section 5.4

**7.** The two complex roots of a real cubic are $1 \pm 2i$. Plot them on an Argand
diagram and find the distance between them.

<details markdown="1">
<summary>Hint</summary>

The distance is $|z_2 - z_1|$.

<details markdown="1">
<summary>Next step</summary>

$(1 + 2i) - (1 - 2i) = 4i$.

<details markdown="1">
<summary>Full working</summary>

The points are $(1, 2)$ and $(1, -2)$. The distance is

$$|(1 + 2i) - (1 - 2i)| = |4i| = 4$$

The two points are reflections in the real axis, so the distance between them is twice
the imaginary part, $2 \times 2 = 4$. Both roots have the same modulus,
$\sqrt{1 + 4} = \sqrt{5}$, because they are the same distance from the origin — another
consequence of being conjugates.

</details>
</details>
</details>
