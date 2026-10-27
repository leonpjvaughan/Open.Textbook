---
title: 4.1 Binomial expansion for positive integer n; n! and nCr — Learn
chapter: 4
chapter_title: Sequences and series
section: '4.1'
section_title: Binomial expansion for positive integer n; n! and nCr
refs:
- D1
kind: walkthrough
---

# 4.1 Binomial expansion for positive integer n; n! and nCr — Learn

**Prerequisites:** multiplying out two brackets; collecting like terms; the laws
of indices from Section 2.1; substituting into a formula.

**By the end of this section you can:** work out a factorial and a binomial
coefficient; expand $(a + bx)^n$ for a positive whole number $n$; find a single
term or coefficient without expanding the whole bracket; and use the expansion
to work out a compound-interest value.

## 1. Factorials

The **factorial** of a whole number is the product of all the whole numbers from
$1$ up to that number. We write it with an exclamation mark.

$$
4! = 1 \times 2 \times 3 \times 4 = 24,
$$

$$
5! = 1 \times 2 \times 3 \times 4 \times 5 = 120.
$$

The pattern continues: $6! = 6 \times 5! = 720$. Each factorial is the number
times the factorial before it. By agreement, $0! = 1$, which keeps the pattern
and the algebra working.

To work out $7!$ from $4!$ you do not multiply all seven numbers. Instead,

$$
7! = 7 \times 6 \times 5 \times 4! = 210 \times 24 = 5040.
$$

Cancelling like this is the reason factorials are useful in the next section.

## 2. The binomial coefficient

A **binomial coefficient** counts the number of ways to choose $r$ items from
$n$ items, when the order does not matter. We write it as $\binom{n}{r}$, and
also as $^nC_r$.

$$
\binom{n}{r} = \frac{n!}{r!\,(n-r)!}.
$$

**Example 1.** Work out $\binom{7}{3}$.

$$
\binom{7}{3} = \frac{7!}{3!\,4!} = \frac{7 \times 6 \times 5 \times 4!}{3! \times 4!}
= \frac{7 \times 6 \times 5}{3 \times 2 \times 1} = \frac{210}{6} = 35.
$$

The $4!$ cancels because it appears on the top and the bottom. This is why you
rarely need a full factorial.

Two properties follow from the definition and save work:

$$
\binom{n}{0} = \binom{n}{n} = 1, \qquad \binom{n}{r} = \binom{n}{n-r}.
$$

The second property says that choosing $3$ items to keep is the same as choosing
the other $4$ to leave behind. For example, $\binom{7}{3} = \binom{7}{4} = 35$.

## 3. Pascal's triangle

Write the binomial coefficients in rows, one row for each $n$, and a pattern
appears.

$$
\begin{array}{ccccccccccc}
& & & & 1 & & & & & & \\
& & & 1 & & 1 & & & & & \\
& & 1 & & 2 & & 1 & & & & \\
& 1 & & 3 & & 3 & & 1 & & & \\
1 & & 4 & & 6 & & 4 & & 1 & & \\
\end{array}
$$

Each entry is the sum of the two entries above it. The row for $n$ reads
$\binom{n}{0}, \binom{n}{1}, \dots, \binom{n}{n}$. The triangle is symmetric,
which is the property $\binom{n}{r} = \binom{n}{n-r}$ again.

## 4. The binomial theorem

The expansion of $(a + b)^n$, for two terms $a$ and $b$ and a positive whole
number $n$, is

$$
(a + b)^n = \binom{n}{0}a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2
+ \dots + \binom{n}{n}b^n.
$$

The powers of $a$ fall from $n$ to $0$ and the powers of $b$ rise from $0$ to
$n$. The coefficients are the entries of row $n$ of Pascal's triangle.

:::prove binomial-theorem

**Example 2.** Expand $(1 + 2x)^5$.

Here $a = 1$ and $b = 2x$, and $n = 5$. The coefficients are $1, 5, 10, 10, 5, 1$.

$$
(1 + 2x)^5 = 1 + 5(2x) + 10(2x)^2 + 10(2x)^3 + 5(2x)^4 + (2x)^5.
$$

Work out each power of $2x$ separately:

$$
= 1 + 10x + 40x^2 + 80x^3 + 80x^4 + 32x^5.
$$

The power of $x$ matches the power of $b$ in each term. This is the quickest
check on a long expansion.

**Example 3.** Expand $(2 - 3x)^4$.

Now $a = 2$ and $b = -3x$. Take care with the signs, because every odd power of
$-3x$ is negative.

$$
(2 - 3x)^4 = \binom{4}{0}2^4 + \binom{4}{1}2^3(-3x) + \binom{4}{2}2^2(-3x)^2
+ \binom{4}{3}2(-3x)^3 + \binom{4}{4}(-3x)^4.
$$

Work out each term:

$$
= 16 - 96x + 216x^2 - 216x^3 + 81x^4.
$$

The signs alternate. The constant term is $2^4 = 16$, which checks the first
term.

## 5. One term at a time

Often you need one term, and expanding everything is wasted work. The term in
$x^r$ in the expansion of $(a + bx)^n$ is

$$
\binom{n}{r}a^{n-r}(bx)^r.
$$

**Example 4.** Find the coefficient of $x^3$ in the expansion of $(2 + 5x)^6$.

Use $n = 6$, $r = 3$, $a = 2$ and $b = 5$:

$$
\binom{6}{3}2^{3}5^{3} = 20 \times 8 \times 125 = 20{,}000.
$$

The term is $20{,}000x^3$. Working out one coefficient takes one line, so there
is no need to expand the other six terms.

## 6. A link to probability

The coefficient $\binom{n}{r}$ counts choices. Toss a coin five times. The
number of orders in which exactly two heads can appear is $\binom{5}{2} = 10$.
So the probability of exactly two heads is $\frac{10}{32}$, because there are
$2^5 = 32$ equally likely orders in total. This is the binomial distribution,
and Chapter 13 returns to it.

## 7. Try it: the binomial row explorer

**Predict first.** The figure shows a row of Pascal's triangle and one term of
$(1 + x)^n$. Before you touch the controls, predict what happens to the
coefficient when $r$ moves from $2$ to $n - 2$, for a fixed $n$. Write your
prediction down.

:::figure ch4-binomial-explorer

**Test.** Move the slider for $n$ and watch the row change. Then keep $n$ fixed
and move the slider for the term number $r$. The readout gives the coefficient
$\binom{n}{r}$ and the term it produces.

**Explain.** For one setting, compare the coefficient at $r$ with the
coefficient at $n - r$. Write two sentences saying why those two coefficients
are equal. Use the idea of choosing which items to keep and which to leave
behind.

> **Watch out.** The commonest error is to forget the power of $a$. In Example
> 3 the term in $x^2$ of $(2 - 3x)^4$ is
> $\binom{4}{2}2^2(-3x)^2 = 6 \times 4 \times 9x^2 = 216x^2$. Writing only
> $\binom{4}{2}(-3x)^2$ gives $54x^2$, which drops the factor $2^2$. **Re-check:**
> put $x = 0$ into your expansion. Every term with an $x$ disappears, and what
> is left must be the constant term $a^n$. For $(2 - 3x)^4$ that is $16$, as it
> should be.

## Progress check

Return to the chapter problem. The former resident gives £2,000, and the account
pays 6% each year.

1. Write the value after one year as $2000 \times 1.06$.
2. Expand $(1 + 0.06)^3$ with the binomial theorem, using $n = 3$.
3. Work out the value of the gift after 3 years, to the nearest penny.

## You should now be able to

- work out a factorial, and cancel factorials before multiplying;
- work out a binomial coefficient with $\binom{n}{r} = \dfrac{n!}{r!\,(n-r)!}$;
- use the symmetry $\binom{n}{r} = \binom{n}{n-r}$;
- expand $(a + bx)^n$ for a positive whole number $n$, with the correct signs;
- find a single term or coefficient without expanding the whole bracket;
- use a binomial expansion to work out a compound-interest value.
