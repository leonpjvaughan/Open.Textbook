---
title: 2.6 Linear and quadratic inequalities, and set notation — Practise with help
chapter: 2
chapter_title: Algebra and functions
section: '2.6'
section_title: Linear and quadratic inequalities, and set notation
refs:
- B5
kind: guided-problems
---

# 2.6 Linear and quadratic inequalities, and set notation — Practise with help

Work each one first, closed book. After every answer, test one number from your
solution set in the original inequality. The test takes a few seconds and catches
a reversed sign.

## Warm-up: remember

1. Solve $4x - 1 = 11$.
2. Factorise $x^2 - 5x + 4$.
3. Solve the equation $x^2 - 5x + 4 = 0$.

<details markdown="1">
<summary>Answers</summary>

1. $4x = 12$, so $x = 3$.
2. $x^2 - 5x + 4 = (x - 1)(x - 4)$.
3. From the factorisation, $x = 1$ or $x = 4$.

If question 3 was hard, revisit factorising: the roots of the equation are the
same numbers that appear in the brackets.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Solve $5x + 2 > 17$.

<details markdown="1">
<summary>Hint</summary>

Subtract $2$ from both sides, then divide by $5$. Both operations keep the
direction of the inequality.
</details>

<details markdown="1">
<summary>Next step</summary>

After subtracting, you have $5x > 15$. Now divide by the positive number $5$.
</details>

<details markdown="1">
<summary>Full working</summary>

Subtract $2$:

$$
5x > 15.
$$

Divide by $5$:

$$
x > 3.
$$

The solution set is $x \in (3, \infty)$. Check with $x = 4$: $5 \times 4 + 2 = 22 > 17$.
</details>

**2.** Solve $-3x \leq 12$.

<details markdown="1">
<summary>Hint</summary>

Dividing by $-3$ reverses the direction of the inequality. Use a test value to
check.
</details>

<details markdown="1">
<summary>Next step</summary>

Divide both sides by $-3$ and turn $\leq$ into $\geq$.
</details>

<details markdown="1">
<summary>Full working</summary>

Divide by $-3$, reversing the sign:

$$
x \geq -4.
$$

The solution set is $x \in [-4, \infty)$. Check with $x = 0$: $-3 \times 0 = 0 \leq 12$,
which is true, and $0 \geq -4$ is also true.
</details>

**3.** Solve $x^2 - 4x - 5 < 0$.

<details markdown="1">
<summary>Hint</summary>

Find the roots first, then sketch the parabola. The coefficient of $x^2$ is
positive, so it opens upwards.
</details>

<details markdown="1">
<summary>Next step</summary>

Factorise $x^2 - 4x - 5 = (x - 5)(x + 1)$ to get the roots $x = -1$ and $x = 5$.
</details>

<details markdown="1">
<summary>Full working</summary>

Factorise:

$$
x^2 - 4x - 5 = (x - 5)(x + 1),
$$

so the parabola crosses the $x$-axis at $x = -1$ and $x = 5$. It opens upwards,
so it is below the axis between the roots. The inequality asks for $< 0$:

$$
-1 < x < 5.
$$

The solution set is $x \in (-1, 5)$.
</details>

**4.** Solve $x^2 \geq 16$.

<details markdown="1">
<summary>Hint</summary>

Rearrange to $x^2 - 16 \geq 0$ and factorise a difference of two squares. The
answer has two pieces.
</details>

<details markdown="1">
<summary>Next step</summary>

$(x - 4)(x + 4) \geq 0$. The parabola is positive outside the roots, so write the
answer as a union.
</details>

<details markdown="1">
<summary>Full working</summary>

Rearrange and factorise:

$$
x^2 - 16 \geq 0, \qquad (x - 4)(x + 4) \geq 0.
$$

The parabola opens upwards and the inequality includes zero, so the solution is
outside the roots:

$$
x \leq -4 \quad \text{or} \quad x \geq 4.
$$

In set notation, $x \in (-\infty, -4] \cup [4, \infty)$.
</details>

**5.** Solve $2x^2 + 3x - 2 \leq 0$.

<details markdown="1">
<summary>Hint</summary>

The coefficient of $x^2$ is $2$, so factorise carefully. Look for a factor pair
that gives a middle term of $3x$.
</details>

<details markdown="1">
<summary>Next step</summary>

$2x^2 + 3x - 2 = (2x - 1)(x + 2)$, so the roots are $x = \frac{1}{2}$ and
$x = -2$.
</details>

<details markdown="1">
<summary>Full working</summary>

Factorise:

$$
2x^2 + 3x - 2 = (2x - 1)(x + 2).
$$

The roots are $x = -2$ and $x = \frac{1}{2}$, and the parabola opens upwards. The
inequality asks for $\leq 0$, which is between the roots:

$$
-2 \leq x \leq \frac{1}{2}.
$$

The solution set is $x \in \left[-2, \frac{1}{2}\right]$.
</details>

**6.** The height of a thrown ball is modelled by $h = 1 + 4t - 4t^2$ metres
after $t$ seconds. During which times is the ball at a height of at least
$1$ m?

<details markdown="1">
<summary>Hint</summary>

"At least $1$ m" means $h \geq 1$, so set $1 + 4t - 4t^2 \geq 1$ and simplify.
</details>

<details markdown="1">
<summary>Next step</summary>

Subtract $1$ from both sides: $4t - 4t^2 \geq 0$. Factorise the left side.
</details>

<details markdown="1">
<summary>Full working</summary>

Set $h \geq 1$:

$$
1 + 4t - 4t^2 \geq 1, \qquad 4t - 4t^2 \geq 0.
$$

Factorise:

$$
4t(1 - t) \geq 0.
$$

The expression is a quadratic with negative $t^2$ coefficient, so it opens
downwards. It is positive between the roots $t = 0$ and $t = 1$. The ball is at
least $1$ m high for

$$
0 \leq t \leq 1.
$$

The model is meant for $t \geq 0$, so the realistic answer is $t \in [0, 1]$.
</details>
