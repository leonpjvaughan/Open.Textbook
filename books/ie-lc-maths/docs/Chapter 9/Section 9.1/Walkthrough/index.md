---
title: 9.1 Arithmetic sequences — Learn
chapter: 9
chapter_title: Sequences and series
section: '9.1'
section_title: Arithmetic sequences
tier: O
refs:
- '4.1'
kind: walkthrough
---

# 9.1 Arithmetic sequences — Learn

**Prerequisites:** substituting into a formula.

**Objectives:** recognise an arithmetic sequence; find $a$ and $d$; use $T_n = a + (n-1)d$.

By the end of this section you can find any term of an arithmetic sequence.

## Adding the same amount each step

An **arithmetic sequence** is one in which each term is obtained by adding the same number
to the one before it. That number is the **common difference**, written $d$.

$$3,\; 8,\; 13,\; 18, \dots$$

Each term is $5$ more than the last, so $d = 5$. The first term is written $a$, so
$a = 3$.

To test whether a sequence is arithmetic, subtract each term from the one after it. If
every difference is the same, it is arithmetic.

## The formula for the nth term

The first term is $a$. Each step adds $d$.

$$T_1 = a \qquad T_2 = a + d \qquad T_3 = a + 2d \qquad T_4 = a + 3d$$

The number of $d$'s is always one less than the term number, so

> **The $n$th term.** $T_n = a + (n-1)d$.

**Example 1.** Find the tenth term of $3, 8, 13, \dots$.

$$a = 3,\quad d = 5,\quad T_{10} = 3 + 9(5) = 48$$

**Example 2.** The sequence $7, 12, 17, \dots$ — find a formula for $T_n$, then $T_{30}$.

$$T_n = 7 + (n-1)5 = 5n + 2$$

$$T_{30} = 5(30) + 2 = 152$$

Simplifying the formula is worth doing: $5n + 2$ is quicker to use than
$7 + 5(n-1)$, and both must give the same answer.

## Finding a term number

Sometimes you know the term and want the number.

**Example 3.** Which term of $3, 7, 11, \dots$ is $83$?

$$3 + (n-1)4 = 83 \quad\Rightarrow\quad 4(n-1) = 80 \quad\Rightarrow\quad n = 21$$

It is the $21$st term. If the value of $n$ had not been a whole number, the answer would
be "no term has that value" — always check that $n$ comes out whole.

## Finding a and d from two terms

**Example 4.** The third term is $11$ and the eighth is $31$. Find $d$ and $a$.

Between the third and eighth terms there are $8 - 3 = 5$ steps, and the value rose by
$31 - 11 = 20$, so

$$d = \frac{20}{5} = 4$$

Then $T_3 = a + 2d = 11$, so $a = 11 - 8 = 3$.

> **Watch out.** The gap between the third and eighth terms is $5$ steps, not $8 - 3 + 1$
> and not $8$. The number of steps between two terms is the difference of their term
> numbers. Getting this wrong is the commonest error in this section, and it shows up as
> $d$ being wrong by a simple fraction.

## Progress check

Back to the chapter problem. **Plan A** saves €50 in the first month and €20 more each
month: $50, 70, 90, \dots$

Write down $a$ and $d$ for Plan A, then find the amount saved in month 24. Keep it — you
need it for the total, and Section 9.2 adds the 24 months up.

## You should now be able to

- say whether a sequence is arithmetic, and find its common difference;
- find any term from $a$ and $d$ using $T_n = a + (n-1)d$;
- work out which term a given value is, and check that the answer is a whole number;
- find $a$ and $d$ given any two terms.
