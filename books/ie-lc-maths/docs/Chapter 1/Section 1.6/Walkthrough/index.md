---
title: 1.6 Solving problems with indices — Learn
chapter: 1
chapter_title: Number systems and arithmetic
section: '1.6'
section_title: Solving problems with indices
tier: O
refs:
- '3.2'
kind: walkthrough
---

# 1.6 Solving problems with indices — Learn

**Prerequisites:** Section 1.5 — the laws of indices; prime factorisation;
solving a linear equation.

**Objectives:** solve an equation of the form $a^x = b$ by matching bases; solve
an equation where the index contains the unknown; use a power to model growth and
decay.

By the end of this section you can solve an equation where the unknown sits in
the index, and work out a value that grows or shrinks by a fixed percentage.

## Matching the bases

An equation such as $2^x = 32$ has the unknown in the index. The method is to
write both sides as powers of the **same** base, then compare the indices.

**Example 1.** Solve $2^x = 32$.

$$32 = 2^5 \qquad 2^x = 2^5 \qquad x = 5$$

When two powers of the same base are equal, their indices are equal. That is the
whole method.

## When the index contains the unknown

If the unknown is part of the index, expand the index and solve the resulting
equation.

**Example 2.** Solve $2^{x+1} = 16$.

$$16 = 2^4 \qquad 2^{x+1} = 2^4 \qquad x + 1 = 4 \qquad x = 3$$

**Example 3.** Solve $5^{2x} = 125$.

$$125 = 5^3 \qquad 2x = 3 \qquad x = \frac{3}{2}$$

The answer does not have to be a whole number.

## Making the bases the same

Sometimes the two bases are different powers of one smaller base.

**Example 4.** Solve $9^x = 3^{x+2}$.

Write $9$ as $3^2$. Then the left side is

$$9^x = (3^2)^x = 3^{2x}$$

Now the bases match:

$$3^{2x} = 3^{x+2} \qquad 2x = x + 2 \qquad x = 2$$

Writing both sides in the same base is the first move in every question of this
kind.

## Growth and decay

A quantity that rises by a fixed percentage each year is multiplied by the same
factor each year. After $n$ years the value is

$$\text{value} = \text{start} \times (\text{factor})^n$$

A rise of $4\%$ uses the factor $1.04$. A fall of $15\%$ uses the factor $0.85$.

**Example 5.** €500 is invested at $4\%$ per year. Find the value after $3$ years.

$$500 \times 1.04^3 = 500 \times 1.124864 = 562.432$$

So the value is €562.43 to the nearest cent.

**Example 6.** A car worth €24\,000 loses $15\%$ of its value each year. Find its
value after $2$ years.

$$24\,000 \times 0.85^2 = 24\,000 \times 0.7225 = 17\,340$$

The car is worth €17\,340 after two years.

> **Watch out.** The bases must match before you compare indices. From
> $2^x = 3^5$ you cannot read off $x = 5$, because the bases are different. Write
> both sides as powers of the same base first, and if they will not go into one
> base, the equation needs logarithms from a later chapter.

## Progress check

Back to the chapter problem. Carpet costs €32.40 per square metre, and the price
rises by $4\%$ each year.

Work out the price after $3$ years, using the index $3$:

$$32.40 \times 1.04^3$$

Compare the rise in the price with the error the estimator made. The estimator
rounded the measurements and lost €84.87, while three years of price rises change
the rate by only a few euro.

## You should now be able to

- solve $a^x = b$ by writing $b$ as a power of $a$;
- solve an equation where the index contains $x$;
- make two different bases the same by writing both as powers of a smaller base;
- model growth and decay with a power;
- explain why the bases must match before the indices can be compared.
