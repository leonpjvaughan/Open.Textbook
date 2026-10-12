---
title: 4.4 Sigma notation for sums — Learn
chapter: 4
chapter_title: Sequences and series
section: '4.4'
section_title: Sigma notation for sums
dfe:
- D3
kind: walkthrough
---

# 4.4 Sigma notation for sums — Learn

**Prerequisites:** generating terms of a sequence from a formula in Section 4.3;
expanding and simplifying algebraic expressions; the laws of indices.

**By the end of this section you can:** read a sum written with sigma notation;
write a sum of terms in sigma notation; evaluate a sum term by term; and use the
standard results for $\sum r$, $\sum r^2$ and $\sum r^3$ to add many terms at
once.

## 1. Sigma notation

The capital Greek letter sigma, $\Sigma$, means "add up". It saves writing a long
list of terms.

$$
\sum_{r=1}^{n} u_r = u_1 + u_2 + u_3 + \dots + u_n.
$$

Here $r$ is the **index**. It is a counter, not a quantity in the problem. The
number below the sigma is the first value of the index, and the number above is
the last. The expression after the sigma is the **summand**: the rule for each
term.

**Example 1.** Evaluate $\sum_{r=1}^{5}(3r + 1)$.

Write out the terms by substituting $r = 1, 2, 3, 4, 5$:

$$
\sum_{r=1}^{5}(3r + 1) = 4 + 7 + 10 + 13 + 16 = 50.
$$

The letter $r$ disappears when the terms are written out. It was only a counter,
so any letter would do.

## 2. Writing a sum in sigma notation

To write a list of terms as a sigma sum, find the rule that produces them and
count how many there are.

**Example 2.** Write $2 + 4 + 6 + \dots + 20$ in sigma notation.

The terms are the even numbers. The rule for the $r$th even number is $2r$. The
terms run from $r = 1$ (giving $2$) to $r = 10$ (giving $20$). So

$$
2 + 4 + 6 + \dots + 20 = \sum_{r=1}^{10} 2r.
$$

Checking the last term is the way to confirm the upper limit: $2 \times 10 = 20$,
which is the term given.

## 3. Working with the index

Two rules let you split a sum or take out a factor:

$$
\sum_{r=1}^{n}(u_r + v_r) = \sum_{r=1}^{n}u_r + \sum_{r=1}^{n}v_r,
$$

$$
\sum_{r=1}^{n}k u_r = k\sum_{r=1}^{n}u_r
$$

for a constant $k$. So

$$
\sum_{r=1}^{n}(au_r + bv_r) = a\sum_{r=1}^{n}u_r + b\sum_{r=1}^{n}v_r.
$$

A constant inside the sum is added once for each value of the index, which gives

$$
\sum_{r=1}^{n} c = nc.
$$

## 4. The standard results

Four standard results turn a long sum into one calculation. Each one starts at
$r = 1$ and stops at $r = n$.

$$
\sum_{r=1}^{n} 1 = n,
$$

$$
\sum_{r=1}^{n} r = \frac{n(n+1)}{2},
$$

$$
\sum_{r=1}^{n} r^2 = \frac{n(n+1)(2n+1)}{6},
$$

$$
\sum_{r=1}^{n} r^3 = \left(\frac{n(n+1)}{2}\right)^2.
$$

:::prove sum-of-the-first-n-squares

**Example 3.** Use the standard results to work out
$\sum_{r=1}^{20}(4r^2 - 2r)$.

Split the sum and take out each factor:

$$
\sum_{r=1}^{20}(4r^2 - 2r) = 4\sum_{r=1}^{20}r^2 - 2\sum_{r=1}^{20}r.
$$

Use the two standard results with $n = 20$:

$$
\sum_{r=1}^{20}r^2 = \frac{20 \times 21 \times 41}{6} = 2870,
\qquad
\sum_{r=1}^{20}r = \frac{20 \times 21}{2} = 210.
$$

So

$$
4(2870) - 2(210) = 11{,}480 - 420 = 11{,}060.
$$

Adding twenty terms by hand would take much longer, and one slip would spoil the
answer.

## 5. When the index does not start at 1

The standard results start at $r = 1$. To start later, add the missing terms and
take them away again.

**Example 4.** Use the standard results to work out $\sum_{r=5}^{10} r$.

$$
\sum_{r=5}^{10} r = \sum_{r=1}^{10} r - \sum_{r=1}^{4} r
= \frac{10 \times 11}{2} - \frac{4 \times 5}{2} = 55 - 10 = 45.
$$

Check by adding the terms: $5 + 6 + 7 + 8 + 9 + 10 = 45$. The two methods agree,
so the adjustment is correct.

> **Watch out.** The index limits are part of the sum, and they are often
> misread.
>
> **Using a standard result from the wrong start.** The formula
> $\sum_{r=1}^{n}r = \frac{n(n+1)}{2}$ assumes the sum begins at $r = 1$. For
> $\sum_{r=5}^{10} r$ the answer $55$ is the sum from $1$ to $10$, not from $5$
> to $10$. **Re-check:** add the first few terms by hand. For $\sum_{r=5}^{10}r$
> the first term is $5$, so the total must be less than $55$.
>
> **Mixing up the term and the sum.** The expression $u_n$ is one term, the
> $n$th. The sigma sum is the total of many terms. For the sequence
> $u_n = 50n + 100$, the term $u_{12}$ is $700$, but the sum of the first twelve
> terms is $5100$.

## Progress check

Return to the chapter problem. The quiz night raises $50n + 100$ pounds in
month $n$, and the online appeal raises $600(0.8)^{n-1}$ pounds.

1. Write the total raised by the quiz night in the first 12 months in sigma
   notation.
2. Use the standard result for $\sum n$ to work out that total.
3. Write the total raised by the appeal in the first 12 months in sigma
   notation.
4. Explain why the standard result for $\sum r$ cannot be used for the appeal
   sum.

## You should now be able to

- read the index and the limits of a sigma sum;
- write a list of terms in sigma notation, and check the last term;
- split a sum and take a constant factor outside it;
- use the standard results for $\sum r$, $\sum r^2$ and $\sum r^3$;
- adjust a sum whose index does not start at $1$;
- tell the difference between a single term and a sum of terms.
