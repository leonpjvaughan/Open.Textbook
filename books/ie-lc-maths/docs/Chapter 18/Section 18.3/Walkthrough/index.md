---
title: 18.3 The dot product — Learn
chapter: 18
chapter_title: Vectors
section: '18.3'
section_title: The dot product
tier: O
refs:
- '2.2'
kind: walkthrough
---

# 18.3 The dot product — Learn

**Prerequisites:** Section 18.2 — adding vectors and multiplying by a scalar.

**Objectives:** work out the dot product of two vectors; use its properties; connect it to
length and to the angle between the vectors.

By the end of this section you can multiply two vectors to get a single number, and say
what that number means.

## Multiplying two vectors

There are two ways to multiply vectors. One of them, the **dot product**, takes two
vectors and returns a single number. The number is a scalar, not a vector.

> **The dot product.** For $\mathbf{a} = \begin{pmatrix} a_1 \\ a_2 \end{pmatrix}$ and
> $\mathbf{b} = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix}$,
>
>
> $$\mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2$$

Multiply the matching components, then add the two products. The answer is a single
number.

**Example 1.** Work out $\begin{pmatrix} 1 \\ 2 \end{pmatrix} \cdot \begin{pmatrix} 3 \\ 4 \end{pmatrix}$.

$$\begin{pmatrix} 1 \\ 2 \end{pmatrix} \cdot \begin{pmatrix} 3 \\ 4 \end{pmatrix} = 1 \times 3 + 2 \times 4 = 3 + 8 = 11$$

**Example 2.** Work out $\begin{pmatrix} -2 \\ 5 \end{pmatrix} \cdot \begin{pmatrix} 3 \\ -1 \end{pmatrix}$.

$$(-2) \times 3 + 5 \times (-1) = -6 - 5 = -11$$

A negative answer is allowed. The sign carries information, which Section 18.4 uses.

## Properties of the dot product

The dot product behaves in the ways you would hope:

- $\mathbf{a} \cdot \mathbf{b} = \mathbf{b} \cdot \mathbf{a}$ (the order does not matter);
- $\mathbf{a} \cdot (\mathbf{b} + \mathbf{c}) = \mathbf{a} \cdot \mathbf{b} + \mathbf{a} \cdot \mathbf{c}$;
- $(k\mathbf{a}) \cdot \mathbf{b} = k(\mathbf{a} \cdot \mathbf{b})$ for a scalar $k$;
- $\mathbf{a} \cdot \mathbf{a} = |\mathbf{a}|^2$.

The last one is worth a moment. A vector dotted with itself gives
$a_1^2 + a_2^2$, which is exactly the square of its length. So the dot product knows about
length.

**Example 3.** For $\mathbf{a} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$,
$\mathbf{a} \cdot \mathbf{a} = 3^2 + 4^2 = 25$, and $|\mathbf{a}| = 5$, so
$|\mathbf{a}|^2 = 25$. The two agree.

## The dot product and the angle

The dot product carries the angle between the two vectors as well as their lengths.

> **The angle formula.** If $\theta$ is the angle between the non-zero vectors
> $\mathbf{a}$ and $\mathbf{b}$, then
>
>
> $$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}|\,|\mathbf{b}|\cos\theta$$

**Why it is true.** Take the two vectors from a common point, and join their ends. The
triangle has sides $\mathbf{a}$, $\mathbf{b}$ and $\mathbf{b} - \mathbf{a}$, and the angle
between $\mathbf{a}$ and $\mathbf{b}$ is $\theta$.

The cosine rule applied to that triangle gives

$$|\mathbf{b} - \mathbf{a}|^2 = |\mathbf{a}|^2 + |\mathbf{b}|^2 - 2|\mathbf{a}||\mathbf{b}|\cos\theta$$

Now expand the left side using the properties above. Because
$\mathbf{b} - \mathbf{a}$ is a vector, its squared length is
$(\mathbf{b} - \mathbf{a}) \cdot (\mathbf{b} - \mathbf{a})$, which multiplies out to

$$|\mathbf{b}|^2 - 2\,\mathbf{a} \cdot \mathbf{b} + |\mathbf{a}|^2$$

The two expressions for $|\mathbf{b} - \mathbf{a}|^2$ are equal, so

$$|\mathbf{a}|^2 + |\mathbf{b}|^2 - 2\,\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}|^2 + |\mathbf{b}|^2 - 2|\mathbf{a}||\mathbf{b}|\cos\theta$$

Cancel the common terms and divide by $-2$:

$$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}|\,|\mathbf{b}|\cos\theta$$

This is the bridge between the algebra of components and the geometry of angles. It is
why the dot product can test for a right angle, and why it can find an angle.

## The sign of the dot product

Because $|\mathbf{a}|$ and $|\mathbf{b}|$ are positive, the sign of the dot product is the
sign of $\cos\theta$.

- If $\mathbf{a} \cdot \mathbf{b} > 0$, then $\cos\theta > 0$, so the angle is **acute**.
- If $\mathbf{a} \cdot \mathbf{b} = 0$, then $\cos\theta = 0$, so the angle is a **right
  angle**.
- If $\mathbf{a} \cdot \mathbf{b} < 0$, then $\cos\theta < 0$, so the angle is **obtuse**.

So the sign of one number tells you the shape of the angle, before you find it.

> **Watch out.** The dot product is not componentwise multiplication, and it does not give
> a vector. For $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and
> $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$, the dot product is $11$, not
> $\begin{pmatrix} 3 \\ 8 \end{pmatrix}$. Multiplying the components and leaving them as a
> column gives a different object with no meaning here.
>
> **Re-check:** after a dot product, ask whether the answer should be positive, negative or
> zero. A positive answer means the vectors lean the same way, and a zero answer means a
> right angle.

## Progress check

Back to the chapter problem. The drone's two legs are
$\mathbf{a} = \begin{pmatrix} 6 \\ 2 \end{pmatrix}$ km and
$\mathbf{b} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$ km.

Work out $\mathbf{a} \cdot \mathbf{b}$. The answer is a single number, and its sign tells
you the shape of the angle between the two legs. Write down what the sign says, then keep
the number: Section 18.4 turns it into the angle.

## You should now be able to

- work out the dot product of two vectors;
- use the commutative, distributive and length properties;
- explain why $\mathbf{a} \cdot \mathbf{a} = |\mathbf{a}|^2$;
- state the angle formula and explain where it comes from;
- use the sign of the dot product to say whether an angle is acute, right or obtuse.
