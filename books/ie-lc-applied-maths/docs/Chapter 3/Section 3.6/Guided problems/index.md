---
title: 3.6 Deriving the equations of motion by calculus — Practise with help
chapter: 3
chapter_title: Describing motion
section: '3.6'
section_title: Deriving the equations of motion by calculus
tier: O
refs:
- S3
kind: guided-problems
---

# 3.6 Deriving the equations of motion by calculus — Practise with help

## Warm-up: remember

1. Differentiate $y = 10t - 4.9t^2$.
2. Find $\displaystyle\int 6\,dt$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{dy}{dt} = 10 - 9.8t$. That is the velocity of a ball thrown upwards
   at 10 m/s.
2. $\displaystyle\int 6\,dt = 6t + C$. Integrating a constant acceleration gives
   a velocity, and the constant is the starting velocity.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A particle has an initial velocity of $4$ m/s and a constant
acceleration of $6$ m/s². Integrate the acceleration to find its velocity after
$5$ s.

<details markdown="1">
<summary>Hint</summary>

The velocity is the initial velocity plus the integral of the acceleration.

<details markdown="1">
<summary>Next step</summary>

$$v = 4 + \int 6\,dt = 4 + 6t$$

<details markdown="1">
<summary>Full working</summary>

$$v = 4 + 6t$$

At $t = 5$ s, $v = 4 + 30 = 34$ m/s. This is $v = u + at$ with the numbers put
in.

</details>
</details>
</details>

**2.** The same particle has velocity $v = 4 + 6t$ m/s and starts at the
origin. Find its displacement after $5$ s.

<details markdown="1">
<summary>Hint</summary>

The displacement is the definite integral of the velocity from $0$ to $5$.

<details markdown="1">
<summary>Next step</summary>

$$\int_0^5 (4 + 6t)\,dt = \left[4t + 3t^2\right]_0^5$$

<details markdown="1">
<summary>Full working</summary>

$$\left[4t + 3t^2\right]_0^5 = 20 + 75 = 95\,\text{m}$$

The displacement is 95 m. This is $s = ut + \frac{1}{2}at^2$ with $u = 4$,
$a = 6$ and $t = 5$.

</details>
</details>
</details>

**3.** A ball is thrown upwards at $10$ m/s. Gravity gives it a constant
acceleration of $-9.8$ m/s². Integrate once to find its velocity, and again to
find its height.

<details markdown="1">
<summary>Hint</summary>

The first constant of integration is $10$. The second is the starting height,
which is zero.

<details markdown="1">
<summary>Next step</summary>

$$v = 10 - 9.8t$$

$$y = \int (10 - 9.8t)\,dt$$

<details markdown="1">
<summary>Full working</summary>

$$v = 10 + \int (-9.8)\,dt = 10 - 9.8t$$

$$y = \int (10 - 9.8t)\,dt = 10t - 4.9t^2$$

The velocity is $10 - 9.8t$ m/s and the height is $10t - 4.9t^2$ m.

</details>
</details>
</details>

**4.** A particle starts at $3$ m/s and accelerates at $4$ m/s² over a distance
of $14$ m. Find its final velocity.

<details markdown="1">
<summary>Hint</summary>

Use $v^2 = u^2 + 2as$, which Section 3.6 derives with the chain rule.

<details markdown="1">
<summary>Next step</summary>

$$v^2 = 3^2 + 2 \times 4 \times 14$$

<details markdown="1">
<summary>Full working</summary>

$$v^2 = 9 + 112 = 121$$

$$v = 11\,\text{m/s}$$

The final velocity is 11 m/s.

</details>
</details>
</details>

**5.** A ball is thrown upwards at $12$ m/s. Its height is $y = 12t - 4.9t^2$
metres. Find the positive time at which it returns to the ground.

<details markdown="1">
<summary>Hint</summary>

Set $y = 0$ and factorise.

<details markdown="1">
<summary>Next step</summary>

$$12t - 4.9t^2 = 0, \qquad t(12 - 4.9t) = 0$$

<details markdown="1">
<summary>Full working</summary>

The root $t = 0$ is the throw. The other root is
$t = \dfrac{12}{4.9} = \dfrac{120}{49} = 2.45$ s, to three significant figures.
That is when the ball lands.

</details>
</details>
</details>

**6.** Show that the two terms on the right of $s = ut + \frac{1}{2}at^2$ have
the same dimensions as $s$.

<details markdown="1">
<summary>Hint</summary>

Write the dimension of each symbol: $s$ in m, $u$ in m/s, $a$ in m/s², $t$ in s.

<details markdown="1">
<summary>Next step</summary>

$ut$ is a velocity times a time. $at^2$ is an acceleration times a time squared.

<details markdown="1">
<summary>Full working</summary>

The term $ut$ has dimension $\text{m s}^{-1} \times \text{s} = \text{m}$. The
term $\frac{1}{2}at^2$ has dimension
$\text{m s}^{-2} \times \text{s}^2 = \text{m}$. Both terms are lengths, so both
match $s$. The constant $\frac{1}{2}$ has no dimension and cannot change the
result.

</details>
</details>
</details>

**7.** Derive $v = u + at$ from $a = \dfrac{dv}{dt}$ for a constant
acceleration.

<details markdown="1">
<summary>Hint</summary>

Separate the variables, then integrate both sides between the start and time
$t$.

<details markdown="1">
<summary>Next step</summary>

$$\int_u^v dv = \int_0^t a\,dt$$

<details markdown="1">
<summary>Full working</summary>

The left side gives $v - u$. The right side gives $at$, because $a$ is constant.
So $v - u = at$, and $v = u + at$. The constant of integration is the initial
velocity $u$.

</details>
</details>
</details>

## A question from Chapter 1

**8.** In Chapter 1 a model was judged by what it leaves out. The derivation in
this section assumes the acceleration is exactly constant. State one thing this
assumption leaves out about a real falling object, and one question it can still
answer well.

<details markdown="1">
<summary>Hint</summary>

Think about the air, and about how long the fall lasts.

<details markdown="1">
<summary>Next step</summary>

The assumption ignores air resistance, which grows as the object speeds up.

<details markdown="1">
<summary>Full working</summary>

The assumption leaves out air resistance. A real object feels a drag force that
grows with its speed, so its acceleration falls as it falls. Near the ground the
model is close; after a long fall it is not.

The model still answers a useful question well: the speed and height of a heavy,
compact object over a short fall. On that interval the drag is small compared
with the weight, and the constant-acceleration answer is close to the real one.

</details>
</details>
</details>
