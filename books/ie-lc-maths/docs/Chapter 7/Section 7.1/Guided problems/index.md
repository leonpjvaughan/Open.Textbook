---
title: 7.1 The derivative from first principles — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.1'
section_title: The derivative from first principles
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 7.1 The derivative from first principles — Practise with help

## Warm-up: remember

1. Expand $(x + 3)^2$.
2. Find the gradient of the line that passes through $(1, 2)$ and $(4, 11)$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $x^2 + 6x + 9$. The middle term is twice the product of $x$ and $3$.
2. The gradient is $\dfrac{11 - 2}{4 - 1} = \dfrac{9}{3} = 3$. Dividing the change in
   $y$ by the change in $x$ is the same calculation that gives an average gradient.

</details>

## Practise with help

**1.** Work out the average gradient of $y = x^2$ between $x = 1$ and $x = 2$.

<details markdown="1">
<summary>Hint</summary>

Use $\dfrac{y_2 - y_1}{x_2 - x_1}$ with the two points on the curve.

<details markdown="1">
<summary>Next step</summary>

At $x = 1$, $y = 1$. At $x = 2$, $y = 4$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{4 - 1}{2 - 1} = \frac{3}{1} = 3$$

The average gradient over that interval is $3$. The tangent at $x = 2$ has gradient $4$,
so the average is smaller.

</details>
</details>
</details>

**2.** Simplify $\dfrac{f(x + h) - f(x)}{h}$ for $f(x) = x^2$, without taking a limit.

<details markdown="1">
<summary>Hint</summary>

Work out $f(x + h) = (x + h)^2$ first, then subtract $f(x)$.

<details markdown="1">
<summary>Next step</summary>

$(x + h)^2 - x^2 = x^2 + 2xh + h^2 - x^2 = 2xh + h^2$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{2xh + h^2}{h} = \frac{h(2x + h)}{h} = 2x + h$$

The $h$ cancels, because $h$ is small but not zero. The expression $2x + h$ is the average
gradient over an interval of width $h$.

</details>
</details>
</details>

**3.** Differentiate $f(x) = x^2$ from first principles.

<details markdown="1">
<summary>Hint</summary>

Start from $2x + h$ and let $h$ go to zero.

<details markdown="1">
<summary>Next step</summary>

As $h$ shrinks, the term $h$ disappears.

<details markdown="1">
<summary>Full working</summary>

$$\frac{(x + h)^2 - x^2}{h} = 2x + h \quad \longrightarrow \quad 2x$$

So $f'(x) = 2x$. At $x = 3$ the gradient of the tangent is $6$.

</details>
</details>
</details>

**4.** Differentiate $f(x) = 3x^2$ from first principles.

<details markdown="1">
<summary>Hint</summary>

The factor $3$ multiplies every term in the expansion.

<details markdown="1">
<summary>Next step</summary>

$3(x + h)^2 - 3x^2 = 3x^2 + 6xh + 3h^2 - 3x^2 = 6xh + 3h^2$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{6xh + 3h^2}{h} = 6x + 3h \quad \longrightarrow \quad 6x$$

So $f'(x) = 6x$. This is $3$ times the derivative of $x^2$, which is $2x$.

</details>
</details>
</details>

**5.** Differentiate $f(x) = 5x + 2$ from first principles.

<details markdown="1">
<summary>Hint</summary>

Substitute $x + h$ into the rule and subtract.

<details markdown="1">
<summary>Next step</summary>

$(5(x + h) + 2) - (5x + 2) = 5h$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{5h}{h} = 5$$

So $f'(x) = 5$, which is the gradient of the line. The constant $2$ shifts the line up and
down but does not change its gradient.

</details>
</details>
</details>

**6.** Differentiate $f(x) = x^3$ from first principles.

<details markdown="1">
<summary>Hint</summary>

Expand $(x + h)^3$ and look for the terms that contain $h$.

<details markdown="1">
<summary>Next step</summary>

$(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{3x^2h + 3xh^2 + h^3}{h} = 3x^2 + 3xh + h^2
\quad \longrightarrow \quad 3x^2$$

So $f'(x) = 3x^2$. Every term except $3x^2$ carried an $h$ and vanished in the limit.

</details>
</details>
</details>

**7.** The tank volume is $V(t) = 12t^2 - t^3$ litres. Estimate the rate at $t = 4$ minutes
using the average rate from $t = 4$ to $t = 4.1$.

<details markdown="1">
<summary>Hint</summary>

Work out $V(4)$ and $V(4.1)$, then divide the change by $0.1$.

<details markdown="1">
<summary>Next step</summary>

$V(4) = 128$ and $V(4.1) = 132.799$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{132.799 - 128}{0.1} = \frac{4.799}{0.1} = 47.99$$

The rate is about $48$ litres per minute at $t = 4$. The exact value is found in
Section 7.2, and it is $48$.

</details>
</details>
</details>

## A question from Chapter 6

**8.** The coffee temperature is $T(t) = 20 + 70(0.5)^{t/5}$ degrees Celsius. Work out the
average rate of change of the temperature between $t = 0$ and $t = 5$ minutes.

<details markdown="1">
<summary>Hint</summary>

Work out $T(0)$ and $T(5)$, then divide the change by $5$.

<details markdown="1">
<summary>Next step</summary>

$T(0) = 90$ and $T(5) = 55$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{55 - 90}{5} = \frac{-35}{5} = -7$$

The temperature falls at an average of $7^\circ C$ per minute. The negative sign records
that the temperature is decreasing. The rate is not constant, so the instantaneous rate at
one moment is found by differentiating instead.

</details>
</details>
</details>
