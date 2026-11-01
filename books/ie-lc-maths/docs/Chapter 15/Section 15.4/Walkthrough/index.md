---
title: 15.4 Parallel lines — Learn
chapter: 15
chapter_title: 'Synthetic geometry: foundations'
section: '15.4'
section_title: Parallel lines
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 15.4 Parallel lines — Learn

**Prerequisites:** Sections 15.1 to 15.3 — the axioms, angles at a crossing, and congruent
triangles.

**Objectives:** use the Axiom of Parallels; use alternate and corresponding angles; prove
that the angles of a triangle add to $180^\circ$; use the exterior angle.

By the end of this section you can prove the angle sum of a triangle, which is the
chapter problem.

## Parallel lines

Two lines are **parallel** when they are either identical or have no point in common. We
write $l \parallel m$. Parallel lines never meet, however far they are drawn.

The fifth axiom is about drawing a parallel line.

> **Axiom 5 (Axiom of Parallels).** Given any line $l$ and a point $P$ not on $l$, there
> is exactly one line through $P$ parallel to $l$.

The word that matters is **exactly**. There is a parallel line through $P$, and there is
only one.

A line that meets two other lines is called a **transversal**. A transversal across two
lines makes eight angles. Two of them are a pair of **alternate angles** when they lie on
opposite sides of the transversal, between the two lines, and make a zig-zag shape.

## Theorem 3: alternate angles

> **Theorem 3.** Suppose $A$ and $D$ are on opposite sides of the line $BC$.
>
> 1. If $|\angle ABC| = |\angle BCD|$, then $AB \parallel CD$.
> 2. Conversely, if $AB \parallel CD$, then $|\angle ABC| = |\angle BCD|$.

In words: a transversal makes equal alternate angles exactly when the two lines are
parallel. Part 1 gives the parallel lines. Part 2 gives the equal angles.

**Proof of part 1.** Suppose the alternate angles are equal. If the lines $AB$ and $CD$
do not meet, then they are parallel, and there is nothing left to prove.

So suppose the lines meet at a point $E$, and take the case where $E$ is on the same side
of $BC$ as $D$. Choose the point $F$ on the ray $EB$, on the same side of $BC$ as $A$,
with $|BF| = |CE|$.

Now look at the triangles $BCE$ and $CBF$.

- $|BC| = |CB|$, the same segment.
- $|CE| = |BF|$, by the way $F$ was chosen.
- $|\angle BCE| = |\angle BCD|$, and $|\angle CBF| = |\angle ABC|$, and the two alternate
  angles are equal.

So $\triangle BCE \cong \triangle CBF$ by SAS.

The congruence gives $|\angle BCF| = |\angle CBE|$. Now $E$ lies on the line $AB$ on the
opposite side of $BC$ from $A$, so $|\angle CBE| = 180^\circ - |\angle ABC|$. Therefore

$$|\angle BCF| = 180^\circ - |\angle ABC| = 180^\circ - |\angle BCD|.$$

That places $F$ on the line $DC$, on the far side of $C$. So both lines $AB$ and $CD$ pass
through $E$ and through $F$. By Axiom 1 there is only one line through two given points,
so the two lines are the same line. Identical lines are parallel, so $AB \parallel CD$.

The other cases, where $E$ lies on $BC$ or on the same side as $A$, follow the same
argument with $A$ and $D$ exchanged. $\blacksquare$

**Proof of part 2.** Suppose $AB \parallel CD$. Choose the point $E$ on the same side of
$BC$ as $D$ with $|\angle BCE| = |\angle ABC|$. The Protractor Axiom guarantees exactly
one such ray.

By part 1, the line $CE$ is parallel to $AB$. By Axiom 5, there is only one line through
$C$ parallel to $AB$. So $CE$ and $CD$ are the same line, and

$$|\angle BCD| = |\angle BCE| = |\angle ABC|. \quad \blacksquare$$

## Theorem 4: the angle sum

Now the chapter problem. With alternate angles we can prove the result the whole chapter
has been building towards.

> **Theorem 4 (Angle Sum).** The angles in any triangle add to $180^\circ$.

**Proof.** Let $\triangle ABC$ be any triangle. Draw the line through $A$ parallel to
$BC$, using Axiom 5. Name the two ends of this line $D$ and $E$, so that $D$ is on the
opposite side of $AB$ from $C$, and $E$ is on the opposite side of $AC$ from $B$.

The line $AB$ is a transversal of the parallel lines $DE$ and $BC$. The angles $\angle ABC$
and $\angle DAB$ are alternate angles, so by Theorem 3 part 2,

$$|\angle ABC| = |\angle DAB|.$$

The line $AC$ is also a transversal of the parallel lines $DE$ and $BC$. The angles
$\angle ACB$ and $\angle CAE$ are alternate angles, so

$$|\angle ACB| = |\angle CAE|.$$

Now add the three angles of the triangle. The Protractor Axiom lets us add the parts of
the straight angle at $A$.

$$|\angle ABC| + |\angle ACB| + |\angle BAC| = |\angle DAB| + |\angle CAE| + |\angle BAC| = |\angle DAE|$$

The angles $\angle DAB$, $\angle BAC$ and $\angle CAE$ together make the straight angle
$\angle DAE$, which is $180^\circ$. So

$$|\angle ABC| + |\angle ACB| + |\angle BAC| = 180^\circ. \quad \blacksquare$$

The proof rests on three things: Axiom 5 (the parallel line), Theorem 3 part 2 (equal
alternate angles), and the Protractor Axiom (a straight angle is $180^\circ$, and angles
add). Nothing else.

## Two more theorems

> **Theorem 5 (Corresponding Angles).** Two lines are parallel if and only if a
> transversal makes equal corresponding angles.

Corresponding angles are the angles in matching positions at the two crossings, one
outside and one inside on the same side of the transversal.

**Proof.** Let $F$ be a point on $AB$ such that $F$ and $B$ are on opposite sides of the
transversal. The angles $\angle EAB$ and $\angle FAC$ are vertically opposite, so they are
equal by Theorem 1.

If the corresponding angles are equal, then $|\angle FAC| = |\angle ACD|$. Those two are
alternate angles, so $AB \parallel CD$ by Theorem 3 part 1.

Conversely, if $AB \parallel CD$, then the alternate angles $|\angle FAC| = |\angle ACD|$
by Theorem 3 part 2. Since $|\angle EAB| = |\angle FAC|$, the corresponding angles are
equal. $\blacksquare$

> **Theorem 6 (Exterior Angle).** Each exterior angle of a triangle equals the sum of the
> two interior opposite angles.

**Proof.** Let $\alpha$ be the exterior angle at $A$ in $\triangle ABC$. The exterior
angle and the interior angle at $A$ are supplementary, so

$$\alpha + |\angle A| = 180^\circ.$$

The three angles of the triangle add to $180^\circ$, by Theorem 4, so

$$|\angle A| + |\angle B| + |\angle C| = 180^\circ.$$

The two right-hand sides are equal. Subtract $|\angle A|$ from both sides:

$$\alpha = |\angle B| + |\angle C|. \quad \blacksquare$$

## Worked examples

**Example 1.** Two parallel lines are cut by a transversal. One angle is $72^\circ$. Find
its alternate angle, its corresponding angle, and the angle inside on the same side.

The alternate angle is $72^\circ$, by Theorem 3 part 2. The corresponding angle is also
$72^\circ$, by Theorem 5.

The angle inside on the same side of the transversal is supplementary to the alternate
angle, because the two together sit on a straight line:

$$180^\circ - 72^\circ = 108^\circ.$$

**Example 2.** In $\triangle ABC$, $|\angle A| = 65^\circ$ and $|\angle B| = 48^\circ$.
Find $|\angle C|$.

The three angles add to $180^\circ$, by Theorem 4.

$$65 + 48 + |\angle C| = 180$$

$$113 + |\angle C| = 180$$

$$|\angle C| = 67^\circ$$

This is the glazier's pane. The third angle is $67^\circ$, which is the prediction you
made at the start of the chapter.

**Example 3.** In $\triangle ABC$, the exterior angle at $A$ is $113^\circ$ and
$|\angle B| = 65^\circ$. Find $|\angle C|$.

By Theorem 6, the exterior angle equals the sum of the two interior opposite angles.

$$113 = 65 + |\angle C|$$

$$|\angle C| = 48^\circ$$

Check with Theorem 4: $|\angle A| = 180 - 113 = 67^\circ$, and
$67 + 65 + 48 = 180$. Both rules agree.

**Example 4.** Two parallel lines are cut by a transversal. A pair of corresponding angles
are $3x$ and $2x + 30$. Find $x$.

Corresponding angles are equal, so

$$3x = 2x + 30$$

$$x = 30.$$

Both angles are $90^\circ$, so the transversal is perpendicular to the two parallel lines.

> **Watch out.** Alternate angles are equal only when the two lines are parallel. If the
> lines lean towards each other, the alternate angles are not equal, and using the rule
> there gives a wrong answer.
>
> **Re-check:** find the parallel marks on the two lines before you use the rule. If there
> are no parallel marks, the rule does not apply.

## Progress check

Back to the chapter problem. This is where the proof is finished.

The glazier's pane is the triangle $\triangle ABC$, with $|\angle A| = 65^\circ$ and
$|\angle B| = 48^\circ$.

Draw the line through the apex $C$ parallel to the base $AB$. Name the two ends of that
line $P$ and $Q$, so that $P$ is on the same side as $A$ and $Q$ is on the same side as
$B$. Then:

1. name the two pairs of alternate angles at the apex, and say which theorem makes them
   equal;
2. write the three angles at $C$ that together make the straight angle $PQ$;
3. finish the proof that $|\angle A| + |\angle B| + |\angle C| = 180^\circ$;
4. work out $|\angle C|$ for the glazier's pane.

Keep the finished proof. Section 15.8 shows how to write it out formally.

## You should now be able to

- state the Axiom of Parallels, and say that the parallel line through a point is unique;
- find alternate and corresponding angles at parallel lines;
- prove both parts of the alternate angles theorem;
- prove that the angles of a triangle add to $180^\circ$;
- use the exterior angle theorem;
- say which axiom and which theorem the angle sum proof rests on.
