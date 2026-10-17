---
title: "5.2 Arithmetic with complex numbers — Practise with help"
chapter: 5
chapter_title: Complex numbers
section: "5.2"
section_title: Arithmetic with complex numbers
tier: O
refs:
- '4.4'
kind: guided-problems
---

# 5.2 Arithmetic with complex numbers — Practise with help

## Warm-up: remember

1. Expand $(x + 3)(x - 5)$.
2. Simplify $i^{21}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $x^2 - 2x - 15$.
2. $21 = 4 \times 5 + 1$, so $i^{21} = i$.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Work out $(4 + 3i) + (2 - 5i)$.

<details markdown="1">
<summary>Hint</summary>

Add the real parts, then the imaginary parts.

<details markdown="1">
<summary>Next step</summary>

$(4 + 2) + (3 - 5)i$.

<details markdown="1">
<summary>Full working</summary>

$$(4 + 3i) + (2 - 5i) = 6 - 2i$$

Nothing else happens — addition never mixes the two parts.

</details>
</details>
</details>

**2.** Work out $(6 - 2i) - (1 + 4i)$.

<details markdown="1">
<summary>Hint</summary>

Subtract the second bracket carefully, sign by sign.

<details markdown="1">
<summary>Next step</summary>

$(6 - 1) + (-2 - 4)i$.

<details markdown="1">
<summary>Full working</summary>

$$(6 - 2i) - (1 + 4i) = (6 - 1) + (-2 - 4)i = 5 - 6i$$

The commonest error is writing $-2 + 4$. Subtracting $+4i$ makes the imaginary part
$4$ more negative, not less.

</details>
</details>
</details>

**3.** Work out $(2 - 5i)(3 + i)$.

<details markdown="1">
<summary>Hint</summary>

Expand the brackets, then replace $i^2$ with $-1$.

<details markdown="1">
<summary>Next step</summary>

$6 + 2i - 15i - 5i^2$.

<details markdown="1">
<summary>Full working</summary>

$$(2 - 5i)(3 + i) = 6 + 2i - 15i - 5i^2 = 6 - 13i + 5 = 11 - 13i$$

$-5i^2$ became $+5$, because $i^2 = -1$.

</details>
</details>
</details>

**4.** Work out $(1 + i)^3$.

<details markdown="1">
<summary>Hint</summary>

Square first, then multiply by $(1 + i)$ again.

<details markdown="1">
<summary>Next step</summary>

$(1 + i)^2 = 1 + 2i + i^2 = 2i$.

<details markdown="1">
<summary>Full working</summary>

$$(1 + i)^2 = 2i \qquad (1 + i)^3 = 2i(1 + i) = 2i + 2i^2 = -2 + 2i$$

Working in two steps keeps the arithmetic small. Expanding all three brackets at once is
possible but easier to get wrong.

</details>
</details>
</details>

**5.** Find $x$ and $y$: $(2x - 1) + 4i = 5 + (y + 2)i$.

<details markdown="1">
<summary>Hint</summary>

Equate the real parts, then the imaginary parts.

<details markdown="1">
<summary>Next step</summary>

$2x - 1 = 5$ and $4 = y + 2$.

<details markdown="1">
<summary>Full working</summary>

Real parts: $2x - 1 = 5$, so $x = 3$.
Imaginary parts: $4 = y + 2$, so $y = 2$.

One complex equation gave two real equations, which is exactly what makes this technique
useful.

</details>
</details>
</details>

**6.** Show that $(3 + 2i)(1 - 4i)$ and $(3 - 2i)(1 + 4i)$ are conjugates of each other.

<details markdown="1">
<summary>Hint</summary>

Work out both products and compare.

<details markdown="1">
<summary>Next step</summary>

The first is $11 - 10i$. What is the second?

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
(3 + 2i)(1 - 4i) &= 11 - 10i \\
(3 - 2i)(1 + 4i) &= 3 + 12i - 2i - 8i^2 = 11 + 10i
\end{aligned}
$$

They are conjugates: same real part, opposite imaginary parts.

This is the rule $\overline{zw} = \bar z\,\bar w$ from Section 5.3 seen in action.
Conjugating a product is the same as conjugating both factors first.

</details>
</details>
</details>

## A question from Section 5.1

**7.** Solve $x^2 + 2x + 10 = 0$ and check your answers by substituting one back in.

<details markdown="1">
<summary>Hint</summary>

The discriminant is $4 - 40 = -36$.

<details markdown="1">
<summary>Next step</summary>

$x = \dfrac{-2 \pm 6i}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$x = \frac{-2 \pm \sqrt{-36}}{2} = \frac{-2 \pm 6i}{2} = -1 \pm 3i$$

Check $x = -1 + 3i$:

$$(-1 + 3i)^2 + 2(-1 + 3i) + 10 = (1 - 6i + 9i^2) - 2 + 6i + 10 = (1 - 9 - 2 + 10) + (-6i + 6i) = 0$$

The imaginary terms cancel and the real terms sum to zero. Substituting is always worth
doing when the roots are complex, because the cancellation is the check.

</details>
</details>
</details>
