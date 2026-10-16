---
title: 12.8 Trigonometric identities — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.8'
section_title: Trigonometric identities
tier: H
refs:
- '2.3'
kind: walkthrough
---

# 12.8 Trigonometric identities — Learn

**Prerequisites:** Section 12.4 — the unit circle; Section 12.6 — the sine and cosine
rules; rearranging an equation.

**Objectives:** use $\sin^2A + \cos^2A = 1$ and $\tan A = \dfrac{\sin A}{\cos A}$; derive
the addition formulae and the double angle formulae; apply the formulae from the booklet.

By the end of this section you can work with the trigonometric formulae the booklet gives
you, and say where the important ones come from.

## An identity is not an equation

An **identity** is true for every value of the variable. The statement
$\sin^2A + \cos^2A = 1$ is an identity: it holds for every angle $A$.

The Formulae and Tables booklet lists the formulae you may use. This section shows where
the main ones come from, and then uses them.

## The Pythagorean identity

> **Pythagoras' identity.** $$\cos^2A + \sin^2A = 1$$

**Why it is true.** On the unit circle, the point at angle $A$ is $(\cos A, \sin A)$. The
distance from the origin to that point is the radius, which is $1$. By Pythagoras'
theorem, the square of that distance is $\cos^2A + \sin^2A$. So

$$\cos^2A + \sin^2A = 1^2 = 1$$

**Example 1.** Given that $\sin A = 0.6$ and $A$ is acute, find $\cos A$ and $\tan A$.

$$\cos^2A = 1 - 0.6^2 = 1 - 0.36 = 0.64 \qquad \cos A = 0.8$$

$A$ is acute, so the cosine is positive. The tangent comes from its definition:

$$\tan A = \frac{\sin A}{\cos A} = \frac{0.6}{0.8} = 0.75$$

If $A$ had been obtuse, the cosine would be $-0.8$ and the tangent $-0.75$. The identity
gives the size, and the quadrant gives the sign.

## The tangent

> $$\tan A = \frac{\sin A}{\cos A}$$

This is the definition from Section 12.1, written for any angle. The booklet gives it.
The related functions are also given:

$$\sec A = \frac{1}{\cos A} \qquad \operatorname{cosec} A = \frac{1}{\sin A} \qquad \cot A = \frac{1}{\tan A}$$

Dividing $\cos^2A + \sin^2A = 1$ by $\cos^2A$ gives the second identity in the booklet:

$$1 + \tan^2A = \sec^2A$$

## The addition formulae

The formula for $\cos(A - B)$ is the one the others are built from.

> **The cosine of a difference.** $$\cos(A - B) = \cos A\cos B + \sin A\sin B$$

**Why it is true.** Take two points on the unit circle: $P$ at angle $A$ and $Q$ at angle
$B$, so $P = (\cos A, \sin A)$ and $Q = (\cos B, \sin B)$.

Find the distance $PQ$ two ways.

**By the distance formula.**

$$PQ^2 = (\cos A - \cos B)^2 + (\sin A - \sin B)^2$$

Expand both brackets:

$$PQ^2 = \cos^2A - 2\cos A\cos B + \cos^2B + \sin^2A - 2\sin A\sin B + \sin^2B$$

Group the $\cos^2 + \sin^2$ pairs, and each pair is $1$:

$$PQ^2 = 2 - 2(\cos A\cos B + \sin A\sin B)$$

**By the cosine rule.** In triangle $OPQ$ the two radii are $1$, and the angle at $O$ is
$A - B$:

$$PQ^2 = 1^2 + 1^2 - 2(1)(1)\cos(A - B) = 2 - 2\cos(A - B)$$

The two expressions for $PQ^2$ are equal, so

$$2 - 2\cos(A - B) = 2 - 2(\cos A\cos B + \sin A\sin B)$$

Subtract $2$ from both sides and divide by $-2$:

$$\cos(A - B) = \cos A\cos B + \sin A\sin B$$

Now replace $B$ with $-B$. The booklet gives $\cos(-B) = \cos B$ and
$\sin(-B) = -\sin B$, so

> **The cosine of a sum.** $$\cos(A + B) = \cos A\cos B - \sin A\sin B$$

The sign flips, and that is the only change.

For the sine, start from $\sin\theta = \cos(90^\circ - \theta)$, which is what the
unit circle shows. Then

$$\sin(A + B) = \cos\left(90^\circ - (A + B)\right) = \cos\left((90^\circ - A) - B\right)$$

Apply the difference formula, and use $\cos(90^\circ - A) = \sin A$ and
$\sin(90^\circ - A) = \cos A$:

$$\sin(A + B) = \cos(90^\circ - A)\cos B + \sin(90^\circ - A)\sin B = \sin A\cos B + \cos A\sin B$$

> **The sine of a sum.** $$\sin(A + B) = \sin A\cos B + \cos A\sin B$$

Replacing $B$ with $-B$ gives the difference form:

$$\sin(A - B) = \sin A\cos B - \cos A\sin B$$

## The double angle formulae

Put $B = A$ in the addition formulae.

$$\sin 2A = \sin A\cos A + \cos A\sin A = 2\sin A\cos A$$

$$\cos 2A = \cos A\cos A - \sin A\sin A = \cos^2A - \sin^2A$$

The cosine form has two useful relatives, both in the booklet. Using
$\cos^2A = 1 - \sin^2A$ in the first, and $\sin^2A = 1 - \cos^2A$ in the second:

$$\cos 2A = 1 - 2\sin^2A \qquad \cos 2A = 2\cos^2A - 1$$

Rearranged, these give the half-angle forms:

$$\sin^2A = \tfrac12(1 - \cos 2A) \qquad \cos^2A = \tfrac12(1 + \cos 2A)$$

**Example 2.** Given that $\sin A = \dfrac{3}{5}$ and $A$ is acute, find $\sin 2A$ and
$\cos 2A$.

From Example 1's method, $\cos A = \dfrac{4}{5}$. Then

$$\sin 2A = 2 \times \frac{3}{5} \times \frac{4}{5} = \frac{24}{25}$$

$$\cos 2A = \frac{16}{25} - \frac{9}{25} = \frac{7}{25}$$

Check with the other form: $1 - 2\sin^2A = 1 - 2 \times \dfrac{9}{25} = \dfrac{7}{25}$.
Both agree.

> **Watch out.** $\sin 2A$ is **not** $2\sin A$. If $\sin A = 0.6$, then
> $\sin 2A = 0.96$, while $2\sin A = 1.2$ — and a sine can never exceed $1$, so $1.2$ is
> impossible.
>
> **Re-check:** after using a double angle formula, ask whether the answer is within
> $-1$ and $1$. A sine or cosine outside that range is always an error.

## Progress check

Back to the chapter problem. The angle at the Coast Guard station is $42^\circ$, and
$\sin 42^\circ = 0.6691$.

Use $\cos^2A + \sin^2A = 1$ to find $\cos 42^\circ$, and then find $\tan 42^\circ$. Give
each to four decimal places.

The angle is acute, so the cosine is positive. Keep both values: Section 12.9 uses a
trigonometric equation on the same triangle, and the Review checks the triangle's sides
against these ratios.

## You should now be able to

- use $\cos^2A + \sin^2A = 1$ to find a missing sine or cosine;
- decide the sign of the answer from the quadrant;
- use $\tan A = \dfrac{\sin A}{\cos A}$ and the secant, cosecant and cotangent;
- state the addition formulae and say how $\cos(A - B)$ is derived;
- use the double angle formulae and their half-angle rearrangements;
- check that a sine or cosine answer lies between $-1$ and $1$.
