---
title: 5.8 Addition and double-angle formulae — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.8'
section_title: Addition and double-angle formulae
dfe:
- E6
kind: walkthrough
---

# 5.8 Addition and double-angle formulae — Learn

**Prerequisites:** exact values at the special angles; the basic identities;
substituting into a formula.

**By the end of this section you can:** use the addition formulae for sine,
cosine and tangent; use the double-angle formulae; find exact values at angles
such as $15^\circ$ and $75^\circ$; find a double-angle value from a single
ratio.

## 1. The addition formulae

For any angles $A$ and $B$,

$$
\sin(A + B) \equiv \sin A\cos B + \cos A\sin B,
$$

$$
\sin(A - B) \equiv \sin A\cos B - \cos A\sin B,
$$

$$
\cos(A + B) \equiv \cos A\cos B - \sin A\sin B,
$$

$$
\cos(A - B) \equiv \cos A\cos B + \sin A\sin B.
$$

Notice the signs. The sine formulae keep the same sign as the bracket. The
cosine formulae flip it: a plus in the bracket gives a minus between the terms.

For tangent,

$$
\tan(A + B) \equiv \frac{\tan A + \tan B}{1 - \tan A\tan B},
$$

$$
\tan(A - B) \equiv \frac{\tan A - \tan B}{1 + \tan A\tan B}.
$$

The tangent formulae come from dividing the sine formula by the cosine formula.

The proof of the cosine formula comes from rotating two points on the unit
circle. Rotating the whole diagram so that $B$ lies on the $x$-axis turns the
angle $A - B$ into a single coordinate read-off. Section 5.11 returns to this
argument.

**Example 1.** Find the exact value of $\sin 75^\circ$.

Write $75^\circ = 45^\circ + 30^\circ$:

$$
\sin 75^\circ = \sin 45^\circ\cos 30^\circ + \cos 45^\circ\sin 30^\circ.
$$

Substitute the exact values:

$$
= \frac{\sqrt{2}}{2} \times \frac{\sqrt{3}}{2} + \frac{\sqrt{2}}{2} \times \frac{1}{2}
= \frac{\sqrt{6}}{4} + \frac{\sqrt{2}}{4}
= \frac{\sqrt{6} + \sqrt{2}}{4}.
$$

**Example 2.** Find the exact value of $\cos 15^\circ$.

Write $15^\circ = 45^\circ - 30^\circ$:

$$
\cos 15^\circ = \cos 45^\circ\cos 30^\circ + \sin 45^\circ\sin 30^\circ
= \frac{\sqrt{6}}{4} + \frac{\sqrt{2}}{4}
= \frac{\sqrt{6} + \sqrt{2}}{4}.
$$

## 2. The double-angle formulae

Put $A = B$ in the addition formulae. For sine,

$$
\sin 2A \equiv 2\sin A\cos A.
$$

For cosine there are three equivalent forms, because of the basic identity:

$$
\cos 2A \equiv \cos^2 A - \sin^2 A
\equiv 1 - 2\sin^2 A
\equiv 2\cos^2 A - 1.
$$

Choose the form that fits the information you have. If you know the sine, use
$1 - 2\sin^2 A$; if you know the cosine, use $2\cos^2 A - 1$.

For tangent,

$$
\tan 2A \equiv \frac{2\tan A}{1 - \tan^2 A}.
$$

**Example 3.** Given that $\sin A = \dfrac{3}{5}$ and $A$ is acute, find
$\sin 2A$ and $\cos 2A$.

First find $\cos A = \dfrac{4}{5}$ from $\sin^2 A + \cos^2 A = 1$. Then

$$
\sin 2A = 2\sin A\cos A = 2 \times \frac{3}{5} \times \frac{4}{5} = \frac{24}{25}.
$$

$$
\cos 2A = 1 - 2\sin^2 A = 1 - 2 \times \frac{9}{25} = 1 - \frac{18}{25} = \frac{7}{25}.
$$

**Example 4.** Given that $\tan A = \dfrac{3}{4}$, find $\tan 2A$.

$$
\tan 2A = \frac{2 \times \frac{3}{4}}{1 - \left(\frac{3}{4}\right)^2}
= \frac{\frac{3}{2}}{1 - \frac{9}{16}}
= \frac{\frac{3}{2}}{\frac{7}{16}}
= \frac{24}{7}.
$$

> **Watch out.** Three mistakes are common with these formulae.
>
> **The sign in the cosine formula.** $\cos(A + B)$ gives minus between the two
> products, and $\cos(A - B)$ gives plus. A quick check with $A = B = 0$:
> $\cos 0 = 1$, and the formula must give $1 \times 1 - 0 \times 0 = 1$.
>
> **Choosing the wrong form of $\cos 2A$.** All three forms are correct, but
> only one uses the value you already have. If the question gives $\cos A$,
> reaching for the sine form creates needless work and extra square roots.
>
> **Dropping the double in $\sin 2A$.** The formula is $2\sin A\cos A$, not
> $\sin A\cos A$. It is common to leave out the factor $2$.
>
> **Re-check:** test every formula at a simple angle. For $\sin 2A$ with
> $A = 30^\circ$, the right-hand side gives $2 \times \tfrac{1}{2} \times
> \tfrac{\sqrt{3}}{2} = \tfrac{\sqrt{3}}{2}$, and $\sin 60^\circ$ is indeed
> $\tfrac{\sqrt{3}}{2}$.

## You should now be able to

- state and use the addition formulae for sine, cosine and tangent;
- find exact values at $15^\circ$ and $75^\circ$;
- state the three forms of $\cos 2A$ and choose between them;
- use $\sin 2A$ and $\tan 2A$;
- check a formula at a simple angle.
