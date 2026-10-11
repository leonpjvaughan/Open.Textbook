---
title: 7.2 Differentiation from first principles — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.2'
section_title: Differentiation from first principles
dfe:
- G1
kind: guided-problems
---

# 7.2 Differentiation from first principles — Practise with help

Work each question closed book first. Write the four steps in order before you
start: write $f(x + h)$, subtract $f(x)$, divide by $h$, then let $h$ tend to
zero.

## Warm-up: remember

1. Expand $(x + h)^2$.
2. Expand $(x + h)^3$.
3. Simplify $\dfrac{4h^2 + 2h}{h}$.

<details markdown="1">
<summary>Answers</summary>

1. $(x + h)^2 = x^2 + 2xh + h^2$.
2. $(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$.
3. Divide each term by $h$: $4h + 2$.

If question 2 was hard, revise the binomial expansion in Chapter 4 before you
continue.
</details>

## Practise with help

**1.** Differentiate $f(x) = x^2 + 1$ from first principles.

<details markdown="1">
<summary>Hint</summary>

Write $f(x + h) = (x + h)^2 + 1$, then expand the bracket. The constant $1$
appears on both sides and cancels when you subtract.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(x + h) - f(x) = (x^2 + 2xh + h^2 + 1) - (x^2 + 1) = 2xh + h^2$. Divide this
by $h$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{2xh + h^2}{h} = 2x + h.
$$

Let $h \to 0$:

$$
f'(x) = 2x.
$$

The constant $1$ does not change the gradient, so the answer is the same as for
$x^2$.
</details>

**2.** Differentiate $f(x) = 3x^2$ from first principles.

<details markdown="1">
<summary>Hint</summary>

The factor $3$ multiplies the whole bracket. Write
$f(x + h) = 3(x + h)^2$, expand the bracket, then multiply each term by $3$.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(x + h) = 3x^2 + 6xh + 3h^2$. Subtract $3x^2$, then divide the result by $h$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f(x + h) - f(x) = 6xh + 3h^2,
\qquad
\frac{6xh + 3h^2}{h} = 6x + 3h.
$$

Let $h \to 0$:

$$
f'(x) = 6x.
$$

The constant multiple $3$ multiplied the derivative by $3$.
</details>

**3.** Differentiate $f(x) = x^2 - x$ from first principles.

<details markdown="1">
<summary>Hint</summary>

Handle the two terms separately. For the term $-x$, write $-(x + h)$ and expand
the bracket with its sign.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(x + h) = x^2 + 2xh + h^2 - x - h$. Subtract $f(x) = x^2 - x$ to leave
$2xh + h^2 - h$, then divide by $h$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f(x + h) - f(x) = 2xh + h^2 - h,
\qquad
\frac{2xh + h^2 - h}{h} = 2x + h - 1.
$$

Let $h \to 0$:

$$
f'(x) = 2x - 1.
$$

Each term of the function contributes its own part of the derivative.
</details>

**4.** Differentiate $f(x) = x^3 + x$ from first principles.

<details markdown="1">
<summary>Hint</summary>

Use the expansion $(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$ for the cubic term,
and expand $(x + h)$ for the linear term.
</details>

<details markdown="1">
<summary>Next step</summary>

After subtracting $f(x) = x^3 + x$, the difference is
$3x^2h + 3xh^2 + h^3 + h$. Divide every term by $h$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{3x^2h + 3xh^2 + h^3 + h}{h} = 3x^2 + 3xh + h^2 + 1.
$$

Let $h \to 0$. The terms $3xh$ and $h^2$ vanish:

$$
f'(x) = 3x^2 + 1.
$$
</details>

**5.** A student differentiates $f(x) = x^2$ like this:

> Put $h = 0$ in $f(x + h) - f(x)$. This gives $0$. So the gradient is $0$.

Explain the mistake and write the correct first step.

<details markdown="1">
<summary>Hint</summary>

What happens to the fraction $\dfrac{f(x + h) - f(x)}{h}$ if you put $h = 0$
straight away?
</details>

<details markdown="1">
<summary>Next step</summary>

With $h = 0$ the numerator and the denominator are both zero. The expression
$\dfrac{0}{0}$ has no value. The student must divide by $h$ and cancel it
first.
</details>

<details markdown="1">
<summary>Full working</summary>

Setting $h = 0$ too early gives $\dfrac{0}{0}$, which is undefined. The correct
first move is to write $f(x + h) - f(x) = 2xh + h^2$, then divide by $h$ to get
$2x + h$. Only then does letting $h \to 0$ give $f'(x) = 2x$, not $0$.
</details>

**6.** Differentiate $f(x) = 5$ from first principles, and explain the answer by
referring to the graph of $f$.

<details markdown="1">
<summary>Hint</summary>

For a constant function, $f(x + h)$ is the same number as $f(x)$. What is their
difference?
</details>

<details markdown="1">
<summary>Next step</summary>

$f(x + h) - f(x) = 5 - 5 = 0$. Divide by $h$ to get $0$, then take the limit.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{f(x + h) - f(x)}{h} = \frac{5 - 5}{h} = 0,
\qquad
f'(x) = \lim_{h \to 0} 0 = 0.
$$

The graph of $f(x) = 5$ is a horizontal line. A horizontal line has gradient
zero everywhere, which matches the answer.
</details>
