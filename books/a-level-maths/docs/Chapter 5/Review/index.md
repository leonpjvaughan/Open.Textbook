---
title: 'Chapter 5: Review'
chapter: 5
kind: review
---

# Chapter 5: Review

## The chapter problem, solved

A coastguard station $S$ and a lighthouse $L$ stand $10$ km apart. A beacon $B$
is at sea, with angle $30^\circ$ at $S$ and angle $105^\circ$ at $L$. The
harbour at $S$ is a sector of radius $4$ km and angle $0.9$ radians. The tide
height is $h = 12\cos\theta + 5\sin\theta$ metres.

**Step 1. Find the angle at the beacon.** The angles of a triangle add to
$180^\circ$, so

$$
\angle B = 180^\circ - 30^\circ - 105^\circ = 45^\circ.
$$

**Step 2. Find the two distances with the sine rule.** The side $LB$ is opposite
the $30^\circ$ angle and $SL = 10$ km is opposite the $45^\circ$ angle:

$$
\frac{LB}{\sin 30^\circ} = \frac{10}{\sin 45^\circ},
\qquad
LB = \frac{10 \times \frac{1}{2}}{\frac{\sqrt{2}}{2}} = 5\sqrt{2} \approx 7.07 \text{ km}.
$$

The side $SB$ is opposite the $105^\circ$ angle. In Section 5.8 you proved that
$\sin 105^\circ = \dfrac{\sqrt{6} + \sqrt{2}}{4}$. Therefore

$$
SB = \frac{10\sin 105^\circ}{\sin 45^\circ}
= 10 \times \frac{\sqrt{6} + \sqrt{2}}{4} \times \frac{2}{\sqrt{2}}
= 5(\sqrt{3} + 1) \approx 13.7 \text{ km}.
$$

The beacon is about $7.07$ km from the lighthouse and about $13.7$ km from the
station.

**Step 3. Find the area of the triangle.** Use two sides and the included
angle at $S$:

$$
\text{area} = \tfrac{1}{2} \times 10 \times 5(\sqrt{3} + 1) \times \sin 30^\circ
= \tfrac{1}{2} \times 10 \times 5(\sqrt{3} + 1) \times \tfrac{1}{2}
= \frac{25(\sqrt{3} + 1)}{2} \approx 34.2 \text{ km}^2.
$$

**Step 4. Find the harbour measurements.** The sector angle is $\theta = 0.9$
radians and its radius is $r = 4$ km, so

$$
\text{arc} = r\theta = 4 \times 0.9 = 3.6 \text{ km},
$$

$$
\text{area} = \tfrac{1}{2}r^2\theta = \tfrac{1}{2} \times 16 \times 0.9 = 7.2 \text{ km}^2.
$$

The curved sea wall is $3.6$ km long and the harbour holds $7.2$ km$^2$ of
water.

**Step 5. Rewrite the tide model as one wave.** Here $a = 12$ and $b = 5$, so

$$
R = \sqrt{12^2 + 5^2} = 13,
\qquad
\tan\alpha = \frac{5}{12},
\qquad
\alpha \approx 0.395 \text{ radians}.
$$

Both coefficients are positive, so the shift $\alpha$ is acute and

$$
h = 13\cos(\theta - 0.395).
$$

The greatest height is $R = 13$ m. The water is never $17$ m high, because the
two terms do not peak together.

**Step 6. Find when the gate closes.** The gate closes when $h = 10$:

$$
13\cos(\theta - 0.395) = 10,
\qquad
\cos(\theta - 0.395) = \frac{10}{13} \approx 0.7692.
$$

The principal value is $\cos^{-1}(0.7692) \approx 0.693$ radians, and cosine
takes the same value with the opposite sign of the angle. So

$$
\theta - 0.395 \approx 0.693
\quad \text{or} \quad
\theta - 0.395 \approx -0.693.
$$

$$
\theta \approx 1.088
\quad \text{or} \quad
\theta \approx -0.298.
$$

The tide turns through a full circle of $2\pi$ radians every $12$ hours, so the
time in hours is $t = \dfrac{12\theta}{2\pi} = \dfrac{6\theta}{\pi}$.

$$
t \approx \frac{6 \times 1.088}{\pi} \approx 2.08 \text{ h}.
$$

The second angle is negative, so add $2\pi$: $\theta \approx 5.985$, giving

$$
t \approx \frac{6 \times 5.985}{\pi} \approx 11.4 \text{ h}.
$$

**The chapter's answer.** The beacon is about $7.07$ km from the lighthouse and
about $13.7$ km from the station, and the triangle has area about
$34.2$ km$^2$. The harbour sea wall is $3.6$ km long and the water covers
$7.2$ km$^2$. The tide reaches a greatest height of $13$ m and passes $10$ m at
about $2.08$ hours and again at about $11.4$ hours.

## Mixed practice — choose the method first

For each question, say which method you will use and why before you calculate.
The items mix this chapter with Chapters 1, 2 and 3, so the choice is not always
obvious.

:::problems chapter-05-review

:::answers chapter-05-review

## What you can now do

- use the sine rule, the cosine rule and the area formula on any triangle;
- measure angles in radians, and find arc lengths and sector areas;
- sketch and read the sine, cosine and tangent graphs, with their periods;
- state the exact values of the trigonometric functions at the special angles;
- use small-angle approximations and say when they are accurate enough;
- use secant, cosecant and cotangent, and the inverse functions;
- prove identities with the basic, addition and double-angle formulae;
- write a sum of a cosine and a sine as a single wave;
- solve trigonometric equations in an interval without losing solutions;
- resolve vectors and forces, and find a resultant with the sine and cosine
  rules.

## Your relevance reflection

Return to the prompt in the chapter opener: *something that repeats or turns in
your own life*. Write down the repeating quantity again. Now add three things
you could not have said before this chapter: how to write its largest and
smallest values, how to model it with a single wave, and how to find when it
reaches a chosen level. Finish with one sentence about a quantity you would
measure from now on to check a repeating pattern.
