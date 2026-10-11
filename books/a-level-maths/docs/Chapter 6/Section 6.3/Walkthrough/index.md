---
title: 6.3 Logarithms and the laws of logarithms — Learn
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.3'
section_title: Logarithms and the laws of logarithms
dfe:
- F3
- F4
kind: walkthrough
---

# 6.3 Logarithms and the laws of logarithms — Learn

**Prerequisites:** the graphs of $a^x$ and $e^x$ from Section 6.1; the laws of
indices from Chapter 2; the idea of an inverse function from Chapter 2.

**By the end of this section you can:** convert between exponential and
logarithmic form; evaluate a logarithm by writing the input as a power; sketch
$y = \ln x$; use the three laws of logarithms in both directions; and change the
base of a logarithm.

## 1. A logarithm undoes a power

A **logarithm** answers the question: what power of the base gives this number?

$$
\log_a x = y \quad \text{means} \quad a^y = x.
$$

The base $a$ must be positive and not equal to $1$. The input $x$ must be
positive, because $a^y$ is always positive. This is the **domain** of a
logarithm: $x > 0$.

**Example 1.** Write $2^5 = 32$ in logarithmic form.

The base $2$, the power $5$ and the result $32$ give

$$
\log_2 32 = 5.
$$

**Example 2.** Work out $\log_3 81$.

Ask what power of $3$ gives $81$. Since $81 = 3^4$, the answer is $4$.

**Example 3.** Work out $\log_2 \dfrac{1}{8}$.

Write the input as a power of the base: $\dfrac{1}{8} = 2^{-3}$. So
$\log_2 \dfrac{1}{8} = -3$. A logarithm of a number smaller than $1$ is
negative.

## 2. The graph of a logarithm

The logarithmic function $y = \log_a x$ is the **inverse** of $y = a^x$. Its
graph is the reflection of the exponential graph in the line $y = x$. So:

- it passes through $(1, 0)$, because $\log_a 1 = 0$;
- it passes through $(a, 1)$, because $\log_a a = 1$;
- the $y$-axis is a vertical asymptote, because the input must stay positive;
- the domain is $x > 0$ and the range is all real numbers;
- when $a > 1$ the graph rises, and when $0 < a < 1$ it falls.

The **natural logarithm**, written $\ln x$, is the logarithm to base $e$:

$$
\ln x = \log_e x.
$$

Its graph is the reflection of $y = e^x$ in the line $y = x$. Because $e$ is the
natural base for growth, $\ln x$ is the natural inverse.

## 3. The laws of logarithms

The three laws follow from the laws of indices. For positive $x$ and $y$:

$$
\log_a(xy) = \log_a x + \log_a y,
$$

$$
\log_a\dfrac{x}{y} = \log_a x - \log_a y,
$$

$$
\log_a\left(x^k\right) = k\log_a x.
$$

The first law says that adding logarithms multiplies the inputs. The second says
that subtracting logarithms divides the inputs. The third says that a multiplier
becomes a power. The power law holds for every real $k$, including $k = -1$ and
$k = -\dfrac{1}{2}$.

Two useful special values follow from the definition:

$$
\log_a a = 1, \qquad \log_a 1 = 0.
$$

**Example 4.** Write $\log_2 8 + \log_2 4$ as a single logarithm, and evaluate
it.

By the product law, $\log_2 8 + \log_2 4 = \log_2 32 = 5$. Checking directly:
$\log_2 8 = 3$ and $\log_2 4 = 2$, and $3 + 2 = 5$.

**Example 5.** Expand $\ln\dfrac{x^3}{y}$ using the laws of logarithms.

The quotient law splits the fraction, and the power law brings the $3$ down:

$$
\ln\frac{x^3}{y} = \ln x^3 - \ln y = 3\ln x - \ln y.
$$

**Example 6.** Write $2\ln x + \ln y$ as a single logarithm.

The power law turns the first term into $\ln x^2$. The product law then combines
the two terms:

$$
2\ln x + \ln y = \ln x^2 + \ln y = \ln\left(x^2y\right).
$$

**Example 7.** Solve $\log_5 x = 2$.

Rewrite the logarithm as a power: $x = 5^2 = 25$. The answer is positive, as the
domain requires.

**Example 8.** Change the base of $\log_2 7$ to base $e$.

Write $y = \log_2 7$, so $2^y = 7$. Take the natural logarithm of both sides:
$y\ln 2 = \ln 7$, giving

$$
\log_2 7 = \frac{\ln 7}{\ln 2}.
$$

This change-of-base rule turns any base into a base your calculator can handle.
Section 6.4 uses it to solve $a^x = b$.

> **Watch out.** These mistakes are common.
>
> **Treating a logarithm as a multiplier.** The symbol $\log$ is a function, not
> a number. So $\ln x$ is not $\ln \times x$, and $\ln 2x$ is not $2\ln x$.
>
> **Adding inside instead of multiplying.** The product law is
> $\log(xy) = \log x + \log y$. There is no simple law for $\log(x + y)$; in
> general $\log(x + y)$ is not $\log x + \log y$. Test it with $x = y = 10$:
> $\log_{10}20 \approx 1.30$, not $2$.
>
> **Ignoring the domain.** A logarithm needs a positive input. The equation
> $\log_2 x = 3$ has the single solution $x = 8$, because a negative or zero
> input is not allowed.
>
> **Re-check:** after using a law, choose a value for the letters and check both
> sides with a calculator. For example, test $\ln 6 = \ln 2 + \ln 3$.

## You should now be able to

- convert between $a^y = x$ and $\log_a x = y$;
- evaluate a logarithm by writing the input as a power of the base;
- sketch $y = \ln x$ and state its intercept, asymptote and domain;
- use the product, quotient and power laws in both directions;
- state the domain of a logarithmic expression;
- change the base of a logarithm.
