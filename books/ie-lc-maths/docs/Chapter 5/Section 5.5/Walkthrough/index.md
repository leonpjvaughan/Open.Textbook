---
title: 5.5 Cubic equations and the conjugate root theorem — Learn
chapter: 5
chapter_title: Complex numbers
section: '5.5'
section_title: Cubic equations and the conjugate root theorem
tier: H
refs:
- '4.4'
kind: walkthrough
---

# 5.5 Cubic equations and the conjugate root theorem — Learn

**Prerequisites:** Sections 5.1 to 5.4; the factor theorem; dividing a cubic by a linear
factor.

**Objectives:** solve a cubic with real coefficients using the conjugate root theorem;
build a quadratic from a conjugate pair; explain why complex roots come in pairs.

By the end of this section you can solve any real cubic whose roots are one real number
and a conjugate pair, and say why it must have that shape.

## The conjugate root theorem

> **The conjugate root theorem.** If a polynomial has real coefficients and $z$ is a root,
> then $\bar z$ is also a root.

Complex roots of a real polynomial therefore come in **conjugate pairs**.

**Why it is true.** Suppose $z = a + bi$ is a root, with $b \neq 0$. Substituting it into
the polynomial and simplifying gives a complex number equal to zero, so both its real and
its imaginary parts are zero. Substituting $\bar z = a - bi$ instead gives the **same
expression with the sign of every imaginary term flipped** — because the coefficients are
real, only the $i$'s change sign. If the real and imaginary parts were both zero before,
they are both zero again. So $\bar z$ is a root too.

## What this means for a cubic

A cubic has exactly three roots. If one of them is a non-real complex number, its
conjugate must be a root as well, so the three roots are

$$\text{one real root}, \quad z, \quad \bar z$$

A real cubic cannot have two real roots and one complex root. It has either **three real
roots**, or **one real root and a conjugate pair**.

## Solving the cubic

The method for a real cubic is always the same.

1. Find one real root by trying small whole numbers (use the factor theorem).
2. Divide the cubic by $(x - \text{that root})$ to leave a quadratic.
3. Solve the quadratic. If its discriminant is negative, the two roots are a conjugate
   pair.

**Example 1.** Solve $x^3 - 5x^2 + 11x - 15 = 0$.

**Step 1.** Try $x = 3$: $27 - 45 + 33 - 15 = 0$. So $x = 3$ is a root.

**Step 2.** Divide by $(x - 3)$. The quotient is $x^2 - 2x + 5$.

**Step 3.** Solve $x^2 - 2x + 5 = 0$:

$$x = \frac{2 \pm \sqrt{4 - 20}}{2} = \frac{2 \pm \sqrt{-16}}{2} = \frac{2 \pm 4i}{2} = 1 \pm 2i$$

The three roots are $3$, $1 + 2i$ and $1 - 2i$.

**Check.** $(x - 3)(x^2 - 2x + 5) = x^3 - 2x^2 + 5x - 3x^2 + 6x - 15 = x^3 - 5x^2 + 11x - 15$.
Correct.

## Building the quadratic from a pair

Given a conjugate pair, the quadratic with those roots can be written down without
expanding.

If the roots are $\alpha$ and $\beta$, the quadratic is

$$x^2 - (\alpha + \beta)x + \alpha\beta$$

For a conjugate pair $a \pm bi$:

- the sum is $(a + bi) + (a - bi) = 2a$, which is real;
- the product is $(a + bi)(a - bi) = a^2 + b^2$, which is real.

So the quadratic has **real coefficients**, as it must.

**Example 2.** Find the quadratic whose roots are $1 \pm 2i$.

Sum $= 2$, product $= 1 + 4 = 5$, so the quadratic is

$$x^2 - 2x + 5$$

exactly the factor from Example 1.

## Sum and product of the roots

For a cubic $ax^3 + bx^2 + cx + d = 0$ with roots $\alpha, \beta, \gamma$:

$$\alpha + \beta + \gamma = -\frac{b}{a} \qquad \alpha\beta\gamma = -\frac{d}{a}$$

These are worth knowing because they give a check on your roots, and because they explain
why the conjugate pair had to cancel.

**Example 3.** For $x^3 - 5x^2 + 11x - 15 = 0$, $a = 1$, $b = -5$, $d = -15$.

$$\text{sum} = 5 \qquad \text{product} = 15$$

Check against the roots: $3 + (1 + 2i) + (1 - 2i) = 5$, and
$3(1 + 2i)(1 - 2i) = 3 \times 5 = 15$. Both agree. The imaginary parts cancelled in both,
which is what a real sum and a real product require.

> **Watch out.** The conjugate root theorem needs the coefficients to be **real**. If a
> polynomial has complex coefficients, a complex root does not force its conjugate to be a
> root. Every polynomial in this course has real coefficients, so the theorem always
> applies — but say so when you use it.

## Progress check

Back to the chapter problem. You can now answer it fully.

The equation $x^3 - 5x^2 + 11x - 15 = 0$ has three roots: $3$, $1 + 2i$ and $1 - 2i$. Write
down why there are exactly three, why two of them are a pair, and what the diagram looks
like. Then check the sum and the product against the coefficients, as in Example 3.

That is the chapter problem solved. The "impossible root" was never impossible — it just
needed a number whose square is $-1$, and the pair came for free because the coefficients
are real.

## You should now be able to

- state the conjugate root theorem and say what condition it needs;
- explain why a real cubic has either three real roots or one real root and a pair;
- solve a real cubic by finding one root and dividing;
- build the quadratic with a given conjugate pair of roots, using sum and product;
- check roots against the sum and product formulas for a cubic.
