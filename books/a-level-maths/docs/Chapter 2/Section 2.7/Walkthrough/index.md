---
title: 2.7 Polynomials, the factor theorem and algebraic division — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.7'
section_title: Polynomials, the factor theorem and algebraic division
refs:
- B6
kind: walkthrough
---

# 2.7 Polynomials, the factor theorem and algebraic division — Learn

**Prerequisites:** expanding and collecting like terms; solving a quadratic by
factorising from 2.4; the meaning of a factor.

**By the end of this section you can:** divide a polynomial by a linear
expression and name the quotient and the remainder; use the remainder theorem to
find a remainder without dividing; use the factor theorem to test whether a
linear expression is a factor; and factorise a cubic completely.

## 1. Polynomials and their language

A **polynomial** is a sum of terms of the form $ax^n$, where $n$ is a whole
number. The **degree** is the highest power of $x$.

$$
p(x) = 2x^3 - 5x^2 + 4x - 7
$$

is a polynomial of degree $3$. The number $2$ is the leading coefficient, and
$-7$ is the constant term.

A polynomial of degree $n$ has at most $n$ roots, and at most $n$ linear
factors. A cubic can have up to three roots, which is why factorising a cubic
usually means finding one root and reducing the problem to a quadratic.

## 2. Algebraic division

Dividing a polynomial by a linear expression gives a **quotient** and a
**remainder**. The relationship is always

$$
p(x) = (x - a) Q(x) + R,
$$

where $Q(x)$ is the quotient, of degree one less than $p$, and $R$ is a
constant remainder.

**Example 1.** Divide $x^3 + 2x^2 - 5x + 1$ by $x - 2$.

The quotient must be a quadratic, $x^2 + bx + c$. Look at the leading terms:
$x \times x^2 = x^3$, which matches. Now work through the terms.

$$
(x - 2)(x^2 + 4x + 3) = x^3 + 4x^2 + 3x - 2x^2 - 8x - 6.
$$

Collect the terms:

$$
x^3 + 4x^2 + 3x - 2x^2 - 8x - 6 = x^3 + 2x^2 - 5x - 6.
$$

Compare with $x^3 + 2x^2 - 5x + 1$. The two agree except for the constant, which
is $1$ instead of $-6$. So

$$
x^3 + 2x^2 - 5x + 1 = (x - 2)(x^2 + 4x + 3) + 7.
$$

The quotient is $x^2 + 4x + 3$ and the remainder is $7$.

## 3. The remainder theorem

To find the remainder when $p(x)$ is divided by $x - a$, substitute $x = a$.
This is the **remainder theorem**:

$$
\text{the remainder on division by } x - a \text{ is } p(a).
$$

Why? Put $x = a$ in $p(x) = (x - a)Q(x) + R$. The first term on the right
vanishes, leaving $p(a) = R$.

**Example 2.** Use the remainder theorem to find the remainder when
$x^3 + 2x^2 - 5x + 1$ is divided by $x - 2$.

Substitute $x = 2$:

$$
p(2) = 2^3 + 2 \times 2^2 - 5 \times 2 + 1.
$$

Work out each term:

$$
p(2) = 8 + 8 - 10 + 1 = 7.
$$

The remainder is $7$, matching the division in Example 1, with no division
needed.

## 4. The factor theorem

A **factor** divides a polynomial exactly, leaving no remainder. The factor
theorem is the remainder theorem with the remainder set to zero:

$$
(x - a) \text{ is a factor of } p(x) \quad \Longleftrightarrow \quad p(a) = 0.
$$

The symbol $\Longleftrightarrow$ means the two statements hold together: each one
implies the other.

:::prove factor-theorem

**Example 3.** Show that $x - 2$ is a factor of $p(x) = x^3 - 3x^2 + 4x - 4$.

Substitute $x = 2$:

$$
p(2) = 2^3 - 3 \times 2^2 + 4 \times 2 - 4 = 8 - 12 + 8 - 4 = 0.
$$

The value is zero, so by the factor theorem $x - 2$ is a factor.

## 5. Factorising a cubic

To factorise a cubic, find one root, then divide to leave a quadratic. Factorise
the quadratic in the usual way.

**Example 4.** Factorise $p(x) = x^3 - 6x^2 + 11x - 6$.

Try small whole numbers for $x$. The constant term is $-6$, so a whole-number
root must be a factor of $6$: try $1$, $-1$, $2$, $-2$, $3$, $-3$.

$$
p(1) = 1 - 6 + 11 - 6 = 0.
$$

So $x - 1$ is a factor. Divide to find the quotient:

$$
x^3 - 6x^2 + 11x - 6 = (x - 1)(x^2 - 5x + 6).
$$

Factorise the quadratic:

$$
x^2 - 5x + 6 = (x - 2)(x - 3).
$$

So

$$
p(x) = (x - 1)(x - 2)(x - 3).
$$

**Example 5.** Factorise $p(x) = x^3 + 2x^2 - x - 2$.

Again the constant term is $-2$, so try $1$ and $-1$.

$$
p(1) = 1 + 2 - 1 - 2 = 0,
$$

so $x - 1$ is a factor. Divide:

$$
x^3 + 2x^2 - x - 2 = (x - 1)(x^2 + 3x + 2).
$$

Factorise the quadratic:

$$
x^2 + 3x + 2 = (x + 1)(x + 2).
$$

So

$$
p(x) = (x - 1)(x + 1)(x + 2).
$$

> **Watch out.** The factor theorem tests one value, and the answer is a yes or a
> no.
>
> A remainder of zero means the expression is a factor. A remainder that is not
> zero means it is not, and the division is not finished: write the remainder as
> well. If $p(2) = 7$, then $x - 2$ is not a factor, and
> $p(x) = (x - 2)Q(x) + 7$.
>
> **Re-check:** multiply your quotient back by the divisor and add the
> remainder. You must recover the original polynomial.

## Progress check

1. Work out the remainder when $x^3 - 4x^2 + 2x + 5$ is divided by $x - 3$.
2. Decide whether $x + 1$ is a factor of $x^3 - 7x + 6$.
3. Factorise $x^3 - 4x^2 + x + 6$ completely, and state its three roots.
4. A cubic has roots $1$, $2$ and $-3$. Write one possible cubic with these
   roots and a leading coefficient of $1$.

## You should now be able to

- name the degree, the leading coefficient and the constant term of a
  polynomial;
- divide a polynomial by a linear expression and state the quotient and the
  remainder;
- use the remainder theorem to find a remainder by substitution;
- use the factor theorem to test a possible factor;
- factorise a cubic by finding one root and dividing.
