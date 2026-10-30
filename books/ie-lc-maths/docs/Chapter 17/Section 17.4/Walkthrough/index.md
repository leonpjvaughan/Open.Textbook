---
title: 17.4 Tangents to a circle — Learn
chapter: 17
chapter_title: 'Synthetic geometry: circles'
section: '17.4'
section_title: Tangents to a circle
tier: O
refs:
- '2.1'
kind: walkthrough
---

# 17.4 Tangents to a circle — Learn

**Prerequisites:** Section 17.1 — the radius and the chord; Section 15.3 — congruent
triangles; Section 16.5 — Pythagoras' theorem.

**Objectives:** use the tangent and the radius at the point of contact; use the converse
to test a tangent; find a tangent length from an external point.

By the end of this section you can test whether a straight line just touches a circle, and
you can find the length of a tangent from a point outside it.

## The tangent and the point of contact

A line and a circle can meet in zero, one or two points. A line that meets a circle at
exactly one point is a **tangent** to the circle, and that point is the **point of
contact**.

The tangent is the line that touches the circle without crossing it. A wheel on a road
gives the picture: the road is the tangent, and the point where the wheel meets the road
is the point of contact.

## Theorem 20: the tangent and the radius

> **Theorem 20.**
>
> 1. Each tangent is perpendicular to the radius drawn to the point of contact.
> 2. If $P$ lies on a circle, and a line through $P$ is perpendicular to the radius $OP$,
>    then the line is a tangent to the circle.

**Proof of part 1.** Let the line $l$ touch the circle with centre $O$ at the point $P$.
Suppose, for a contradiction, that $OP$ is **not** perpendicular to $l$.

Let $Q$ be the foot of the perpendicular from $O$ to $l$. Then $Q$ is not $P$. Choose the
point $R$ on $l$ on the other side of $Q$ from $P$, with $|QR| = |QP|$.

The triangles $OQP$ and $OQR$ both have a right angle at $Q$, the side $OQ$ is common, and
$|QP| = |QR|$. So they are congruent by SAS, and therefore
$$|OR| = |OP|.$$

The point $P$ is on the circle, so $|OP|$ is the radius, and $R$ is on the circle too. The
point $R$ is on $l$ and is different from $P$, so $l$ meets the circle at two points. That
contradicts the definition of a tangent. Therefore $OP$ **is** perpendicular to $l$.
$\blacksquare$

**Proof of part 2.** Let $P$ be a point of the circle, and let $l$ be a line through $P$
perpendicular to $OP$. Let $Q$ be any other point of $l$.

The triangle $OPQ$ has a right angle at $P$, so Pythagoras' theorem gives
$$|OQ|^2 = |OP|^2 + |PQ|^2.$$

The length $|PQ|$ is not zero, because $Q$ is not $P$, so $|OQ|^2 > |OP|^2$ and
$$|OQ| > |OP|.$$

The point $Q$ is further from $O$ than the radius, so it is not on the circle. Every point
of $l$ other than $P$ is like $Q$, so $P$ is the only point of $l$ on the circle. That
makes $l$ a tangent. $\blacksquare$

## Two tangents from an external point

> **Equal tangents.** The two tangents from a point outside a circle are equal in length.

**Proof.** Let $T$ be a point outside a circle with centre $O$, and let the tangents from
$T$ touch the circle at $U$ and at $V$.

By part 1 of Theorem 20, $OU$ is perpendicular to $TU$, and $OV$ is perpendicular to $TV$.
So the triangles $OUT$ and $OVT$ both have a right angle, at $U$ and at $V$.

The two radii are equal, $|OU| = |OV|$, and the side $OT$ is common. Two right-angled
triangles with the hypotenuse and one other side equal are congruent, so
$$|TU| = |TV|. \qquad \blacksquare$$

The same congruence gives $|\angle UTO| = |\angle OTV|$, so the line $OT$ bisects the angle
between the two tangents.

## Worked examples

**Example 1.** A circle has radius $5$ cm. A point $T$ is $13$ cm from the centre. Find the
length of the tangent from $T$ to the circle.

The radius to the point of contact is perpendicular to the tangent, so the triangle has a
right angle. Pythagoras gives
$$|TU|^2 + 5^2 = 13^2$$

$$|TU|^2 = 169 - 25 = 144$$

$$|TU| = 12 \text{ cm}.$$

**Example 2.** A tangent from $T$ to a circle has length $24$ cm. The radius is $7$ cm.
Find the distance from $T$ to the centre.

The radius, the tangent and the line to the centre make a right-angled triangle with the
line to the centre as hypotenuse:
$$|OT|^2 = 7^2 + 24^2 = 49 + 576 = 625$$

$$|OT| = 25 \text{ cm}.$$

**Example 3.** The two tangents from $T$ touch a circle at $U$ and at $V$, and
$|\angle UTV| = 70^\circ$. Find $|\angle OTV|$.

The line $OT$ bisects the angle between the two tangents:
$$|\angle OTV| = 70^\circ \div 2 = 35^\circ.$$

**Example 4.** A line is $8$ cm from the centre of a circle of radius $8$ cm. Is the line a
tangent?

The distance from the centre to the line equals the radius. So the line touches the circle
at exactly one point, and it is a tangent. If the distance were less than $8$ cm, the line
would cross the circle at two points. If it were more than $8$ cm, the line would miss the
circle.

> **Watch out.** The right angle is at the **point of contact**, between the radius and
> the tangent. It is not at the external point $T$. A student who puts the right angle at
> $T$ writes $|OT|^2 + |TU|^2 = r^2$, which cannot be right because $|OT|$ is longer than
> the radius.
>
> **Re-check:** mark the point of contact, draw the radius to it, and put the right-angle
> square there. The hypotenuse is then the line from the centre to the external point.

## Progress check

Back to the chapter problem. The mason braces the window with a support rod. The rod is
fixed to the frame at a point $T$ outside the circle, and it touches the rim of the window
at $U$. The centre of the window is $O$, the radius is $25$ cm, and $|OT| = 65$ cm.

1. Find $|TU|$, the length of the rod from $T$ to the rim.
2. State the angle between the rod and the radius $OU$, and give a reason.
3. The mason fixes a second rod from the same point $T$ on the other side of the window.
   What is its length? Give a reason.

## You should now be able to

- say what a tangent and a point of contact are;
- state both parts of Theorem 20, and prove the first part by contradiction;
- use the right angle at the point of contact with Pythagoras;
- find a tangent length, a radius or a distance from the centre;
- use the fact that the two tangents from an external point are equal.
