---
title: 8.5 Integration by substitution — Learn
chapter: 8
chapter_title: Integration
section: '8.5'
section_title: Integration by substitution
tier: H
refs:
- '5.2'
kind: walkthrough
---

# 8.5 Integration by substitution — Learn

**Prerequisites:** Sections 8.1 to 8.4 — integration and area; Section 7.5 — the chain rule.

**Objectives:** recognise an integral that a substitution will simplify; choose the inner
function as $u$; rewrite the integral and $dx$ in terms of $u$; change the limits of a
definite integral.

By the end of this section you can integrate a function of a function.

## Substitution reverses the chain rule

The chain rule differentiates a function of a function. Substitution integrates one, by
undoing the same move.

The pattern to look for is an inner function together with a multiple of its derivative:

$$\int f'(x)\,g(f(x))\,dx.$$

Let $u = f(x)$. Then $du = f'(x)\,dx$, and the integral becomes

$$\int g(u)\,du.$$

If that is simpler, the substitution has done its job.

**Example 1.** Find $\displaystyle\int 2x(x^2 + 1)^3\,dx$.

Let $u = x^2 + 1$. Then $\dfrac{du}{dx} = 2x$, so $du = 2x\,dx$, which is exactly the rest
of the integrand. Then

$$\int 2x(x^2 + 1)^3\,dx = \int u^3\,du = \frac{u^4}{4} + C
= \frac{(x^2 + 1)^4}{4} + C.$$

Here $C$ is the constant of integration. Check by differentiating. The chain rule brings
back $2x$ and the cube, so the answer is right.

**Example 2.** Find $\displaystyle\int 6x(3x^2 + 1)^2\,dx$.

Let $u = 3x^2 + 1$. Then $du = 6x\,dx$, so

$$\int 6x(3x^2 + 1)^2\,dx = \int u^2\,du = \frac{u^3}{3} + C
= \frac{(3x^2 + 1)^3}{3} + C.$$

## A linear inside function

When the inside function is linear, the substitution always works, and the balancing factor
is quick to find.

**Example 3.** Find $\displaystyle\int (2x + 1)^5\,dx$.

Let $u = 2x + 1$. Then $du = 2\,dx$, so $dx = \dfrac{1}{2}du$. Then

$$\int (2x + 1)^5\,dx = \frac{1}{2}\int u^5\,du
= \frac{1}{2} \times \frac{u^6}{6} + C = \frac{(2x + 1)^6}{12} + C.$$

The factor $\dfrac{1}{2}$ balances $du = 2\,dx$. Leaving it out is the usual error.

**Example 4.** Find $\displaystyle\int x\sqrt{x^2 + 4}\,dx$.

Let $u = x^2 + 4$. Then $du = 2x\,dx$, so $x\,dx = \dfrac{1}{2}du$, and
$\sqrt{x^2 + 4} = u^{1/2}$:

$$\int x\sqrt{x^2 + 4}\,dx = \frac{1}{2}\int u^{1/2}\,du
= \frac{1}{2} \times \frac{2}{3}u^{3/2} + C = \frac{1}{3}(x^2 + 4)^{3/2} + C.$$

**Example 5.** Find $\displaystyle\int \sin 3x\,dx$ by substituting $u = 3x$.

Here $du = 3\,dx$, so $dx = \dfrac{1}{3}du$:

$$\int \sin 3x\,dx = \frac{1}{3}\int \sin u\,du = -\frac{1}{3}\cos u + C
= -\frac{1}{3}\cos 3x + C.$$

This is the same standard result as Section 8.3, reached from the other direction.

## Definite integrals and the limits

For a definite integral, change the limits as well. Work out the value of $u$ at each end,
and integrate between the new limits. Then you never need to substitute back.

**Example 6.** Evaluate $\displaystyle\int_0^1 2x(x^2 + 1)^3\,dx$.

With $u = x^2 + 1$, the limits change. When $x = 0$, $u = 1$. When $x = 1$, $u = 2$. Then

$$\int_0^1 2x(x^2 + 1)^3\,dx = \int_1^2 u^3\,du
= \left[\frac{u^4}{4}\right]_1^2 = 4 - \frac{1}{4} = \frac{15}{4}.$$

If you forget to change the limits, you will substitute $u = 1$ and $u = 2$ as if they were
$x$-values, and the answer will be wrong.

## The chapter problem

A second tank fills at a rate $r(t) = 4t(t^2 + 1)^3$ litres per minute. This is a function
of a function, so a substitution finds the volume.

Let $u = t^2 + 1$. Then $du = 2t\,dt$, so $4t\,dt = 2\,du$. The limits become $u = 1$ at
$t = 0$ and $u = 2$ at $t = 1$:

$$\int_0^1 4t(t^2 + 1)^3\,dt = 2\int_1^2 u^3\,du
= 2\left[\frac{u^4}{4}\right]_1^2 = 2\left(4 - \frac{1}{4}\right) = \frac{15}{2}.$$

The second tank collects $7.5$ litres. The first tank needed no substitution, because its
rate was already a polynomial in $t$.

> **Watch out.** Three mistakes are common.
>
> **Forgetting to convert $dx$.** The integral must be written completely in terms of $u$.
> If an $x$ or a $dx$ is left behind, the substitution is incomplete.
>
> **Forgetting the balancing factor.** If $du = 2\,dx$, then $dx = \dfrac{1}{2}du$. The
> factor $\dfrac{1}{2}$ is part of the answer, not an optional extra.
>
> **Not changing the limits of a definite integral.** Substitute the old limits into
> $u = f(x)$ and use the two new values. Otherwise you are mixing two variables.
>
> **Re-check:** differentiate your answer. If the derivative is the original integrand, the
> substitution worked.

## Progress check

Back to the chapter problem. A second tank fills at $r(t) = 4t(t^2 + 1)^3$ litres per
minute.

Choose $u = t^2 + 1$, write down $du$, and find the volume that enters between $t = 0$ and
$t = 1$ minute. State the new limits before you integrate.

Keep your answer. The Review compares the two tanks.

## You should now be able to

- recognise an integral of the form $\displaystyle\int f'(x)g(f(x))\,dx$;
- choose the inner function as $u$ and find $du$;
- rewrite the whole integral, including $dx$, in terms of $u$;
- change the limits of a definite integral and integrate between the new limits;
- check a substitution by differentiating the answer.
