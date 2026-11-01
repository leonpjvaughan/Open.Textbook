---
title: 18.5 Vectors in three dimensions — Learn
chapter: 18
chapter_title: Vectors
section: '18.5'
section_title: Vectors in three dimensions
tier: H
refs:
- '2.2'
kind: walkthrough
---

# 18.5 Vectors in three dimensions — Learn

**Prerequisites:** Sections 18.1 to 18.4 — columns, length, the dot product and angles.

**Objectives:** write a three-dimensional vector; find its length; add vectors and find dot
products in three dimensions; test for perpendicularity and find an angle.

By the end of this section you can do everything from the earlier sections with a third
component, and you can see that nothing new has to be learned.

## A third component

Real quantities move in space, not on a flat page. A drone can rise as well as travel
across and up a map. A third component, measured along the $\mathbf{k}$ direction, records
the height.

$$\mathbf{a} = \begin{pmatrix} x \\ y \\ z \end{pmatrix} = x\mathbf{i} + y\mathbf{j} + z\mathbf{k}$$

The numbers $x$, $y$ and $z$ are the three components. The vectors $\mathbf{i}$,
$\mathbf{j}$ and $\mathbf{k}$ are the unit vectors along the three perpendicular axes.
Every rule from the plane carries over, with one more component to carry.

## Length in three dimensions

The length formula squares every component and adds. With three components, add three
squares.

> **Length of a three-dimensional vector.**
>
>
> $$\left|\begin{pmatrix} x \\ y \\ z \end{pmatrix}\right| = \sqrt{x^2 + y^2 + z^2}$$

This is Pythagoras' theorem used twice: once across the base, and again with the height.
The two horizontal components give $\sqrt{x^2 + y^2}$, and that length and the height $z$
form a second right triangle.

**Example 1.** Find the length of $\begin{pmatrix} 3 \\ 4 \\ 12 \end{pmatrix}$.

$$\sqrt{3^2 + 4^2 + 12^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13$$

**Example 2.** Find the distance from $P(1, 0, 2)$ to $Q(4, 3, -2)$.

First find the displacement:

$$\vec{PQ} = \begin{pmatrix} 4 - 1 \\ 3 - 0 \\ -2 - 2 \end{pmatrix} = \begin{pmatrix} 3 \\ 3 \\ -4 \end{pmatrix}$$

Then its length:

$$PQ = \sqrt{3^2 + 3^2 + (-4)^2} = \sqrt{9 + 9 + 16} = \sqrt{34}$$

The answer is not a whole number, so keep it as $\sqrt{34}$.

## Adding and scaling in three dimensions

Addition, subtraction and scalar multiplication work component by component, exactly as in
the plane. There is one more component to handle.

$$\begin{pmatrix} a_1 \\ a_2 \\ a_3 \end{pmatrix} + \begin{pmatrix} b_1 \\ b_2 \\ b_3 \end{pmatrix} = \begin{pmatrix} a_1 + b_1 \\ a_2 + b_2 \\ a_3 + b_3 \end{pmatrix}$$

**Example 3.** Add $\begin{pmatrix} 1 \\ -2 \\ 3 \end{pmatrix}$ and
$\begin{pmatrix} 2 \\ 2 \\ -5 \end{pmatrix}$.

$$\begin{pmatrix} 1 + 2 \\ -2 + 2 \\ 3 - 5 \end{pmatrix} = \begin{pmatrix} 3 \\ 0 \\ -2 \end{pmatrix}$$

The middle component cancels, so the answer has no $\mathbf{j}$ term.

## The dot product in three dimensions

The dot product multiplies matching components and adds. With three components there are
three products.

> **The dot product in three dimensions.** For
> $\mathbf{a} = \begin{pmatrix} a_1 \\ a_2 \\ a_3 \end{pmatrix}$ and
> $\mathbf{b} = \begin{pmatrix} b_1 \\ b_2 \\ b_3 \end{pmatrix}$,
>
>
> $$\mathbf{a} \cdot \mathbf{b} = a_1 b_1 + a_2 b_2 + a_3 b_3$$

All the properties from Section 18.3 still hold, including
$\mathbf{a} \cdot \mathbf{a} = |\mathbf{a}|^2$ and the angle formula
$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta$.

**Example 4.** Work out $\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ -1 \\ 2 \end{pmatrix}$.

$$1 \times 4 + 2 \times (-1) + 3 \times 2 = 4 - 2 + 6 = 8$$

## Perpendicularity and angles in three dimensions

The tests are unchanged. Two vectors are perpendicular when their dot product is zero, and
the angle between them is found from

$$\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}|\,|\mathbf{b}|}$$

**Example 5.** Show that $\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ and
$\begin{pmatrix} 1 \\ 1 \\ -1 \end{pmatrix}$ are perpendicular.

$$1 \times 1 + 2 \times 1 + 3 \times (-1) = 1 + 2 - 3 = 0$$

The dot product is zero, so the vectors meet at a right angle.

**Example 6.** Find the angle between $\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$ and
$\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$.

The dot product is $1$. The lengths are $1$ and $\sqrt{1 + 1 + 1} = \sqrt{3}$. So

$$\cos\theta = \frac{1}{\sqrt{3}} = 0.5774 \quad\Rightarrow\quad \theta = 54.7^\circ$$

> **Watch out.** Do not drop the third component when you take a length or a dot product.
> The vector $\begin{pmatrix} 3 \\ 4 \\ 12 \end{pmatrix}$ has length $13$, not $5$: the
> $5$ comes from the first two components alone, and the height changes the answer. Write
> out all three squares before you add.
>
> **Re-check:** for a length, square the answer and compare it with the sum of the squared
> components. For $13$, the square is $169$, and $9 + 16 + 144 = 169$.

## Progress check

Back to the chapter problem, now in three dimensions. Suppose the drone's first leg is
$\mathbf{a} = \begin{pmatrix} 6 \\ 2 \\ 3 \end{pmatrix}$ km and its second is
$\mathbf{b} = \begin{pmatrix} -2 \\ 6 \\ -1 \end{pmatrix}$ km.

Find $\mathbf{a} + \mathbf{b}$ and the length of the return leg. Then work out
$\mathbf{a} \cdot \mathbf{b}$. The dot product is no longer zero, so the route is no longer
right-angled in space. Say whether the angle between the two legs is now acute or obtuse,
and give the reason from the sign of the dot product.

## You should now be able to

- write a three-dimensional vector and find its length;
- add, subtract and scale three-dimensional vectors;
- work out a dot product with three components;
- test three-dimensional vectors for perpendicularity;
- find the angle between two three-dimensional vectors;
- explain why the length formula squares all three components.
