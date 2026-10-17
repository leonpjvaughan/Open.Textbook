---
title: 6.4 Solving equations of the form a^x = b — Practise with help
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.4'
section_title: Solving equations of the form a^x = b
refs:
- F5
kind: guided-problems
---

# 6.4 Solving equations of the form a^x = b — Practise with help

Work each question closed book first. Isolate the exponential, then take
logarithms of both sides.

## Warm-up: remember

1. Work out $\ln e^2$.
2. Write $3\ln x$ as a single logarithm.
3. Solve $2^x = 8$ by writing both sides as powers of $2$.

<details markdown="1">
<summary>Answers</summary>

1. $\ln e^2 = 2$, because the logarithm undoes the exponential.
2. $3\ln x = \ln x^3$.
3. $2^x = 2^3$, so $x = 3$.

If question 2 was hard, revise the power law in Section 6.3 before you
continue.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Solve $3^x = 40$, giving $x$ exactly and to three significant figures.

<details markdown="1">
<summary>Hint</summary>

Take the natural logarithm of both sides. The power law brings the $x$ to the
front.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $x\ln 3 = \ln 40$, then divide both sides by $\ln 3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x = \frac{\ln 40}{\ln 3} = 3.357\ldots \approx 3.36.
$$

The exact answer keeps both logarithms; the decimal comes last.
</details>

**2.** Solve $e^x = 12$, giving $x$ exactly.

<details markdown="1">
<summary>Hint</summary>

The natural logarithm undoes the exponential. No change of base is needed.
</details>

<details markdown="1">
<summary>Next step</summary>

Take $\ln$ of both sides. The left side becomes $x$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x = \ln 12 \approx 2.485.
$$

Because $\ln 12 > 0$, the value of $e^x$ is greater than $1$, which matches the
positive exponent.
</details>

**3.** Solve $e^{3x} = 20$, giving $x$ exactly.

<details markdown="1">
<summary>Hint</summary>

Take logarithms first, then divide by the coefficient $3$.
</details>

<details markdown="1">
<summary>Next step</summary>

Taking $\ln$ gives $3x = \ln 20$. Divide both sides by $3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x = \frac{\ln 20}{3} \approx 0.999.
$$

Dividing by $3$ is the last step, after the logarithm has isolated the exponent.
</details>

**4.** Solve $2^{2x} - 9\left(2^x\right) + 8 = 0$.

<details markdown="1">
<summary>Hint</summary>

Write $2^{2x}$ as $\left(2^x\right)^2$ and let $u = 2^x$. The equation becomes a
quadratic in $u$.
</details>

<details markdown="1">
<summary>Next step</summary>

Factorise $u^2 - 9u + 8 = 0$ and solve for $u$. Then substitute back to find
$x$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u^2 - 9u + 8 = (u - 1)(u - 8) = 0,
$$

so $u = 1$ or $u = 8$. Therefore $2^x = 1$, giving $x = 0$, or $2^x = 8$,
giving $x = 3$. Both values are valid.
</details>

**5.** Solve $4^{x+1} = 50$, giving $x$ to three significant figures.

<details markdown="1">
<summary>Hint</summary>

Take logarithms: $(x + 1)\ln 4 = \ln 50$. The exponent $x + 1$ stays together
until the end.
</details>

<details markdown="1">
<summary>Next step</summary>

Make $x + 1$ the subject, then subtract $1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x + 1 = \frac{\ln 50}{\ln 4}, \qquad
x = \frac{\ln 50}{\ln 4} - 1 = 1.822\ldots \approx 1.82.
$$

The $-1$ comes from the exponent $x + 1$.
</details>

**6.** Solve $\log_2\left(x - 1\right) = 3$, and state the domain.

<details markdown="1">
<summary>Hint</summary>

A logarithm needs a positive input, so $x - 1 > 0$. Rewrite the equation as a
power with base $2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $x - 1 = 2^3 = 8$, then solve for $x$ and check the domain.
</details>

<details markdown="1">
<summary>Full working</summary>

The domain is $x > 1$. Rewriting the logarithm gives

$$
x - 1 = 8, \qquad x = 9.
$$

The answer $9$ is greater than $1$, so it lies in the domain.
</details>

**7.** Explain why $5^x = -2$ has no real solution.

<details markdown="1">
<summary>Hint</summary>

Think about the graph of $y = 5^x$, and the values it can take.
</details>

<details markdown="1">
<summary>Next step</summary>

Decide whether $5^x$ can ever be negative, and what the graph does for very
large negative $x$.
</details>

<details markdown="1">
<summary>Full working</summary>

The graph of $y = 5^x$ lies above the $x$-axis for every real $x$. As $x$
becomes very negative the curve approaches $0$, but it never reaches a negative
value. So the value $-2$ is outside the range, and the equation has no real
solution.
</details>
