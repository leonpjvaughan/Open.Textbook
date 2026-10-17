---
title: 6.1 The functions a^x and e^x — Practise with help
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.1'
section_title: The functions a^x and e^x
refs:
- F1
kind: guided-problems
---

# 6.1 The functions a^x and e^x — Practise with help

Work each question closed book first. Before you sketch a curve, decide whether
the base is larger than $1$ or between $0$ and $1$.

## Warm-up: remember

1. Write $\dfrac{x^8}{x^3}$ as a power of $x$.
2. Work out $27^{2/3}$.
3. Expand $(2x)^3$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{x^8}{x^3} = x^{8-3} = x^5$.
2. $27^{1/3} = 3$, so $27^{2/3} = 3^2 = 9$.
3. $(2x)^3 = 2^3x^3 = 8x^3$.

If question 2 was hard, revise fractional indices in Chapter 2 before you
continue.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Sketch $y = 5^x$, and state the $y$-intercept, the asymptote and the
range.

<details markdown="1">
<summary>Hint</summary>

The base $5$ is larger than $1$, so the curve rises. Start from the point
$(0, 1)$.
</details>

<details markdown="1">
<summary>Next step</summary>

Plot $(0, 1)$, $(1, 5)$ and $(-1, 0.2)$, then join them with a smooth rising
curve that approaches the $x$-axis on the left.
</details>

<details markdown="1">
<summary>Full working</summary>

The curve rises because $5 > 1$. It passes through $(0, 1)$. The asymptote is
$y = 0$, because $5^x$ approaches zero as $x$ becomes very negative but stays
positive. The range is $y > 0$.
</details>

**2.** Work out the values of $y = \left(\dfrac{1}{4}\right)^x$ when $x = -2$,
$x = 1$ and $x = 0$.

<details markdown="1">
<summary>Hint</summary>

A negative index turns the fraction over. Use $\left(\dfrac{1}{4}\right)^{-2} =
4^2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out each value separately: flip the fraction for the negative index, and
remember that any positive number to the power $0$ is $1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\left(\frac{1}{4}\right)^{-2} = 4^2 = 16, \qquad
\left(\frac{1}{4}\right)^1 = \frac{1}{4}, \qquad
\left(\frac{1}{4}\right)^0 = 1.
$$

The values fall as $x$ rises, because the base is between $0$ and $1$.
</details>

**3.** Describe how the graph of $y = 2^x$ is related to the graph of
$y = \left(\dfrac{1}{2}\right)^x$.

<details markdown="1">
<summary>Hint</summary>

Write $\left(\dfrac{1}{2}\right)^x$ as $2^{-x}$, and compare the two exponents.
</details>

<details markdown="1">
<summary>Next step</summary>

Replacing $x$ with $-x$ in $y = 2^x$ gives $y = 2^{-x}$. Recall what that
transformation does to a graph.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\left(\frac{1}{2}\right)^x = 2^{-x}.
$$

This is the reflection of $y = 2^x$ in the $y$-axis. Both curves pass through
$(0, 1)$ and both have asymptote $y = 0$. The first rises and the second falls.
</details>

**4.** A student writes that $0^x = 1$ for every $x$, so $0$ is a possible base
for an exponential function. Explain what is wrong with this claim.

<details markdown="1">
<summary>Hint</summary>

Test the claim at $x = 0$, at $x = 1$, and at a fractional value such as
$x = \dfrac{1}{2}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Look up the definition of $x^{1/2}$, and decide whether $0^{1/2}$ can be a
fixed positive number.
</details>

<details markdown="1">
<summary>Full working</summary>

The value $0^0$ is not defined, and $0^x = 0$ for every positive $x$. So the
claim fails at $x = 0$ and gives $0$ rather than $1$ for every other $x$. A
fractional power such as $0^{1/2}$ is also $0$, so the base gives no growth and
no decay. This is why the base of an exponential function must be positive and
cannot be $1$.
</details>

**5.** Write $y = 7^x$ in the form $y = e^{kx}$, giving $k$ to three significant
figures.

<details markdown="1">
<summary>Hint</summary>

First write the base as a power of $e$: $7 = e^{\ln 7}$. Then raise both sides
to the power $x$.
</details>

<details markdown="1">
<summary>Next step</summary>

Use the index law $\left(e^{m}\right)^x = e^{mx}$ to move the $x$ into the
exponent.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
7^x = \left(e^{\ln 7}\right)^x = e^{x\ln 7}.
$$

So $k = \ln 7 = 1.94591\ldots$, which is $1.95$ to three significant figures.
</details>

**6.** Use $e \approx 2.71828$ to write $e^3$ to three significant figures.

<details markdown="1">
<summary>Hint</summary>

The value is $e \times e \times e$, which is a little more than $2.7^3$.
</details>

<details markdown="1">
<summary>Next step</summary>

Multiply $e$ by itself three times, or use the power button on your calculator,
and then round to three significant figures.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
e^3 = 2.71828\ldots^3 = 20.0855\ldots,
$$

which is $20.1$ to three significant figures.
</details>
