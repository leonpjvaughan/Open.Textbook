---
title: 17.7 Proving a circle theorem — Practise with help
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.7'
section_title: Proving a circle theorem
tier: H
refs:
- '2.1'
kind: guided-problems
---

# 17.7 Proving a circle theorem — Practise with help

## Warm-up: remember

1. Name the four parts of a formal proof, in order.
2. In an isosceles triangle with apex $O$ and base $AB$, what is true of the angles
   $\angle OAB$ and $\angle OBA$?

<details markdown="1">
<summary>Answers and feedback</summary>

1. Given, To prove, Construction, Proof.
2. They are equal. The two base angles of an isosceles triangle are equal, by Theorem 2
   part 1 from Section 15.5.

Both answers are needed here. The four parts give the proof its shape, and the isosceles
triangle gives the first equality inside it.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Write the Given and the To prove for the proof that the angle at the centre is twice
the angle at the circle.

<details markdown="1">
<summary>Hint</summary>

The Given holds the facts you start with, and the To prove holds one statement.

<details markdown="1">
<summary>Next step</summary>

Name the circle, its centre and the three points.

<details markdown="1">
<summary>Full working</summary>

**Given:** a circle with centre $O$, and points $A$, $B$ and $C$ on the circle, with $O$
inside the angle $\angle ABC$.

**To prove:** $|\angle AOC| = 2|\angle ABC|$.

</details>
</details>
</details>

**2.** In the proof of Theorem 19, line 3 says
$|\angle AOD| = |\angle BAO| + |\angle ABO|$. Give the reason for that line.

<details markdown="1">
<summary>Hint</summary>

The angle $\angle AOD$ is outside the triangle $AOB$.

<details markdown="1">
<summary>Next step</summary>

The exterior angle of a triangle equals the sum of the two interior opposite angles.

<details markdown="1">
<summary>Full working</summary>

The angle $\angle AOD$ is the exterior angle of the triangle $AOB$ at the vertex $O$. The
exterior angle equals the sum of the two interior opposite angles, by Theorem 6. Those two
angles are $\angle BAO$ and $\angle ABO$.

</details>
</details>
</details>

**3.** Prove that the angle in a semicircle is a right angle, using Theorem 19.

<details markdown="1">
<summary>Hint</summary>

A diameter passes through the centre.

<details markdown="1">
<summary>Next step</summary>

The angle at the centre on a diameter is $180^\circ$.

<details markdown="1">
<summary>Full working</summary>

**Given:** a circle with centre $O$, a diameter $BC$, and a point $A$ on the circle.

**To prove:** $|\angle BAC| = 90^\circ$.

**Proof.** The points $B$, $O$ and $C$ lie on one line, so the angle $\angle BOC$ is the
straight angle, $180^\circ$. The angle $\angle BAC$ stands on the same arc $BC$, so by
Theorem 19 it is half of the angle at the centre:
$$|\angle BAC| = \tfrac12 \times 180^\circ = 90^\circ.$$

</details>
</details>
</details>

**4.** Write the first three steps of the proof by contradiction that a tangent is
perpendicular to the radius at the point of contact.

<details markdown="1">
<summary>Hint</summary>

Start by supposing the opposite of what you want to prove.

<details markdown="1">
<summary>Next step</summary>

Let $Q$ be the foot of the perpendicular from the centre to the tangent.

<details markdown="1">
<summary>Full working</summary>

1. Suppose the tangent $l$ touches the circle at $P$, and $OP$ is **not** perpendicular
   to $l$.
2. Let $Q$ be the foot of the perpendicular from $O$ to $l$. Then $Q$ is not $P$.
3. Choose the point $R$ on $l$ on the other side of $Q$ from $P$, with $|QR| = |QP|$.

The next steps show that $R$ is also on the circle, which contradicts the definition of a
tangent.

</details>
</details>
</details>

**5.** A proof of a circle theorem uses the line "the two triangles are congruent, so
$|OA| = |OB|$", but the diagram shows the two triangles with different shapes. Explain
what has gone wrong.

<details markdown="1">
<summary>Hint</summary>

A proof may not use a fact that has not been proved or given.

<details markdown="1">
<summary>Next step</summary>

The congruence must be established before the matching sides can be used.

<details markdown="1">
<summary>Full working</summary>

The line uses congruence to reach a conclusion, so the congruence must come first. If the
two triangles have not been shown to be congruent, the line is not proved.

The writer has used the picture as a reason. A diagram is only a sketch, so a fact read
from it is not available. Every line must come from an axiom, a theorem, a definition or
the Given.

</details>
</details>
</details>

**6.** Prove that angles in the same segment are equal, using Theorem 19.

<details markdown="1">
<summary>Hint</summary>

Both angles stand on the same arc, so both are half of the same angle at the centre.

<details markdown="1">
<summary>Next step</summary>

Two halves of the same angle are equal.

<details markdown="1">
<summary>Full working</summary>

**Given:** a circle, and points $A$, $A'$, $B$ and $C$ on it, with $A$ and $A'$ on the same
side of the line $BC$.

**To prove:** $|\angle BAC| = |\angle BA'C|$.

**Proof.** The angle $\angle BAC$ is half of the angle at the centre standing on the arc
$BC$, by Theorem 19. The angle $\angle BA'C$ is also half of that same angle at the centre,
because both angles stand on the same arc.

Two halves of the same angle are equal, so $|\angle BAC| = |\angle BA'C|$.

</details>
</details>
</details>

## A question from Section 15.5

**7.** Write the proof that the two base angles of an isosceles triangle are equal, in the
four parts. Say which axiom the proof uses.

<details markdown="1">
<summary>Hint</summary>

Compare the triangle with itself, with the two ends of the base exchanged.

<details markdown="1">
<summary>Next step</summary>

The two sides $AB$ and $AC$ are equal, and the angle at $A$ is the same angle.

<details markdown="1">
<summary>Full working</summary>

**Given:** the triangle $ABC$ with $|AB| = |AC|$.

**To prove:** $|\angle ABC| = |\angle ACB|$.

**Construction:** none is needed.

**Proof.** The side $AC$ equals the side $AB$ the other way round, the side $AB$ equals
the side $AC$ the other way round, and the angle $\angle BAC$ is the same angle as
$\angle CAB$. So $\triangle ABC \cong \triangle ACB$ by SAS, using Axiom 4.

The matching angles of the two congruent triangles are equal, so
$|\angle ABC| = |\angle ACB|$.

The proof uses Axiom 4, the SAS congruence test. The same test is used in the proof of the
tangent result.

</details>
</details>
</details>
