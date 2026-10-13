---
title: 5.11 Proofs with trigonometric functions and identities — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.11'
section_title: Proofs with trigonometric functions and identities
refs:
- E8
kind: walkthrough
---

# 5.11 Proofs with trigonometric functions and identities — Learn

**Prerequisites:** the basic identities; the addition and double-angle formulae;
proving a simple identity by working on one side.

**By the end of this section you can:** prove an identity that uses the addition
or double-angle formulae; choose which side to work on; avoid circular
reasoning; present a proof as a clean chain of equals signs.

## 1. The shape of a trigonometric proof

A proof of an identity is a chain of statements that are equal for every value
of the angle. Three rules keep the proof honest:

1. Start with one side and leave the other side alone until the final line.
2. At each step, name the identity or formula you used.
3. Finish with the left-hand side exactly equal to the right-hand side, and
   state any angle where a denominator vanishes.

If you find yourself changing both sides at once, you have assumed the result.
If you find yourself using the identity you are trying to prove, the argument
goes in a circle.

## 2. Using the addition and double-angle formulae

**Example 1.** Prove that
$(\sin A + \cos A)^2 \equiv 1 + \sin 2A$.

Start with the left-hand side and expand the square:

$$
(\sin A + \cos A)^2
= \sin^2 A + 2\sin A\cos A + \cos^2 A.
$$

Group the two squares and use $\sin^2 A + \cos^2 A = 1$:

$$
= (\sin^2 A + \cos^2 A) + 2\sin A\cos A
= 1 + 2\sin A\cos A.
$$

The double-angle formula says $\sin 2A = 2\sin A\cos A$, so

$$
= 1 + \sin 2A.
$$

The left-hand side equals the right-hand side, so the identity is proved.

**Example 2.** Prove that
$\sin(A + B)\sin(A - B) \equiv \sin^2 A - \sin^2 B$.

Use the two addition formulae:

$$
\sin(A + B)\sin(A - B)
= (\sin A\cos B + \cos A\sin B)(\sin A\cos B - \cos A\sin B).
$$

This is a difference of two squares, $(x + y)(x - y) = x^2 - y^2$:

$$
= \sin^2 A\cos^2 B - \cos^2 A\sin^2 B.
$$

Replace $\cos^2 B$ with $1 - \sin^2 B$ and $\cos^2 A$ with $1 - \sin^2 A$:

$$
= \sin^2 A(1 - \sin^2 B) - (1 - \sin^2 A)\sin^2 B.
$$

Expand and collect:

$$
= \sin^2 A - \sin^2 A\sin^2 B - \sin^2 B + \sin^2 A\sin^2 B
= \sin^2 A - \sin^2 B.
$$

The identity is proved.

## 3. Writing everything in sines and cosines

When a proof mixes tangent, secant or cotangent with a double angle, a good
first move is to write every function in terms of sine and cosine.

**Example 3.** Prove that
$\cos 2A \equiv \dfrac{1 - \tan^2 A}{1 + \tan^2 A}$.

Start with the right-hand side and replace tangent with sine over cosine:

$$
\frac{1 - \tan^2 A}{1 + \tan^2 A}
= \frac{1 - \frac{\sin^2 A}{\cos^2 A}}{1 + \frac{\sin^2 A}{\cos^2 A}}.
$$

Multiply the top and the bottom by $\cos^2 A$:

$$
= \frac{\cos^2 A - \sin^2 A}{\cos^2 A + \sin^2 A}
= \frac{\cos^2 A - \sin^2 A}{1}
= \cos 2A.
$$

**Example 4.** Prove that
$\tan A + \cot A \equiv 2\operatorname{cosec} 2A$ for
$\sin A\cos A \neq 0$.

Start with the left-hand side:

$$
\tan A + \cot A
= \frac{\sin A}{\cos A} + \frac{\cos A}{\sin A}
= \frac{\sin^2 A + \cos^2 A}{\sin A\cos A}
= \frac{1}{\sin A\cos A}.
$$

Multiply the numerator and the denominator by $2$:

$$
= \frac{2}{2\sin A\cos A}
= \frac{2}{\sin 2A}
= 2\operatorname{cosec} 2A.
$$

> **Watch out.** Three mistakes are common in these proofs.
>
> **Starting from both sides.** A proof must start from one side. Changing both
> sides at once assumes the identity and proves nothing.
>
> **Using the target.** If the proof of an identity uses that identity, the
> argument is circular. Keep a note of which standard formula each line uses,
> and make sure none of them is the statement you are proving.
>
> **Ignoring the domain.** An identity such as $\tan A + \cot A \equiv
> 2\operatorname{cosec} 2A$ is not defined where $\sin A\cos A = 0$. State the
> excluded values. **Re-check:** substitute a convenient angle, such as
> $A = \dfrac{\pi}{4}$, into both sides to confirm the identity numerically.

## You should now be able to

- prove an identity by expanding and using $\sin^2 A + \cos^2 A = 1$;
- use the addition formulae to prove a product identity;
- convert tangent, secant and cotangent into sines and cosines;
- show the double-angle formulae follow from the addition formulae;
- state the values of the angle where an identity is not defined.
