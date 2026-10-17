---
title: 15.5 Calculus in kinematics — Practise with help
chapter: 15
chapter_title: Quantities, units and kinematics
section: '15.5'
section_title: Calculus in kinematics
refs:
- Q4
kind: guided-problems
---

# 15.5 Calculus in kinematics — Practise with help

Work each one first, closed book. Decide whether the question needs a derivative
or an integral, then write down the initial condition before you integrate.

## Warm-up: remember

1. Differentiate $y = x^3$ with respect to $x$.
2. Find $\displaystyle\int 4t\,dt$.
3. Work out $(-3)^2$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{dy}{dx} = 3x^2$.
2. $\displaystyle\int 4t\,dt = 2t^2 + C$.
3. $(-3)^2 = 9$.

If question 2 was hard, revise integrating powers of $t$ before you continue.
Every velocity on this page is an integral of an acceleration.
</details>

:::figure warm-up-gate


## Practise with help

**1.** The displacement of a particle is $s = t^2 + 3t$ metres. Find its
velocity and its acceleration.

<details markdown="1">
<summary>Hint</summary>

Differentiate once for the velocity and twice for the acceleration.

</details>

<details markdown="1">
<summary>Next step</summary>

$v = \dfrac{ds}{dt} = 2t + 3$. Differentiate that for $a$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
v = 2t + 3 \text{ m/s},
\qquad
a = \frac{dv}{dt} = 2 \text{ m/s}^2.
$$

The acceleration is constant at $2$ m/s$^2$.
</details>

**2.** The displacement of a particle is $s = 2t^3 - 3t^2$ metres. Find its
velocity and its acceleration.

<details markdown="1">
<summary>Hint</summary>

Use the power rule. Take the coefficient down and reduce the power by one.

</details>

<details markdown="1">
<summary>Next step</summary>

$v = 6t^2 - 6t$. Differentiate again for $a$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
v = 6t^2 - 6t \text{ m/s},
\qquad
a = 12t - 6 \text{ m/s}^2.
$$

This acceleration is not constant, so the constant-acceleration formulae do not
apply here.
</details>

**3.** A particle has velocity $v = 4t + 1$ m/s. Its displacement is $0$ m when
$t = 0$. Find its displacement as a function of time.

<details markdown="1">
<summary>Hint</summary>

Integrate the velocity. Add a constant, then use the initial condition to fix
it.

</details>

<details markdown="1">
<summary>Next step</summary>

$s = \displaystyle\int (4t + 1)\,dt = 2t^2 + t + C$. Use $s = 0$ at $t = 0$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
s = 2t^2 + t + C.
$$

At $t = 0$, $s = 0$, so $C = 0$ and

$$
s = 2t^2 + t \text{ m}.
$$
</details>

**4.** A particle has constant acceleration $a = 10$ m/s$^2$. Its velocity is
$3$ m/s when $t = 0$. Find its velocity as a function of time.

<details markdown="1">
<summary>Hint</summary>

Integrate the acceleration and use the starting velocity to find the constant.

</details>

<details markdown="1">
<summary>Next step</summary>

$v = \displaystyle\int 10\,dt = 10t + C$. Use $v = 3$ at $t = 0$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
v = 10t + C.
$$

At $t = 0$, $v = 3$, so $C = 3$ and

$$
v = 10t + 3 \text{ m/s}.
$$
</details>

**5.** A particle has velocity $v = 3t^2 + 4$ m/s. Its displacement is $0$ m
when $t = 0$. Find its displacement as a function of time.

<details markdown="1">
<summary>Hint</summary>

Integrate term by term: the integral of $3t^2$ is $t^3$, and the integral of
$4$ is $4t$.

</details>

<details markdown="1">
<summary>Next step</summary>

$s = t^3 + 4t + C$. Use $s = 0$ at $t = 0$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
s = t^3 + 4t + C.
$$

At $t = 0$, $s = 0$, so $C = 0$ and

$$
s = t^3 + 4t \text{ m}.
$$
</details>

**6.** The displacement of a particle is $s = t^3 - 3t^2$ metres. Find the
times when the particle is at rest.

<details markdown="1">
<summary>Hint</summary>

The particle is at rest when $v = 0$. Differentiate the displacement first.

</details>

<details markdown="1">
<summary>Next step</summary>

$v = 3t^2 - 6t = 3t(t - 2)$. Set each factor equal to zero.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
v = 3t^2 - 6t = 3t(t - 2) = 0.
$$

So $t = 0$ or $t = 2$. The particle is at rest at $t = 0$ s and at $t = 2$ s.
</details>

**7.** The displacement of a particle is $s = 6t - t^2$ metres for
$0 \le t \le 6$. Find the time at rest, the displacement over the whole
interval, and the distance travelled over the whole interval.

<details markdown="1">
<summary>Hint</summary>

The particle is at rest when $v = 0$. That time splits the interval into two
parts. The displacement uses the signs, and the distance adds the sizes.

</details>

<details markdown="1">
<summary>Next step</summary>

$v = 6 - 2t$, so the particle is at rest at $t = 3$. Work out $s$ at $t = 0$,
$t = 3$ and $t = 6$.

</details>

<details markdown="1">
<summary>Full working</summary>

$v = 6 - 2t$, so $v = 0$ at $t = 3$ s.

$s(0) = 0$, $s(3) = 18 - 9 = 9$ m and $s(6) = 36 - 36 = 0$ m.

Displacement $= 0 - 0 = 0$ m.

Distance travelled $= |9 - 0| + |0 - 9| = 9 + 9 = 18$ m.

The particle moves forward $9$ m and then backward $9$ m.
</details>
