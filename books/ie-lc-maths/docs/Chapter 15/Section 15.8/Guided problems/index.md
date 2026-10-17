---
title: 15.8 Writing a formal proof — Practise with help
chapter: 15
chapter_title: 'Synthetic geometry: foundations'
section: '15.8'
section_title: Writing a formal proof
tier: O
refs:
- '2.1'
kind: guided-problems
---

# 15.8 Writing a formal proof — Practise with help

## Warm-up: remember

1. In $\triangle ABC$, $|\angle A| = 65^\circ$ and $|\angle B| = 48^\circ$. Find
   $|\angle C|$.
2. Name the four parts of a formal proof, in order.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $180 - 65 - 48 = 67^\circ$. The three angles of a triangle add to $180^\circ$, by
   Theorem 4.
2. Given, To prove, Construction, Proof. The Construction part is the one most often
   left out, and it must not be.

If either answer felt uncertain, look again at Sections 15.4 and 15.8 before you carry on.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Write the Given and the To prove for the proof that vertically opposite angles are
equal.

<details markdown="1">
<summary>Hint</summary>

Start with the figure, then name the angles.

<details markdown="1">
<summary>Next step</summary>

Given: two lines crossing at $O$, with the four angles named $a$, $b$, $c$, $d$ in order.
To prove: $a = c$ and $b = d$.

<details markdown="1">
<summary>Full working</summary>

**Given:** two lines crossing at a point $O$. The four angles around $O$ are named $a$,
$b$, $c$ and $d$, in order.

**To prove:** $a = c$ and $b = d$.

There is no construction, because no line or point is added to the figure.

</details>
</details>
</details>

**2.** Complete the proof that vertically opposite angles are equal. Give a reason for
each line.

<details markdown="1">
<summary>Hint</summary>

Look at each straight line through the crossing.

<details markdown="1">
<summary>Next step</summary>

Write two equations, one for each straight line.

<details markdown="1">
<summary>Full working</summary>

1. $a + b = 180^\circ$. [Angles on a straight line]
2. $c + b = 180^\circ$. [Angles on a straight line]
3. $a + b = c + b$. [Both totals are $180^\circ$]
4. $a = c$. [Subtract $b$ from both sides]
5. $b = d$. [The same argument, with $a$ and $c$ in place of $b$ and $d$]

</details>
</details>
</details>

**3.** A proof of the angle sum draws the line through $A$ parallel to $BC$. Which part of
the formal proof does that line belong to?

<details markdown="1">
<summary>Hint</summary>

The line is added to the figure. It is not given.

<details markdown="1">
<summary>Next step</summary>

It is not in the Given, and it is not the statement being proved.

<details markdown="1">
<summary>Full working</summary>

It belongs to the **Construction**.

The Given is the triangle. The To prove is the angle sum. The parallel line is drawn to
make the proof possible, so it is announced in the Construction.

</details>
</details>
</details>

**4.** A student writes: "$|\angle ABC| = |\angle DAB|$, because the angles are equal."
Explain why this is not a reason, and give a better one.

<details markdown="1">
<summary>Hint</summary>

A reason names an axiom, a theorem, a definition, or a fact from the Given.

<details markdown="1">
<summary>Next step</summary>

Which theorem makes those two angles equal?

<details markdown="1">
<summary>Full working</summary>

The reason repeats the statement. "Because the angles are equal" says the same thing as
the line above it, so it proves nothing.

A better reason is "Alternate angles, Theorem 3 part 2". That names the theorem that makes
them equal.

</details>
</details>
</details>

**5.** Write the isosceles proof in formal form. Start from $|AB| = |AC|$, and reach
$|\angle ABC| = |\angle ACB|$.

<details markdown="1">
<summary>Hint</summary>

Compare $\triangle ABC$ with $\triangle ACB$.

<details markdown="1">
<summary>Next step</summary>

Find three matching parts, then name the test.

<details markdown="1">
<summary>Full working</summary>

**Given:** the triangle $\triangle ABC$ with $|AB| = |AC|$.

**To prove:** $|\angle ABC| = |\angle ACB|$.

**Proof.**

1. $|AB| = |AC|$. [Given]
2. $|AC| = |AB|$. [The same sides the other way round]
3. $|\angle BAC| = |\angle CAB|$. [The same angle]
4. $\triangle ABC \cong \triangle ACB$. [SAS]
5. $|\angle ABC| = |\angle ACB|$. [Matching angles of congruent triangles]

</details>
</details>
</details>

**6.** A proof uses the fact that two lines are parallel, but the parallel marks are not
in the Given. Explain why the proof is not valid.

<details markdown="1">
<summary>Hint</summary>

Where can a fact in a proof come from?

<details markdown="1">
<summary>Next step</summary>

Only from an axiom, a theorem, a definition or the Given.

<details markdown="1">
<summary>Full working</summary>

The two lines look parallel in the diagram, but a diagram is only a sketch. The fact is
not in the Given, and it has not been proved.

A proof may use only an axiom, a theorem, a definition, or a fact from the Given. A fact
taken from the look of the diagram is not proved, so the proof is not valid.

</details>
</details>
</details>

## A question from Chapter 9

**7.** Proof by induction also has a fixed shape. Name the two steps of an induction
proof, and say what a formal proof gives the reader that a worked example does not.

<details markdown="1">
<summary>Hint</summary>

The two steps are the base case and the inductive step.

<details markdown="1">
<summary>Next step</summary>

A worked example shows that a statement holds for one case.

<details markdown="1">
<summary>Full working</summary>

The two steps are the **base case** and the **inductive step**.

A worked example shows that a statement holds for the numbers in that example. A proof
shows that it holds for every case, and it shows why. That is the difference: an example
is evidence, and a proof is a reason.

</details>
</details>
</details>
