---
title: 6.1 The functions a^x and e^x — Learn
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.1'
section_title: The functions a^x and e^x
refs:
- F1
kind: walkthrough
---

# 6.1 The functions a^x and e^x — Learn

**Prerequisites:** the laws of indices for whole-number and fractional powers
from Chapter 2; reading a graph and its asymptote from Chapter 2; the idea of a
function and its range.

**By the end of this section you can:** sketch the graph of $y = a^x$ for a
positive base $a$; state its intercept, range and asymptote; describe how the
shape changes with the base; and sketch the graph of $y = e^x$, explaining what
is special about the number $e$.

## 1. An exponential function

An **exponential function** has the variable in the index. The simplest
examples are

$$
y = 2^x, \qquad y = 3^x, \qquad y = \left(\frac{1}{2}\right)^x.
$$

The base $a$ must be positive, because a negative base gives no meaning to
powers such as $a^{1/2}$. The base also cannot be $1$, since $1^x = 1$ for every
$x$ and the graph would be a flat line.

Every curve $y = a^x$ with $a > 0$ passes through the point $(0, 1)$, because
$a^0 = 1$. The $y$-intercept is therefore always $1$. The curve never touches or
crosses the $x$-axis: the value is positive for every $x$. The line $y = 0$ is a
**horizontal asymptote**. The domain is all real numbers, and the range is
$y > 0$.

The size of the base sets the shape:

- when $a > 1$, the curve rises and gets steeper as $x$ grows;
- when $0 < a < 1$, the curve falls and gets flatter as $x$ grows;
- a larger base rises faster, so $3^x$ is above $2^x$ for $x > 0$.

**Example 1.** Sketch $y = 4^x$, and state its intercept, asymptote and range.

The curve rises because $4 > 1$. It passes through $(0, 1)$. The asymptote is
$y = 0$, and the range is $y > 0$. The graph is steeper than $y = 2^x$, because
the base is larger.

**Example 2.** Describe how the graph of $y = \left(\dfrac{1}{3}\right)^x$
differs from the graph of $y = 3^x$.

The base $\dfrac{1}{3}$ lies between $0$ and $1$, so $y = \left(\dfrac{1}{3}\right)^x$
falls. It is the reflection of $y = 3^x$ in the $y$-axis, because
$\left(\dfrac{1}{3}\right)^x = 3^{-x}$. Both curves pass through $(0, 1)$ and
both have asymptote $y = 0$.

**Example 3.** Work out the value of $y = 2^x$ when $x = 3$, $x = 0$ and
$x = -2$.

$$
2^3 = 8, \qquad 2^0 = 1, \qquad 2^{-2} = \frac{1}{4}.
$$

The values rise as $x$ rises, and they stay positive even when $x$ is negative.

**Example 4.** Write $y = 5^x$ in the form $y = e^{kx}$, giving $k$ exactly.

Write the base as a power of $e$: $5 = e^{\ln 5}$. Then

$$
5^x = \left(e^{\ln 5}\right)^x = e^{x\ln 5},
$$

so $k = \ln 5 \approx 1.609$. Every exponential function can be written with base
$e$ in this way.

## 2. The number e

The number $e$ is a constant, like $\pi$. Its value is

$$
e = 2.718281828\ldots
$$

The graph of $y = e^x$ lies between $y = 2^x$ and $y = 3^x$, because $e$ lies
between $2$ and $3$. It passes through $(0, 1)$ and rises for every $x$, with
asymptote $y = 0$.

The number $e$ is chosen for a special reason. At the point $(0, 1)$ the tangent
to $y = e^x$ has gradient exactly $1$. More than that, the gradient of $e^x$ at
every point equals its value at that point. No other base has this property.
Section 6.2 makes that statement precise, and it is why $e$ is called the
natural base for growth and decay.

## 3. Try it: the exponential explorer

**Predict first.** The figure shows $y = a^x$ with a slider for the base $a$,
and the dashed curve $y = e^x$ for comparison. Before you move the slider,
predict the shape when $a = 0.5$, and predict whether the curve rises or falls
when $a = 3$. Write both predictions down.

:::figure ch6-exponential-explorer

**Test.** Set $a = 2$ and read the value at $x = 1$. Change $a$ to $3$ and read
it again. Then set $a = 0.5$ and read the value at $x = 1$ and at $x = -1$.

**Explain.** Write two sentences. The first explains why every curve passes
through the same point $(0, 1)$, whatever the base. The second explains why the
curve falls when $a$ is between $0$ and $1$.

> **Watch out.** These mistakes are common.
>
> **Reading $a^x$ as a power of $x$.** In $y = x^2$ the variable is the base; in
> $y = 2^x$ the variable is the exponent. The second curve grows far faster. For
> $x = 10$, $x^2 = 100$ but $2^{10} = 1024$.
>
> **Thinking the curve touches the $x$-axis.** The value of $a^x$ becomes very
> small as $x$ becomes very negative, but it never reaches zero. The $x$-axis is
> an asymptote, not a crossing point.
>
> **Using a negative or zero base.** The expression $(-2)^x$ has no real value
> for $x = \dfrac{1}{2}$, and $0^x$ is $0$ for every positive $x$. So the base
> must be positive.
>
> **Re-check:** for your sketch, confirm the $y$-intercept is $(0, 1)$, the
> curve stays above the $x$-axis, and the direction matches the size of the base.

## You should now be able to

- sketch $y = a^x$ for a positive base $a$;
- state the $y$-intercept, the asymptote and the range of $y = a^x$;
- decide whether the curve rises or falls from the size of the base;
- compare two exponential curves with different bases;
- sketch $y = e^x$ and explain what makes the base $e$ special;
- write any $a^x$ in the form $e^{kx}$.
