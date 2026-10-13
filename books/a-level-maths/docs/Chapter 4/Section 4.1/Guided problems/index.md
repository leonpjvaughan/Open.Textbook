---
title: 4.1 Binomial expansion for positive integer n; n! and nCr — Practise with help
chapter: 4
chapter_title: Sequences and series
section: '4.1'
section_title: Binomial expansion for positive integer n; n! and nCr
refs:
- D1
kind: guided-problems
---

# 4.1 Binomial expansion for positive integer n; n! and nCr — Practise with help

Work each one first, closed book. Before you start a long expansion, write down
the row of coefficients and the two powers you will build.

## Warm-up: remember

1. Simplify $x^3 \times x^4$ and $\dfrac{x^7}{x^3}$.
2. Expand $(x + 3)(x - 2)$.
3. Work out $3^4$ and $(-2)^3$.

<details markdown="1">
<summary>Answers</summary>

1. Add the indices for a product: $x^3 \times x^4 = x^7$. Subtract them for a
   quotient: $\dfrac{x^7}{x^3} = x^4$.
2. $(x + 3)(x - 2) = x^2 - 2x + 3x - 6 = x^2 + x - 6$.
3. $3^4 = 81$ and $(-2)^3 = -8$.

If question 3 was hard, revisit the laws of indices in Section 2.1 before you
continue. An odd power of a negative number is negative.
</details>

## Practise with help

**1.** Work out $5!$ and $\binom{6}{2}$.

<details markdown="1">
<summary>Hint</summary>

The factorial multiplies every whole number from $1$ up to that number. For the
coefficient, use $\binom{n}{r} = \dfrac{n!}{r!\,(n-r)!}$ with $n = 6$ and
$r = 2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $6!$ and the two factorials on the bottom, $2!$ and $4!$. The $4!$
appears on the top and the bottom, so it cancels.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
5! = 1 \times 2 \times 3 \times 4 \times 5 = 120.
$$

$$
\binom{6}{2} = \frac{6!}{2!\,4!} = \frac{6 \times 5 \times 4!}{2 \times 4!}
= \frac{30}{2} = 15.
$$

There are $15$ ways to choose $2$ items from $6$.
</details>

**2.** Expand $(1 + x)^4$.

<details markdown="1">
<summary>Hint</summary>

Use row 4 of Pascal's triangle. Its entries are the coefficients $1, 4, 6, 4, 1$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write the powers of $x$ in order from $x^0$ to $x^4$, then put each coefficient
in front of its power.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(1 + x)^4 = 1 + 4x + 6x^2 + 4x^3 + x^4.
$$

The constant term is $1^4 = 1$, and the coefficient of $x^4$ is $1$, which
matches the outer entries of the row.
</details>

**3.** Expand $(1 + 3x)^4$.

<details markdown="1">
<summary>Hint</summary>

Start from the answer to question 2 and replace each $x$ with $3x$. Take care
with the powers of $3$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $(3x)^2 = 9x^2$, $(3x)^3 = 27x^3$ and $(3x)^4 = 81x^4$ before you
write the terms out.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(1 + 3x)^4 = 1 + 4(3x) + 6(3x)^2 + 4(3x)^3 + (3x)^4
= 1 + 12x + 54x^2 + 108x^3 + 81x^4.
$$

The coefficients grow because each power of $3x$ brings in a power of $3$.
</details>

**4.** Find the coefficient of $x^2$ in the expansion of $(3 + 2x)^5$.

<details markdown="1">
<summary>Hint</summary>

Use the single-term form $\binom{n}{r}a^{n-r}(bx)^r$, with $n = 5$, $r = 2$,
$a = 3$ and $b = 2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out the three numbers separately: $\binom{5}{2} = 10$, then $3^3 = 27$,
then $2^2 = 4$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\binom{5}{2}3^{3}2^{2} = 10 \times 27 \times 4 = 1080.
$$

The term is $1080x^2$, so the coefficient is $1080$. The factor $3^3 = 27$
comes from the part of the bracket that does not contain $x$.
</details>

**5.** Expand $(2 - x)^5$.

<details markdown="1">
<summary>Hint</summary>

Here $b = -x$, so every odd power of $x$ carries a minus sign. Use the
coefficients $1, 5, 10, 10, 5, 1$.
</details>

<details markdown="1">
<summary>Next step</summary>

Attach the powers of $-x$ to the powers of $2$ one term at a time. For the third
term, $\binom{5}{2}2^3(-x)^2 = 10 \times 8 \times x^2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(2 - x)^5 = 32 - 80x + 80x^2 - 40x^3 + 10x^4 - x^5.
$$

The constant term is $2^5 = 32$, and the final term is $(-x)^5 = -x^5$. The
signs alternate because each term brings one more factor of $-x$.
</details>

**6.** Find the term in $x^3$ in the expansion of $(1 - 2x)^7$.

<details markdown="1">
<summary>Hint</summary>

Here $a = 1$, so the power of $a$ is always $1$ and does not change the
coefficient. You need the term with $r = 3$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $\binom{7}{3} = 35$, then $(-2)^3 = -8$. The coefficient is the product
of those two numbers.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\binom{7}{3}1^{4}(-2x)^3 = 35 \times (-8)x^3 = -280x^3.
$$

The term is $-280x^3$. It is negative because the power of $-2x$ is odd.
</details>

**7.** A savings account pays 5% compound interest each year. Use the binomial
expansion of $(1.05)^2$ to work out the value of £800 after 2 years.

<details markdown="1">
<summary>Hint</summary>

Write the value as $800(1 + 0.05)^2$, then expand the bracket with $n = 2$ and
the coefficients $1, 2, 1$.
</details>

<details markdown="1">
<summary>Next step</summary>

Expand $(1 + 0.05)^2 = 1 + 2(0.05) + (0.05)^2 = 1 + 0.1 + 0.0025$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(1 + 0.05)^2 = 1.1025,
$$

so

$$
800 \times 1.1025 = 882.
$$

The account holds £882 after 2 years. The extra £82 is the two years of interest
added to the original £800.
</details>
