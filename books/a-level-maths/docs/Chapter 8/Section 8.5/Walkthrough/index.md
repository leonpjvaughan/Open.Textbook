---
title: 8.5 Integration by substitution and by parts — Learn
chapter: 8
chapter_title: Integration
section: '8.5'
section_title: Integration by substitution and by parts
refs:
- H5
kind: walkthrough
---

# 8.5 Integration by substitution and by parts — Learn

**Prerequisites:** the chain rule and the product rule from Section 7.7;
standard integrals and the power rule for integration from Section 8.1.

**By the end of this section you can:** use one substitution to turn an integral
into a standard form; change the limits of a definite integral when you
substitute; integrate a product by parts; and choose between the two methods.

## 1. Substitution reverses the chain rule

The chain rule differentiates a function of a function. Substitution runs it
backwards. If $u = g(x)$, then

$$
du = g'(x)dx,
$$

and the integral becomes

$$
\int f\big(g(x)\big)g'(x)dx = \int f(u)du.
$$

Here $f$ is the function being integrated.

Choose $u$ to be the inside function whose derivative also appears in the
integral. Then replace every part of the integral, including $dx$, and finish
with a standard integral.

**Example 1.** Find $\displaystyle\int 2x(x^2 + 1)^3dx$.

Let $u = x^2 + 1$. Then $du = 2xdx$, so $2xdx = du$. The integral becomes

$$
\int u^3du = \frac{u^4}{4} + C.
$$

Here $C$ is the constant of integration.

Substitute back:

$$
\int 2x(x^2 + 1)^3dx = \frac{(x^2 + 1)^4}{4} + C.
$$

**Example 2.** Find $\displaystyle\int 3x^2e^{x^3}dx$.

Let $u = x^3$, so $du = 3x^2dx$. Then

$$
\int 3x^2e^{x^3}dx = \int e^udu = e^u + C = e^{x^3} + C.
$$

**Example 3.** Find $\displaystyle\int \frac{2x}{x^2 + 1}dx$.

Let $u = x^2 + 1$, so $du = 2xdx$. Then

$$
\int \frac{2x}{x^2 + 1}dx = \int \frac{1}{u}du = \ln u + C = \ln(x^2 + 1) + C.
$$

### Definite integrals: change the limits

For a definite integral, change the limits to values of $u$ as you substitute.
Then you never need to return to $x$.

**Example 4.** Evaluate $\displaystyle\int_0^1 2x(x^2 + 1)^3dx$.

Let $u = x^2 + 1$, so $du = 2xdx$. Change the limits:

- when $x = 0$, $u = 0^2 + 1 = 1$;
- when $x = 1$, $u = 1^2 + 1 = 2$.

Then

$$
\int_0^1 2x(x^2 + 1)^3dx = \int_1^2 u^3du
= \left[\frac{u^4}{4}\right]_1^2 = \frac{16}{4} - \frac{1}{4} = \frac{15}{4}.
$$

## 2. Integration by parts reverses the product rule

The product rule differentiates a product. Integration by parts runs it
backwards. For two functions $u$ and $v$,

$$
\int u\frac{dv}{dx}dx = uv - \int v\frac{du}{dx}dx.
$$

In the shorter form, with $dv = v'(x)dx$ and $du = u'(x)dx$,

$$
\int udv = uv - \int vdu.
$$

Choose $u$ to be the part that becomes simpler when differentiated. A useful
order to try is **logarithm, inverse trigonometric, algebraic, trigonometric,
exponential**. The first type on that list is usually the best choice for $u$.

**Example 5.** Find $\displaystyle\int xe^{2x}dx$.

Take $u = x$ and $\dfrac{dv}{dx} = e^{2x}$. Then $\dfrac{du}{dx} = 1$ and
$v = \dfrac{1}{2}e^{2x}$. So

$$
\int xe^{2x}dx = x \times \frac{1}{2}e^{2x} - \int \frac{1}{2}e^{2x} \times 1dx
= \frac{1}{2}xe^{2x} - \frac{1}{4}e^{2x} + C.
$$

Taking out the common factor $e^{2x}$ gives

$$
\int xe^{2x}dx = \frac{e^{2x}(2x - 1)}{4} + C.
$$

**Example 6.** Find $\displaystyle\int x\sin xdx$.

Take $u = x$ and $\dfrac{dv}{dx} = \sin x$. Then $\dfrac{du}{dx} = 1$ and
$v = -\cos x$. So

$$
\int x\sin xdx = -x\cos x - \int (-\cos x)dx = -x\cos x + \sin x + C.
$$

**Example 7.** Find $\displaystyle\int \ln xdx$.

Write the integrand as $\ln x \times 1$. Take $u = \ln x$ and
$\dfrac{dv}{dx} = 1$. Then $\dfrac{du}{dx} = \dfrac{1}{x}$ and $v = x$. So

$$
\int \ln xdx = x\ln x - \int x \times \frac{1}{x}dx = x\ln x - \int 1dx
= x\ln x - x + C.
$$

**Example 8.** Find $\displaystyle\int x^2e^xdx$.

Take $u = x^2$ and $\dfrac{dv}{dx} = e^x$. Then $\dfrac{du}{dx} = 2x$ and
$v = e^x$, so

$$
\int x^2e^xdx = x^2e^x - 2\int xe^xdx.
$$

The new integral needs parts again, with $u = x$ and $v = e^x$:

$$
\int xe^xdx = xe^x - \int e^xdx = xe^x - e^x.
$$

Substitute this back:

$$
\int x^2e^xdx = x^2e^x - 2\left(xe^x - e^x\right) + C
= e^x\left(x^2 - 2x + 2\right) + C.
$$

**Example 9.** Evaluate $\displaystyle\int_0^1 xe^xdx$.

By parts with $u = x$ and $v = e^x$,

$$
\int xe^xdx = xe^x - e^x + C.
$$

To evaluate the definite integral, put the limits on the whole antiderivative:

$$
\int_0^1 xe^xdx = \Big[xe^x - e^x\Big]_0^1
= (e - e) - (0 - 1) = 1.
$$

> **Watch out.** Four mistakes are common.
>
> **Not replacing $dx$.** When you substitute $u = g(x)$, you must replace
> $dx$ as well. If any $x$ or $dx$ remains, the substitution is unfinished.
> Write $du = g'(x)dx$ and use it.
>
> **Forgetting to change the limits.** For a definite integral, convert the
> $x$-limits to $u$-limits before integrating. Leaving the old limits in place
> gives the wrong value.
>
> **Choosing the wrong part for $u$ in by parts.** If the new integral is harder
> than the first, swap the choice. Putting the polynomial as $u$ makes it
> simpler; putting the exponential as $u$ does not.
>
> **Dropping the minus sign in by parts.** The formula is $uv - \int vdu$,
> with a minus. **Re-check:** differentiate your answer and compare it with the
> original integrand.

## You should now be able to

- choose a substitution and find $du$;
- rewrite an integral completely in terms of $u$;
- change the limits of a definite integral when substituting;
- apply the integration by parts formula;
- use integration by parts twice when a power of $x$ is multiplied by an
  exponential;
- check an integral by differentiating the answer.
