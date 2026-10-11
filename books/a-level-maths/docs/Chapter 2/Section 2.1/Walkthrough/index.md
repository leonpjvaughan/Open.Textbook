---
title: 2.1 Laws of indices for rational exponents — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.1'
section_title: Laws of indices for rational exponents
dfe:
- B1
kind: walkthrough
---

# 2.1 Laws of indices for rational exponents — Learn

**Prerequisites:** integer powers; square roots and cube roots; multiplying and
dividing fractions; the index laws for whole-number exponents.

**By the end of this section you can:** write a root as a power; evaluate an
expression such as $16^{\frac{3}{4}}$; apply the index laws with fractional and
negative exponents; and solve an equation in which the unknown is a base with a
rational exponent.

## 1. The index laws you already know

An **index** (or power) counts repeated multiplication. For a base $a$ and whole
numbers $m$ and $n$:

$$
a^m \times a^n = a^{m+n}, \qquad \frac{a^m}{a^n} = a^{m-n}, \qquad \left(a^m\right)^n = a^{mn}.
$$

These laws work for every exponent, not only whole numbers. Two more follow from
them.

$$
a^0 = 1 \qquad \text{and} \qquad a^{-n} = \frac{1}{a^n}.
$$

The second law turns a negative index into a reciprocal. For example,
$5^{-2} = \frac{1}{25}$ and $\left(\frac{2}{3}\right)^{-1} = \frac{3}{2}$.

## 2. A root is a fractional power

The square root of $a$ is the number whose square is $a$. We write
$\sqrt{a} = a^{\frac{1}{2}}$, because

$$
a^{\frac{1}{2}} \times a^{\frac{1}{2}} = a^{\frac{1}{2} + \frac{1}{2}} = a^{1} = a.
$$

In the same way, the $n$th root is the power $\frac{1}{n}$:

$$
a^{\frac{1}{n}} = \sqrt[n]{a}.
$$

A power with a numerator builds on this. The numerator counts how many times the
root is repeated, and the denominator names the root:

$$
a^{\frac{m}{n}} = \left(\sqrt[n]{a}\right)^m = \sqrt[n]{a^m}.
$$

For example, $8^{\frac{2}{3}} = \left(\sqrt[3]{8}\right)^2 = 2^2 = 4$. When you
evaluate by hand, take the root first and raise the result to the power. The
numbers stay small that way.

**Example 1.** Work out $16^{\frac{3}{4}}$.

Take the fourth root first:

$$
16^{\frac{3}{4}} = \left(\sqrt[4]{16}\right)^3.
$$

The fourth root of $16$ is $2$, because $2^4 = 16$. Raise $2$ to the power $3$:

$$
\left(\sqrt[4]{16}\right)^3 = 2^3 = 8.
$$

**Example 2.** Work out $125^{-\frac{1}{3}}$.

The negative sign gives a reciprocal:

$$
125^{-\frac{1}{3}} = \frac{1}{125^{\frac{1}{3}}}.
$$

The cube root of $125$ is $5$:

$$
\frac{1}{125^{\frac{1}{3}}} = \frac{1}{5}.
$$

## 3. The laws in algebra

The same laws simplify expressions with a letter base. Add the exponents when you
multiply, subtract when you divide, and multiply when a power is raised to a
power.

**Example 3.** Simplify $x^{\frac{1}{2}} \times x^{\frac{3}{2}}$, where $x > 0$.

Add the exponents:

$$
x^{\frac{1}{2}} \times x^{\frac{3}{2}} = x^{\frac{1}{2} + \frac{3}{2}} = x^{2}.
$$

**Example 4.** Simplify $\left(8x^6\right)^{\frac{2}{3}}$, where $x > 0$.

The power applies to each factor inside the bracket:

$$
\left(8x^6\right)^{\frac{2}{3}} = 8^{\frac{2}{3}} \times \left(x^6\right)^{\frac{2}{3}}.
$$

Now $8^{\frac{2}{3}} = 4$, and the power of a power multiplies the exponents:

$$
4 \times x^{6 \times \frac{2}{3}} = 4x^{4}.
$$

## 4. Solving an equation with a rational exponent

To free an unknown from an exponent, raise both sides to the reciprocal power.

**Example 5.** Solve $x^{\frac{2}{3}} = 9$.

The reciprocal of $\frac{2}{3}$ is $\frac{3}{2}$. Raise both sides to that power:

$$
\left(x^{\frac{2}{3}}\right)^{\frac{3}{2}} = 9^{\frac{3}{2}}.
$$

The left side becomes $x^1 = x$, and the right side becomes $27$:

$$
x = 27.
$$

There is a second solution. The exponent $\frac{2}{3}$ has an even numerator, so
a negative base gives the same value:

$$
(-27)^{\frac{2}{3}} = \left(\sqrt[3]{-27}\right)^2 = (-3)^2 = 9.
$$

So $x = 27$ or $x = -27$. Check both values in the original equation before you
finish.

> **Watch out.** Three traps appear with rational exponents.
>
> **Splitting a root over a sum.** The law $a^{\frac{1}{n}} b^{\frac{1}{n}} = (ab)^{\frac{1}{n}}$
> joins a product, not a sum. $\sqrt{9 + 16} = 5$, but $\sqrt{9} + \sqrt{16} = 7$,
> so $\sqrt{a + b}$ is not $\sqrt{a} + \sqrt{b}$.
>
> **A negative index and a negative number.** $2^{-3}$ means $\frac{1}{2^3} = \frac{1}{8}$;
> it does not mean $-8$. The minus sign in the exponent moves the base to the
> other part of a fraction.
>
> **A lost root.** Raising both sides to an even power can hide a second
> solution, and raising to the power $\frac{3}{2}$ needs a non-negative base.
> **Re-check:** after solving, substitute each value back, and ask whether the
> base is allowed to be negative.

## Progress check

1. Write $\sqrt[3]{x}$ as a power of $x$.
2. Work out $81^{\frac{3}{4}}$ by taking the root first.
3. Solve $x^{\frac{3}{2}} = 8$.
4. Explain why $x^{\frac{1}{2}}$ has no real value when $x = -4$.

## You should now be able to

- write a root as a fractional power, and a fractional power as a root;
- evaluate a power with a fractional or negative exponent;
- apply the index laws to expressions with letter bases;
- solve an equation of the form $x^{\frac{m}{n}} = k$ and find every real
  solution;
- explain why a root cannot be split across a sum.
