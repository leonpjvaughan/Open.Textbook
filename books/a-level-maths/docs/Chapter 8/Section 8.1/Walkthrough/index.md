---
title: 8.1 The Fundamental Theorem of Calculus and standard integrals — Learn
chapter: 8
chapter_title: Integration
section: '8.1'
section_title: The Fundamental Theorem of Calculus and standard integrals
dfe:
- H1
- H2
kind: walkthrough
---

# 8.1 The Fundamental Theorem of Calculus and standard integrals — Learn

**Prerequisites:** differentiating powers of $x$, $e^{kx}$, $\sin kx$, $\cos kx$
and $\ln x$ from Sections 7.3 and 7.7; reading and using function notation.

**By the end of this section you can:** explain integration as the reverse of
differentiation; find an antiderivative and add the constant of integration; use
the Fundamental Theorem of Calculus to evaluate a definite integral; and
integrate the standard functions and their sums.

## 1. Integration reverses differentiation

Differentiation turns a function into its gradient. Integration turns a gradient
back into the function it came from.

A function $F$ is an **antiderivative** of $f$ when

$$
F'(x) = f(x).
$$

For example, $x^2$ is an antiderivative of $2x$, because the derivative of
$x^2$ is $2x$. So is $x^2 + 7$, and so is $x^2 - 100$. Adding a constant does
not change the gradient. Every antiderivative therefore has the form $x^2 + C$,
where $C$ is the **constant of integration**.

We write

$$
\int 2xdx = x^2 + C.
$$

The symbol $\int$ is an integral sign, the $dx$ names the variable, and $C$ is
the constant of integration. The result is called an **indefinite integral**,
because no values have been fixed at the ends.

You can always check an integral by differentiating your answer. If the
derivative is the function you started with, the integral is right.

**Example 1.** Find $\displaystyle\int 8x^3dx$.

Raise the power by one and divide by the new power:

$$
\int 8x^3dx = 8 \times \frac{x^4}{4} + C = 2x^4 + C.
$$

Check by differentiating: the derivative of $2x^4 + C$ is $8x^3$. Correct.

## 2. The power rule for integration

For any power $n$ except $n = -1$,

$$
\int x^ndx = \frac{x^{n+1}}{n+1} + C.
$$

The power goes **up** by one, and you divide by the new power. This is the rule
for differentiation read backwards. A constant multiple moves outside the
integral, and a sum or difference of terms integrates term by term.

**Example 2.** Find $\displaystyle\int (6x^2 - 4x + 5)dx$.

Integrate each term:

$$
\int (6x^2 - 4x + 5)dx = 6 \times \frac{x^3}{3} - 4 \times \frac{x^2}{2} + 5x + C
= 2x^3 - 2x^2 + 5x + C.
$$

**Example 3.** Find $\displaystyle\int \frac{1}{x^2}dx$.

Write the fraction as a power first: $\dfrac{1}{x^2} = x^{-2}$. Then

$$
\int x^{-2}dx = \frac{x^{-1}}{-1} + C = -\frac{1}{x} + C.
$$

**Example 4.** Find $\displaystyle\int \sqrt{x}dx$.

Write the root as a power: $\sqrt{x} = x^{1/2}$. Then

$$
\int x^{1/2}dx = \frac{x^{3/2}}{3/2} + C = \frac{2}{3}x^{3/2} + C.
$$

## 3. Standard integrals

The functions from Chapter 7 have standard integrals. For a constant $k \ne 0$,

$$
\int e^{kx}dx = \frac{1}{k}e^{kx} + C,
\qquad
\int \sin kxdx = -\frac{1}{k}\cos kx + C,
\qquad
\int \cos kxdx = \frac{1}{k}\sin kx + C.
$$

The factor $\dfrac{1}{k}$ appears because differentiating $e^{kx}$ multiplies by
$k$, and integration undoes that. There is one more standard integral:

$$
\int \frac{1}{x}dx = \ln x + C \qquad (x > 0).
$$

The power rule does not cover $n = -1$, because dividing by $n + 1$ would divide
by zero. The logarithm fills that gap.

**Example 5.** Find $\displaystyle\int \left(3e^{2x} + \cos 3x\right)dx$.

Integrate each term with its own factor:

$$
\int \left(3e^{2x} + \cos 3x\right)dx
= 3 \times \frac{1}{2}e^{2x} + \frac{1}{3}\sin 3x + C
= \frac{3}{2}e^{2x} + \frac{1}{3}\sin 3x + C.
$$

**Example 6.** Find $\displaystyle\int \left(4x^3 + \frac{1}{x}\right)dx$.

The first term uses the power rule, the second uses the logarithm:

$$
\int \left(4x^3 + \frac{1}{x}\right)dx = x^4 + \ln x + C.
$$

## 4. Finding the constant from one value

A single extra piece of information fixes $C$. Substitute the known value.

**Example 7.** The gradient of a curve is $\dfrac{dy}{dx} = 6x^2$, and the curve
passes through the point $(1, 5)$. Find the equation of the curve.

Integrate first:

$$
y = \int 6x^2dx = 2x^3 + C.
$$

The point $(1, 5)$ lies on the curve, so substitute $x = 1$ and $y = 5$:

$$
5 = 2(1)^3 + C = 2 + C,
\qquad
C = 3.
$$

The curve is $y = 2x^3 + 3$.

## 5. The Fundamental Theorem of Calculus

A **definite integral** has a lower limit and an upper limit, written
$\displaystyle\int_a^b f(x)dx$. The Fundamental Theorem of Calculus connects it
to any antiderivative $F$:

$$
\int_a^b f(x)dx = F(b) - F(a).
$$

This is the bridge between the two ideas of integration. The theorem says that
the area accumulated between $a$ and $b$ is found by evaluating an antiderivative
at the two ends and subtracting. Section 8.2 uses the theorem to find areas, and
Section 8.4 explains why the area is a limit of thin strips.

**Example 8.** Use the Fundamental Theorem of Calculus to evaluate
$\displaystyle\int_1^2 2xdx$.

An antiderivative of $2x$ is $x^2$, so

$$
\int_1^2 2xdx = \Big[x^2\Big]_1^2 = 2^2 - 1^2 = 4 - 1 = 3.
$$

The square brackets mark the antiderivative, with the lower limit below and the
upper limit above. No constant of integration appears. It would add $C$ and then
subtract $C$, so it always cancels.

## 6. Try it: the antiderivative family

**Predict first.** The figure shows $f(x) = 2x$ and the family of antiderivatives
$F(x) = x^2 + C$. Before you move any control, predict what happens to the graph
when $C$ increases, and predict whether the gradient of $F$ at $x = 1$ changes
when $C$ changes. Write both predictions down.

:::figure ch8-antiderivative-family

**Test.** Move the slider for $C$ and watch the curve. Then move the point along
the curve and read the gradient of $F$ and the height of $f$ at that point.

**Explain.** Write two sentences. The first explains why every curve in the
family has the same gradient at the same value of $x$. The second explains how
the figure shows that the gradient of $F$ is the value of $f$.

> **Watch out.** Three mistakes are common.
>
> **Forgetting the constant of integration.** An indefinite integral is a family
> of functions, not one function. Writing $\int 2xdx = x^2$ is incomplete,
> because $x^2 - 6$ is also an antiderivative. Always add $+ C$.
>
> **Dropping the factor for $e^{kx}$ or $\sin kx$.** The factor is
> $\dfrac{1}{k}$, not $k$. Check with a derivative: the derivative of
> $\dfrac{1}{2}e^{2x}$ is $e^{2x}$, so the integral of $e^{2x}$ is
> $\dfrac{1}{2}e^{2x} + C$.
>
> **Using the power rule on $\dfrac{1}{x}$.** The power rule fails at
> $n = -1$, so $\int \frac{1}{x}dx$ is not $\frac{x^0}{0}$. It is
> $\ln x + C$. **Re-check:** after integrating, differentiate your answer and
> compare it with the function you started with.

## You should now be able to

- explain what an antiderivative is and why the constant of integration appears;
- integrate $x^n$ for $n \ne -1$, with constant multiples, sums and differences;
- integrate $e^{kx}$, $\sin kx$, $\cos kx$ and $\dfrac{1}{x}$;
- find the constant of integration from one point on the curve;
- state the Fundamental Theorem of Calculus and use it to evaluate a definite
  integral;
- check an integral by differentiating the answer.
