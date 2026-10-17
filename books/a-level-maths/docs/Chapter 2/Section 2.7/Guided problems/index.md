---
title: 2.7 Polynomials, the factor theorem and algebraic division — Practise with help
chapter: 2
chapter_title: Algebra and functions
section: '2.7'
section_title: Polynomials, the factor theorem and algebraic division
refs:
- B6
kind: guided-problems
---

# 2.7 Polynomials, the factor theorem and algebraic division — Practise with help

Work each one first, closed book. For a cubic, the constant term tells you which
whole numbers are worth trying as roots: only factors of the constant term can
work.

## Warm-up: remember

1. Expand $(x - 3)(x^2 + 2x + 1)$.
2. Factorise $x^2 - 2x - 8$.
3. Work out the value of $x^2 + 3x - 4$ when $x = -1$.

<details markdown="1">
<summary>Answers</summary>

1. $(x - 3)(x^2 + 2x + 1) = x^3 + 2x^2 + x - 3x^2 - 6x - 3 = x^3 - x^2 - 5x - 3$.
2. $x^2 - 2x - 8 = (x - 4)(x + 2)$.
3. $(-1)^2 + 3 \times (-1) - 4 = 1 - 3 - 4 = -6$.

If question 1 was hard, revisit expanding two brackets: multiply every term in
the first bracket by every term in the second.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Use the remainder theorem to find the remainder when
$p(x) = x^3 + 3x^2 - 2x + 4$ is divided by $x - 1$.

<details markdown="1">
<summary>Hint</summary>

The divisor is $x - 1$, so substitute $x = 1$ into $p(x)$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $1^3 + 3 \times 1^2 - 2 \times 1 + 4$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
p(1) = 1 + 3 - 2 + 4 = 6.
$$

The remainder is $6$. Since the remainder is not zero, $x - 1$ is not a factor.
</details>

**2.** Show that $x - 3$ is a factor of $x^3 - 2x^2 - 5x + 6$.

<details markdown="1">
<summary>Hint</summary>

Substitute $x = 3$ and show that the value is zero.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $3^3 - 2 \times 3^2 - 5 \times 3 + 6$ term by term.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
p(3) = 27 - 18 - 15 + 6 = 0.
$$

Since $p(3) = 0$, the factor theorem gives that $x - 3$ is a factor.
</details>

**3.** Divide $x^3 + x^2 - 4x - 4$ by $x + 1$.

<details markdown="1">
<summary>Hint</summary>

The quotient is a quadratic. Try the form $x^2 + bx + c$ and match the terms
after multiplying back.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $(x + 1)(x^2 + c)$ by expanding and comparing the constant terms. The
constant here is $-4$, and $1 \times c$ must give it.
</details>

<details markdown="1">
<summary>Full working</summary>

Look for a quotient $x^2 - 4$, since $1 \times (-4) = -4$ gives the constant.
Check by expanding:

$$
(x + 1)(x^2 - 4) = x^3 - 4x + x^2 - 4 = x^3 + x^2 - 4x - 4.
$$

The quotient is $x^2 - 4$ and the remainder is $0$, so $x + 1$ is a factor.
</details>

**4.** Factorise $x^3 - 3x^2 - 4x + 12$ completely.

<details markdown="1">
<summary>Hint</summary>

The constant term is $12$. Try small factors: $1$, $-1$, $2$, $-2$, $3$. Find one
that gives zero.
</details>

<details markdown="1">
<summary>Next step</summary>

$p(2) = 8 - 12 - 8 + 12 = 0$, so $x - 2$ is a factor. Divide to get a quadratic.
</details>

<details markdown="1">
<summary>Full working</summary>

$p(2) = 0$, so $x - 2$ is a factor. Divide:

$$
x^3 - 3x^2 - 4x + 12 = (x - 2)(x^2 - x - 6).
$$

Factorise the quadratic:

$$
x^2 - x - 6 = (x - 3)(x + 2).
$$

So

$$
x^3 - 3x^2 - 4x + 12 = (x - 2)(x - 3)(x + 2).
$$
</details>

**5.** Find the values of $k$ for which $x - 1$ is a factor of
$x^3 + kx^2 - 3x + 2$.

<details markdown="1">
<summary>Hint</summary>

A factor gives a zero remainder, so substitute $x = 1$ and set the result to
zero.
</details>

<details markdown="1">
<summary>Next step</summary>

$p(1) = 1 + k - 3 + 2 = k$. Set $k = 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

Substitute $x = 1$:

$$
p(1) = 1 + k - 3 + 2 = k.
$$

For $x - 1$ to be a factor, $p(1) = 0$, so

$$
k = 0.
$$

With $k = 0$, the polynomial is $x^3 - 3x + 2 = (x - 1)(x^2 + x - 2)$.
</details>

**6.** The polynomial $p(x) = x^3 - 6x^2 + 11x - 6$ has a root at $x = 1$.
Factorise $p(x)$ completely and state all three roots.

<details markdown="1">
<summary>Hint</summary>

Divide by $x - 1$ to leave a quadratic, then factorise the quadratic.
</details>

<details markdown="1">
<summary>Next step</summary>

Dividing gives $(x - 1)(x^2 - 5x + 6)$. Factorise $x^2 - 5x + 6$.
</details>

<details markdown="1">
<summary>Full working</summary>

Divide by the known factor:

$$
x^3 - 6x^2 + 11x - 6 = (x - 1)(x^2 - 5x + 6).
$$

Factorise the quadratic:

$$
x^2 - 5x + 6 = (x - 2)(x - 3).
$$

So $p(x) = (x - 1)(x - 2)(x - 3)$, and the roots are $x = 1$, $x = 2$ and
$x = 3$.
</details>
