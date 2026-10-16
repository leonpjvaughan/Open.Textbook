---
title: 19.1 Translation — Learn
chapter: 19
chapter_title: Transformations and symmetry
section: '19.1'
section_title: Translation
tier: O
refs:
- GT.6
kind: walkthrough
---

# 19.1 Translation — Learn

**Prerequisites:** plotting points on the coordinate grid, and reading the
coordinates of a point, from Chapter 17.

**Objectives:** describe a translation with a vector; find the image of a point
or a shape under a translation; find the vector that takes one point to another.

By the end of this section you can slide any shape along the grid and say exactly
how far it moved.

## What a transformation does

A **transformation** moves a shape. The shape you start with is the **object**.
The shape you finish with is the **image**.

A transformation can slide a shape, turn it, or flip it over. The shape keeps its
size and its angles in all of them. Two shapes with the same size and angles are
**congruent**.

This section is about the sliding move.

## Sliding a shape

A **translation** slides a shape along. Every point of the shape moves the same
distance in the same direction.

Think of a book on a desk. Push it 10 cm to the right. The book has moved, but it
has not turned and it has not flipped over. That is a translation.

A translation is fixed by one piece of information: the move itself. We write the
move as a **vector**, which is a pair of numbers in a tall bracket.

$$\begin{pmatrix}4\\1\end{pmatrix}$$

The top number is the move across. A positive number means right, and a negative
number means left. The bottom number is the move up. A positive number means up,
and a negative number means down. So $\begin{pmatrix}4\\1\end{pmatrix}$ means
4 right and 1 up.

## Finding the image

To find the image of a point, add the vector to the coordinates.

$$\text{image} = (\text{start } x + \text{across},\ \text{start } y + \text{up})$$

**Example 1.** Translate the point $P(2,3)$ by the vector
$\begin{pmatrix}4\\1\end{pmatrix}$.

Add 4 to the $x$-coordinate and 1 to the $y$-coordinate.

$$P(2,3)\to(2+4,\ 3+1)=(6,4)$$

The image is $(6,4)$.

**Example 2.** Translate the triangle with vertices $A(0,0)$, $B(2,0)$ and
$C(0,3)$ by the vector $\begin{pmatrix}-1\\4\end{pmatrix}$.

Every vertex moves by the same vector.

$$A(0,0)\to(-1,4)\qquad B(2,0)\to(1,4)\qquad C(0,3)\to(-1,7)$$

The image vertices are $(-1,4)$, $(1,4)$ and $(-1,7)$. The image is congruent to
the object, because a translation never changes a length or an angle.

## Finding the vector

Sometimes you know where a point starts and where it finishes. Subtract the start
from the finish to find the vector.

$$\text{vector} = (\text{finish } x - \text{start } x,\ \text{finish } y - \text{start } y)$$

**Example 3.** A translation maps $A(1,2)$ to $B(5,6)$. Find the vector.

Subtract the coordinates of $A$ from the coordinates of $B$.

$$\text{across} = 5-1 = 4 \qquad \text{up} = 6-2 = 4$$

The vector is $\begin{pmatrix}4\\4\end{pmatrix}$. The translation is 4 right and
4 up.

## Watch out

> **Watch out.** A translation never turns a shape and never flips it over. The
> common error is to move the corners in different directions, so the image comes
> out bent or turned.
>
> For example, a triangle translated by $\begin{pmatrix}4\\1\end{pmatrix}$ keeps
> the same order of corners. If one corner moves right and another moves up, the
> result is not a translation.
>
> **Re-check:** every corner must use the same vector. Add the same two numbers
> to every point.

A second trap is the sign. A negative number in the vector means left or down.
So $\begin{pmatrix}-3\\2\end{pmatrix}$ means 3 left and 2 up.

## Progress check

Return to the chapter problem. The crest is the square with corners $(0,0)$,
$(4,0)$, $(4,4)$ and $(0,4)$.

1. A copy of the crest is translated by the vector
   $\begin{pmatrix}6\\0\end{pmatrix}$. What happens to each corner?
2. Write down the four corners of the copy.

In Section 19.2 you will flip a shaded triangle of the crest over a line.

## You should now be able to

- say what a transformation and a translation do;
- read a vector as a move across and a move up;
- add a vector to a point to find its image;
- translate every vertex of a shape by the same vector;
- subtract the start from the finish to find the vector of a translation;
- keep the image congruent to the object.
