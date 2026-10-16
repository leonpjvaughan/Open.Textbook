---
title: 3.5 The fundamental theorem of calculus — Practise with help
chapter: 3
chapter_title: Describing motion
section: '3.5'
section_title: The fundamental theorem of calculus
tier: O
refs:
- S3
kind: guided-problems
---

# 3.5 The fundamental theorem of calculus — Practise with help

## Warm-up: remember

1. Differentiate $y = 3t^2 + 2t$.
2. Find $\displaystyle\int 6t\,dt$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{dy}{dt} = 6t + 2$. Integration runs this rule backwards, so this
   answer tells you what the integral of $6t + 2$ must be.
2. $\displaystyle\int 6t\,dt = 3t^2 + C$. Raise the power by one, then divide by
   the new power.

</details>

## Practise with help

**1.** Find $\displaystyle\int (6t + 2)\,dt$.

<details markdown="1">
<summary>Hint</summary>

Integrate each term on its own, and add the constant $C$.

<details markdown="1">
<summary>Next step</summary>

$$\int 6t\,dt + \int 2\,dt = 3t^2 + 2t + C$$

<details markdown="1">
<summary>Full working</summary>

$$\int (6t + 2)\,dt = 3t^2 + 2t + C$$

Differentiating $3t^2 + 2t$ gives $6t + 2$, which checks the answer.

</details>
</details>
</details>

**2.** A particle has velocity $v = 4t + 3$ m/s. Find its displacement between
$t = 1$ s and $t = 3$ s.

<details markdown="1">
<summary>Hint</summary>

The displacement is the definite integral of the velocity.

<details markdown="1">
<summary>Next step</summary>

An antiderivative is $2t^2 + 3t$. Substitute $t = 3$ and $t = 1$.

<details markdown="1">
<summary>Full working</summary>

$$\int_1^3 (4t + 3)\,dt = \left[2t^2 + 3t\right]_1^3$$

$$= (18 + 9) - (2 + 3) = 27 - 5 = 22\,\text{m}$$

The displacement is 22 m.

</details>
</details>
</details>

**3.** A particle has velocity $v = 12 - 3t$ m/s. Find its displacement between
$t = 0$ s and $t = 4$ s.

<details markdown="1">
<summary>Hint</summary>

Integrate, then substitute the upper limit first.

<details markdown="1">
<summary>Next step</summary>

$$\int_0^4 (12 - 3t)\,dt = \left[12t - \frac{3t^2}{2}\right]_0^4$$

<details markdown="1">
<summary>Full working</summary>

$$\left[12t - \frac{3t^2}{2}\right]_0^4 = (48 - 24) - 0 = 24\,\text{m}$$

The velocity stays positive on this interval, so the displacement and the
distance are the same.

</details>
</details>
</details>

**4.** A cyclist travels at a constant $7$ m/s for $5$ s. Find the displacement
by integrating the velocity.

<details markdown="1">
<summary>Hint</summary>

The velocity is the constant $7$. The integral of a constant is the constant
times $t$.

<details markdown="1">
<summary>Next step</summary>

$$\int_0^5 7\,dt = \left[7t\right]_0^5$$

<details markdown="1">
<summary>Full working</summary>

$$\int_0^5 7\,dt = 7 \times 5 - 0 = 35\,\text{m}$$

The area under a constant velocity–time graph is a rectangle, and the integral
gives the same answer.

</details>
</details>
</details>

**5.** A particle has velocity $v = 3t^2$ m/s. Find its displacement between
$t = 0$ s and $t = 4$ s.

<details markdown="1">
<summary>Hint</summary>

The antiderivative of $3t^2$ is $t^3$.

<details markdown="1">
<summary>Next step</summary>

$$\int_0^4 3t^2\,dt = \left[t^3\right]_0^4$$

<details markdown="1">
<summary>Full working</summary>

$$\int_0^4 3t^2\,dt = 64 - 0 = 64\,\text{m}$$

The displacement is 64 m.

</details>
</details>
</details>

**6.** A ball is thrown upwards with velocity $v = 10 - 9.8t$ m/s. Find the
positive time at which its displacement from the start returns to zero.

<details markdown="1">
<summary>Hint</summary>

Integrate to get the displacement as a function of $t$, then set it to zero.

<details markdown="1">
<summary>Next step</summary>

$$s = 10t - 4.9t^2, \qquad t(10 - 4.9t) = 0$$

<details markdown="1">
<summary>Full working</summary>

One root is $t = 0$, the start. The other is
$t = \dfrac{10}{4.9} = \dfrac{100}{49} = 2.04$ s, to three significant
figures. That is when the ball returns to the ground.

</details>
</details>
</details>

**7.** A particle starts from rest and has velocity $v = 4t$ m/s. Find the time
at which its displacement is $50$ m.

<details markdown="1">
<summary>Hint</summary>

Integrate from $0$ to $T$, then set the result equal to $50$.

<details markdown="1">
<summary>Next step</summary>

$$\int_0^T 4t\,dt = \left[2t^2\right]_0^T = 2T^2$$

<details markdown="1">
<summary>Full working</summary>

Set $2T^2 = 50$, so $T^2 = 25$ and $T = 5$ s. The negative root is rejected,
because a time cannot be negative.

</details>
</details>
</details>

## A question from Chapter 1

**8.** In Chapter 1 a model was judged by what it leaves out. Integrating the
velocity gives a displacement for a model of the journey. State one thing that
model leaves out, and one question it can still answer well.

<details markdown="1">
<summary>Hint</summary>

Think about where the velocity formula came from.

<details markdown="1">
<summary>Next step</summary>

The velocity formula is a smooth function of time, but a real journey has
starts, stops and changes.

<details markdown="1">
<summary>Full working</summary>

The model leaves out every change in the motion that the velocity formula does
not describe. A real journey has traffic lights, corners and changes of gear, so
the true velocity is not a single smooth function.

The model still answers a useful question well: the displacement over an
interval where the formula fits, such as a car on an open road at a steady
speed. On that interval the integral is close to the real distance.

</details>
</details>
</details>
