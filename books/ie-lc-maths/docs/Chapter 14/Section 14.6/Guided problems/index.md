---
title: 14.6 Composing transformations — Practise with help
chapter: 14
chapter_title: Transformation geometry
section: '14.6'
section_title: Composing transformations
tier: H
refs:
- '2.4'
kind: guided-problems
---

# 14.6 Composing transformations — Practise with help

## Warm-up: remember

1. Rotate the point $(3,1)$ by $90^\circ$ anticlockwise about the origin.
2. Translate the point $(2,5)$ by the vector $\binom{-4}{2}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $(3,1) \to (-1,3)$, using the rule $(x,y) \to (-y,x)$.
2. $(2,5) \to (-2,7)$, because $-4$ changes the $x$-coordinate and $2$ changes the
   $y$-coordinate.

If either answer felt uncertain, revisit Sections 14.1 and 14.3 before you carry on.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Translate $(1,2)$ by $\binom{3}{1}$, then translate the image by $\binom{-5}{4}$.
Give the final image, and the single translation with the same effect.

<details markdown="1">
<summary>Hint</summary>

Do the first translation, write the intermediate image down, then do the second.

<details markdown="1">
<summary>Next step</summary>

The first image is $(4,3)$. Now translate $(4,3)$ by $\binom{-5}{4}$.

<details markdown="1">
<summary>Full working</summary>

$$(1,2) \to (4,3) \to (-1,7)$$

The final image is $(-1,7)$. The two vectors add:

$$\binom{3}{1} + \binom{-5}{4} = \binom{-2}{5}$$

So the single translation is $\binom{-2}{5}$.

</details>
</details>
</details>

**2.** Reflect $(2,5)$ in the line $x = 1$, then reflect the image in the line $x = 4$.
Give the final image, and name the single transformation with the same effect.

<details markdown="1">
<summary>Hint</summary>

The two mirror lines are parallel, so the composition is a translation.

<details markdown="1">
<summary>Next step</summary>

The first image is $(0,5)$. Now reflect $(0,5)$ in $x = 4$.

<details markdown="1">
<summary>Full working</summary>

$$(2,5) \to (0,5) \to (8,5)$$

The final image is $(8,5)$. The lines are 3 units apart, and the composition is a
translation by twice that distance: $\binom{6}{0}$.

</details>
</details>
</details>

**3.** Reflect $(3,4)$ in the line $y = x$, then reflect the image in the $x$-axis. Give
the final image, and name the single transformation with the same effect.

<details markdown="1">
<summary>Hint</summary>

The two mirror lines meet at the origin, so the composition is a rotation.

<details markdown="1">
<summary>Next step</summary>

The first image is $(4,3)$. Now reflect $(4,3)$ in the $x$-axis.

<details markdown="1">
<summary>Full working</summary>

$$(3,4) \to (4,3) \to (4,-3)$$

The final image is $(4,-3)$. The map $(x,y) \to (y,-x)$ is a rotation of $90^\circ$
clockwise about the origin.

</details>
</details>
</details>

**4.** Translate $(2,3)$ by $\binom{1}{1}$, then rotate the image by $90^\circ$
anticlockwise about the origin.

<details markdown="1">
<summary>Hint</summary>

Translate first. Then apply the rule $(x,y) \to (-y,x)$ to the image.

<details markdown="1">
<summary>Next step</summary>

The intermediate image is $(3,4)$.

<details markdown="1">
<summary>Full working</summary>

$$(2,3) \to (3,4) \to (-4,3)$$

The final image is $(-4,3)$.

</details>
</details>
</details>

**5.** Now start again from $(2,3)$ and do the two transformations of question 4 in the
other order: rotate first, then translate. Compare the two answers.

<details markdown="1">
<summary>Hint</summary>

Rotate $(2,3)$ by $90^\circ$ anticlockwise, then translate that image by $\binom{1}{1}$.

<details markdown="1">
<summary>Next step</summary>

The rotation gives $(-3,2)$.

<details markdown="1">
<summary>Full working</summary>

$$(2,3) \to (-3,2) \to (-2,3)$$

The final image is $(-2,3)$. Question 4 gave $(-4,3)$, so the two answers differ. The
order of a composition matters.

</details>
</details>
</details>

**6.** Rotate the point $(1,1)$ by $90^\circ$ anticlockwise about the origin, then rotate
the image by $90^\circ$ anticlockwise again. Give the final image and name the single
transformation with the same effect.

<details markdown="1">
<summary>Hint</summary>

Two rotations about the same centre add their angles.

<details markdown="1">
<summary>Next step</summary>

The first rotation gives $(-1,1)$.

<details markdown="1">
<summary>Full working</summary>

$$(1,1) \to (-1,1) \to (-1,-1)$$

The final image is $(-1,-1)$. Two quarter-turns make a half-turn, so the single
transformation is a rotation of $180^\circ$ about the origin.

</details>
</details>
</details>

## A question from Chapter 12

**7.** A translation takes the point $(1,1)$ to $(4,5)$. Write down the translation
vector, and then write down the inverse translation that takes $(4,5)$ back to $(1,1)$.

<details markdown="1">
<summary>Hint</summary>

Find the vector by subtracting, then change the sign of each number for the inverse.

<details markdown="1">
<summary>Next step</summary>

The vector is $\binom{4-1}{5-1} = \binom{3}{4}$.

<details markdown="1">
<summary>Full working</summary>

$$\text{vector} = \binom{4-1}{5-1} = \binom{3}{4}$$

The inverse translation has the opposite vector:

$$\binom{-3}{-4}$$

Applying it to $(4,5)$ gives $(4-3,\; 5-4) = (1,1)$, back where we started.

</details>
</details>
</details>
