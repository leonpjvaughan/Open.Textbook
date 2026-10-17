---
title: 2.3 Quadratic functions, the discriminant and completing the square — Practise with help
chapter: 2
chapter_title: Algebra and functions
section: '2.3'
section_title: Quadratic functions, the discriminant and completing the square
refs:
- B3
kind: guided-problems
---

# 2.3 Quadratic functions, the discriminant and completing the square — Practise with help

Work each one first, closed book. Before you begin, decide which form of the
quadratic the question is asking for: expanded, factorised, or completed square.

## Warm-up: remember

1. Expand $(x + 5)^2$.
2. Factorise $x^2 - 9x + 20$.
3. Work out the value of $x^2 - 4x + 1$ when $x = 3$.

<details markdown="1">
<summary>Answers</summary>

1. $(x + 5)^2 = x^2 + 10x + 25$.
2. $x^2 - 9x + 20 = (x - 4)(x - 5)$.
3. $3^2 - 4 \times 3 + 1 = 9 - 12 + 1 = -2$.

If question 2 was hard, revisit factorising a quadratic with a negative middle
term: look for two numbers that multiply to $20$ and add to $-9$.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Write $x^2 + 10x + 3$ in completed-square form.

<details markdown="1">
<summary>Hint</summary>

The coefficient of $x$ is $10$. Half of it is $5$, so the bracket is
$(x + 5)^2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Expand $(x + 5)^2 = x^2 + 10x + 25$, then subtract the extra $25$ and add the
original $3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(x + 5)^2 = x^2 + 10x + 25.
$$

The original has $+3$ where the square has $+25$, so subtract the difference:

$$
x^2 + 10x + 3 = (x + 5)^2 - 22.
$$
</details>

**2.** Write $x^2 - 8x + 1$ in completed-square form and state the minimum value.

<details markdown="1">
<summary>Hint</summary>

Half of $-8$ is $-4$, so the bracket is $(x - 4)^2$. The minimum is the constant
left at the end.
</details>

<details markdown="1">
<summary>Next step</summary>

Expand $(x - 4)^2 = x^2 - 8x + 16$, then adjust the constant from $16$ down to
$1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(x - 4)^2 = x^2 - 8x + 16,
$$

so

$$
x^2 - 8x + 1 = (x - 4)^2 - 15.
$$

A square is never negative, so the minimum value is $-15$, reached when
$x = 4$.
</details>

**3.** Work out the discriminant of $x^2 + 3x + 7$ and state how many real roots
the equation $x^2 + 3x + 7 = 0$ has.

<details markdown="1">
<summary>Hint</summary>

The discriminant is $b^2 - 4ac$. Here $a = 1$, $b = 3$ and $c = 7$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $3^2 - 4 \times 1 \times 7$ and look at its sign.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\Delta = 3^2 - 4 \times 1 \times 7 = 9 - 28 = -19.
$$

The discriminant is negative, so the equation has no real roots. The parabola
never meets the $x$-axis.
</details>

**4.** The equation $x^2 - 12x + k = 0$ has a repeated root. Find $k$.

<details markdown="1">
<summary>Hint</summary>

A repeated root means the discriminant is zero. Set $b^2 - 4ac = 0$ with
$a = 1$, $b = -12$ and $c = k$.
</details>

<details markdown="1">
<summary>Next step</summary>

Solve $144 - 4k = 0$ for $k$.
</details>

<details markdown="1">
<summary>Full working</summary>

Set the discriminant to zero:

$$
(-12)^2 - 4 \times 1 \times k = 0.
$$

So

$$
144 - 4k = 0, \qquad 4k = 144, \qquad k = 36.
$$

Check: $x^2 - 12x + 36 = (x - 6)^2$, which has the repeated root $x = 6$.
</details>

**5.** Find the coordinates of the vertex of $y = 2x^2 + 8x + 1$.

<details markdown="1">
<summary>Hint</summary>

Take the factor $2$ out of the first two terms before completing the square.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $2x^2 + 8x + 1 = 2\left(x^2 + 4x\right) + 1$, then complete the square for
$x^2 + 4x$.
</details>

<details markdown="1">
<summary>Full working</summary>

Take out the factor $2$:

$$
2x^2 + 8x + 1 = 2\left(x^2 + 4x\right) + 1.
$$

Complete the square inside the bracket:

$$
x^2 + 4x = (x + 2)^2 - 4.
$$

Substitute back and multiply the $-4$ by $2$:

$$
2\left((x + 2)^2 - 4\right) + 1 = 2(x + 2)^2 - 8 + 1 = 2(x + 2)^2 - 7.
$$

The vertex is at $(-2, -7)$. Because $a = 2 > 0$, this is a minimum.
</details>

**6.** The graph of $y = x^2 - 4x + c$ touches the $x$-axis once. Find $c$ and
the point where it touches.

<details markdown="1">
<summary>Hint</summary>

"Touches the $x$-axis once" is another way of saying "has a repeated root", so
the discriminant is zero.
</details>

<details markdown="1">
<summary>Next step</summary>

Solve $(-4)^2 - 4c = 0$ for $c$.
</details>

<details markdown="1">
<summary>Full working</summary>

A repeated root needs a zero discriminant:

$$
(-4)^2 - 4 \times 1 \times c = 0, \qquad 16 - 4c = 0, \qquad c = 4.
$$

Then

$$
y = x^2 - 4x + 4 = (x - 2)^2,
$$

so the curve touches the $x$-axis at $(2, 0)$.
</details>
