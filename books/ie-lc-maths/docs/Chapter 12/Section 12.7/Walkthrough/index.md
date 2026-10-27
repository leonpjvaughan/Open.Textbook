---
title: 12.7 Area of a triangle — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.7'
section_title: Area of a triangle
tier: O
refs:
- '2.3'
kind: walkthrough
---

# 12.7 Area of a triangle — Learn

**Prerequisites:** Section 12.1 — the sine ratio; Section 12.6 — the sine and cosine
rules.

**Objectives:** find the area of a triangle from two sides and the angle between them;
use Heron's formula from three sides; find the area of a parallelogram.

By the end of this section you can find the area of a triangle whether you are given two
sides and an angle or all three sides.

## The formula

The area of a triangle is $\tfrac12 \times \text{base} \times \text{height}$. The height
is not always given, but trigonometry can find it.

> **The area of a triangle.** $$A = \tfrac12 ab\sin C$$
> where $A$ is the area, $a$ and $b$ are two sides and $C$ is the angle **between** them.
> The Formulae and Tables booklet gives this formula.

**Why it is true.** Take the side $c$ as the base and drop a perpendicular from $C$ to the
base, of length $h$. In the right triangle on the $A$ side, $\sin A = \dfrac{h}{b}$, so
$h = b\sin A$. The area is

$$\tfrac12 \times \text{base} \times \text{height} = \tfrac12 c (b\sin A) = \tfrac12 bc\sin A$$

The same argument from another vertex gives $\tfrac12 ab\sin C$. All three forms are the
same formula with the letters moved round.

**Example 1.** A triangle has $a = 8$ cm, $b = 11$ cm and $C = 35^\circ$. Find its area.

$$A = \tfrac12 \times 8 \times 11 \times \sin 35^\circ = 44 \times 0.5736 = 25.24 \text{ cm}^2$$

**Example 2.** An equilateral triangle has side $6$ cm. Find its area, leaving the answer
as a surd.

All three angles are $60^\circ$, so use two sides and the angle between them.

$$A = \tfrac12 \times 6 \times 6 \times \sin 60^\circ = 18 \times \frac{\sqrt{3}}{2} = 9\sqrt{3} \text{ cm}^2$$

## Heron's formula

When you know all three sides and no angle, the booklet gives **Heron's formula**.

> **Heron's formula.** Let $s = \dfrac{a + b + c}{2}$, the semi-perimeter. Then
> $$A = \sqrt{s(s-a)(s-b)(s-c)}$$

**Example 3.** A triangle has sides $5$ cm, $7$ cm and $9$ cm. Find its area, correct to
two decimal places.

The semi-perimeter is $s = \dfrac{5 + 7 + 9}{2} = 10.5$.

$$A = \sqrt{10.5 \times 5.5 \times 3.5 \times 1.5} = \sqrt{303.1875} = 17.41 \text{ cm}^2$$

## The area of a parallelogram

A parallelogram is two copies of a triangle, so its area is twice $\tfrac12 ab\sin C$.

> **The area of a parallelogram.** $$A = ab\sin C$$
> where $a$ and $b$ are two adjacent sides and $C$ is the angle between them.

**Example 4.** A parallelogram has sides $6$ cm and $9$ cm, and the angle between them is
$50^\circ$. Find its area.

$$A = 6 \times 9 \times \sin 50^\circ = 54 \times 0.7660 = 41.37 \text{ cm}^2$$

## Which formula?

| You know | Use |
|---|---|
| two sides and the angle between them | $A = \tfrac12 ab\sin C$ |
| three sides | Heron's formula |
| a base and its perpendicular height | $A = \tfrac12 \times \text{base} \times \text{height}$ |

> **Watch out.** The angle in $\tfrac12 ab\sin C$ must be the angle **between** the two
> sides you use. Choosing a different angle gives the wrong area, and the error is common
> because the formula has no picture in it.
>
> **Re-check:** name the two sides, then point to the corner where they meet. That corner
> is the angle you need.

The formula also works when the angle is obtuse, because the sine of an angle between
$0^\circ$ and $180^\circ$ is never negative.

## Progress check

Back to the chapter problem. The rescue team needs the **search area** — the triangle
$CLY$ of sea the yacht could be in.

You know $CL = 8$ km, $LY = 5.47$ km and the angle between them at the lighthouse,
$\angle CLY = 60^\circ$. Find the area of the triangle, correct to three significant
figures.

$$A = \tfrac12 \times 8 \times 5.47 \times \sin 60^\circ$$

Then find it again with the other pair, $CL = 8$ km and $CY = 7.08$ km, and the angle at
the station, $42^\circ$. The two answers must agree, and agreeing is the check that the
triangle is consistent.

## You should now be able to

- derive and use $A = \tfrac12 ab\sin C$;
- choose the angle between the two sides you use;
- use Heron's formula when you know three sides;
- find the area of a parallelogram;
- choose the area formula from the information given.
