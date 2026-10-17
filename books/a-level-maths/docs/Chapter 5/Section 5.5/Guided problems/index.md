---
title: 5.5 Small-angle approximations — Practise with help
chapter: 5
chapter_title: Trigonometry
section: '5.5'
section_title: Small-angle approximations
refs:
- E2
kind: guided-problems
---

# 5.5 Small-angle approximations — Practise with help

Before each estimate, check that the angle is in radians and that it is small.
Then choose the right approximation for the function in the question.

## Warm-up: remember

1. Change $0.1$ radians into degrees, to one decimal place.
2. Work out $0.2^2$ and $0.3^2$.
3. Work out $1 - \dfrac{0.2^2}{2}$.

<details markdown="1">
<summary>Answers</summary>

1. $0.1 \times \dfrac{180}{\pi} \approx 5.7^\circ$.
2. $0.2^2 = 0.04$ and $0.3^2 = 0.09$.
3. $1 - \dfrac{0.04}{2} = 1 - 0.02 = 0.98$.

If question 3 was hard, revise substituting into a formula before you continue.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Estimate $\sin 0.15$ using a small-angle approximation.

<details markdown="1">
<summary>Hint</summary>

For small angles in radians, sine is almost the angle itself.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\sin 0.15 \approx 0.15$ directly.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sin 0.15 \approx 0.15.
$$

A calculator gives $0.14944$, so the estimate is good to about three decimal
places.
</details>

**2.** Estimate $\cos 0.3$ using a small-angle approximation.

<details markdown="1">
<summary>Hint</summary>

Use the quadratic approximation for cosine, not $1$ on its own.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $\theta = 0.3$ into $1 - \dfrac{\theta^2}{2}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\cos 0.3 \approx 1 - \frac{0.3^2}{2} = 1 - \frac{0.09}{2} = 1 - 0.045 = 0.955.
$$

A calculator gives $0.95534$, so the estimate is accurate to three decimal
places.
</details>

**3.** Estimate $\tan 0.08$ using a small-angle approximation.

<details markdown="1">
<summary>Hint</summary>

Tangent behaves like sine near zero.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\tan 0.08 \approx 0.08$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\tan 0.08 \approx 0.08.
$$

A calculator gives $0.08017$, so the error is about $0.00017$.
</details>

**4.** A pendulum of length $0.6$ m swings through a small angle
$\theta = 0.12$ radians. Estimate the horizontal displacement of the bob.

<details markdown="1">
<summary>Hint</summary>

The displacement is $L\sin\theta$. Replace $\sin\theta$ with $\theta$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $0.6 \times 0.12$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x = L\sin\theta \approx L\theta = 0.6 \times 0.12 = 0.072 \text{ m}.
$$

The displacement is about $7.2$ cm.
</details>

**5.** The error in the approximation $\sin\theta \approx \theta$ is about
$\dfrac{\theta^3}{6}$. Estimate the error at $\theta = 0.2$ and compare it with
the table in the Learn page.

<details markdown="1">
<summary>Hint</summary>

Substitute $\theta = 0.2$ into $\dfrac{\theta^3}{6}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\theta^3 = 0.2^3 = 0.008$. Divide by $6$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{0.2^3}{6} = \frac{0.008}{6} \approx 0.00133.
$$

This matches the table entry for $\theta = 0.2$, where the error in
$\sin\theta$ is $0.00133$.
</details>

**6.** A ray of light meets a flat surface at a small angle
$i = 0.04$ radians. Snell's law gives $\sin i = 1.5\sin r$, where $r$ is the
angle of the refracted ray. Estimate $r$ using small-angle approximations.

<details markdown="1">
<summary>Hint</summary>

Replace both sines with their angles: $i \approx 1.5r$.
</details>

<details markdown="1">
<summary>Next step</summary>

Divide both sides by $1.5$: $r \approx \dfrac{0.04}{1.5}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
0.04 \approx 1.5r, \qquad r \approx \frac{0.04}{1.5} \approx 0.0267 \text{ radians}.
$$

The refracted ray is about $0.027$ radians from the normal.
</details>
