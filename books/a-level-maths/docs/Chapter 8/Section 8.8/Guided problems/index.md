---
title: 8.8 Interpreting differential-equation solutions in context — Practise with
  help
chapter: 8
chapter_title: Integration
section: '8.8'
section_title: Interpreting differential-equation solutions in context
refs:
- H8
- OT3
kind: guided-problems
---

# 8.8 Interpreting differential-equation solutions in context — Practise with help

Work each question closed book first. Write down the initial value, the
direction of change and the expected limiting value before you solve the
equation.

## Warm-up: remember

1. Solve $\dfrac{dy}{dx} = ky$, giving the general solution.
2. Solve $e^{0.05t} = 3$ for $t$, giving an exact answer.
3. Find $\displaystyle\lim_{t \to \infty} \left(20 + 70e^{-0.1t}\right)$.

<details markdown="1">
<summary>Answers</summary>

1. $y = Ae^{kx}$.
2. $t = \dfrac{\ln 3}{0.05} = 20\ln 3$.
3. The exponential term tends to $0$, so the limit is $20$.

If question 1 was hard, revise separable equations in Section 8.7.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A population $P$ grows so that $\dfrac{dP}{dt} = 0.03P$, with $P = 2000$
when $t = 0$. Find $P$ in terms of $t$, then find the population after $20$
years.

<details markdown="1">
<summary>Hint</summary>

The rate is positive, so the population grows. The general solution is
$P = Ae^{0.03t}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $t = 0$, $P = 2000$ to find $A$, then evaluate at $t = 20$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P = 2000e^{0.03t}.
$$

After $20$ years,

$$
P = 2000e^{0.6} \approx 3644 \text{ to the nearest whole number}.
$$

The population grows without bound in this model. The model does not include
limits on food or space.
</details>

**2.** A radioactive mass $m$ decays so that $\dfrac{dm}{dt} = -0.02m$, with
$m = 50$ g when $t = 0$ and $t$ in years. Find $m$ in terms of $t$, and find
the half-life.

<details markdown="1">
<summary>Hint</summary>

The rate is negative, so the mass falls. The general solution is
$m = Ae^{-0.02t}$. The half-life is the time for $m$ to reach $25$ g.
</details>

<details markdown="1">
<summary>Next step</summary>

With $m = 50e^{-0.02t}$, set $m = 25$ and solve
$25 = 50e^{-0.02t}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
m = 50e^{-0.02t}.
$$

For the half-life:

$$
\frac{1}{2} = e^{-0.02t},
\qquad
-0.02t = \ln\frac{1}{2} = -\ln 2,
\qquad
t = \frac{\ln 2}{0.02} \approx 34.7 \text{ years}.
$$

The half-life does not depend on the starting mass.
</details>

**3.** A drink cools so that $\dfrac{dT}{dt} = -k(T - 15)$, with $T = 95$°C when
$t = 0$. After $10$ minutes the temperature is $70$°C. Find $k$, then find the
temperature after $30$ minutes.

<details markdown="1">
<summary>Hint</summary>

The general solution is $T = 15 + Ae^{-kt}$. Substitute $t = 0$ to find $A$,
then use the temperature at $10$ minutes to find $k$.
</details>

<details markdown="1">
<summary>Next step</summary>

$T = 15 + 80e^{-kt}$. At $t = 10$, $70 = 15 + 80e^{-10k}$, so
$e^{-10k} = \dfrac{11}{16}$.
</details>

<details markdown="1">
<summary>Full working</summary>

From $e^{-10k} = \dfrac{11}{16}$,

$$
e^{-30k} = \left(\frac{11}{16}\right)^3.
$$

Then

$$
T = 15 + 80\left(\frac{11}{16}\right)^3 \approx 41.0 \text{°C}.
$$

In the long run the temperature approaches $15$°C, the surrounding temperature.
</details>

**4.** A falling object has velocity $v$ satisfying
$\dfrac{dv}{dt} = 10 - 0.5v$, with $v = 0$ when $t = 0$ and $t$ in seconds.
Find $v$ in terms of $t$ and state the terminal velocity.

<details markdown="1">
<summary>Hint</summary>

Separate to $\displaystyle\int \frac{1}{10 - 0.5v}dv = \int 1dt$. The left
side integrates to $-2\ln|10 - 0.5v|$.
</details>

<details markdown="1">
<summary>Next step</summary>

Rearrange to $10 - 0.5v = Ae^{-0.5t}$. Substitute $t = 0$, $v = 0$ to find $A$.
</details>

<details markdown="1">
<summary>Full working</summary>

At $t = 0$: $10 = A$. Then

$$
10 - 0.5v = 10e^{-0.5t},
\qquad
v = 20\left(1 - e^{-0.5t}\right).
$$

As $t \to \infty$, $v \to 20$ m/s. This is the terminal velocity, where the
acceleration $10 - 0.5v$ is zero.
</details>

**5.** A model for a population gives $P = 5000e^{0.02t}$, with $t$ in years.
Describe the long-term behaviour and give one limitation of the model.

<details markdown="1">
<summary>Hint</summary>

There is no limiting value here: the exponential grows without bound. Think
about what a real population needs in order to keep growing.
</details>

<details markdown="1">
<summary>Next step</summary>

State the growth rate and the starting value, then name one resource that the
model ignores.
</details>

<details markdown="1">
<summary>Full working</summary>

The population grows at $2\%$ per year from a starting value of $5000$, and the
model predicts unlimited growth. In the long run the population becomes
arbitrarily large.

One limitation is that the model ignores limits on food, space and disease. A
real population cannot grow without bound, so the model is only useful while
those resources are plentiful. Another limitation is that the rate constant
$0.02$ is assumed constant, but it can change as conditions change.
</details>

**6.** A cooling model gives $T = 18 + 60e^{-0.05t}$, with $T$ in °C and $t$ in
minutes. Find the initial temperature, the limiting temperature, and the time
when the temperature reaches $30$°C.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 0$ for the initial temperature. The limiting value is the
constant when the exponential term vanishes. For the time, set $T = 30$.
</details>

<details markdown="1">
<summary>Next step</summary>

$30 = 18 + 60e^{-0.05t}$, so $e^{-0.05t} = \dfrac{12}{60} = 0.2$. Take
logarithms.
</details>

<details markdown="1">
<summary>Full working</summary>

At $t = 0$, $T = 18 + 60 = 78$°C. As $t \to \infty$, the exponential term tends
to $0$, so the limiting temperature is $18$°C.

For $T = 30$:

$$
0.2 = e^{-0.05t},
\qquad
-0.05t = \ln 0.2 = -\ln 5,
\qquad
t = \frac{\ln 5}{0.05} = 20\ln 5 \approx 32.2 \text{ minutes}.
$$

The model approaches $18$°C but never reaches it in finite time.
</details>
