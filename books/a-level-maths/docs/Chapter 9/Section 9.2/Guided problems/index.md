---
title: 9.2 Simple iterative methods, cobweb and staircase diagrams — Practise with
  help
chapter: 9
chapter_title: Numerical methods
section: '9.2'
section_title: Simple iterative methods, cobweb and staircase diagrams
dfe:
- I2
kind: guided-problems
---

# 9.2 Simple iterative methods, cobweb and staircase diagrams — Practise with help

Work each question closed book first. Carry the full value in your calculator
and write down four decimal places.

## Warm-up: remember

1. Differentiate $g(x) = \dfrac{2x + 1}{4}$.
2. Make $x$ the subject of $4x + 1 = 9$.

<details markdown="1">
<summary>Answers</summary>

1. $g'(x) = \dfrac{2}{4} = \dfrac{1}{2}$.
2. Subtract $1$: $4x = 8$. Divide by $4$: $x = 2$.

If the first part was hard, revise differentiating a linear expression in
Section 7.3. If the second was hard, revise rearranging a formula in Section 2.5.
</details>

## Practise with help

**1.** Rearrange $x^2 + x - 3 = 0$ into the form $x = \sqrt{3 - x}$.

<details markdown="1">
<summary>Hint</summary>

Move the $x^2$ term to the other side first. That leaves $x$ alone on the left.
</details>

<details markdown="1">
<summary>Next step</summary>

From $x^2 + x - 3 = 0$ you get $x^2 = 3 - x$. Take the positive square root of
both sides.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x^2 + x - 3 = 0
\quad\Longrightarrow\quad
x^2 = 3 - x
\quad\Longrightarrow\quad
x = \sqrt{3 - x}.
$$

The positive root is the one that matches the solution near $1.3$. The
recurrence is $x_{n+1} = \sqrt{3 - x_n}$.
</details>

**2.** Use $x_{n+1} = \sqrt{3 - x_n}$ with $x_0 = 1$ to find $x_1$, $x_2$ and
$x_3$ to four decimal places.

<details markdown="1">
<summary>Hint</summary>

Substitute the previous value under the square root each time. Keep the full
answer in the calculator.
</details>

<details markdown="1">
<summary>Next step</summary>

$x_1 = \sqrt{3 - 1} = \sqrt{2}$. Then substitute $1.4142$ to get $x_2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x_1 = \sqrt{3 - 1} = \sqrt{2} = 1.4142,
$$

$$
x_2 = \sqrt{3 - 1.4142} = \sqrt{1.5858} = 1.2593,
\qquad
x_3 = \sqrt{3 - 1.2593} = \sqrt{1.7407} = 1.3194.
$$

The values close in on the root $x = 1.3028$, which is
$\dfrac{\sqrt{13} - 1}{2}$.
</details>

**3.** Rearrange $x^3 - 2x - 5 = 0$ into the form $x = (2x + 5)^{1/3}$.

<details markdown="1">
<summary>Hint</summary>

Move the term $-2x$ to the right of the equals sign, then take the cube root of
both sides.
</details>

<details markdown="1">
<summary>Next step</summary>

From $x^3 = 2x + 5$ you get $x = \sqrt[3]{2x + 5}$, which is the same as
$(2x + 5)^{1/3}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x^3 - 2x - 5 = 0
\quad\Longrightarrow\quad
x^3 = 2x + 5
\quad\Longrightarrow\quad
x = \sqrt[3]{2x + 5}.
$$

The recurrence is $x_{n+1} = (2x_n + 5)^{1/3}$.
</details>

**4.** Use $x_{n+1} = (2x_n + 5)^{1/3}$ with $x_0 = 2$ to find $x_1$, $x_2$ and
$x_3$ to four decimal places.

<details markdown="1">
<summary>Hint</summary>

Work out $2x_0 + 5$ first, then take the cube root. That value is the next input.
</details>

<details markdown="1">
<summary>Next step</summary>

$x_1 = \sqrt[3]{2(2) + 5} = \sqrt[3]{9}$. Use the cube-root key on your calculator.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x_1 = \sqrt[3]{9} = 2.0801,
\qquad
x_2 = \sqrt[3]{2(2.0801) + 5} = \sqrt[3]{9.1602} = 2.0924,
$$

$$
x_3 = \sqrt[3]{2(2.0924) + 5} = \sqrt[3]{9.1848} = 2.0942.
$$

The root is $2.0946$ to four decimal places. The values are closing on it.
</details>

**5.** For $g(x) = \dfrac{x + 3}{4}$, work out $g'(x)$. Explain why the
recurrence $x_{n+1} = g(x_n)$ converges, and say whether the diagram is a
staircase or a cobweb.

<details markdown="1">
<summary>Hint</summary>

Differentiate the expression. The fixed point is where $x = \dfrac{x + 3}{4}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$g'(x) = \dfrac{1}{4}$, which is positive and less than $1$. A positive gradient
gives a staircase.
</details>

<details markdown="1">
<summary>Full working</summary>

Differentiating gives

$$
g'(x) = \frac{1}{4}.
$$

The fixed point solves $4x = x + 3$, so $x = 1$. At that point
$|g'(1)| = \dfrac{1}{4} < 1$, so the iteration converges to $1$. The gradient is
positive, so the path steps towards the fixed point from one side: a staircase.
</details>

**6.** The recurrence $x_{n+1} = 4x_n - 3$ has the fixed point $x = 1$. Take
$x_0 = 0$ and work out $x_1$, $x_2$ and $x_3$. Find $g'(x)$ and explain why the
iteration diverges.

<details markdown="1">
<summary>Hint</summary>

Substitute each value into $4x - 3$. Compare the size of the numbers with the
starting value $0$.
</details>

<details markdown="1">
<summary>Next step</summary>

$x_1 = 4(0) - 3 = -3$, then $x_2 = 4(-3) - 3 = -15$. The values are growing in
size, not settling.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x_1 = -3,
\qquad
x_2 = 4(-3) - 3 = -15,
\qquad
x_3 = 4(-15) - 3 = -63.
$$

Here $g(x) = 4x - 3$, so $g'(x) = 4$. At the fixed point $|g'(1)| = 4 > 1$,
which is the condition for divergence. Each step multiplies the distance from
the fixed point by about $4$, so the values run away.
</details>
