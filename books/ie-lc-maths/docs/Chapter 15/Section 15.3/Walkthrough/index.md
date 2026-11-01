---
title: 15.3 Congruent triangles — Learn
chapter: 15
chapter_title: 'Synthetic geometry: foundations'
section: '15.3'
section_title: Congruent triangles
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 15.3 Congruent triangles — Learn

**Prerequisites:** Sections 15.1 and 15.2 — segments, angles and the angle sum.

**Objectives:** say what it means for two triangles to be congruent; use the SAS, ASA and
SSS tests; write a congruence statement with the vertices in matching order.

By the end of this section you can prove that two triangles are the same size and shape
without measuring all six of their parts.

## What congruence means

Two triangles are **congruent** when every side and every angle of one is equal to the
matching side and angle of the other. The two triangles are the same size and the same
shape. You could slide one onto the other and they would fit exactly.

We write

$$\triangle ABC \cong \triangle A'B'C'.$$

The dashes name the image of each point. The order of the letters carries meaning: $A$
matches $A'$, $B$ matches $B'$ and $C$ matches $C'$.

To prove two triangles congruent from the definition, you would have to check all six
parts: three sides and three angles. The fourth axiom says you do not have to.

## Axiom 4: the congruence tests

> **Axiom 4 (SAS + ASA + SSS).** Two triangles are congruent if any one of these three
> conditions holds.
>
> - **SAS** — two sides and the angle between them match.
> - **ASA** — two angles and the side between them match.
> - **SSS** — all three sides match.

Each of the three is a test. Find one of them in the two triangles, and congruence
follows.

Axiom 4 is an axiom because the tests cannot be proved from Axioms 1 to 3. They are
accepted as a fourth starting point. The course states all three together to keep the
work short, but SAS alone would be enough: ASA and SSS can be proved from it.

## Using the tests

To use a test, match the two triangles up first. Then name the test, and name the three
pairs of parts that match.

**Example 1.** In two triangles, $|AB| = |A'B'| = 7$ cm, $|AC| = |A'C'| = 9$ cm, and
$|\angle A| = |\angle A'| = 40^\circ$. Are the triangles congruent?

The two given sides are $AB$ and $AC$, and the given angle is $\angle A$. The angle
$\angle A$ is between the two sides, so this is SAS.

$$\triangle ABC \cong \triangle A'B'C'$$

The two triangles are congruent.

**Example 2.** In two triangles, $|\angle B| = |\angle B'| = 55^\circ$,
$|\angle C| = |\angle C'| = 65^\circ$, and $|BC| = |B'C'| = 8$ cm. Are the triangles
congruent?

The side $BC$ lies between the two given angles $\angle B$ and $\angle C$, so this is
ASA.

$$\triangle ABC \cong \triangle A'B'C'$$

**Example 3.** Two triangles have sides $5$ cm, $7$ cm and $9$ cm, and sides $5$ cm,
$7$ cm and $9$ cm. Are they congruent?

All three sides match, so this is SSS. The triangles are congruent. Notice that the
angles were never measured, and never needed to be.

**Example 4.** $\triangle ABC \cong \triangle PQR$, and $|AB| = 12$ cm. Find $|PQ|$.

The order of the letters says that $A$ matches $P$ and $B$ matches $Q$. So the side $AB$
matches the side $PQ$.

$$|PQ| = |AB| = 12 \text{ cm}$$

## The test that does not work

Two sides and an angle are not always enough. If the angle is **not** between the two
sides, the triangles need not be congruent. This combination is sometimes written SSA,
and it is not a test.

Here is an example. In a triangle, $|AB| = 6$ cm, $|BC| = 4$ cm and
$|\angle A| = 30^\circ$. The angle $\angle A$ is opposite the side $BC$, so it is not
between the two given sides.

Use the sine rule from Chapter 12. The side $BC = 4$ is opposite $A = 30^\circ$, and the
side $AB = 6$ is opposite $C$.

$$\frac{4}{\sin 30^\circ} = \frac{6}{\sin C} \qquad \sin C = \frac{6 \times 0.5}{4} = 0.75$$

So $C = 48.6^\circ$ or $C = 131.4^\circ$, the two-answer case from Chapter 12. Both
answers make a triangle with the given $AB$, $BC$ and angle $A$, but the two triangles
have different shapes. So SSA does not prove congruence.

> **Watch out.** The order of the letters in a congruence statement is not decoration.
> If you write $\triangle ABC \cong \triangle PQR$, you have claimed that $AB = PQ$,
> $BC = QR$ and $CA = RP$, and also that the three angles match in that order. Writing
> the letters in the wrong order states equalities that may be false.
>
> **Re-check:** write the matching pairs under the statement before you use it:
> $A \leftrightarrow P$, $B \leftrightarrow Q$, $C \leftrightarrow R$. Then read each
> side off the matching pairs.

## Progress check

Back to the chapter problem. The glazier checks a finished pane by laying it on a
template. Both the pane and the template are triangles. The glazier finds one side of the
pane that matches the template, and the angle at each end of that side also matches.

Name the congruence test the glazier is using. Then write the congruence statement,
choosing the letters so that the matching vertices line up. Say which side of the
template matches the glazier's measured side.

## You should now be able to

- say what it means for two triangles to be congruent;
- use SAS, ASA and SSS, and name the test you used;
- write a congruence statement with the vertices in matching order;
- read a matching side or angle from a congruence statement;
- explain why two sides and a non-included angle do not prove congruence.
