---
title: 17.7 Proving a circle theorem — Learn
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.7'
section_title: Proving a circle theorem
tier: H
refs:
- '2.1'
kind: walkthrough
---

# 17.7 Proving a circle theorem — Learn

**Prerequisites:** Section 15.8 — the four parts of a formal proof; Section 15.5 — the
isosceles triangle and the exterior angle; Section 17.2 — the theorems you have been
using.

**Objectives:** write a proof with a reason for every line; prove the angle at the centre
theorem; prove a result by contradiction; derive the angle in a semicircle.

By the end of this section you can write out the proof behind the results of Section 17.2,
and you can use a proof by contradiction.

## The shape of a proof

Every formal proof has the same four parts, from Section 15.8.

- **Given:** the facts you start with.
- **To prove:** the one statement you are going to reach.
- **Construction:** any line, point or arc you add to the figure.
- **Proof:** the chain of statements, each with a reason.

The Construction part is tempting to leave out and it must be written. Without it, the reader
does not know where the new line came from.

## Theorem 19: the angle at the centre

> **Theorem 19.** The angle at the centre of a circle standing on a given arc is twice the
> angle at any point of the circle standing on the same arc.

**Given:** a circle with centre $O$, and points $A$, $B$ and $C$ on the circle, with $O$
inside the angle $\angle ABC$.

**To prove:** $|\angle AOC| = 2|\angle ABC|$.

**Construction:** join $B$ to $O$, and continue the line past $O$ to a point $D$.

**Proof.**

1. $|OA| = |OB|$. [Both are radii of the circle.]
2. $|\angle BAO| = |\angle ABO|$. [The base angles of the isosceles triangle $AOB$ are
   equal, by Theorem 2 part 1.]
3. $|\angle AOD| = |\angle BAO| + |\angle ABO|$. [The exterior angle of the triangle
   $AOB$, by Theorem 6.]
4. $|\angle AOD| = 2|\angle ABO|$. [Substitute line 2 into line 3.]
5. $|\angle COD| = 2|\angle CBO|$. [The same argument, with the triangle $COB$.]
6. $|\angle AOC| = |\angle AOD| + |\angle DOC|$. [The ray $OD$ splits the angle
   $\angle AOC$ into these two parts; the Protractor Axiom.]
7. $|\angle AOC| = 2|\angle ABO| + 2|\angle CBO|$. [Substitute lines 4 and 5 into
   line 6.]
8. $|\angle AOC| = 2(|\angle ABO| + |\angle CBO|) = 2|\angle ABC|$. [Take out the common
   factor 2, and add the two parts of the angle at $B$.] $\blacksquare$

The proof used only the definition of a circle, the isosceles triangle theorem and the
exterior angle. Every line has a reason, and every reason is a result that came earlier in
the course.

**The other cases.** The centre may lie inside the angle $\angle ABC$, on one of its arms,
or outside it. The proof above is the inside case. The other cases use the same two facts,
and they subtract instead of adding. The syllabus asks you to examine one case, and the
argument is the same in all of them.

## Corollary 3: the angle in a semicircle

The angle in a semicircle follows from Theorem 19 in two lines.

**Given:** a circle with centre $O$, a diameter $BC$, and a point $A$ on the circle.

**To prove:** $|\angle BAC| = 90^\circ$.

**Proof.** The points $B$, $O$ and $C$ lie on one line, because $BC$ is a diameter. So the
angle $\angle BOC$ at the centre is the straight angle, and
$$|\angle BOC| = 180^\circ.$$

The angle $\angle BAC$ stands on the same arc $BC$, so by Theorem 19 it is half of the
angle at the centre:
$$|\angle BAC| = \tfrac12 \times 180^\circ = 90^\circ. \qquad \blacksquare$$

## Proof by contradiction

Some statements are hard to prove directly, and easier to prove by ruling out the
alternative. The method is called **proof by contradiction**.

1. Suppose the statement is false.
2. Follow the consequence of that supposition until it contradicts a fact you know.
3. The supposition must be wrong, so the statement is true.

Theorem 20 part 1 is proved this way. Here is the full version.

**Given:** a circle with centre $O$, a tangent $l$ that touches the circle at $P$.

**To prove:** $OP$ is perpendicular to $l$.

**Proof.** Suppose, for a contradiction, that $OP$ is **not** perpendicular to $l$.

Let $Q$ be the foot of the perpendicular from $O$ to $l$. Then $Q$ is not $P$. Choose the
point $R$ on $l$ on the other side of $Q$ from $P$, with $|QR| = |QP|$.

1. $|\angle OQP| = |\angle OQR| = 90^\circ$. [Both are right angles, by the construction
   of $Q$.]
2. $|QP| = |QR|$. [Construction of $R$.]
3. $OQ$ is common to the two triangles. [The same segment.]
4. $\triangle OQP \cong \triangle OQR$. [SAS, from lines 1, 2 and 3.]
5. $|OR| = |OP|$. [Matching sides of congruent triangles.]
6. $R$ is on the circle. [It is the radius $|OP|$ from the centre $O$.]
7. $l$ meets the circle at two points, $P$ and $R$. [Both are on $l$ and on the circle.]
8. A tangent meets the circle at exactly one point. [Definition of a tangent.]
9. Line 7 contradicts line 8. [So the supposition was wrong.]
10. Therefore $OP$ is perpendicular to $l$. $\blacksquare$

## Worked examples

**Example 1.** A proof of the angle at the centre contains the line
$|\angle AOD| = 2|\angle ABO|$. Give the reason for it.

The line comes from substituting the equal base angles into the exterior angle. Line 2
gives $|\angle BAO| = |\angle ABO|$, and line 3 gives
$|\angle AOD| = |\angle BAO| + |\angle ABO|$. Substituting line 2 into line 3 gives
$|\angle AOD| = 2|\angle ABO|$.

**Example 2.** A student proves that the angle in a semicircle is $90^\circ$ by drawing one
semicircle, measuring the angle, and finding $90^\circ$. Explain why this is not a proof.

Measuring one example shows that the statement is true for that one semicircle. It does
not show it for every semicircle, and a different circle might give a different angle. A
proof must start from the Given and reach the conclusion by reasons, so that the argument
covers every case at once.

The proof in this section uses Theorem 19, which holds for every circle.

**Example 3.** Prove that the angle in a semicircle is a right angle.

The angle at the centre on a diameter is the straight angle, $180^\circ$. By Theorem 19,
the angle at the circle is half of it, which is $90^\circ$. The full proof is written out
above.

**Example 4.** In the proof by contradiction, why is the point $R$ different from $P$?

The point $Q$ is the foot of the perpendicular from $O$ to $l$, and $Q$ is not $P$,
because $OP$ is not perpendicular to $l$. The point $R$ is on the other side of $Q$ from
$P$, so $R$ is not $P$. That is what makes $l$ meet the circle at two different points,
which is the contradiction.

> **Watch out.** A proof must start from the Given and reach the conclusion. A diagram is
> a sketch, not a reason, and a measured example is not a proof. A line may use an axiom, a
> theorem, a definition or a fact from the Given, and nothing else.
>
> **Re-check:** read each line and ask where it comes from. If the answer is "it looks
> true in the diagram", the line is not proved yet.

## Progress check

Back to the chapter problem. The mason's triangle $ABC$ has the side $BC$ along a diameter
of the window, and the mason needs the angle at $A$ to be a right angle.

Write the full proof that $|\angle BAC| = 90^\circ$, in the four parts.

1. Write the **Given**.
2. Write the **To prove**.
3. Say whether a **Construction** is needed, and why.
4. Write the **Proof**, with a reason for every line.

Then say which earlier section used this result, and why the mason needs it.

## You should now be able to

- write a proof in the four parts, with a reason for every line;
- prove the angle at the centre theorem, using the isosceles triangle and the exterior
  angle;
- derive the angle in a semicircle from it;
- use proof by contradiction, and say what the contradiction is;
- explain why a measured example is not a proof.
