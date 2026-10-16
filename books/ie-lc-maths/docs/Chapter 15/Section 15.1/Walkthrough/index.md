---
title: 15.1 Axioms and the rules of deduction — Learn
chapter: 15
chapter_title: 'Synthetic geometry: foundations'
section: '15.1'
section_title: Axioms and the rules of deduction
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 15.1 Axioms and the rules of deduction — Learn

**Prerequisites:** naming points, lines and angles; the angle facts from Chapter 12.

**Objectives:** say what an axiom is and state the first three; use the words theorem,
proof, corollary, converse and implies; follow a chain of reasoning from an accepted
statement to a conclusion.

By the end of this section you can tell the difference between something we accept and
something we prove.

## The words we start with

Geometry begins with three words we do not define: **point**, **line** and **plane**. We
describe them instead.

A point marks a position. A line is straight and endless in both directions. A plane is a
flat surface that goes on for ever. We agree on how these three words behave, and then we
build on them.

We name points with capital letters: $A$, $B$, $C$. We name lines with small letters:
$l$, $m$, $n$. The line through the points $A$ and $B$ is written $AB$.

## Axioms

An **axiom** is a statement we accept as true, without proof. Axioms are the starting
points of the subject. Everything else is proved from them.

The Leaving Certificate course starts from five axioms. This section states the first
three. The fourth and fifth come in Sections 15.3 and 15.4, where they are needed.

> **Axiom 1 (Two Points).** There is exactly one line through any two given points.

The line through $A$ and $B$ is written $AB$. Axiom 1 says there is only one such line,
so two points fix a line completely.

**Definition.** The **line segment** $[AB]$ is the part of the line $AB$ between $A$ and
$B$, including the two endpoints. The point $A$ divides the line $AB$ into two pieces
called **rays**.

> **Axiom 2 (Ruler).** Distance has these properties.
>
> 1. The distance $|AB|$ is never negative.
> 2. $|AB| = |BA|$.
> 3. If $C$ lies on $AB$, between $A$ and $B$, then $|AB| = |AC| + |CB|$.
> 4. Given a ray from $A$ and any number $k \ge 0$, there is exactly one point $B$ on the
>    ray with $|AB| = k$.

Part 3 says that a point between two others splits the distance into two parts that add
to the whole. Part 4 says you can mark off any distance you like along a ray, and the
point is unique.

**Definition.** The **midpoint** of the segment $[AB]$ is the point $M$ of the segment
with
$$|AM| = |MB| = \frac{|AB|}{2}.$$

> **Axiom 3 (Protractor).** The number of degrees in an angle is between $0^\circ$ and
> $360^\circ$. It has these properties.
>
> 1. A straight angle has $180^\circ$.
> 2. Given a ray $[AB$ and a number $d$ between $0$ and $180$, there is exactly one ray
>    from $A$ on each side of the line $AB$ making an angle of $d$ degrees with $[AB$.
> 3. If $D$ is a point inside the angle $\angle BAC$, then
>    $$|\angle BAC| = |\angle BAD| + |\angle DAC|.$$

Part 3 says an angle can be split into two parts that add to the whole. That is the rule
we use every time we add angles together.

## The kinds of angle

The Protractor Axiom names the measure. The definitions name the angle.

| Angle | Measure |
|---|---|
| Null | $0^\circ$ |
| Ordinary | between $0^\circ$ and $180^\circ$ |
| Straight | $180^\circ$ |
| Reflex | between $180^\circ$ and $360^\circ$ |
| Full | $360^\circ$ |

Unless we say otherwise, every angle in this chapter is an ordinary angle. Two more
definitions follow from the measure.

- A **right angle** is an angle of exactly $90^\circ$.
- An angle is **acute** if it is less than $90^\circ$, and **obtuse** if it is more than
  $90^\circ$.

Two angles are **supplementary** when they add to $180^\circ$. Two lines are
**perpendicular** when they cross at a right angle.

## The rules of deduction

A proof is a chain of statements. Each statement follows from the one before it, and the
first statements are the axioms. Four words describe the chain.

- A **theorem** is a statement proved from the axioms.
- A **proof** is the reasoning that shows the theorem is true.
- A **corollary** is a result that follows quickly from a theorem.
- The **converse** of "if $P$ then $Q$" is "if $Q$ then $P$".

We also need one symbol. We write $P \Rightarrow Q$ and read it as "$P$ implies $Q$".
It means that if $P$ is true, then $Q$ must be true.

When a statement and its converse are both true, we write "if and only if". The phrase
says both directions at once.

## Worked examples

**Example 1.** Write the converse of "if a shape is a square, then it has four right
angles", and say whether the converse is true.

The hypothesis is "a shape is a square". The conclusion is "it has four right angles".

The converse swaps them: "if a shape has four right angles, then it is a square".

The converse is false. A rectangle has four right angles and is not a square. One
counterexample is enough to show that a statement is false.

**Example 2.** Write the converse of "if a number is a multiple of $10$, then it is even",
and say whether the converse is true.

The converse is "if a number is even, then it is a multiple of $10$".

The converse is false, because $6$ is even and is not a multiple of $10$. The original
statement is true, so this is a case where a true statement has a false converse.

**Example 3.** $M$ is the midpoint of $[AB]$, and $|AB| = 14$ cm. Find $|AM|$.

The midpoint splits the segment into two equal parts.
$$|AM| = \frac{|AB|}{2} = \frac{14}{2} = 7 \text{ cm}$$

**Example 4.** The points $A$, $C$ and $B$ lie on a line, with $C$ between $A$ and $B$.
Given $|AC| = 6$ cm and $|CB| = 11$ cm, find $|AB|$.

The point $C$ is between $A$ and $B$, so the two parts add to the whole.
$$|AB| = |AC| + |CB| = 6 + 11 = 17 \text{ cm}$$

**Example 5.** $D$ is inside the angle $\angle BAC$. Given $|\angle BAC| = 74^\circ$ and
$|\angle BAD| = 30^\circ$, find $|\angle DAC|$.

The point $D$ splits the angle into two parts that add to the whole.
$$|\angle DAC| = 74^\circ - 30^\circ = 44^\circ$$

> **Watch out.** A statement and its converse are different statements, and one can be
> true while the other is false. "If a quadrilateral is a rhombus, then its diagonals are
> perpendicular" is true. Its converse, "if the diagonals of a quadrilateral are
> perpendicular, then it is a rhombus", is false: a kite has perpendicular diagonals and
> is not a rhombus.
>
> **Re-check:** write the two statements side by side. Swap the "if" part with the "then"
> part, then look for one example that breaks the new statement. One example is enough.

## Progress check

Back to the chapter problem. The glazier's pane has two angles of $65^\circ$ and
$48^\circ$.

Three statements are on the table:

- there is exactly one line through two given points;
- the measure of a straight angle is $180^\circ$;
- the angles of a triangle add to $180^\circ$.

Decide which of the three is an axiom and which must be proved. Say which axiom covers
each accepted statement. Then write down the two angles the glazier already knows, and
the angle that is still unknown.

## You should now be able to

- describe the three undefined words point, line and plane;
- say what an axiom is, and state the first three;
- use the words segment, ray, midpoint, right angle, acute, obtuse and supplementary;
- say what a theorem, a proof, a corollary and a converse are;
- write the converse of an "if ... then ..." statement, and test it with an example;
- split a segment or an angle into two parts that add to the whole.
