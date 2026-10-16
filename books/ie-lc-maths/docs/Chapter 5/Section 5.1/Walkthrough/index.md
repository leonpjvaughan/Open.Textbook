---
title: 5.1 The imaginary unit and complex numbers — Learn
chapter: 5
chapter_title: Complex numbers
section: '5.1'
section_title: The imaginary unit and complex numbers
tier: O
refs:
- '4.4'
kind: walkthrough
---

# 5.1 The imaginary unit and complex numbers — Learn

**Prerequisites:** solving a quadratic by formula; the discriminant.

**Objectives:** say what $i$ is; write a complex number in the form $a + bi$; name its
real and imaginary parts; solve $x^2 + k = 0$.

By the end of this section you can write down a number whose square is negative, and say
what the two parts of a complex number are.

## A number whose square is negative

You know that no real number squares to a negative, because a negative times a negative
is positive. So $x^2 = -1$ has no real solution, and any quadratic with a negative
discriminant has no real roots.

Mathematicians did not stop there. They **defined** a new number, called $i$, by the
property that

$$i^2 = -1$$

That is the whole definition. $i$ is not a real number, and it is not a trick: it is a
new object, defined by one rule, and the rest of the chapter shows that arithmetic with
it behaves exactly as you would hope.

> **The imaginary unit.** $i$ is the number with $i^2 = -1$.

Once $i$ exists, every negative square root does too:

$$\sqrt{-9} = \sqrt{9 \times (-1)} = \sqrt{9}\sqrt{-1} = 3i$$

**Example 1.** Solve $x^2 + 9 = 0$.

$$x^2 = -9 \qquad x = \pm\sqrt{-9} = \pm 3i$$

The two solutions are $3i$ and $-3i$. There are two, because a quadratic has two roots —
the same as before, they are not real.

## Complex numbers

A **complex number** is any number of the form

$$z = a + bi$$

where $a$ and $b$ are ordinary real numbers.

- $a$ is the **real part** of $z$, written $\operatorname{Re}(z)$;
- $b$ is the **imaginary part**, written $\operatorname{Im}(z)$.

This is called the **standard form**, and it is how every answer in this chapter should be
written unless the question says otherwise.

**Example 2.** Write down the real and imaginary parts of $5 - 3i$.

$$\operatorname{Re}(5 - 3i) = 5 \qquad \operatorname{Im}(5 - 3i) = -3$$

The imaginary part is the **number multiplying $i$**, so it is $-3$. Writing $-3i$, or
$3$, are both wrong.

**Example 3.** Write $\dfrac{1}{i}$ in the form $a + bi$.

Multiply top and bottom by $i$:

$$\frac{1}{i} = \frac{i}{i^2} = \frac{i}{-1} = -i$$

So $a = 0$ and $b = -1$.

## Powers of $i$

Powers of $i$ repeat in a cycle of four, and the cycle is worth remembering.

$$i^1 = i \qquad i^2 = -1 \qquad i^3 = -i \qquad i^4 = 1$$

Then $i^5 = i^4 \cdot i = i$, and the cycle starts again.

To simplify a high power, divide the index by 4 and use the remainder.

**Example 4.** Simplify $i^{27}$.

$$27 = 4 \times 6 + 3 \quad\Rightarrow\quad i^{27} = i^3 = -i$$

> **Watch out.** $i$ is not a variable and not an unknown. You cannot "solve for $i$", and
> $i^2 = -1$ is not a fact you derive — it is the definition. What you can do is treat
> $i$ as a symbol when expanding, exactly as you would treat $x$, and then replace every
> $i^2$ with $-1$. That single replacement is what makes complex arithmetic work.

## Real numbers are complex numbers

Every real number is a complex number with $b = 0$: the number $7$ is $7 + 0i$. So the
real numbers are contained in the complex numbers, and nothing you already know is lost.

A complex number with $a = 0$, such as $3i$, is called **purely imaginary**. The number
$0$ is both real and purely imaginary, which is the one case where the two descriptions
overlap.

## Progress check

Back to the chapter problem. You have $x^3 - 5x^2 + 11x - 15 = 0$ and you have found that
$x = 3$ is a root, leaving $x^2 - 2x + 5 = 0$.

Work out the discriminant of that quadratic. It is negative, so the two remaining roots
are not real — and now that $i$ exists, you can write them down. Solve $x^2 - 2x + 5 = 0$
by the formula and keep the answer: Section 5.2 checks it by multiplying, and Section 5.5
explains why it had to come out as a pair.

## You should now be able to

- state what $i$ is and simplify any power of $i$;
- write a complex number in the form $a + bi$ and name its real and imaginary parts;
- write the square root of a negative number in terms of $i$;
- solve $x^2 + k = 0$ for any positive $k$, and say why there are two solutions.
