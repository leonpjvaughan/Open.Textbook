---
title: 17.1 Chords and the centre — Learn
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.1'
section_title: Chords and the centre
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 17.1 Chords and the centre — Learn

**Prerequisites:** Section 15.3 — congruent triangles; Section 15.6 — the perpendicular
bisector; Section 16.5 — Pythagoras' theorem.

**Objectives:** name the parts of a circle; use the perpendicular from the centre to a
chord; find the centre of a circle from a chord; find a chord, a radius or a distance
from the centre.

By the end of this section you can work with a chord and the centre, and you can find the
centre of a drawn circle.

## The parts of a circle

A **circle** is the set of points at a fixed distance from one point. That point is the
**centre**, and the fixed distance is the **radius**. The plural of radius is radii.

A **chord** is a segment that joins two points of the circle. A chord that passes through
the centre is a **diameter**. Every diameter has length twice the radius. Two points on a
circle cut it into two pieces, and each piece is an **arc**. An arc whose ends are the
ends of a diameter is a **semicircle**.

A line that meets a circle at exactly one point is a **tangent**, and the point it meets
is the **point of contact**. Tangents have their own section, 17.4.

## The perpendicular from the centre to a chord

The centre and a chord are linked by a right angle, and that link is the main tool of this
section.

> **Theorem 21.**
>
> 1. The perpendicular from the centre to a chord bisects the chord.
> 2. The perpendicular bisector of a chord passes through the centre.

**Proof of part 1.** Let $AB$ be a chord of a circle with centre $O$. Let $C$ be the foot
of the perpendicular from $O$ to $AB$, so that $OC$ is at right angles to $AB$.

The points $A$ and $B$ are both on the circle, so

$$|OA| = |OB|.$$

Both triangles $OCA$ and $OCB$ have a right angle at $C$, so Pythagoras' theorem gives

$$|OC|^2 + |AC|^2 = |OA|^2 \quad\text{and}\quad |OC|^2 + |CB|^2 = |OB|^2.$$

The two right-hand sides are equal, so $|AC|^2 = |CB|^2$. Both are lengths, so

$$|AC| = |CB|.$$

So $C$ is the midpoint of $AB$, and the perpendicular from $O$ bisects the chord.
$\blacksquare$

The two triangles are also congruent by SSS: $|OA| = |OB|$, $|OC|$ is common, and
$|AC| = |CB|$.

**Proof of part 2.** Let $AB$ be a chord. By part 1, the perpendicular from the centre
$O$ to $AB$ meets $AB$ at its midpoint. So the line from $O$ perpendicular to $AB$ is a
line through the midpoint at right angles to $AB$.

A segment has exactly one midpoint, by the Ruler Axiom, and through one point there is
exactly one line perpendicular to a given line. So this line is *the* perpendicular
bisector of $AB$. Therefore the perpendicular bisector of $AB$ passes through $O$.
$\blacksquare$

## The right-angled triangle

Part 1 gives a right-angled triangle, and Pythagoras does the rest. Let $r$ be the
radius, let $d$ be the distance from the centre to the chord, and let $c$ be the length
of the chord. The half-chord is $\tfrac12 c$, so

$$d^2 + \left(\tfrac12 c\right)^2 = r^2.$$

Any two of $r$, $d$ and $c$ give the third.

## Finding the centre of a circle

Part 2 is the method for finding the centre. Draw any two chords, and construct the
perpendicular bisector of each one. Both bisectors pass through the centre, so the centre
is the point where they cross.

This works even when the drawn arc is only part of a circle, which is why it is the
surveyor's method as well as the mason's.

## Worked examples

**Example 1.** A circle has radius $13$ cm. A chord is $24$ cm long. Find the distance
from the centre to the chord.

The half-chord is $24 \div 2 = 12$ cm. Use the right-angled triangle:

$$d^2 + 12^2 = 13^2$$

$$d^2 + 144 = 169$$

$$d^2 = 25$$

$$d = 5 \text{ cm}.$$

The distance is $5$ cm. The distance is a length, so the positive square root is the one
we need.

**Example 2.** A chord of length $48$ cm lies $7$ cm from the centre. Find the radius.

The half-chord is $24$ cm.

$$r^2 = 7^2 + 24^2 = 49 + 576 = 625$$

$$r = 25 \text{ cm}.$$

**Example 3.** Two chords of a circle are drawn. Explain how to find the centre, using
only a straight edge and compass.

Construct the perpendicular bisector of the first chord. Construct the perpendicular
bisector of the second chord. Each bisector passes through the centre, by part 2 of
Theorem 21, so their crossing point is the centre. The two chords must not be parallel,
or the two bisectors would be parallel and would not cross.

**Example 4.** Two chords of the same circle have the same length. Show that they are the
same distance from the centre.

Let the chords have length $c$, and let their distances from the centre be $d_1$ and
$d_2$. The radius $r$ is the same for both, so the right-angled triangle gives

$$d_1^2 + \left(\tfrac12 c\right)^2 = r^2 \quad\text{and}\quad d_2^2 + \left(\tfrac12 c\right)^2 = r^2.$$

Subtract the first equation from the second:

$$d_2^2 - d_1^2 = 0,$$

so $d_1^2 = d_2^2$. Both distances are positive, so $d_1 = d_2$. Equal chords are the same
distance from the centre. $\blacksquare$

> **Watch out.** The right-angled triangle uses **half** the chord, not the whole chord.
> A chord of $24$ cm gives a side of $12$ cm, and a student who uses $24$ finds
> $d^2 = 13^2 - 24^2$, which is negative and has no answer.
>
> **Re-check:** mark the midpoint of the chord on your diagram before you substitute.
> The side of the triangle runs from the centre to that midpoint, so it is half the
> chord.

## Progress check

Back to the chapter problem. The mason fixes a straight stone bar across the window. The
bar is a chord of the circle, and its length is $48$ cm. The window has radius $25$ cm.

Find the distance from the centre of the window to the bar. Then say how far the bar is
from the edge of the window at its nearest point, and explain how you found that.

Compare your answer with the prediction you made on the chapter opener. Which bar did you
predict would lie closer to the centre, the $40$ cm bar or the $48$ cm bar? Section 17.2
checks the other prediction.

## You should now be able to

- name the centre, the radius, the chord, the diameter, the arc and the semicircle;
- state both parts of Theorem 21, and prove the first part;
- use $d^2 + \left(\tfrac12 c\right)^2 = r^2$ to find any one of $d$, $c$ and $r$;
- find the centre of a circle from two chords;
- show that equal chords are the same distance from the centre.
