---
title: 18.4 Perpendicularity and the angle between vectors — Learn
chapter: 18
chapter_title: Vectors
section: '18.4'
section_title: Perpendicularity and the angle between vectors
tier: O
refs:
- '2.2'
kind: walkthrough
---

# 18.4 Perpendicularity and the angle between vectors — Learn

**Prerequisites:** Section 18.3 — the dot product and the angle formula.

**Objectives:** test two vectors for perpendicularity; find the angle between two vectors;
find a vector perpendicular to a given one.

By the end of this section you can decide whether two directions meet at a right angle,
and measure the angle between any two directions.

## The perpendicularity test

Two non-zero vectors are **perpendicular** when the angle between them is $90^\circ$.
At that angle $\cos\theta = 0$, so the angle formula gives
$\mathbf{a} \cdot \mathbf{b} = 0$.

> **Perpendicularity test.** Two non-zero vectors are perpendicular exactly when their
> dot product is zero.

This turns a question about a picture into a calculation. To test whether two directions
meet at a right angle, work out their dot product and see whether it is zero.

**Example 1.** Show that $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and
$\begin{pmatrix} 2 \\ -1 \end{pmatrix}$ are perpendicular.

$$1 \times 2 + 2 \times (-1) = 2 - 2 = 0$$

The dot product is zero, so the two vectors are perpendicular.

## Finding the angle

Rearranging the angle formula gives the angle itself:

> **The angle between two vectors.** For non-zero vectors $\mathbf{a}$ and $\mathbf{b}$,
>
>
> $$\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}|\,|\mathbf{b}|}$$
>
>
> Then $\theta = \cos^{-1}$ of that value, between $0^\circ$ and $180^\circ$.

The value of $\cos\theta$ always lies between $-1$ and $1$, because it is a cosine. If your
value falls outside that range, the arithmetic has gone wrong.

**Example 2.** Find the angle between $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and
$\begin{pmatrix} 1 \\ 1 \end{pmatrix}$.

The dot product is $1 \times 1 + 0 \times 1 = 1$. The lengths are $1$ and
$\sqrt{1^2 + 1^2} = \sqrt{2}$. So

$$\cos\theta = \frac{1}{1 \times \sqrt{2}} = \frac{1}{\sqrt{2}}$$

and $\theta = 45^\circ$.

**Example 3.** Find the angle between $\begin{pmatrix} 2 \\ 3 \end{pmatrix}$ and
$\begin{pmatrix} 1 \\ 4 \end{pmatrix}$, to one decimal place.

The dot product is $2 \times 1 + 3 \times 4 = 14$. The lengths are $\sqrt{13}$ and
$\sqrt{17}$. So

$$\cos\theta = \frac{14}{\sqrt{13}\sqrt{17}} = 0.9418 \quad\Rightarrow\quad \theta = 19.7^\circ$$

The positive cosine tells you the angle is acute, which fits the small answer.

:::figure vector-addition

**Predict, then test.** Set the two vectors so that the angle in the readout is exactly
$90$ degrees. Write down the four components, then work out the dot product on paper and
check that it is zero. Now change one component and predict whether the angle becomes
acute or obtuse. Test it, and write down how the sign of the dot product matches your
prediction.

## Perpendicular vectors in the plane

In two dimensions there is a quick way to write down a perpendicular vector. Swap the two
components and change the sign of one of them.

For $\begin{pmatrix} a \\ b \end{pmatrix}$, both
$\begin{pmatrix} -b \\ a \end{pmatrix}$ and $\begin{pmatrix} b \\ -a \end{pmatrix}$ are
perpendicular to it. Check:

$$a(-b) + ba = -ab + ab = 0$$

**Example 4.** Find a vector perpendicular to $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$.

Swap and change one sign: $\begin{pmatrix} -4 \\ 3 \end{pmatrix}$. Check the dot product:

$$3 \times (-4) + 4 \times 3 = -12 + 12 = 0$$

> **Watch out.** The angle between two vectors is always between $0^\circ$ and
> $180^\circ$, because it is the angle between their directions. A vector and its negative
> have an angle of $180^\circ$, and a vector and itself have an angle of $0^\circ$. Also,
> the dot product test needs both vectors to be non-zero; the zero vector has no direction,
> so it is not perpendicular to anything.
>
> **Re-check:** after finding an angle, put it back into the formula. For $\theta = 45^\circ$
> in Example 2, $\cos 45^\circ = \dfrac{1}{\sqrt{2}}$, which is the value you started with.

## Progress check

Back to the chapter problem. The drone's two legs are
$\mathbf{a} = \begin{pmatrix} 6 \\ 2 \end{pmatrix}$ km and
$\mathbf{b} = \begin{pmatrix} -2 \\ 6 \end{pmatrix}$ km, and Section 18.3 showed that
$\mathbf{a} \cdot \mathbf{b} = 0$.

Say what that tells you about the angle at the drone's first stop. Then find the angle
between the first leg and the displacement from the depot, which is
$\mathbf{a} + \mathbf{b} = \begin{pmatrix} 4 \\ 8 \end{pmatrix}$ km. Keep the angle: the
Review uses it.

## You should now be able to

- test two vectors for perpendicularity with the dot product;
- find the angle between two vectors, using exact values where they are special;
- write down a vector perpendicular to a given one;
- explain why the dot product is zero at a right angle;
- check that a calculated cosine lies between $-1$ and $1$.
