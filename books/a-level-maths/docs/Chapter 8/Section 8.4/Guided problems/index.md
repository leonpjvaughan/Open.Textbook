---
title: 8.4 Integration as the limit of a sum — Practise with help
chapter: 8
chapter_title: Integration
section: '8.4'
section_title: Integration as the limit of a sum
refs:
- H4
kind: guided-problems
---

# 8.4 Integration as the limit of a sum — Practise with help

Work each question closed book first. Write $\delta x$ and $x_i$ before you
write the sum, and simplify the fraction in $n$ before taking the limit.

## Warm-up: remember

1. Write $\displaystyle\sum_{i=1}^{5} (2i + 1)$ in full and evaluate it.
2. Use $\displaystyle\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$ to find
   $\displaystyle\sum_{i=1}^{10} i$.
3. Evaluate $\displaystyle\int_0^2 xdx$.

<details markdown="1">
<summary>Answers</summary>

1. $3 + 5 + 7 + 9 + 11 = 35$.
2. $\dfrac{10 \times 11}{2} = 55$.
3. $\left[\dfrac{x^2}{2}\right]_0^2 = 2$.

If question 2 was hard, revise sigma notation in Section 4.4.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Write $\delta x$ and $x_i$ for $\displaystyle\int_0^4 x^2dx$ using $n$
equal strips.

<details markdown="1">
<summary>Hint</summary>

The width is the length of the interval divided by $n$. The right end of strip
$i$ is $i$ widths from the left.
</details>

<details markdown="1">
<summary>Next step</summary>

The interval has length $4$, so $\delta x = \dfrac{4}{n}$ and
$x_i = i\delta x = \dfrac{4i}{n}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\delta x = \frac{4}{n},
\qquad
x_i = \frac{4i}{n}.
$$

The height of strip $i$ is $x_i^2 = \dfrac{16i^2}{n^2}$, so the sum is
$\displaystyle\sum_{i=1}^{n} \frac{16i^2}{n^2} \times \frac{4}{n}
= \frac{64}{n^3}\sum_{i=1}^{n} i^2$.
</details>

**2.** Use the limit of a sum to show that
$\displaystyle\int_0^1 xdx = \frac{1}{2}$.

<details markdown="1">
<summary>Hint</summary>

With $n$ strips, $\delta x = \dfrac{1}{n}$ and $x_i = \dfrac{i}{n}$. Use
$\displaystyle\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$S_n = \displaystyle\sum_{i=1}^{n} \frac{i}{n} \times \frac{1}{n}
= \frac{1}{n^2}\sum_{i=1}^{n} i = \frac{1}{n^2} \times \frac{n(n+1)}{2}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_n = \frac{n(n+1)}{2n^2} = \frac{n+1}{2n}.
$$

As $n \to \infty$, $\dfrac{n+1}{n} \to 1$, so $S_n \to \dfrac{1}{2}$. Therefore
$\displaystyle\int_0^1 xdx = \frac{1}{2}$.
</details>

**3.** Use the limit of a sum to show that
$\displaystyle\int_0^2 x^2dx = \frac{8}{3}$.

<details markdown="1">
<summary>Hint</summary>

Here $\delta x = \dfrac{2}{n}$ and $x_i = \dfrac{2i}{n}$. Use
$\displaystyle\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$S_n = \displaystyle\sum_{i=1}^{n} \frac{4i^2}{n^2} \times \frac{2}{n}
= \frac{8}{n^3} \times \frac{n(n+1)(2n+1)}{6}$. Simplify to a fraction in $n$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_n = \frac{8(n+1)(2n+1)}{6n^2} = \frac{4(n+1)(2n+1)}{3n^2}.
$$

Expand the top: $(n+1)(2n+1) = 2n^2 + 3n + 1$. Divide by $n^2$ and let
$n \to \infty$:

$$
S_n \to \frac{4 \times 2}{3} = \frac{8}{3}.
$$

So $\displaystyle\int_0^2 x^2dx = \frac{8}{3}$.
</details>

**4.** Use the limit of a sum to show that
$\displaystyle\int_0^3 (x + 1)dx = \frac{15}{2}$.

<details markdown="1">
<summary>Hint</summary>

Split the sum into two parts: one with $i$ and one with the constant $1$. The
constant part is $\displaystyle\sum_{i=1}^{n} 1 = n$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\delta x = \dfrac{3}{n}$ and $x_i = \dfrac{3i}{n}$, so
$S_n = \displaystyle\sum_{i=1}^{n} \left(\frac{3i}{n} + 1\right)\frac{3}{n}
= \frac{9}{n^2}\sum_{i=1}^{n} i + \frac{3}{n}\sum_{i=1}^{n} 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_n = \frac{9}{n^2} \times \frac{n(n+1)}{2} + \frac{3}{n} \times n
= \frac{9(n+1)}{2n} + 3.
$$

As $n \to \infty$, the first fraction tends to $\dfrac{9}{2}$, so

$$
S_n \to \frac{9}{2} + 3 = \frac{15}{2}.
$$

Therefore $\displaystyle\int_0^3 (x + 1)dx = \frac{15}{2}$.
</details>

**5.** Explain why the limit of the sum gives the same value whether the height
of each strip is taken at the left end or the right end.

<details markdown="1">
<summary>Hint</summary>

Compare the left and right heights of one strip. How large is their difference,
and what happens to it as the strips get thinner?
</details>

<details markdown="1">
<summary>Next step</summary>

For a strip of width $\delta x$, the height changes by about $f'(x)\delta x$
across the strip. That is the difference between the left and right heights.
</details>

<details markdown="1">
<summary>Full working</summary>

Across one strip the height changes by roughly $f'(x)\delta x$. The area of
the strip is therefore altered by at most about $f'(x)(\delta x)^2$ when the
endpoint is moved from one end to the other. There are $n$ strips and
$\delta x = \dfrac{b-a}{n}$, so the total change is at most about

$$
n \times f'(x)(\delta x)^2 = f'(x)\frac{(b-a)^2}{n}.
$$

As $n \to \infty$ this tends to $0$, so the left and right sums have the same
limit. The choice of endpoint does not affect the integral.
</details>

**6.** Use the limit of a sum to evaluate
$\displaystyle\int_0^2 (x^2 + 1)dx$.

<details markdown="1">
<summary>Hint</summary>

Integrate each part as a separate sum. The $x^2$ part uses the sum of squares and
the $1$ part uses $\displaystyle\sum_{i=1}^{n} 1 = n$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\delta x = \dfrac{2}{n}$ and $x_i = \dfrac{2i}{n}$, so
$S_n = \dfrac{8}{n^3}\sum i^2 + \dfrac{2}{n}\sum 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_n = \frac{8}{n^3} \times \frac{n(n+1)(2n+1)}{6} + \frac{2}{n} \times n
= \frac{4(n+1)(2n+1)}{3n^2} + 2.
$$

The first fraction tends to $\dfrac{8}{3}$, so

$$
\int_0^2 (x^2 + 1)dx = \frac{8}{3} + 2 = \frac{14}{3}.
$$

The Fundamental Theorem of Calculus gives the same value:
$\left[\dfrac{x^3}{3} + x\right]_0^2 = \dfrac{8}{3} + 2$.
</details>
