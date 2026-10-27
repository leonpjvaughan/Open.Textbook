---
title: 6.7 Successive collisions and rebounds — Practise with help
chapter: 6
chapter_title: Momentum, impulse and collisions
section: '6.7'
section_title: Successive collisions and rebounds
tier: H
refs:
- S3
kind: guided-problems
---

# 6.7 Successive collisions and rebounds — Practise with help

## Warm-up: remember

1. Work out $0.6^2$.
2. Find the sum of $1 + 0.25 + 0.0625 + \cdots$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $0.36$. That is the factor by which a rebound height shrinks when the
   coefficient of restitution is $0.6$.
2. $\dfrac{4}{3}$. The series is geometric with first term $1$ and ratio
   $0.25$, so its sum is $\dfrac{1}{1 - 0.25} = \dfrac{4}{3}$. A bouncing ball
   gives a series of exactly this kind.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A ball hits the floor at $8$ m/s and rebounds at $6$ m/s. Find the
coefficient of restitution.

<details markdown="1">
<summary>Hint</summary>

The coefficient is the rebound speed divided by the approach speed.

<details markdown="1">
<summary>Next step</summary>

$$e = \frac{6}{8}$$

<details markdown="1">
<summary>Full working</summary>

$$e = \frac{6}{8} = 0.75$$

Each later bounce multiplies the speed by $0.75$, and each later height by
$0.75^2 = 0.5625$.

</details>
</details>
</details>

**2.** A ball hits the floor at $10$ m/s. The coefficient of restitution is
$0.5$. Find the speed $v$ with which it hits the floor on the third bounce.

<details markdown="1">
<summary>Hint</summary>

The speed after $n$ bounces is $ue^n$.

<details markdown="1">
<summary>Next step</summary>

After three bounces the speed is $10 \times 0.5^3$.

<details markdown="1">
<summary>Full working</summary>

$$v = 10 \times 0.5^3 = 10 \times 0.125 = 1.25\,\text{m/s}$$

The speeds are $5$, $2.5$, $1.25$ m/s at the first three bounces, halving each
time.

</details>
</details>
</details>

**3.** A ball is dropped from a height of $3$ m. The coefficient of restitution
is $0.6$. Find the height after the first bounce and after the second bounce.

<details markdown="1">
<summary>Hint</summary>

The height after $n$ bounces is $he^{2n}$.

<details markdown="1">
<summary>Next step</summary>

$$h_1 = 3 \times 0.6^2, \qquad h_2 = 3 \times 0.6^4$$

<details markdown="1">
<summary>Full working</summary>

$$h_1 = 3 \times 0.36 = 1.08\,\text{m}$$

$$h_2 = 3 \times 0.1296 = 0.3888\,\text{m}$$

Each height is $0.36$ of the previous one, because the height depends on the
square of the speed.

</details>
</details>
</details>

**4.** A ball is dropped from a height of $2$ m. The coefficient of restitution
is $0.5$. Find the total distance $D$ it travels before it stops.

<details markdown="1">
<summary>Hint</summary>

Use $D = h\left(1 + \dfrac{2e^2}{1 - e^2}\right)$.

<details markdown="1">
<summary>Next step</summary>

$$D = 2\left(1 + \frac{2 \times 0.25}{1 - 0.25}\right)$$

<details markdown="1">
<summary>Full working</summary>

$$D = 2\left(1 + \frac{0.5}{0.75}\right) = 2 \times \frac{5}{3}
= \frac{10}{3} \approx 3.33\,\text{m}$$

The first fall is $2$ m, and the bounces add a further $1.33$ m. The series
converges because the ratio $e^2 = 0.25$ is less than $1$.

</details>
</details>
</details>

**5.** A ball of mass $2$ kg moving at $5$ m/s hits a stationary ball of mass
$2$ kg. The coefficient of restitution is $0.6$. The struck ball then hits a
third stationary ball of mass $2$ kg, again with coefficient of restitution
$0.6$. Find the speed of the second ball and of the third ball.

<details markdown="1">
<summary>Hint</summary>

For equal masses, the struck ball moves at $\dfrac{u(1 + e)}{2}$.

<details markdown="1">
<summary>Next step</summary>

$$v_2 = \frac{5 \times 1.6}{2} = 4\,\text{m/s}$$

$$v_3 = \frac{4 \times 1.6}{2}$$

<details markdown="1">
<summary>Full working</summary>

$$v_3 = 3.2\,\text{m/s}$$

The speeds are $5$, $4$, $3.2$ m/s. Each collision passes on $80\%$ of the
previous speed, because $\dfrac{1 + e}{2} = 0.8$.

</details>
</details>
</details>

**6.** A ball of mass $0.5$ kg hits a wall at $8$ m/s and rebounds at $4$ m/s.
Taking the direction away from the wall as positive, find the impulse $J$ on the
ball.

<details markdown="1">
<summary>Hint</summary>

Give the velocity before and after the bounce the correct signs.

<details markdown="1">
<summary>Next step</summary>

The velocity before is $-8$ m/s and after is $+4$ m/s.

$$J = 0.5 \times (4 - (-8))$$

<details markdown="1">
<summary>Full working</summary>

$$J = 0.5 \times 12 = 6\,\text{N s}$$

The impulse is $6$ N s away from the wall. The change in velocity is $12$ m/s,
not $4$ m/s, because the ball reverses direction.

</details>
</details>
</details>

**7.** Explain how a geometric series is used to find the total distance
travelled by a bouncing ball, and why the series has a finite sum.

<details markdown="1">
<summary>Hint</summary>

Identify the first term and the common ratio of the bounce distances.

<details markdown="1">
<summary>Next step</summary>

Each bounce covers a rise and a fall, and the heights fall by a factor $e^2$.

<details markdown="1">
<summary>Full working</summary>

The first fall is a distance $h$. Each bounce after that covers a rise and a
fall, both of height $he^{2n}$, so the bounce distances are $2he^2$, $2he^4$,
$2he^6$, and so on. These form a geometric series with first term $2he^2$ and
common ratio $e^2$. Because the coefficient of restitution is less than $1$, the
ratio is less than $1$, and a geometric series with a ratio less than $1$ has a
finite sum. That sum is the total distance the ball travels.

</details>
</details>
</details>

## A question from Chapter 5

**8.** An object of mass $2$ kg falls through the air with drag $D = kv^2$,
where $k = 0.5$ kg/m. Find its terminal velocity. Take $g = 9.8$ m/s².

<details markdown="1">
<summary>Hint</summary>

At the terminal speed the drag balances the weight.

<details markdown="1">
<summary>Next step</summary>

$$kv^2 = mg$$

$$v = \sqrt{\frac{mg}{k}} = \sqrt{\frac{2 \times 9.8}{0.5}}$$

<details markdown="1">
<summary>Full working</summary>

$$v = \sqrt{39.2} = 6.26\,\text{m/s}$$

This is a Chapter 5 question. A falling object with drag is a good reminder that
the coefficient of restitution is a model too: it says the speed is multiplied
by the same factor at every bounce, which is a useful approximation rather than
an exact law.

</details>
</details>
</details>
