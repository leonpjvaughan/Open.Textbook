---
title: 9.3 Newton–Raphson and other recurrence relations — Practise with help
chapter: 9
chapter_title: Numerical methods
section: '9.3'
section_title: Newton–Raphson and other recurrence relations
refs:
- I2
kind: guided-problems
---

# 9.3 Newton–Raphson and other recurrence relations — Practise with help

Work each question closed book first. Write down the derivative before you
substitute, and keep the full value in your calculator.

## Warm-up: remember

1. Differentiate $f(x) = x^3 - 4x + 1$.
2. For $f(x) = x^2 - 3x$, work out $f(2)$ and $f'(2)$.

<details markdown="1">
<summary>Answers</summary>

1. $f'(x) = 3x^2 - 4$.
2. $f(2) = 4 - 6 = -2$ and $f'(x) = 2x - 3$, so $f'(2) = 1$.

If the first part was hard, revise differentiating powers in Section 7.3. If the
second was hard, revise function notation in Section 2.9.
</details>

:::figure warm-up-gate


## Practise with help

**1.** For $f(x) = x^3 + x - 1$, write down $f'(x)$ and use Newton–Raphson with
$x_0 = 0.7$ to find $x_1$ to four decimal places.

<details markdown="1">
<summary>Hint</summary>

The step needs the derivative at the starting value, so differentiate first.
</details>

<details markdown="1">
<summary>Next step</summary>

$f'(x) = 3x^2 + 1$, so $f(0.7) = 0.043$ and $f'(0.7) = 2.47$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f(0.7) = 0.7^3 + 0.7 - 1 = 0.043,
\qquad
f'(0.7) = 3(0.49) + 1 = 2.47.
$$

$$
x_1 = 0.7 - \frac{0.043}{2.47} = 0.6826.
$$
</details>

**2.** Continue the iteration in question 1 to find $x_2$. Give the root to
three decimal places.

<details markdown="1">
<summary>Hint</summary>

Use $x_1$ in the same formula. Carry the full value from the last step, not the
rounded one.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(0.6825911) = 0.0006312$ and $f'(0.6825911) = 2.3977918$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x_2 = 0.6825911 - \frac{0.0006312}{2.3977918} = 0.6823279.
$$

The value has settled, so the root is $0.682$ to three decimal places.
</details>

**3.** Use Newton–Raphson with $x_0 = 2$ to find $x_1$ and $x_2$ for
$x^3 - 2x - 5 = 0$.

<details markdown="1">
<summary>Hint</summary>

Differentiate $f(x) = x^3 - 2x - 5$ term by term.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(2) = -1$ and $f'(2) = 10$, so the first step adds $0.1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f'(x) = 3x^2 - 2,
\qquad
x_1 = 2 - \frac{-1}{10} = 2.1.
$$

Then $f(2.1) = 0.061$ and $f'(2.1) = 11.23$, so

$$
x_2 = 2.1 - \frac{0.061}{11.23} = 2.0946.
$$
</details>

**4.** Show that $x_{n+1} = \dfrac{1}{2}\left(x_n + \dfrac{7}{x_n}\right)$ is
Newton–Raphson for $x^2 - 7 = 0$. Use it with $x_0 = 3$ to find $x_2$ to four
decimal places.

<details markdown="1">
<summary>Hint</summary>

Work out $x - \dfrac{f(x)}{f'(x)}$ for $f(x) = x^2 - 7$, and compare it with the
recurrence.
</details>

<details markdown="1">
<summary>Next step</summary>

$f'(x) = 2x$, so $x - \dfrac{x^2 - 7}{2x} = \dfrac{x^2 + 7}{2x}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x - \frac{f(x)}{f'(x)}
= x - \frac{x^2 - 7}{2x}
= \frac{2x^2 - x^2 + 7}{2x}
= \frac{1}{2}\left(x + \frac{7}{x}\right).
$$

This is the given recurrence. From $x_0 = 3$:

$$
x_1 = \frac{1}{2}\left(3 + \frac{7}{3}\right) = 2.6667,
\qquad
x_2 = \frac{1}{2}\left(2.6667 + \frac{7}{2.6667}\right) = 2.6458.
$$
</details>

**5.** Explain why Newton–Raphson fails for $f(x) = x^2 - 9$ when the starting
value is $x_0 = 0$.

<details markdown="1">
<summary>Hint</summary>

Work out the derivative at the starting value.
</details>

<details markdown="1">
<summary>Next step</summary>

$f'(x) = 2x$, so $f'(0) = 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

The formula divides by $f'(x_n)$. At $x_0 = 0$ the derivative is $f'(0) = 0$, so
the first step would divide by zero. The tangent at $x_0 = 0$ is horizontal and
never meets the axis, so there is no crossing point to use.
</details>

**6.** For $f(x) = x^3 - 2x + 2$ with $x_0 = 0$, work out $x_1$, $x_2$ and
$x_3$. Describe what the sequence does.

<details markdown="1">
<summary>Hint</summary>

Find $f(0)$ and $f'(0)$ first, then apply the formula.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(0) = 2$ and $f'(0) = -2$, so $x_1 = 0 - \dfrac{2}{-2} = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x_1 = 0 - \frac{2}{-2} = 1.
$$

Then $f(1) = 1$ and $f'(1) = 1$, so

$$
x_2 = 1 - \frac{1}{1} = 0,
\qquad
x_3 = 0 - \frac{2}{-2} = 1.
$$

The values repeat $1, 0, 1, 0, \ldots$ The method does not settle, even though
every step was correct.
</details>

**7.** For $x^3 + x - 1 = 0$, start both methods from $x_0 = 0.7$: Newton–Raphson
and the simple iteration $x_{n+1} = \dfrac{1}{x_n^2 + 1}$. Find $x_2$ for each.
Which method is closer to the root $0.6823$?

<details markdown="1">
<summary>Hint</summary>

The Newton–Raphson values are in question 2. For the simple iteration, substitute
into $\dfrac{1}{x^2 + 1}$.
</details>

<details markdown="1">
<summary>Next step</summary>

For the simple iteration, $x_1 = \dfrac{1}{0.49 + 1} = 0.6711$.
</details>

<details markdown="1">
<summary>Full working</summary>

Newton–Raphson reached $x_2 = 0.6823279$.

The simple iteration gives

$$
x_1 = \frac{1}{0.7^2 + 1} = 0.6711,
\qquad
x_2 = \frac{1}{0.6711^2 + 1} = 0.6894.
$$

Newton–Raphson is closer after two steps. It uses the gradient as well as the
height, so it closes the gap faster. The simple iteration still works, because
$|g'| < 1$ at the root, but it needs more steps.
</details>
