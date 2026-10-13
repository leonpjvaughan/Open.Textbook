---
title: 7.7 The product, quotient and chain rules — Learn
chapter: 7
chapter_title: Differentiation
section: '7.7'
section_title: The product, quotient and chain rules
refs:
- G4
kind: walkthrough
---

# 7.7 The product, quotient and chain rules — Learn

**Prerequisites:** the standard derivatives from Section 7.3, including
$e^{kx}$, $\sin kx$, $\cos kx$ and $\ln x$; multiplying and dividing algebraic
fractions.

**By the end of this section you can:** differentiate a product of two
functions; differentiate a quotient of two functions; differentiate a function
of a function with the chain rule; and choose the right rule for an expression.

## 1. The product rule

When a function is a product of two simpler functions, write the first as $u$ and
the second as $v$. Then

$$
\frac{d}{dx}(uv) = u\frac{dv}{dx} + v\frac{du}{dx}.
$$

In words: differentiate the first and keep the second, then keep the first and
differentiate the second, and add the two results.

:::prove product-rule

**Example 1.** Differentiate $y = x^2\sin x$.

Take $u = x^2$ and $v = \sin x$, so $\dfrac{du}{dx} = 2x$ and
$\dfrac{dv}{dx} = \cos x$. Then

$$
\frac{dy}{dx} = x^2\cos x + (\sin x)(2x) = x^2\cos x + 2x\sin x.
$$

**Example 2.** Differentiate $y = x e^{3x}$.

Take $u = x$ and $v = e^{3x}$. Then $\dfrac{du}{dx} = 1$ and
$\dfrac{dv}{dx} = 3e^{3x}$, so

$$
\frac{dy}{dx} = x(3e^{3x}) + e^{3x}(1) = e^{3x}(3x + 1).
$$

Taking out the common factor $e^{3x}$ tidies the answer.

## 2. The quotient rule

For a quotient $\dfrac{u}{v}$,

$$
\frac{d}{dx}\left(\frac{u}{v}\right)
= \frac{v\dfrac{du}{dx} - u\dfrac{dv}{dx}}{v^2}.
$$

The order matters in the numerator: the denominator times the derivative of the
top, minus the top times the derivative of the bottom.

**Example 3.** Differentiate $y = \dfrac{\sin x}{x}$.

Take $u = \sin x$ and $v = x$. Then $\dfrac{du}{dx} = \cos x$ and
$\dfrac{dv}{dx} = 1$, so

$$
\frac{dy}{dx} = \frac{x\cos x - \sin x \times 1}{x^2}
= \frac{x\cos x - \sin x}{x^2}.
$$

**Example 4.** Differentiate $y = \dfrac{2x + 1}{x - 3}$.

Take $u = 2x + 1$ and $v = x - 3$. Then $\dfrac{du}{dx} = 2$ and
$\dfrac{dv}{dx} = 1$, so

$$
\frac{dy}{dx} = \frac{(x - 3)(2) - (2x + 1)(1)}{(x - 3)^2}
= \frac{2x - 6 - 2x - 1}{(x - 3)^2}
= \frac{-7}{(x - 3)^2}.
$$

## 3. The chain rule

When a function is applied to another function, differentiate the outside and
multiply by the derivative of the inside:

$$
\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx},
$$

where $u$ is the inside function.

:::prove chain-rule

**Example 5.** Differentiate $y = (3x + 1)^5$.

Let $u = 3x + 1$, so $y = u^5$. Then

$$
\frac{dy}{du} = 5u^4,
\qquad
\frac{du}{dx} = 3,
$$

and

$$
\frac{dy}{dx} = 5u^4 \times 3 = 15(3x + 1)^4.
$$

**Example 6.** Differentiate $y = \sin(x^2)$.

The outside function is sine and the inside function is $x^2$:

$$
\frac{dy}{dx} = \cos(x^2) \times 2x = 2x\cos(x^2).
$$

**Example 7.** Differentiate $y = e^{x^2}$.

$$
\frac{dy}{dx} = e^{x^2} \times 2x = 2xe^{x^2}.
$$

**Example 8.** Differentiate $y = \ln(2x + 1)$.

$$
\frac{dy}{dx} = \frac{1}{2x + 1} \times 2 = \frac{2}{2x + 1}.
$$

## 4. Choosing the rule

Read the structure of the expression before you start.

| Structure | Rule | Example |
|---|---|---|
| A product, $u \times v$ | product rule | $x^2\sin x$ |
| A quotient, $\dfrac{u}{v}$ | quotient rule | $\dfrac{\sin x}{x}$ |
| A function of a function | chain rule | $\sin(x^2)$, $(3x+1)^5$ |
| A simple sum or multiple | power rule, term by term | $4x^3 - 2x$ |

A chain-rule expression can be a product as well. Then use the chain rule inside
the product rule, and name each part.

> **Watch out.** Four mistakes are common with these rules.
>
> **Leaving a term out of the product rule.** The rule has two terms, joined by a
> plus sign. The derivative of $uv$ is not $u'v'$. Check with $u = x$ and
> $v = x$: the product rule gives $1 \cdot x + x \cdot 1 = 2x$, which matches the
> derivative of $x^2$.
>
> **Reversing the quotient rule.** The numerator starts with the bottom times the
> derivative of the top. Reversing the two products changes the sign of the
> answer.
>
> **Forgetting the inside derivative in the chain rule.** The derivative of
> $\sin(x^2)$ is $2x\cos(x^2)$, not $\cos(x^2)$. Always multiply by the
> derivative of the inside.
>
> **Using the quotient rule on a constant denominator.** A fraction such as
> $\dfrac{x^2}{3}$ has a constant bottom, so divide by $3$ and use the power
> rule. **Re-check:** after differentiating, look for a common factor and take it
> out.

## You should now be able to

- differentiate a product with the product rule;
- differentiate a quotient with the quotient rule;
- differentiate a function of a function with the chain rule;
- choose the right rule from the structure of the expression;
- take out a common factor to simplify an answer.
