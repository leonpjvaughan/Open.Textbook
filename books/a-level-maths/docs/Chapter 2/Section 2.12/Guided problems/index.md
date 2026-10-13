---
title: '2.12 Functions in modelling: limitations and refinements — Practise with help'
chapter: 2
chapter_title: Algebra and functions
section: '2.12'
section_title: 'Functions in modelling: limitations and refinements'
refs:
- B11
- OT3
kind: guided-problems
---

# 2.12 Functions in modelling: limitations and refinements — Practise with help

Work each one first, closed book. For every model, write down the domain and one
assumption before you calculate. At the end, turn the number back into a sentence
about the situation, with a unit.

## Warm-up: remember

1. Work out $2^2$ and $(-3)^2$.
2. Solve $t^2 - 4 = 0$.
3. Complete the square for $t^2 - 6t + 5$.

<details markdown="1">
<summary>Answers</summary>

1. $2^2 = 4$ and $(-3)^2 = 9$.
2. $t^2 = 4$, so $t = 2$ or $t = -2$.
3. $t^2 - 6t + 5 = (t - 3)^2 - 4$.

If question 3 was hard, revisit completing the square: half of $-6$ is $-3$.
</details>

## Practise with help

**1.** A stone is dropped from a cliff. Its distance fallen in metres after $t$
seconds is modelled by $d = 5t^2$. Work out the distance fallen after $3$
seconds.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 3$ into the model.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $5 \times 3^2$.
</details>

<details markdown="1">
<summary>Full working</summary>

Substitute $t = 3$:

$$
d = 5 \times 3^2 = 5 \times 9 = 45.
$$

The stone has fallen $45$ m. The domain is $t \geq 0$, because a negative time has
no meaning here. The model assumes no air resistance.

</details>

**2.** For the model $d = 5t^2$, work out the time taken to fall $80$ m.

<details markdown="1">
<summary>Hint</summary>

Set $d = 80$ and solve for $t$. A time is not negative.
</details>

<details markdown="1">
<summary>Next step</summary>

$5t^2 = 80$, so $t^2 = 16$.
</details>

<details markdown="1">
<summary>Full working</summary>

Set the distance to $80$:

$$
5t^2 = 80, \qquad t^2 = 16.
$$

The solutions are $t = 4$ or $t = -4$. A fall cannot happen before it starts, so
$t \geq 0$ and the answer is $t = 4$ seconds. This is an example of rejecting a
solution that is outside the domain.

</details>

**3.** The height of a ball is modelled by $h = 2 + 6t - 5t^2$. Complete the
square and state the greatest height.

<details markdown="1">
<summary>Hint</summary>

Take the factor $-5$ from the $t$ terms, or complete the square directly and
watch the signs.
</details>

<details markdown="1">
<summary>Next step</summary>

$h = -5\left(t^2 - \frac{6}{5}t\right) + 2$. Complete the square inside the
bracket.
</details>

<details markdown="1">
<summary>Full working</summary>

Take out the factor $-5$:

$$
h = -5\left(t^2 - \frac{6}{5}t\right) + 2.
$$

Complete the square inside the bracket:

$$
t^2 - \frac{6}{5}t = \left(t - \frac{3}{5}\right)^2 - \frac{9}{25}.
$$

Substitute back:

$$
h = -5\left(t - \frac{3}{5}\right)^2 + \frac{9}{5} + 2 = -5\left(t - \frac{3}{5}\right)^2 + \frac{19}{5}.
$$

The greatest height is $\frac{19}{5} = 3.8$ m, reached at $t = 0.6$ s.

</details>

**4.** For the model $h = 2 + 6t - 5t^2$, find when the ball hits the ground.

<details markdown="1">
<summary>Hint</summary>

The ground is $h = 0$. Solve the quadratic and reject the negative root.
</details>

<details markdown="1">
<summary>Next step</summary>

Solve $5t^2 - 6t - 2 = 0$ with the formula. The discriminant is $36 + 40 = 76$.
</details>

<details markdown="1">
<summary>Full working</summary>

Set $h = 0$ and rearrange:

$$
5t^2 - 6t - 2 = 0.
$$

The formula gives

$$
t = \frac{6 \pm \sqrt{36 + 40}}{10} = \frac{6 \pm \sqrt{76}}{10}.
$$

Now $\sqrt{76} = \sqrt{4 \times 19} = 2\sqrt{19}$, so $t = \frac{3 \pm \sqrt{19}}{5}$.
Numerically, $t \approx 1.472$ or $t \approx -0.272$. The negative value is
outside the domain, so the ball lands after about $1.47$ s.
</details>

**5.** A model predicts a value of $12.4$. A measurement gives $12.1$. With a
tolerance of $0.5$, decide whether the model is acceptable.

<details markdown="1">
<summary>Hint</summary>

Work out the size of the difference first, then compare it with the tolerance.
</details>

<details markdown="1">
<summary>Next step</summary>

$|12.1 - 12.4| = 0.3$. Compare $0.3$ with $0.5$.
</details>

<details markdown="1">
<summary>Full working</summary>

The difference is

$$
|12.1 - 12.4| = 0.3.
$$

This is less than the tolerance $0.5$, so the prediction is within the agreed
error and the model is acceptable at this point. A single fit does not prove the
model is right; it only fails to rule it out here.
</details>

**6.** A company models its cost for $n$ items as $C = 80 + 5n + 0.2n^2$ pounds,
for whole numbers $n \geq 1$. Work out the cost of $15$ items, and explain one
limitation of the model.

<details markdown="1">
<summary>Hint</summary>

Substitute $n = 15$. For the limitation, think about whether the $n^2$ term keeps
the cost realistic for very large $n$.
</details>

<details markdown="1">
<summary>Next step</summary>

$C = 80 + 5 \times 15 + 0.2 \times 15^2$. Work out each term.
</details>

<details markdown="1">
<summary>Full working</summary>

Substitute $n = 15$:

$$
C = 80 + 5 \times 15 + 0.2 \times 225 = 80 + 75 + 45 = 200.
$$

The cost is £200. One limitation: the $n^2$ term means the cost grows faster and
faster as $n$ increases. For a large enough $n$ this stops being realistic,
because a factory does not pay ever-increasing costs per item. The model is meant
for the range of $n$ where it was fitted.
</details>
