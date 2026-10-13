---
title: 6.3 Logarithms and the laws of logarithms — Practise with help
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.3'
section_title: Logarithms and the laws of logarithms
refs:
- F3
- F4
kind: guided-problems
---

# 6.3 Logarithms and the laws of logarithms — Practise with help

Work each question closed book first. Ask "what power of the base gives this
number?" before you reach for a law.

## Warm-up: remember

1. Write $2^{-3}$ as a fraction.
2. Work out $5^0$ and $9^{1/2}$.
3. Write $\left(e^{x}\right)^2$ as a power of $e$.

<details markdown="1">
<summary>Answers</summary>

1. $2^{-3} = \dfrac{1}{2^3} = \dfrac{1}{8}$.
2. $5^0 = 1$ and $9^{1/2} = 3$.
3. $\left(e^{x}\right)^2 = e^{2x}$.

If question 1 was hard, revise negative indices in Chapter 2 before you
continue.
</details>

## Practise with help

**1.** Write $3^4 = 81$ in logarithmic form, and so work out $\log_3 81$.

<details markdown="1">
<summary>Hint</summary>

The base of the power is the base of the logarithm. The exponent becomes the
value of the logarithm.
</details>

<details markdown="1">
<summary>Next step</summary>

The base is $3$, the exponent is $4$, so write $\log_3 81 = 4$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
3^4 = 81 \quad \text{means} \quad \log_3 81 = 4.
$$

The logarithm counts the number of factors of $3$ in $81$.
</details>

**2.** Work out $\log_2 \dfrac{1}{16}$.

<details markdown="1">
<summary>Hint</summary>

Write $\dfrac{1}{16}$ as a power of $2$, using a negative index.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{1}{16} = 2^{-4}$, so the logarithm is the exponent.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\log_2 \frac{1}{16} = \log_2 2^{-4} = -4.
$$

A negative logarithm means the input is smaller than $1$.
</details>

**3.** Write $\log_3 5 + \log_3 7$ as a single logarithm.

<details markdown="1">
<summary>Hint</summary>

Adding logarithms with the same base multiplies the inputs.
</details>

<details markdown="1">
<summary>Next step</summary>

Combine $5$ and $7$ under one logarithm with base $3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\log_3 5 + \log_3 7 = \log_3 35.
$$

The product law is the reverse of the index law $3^m \times 3^n = 3^{m+n}$.
</details>

**4.** Expand $\ln\left(x^2y^3\right)$ using the laws of logarithms.

<details markdown="1">
<summary>Hint</summary>

First use the product law, then use the power law on each logarithm.
</details>

<details markdown="1">
<summary>Next step</summary>

Split the product into $\ln x^2 + \ln y^3$, then bring each power to the front.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\ln\left(x^2y^3\right) = \ln x^2 + \ln y^3 = 2\ln x + 3\ln y.
$$

Each power becomes a multiplier of its own logarithm.
</details>

**5.** Solve $\log_4 x = 3$.

<details markdown="1">
<summary>Hint</summary>

Rewrite the logarithm as a power with base $4$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $x = 4^3$ and work out the value.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x = 4^3 = 64.
$$

The answer is positive, so it lies in the domain.
</details>

**6.** Solve $\log_2 x = -2$, and explain why the answer is allowed.

<details markdown="1">
<summary>Hint</summary>

A negative value on the right is the exponent, not the input. The input $x$ is
still $2^{-2}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $x = 2^{-2}$ and simplify it as a fraction.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x = 2^{-2} = \frac{1}{4}.
$$

The value $\dfrac{1}{4}$ is positive, so it is allowed. The negative sign sits
in the exponent and does not make the input negative.
</details>

**7.** Use the change-of-base rule to write $\log_5 12$ as a quotient of natural
logarithms.

<details markdown="1">
<summary>Hint</summary>

Let $y = \log_5 12$, write it as $5^y = 12$, then take the natural logarithm of
both sides.
</details>

<details markdown="1">
<summary>Next step</summary>

Taking logs gives $y\ln 5 = \ln 12$. Make $y$ the subject.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\log_5 12 = \frac{\ln 12}{\ln 5} \approx 1.544.
$$

The base of the original logarithm becomes the denominator.
</details>

**8.** A student writes $\ln(x + y) = \ln x + \ln y$ for positive $x$ and $y$.
Test the claim with $x = y = 10$ and explain the mistake.

<details markdown="1">
<summary>Hint</summary>

Work out both sides with $x = y = 10$, using $\ln 20$ on the left and
$\ln 10 + \ln 10$ on the right.
</details>

<details markdown="1">
<summary>Next step</summary>

Use a calculator to find $\ln 20$ and $2\ln 10$, and compare them.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\ln(10 + 10) = \ln 20 \approx 2.996, \qquad
\ln 10 + \ln 10 = 2\ln 10 \approx 4.605.
$$

The two sides are different. The product law applies to a product, not a sum:
$\ln(xy) = \ln x + \ln y$, but there is no such rule for $\ln(x + y)$.
</details>
