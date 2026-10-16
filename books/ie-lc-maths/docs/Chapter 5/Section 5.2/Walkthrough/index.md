---
title: 5.2 Arithmetic with complex numbers — Learn
chapter: 5
chapter_title: Complex numbers
section: '5.2'
section_title: Arithmetic with complex numbers
tier: O
refs:
- '4.4'
kind: walkthrough
---

# 5.2 Arithmetic with complex numbers — Learn

**Prerequisites:** Section 5.1 — the form $a + bi$; expanding two brackets.

**Objectives:** add, subtract and multiply complex numbers; use $i^2 = -1$; equate real
and imaginary parts.

By the end of this section you can carry out any of the four operations on complex
numbers except division, which needs the next section.

## Adding and subtracting

Add the real parts together and the imaginary parts together. Nothing else happens.

$$(3 + 2i) + (1 - 4i) = (3 + 1) + (2 - 4)i = 4 - 2i$$

$$(5 - i) - (2 + 3i) = (5 - 2) + (-1 - 3)i = 3 - 4i$$

The only place to lose marks is a sign. In the second example the second bracket is
subtracted, so its imaginary part $-1$ becomes part of $-1 - 3$, not $-1 + 3$.

## Multiplying

Expand the two brackets exactly as you would with $x$, then replace $i^2$ with $-1$.

**Example 1.** Work out $(3 + 2i)(1 - 4i)$.

$$(3 + 2i)(1 - 4i) = 3 - 12i + 2i - 8i^2$$

Replace $i^2$ with $-1$:

$$= 3 - 10i - 8(-1) = 3 - 10i + 8 = 11 - 10i$$

**Example 2.** Work out $(2 + 3i)^2$.

$$(2 + 3i)^2 = 4 + 12i + 9i^2 = 4 + 12i - 9 = -5 + 12i$$

Notice that the answer has a **negative real part**. Squaring a complex number can move
it anywhere, which is why the square of a complex number is not always "larger" in any
useful sense.

**Example 3.** Work out $i(4 - 3i)$.

$$i(4 - 3i) = 4i - 3i^2 = 4i + 3 = 3 + 4i$$

Multiplying by $i$ has a geometrical meaning that Section 5.4 makes precise: it rotates
the number a quarter turn anticlockwise about the origin.

## Equating real and imaginary parts

Two complex numbers are equal exactly when their real parts are equal **and** their
imaginary parts are equal.

**Example 4.** Find $x$ and $y$ if $(x + 2) + 5i = 4 + (y - 1)i$.

Compare real parts:

$$x + 2 = 4 \quad\Rightarrow\quad x = 2$$

Compare imaginary parts:

$$5 = y - 1 \quad\Rightarrow\quad y = 6$$

> **Watch out.** This is the most useful idea in the chapter and the easiest to miss.
> One equation in complex numbers is **two** equations in real numbers. When a question
> gives you an equality of complex numbers and asks for unknowns, always split it into
> the real part and the imaginary part.

## Why the usual rules still apply

Complex numbers are added and multiplied by treating $i$ as a symbol and expanding as
usual. The only new rule is $i^2 = -1$.

Because the expansion is the same, the familiar laws carry over: addition and
multiplication are commutative and associative, and multiplication distributes over
addition. That is why $(3 + 2i)(1 - 4i)$ is expanded as two brackets in the ordinary way,
with no special cases.

## Progress check

Back to the chapter problem. In Section 5.1 you found the two complex roots of
$x^2 - 2x + 5 = 0$: they are $1 + 2i$ and $1 - 2i$.

Check them by multiplying. Expand $(x - (1 + 2i))(x - (1 - 2i))$ and simplify, using
$i^2 = -1$. You should get back $x^2 - 2x + 5$ exactly. That confirms the roots, and it
also shows why the imaginary terms disappeared — keep that observation for Section 5.5.

## You should now be able to

- add and subtract complex numbers, keeping the signs right;
- multiply complex numbers by expanding and replacing $i^2$ with $-1$;
- simplify any power of $i$;
- split one complex equation into two real equations and solve them.
