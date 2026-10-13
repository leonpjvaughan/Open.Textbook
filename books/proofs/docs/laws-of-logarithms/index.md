---
title: The laws of logarithms
---

# The laws of logarithms

For a base $a$ with $a > 0$ and $a \neq 1$, and for positive numbers $x$ and $y$,

$$\log_a(xy) = \log_a x + \log_a y,$$

$$\log_a\left(\frac{x}{y}\right) = \log_a x - \log_a y,$$

$$\log_a\left(x^k\right) = k\log_a x.$$

There is also the change-of-base rule, which turns a logarithm in one base into a
quotient of logarithms in another:

$$\log_a x = \frac{\log_b x}{\log_b a}.$$

## Before you start

You need three things:

- **What a logarithm is.** $\log_a x$ is the power you raise $a$ to in order to get
  $x$. So $\log_a x = y$ means exactly $a^y = x$.
- **The laws of indices.** $a^m \times a^n = a^{m+n}$, $a^m \div a^n = a^{m-n}$,
  and $(a^m)^n = a^{mn}$.
- **The rules for the base.** A base must satisfy $a > 0$ and $a \neq 1$. The proof
  shows where each rule is needed.

## Predict first

The first law says

$$\log_a(xy) = \log_a x + \log_a y.$$

The left-hand side multiplies the two inputs. The right-hand side adds the two
logarithms.

**Before you read on, predict:** a logarithm is an index, the power you raise the
base to. Multiplying two powers of the same base adds their indices, so why should
multiplying $x$ and $y$ add their logarithms? Write your answer in one sentence.
Then read the proof and compare.

## The proof

One idea runs through all three laws: **a logarithm is an index**. So each law is
an index law read backwards.

Write the two logarithms as letters:

$$u = \log_a x, \qquad v = \log_a y.$$

By the definition of a logarithm, that means

$$a^u = x, \qquad a^v = y.$$

Now take the three index laws in turn.

**The product law.** Multiply $x$ and $y$:

$$xy = a^u \times a^v = a^{u+v}.$$

The first index law added the indices. Read the result as a logarithm: the power of
$a$ that gives $xy$ is $u + v$. So

$$\log_a(xy) = u + v = \log_a x + \log_a y.$$

**The quotient law.** Divide $x$ by $y$ instead:

$$\frac{x}{y} = \frac{a^u}{a^v} = a^{u-v}.$$

The second index law subtracted the indices, so

$$\log_a\left(\frac{x}{y}\right) = u - v = \log_a x - \log_a y.$$

**The power law.** Raise $x$ to the power $k$:

$$x^k = (a^u)^k = a^{uk}.$$

The third index law multiplied the indices, so the power that gives $x^k$ is $uk$:

$$\log_a\left(x^k\right) = uk = k\log_a x.$$

That is all three laws. Each one is an index law, with the logarithm read off at
the end, and none of them is a new fact about logarithms.

**Two values worth keeping.** Because $a^1 = a$, we have $\log_a a = 1$. Because
$a^0 = 1$, we have $\log_a 1 = 0$. The second is why $\log_b a$ is zero only when
$a = 1$.

**The change-of-base rule.** This rule lets you work in a base of your choosing, so
it is worth deriving rather than quoting. Let

$$c = \log_a x, \qquad\text{so}\qquad a^c = x.$$

Take $\log_b$ of both sides:

$$\log_b\left(a^c\right) = \log_b x.$$

The power law, already proved, brings the $c$ down:

$$c\log_b a = \log_b x.$$

Now divide both sides by $\log_b a$. This is allowed because $\log_b a$ is not
zero: if $\log_b a = 0$ then $a = 1$, and the base $a$ is not $1$. So

$$c = \frac{\log_b x}{\log_b a}, \qquad\text{that is,}\qquad
\log_a x = \frac{\log_b x}{\log_b a}.$$

## What is assumed, and why

Each rule on the base and the inputs is doing a job. The proof would break without
it.

- **$a > 0$.** A logarithm is an index on the base $a$. A negative base has no real
  power for many exponents — $(-2)^{1/2}$ is not a real number — so a base that
  works for every input must be positive.
- **$a \neq 1$.** If $a = 1$ then $1^y = 1$ for every $y$. No power of $1$ gives a
  number other than $1$, so $\log_1 x$ has no answer when $x \neq 1$, and too many
  answers when $x = 1$. The base cannot be $1$.
- **$x > 0$ and $y > 0$.** Since $x = a^u$ and $y = a^v$, and a positive base raised
  to any power is positive, $x$ and $y$ must be positive. A logarithm of zero or of
  a negative number has no real value, so the laws are stated for positive inputs
  only.
- **$b > 0$ and $b \neq 1$** in the change-of-base rule, for the same two reasons.
  The division by $\log_b a$ is the third place the base matters: if $a = 1$ then
  $\log_b a = 0$ and the fraction has no value.

## Check your understanding

1. Write $\log_3 5 + \log_3 7$ as a single logarithm.
2. Use the power law to show that $\log_a\left(\dfrac{1}{x}\right) = -\log_a x$.
3. Explain why $\log_2(xy)$ is defined for $x = -2$ and $y = -3$ when you multiply
   first, but the law $\log_2 x + \log_2 y$ is not defined for those inputs.

<details markdown="1">
<summary>Answers</summary>

1. By the product law, $\log_3 5 + \log_3 7 = \log_3 35$.
2. $\dfrac{1}{x} = x^{-1}$, so by the power law with $k = -1$,
   $\log_a\left(x^{-1}\right) = -1 \times \log_a x = -\log_a x$.
3. The product $xy = (-2)(-3) = 6$ is positive, so $\log_2(xy) = \log_2 6$ exists.
   But $\log_2(-2)$ and $\log_2(-3)$ each ask for a power of $2$ that gives a
   negative number, and there is none. The law is stated for positive inputs
   because every logarithm in it must exist on its own, not only in combination.
</details>

## One more thing

The change-of-base rule is why a calculator needs only two logarithm buttons, one
for base $10$ and one for base $e$. To work out $\log_2 10$, write

$$\log_2 10 = \frac{\ln 10}{\ln 2} \approx \frac{2.3026}{0.6931} \approx 3.322.$$

You may use any base for the quotient. The two logarithms change together as the
base changes, so the ratio stays the same.

## A common error

The error is to write $\log_a(x+y) = \log_a x + \log_a y$. The laws apply to a
product and a quotient, not to a sum, and there is no simple rule for the
logarithm of a sum. Testing with numbers shows the difference: $\log_{10}(10+10)
\approx 1.30$, while $\log_{10}10 + \log_{10}10 = 2$.
