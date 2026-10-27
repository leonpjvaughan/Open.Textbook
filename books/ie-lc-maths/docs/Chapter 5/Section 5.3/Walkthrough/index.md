---
title: 5.3 The complex conjugate and division — Learn
chapter: 5
chapter_title: Complex numbers
section: '5.3'
section_title: The complex conjugate and division
tier: O
refs:
- '4.4'
kind: walkthrough
---

# 5.3 The complex conjugate and division — Learn

**Prerequisites:** Section 5.2 — multiplication and equating parts.

**Objectives:** find the complex conjugate; use $z\bar z = |z|^2$; divide complex numbers
by multiplying by the conjugate.

By the end of this section you can divide one complex number by another and write the
answer in standard form.

## The conjugate

The **complex conjugate** of $z = a + bi$ is written $\bar z$ and is found by changing
the sign of the imaginary part.

$$z = a + bi \qquad \bar z = a - bi$$

**Example 1.** The conjugate of $4 - 7i$ is $4 + 7i$. The conjugate of $3i$ is $-3i$, and
the conjugate of $7$ is $7$ (a real number is its own conjugate).

## The product $z\bar z$ is real

This is the fact the whole section rests on.

$$(a + bi)(a - bi) = a^2 - (bi)^2 = a^2 - b^2i^2 = a^2 + b^2$$

The two imaginary terms cancel, because $i^2 = -1$ turns $-b^2i^2$ into $+b^2$. So
$z\bar z$ is always a **non-negative real number**, and it is zero only when $z = 0$.

**Example 2.** Work out $(4 - 7i)(4 + 7i)$.

$$16 - 49i^2 = 16 + 49 = 65$$

## Dividing

To divide by a complex number, multiply the top and the bottom by the conjugate of the
bottom. The bottom becomes real, and the fraction is then a complex number divided by a
real number — which is standard form.

**Example 3.** Write $\dfrac{3 + 2i}{1 - i}$ in the form $a + bi$.

The conjugate of $1 - i$ is $1 + i$, so

$$\frac{3 + 2i}{1 - i} = \frac{(3 + 2i)(1 + i)}{(1 - i)(1 + i)}$$

Top:

$$(3 + 2i)(1 + i) = 3 + 3i + 2i + 2i^2 = 3 + 5i - 2 = 1 + 5i$$

Bottom:

$$(1 - i)(1 + i) = 1 - i^2 = 1 + 1 = 2$$

So

$$\frac{3 + 2i}{1 - i} = \frac{1 + 5i}{2} = \frac{1}{2} + \frac{5}{2}i$$

**Example 4.** Write $\dfrac{5}{2 + i}$ in the form $a + bi$.

$$\frac{5}{2 + i} = \frac{5(2 - i)}{(2 + i)(2 - i)} = \frac{10 - 5i}{4 + 1} = \frac{10 - 5i}{5} = 2 - i$$

## Rules for the conjugate

The conjugate behaves well under the operations, and two of these are worth knowing.

$$\overline{z + w} = \bar z + \bar w \qquad \overline{zw} = \bar z\,\bar w$$

where $z$ and $w$ are any two complex numbers.

In words: the conjugate of a sum is the sum of the conjugates, and the conjugate of a
product is the product of the conjugates. Both are true because changing the sign of each
imaginary part commutes with adding and with multiplying.

> **Watch out.** The conjugate is not the same as the negative. For $z = 3 + 4i$,
> $\bar z = 3 - 4i$ but $-z = -3 - 4i$. The conjugate flips the **imaginary** part only;
> the negative flips both.

## Progress check

Back to the chapter problem. The quadratic factor was $x^2 - 2x + 5$, and its roots are
$1 + 2i$ and $1 - 2i$ — conjugates of each other.

Divide one by the other: work out $\dfrac{1 + 2i}{1 - 2i}$ in standard form. You should
find a number whose modulus is 1, which is what always happens when you divide a number
by its conjugate. That is a first sign that the modulus is going to matter, and Section
5.4 is about the modulus.

## You should now be able to

- write down the complex conjugate of any complex number;
- use $z\bar z = a^2 + b^2$ and recognise that it is real;
- divide one complex number by another by multiplying by the conjugate of the
  denominator, and give the answer in standard form;
- state and use the conjugate rules for a sum and a product.
