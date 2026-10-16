---
title: 8.5 Feedback and limited growth — Practise with help
chapter: 8
chapter_title: Modelling a changing world
section: '8.5'
section_title: Feedback and limited growth
tier: O
refs:
- S4
kind: guided-problems
---

# 8.5 Feedback and limited growth — Practise with help

## Warm-up: remember

1. Solve $6 - 0.3V = 0$.
2. Solve $20 - 0.05P = 0$.
3. Work out $15 + 75 \times 1$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $0.3V = 6$, so $V = 20$. This is the equilibrium of a feedback model.
2. $0.05P = 20$, so $P = 400$. This is the equilibrium of the lake model.
3. $15 + 75 = 90$. At $t = 0$ an exponential term is $1$, so the solution returns
   the starting value.

</details>

## Practise with help

**1.** Find the equilibrium of $\dfrac{dP}{dt} = 12 - 0.4P$.

<details markdown="1">
<summary>Hint</summary>

Set the rate to zero and solve.

<details markdown="1">
<summary>Next step</summary>

$12 - 0.4P = 0$.

<details markdown="1">
<summary>Full working</summary>

$$12 - 0.4P = 0, \qquad 0.4P = 12, \qquad P = 30.$$

The equilibrium is $30$. Because the coefficient of $P$ is negative, the
equilibrium is stable and the quantity returns to $30$.

</details>
</details>
</details>

**2.** Solve $\dfrac{dP}{dt} = 12 - 0.4P$ with $P_0 = 0$.

<details markdown="1">
<summary>Hint</summary>

Use $P = L + (P_0 - L)e^{kt}$ with $L = 30$ and $k = -0.4$.

<details markdown="1">
<summary>Next step</summary>

$P = 30 + (0 - 30)e^{-0.4t}$.

<details markdown="1">
<summary>Full working</summary>

$$P = 30 - 30e^{-0.4t} = 30\left(1 - e^{-0.4t}\right).$$

At $t = 0$ this gives $30(1 - 1) = 0$, which is the starting value. As $t$ grows
the exponential fades and $P$ approaches $30$.

</details>
</details>
</details>

**3.** A body cools so that $\dfrac{dT}{dt} = -0.2(T - 10)$, with $T_0 = 60$°C.
Find $T$ in terms of $t$.

<details markdown="1">
<summary>Hint</summary>

The equilibrium is the room temperature, $10$°C.

<details markdown="1">
<summary>Next step</summary>

$T = 10 + (60 - 10)e^{-0.2t}$.

<details markdown="1">
<summary>Full working</summary>

$$T = 10 + 50e^{-0.2t}.$$

At $t = 0$ this gives $60$°C. As $t$ grows the temperature falls towards $10$°C.

</details>
</details>
</details>

**4.** A tank loses water so that $\dfrac{dV}{dt} = -0.1V$, with $V_0 = 200$
litres. Find $V$ in terms of $t$.

<details markdown="1">
<summary>Hint</summary>

With no input this is pure decay.

<details markdown="1">
<summary>Next step</summary>

$V = 200e^{-0.1t}$.

<details markdown="1">
<summary>Full working</summary>

$$V = 200e^{-0.1t}.$$

The equilibrium is zero, so the water level falls towards empty. In the model it
never quite reaches zero, but it becomes very small.

</details>
</details>
</details>

**5.** A pollutant is modelled by $P = 200e^{-0.1t}$ kg. Find the time taken for
the amount to fall to $100$ kg, giving an exact answer.

<details markdown="1">
<summary>Hint</summary>

Set $P = 100$ and solve.

<details markdown="1">
<summary>Next step</summary>

$e^{-0.1t} = 0.5$.

<details markdown="1">
<summary>Full working</summary>

$$200e^{-0.1t} = 100, \qquad e^{-0.1t} = \frac{1}{2}, \qquad -0.1t = -\ln 2,$$

$$t = \frac{\ln 2}{0.1} = 10\ln 2 \approx 6.9.$$

The time is $10\ln 2$ units. This is the half-life of the decay, as in Section
8.2.

</details>
</details>
</details>

**6.** The lake model while the factory is open is
$\dfrac{dP}{dt} = 20 - 0.05P$, and its equilibrium is $400$ kg. Explain why the
lake is not safe while the factory operates if the safe level is $50$ kg.

<details markdown="1">
<summary>Hint</summary>

The amount rises towards the equilibrium, and it does not stop below it.

<details markdown="1">
<summary>Next step</summary>

Starting from zero, the amount climbs towards $400$ kg and stays near it.

<details markdown="1">
<summary>Full working</summary>

The solution is $P = 400\left(1 - e^{-0.05t}\right)$, which rises from $0$ and
approaches $400$ kg. It passes $50$ kg early on and then stays above it, settling
near $400$ kg. The input keeps adding pollutant as fast as the lake can remove
it at that level, so the lake cannot clear while the factory operates. The lake
becomes safe only after the input stops.

</details>
</details>
</details>

**7.** A student writes: "The equilibrium of $\dfrac{dP}{dt} = 20 - 0.05P$ is
$20$, because $20$ is the input." Explain the mistake and give the correct
equilibrium.

<details markdown="1">
<summary>Hint</summary>

At the equilibrium the rate is zero, so the input must equal the output.

<details markdown="1">
<summary>Next step</summary>

$20 = 0.05P$.

<details markdown="1">
<summary>Full working</summary>

The input is not the equilibrium. At the equilibrium the input equals the output:
$20 = 0.05P$, so $P = 400$ kg. At $P = 20$ the output is only $0.05 \times 20 = 1$
kg per day, far less than the input, so the amount is still rising.

</details>
</details>
</details>

## A question from Section 8.4

**8.** The daily model of the lake is $u_{n+1} = 0.95u_n$, with $u_0 = 400$ kg.
Find its fixed point. Compare it with the equilibrium of the continuous lake
model $\dfrac{dP}{dt} = -0.05P$.

<details markdown="1">
<summary>Hint</summary>

Set $L = 0.95L$ for the discrete model. For the continuous model, set the rate to
zero.

<details markdown="1">
<summary>Next step</summary>

$L = 0.95L$ gives $L = 0$; $-0.05P = 0$ gives $P = 0$.

<details markdown="1">
<summary>Full working</summary>

Both models have equilibrium zero. In the discrete model the fixed point is $0$,
because multiplying zero by $0.95$ leaves it at zero. In the continuous model the
rate is zero only at $P = 0$. Both models say the pollutant falls towards zero
once the input stops, which is the answer to the chapter problem.

</details>
</details>
</details>
