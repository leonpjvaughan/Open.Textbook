---
title: 7.6 Simple harmonic motion — Practise with help
chapter: 7
chapter_title: Circular motion and oscillation
section: '7.6'
section_title: Simple harmonic motion
tier: H
refs:
- S3
kind: guided-problems
---

# 7.6 Simple harmonic motion — Practise with help

## Warm-up: remember

1. Work out $\sqrt{100}$.
2. Differentiate $y = 3\cos 2t$ with respect to $t$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $10$. This is the shape of $\omega = \sqrt{\dfrac{k}{m}}$ when the ratio is a
   perfect square.
2. $\dfrac{dy}{dt} = -6\sin 2t$. The derivative of $\cos$ is $-\sin$, and the
   chain rule multiplies by the $2$ inside.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A mass of $0.2$ kg is attached to a spring of stiffness $5$ N/m. Find the
angular frequency and the period.

<details markdown="1">
<summary>Hint</summary>

Use $\omega = \sqrt{\dfrac{k}{m}}$, then $T = \dfrac{2\pi}{\omega}$.

<details markdown="1">
<summary>Next step</summary>

$$\omega = \sqrt{\frac{5}{0.2}} = \sqrt{25}$$

<details markdown="1">
<summary>Full working</summary>

$$\omega = 5\ \text{rad/s}, \qquad T = \frac{2\pi}{5} \approx 1.26\ \text{s}$$

The period does not depend on the amplitude, only on the mass and the stiffness.

</details>
</details>
</details>

**2.** A mass of $2$ kg is attached to a spring of stiffness $32$ N/m. Find the
period.

<details markdown="1">
<summary>Hint</summary>

Find $\omega$ first.

<details markdown="1">
<summary>Next step</summary>

$$\omega = \sqrt{\frac{32}{2}} = \sqrt{16} = 4\ \text{rad/s}$$

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{2\pi}{4} = \frac{\pi}{2} \approx 1.57\ \text{s}$$

Four times the mass with the same spring gives twice the period, because the
period depends on the square root of the mass.

</details>
</details>
</details>

**3.** A body moves with simple harmonic motion of amplitude $0.05$ m and angular
frequency $6$ rad/s. Find its maximum speed and its maximum acceleration.

<details markdown="1">
<summary>Hint</summary>

Use $v_{\max} = A\omega$ and $a_{\max} = A\omega^2$.

<details markdown="1">
<summary>Next step</summary>

$$v_{\max} = 0.05 \times 6, \qquad a_{\max} = 0.05 \times 6^2$$

<details markdown="1">
<summary>Full working</summary>

$$v_{\max} = 0.3\ \text{m/s}, \qquad a_{\max} = 0.05 \times 36
= 1.8\ \text{m/s}^2$$

The speed is greatest at the centre and the acceleration is greatest at the
extremes.

</details>
</details>
</details>

**4.** A mass of $0.1$ kg is attached to a spring of stiffness $40$ N/m and set
oscillating with amplitude $0.02$ m. Find the maximum speed and the maximum
acceleration.

<details markdown="1">
<summary>Hint</summary>

Find $\omega$ from the mass and the stiffness, then use $A\omega$ and
$A\omega^2$.

<details markdown="1">
<summary>Next step</summary>

$$\omega = \sqrt{\frac{40}{0.1}} = \sqrt{400} = 20\ \text{rad/s}$$

<details markdown="1">
<summary>Full working</summary>

$$v_{\max} = 0.02 \times 20 = 0.4\ \text{m/s}$$

$$a_{\max} = 0.02 \times 20^2 = 0.02 \times 400 = 8\ \text{m/s}^2$$

The maximum acceleration is $8$ m/s², which is less than $g$, so the mass stays
on its support during the motion.

</details>
</details>
</details>

**5.** A mass of $0.5$ kg oscillates on a spring with period $0.4$ s. Find the
stiffness of the spring, leaving your answer in terms of $\pi$.

<details markdown="1">
<summary>Hint</summary>

Find $\omega$ from the period, then use $k = m\omega^2$.

<details markdown="1">
<summary>Next step</summary>

$$\omega = \frac{2\pi}{T} = \frac{2\pi}{0.4} = 5\pi\ \text{rad/s}$$

<details markdown="1">
<summary>Full working</summary>

$$k = m\omega^2 = 0.5 \times (5\pi)^2 = 0.5 \times 25\pi^2 = 12.5\pi^2
\approx 123.4\ \text{N/m}$$

The stiffness must be large, because the mass completes a full oscillation five
times each second.

</details>
</details>
</details>

**6.** A body moves so that its displacement is $x = A\cos\omega t$. Show by
differentiating twice that its acceleration is $-\omega^2 x$.

<details markdown="1">
<summary>Hint</summary>

Differentiate once for the speed, then again for the acceleration.

<details markdown="1">
<summary>Next step</summary>

$$v = \frac{dx}{dt} = -A\omega\sin\omega t$$

<details markdown="1">
<summary>Full working</summary>

$$a = \frac{dv}{dt} = -A\omega^2\cos\omega t = -\omega^2(A\cos\omega t)
= -\omega^2 x$$

So the displacement $x = A\cos\omega t$ describes simple harmonic motion. The
acceleration is proportional to the displacement and points the opposite way.

</details>
</details>
</details>

**7.** The chapter-problem car of mass $1200$ kg rests on springs of total
stiffness $120000$ N/m. Find the angular frequency and the period of its bounce,
giving the period to three significant figures.

<details markdown="1">
<summary>Hint</summary>

Use $\omega = \sqrt{\dfrac{k}{m}}$, then $T = \dfrac{2\pi}{\omega}$.

<details markdown="1">
<summary>Next step</summary>

$$\omega = \sqrt{\frac{120000}{1200}} = \sqrt{100}$$

<details markdown="1">
<summary>Full working</summary>

$$\omega = 10\ \text{rad/s}, \qquad T = \frac{2\pi}{10}
= \frac{\pi}{5} \approx 0.628\ \text{s}$$

The car bounces about five times in three seconds. The period is the same
whatever the size of the bump, because the amplitude does not appear in the
formula.

</details>
</details>
</details>

## A question from Chapter 3

**8.** A particle moves in a straight line so that its displacement after $t$
seconds is $s = 3t^2$ metres. Find its velocity after $2$ seconds.

<details markdown="1">
<summary>Hint</summary>

Velocity is the derivative of displacement.

<details markdown="1">
<summary>Next step</summary>

$$v = \frac{ds}{dt} = 6t$$

<details markdown="1">
<summary>Full working</summary>

$$v = 6 \times 2 = 12\ \text{m/s}$$

This is a Chapter 3 question about differentiation, and it is the same tool this
section uses. For simple harmonic motion the displacement is a cosine, and
differentiating it twice turns the displacement into the acceleration
$-\omega^2 x$.

</details>
</details>
</details>
