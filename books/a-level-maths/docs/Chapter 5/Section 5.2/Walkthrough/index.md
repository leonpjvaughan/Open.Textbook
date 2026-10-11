---
title: 5.2 Radian measure, arc length and sector area — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.2'
section_title: Radian measure, arc length and sector area
dfe:
- E1
kind: walkthrough
---

# 5.2 Radian measure, arc length and sector area — Learn

**Prerequisites:** the circumference and the area of a circle; the angle at the
centre of a circle; rearranging a formula; exact values of fractions of a turn.

**By the end of this section you can:** explain what a radian measures; convert
between radians and degrees; find the length of an arc and the area of a sector;
find the area of a segment.

## 1. What a radian is

A **radian** is the angle at the centre of a circle that cuts off an arc equal in
length to the radius.

Picture a piece of string as long as the radius, laid along the rim of the
circle. The angle between its two ends, measured at the centre, is one radian.

The whole circumference is $2\pi$ radii long, so a full turn is $2\pi$ radians.
A half turn is $\pi$ radians. Therefore

$$
\pi \text{ radians} = 180^\circ.
$$

To change degrees into radians, multiply by $\dfrac{\pi}{180}$. To change radians
into degrees, multiply by $\dfrac{180}{\pi}$.

**Example 1.** Change $150^\circ$ into radians.

$$
150 \times \frac{\pi}{180} = \frac{150\pi}{180} = \frac{5\pi}{6}.
$$

**Example 2.** Change $2.4$ radians into degrees, to one decimal place.

$$
2.4 \times \frac{180}{\pi} \approx 137.5^\circ.
$$

## 2. Arc length

When the angle is measured in radians, the length of the arc is simple. Let
$\theta$ be the angle at the centre and $r$ the radius. Then

$$
l = r\theta.
$$

The formula works because a full turn of $2\pi$ radians gives the circumference
$2\pi r$.

**Example 3.** A circle has radius $6$ cm. Find the length of the arc that
subtends an angle of $1.5$ radians at the centre.

$$
l = r\theta = 6 \times 1.5 = 9 \text{ cm}.
$$

If you change the angle into degrees first, you have to convert back, which adds
work and rounding. Keep the angle in radians for the arc.

## 3. Sector area

A **sector** is the region bounded by two radii and an arc, like a slice of a
circle. Its area is

$$
A = \tfrac{1}{2}r^2\theta.
$$

The whole circle of $2\pi$ radians has area $\pi r^2$, so the fraction
$\dfrac{\theta}{2\pi}$ of it is $\tfrac{1}{2}r^2\theta$.

**Example 4.** Find the area of the sector with radius $6$ cm and angle
$1.5$ radians.

$$
A = \tfrac{1}{2} \times 6^2 \times 1.5 = \tfrac{1}{2} \times 36 \times 1.5 = 27 \text{ cm}^2.
$$

A **segment** is the region between a chord and the arc. The area of a segment is
the area of the sector minus the area of the triangle formed by the two radii and
the chord:

$$
\text{segment} = \tfrac{1}{2}r^2\theta - \tfrac{1}{2}r^2\sin\theta.
$$

**Example 5.** Find the area of the segment cut off by an arc of radius $4$ cm
and angle $\dfrac{\pi}{3}$ radians.

$$
\text{sector} = \tfrac{1}{2} \times 4^2 \times \frac{\pi}{3} = \frac{8\pi}{3}.
$$

$$
\text{triangle} = \tfrac{1}{2} \times 4^2 \times \sin\frac{\pi}{3} = 8 \times \frac{\sqrt{3}}{2} = 4\sqrt{3}.
$$

$$
\text{segment} = \frac{8\pi}{3} - 4\sqrt{3} \approx 8.38 - 6.93 = 1.45 \text{ cm}^2.
$$

## 4. Try it: the unit circle and the arc

**Predict first.** On a unit circle the radius is $1$. Predict the length of the
arc when the angle is $1$ radian, when it is $\pi$ radians, and when it is a full
turn. Write your three predictions down before you touch the slider.

:::figure ch5-unit-circle

**Test.** Move the slider through a full turn. Watch the arc grow along the rim
and compare its length with the radius. Check your three predictions.

**Explain.** The readout gives the arc length and the angle in radians. Write a
sentence that explains why the arc length and the number of radians are the same
number on a unit circle. Then say what changes when the radius is $5$ instead
of $1$.

> **Watch out.** Two mistakes are common with radians.
>
> **Mixing degrees and radians.** The formulas $l = r\theta$ and
> $A = \tfrac{1}{2}r^2\theta$ hold only when $\theta$ is in radians. If your
> calculator is in degree mode, convert the angle first. A quick check: a full
> turn must give $\theta = 2\pi \approx 6.28$, never $360$.
>
> **Confusing a sector with a segment.** A sector is the whole slice, bounded by
> two radii and an arc. A segment is the smaller piece cut off by a chord. The
> segment is the sector minus a triangle. Read the diagram and ask which region
> is shaded. **Re-check:** for a sector, the area must be a fraction of $\pi r^2$
> between $0$ and the full circle, and the arc must be shorter than $2\pi r$.

## Progress check

Return to the chapter problem. The harbour at $S$ is a sector of radius $4$ km
with angle $0.9$ radians.

1. Find the length of the curved sea wall.
2. Find the area of water inside the harbour.
3. The harbourmaster claims the area is about $72$ km$^2$. Is the claim
   reasonable? Give a reason.

## You should now be able to

- explain a radian as the angle whose arc equals the radius;
- convert between radians and degrees;
- use $l = r\theta$ for an arc;
- use $A = \tfrac{1}{2}r^2\theta$ for a sector;
- find the area of a segment as a sector minus a triangle;
- refuse to use the arc and sector formulas with an angle in degrees.
