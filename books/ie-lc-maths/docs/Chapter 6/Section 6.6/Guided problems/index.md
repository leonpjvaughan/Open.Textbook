---
title: "6.6 Exponential and logarithmic functions — Practise with help"
chapter: 6
chapter_title: Functions
section: "6.6"
section_title: Exponential and logarithmic functions
tier: O
refs:
- '5.1'
kind: guided-problems
---

# 6.6 Exponential and logarithmic functions — Practise with help

## Warm-up: remember

1. Work out $2^5$.
2. Work out $(0.5)^2$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $2^5 = 32$.
2. $(0.5)^2 = 0.25$. This is the factor the coffee temperature uses each time $t$ grows by
   $10$ minutes.

</details>

## Practise with help

**1.** Write $2^6 = 64$ in logarithmic form.

<details markdown="1">
<summary>Hint</summary>

The exponent becomes the logarithm.

<details markdown="1">
<summary>Next step</summary>

The base is $2$ and the exponent is $6$.

<details markdown="1">
<summary>Full working</summary>

$$\log_2 64 = 6$$

The base of the power becomes the base of the logarithm.

</details>
</details>
</details>

**2.** Work out $\log_3 27$.

<details markdown="1">
<summary>Hint</summary>

Ask which power of $3$ gives $27$.

<details markdown="1">
<summary>Next step</summary>

$3^3 = 27$.

<details markdown="1">
<summary>Full working</summary>

$$\log_3 27 = 3$$

because $3^3 = 27$.

</details>
</details>
</details>

**3.** Solve $5^x = 125$.

<details markdown="1">
<summary>Hint</summary>

Write $125$ as a power of $5$.

<details markdown="1">
<summary>Next step</summary>

$125 = 5^3$.

<details markdown="1">
<summary>Full working</summary>

$5^x = 5^3$, so $x = 3$. Matching powers works because the exponential function is
injective.

</details>
</details>
</details>

**4.** Solve $2^x = 20$, giving $x$ to three significant figures.

<details markdown="1">
<summary>Hint</summary>

Take logarithms of both sides and use the power law.

<details markdown="1">
<summary>Next step</summary>

$x\log 2 = \log 20$.

<details markdown="1">
<summary>Full working</summary>

$$x = \frac{\log 20}{\log 2} = 4.3219\dots$$

To three significant figures, $x = 4.32$.

</details>
</details>
</details>

**5.** Simplify $\log 5 + \log 2$.

<details markdown="1">
<summary>Hint</summary>

Adding logarithms multiplies the arguments.

<details markdown="1">
<summary>Next step</summary>

$\log 5 + \log 2 = \log(5 \times 2)$.

<details markdown="1">
<summary>Full working</summary>

$$\log 5 + \log 2 = \log 10 = 1$$

The answer is exact because $\log 10 = 1$ for logarithms base $10$.

</details>
</details>
</details>

**6.** Simplify $\log 100 - \log 4$.

<details markdown="1">
<summary>Hint</summary>

Subtracting logarithms divides the arguments.

<details markdown="1">
<summary>Next step</summary>

$\log 100 - \log 4 = \log 25$.

<details markdown="1">
<summary>Full working</summary>

$$\log 100 - \log 4 = \log\!\left(\frac{100}{4}\right) = \log 25$$

The single logarithm is $\log 25$.

</details>
</details>
</details>

**7.** Solve $20 + 70(0.5)^{t/5} = 50$ for $t$.

<details markdown="1">
<summary>Hint</summary>

Subtract $20$, divide by $70$, then take logarithms.

<details markdown="1">
<summary>Next step</summary>

$(0.5)^{t/5} = \dfrac{30}{70} = \dfrac{3}{7}$, so
$\dfrac{t}{5}\log 0.5 = \log\dfrac{3}{7}$.

<details markdown="1">
<summary>Full working</summary>

$$t = 5\,\frac{\log(3/7)}{\log 0.5} = 6.11\dots$$

The coffee reaches $50^\circ C$ after about $6.11$ minutes.

</details>
</details>
</details>

**8.** Check the answer to question 7 by substituting $t = 6.11$ back into
$T(t) = 20 + 70(0.5)^{t/5}$.

<details markdown="1">
<summary>Hint</summary>

Work out $(0.5)^{6.11/5}$ first.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{6.11}{5} = 1.222$.

<details markdown="1">
<summary>Full working</summary>

$$(0.5)^{1.222} = 0.4285\dots \qquad T = 20 + 70(0.4285\dots) = 20 + 29.995 = 49.995$$

The temperature is $50^\circ C$ to the nearest whole number, so the answer checks. The
tiny difference comes from rounding the time to two decimal places.

</details>
</details>
</details>

## A question from Chapter 1

**9.** Simplify $2^3 \times 2^4$.

<details markdown="1">
<summary>Hint</summary>

Adding the indices multiplies the powers.

<details markdown="1">
<summary>Next step</summary>

$2^3 \times 2^4 = 2^{3+4}$.

<details markdown="1">
<summary>Full working</summary>

$$2^3 \times 2^4 = 2^7 = 128$$

This index law is the one behind $\log(xy) = \log x + \log y$.

</details>
</details>
</details>
