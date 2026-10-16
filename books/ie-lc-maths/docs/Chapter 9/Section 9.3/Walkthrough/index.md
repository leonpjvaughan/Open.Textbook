---
title: 9.3 Geometric sequences and series — Learn
chapter: 9
chapter_title: Sequences and series
section: '9.3'
section_title: Geometric sequences and series
tier: O
refs:
- '4.1'
kind: walkthrough
---

# 9.3 Geometric sequences and series — Learn

**Prerequisites:** Section 9.1 — arithmetic sequences; indices.

**Objectives:** recognise a geometric sequence; use $T_n = ar^{n-1}$; use the sum formula.

By the end of this section you can find any term of a geometric sequence, and add one up.

## Multiplying by the same amount each step

A **geometric sequence** is one in which each term is obtained by multiplying the one
before by the same number. That number is the **common ratio**, written $r$.

$$2,\; 6,\; 18,\; 54, \dots$$

Each term is $3$ times the last, so $r = 3$ and $a = 2$.

To test whether a sequence is geometric, divide each term by the one before it. If every
ratio is the same, it is geometric.

The difference from arithmetic is **add versus multiply**. Arithmetic adds $d$ each step;
geometric multiplies by $r$ each step.

## The nth term

$$T_1 = a \qquad T_2 = ar \qquad T_3 = ar^2 \qquad T_4 = ar^3$$

The power of $r$ is one less than the term number, so

> **The $n$th term.** $T_n = ar^{n-1}$.

**Example 1.** The sequence $5, 15, 45, \dots$ — find $T_6$.

$$a = 5,\quad r = 3,\quad T_6 = 5 \times 3^5 = 5 \times 243 = 1215$$

**Example 2.** A geometric sequence has first term $5$ and third term $45$. Find $r$.

$$ar^2 = 45 \quad\Rightarrow\quad 5r^2 = 45 \quad\Rightarrow\quad r^2 = 9 \quad\Rightarrow\quad r = \pm 3$$

Both are possible: with $r = -3$ the sequence is $5, -15, 45, \dots$, which also has third
term $45$. Taking a square root always gives two answers.

## The sum of a geometric series

> **The sum of a geometric series.**
> $$S_n = \frac{a(r^n - 1)}{r - 1} = \frac{a(1 - r^n)}{1 - r}$$
>
> The two forms are the same; the second is often easier when $r < 1$.

**Example 3.** Find the sum of the first five terms of $2, 6, 18, \dots$

$$S_5 = \frac{2(3^5 - 1)}{3 - 1} = \frac{2(243 - 1)}{2} = 242$$

Check by adding: $2 + 6 + 18 + 54 + 162 = 242$. Correct — and worth doing the first few
times, because the formula is easy to misremember.

**Example 4.** Find the sum of the first four terms of $80, 40, 20, \dots$

Here $r = \dfrac{1}{2}$, so the second form is tidier:

$$S_4 = \frac{80\left(1 - \left(\frac{1}{2}\right)^4\right)}{1 - \frac{1}{2}} = \frac{80 \times \frac{15}{16}}{\frac{1}{2}} = 150$$

> **Watch out.** In the sum formula, the power is $r^n$, **not** $r^{n-1}$, and it is
> $n$ terms, not $n - 1$. The formula is for the sum of the first $n$ terms, so $n$ counts
> the terms. Mixing the two formulas up — using $T_n$'s exponent in the sum — is the
> commonest error here.

## Progress check

Back to the chapter problem. **Plan B** saves €50 in the first month, then increases by
10% each month: $50, 55, 60.50, \dots$ with $a = 50$ and $r = 1.1$.

Find the total over 24 months using

$$S_{24} = \frac{50\left(1.1^{24} - 1\right)}{1.1 - 1}$$

You will need a calculator. Keep the answer, and compare it with Plan A's €6720. One plan
wins — work out which, and by how much.

## You should now be able to

- say whether a sequence is geometric, and find its common ratio;
- find any term using $T_n = ar^{n-1}$;
- find $r$ from two terms, remembering both signs of a square root;
- add the first $n$ terms of a geometric series.
