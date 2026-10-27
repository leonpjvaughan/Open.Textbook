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

1. Work out the exact value of $\tan\dfrac{4\pi}{3}$.

2. A triangle has sides $7$ cm, $8$ cm and $11$ cm. Find the largest angle.

3. A sector has radius $6$ cm and angle $1.4$ radians. Find the arc length and
   the sector area.

4. Prove that $\dfrac{\cos\theta}{1 - \sin\theta} \equiv
   \dfrac{1 + \sin\theta}{\cos\theta}$ for $\cos\theta \neq 0$.

5. Write $8\cos\theta - 6\sin\theta$ in the form
   $R\cos(\theta - \alpha)$, and state its greatest value.

6. Solve $4\sin\theta = 3$ for $0 \le \theta < 2\pi$, giving answers in radians
   to three decimal places.

7. Expand $(2x - 3)^3$.

8. Find the equation of the line through $(3, -1)$ perpendicular to
   $y = 2x + 5$.

9. Show that the sum of two odd numbers is even.

10. Find where the curve $y = x^2 - 4x + 3$ crosses the $x$-axis.

11. A wave is modelled by $y = 6\sin(3t) + 1$. State its amplitude, period and
    range.

12. A force of $30$ N acts at $55^\circ$ above the horizontal. Find its two
    perpendicular components, to three significant figures.

<details markdown="1">
<summary>Answers</summary>

1. **Exact value, third quadrant.** $\dfrac{4\pi}{3}$ is $240^\circ$, where
   tangent is positive. The related acute angle is $\dfrac{\pi}{3}$, so
   $\tan\dfrac{4\pi}{3} = \tan\dfrac{\pi}{3} = \sqrt{3}$.

2. **Cosine rule, largest angle opposite the longest side.** The $11$ cm side
   faces the largest angle $C$:
   $\cos C = \dfrac{7^2 + 8^2 - 11^2}{2 \times 7 \times 8} = \dfrac{49 + 64 - 121}{112} = -\dfrac{8}{112} = -\dfrac{1}{14}$.
   So $C \approx 94.1^\circ$.

3. **Arc and sector formulas in radians.** Arc
   $= 6 \times 1.4 = 8.4$ cm. Area
   $= \tfrac{1}{2} \times 36 \times 1.4 = 25.2$ cm$^2$.

4. **Prove one side, using a common denominator.** Start on the left and
   multiply top and bottom by $1 + \sin\theta$:
   $\dfrac{\cos\theta(1 + \sin\theta)}{(1 - \sin\theta)(1 + \sin\theta)} =
   \dfrac{\cos\theta(1 + \sin\theta)}{1 - \sin^2\theta} =
   \dfrac{\cos\theta(1 + \sin\theta)}{\cos^2\theta} =
   \dfrac{1 + \sin\theta}{\cos\theta}$.

5. **Single-wave form.** $R = \sqrt{8^2 + 6^2} = 10$ and
   $\tan\alpha = \dfrac{-6}{8}$, so $\alpha \approx -0.644$. The wave is
   $10\cos(\theta + 0.644)$ and the greatest value is $10$.

6. **Solve for the principal value, then the second angle.**
   $\sin\theta = 0.75$, so the principal value is $0.848$ radians. The second
   solution is $\pi - 0.848 = 2.294$ radians.

7. **Binomial expansion.** $(2x - 3)^3 = 8x^3 - 3 \times 4x^2 \times 3 +
   3 \times 2x \times 9 - 27 = 8x^3 - 36x^2 + 54x - 27$.

8. **Perpendicular gradient, then a point.** The gradient of $y = 2x + 5$ is
   $2$, so the perpendicular gradient is $-\dfrac{1}{2}$. Then
   $y + 1 = -\dfrac{1}{2}(x - 3)$, which is $x + 2y - 1 = 0$.

9. **Deduce with a general letter.** Let the numbers be $2m + 1$ and $2n + 1$.
   Their sum is $2m + 2n + 2 = 2(m + n + 1)$, which has a factor $2$, so the
   sum is even.

10. **Factorise the quadratic.** $x^2 - 4x + 3 = (x - 1)(x - 3)$, so the curve
    crosses the $x$-axis at $(1, 0)$ and $(3, 0)$.

11. **Read the wave.** Amplitude $= 6$. Period $= \dfrac{2\pi}{3}$. The middle
    line is $y = 1$, so the range is $-5 \le y \le 7$.

12. **Resolve with cosine and sine.** Horizontal
    $= 30\cos 55^\circ \approx 17.2$ N. Vertical
    $= 30\sin 55^\circ \approx 24.6$ N.

</details>

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
