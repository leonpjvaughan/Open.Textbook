---
title: 7.4 Conical pendulum and banked tracks — Practise with help
chapter: 7
chapter_title: Circular motion and oscillation
section: '7.4'
section_title: Conical pendulum and banked tracks
tier: H
refs:
- S3
kind: guided-problems
---

# 7.4 Conical pendulum and banked tracks — Practise with help

## Warm-up: remember

1. Work out $1.5 \times \sin 30^\circ$.
2. Find $\theta$ when $\tan\theta = 0.5$, giving your answer to one decimal place.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $0.75$. The sine of $30^\circ$ is $0.5$, and the horizontal radius of a conical
   pendulum is $L\sin\theta$.
2. $\theta = \arctan 0.5 \approx 26.6^\circ$. The tangent of the angle is the
   ratio $\dfrac{v^2}{gr}$.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A conical pendulum has a string of length $2$ m making an angle of
$60^\circ$ with the vertical. Find the radius of the circle and the speed of the
bob.

<details markdown="1">
<summary>Hint</summary>

Find the radius from $r = L\sin\theta$, then use $v = \sqrt{gr\tan\theta}$.

<details markdown="1">
<summary>Next step</summary>

$$r = 2\sin 60^\circ = 2 \times \frac{\sqrt{3}}{2} = \sqrt{3} \approx 1.73\ \text{m}$$

<details markdown="1">
<summary>Full working</summary>

$$v = \sqrt{gr\tan\theta}
= \sqrt{9.8 \times \sqrt{3} \times \sqrt{3}} = \sqrt{9.8 \times 3}
= \sqrt{29.4} \approx 5.42\ \text{m/s}$$

The radius times the tangent simplifies, because
$r\tan\theta = L\sin\theta\tan\theta = L\sin\theta \times \dfrac{\sin\theta}{\cos\theta}$.
Here $\sin 60^\circ = \tan 60^\circ$, so the product is $3$.

</details>
</details>
</details>

**2.** For the pendulum in Question 1, find the period of the circular motion.

<details markdown="1">
<summary>Hint</summary>

Use $T_p = 2\pi\sqrt{\dfrac{L\cos\theta}{g}}$.

<details markdown="1">
<summary>Next step</summary>

$$T_p = 2\pi\sqrt{\frac{2 \times \cos 60^\circ}{9.8}}$$

<details markdown="1">
<summary>Full working</summary>

$$T_p = 2\pi\sqrt{\frac{2 \times 0.5}{9.8}} = 2\pi\sqrt{0.1020}
\approx 2.01\ \text{s}$$

The period does not depend on the mass of the bob. A heavier bob needs a larger
tension, but the tension and the mass cancel in the same way.

</details>
</details>
</details>

**3.** A bend of radius $200$ m is banked at $10^\circ$. Find the design speed,
the speed at which no friction is needed. Give your answer to three significant
figures.

<details markdown="1">
<summary>Hint</summary>

Use $v = \sqrt{gr\tan\theta}$.

<details markdown="1">
<summary>Next step</summary>

$$v = \sqrt{9.8 \times 200 \times \tan 10^\circ}$$

<details markdown="1">
<summary>Full working</summary>

$$v = \sqrt{9.8 \times 200 \times 0.1763} = \sqrt{345.6}
\approx 18.6\ \text{m/s}$$

At this speed the normal reaction alone supplies the centripetal force, so no
friction is needed and the car can take the bend on ice.

</details>
</details>
</details>

**4.** A bend of radius $80$ m is to be taken at $20$ m/s with no friction. Find
the angle of the bank, giving your answer to one decimal place.

<details markdown="1">
<summary>Hint</summary>

Use $\tan\theta = \dfrac{v^2}{gr}$.

<details markdown="1">
<summary>Next step</summary>

$$\tan\theta = \frac{20^2}{9.8 \times 80} = \frac{400}{784}$$

<details markdown="1">
<summary>Full working</summary>

$$\tan\theta = 0.5102, \qquad \theta = \arctan 0.5102 \approx 27.0^\circ$$

The bank is steeper than the chapter-problem bend, because the speed is higher
for the same radius.

</details>
</details>
</details>

**5.** A car of mass $1000$ kg is on a track banked at $12^\circ$. Find the
normal reaction on the car. Give your answer to three significant figures.

<details markdown="1">
<summary>Hint</summary>

On a banked track the normal reaction is $N = \dfrac{mg}{\cos\theta}$.

<details markdown="1">
<summary>Next step</summary>

$$N = \frac{1000 \times 9.8}{\cos 12^\circ} = \frac{9800}{0.9781}$$

<details markdown="1">
<summary>Full working</summary>

$$N \approx 10019\ \text{N}$$

The reaction is larger than the weight of $9800$ N, because it does two jobs. It
balances the weight and it also turns the car. The vertical component is
$N\cos\theta = 9800$ N, which equals the weight.

</details>
</details>
</details>

**6.** A conical pendulum has a bob of mass $0.5$ kg, and the string makes an
angle of $40^\circ$ with the vertical. Find the tension in the string. Give your
answer to three significant figures.

<details markdown="1">
<summary>Hint</summary>

There is no vertical acceleration, so the vertical component of the tension
balances the weight.

<details markdown="1">
<summary>Next step</summary>

$$T\cos\theta = mg, \qquad T = \frac{mg}{\cos\theta}$$

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{0.5 \times 9.8}{\cos 40^\circ} = \frac{4.9}{0.7660}
\approx 6.40\ \text{N}$$

The tension is larger than the weight, because its horizontal component also
supplies the centripetal force.

</details>
</details>
</details>

**7.** Explain why a banked track needs no friction at the design speed, and say
which way friction acts when the car travels faster than the design speed.

<details markdown="1">
<summary>Hint</summary>

Resolve the normal reaction into a vertical component and a horizontal
component.

<details markdown="1">
<summary>Next step</summary>

The vertical component $N\cos\theta$ balances the weight, and the horizontal
component $N\sin\theta$ points towards the centre.

<details markdown="1">
<summary>Full working</summary>

On a banked track the normal reaction is perpendicular to the surface, so it is
tilted towards the centre of the bend. Its vertical component balances the
weight, and its horizontal component points towards the centre and can supply
the whole centripetal force. At the design speed these two components supply
exactly the right force, so friction is not needed. Above the design speed the
car needs a larger centripetal force than the bank alone gives, so friction acts
down the slope, towards the centre. Below the design speed the car needs less,
and friction acts up the slope, away from the centre.

</details>
</details>
</details>

## A question from Chapter 4

**8.** A block of mass $5$ kg rests on a smooth plane inclined at $30^\circ$ to
the horizontal. Find the component of its weight down the plane and the normal
reaction.

<details markdown="1">
<summary>Hint</summary>

Resolve the weight along the plane and perpendicular to it.

<details markdown="1">
<summary>Next step</summary>

$$\text{down the plane} = mg\sin 30^\circ, \qquad R = mg\cos 30^\circ$$

<details markdown="1">
<summary>Full working</summary>

$$\text{down the plane} = 5 \times 9.8 \times 0.5 = 24.5\ \text{N}$$

$$R = 5 \times 9.8 \times \frac{\sqrt{3}}{2} \approx 42.4\ \text{N}$$

This is a Chapter 4 question about resolving on a slope. This section uses the
same skill with a new direction: the components are vertical and towards the
centre of the circle, rather than along and perpendicular to a slope.

</details>
</details>
</details>
