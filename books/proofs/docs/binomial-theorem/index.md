---
title: The binomial theorem for a positive whole number n
---

# The binomial theorem for a positive whole number n

For a positive whole number $n$,

$$(a + b)^n = \binom{n}{0}a^n + \binom{n}{1}a^{n-1}b + \dots + \binom{n}{n}b^n.$$

The coefficient of $a^{n-k}b^k$ is the binomial coefficient $\binom{n}{k}$, which
counts the ways to choose $k$ things from $n$. Written as one sum,

$$(a + b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k.$$

## Before you start

You need three ideas, and nothing else:

- **Multiplying powers of the same base.** $a^m \times a^n = a^{m+n}$. For example,
  $a^2 \times a = a^3$.
- **What expanding brackets means.** To expand a product of brackets you multiply
  every term in one bracket by every term in the other. Taking one letter from each
  bracket is the same process, written shorter.
- **The binomial coefficient.** $\binom{n}{k}$ is the number of ways to choose $k$
  things from $n$ when the order does not matter. You may know it as $^nC_k$, and

$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}.$$

## Predict first

Write $(a + b)^3$ as $(a + b)(a + b)(a + b)$. Each bracket will give either an $a$
or a $b$ to every term.

**Before you read on, predict:** how many of the products from the three brackets
give $a^2b$? Write your prediction down. If you are not sure, count the ways to
choose which one of the three brackets gives the $b$.

Then look at the figure. It shows every way to fill the three brackets, and it
counts the ways that give each term.

:::figure binomial-choices

Did the count match your prediction? Read on to see why that count is the
coefficient.

## The proof

Start with the product of $n$ identical brackets:

$$(a + b)^n = (a + b)(a + b)\cdots(a + b).$$

**Every product comes from a choice.** To expand, take one letter from each bracket
and multiply the letters together. With three brackets, taking $a$ from the first,
$b$ from the second and $a$ from the third gives $aba = a^2b$.

**Many choices give the same product.** A choice that takes $b$ from $k$ of the
brackets, and $a$ from the other $n - k$ brackets, gives

$$a^{n-k}b^k.$$

The letters arrive in some order, and multiplication does not care about order, so
every such choice gives the same product.

**Count the choices that give it.** The product $a^{n-k}b^k$ fixes only *how many*
brackets gave $b$: exactly $k$ of them. Any set of $k$ brackets could be the ones
that gave $b$. So the number of choices that produce $a^{n-k}b^k$ is the number of
ways to choose $k$ brackets from the $n$ brackets. That number is the binomial
coefficient,

$$\binom{n}{k} = \frac{n!}{k!\,(n-k)!}.$$

**Add the groups.** Every choice from the brackets gives one product, and every
choice lies in exactly one group, because it takes $b$ from exactly one number of
brackets. The groups therefore account for all $2^n$ choices, once each. Adding the
groups in order of $k$ gives

$$(a + b)^n = \binom{n}{0}a^n + \binom{n}{1}a^{n-1}b + \dots + \binom{n}{n}b^n.$$

That is the binomial theorem: the coefficient of $a^{n-k}b^k$ is $\binom{n}{k}$.

**Check the ends.** The $k = 0$ term is $\binom{n}{0}a^n = a^n$, because there is
exactly one way to choose no bracket to give $b$. The $k = n$ term is
$\binom{n}{n}b^n = b^n$, for the same reason. Those are the first and last terms
you would get by multiplying out, so the ends agree with the expansion.

## Why these are the numbers in Pascal's triangle

Pascal's triangle is built by adding the two entries above each one. The binomial
coefficients obey the same rule, and the reason is another choice.

Write the $n$ brackets as $n - 1$ brackets followed by one more bracket. To choose
the $k$ brackets that give $b$:

- **The last bracket does not give $b$.** Then all $k$ of the $b$'s come from the
  first $n - 1$ brackets, which can happen in $\binom{n-1}{k}$ ways.
- **The last bracket gives $b$.** Then the other $k - 1$ of the $b$'s come from
  the first $n - 1$ brackets, which can happen in $\binom{n-1}{k-1}$ ways.

These two cases cover every way to choose, and no choice is in both. So

$$\binom{n}{k} = \binom{n-1}{k} + \binom{n-1}{k-1}.$$

That is exactly the rule for building each entry of Pascal's triangle from the two
entries above it. The row for $n$ reads

$$\binom{n}{0}, \binom{n}{1}, \dots, \binom{n}{n},$$

so the coefficients of $(a + b)^n$ are the numbers in that row. For example, row
$4$ is $1, 4, 6, 4, 1$, so

$$(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4.$$

## Why $n$ must be a positive whole number

The proof counts brackets. You can count a positive whole number of brackets,
choose from them and multiply them out, so the argument applies. The case $n = 0$
is the empty product, $(a + b)^0 = 1$, and the formula gives $1$ there too.

When $n$ is not a positive whole number, the expansion does not stop, and the
coefficients are not binomial coefficients. The general binomial series replaces
$\binom{n}{k}$ with a product that keeps going, under its own conditions on $a$ and
$b$. That is a different theorem, and it is not proved here.

## Check your understanding

1. Write down the coefficient of $a^3b^2$ in $(a + b)^5$, and say how you found it
   without expanding.
2. How many products are there in the expansion of $(a + b)^n$ before like terms
   are collected? Which powers of $a$ appear?
3. Row $3$ of Pascal's triangle is $1, 3, 3, 1$. Use the rule
   $\binom{4}{2} = \binom{3}{2} + \binom{3}{1}$ to work out $\binom{4}{2}$.

<details markdown="1">
<summary>Answers</summary>

1. The term is $a^3b^2$, so $n = 5$ and $k = 2$. The coefficient is
   $\binom{5}{2} = \dfrac{5!}{2!\,3!} = \dfrac{120}{12} = 10$.
2. There are $2^n$ choices, so $2^n$ products before collecting. The powers of $a$
   run from $n$ down to $0$: $a^n, a^{n-1}, \dots, a, 1$. After collecting like
   terms there are $n + 1$ terms.
3. $\binom{3}{2} = 3$ and $\binom{3}{1} = 3$, so $\binom{4}{2} = 3 + 3 = 6$.
</details>

## A common error

Watch out for losing the power of $a$. The coefficient $\binom{n}{k}$ belongs with
$a^{n-k}b^k$. In $(2 + x)^4$, the term in $x^2$ is

$$\binom{4}{2}2^{4-2}x^2 = 6 \times 4x^2 = 24x^2,$$

not $6x^2$. The $2$ is raised to the power $4 - 2$, because two of the four
brackets gave $2$ and the other two gave $x$.

**Re-check:** put $b = 0$. Every term except the first disappears, and what is left
must be $a^n$. For $(2 + x)^4$ that is $16$, which is $2^4$.
