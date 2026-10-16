---
title: 'Chapter 15: Review'
chapter: 15
kind: review
---

# Chapter 15: Review

## The chapter problem, solved

**A proof you can build on.** The glazier's first pane is a triangle with two angles of
$65^\circ$ and $48^\circ$. The glazier needs the third angle, and needs to know that the
rule holds for every triangle.

### The third angle

The three angles of a triangle add to $180^\circ$, by Theorem 4.

$$65 + 48 = 113$$

$$180 - 113 = 67^\circ$$

The third angle is $67^\circ$. This is the prediction you made at the start of the
chapter. If you wrote $67^\circ$, you were already using the rule.

### The check on the prediction

You also predicted whether the sum stays the same when the triangle is made taller and
flatter. It does, and the proof says why. Nothing in the proof uses the particular numbers
$65$ and $48$, and nothing in it uses the shape of one triangle. It works for **any**
triangle, however tall or flat.

### The proof, in full

**Given:** the triangle $\triangle ABC$.

**To prove:** $|\angle ABC| + |\angle BCA| + |\angle CAB| = 180^\circ$.

**Construction:** Draw the line through $A$ parallel to $BC$. Name its two ends $D$ and
$E$, with $D$ on the opposite side of $AB$ from $C$, and $E$ on the opposite side of $AC$
from $B$.

**Proof.**

1. $DE \parallel BC$. [Construction]
2. $|\angle ABC| = |\angle DAB|$. [Alternate angles, Theorem 3 part 2, with $AB$ as
   transversal]
3. $|\angle BCA| = |\angle CAE|$. [Alternate angles, Theorem 3 part 2, with $AC$ as
   transversal]
4. $|\angle DAB| + |\angle BAC| + |\angle CAE| = 180^\circ$. [The three angles make the
   straight angle $\angle DAE$; Protractor Axiom]
5. $|\angle ABC| + |\angle BAC| + |\angle BCA| = 180^\circ$. [Substitute lines 2 and 3
   into line 4] $\blacksquare$

### What the proof rests on

This is the sentence the chapter problem asked for. The angle sum rests on exactly three
accepted statements and theorems.

- **Axiom 5, the Axiom of Parallels**, which gives the line through $A$ parallel to $BC$,
  and says it is the only one.
- **Theorem 3 part 2**, which turns the parallel lines into equal alternate angles.
- **The Protractor Axiom**, which says a straight angle is $180^\circ$ and lets the three
  angles at $A$ be added.

Theorem 3 part 2 rests on Theorem 3 part 1, and part 1 rests on Axiom 4 (the congruence
tests) and Axiom 1 (one line through two points). So the chain reaches back to the
beginning of the course, and every link is an accepted statement or a proof.

### The other panes

The panel uses three more panes, and each one uses a theorem from the chapter.

- The **isosceles pane** has an apex angle of $100^\circ$, so each base angle is
  $(180 - 100) \div 2 = 40^\circ$, by Theorem 2 part 1.
- The **right-angled pane** has one acute angle of $35^\circ$, so the other is
  $90 - 35 = 55^\circ$.
- The **template check** on the finished pane uses ASA, from Axiom 4.

## Mixed practice — choose the method first

Work through these without notes. For each one, say **which fact or theorem** you will
use, and why, before you calculate. Some need an angle at a crossing, some a parallel-line
fact, some a congruence test, and some come from an earlier chapter.

1. Two straight lines cross. One angle is $58^\circ$. Find the other three angles.
2. In $\triangle ABC$, $|\angle A| = 72^\circ$ and $|\angle B| = 61^\circ$. Find
   $|\angle C|$.
3. Two parallel lines are cut by a transversal. One angle is $115^\circ$. Find the angle
   inside the parallel lines on the same side.
4. An isosceles triangle has a base angle of $48^\circ$. Find the apex angle.
5. In a right-angled triangle, one acute angle is $27^\circ$. Find the other.
6. A triangle has sides $8$ cm, $6$ cm and $3$ cm. Can these lengths form a triangle? Give
   a reason.
7. $\triangle ABC \cong \triangle PQR$, with $|AB| = 14$ cm. Find $|PQ|$.
8. In $\triangle ABC$, the exterior angle at $A$ is $124^\circ$ and $|\angle B| = 58^\circ$.
   Find $|\angle C|$.
9. From Chapter 12: a right-angled triangle has legs of $9$ cm and $12$ cm. Find the
   hypotenuse.
10. From Chapter 13: find the slope of the line through $(2,3)$ and $(6,11)$.
11. From Chapter 14: reflect the point $(4,-3)$ in the $x$-axis.
12. From Chapter 3: find the area of a triangle with base $10$ cm and height $6$ cm.

<details markdown="1">
<summary>Answers and reasons</summary>

1. $58^\circ$, $122^\circ$, $58^\circ$ and $122^\circ$. The two $58^\circ$ angles are
   vertically opposite, and the other two are supplementary to $58^\circ$.
2. $180 - 72 - 61 = 47^\circ$. The three angles of a triangle add to $180^\circ$.
3. $180 - 115 = 65^\circ$. The alternate angle is $115^\circ$, and the angle on the same
   side is supplementary to it.
4. $180 - 2 \times 48 = 84^\circ$. The two base angles are equal.
5. $90 - 27 = 63^\circ$. The two acute angles add to $90^\circ$.
6. No. The two shorter sides add to $9$ cm, which is more than $8$ cm, so this test passes.
   Check the other pairs: $8 + 3 = 11 > 6$, and $6 + 3 = 9 > 8$. Every pair passes, so
   these lengths **can** form a triangle. The triangle inequality holds for all three
   pairs.
7. $14$ cm. The letter order gives $A$ matching $P$ and $B$ matching $Q$.
8. $124 - 58 = 66^\circ$. The exterior angle equals the sum of the two interior opposite
   angles.
9. $\sqrt{9^2 + 12^2} = \sqrt{225} = 15$ cm, by Pythagoras' theorem.
10. $(11 - 3) \div (6 - 2) = 8 \div 4 = 2$.
11. $(4,3)$. Reflection in the $x$-axis keeps the $x$-coordinate and changes the sign of
    the $y$-coordinate.
12. $\tfrac12 \times 10 \times 6 = 30$ cm².

</details>

## What you can now do

- say what an axiom is, and state the first five;
- use the words theorem, proof, corollary, converse and implies;
- prove that vertically opposite angles are equal, and use angles on a line and at a
  point;
- decide whether two triangles are congruent by SAS, ASA or SSS, and write the congruence
  statement in matching order;
- use alternate and corresponding angles at parallel lines;
- prove that the angles of a triangle add to $180^\circ$, and use the exterior angle;
- prove the isosceles triangle theorem and its converse, and compare sides with angles;
- use the triangle inequality;
- use perpendicular lines and both properties of the perpendicular bisector;
- carry out constructions 1 to 6 with a straight edge and compass;
- write a formal proof with a reason for every line.

## Thinking back

Return to the connection you wrote at the start of the chapter. You chose one geometrical
fact you rely on without knowing why it is true.

You can now do better than rely on it. Find the fact in the list below, and write down
what it rests on.

- If it is **the angles of a triangle add to $180^\circ$**, the proof rests on the Axiom
  of Parallels, the alternate angles theorem, and the Protractor Axiom.
- If it is **a straight line is $180^\circ$**, that is part 1 of the Protractor Axiom. It
  is accepted, not proved.
- If it is **the base angles of an isosceles triangle are equal**, the proof rests on the
  SAS congruence test.
- If it is **vertically opposite angles are equal**, the proof rests on angles on a
  straight line.

Write the sentence in the same shape as the one above the mixed practice: the fact, then
what it rests on. That sentence is what this chapter was for. Every later theorem in the
course will rest on results like these, and you can now say exactly where the chain
begins.
