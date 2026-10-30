---
title: 15.6 Perpendicular lines and right angles — Learn
chapter: 15
chapter_title: 'Synthetic geometry: foundations'
section: '15.6'
section_title: Perpendicular lines and right angles
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 15.6 Perpendicular lines and right angles — Learn

**Prerequisites:** Sections 15.1 to 15.5 — angles, congruence, parallel lines and the
isosceles triangle.

**Objectives:** use the right angle and perpendicular lines; find the acute angles of a
right-angled triangle; use the perpendicular bisector and its two properties.

By the end of this section you can prove that two lines are perpendicular, and you can
use the perpendicular bisector of a segment.

## Right angles and perpendicular lines

A **right angle** is an angle of exactly $90^\circ$. Two lines are **perpendicular** when
they cross at a right angle. We write $l \perp m$.

When two lines are perpendicular, all four angles at the crossing are right angles. The
proof is quick: the angle next to a right angle sits on a straight line, so it is
$180^\circ - 90^\circ = 90^\circ$. Repeating the argument around the crossing gives four
right angles.

Two lines that cross are not necessarily perpendicular. Crossing at some angle is not
enough. The angle has to be exactly $90^\circ$.

## The right-angled triangle

A triangle is **right-angled** when one of its angles is a right angle. The side opposite
the right angle is the **hypotenuse**, and it is the longest side.

> **The two acute angles of a right-angled triangle add to $90^\circ$.**

**Proof.** The three angles of a triangle add to $180^\circ$, by Theorem 4. One of them
is $90^\circ$, so the other two add to

$$180^\circ - 90^\circ = 90^\circ. \quad \blacksquare$$

Two angles that add to $90^\circ$ are called **complementary**.

## Two lines perpendicular to the same line

> **Proposition 1.** Two lines perpendicular to the same line are parallel to one
> another.

**Proof.** Let the lines $l$ and $m$ both be perpendicular to the line $n$. The line $n$
is a transversal of $l$ and $m$, and it makes a right angle with each of them.

The two alternate angles are both $90^\circ$, so they are equal. By Theorem 3 part 1,
the lines $l$ and $m$ are parallel. $\blacksquare$

> **Proposition 2.** There is exactly one line perpendicular to a given line through a
> given point. This holds whether the point is on the line or off it.

**Proof.** Let the given line be $l$ and the given point be $P$. There is at least one
perpendicular: the Protractor Axiom gives a ray making $90^\circ$ with $l$, and the same
ray on the other side makes one straight line.

For uniqueness, suppose two lines through $P$ are both perpendicular to $l$. By
Proposition 1 they are parallel to each other. But two parallel lines through the same
point $P$ are the same line, by Axiom 5. So there is only one. $\blacksquare$

## The perpendicular bisector

The **perpendicular bisector** of a segment $[AB]$ is the line through the midpoint of
$[AB]$ that is perpendicular to $AB$.

The perpendicular bisector has two properties, and each one proves the other.

> **Property 1.** Every point on the perpendicular bisector of $[AB]$ is the same
> distance from $A$ as from $B$.

**Proof.** Let $M$ be the midpoint of $[AB]$, and let $P$ be any point on the
perpendicular bisector, so that $PM \perp AB$.

Compare $\triangle PMA$ and $\triangle PMB$.

- $|MA| = |MB|$, because $M$ is the midpoint.
- $|\angle PMA| = |\angle PMB| = 90^\circ$, because $PM \perp AB$.
- $|PM|$ is common to both triangles.

So $\triangle PMA \cong \triangle PMB$ by SAS, and therefore $|PA| = |PB|$.
$\blacksquare$

> **Property 2.** Every point that is the same distance from $A$ as from $B$ lies on the
> perpendicular bisector of $[AB]$.

**Proof.** Let $P$ satisfy $|PA| = |PB|$. Then $\triangle PAB$ is isosceles, with apex
$P$ and base $AB$. Let $M$ be the midpoint of $[AB]$.

By the corollary in Section 15.5, the line from the apex of an isosceles triangle to the
midpoint of the base is perpendicular to the base. So $PM \perp AB$ and $M$ is the
midpoint. Therefore $PM$ is the perpendicular bisector of $[AB]$, and $P$ lies on it.
$\blacksquare$

The two properties together say: a point lies on the perpendicular bisector exactly when
it is the same distance from $A$ as from $B$.

## Worked examples

**Example 1.** A right-angled triangle has one acute angle of $35^\circ$. Find the other
acute angle.

The two acute angles add to $90^\circ$.

$$90^\circ - 35^\circ = 55^\circ$$

**Example 2.** A line $l$ is perpendicular to a line $m$, and a line $n$ is also
perpendicular to $m$. What can you say about $l$ and $n$?

By Proposition 1, the lines $l$ and $n$ are parallel. They might be the same line, and
they might be two different lines, but they never meet unless they are the same line.

**Example 3.** $[AB]$ has length $18$ cm, and the perpendicular bisector of $[AB]$ meets
$AB$ at $M$. Find $|AM|$ and the angle between the perpendicular bisector and $AB$.

The perpendicular bisector passes through the midpoint, so

$$|AM| = \frac{18}{2} = 9 \text{ cm}.$$

It is perpendicular to $AB$, so the angle between them is $90^\circ$.

**Example 4.** A point $P$ is $12$ cm from $A$ and $12$ cm from $B$. What can you say
about $P$?

The two distances are equal, so $P$ is the same distance from $A$ as from $B$. By
Property 2, $P$ lies on the perpendicular bisector of $[AB]$.

**Example 5.** In a right-angled isosceles triangle, the two acute angles are equal. Find
each acute angle.

The two acute angles add to $90^\circ$, and they are equal, so each is

$$90^\circ \div 2 = 45^\circ.$$

> **Watch out.** Two lines that cross are perpendicular only when the angle between them
> is exactly $90^\circ$. A line that crosses another at $85^\circ$ is not perpendicular,
> and a right-angle mark on a diagram is a claim that needs a reason.
>
> **Re-check:** look for the right-angle square in the diagram, or for a statement that
> the angle is $90^\circ$. Without one of those, do not use perpendicular reasoning.

## Progress check

Back to the chapter problem. The glazier's panel has a third pane, and it is right-angled.
One of its acute angles is $35^\circ$.

1. Find the other acute angle, and say which theorem you used.
2. The glazier marks a point $M$ on the base of the pane and constructs the line through
   $M$ perpendicular to the base. Say what angle that line makes with the base.
3. The pane has a side $30$ cm long. The perpendicular bisector of that side is drawn.
   How far is its meeting point from each end of the side?

## You should now be able to

- say what a right angle and a perpendicular line are;
- find the second acute angle of a right-angled triangle;
- name the hypotenuse;
- prove that two lines perpendicular to the same line are parallel;
- prove that the perpendicular to a line through a given point is unique;
- use both properties of the perpendicular bisector.
