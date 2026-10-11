---
title: 6.2 The gradient of e^kx and the exponential model — Practise with help
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.2'
section_title: The gradient of e^kx and the exponential model
dfe:
- F2
- G2
kind: guided-problems
---

# 6.2 The gradient of e^kx and the exponential model — Practise with help

Work each question closed book first. Look at the exponent and write down the
constant $k$ before you differentiate.

## Warm-up: remember

1. Write $\left(e^{2}\right)^3$ as a power of $e$.
2. Find the gradient of the straight line through $(1, 2)$ and $(4, 11)$.
3. Work out $2^0$ and $2^{-1}$.

<details markdown="1">
<summary>Answers</summary>

1. $\left(e^{2}\right)^3 = e^{6}$.
2. The gradient is $\dfrac{11 - 2}{4 - 1} = \dfrac{9}{3} = 3$.
3. $2^0 = 1$ and $2^{-1} = \dfrac{1}{2}$.

If question 2 was hard, revise the gradient of a straight line in Chapter 3.
</details>

## Practise with help

**1.** Differentiate $y = e^{5x}$.

<details markdown="1">
<summary>Hint</summary>

The constant in the exponent is $k = 5$, and it comes to the front.
</details>

<details markdown="1">
<summary>Next step</summary>

Keep the exponential $e^{5x}$ and multiply it by $5$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 5e^{5x}.
$$

The curve rises five times as fast as $e^x$ at every point.
</details>

**2.** Differentiate $y = 4e^{-x}$.

<details markdown="1">
<summary>Hint</summary>

Here $k = -1$. The constant $4$ stays in front.
</details>

<details markdown="1">
<summary>Next step</summary>

Multiply $4$ by $-1$ and keep the exponential unchanged.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 4 \times (-1)e^{-x} = -4e^{-x}.
$$

The derivative is negative everywhere, so the curve falls.
</details>

**3.** Differentiate $y = 3^{2x}$.

<details markdown="1">
<summary>Hint</summary>

The base is $3$, which is not $e$, so the factor $\ln 3$ appears as well as the
constant $2$ from the exponent.
</details>

<details markdown="1">
<summary>Next step</summary>

Write the answer as $2 \times 3^{2x}$ multiplied by $\ln 3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 2 \times 3^{2x}\ln 3.
$$

Since $\ln 3 \approx 1.099$, the curve is a little steeper than $e^{2x}$.
</details>

**4.** Find the gradient of $y = e^{3x}$ at the point where $x = 0$.

<details markdown="1">
<summary>Hint</summary>

Differentiate first, then substitute $x = 0$ into the derivative.
</details>

<details markdown="1">
<summary>Next step</summary>

The derivative is $3e^{3x}$. Substitute $x = 0$ and use $e^0 = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 3e^{3x}, \qquad
\left.\frac{dy}{dx}\right|_{x=0} = 3e^{0} = 3.
$$

The tangent at $(0, 1)$ has gradient $3$.
</details>

**5.** A population is modelled by $N = 50e^{0.2t}$, where $t$ is in days. Write
down $\dfrac{dN}{dt}$, and find its value at $t = 0$.

<details markdown="1">
<summary>Hint</summary>

Use $\dfrac{d}{dt}\left(e^{kt}\right) = ke^{kt}$ with $k = 0.2$, keeping the
constant $50$.
</details>

<details markdown="1">
<summary>Next step</summary>

Differentiate to get $50 \times 0.2 \times e^{0.2t}$, then substitute $t = 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dN}{dt} = 10e^{0.2t}, \qquad
\frac{dN}{dt}\bigg|_{t=0} = 10e^{0} = 10.
$$

The population starts by growing at about $10$ cells per day.
</details>

**6.** A radioactive mass is modelled by $m = 120e^{-0.5t}$ grams. Find
$\dfrac{dm}{dt}$ at $t = 0$, and explain why the answer is negative.

<details markdown="1">
<summary>Hint</summary>

Here $k = -0.5$. The negative value of $k$ is what makes the rate negative.
</details>

<details markdown="1">
<summary>Next step</summary>

Differentiate to get $120 \times (-0.5)e^{-0.5t} = -60e^{-0.5t}$, then
substitute $t = 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dm}{dt} = -60e^{-0.5t}, \qquad
\frac{dm}{dt}\bigg|_{t=0} = -60e^{0} = -60.
$$

The rate is negative because the mass is decreasing. It loses about $60$ grams
per hour at the start, and the rate becomes less negative as the mass falls.
</details>

**7.** A student says that a quantity satisfying $\dfrac{dy}{dt} = ky$ with
$k = 0$ grows without limit. Explain why the statement is wrong.

<details markdown="1">
<summary>Hint</summary>

Substitute $k = 0$ into the model $y = Ae^{kt}$ and see what happens.
</details>

<details markdown="1">
<summary>Next step</summary>

With $k = 0$, the equation says $\dfrac{dy}{dt} = 0$. What kind of quantity has
zero rate of change?
</details>

<details markdown="1">
<summary>Full working</summary>

With $k = 0$ the model is $y = Ae^{0} = A$, a constant. A zero rate of change
means the quantity stays the same. Growth needs a positive $k$, and decay needs
a negative $k$. Only the sign of $k$ decides whether the quantity rises or
falls.
</details>
