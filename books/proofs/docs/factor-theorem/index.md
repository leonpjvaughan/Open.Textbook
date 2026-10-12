---
title: The factor theorem
---

# The factor theorem

When you divide a polynomial $p(x)$ by $x - a$, the division leaves a remainder,
and that remainder is the value of the polynomial at $x = a$:

$$p(x) = (x - a)Q(x) + R, \qquad R = p(a).$$

That is the **remainder theorem**. If the remainder is zero, then $x - a$ divides
the polynomial exactly, with nothing left over:

$$x - a \text{ is a factor of } p(x) \quad \Longleftrightarrow \quad p(a) = 0.$$

That is the **factor theorem**. This page proves the first from the division, and
reads the second from it.

## Before you start

You need three facts.

- **Algebraic division.** Dividing $p(x)$ by $x - a$ gives a quotient $Q(x)$ and a
  remainder $R$, with $p(x) = (x - a)Q(x) + R$.
- **Degree of the remainder.** The remainder has a lower degree than the divisor.
  The divisor $x - a$ has degree $1$, so the remainder has degree $0$ — it is a
  constant, not an expression in $x$.
- **Substitution.** To work out $p(a)$, replace every $x$ by the number $a$ and
  work out the value.

## Predict first

Take $p(x) = x^3 - x - 6$.

**Before you read on, predict:** is $x - 2$ a factor of $p(x)$? Work out $p(2)$ by
hand, and write down whether you expect the division by $x - 2$ to come out
exactly. Then read the proof and see what that substitution is really computing.

## The remainder theorem

When you divide $p(x)$ by $x - a$, do the division as far as it goes. You get a
quotient and a remainder:

$$p(x) = (x - a)Q(x) + R.$$

The divisor $x - a$ has degree $1$. The remainder must have a lower degree, so $R$
is a constant. It is a number, not an expression in $x$.

Now substitute $x = a$ into both sides. This is allowed: the two sides are equal
for every value of $x$, so they are equal at $x = a$.

$$p(a) = (a - a)Q(a) + R.$$

The first bracket is zero, so the first term on the right disappears:

$$p(a) = 0 \times Q(a) + R = R.$$

So the remainder is exactly $p(a)$. Multiplying by $Q(a)$ is not needed to find
it, and neither is the division. Substituting one number gives the remainder.

## What a zero remainder means

A factor divides exactly. That means the division leaves no remainder, so $R = 0$.
Put $R = 0$ into the division identity:

$$p(x) = (x - a)Q(x).$$

The right-hand side is $x - a$ multiplied by a whole polynomial, and it equals
$p(x)$. So $x - a$ is a factor of $p(x)$.

The remainder theorem says $R = p(a)$. So $R = 0$ is the same statement as
$p(a) = 0$. Putting the two together gives the factor theorem:

$$x - a \text{ is a factor of } p(x) \quad \Longleftrightarrow \quad p(a) = 0.$$

The double arrow means both directions hold. If $x - a$ is a factor, then the
division has no remainder and $p(a) = 0$. If $p(a) = 0$, then the remainder is
zero, so the division has nothing left over and $x - a$ is a factor. Each
direction is the same division identity read a different way.

**Why this is useful.** Finding a factor of a cubic takes work; substituting a
number takes one line. The factor theorem turns the division into a substitution.
It also explains why one root is enough to start factorising: if $p(a) = 0$, then
$p(x) = (x - a)Q(x)$, and $Q$ has degree one less than $p$. A cubic becomes a
quadratic, which you can factorise in the usual way.

## A factor with a coefficient: (ax - b)

The theorem is written for $x - a$. A linear factor may have a number in front of
the $x$, such as $ax - b$. Take out the coefficient first:

$$ax - b = a\left(x - \frac{b}{a}\right).$$

The constant $a$ does not change whether the division is exact. Multiplying a
polynomial by a non-zero number cannot turn a zero remainder into a non-zero one,
or the other way round. So $ax - b$ is a factor of $p(x)$ exactly when
$x - \frac{b}{a}$ is a factor, which is exactly when

$$p\left(\frac{b}{a}\right) = 0.$$

**Example.** Is $2x - 1$ a factor of $p(x) = 2x^3 - x^2 + 2x - 1$? Here the value
to substitute is $x = \frac{1}{2}$:

$$p\left(\frac{1}{2}\right)
= 2 \cdot \frac{1}{8} - \frac{1}{4} + 2 \cdot \frac{1}{2} - 1
= \frac{1}{4} - \frac{1}{4} + 1 - 1 = 0.$$

The value is zero, so $2x - 1$ is a factor. Indeed,
$2x^3 - x^2 + 2x - 1 = (2x - 1)(x^2 + 1)$.

## Check your understanding

1. Work out the remainder when $x^3 - 4x^2 + 2x + 5$ is divided by $x - 3$.
2. Show that $x + 1$ is a factor of $p(x) = x^3 + 2x^2 - 5x - 6$.
3. Is $3x + 1$ a factor of $p(x) = 3x^3 + x^2 + 3x + 1$? Give a reason.

<details markdown="1">
<summary>Answers</summary>

1. By the remainder theorem the remainder is $p(3)$:
   $p(3) = 27 - 36 + 6 + 5 = 2$. The remainder is $2$.
2. Write $x + 1$ as $x - (-1)$, so $a = -1$. Then
   $p(-1) = -1 + 2 + 5 - 6 = 0$. The value is zero, so by the factor theorem
   $x + 1$ is a factor.
3. Write $3x + 1$ as $3\left(x + \frac{1}{3}\right)$, so the value to substitute
   is $x = -\frac{1}{3}$. Then
   $p\left(-\frac{1}{3}\right) = 3 \cdot \left(-\frac{1}{27}\right)
   + \frac{1}{9} - 1 + 1 = -\frac{1}{9} + \frac{1}{9} = 0$. The value is zero, so
   $3x + 1$ is a factor.
</details>

## A common error

For the divisor $x - a$, substitute $x = a$, with the sign that makes the bracket
zero. The divisor $x + 3$ is $x - (-3)$, so substitute $x = -3$, not $x = 3$.
Substituting the wrong sign turns a factor into a non-factor, or the reverse.

The other trap is treating a non-zero remainder as if it were zero. If $p(2) = 7$,
then $x - 2$ is **not** a factor, and the division is not finished. The full
statement is

$$p(x) = (x - 2)Q(x) + 7.$$

The value $7$ is the remainder, and it belongs in the answer.
