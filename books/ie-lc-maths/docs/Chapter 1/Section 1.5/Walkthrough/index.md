---
title: 1.5 Indices and the rules of indices — Learn
chapter: 1
chapter_title: Number systems and arithmetic
section: '1.5'
section_title: Indices and the rules of indices
tier: F
refs:
- '3.2'
kind: walkthrough
---

# 1.5 Indices and the rules of indices — Learn

**Prerequisites:** multiplication and division; factors; the meaning of a square
and a cube.

**Objectives:** use the three laws of indices; work out a power with index $0$ or
a negative index; evaluate a power of a power.

By the end of this section you can write a product of powers as one power, and
work out what a zero or negative index means.

## What an index means

An **index** (plural **indices**) counts how many copies of a number are
multiplied together. In $2^4$, the base is $2$ and the index is $4$:

$$2^4 = 2 \times 2 \times 2 \times 2 = 16$$

The index is also called the power. A base raised to a power is a **power**.

## The three laws of indices

**Law 1 — multiplying.** When the bases are the same, add the indices:

$$a^m \times a^n = a^{m+n}$$

where $a$ is the base and $m$ and $n$ are indices.

**Why.** $a^3 \times a^4$ is three copies of $a$ followed by four more, which is
seven copies in all.

$$a^3 \times a^4 = a^{3+4} = a^7$$

**Law 2 — dividing.** When the bases are the same, subtract the indices:

$$a^m \div a^n = a^{m-n}$$

**Why.** Four copies of $a$ on top and two underneath cancel in pairs, leaving
two on top.

$$a^4 \div a^2 = a^{4-2} = a^2$$

**Law 3 — a power of a power.** Multiply the indices:

$$(a^m)^n = a^{mn}$$

**Why.** $(a^3)^2$ means two copies of $a^3$, which is six copies of $a$ in all.

$$(a^3)^2 = a^{3 \times 2} = a^6$$

There is a fourth rule for a power of a product:

$$(ab)^n = a^n b^n$$

where $a$ and $b$ are factors and $n$ is the index.

The index applies to every factor inside the bracket, including a number in
front.

## The zero index and negative indices

The quotient law explains both.

$$a^2 \div a^2 = a^{2-2} = a^0$$

But $a^2 \div a^2 = 1$, so $a^0 = 1$ for any non-zero $a$.

A negative index means a reciprocal:

$$a^{-n} = \frac{1}{a^n}$$

**Example 1.** Work out $5^0$ and $2^{-3}$.

$$5^0 = 1 \qquad 2^{-3} = \frac{1}{2^3} = \frac{1}{8}$$

<!-- tier:h -->

## Fractional indices

A fractional index means a root:

$$a^{1/n} = \sqrt[n]{a}$$

So $a^{1/2} = \sqrt{a}$. A general fraction means the root first, then the power:

$$a^{m/n} = \left(\sqrt[n]{a}\right)^m$$

**Example 2.** Work out $27^{2/3}$.

$$27^{2/3} = \left(\sqrt[3]{27}\right)^2 = 3^2 = 9$$

Take the root first, because $\sqrt[3]{27}$ is a whole number. The arithmetic
stays exact that way.

<!-- /tier:h -->

## Worked examples

**Example 3.** Simplify $3^5 \div 3^2$.

$$3^5 \div 3^2 = 3^{5-2} = 3^3 = 27$$

**Example 4.** Simplify $x^3 \times x^5$.

$$x^3 \times x^5 = x^{3+5} = x^8$$

The law works for a letter just as it works for a number.

**Example 5.** Simplify $(2x^3)^2$.

$$(2x^3)^2 = 2^2 \times (x^3)^2 = 4x^6$$

The index $2$ applies to the $2$ as well as to the $x$.

> **Watch out.** Multiplying powers adds the indices; it does not multiply them.
> $x^3 \times x^5 = x^8$, not $x^{15}$. Multiplying the indices is the rule for a
> power of a power, $(x^3)^5 = x^{15}$. Read the bracket before you choose a law.

## Progress check

Back to the chapter problem. The quote multiplies the area by $1.05$ for waste
and by $1.10$ for profit.

Suppose the estimator doubled both measurements of the room. The area would then
be multiplied by $2^2 = 4$, not by $2$. Use the rule $(2x)^2 = 2^2 x^2 = 4x^2$ to
explain why.

The same rule says that a small error in a measurement has a bigger effect on the
area, because the area depends on the square of a length. Section 1.7 shows how
large that effect was.

## You should now be able to

- state what an index counts;
- use $a^m \times a^n = a^{m+n}$ and $a^m \div a^n = a^{m-n}$;
- use $(a^m)^n = a^{mn}$ and $(ab)^n = a^n b^n$;
- explain why $a^0 = 1$ and write $a^{-n}$ as a reciprocal;
- evaluate a power of a power without expanding it by hand.
