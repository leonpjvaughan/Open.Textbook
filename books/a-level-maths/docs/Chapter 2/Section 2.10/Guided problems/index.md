---
title: 2.10 Composite and inverse functions — Practise with help
chapter: 2
chapter_title: Algebra and functions
section: '2.10'
section_title: Composite and inverse functions
refs:
- B8
- OT1
kind: guided-problems
---

# 2.10 Composite and inverse functions — Practise with help

Work each one first, closed book. For a composite, decide which function acts
first. For an inverse, write $y = f(x)$ and make $x$ the subject before you swap
the letters.

## Warm-up: remember

1. Work out $f(3)$ for $f(x) = 2x + 1$.
2. Make $x$ the subject of $y = 4x - 5$.
3. Solve $x^2 = 9$.

<details markdown="1">
<summary>Answers</summary>

1. $f(3) = 2 \times 3 + 1 = 7$.
2. $y + 5 = 4x$, so $x = \dfrac{y + 5}{4}$.
3. $x = 3$ or $x = -3$.

If question 2 was hard, revisit rearranging: undo each operation in reverse
order.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Given $f(x) = x + 4$ and $g(x) = 2x$, find $f(g(x))$ and $g(f(x))$.

<details markdown="1">
<summary>Hint</summary>

For $f(g(x))$, the input to $f$ is $2x$. For $g(f(x))$, the input to $g$ is
$x + 4$.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(g(x)) = (2x) + 4$, and $g(f(x)) = 2(x + 4)$.
</details>

<details markdown="1">
<summary>Full working</summary>

For $f(g(x))$, substitute $g(x) = 2x$ into $f$:

$$
f(g(x)) = 2x + 4.
$$

For $g(f(x))$, substitute $f(x) = x + 4$ into $g$:

$$
g(f(x)) = 2(x + 4) = 2x + 8.
$$

The two results differ, so the order matters.
</details>

**2.** Given $f(x) = x^2 - 1$ and $g(x) = x + 2$, find $f(g(1))$.

<details markdown="1">
<summary>Hint</summary>

Work from the inside out: find $g(1)$ first.
</details>

<details markdown="1">
<summary>Next step</summary>

$g(1) = 3$, so work out $f(3)$.
</details>

<details markdown="1">
<summary>Full working</summary>

First $g(1) = 1 + 2 = 3$. Then

$$
f(3) = 3^2 - 1 = 8.
$$

So $f(g(1)) = 8$.
</details>

**3.** Find the inverse of $f(x) = 4x + 7$.

<details markdown="1">
<summary>Hint</summary>

Write $y = 4x + 7$, then make $x$ the subject by subtracting $7$ and dividing
by $4$.
</details>

<details markdown="1">
<summary>Next step</summary>

$y - 7 = 4x$, so $x = \dfrac{y - 7}{4}$. Now swap the letters.
</details>

<details markdown="1">
<summary>Full working</summary>

Write $y = 4x + 7$ and rearrange:

$$
y - 7 = 4x, \qquad x = \frac{y - 7}{4}.
$$

Swap the letters:

$$
f^{-1}(x) = \frac{x - 7}{4}.
$$

Check: $f^{-1}(f(x)) = \frac{(4x + 7) - 7}{4} = \frac{4x}{4} = x$.
</details>

**4.** Find the inverse of $f(x) = \dfrac{2x + 1}{x - 3}$, where $x \neq 3$.

<details markdown="1">
<summary>Hint</summary>

Write $y = \frac{2x + 1}{x - 3}$ and multiply both sides by $x - 3$. Then collect
the $x$ terms.
</details>

<details markdown="1">
<summary>Next step</summary>

$y(x - 3) = 2x + 1$ gives $yx - 3y = 2x + 1$, so $x(y - 2) = 3y + 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

Write $y = \frac{2x + 1}{x - 3}$ and cross-multiply:

$$
y(x - 3) = 2x + 1, \qquad yx - 3y = 2x + 1.
$$

Collect the $x$ terms:

$$
yx - 2x = 3y + 1, \qquad x(y - 2) = 3y + 1, \qquad x = \frac{3y + 1}{y - 2}.
$$

Swap the letters:

$$
f^{-1}(x) = \frac{3x + 1}{x - 2}, \qquad x \neq 2.
$$
</details>

**5.** Show that $f(x) = x^2$ has no inverse on the whole real line, and find the
inverse of $f$ on the domain $x \geq 0$.

<details markdown="1">
<summary>Hint</summary>

For the first part, find two different inputs with the same output. For the
second, take the positive square root only.
</details>

<details markdown="1">
<summary>Next step</summary>

$f(3) = 9$ and $f(-3) = 9$, so the function is not one-to-one. On $x \geq 0$,
write $y = x^2$ and take the positive root.
</details>

<details markdown="1">
<summary>Full working</summary>

Two different inputs give the same output:

$$
f(3) = 3^2 = 9, \qquad f(-3) = (-3)^2 = 9.
$$

So the function is not one-to-one, and a reverse rule would not know whether to
return $3$ or $-3$. Restrict the domain to $x \geq 0$. Then $y = x^2$ gives
$x = \sqrt{y}$, and swapping the letters gives

$$
f^{-1}(x) = \sqrt{x}, \qquad x \geq 0.
$$
</details>

**6.** The function $g(x) = \sqrt{x - 1}$ is defined for $x \geq 1$. Find its
domain and range, and work out $g(10)$.

<details markdown="1">
<summary>Hint</summary>

The expression under the root must not be negative, which fixes the domain. A
square root is never negative, which fixes the range.
</details>

<details markdown="1">
<summary>Next step</summary>

The domain is $x - 1 \geq 0$. For the range, ask what values $\sqrt{x - 1}$ can
take as $x$ runs through the domain.
</details>

<details markdown="1">
<summary>Full working</summary>

The input of the square root must not be negative:

$$
x - 1 \geq 0, \qquad x \geq 1.
$$

So the domain is $x \geq 1$. Since a square root is never negative, the range is
$g(x) \geq 0$. For $x = 10$:

$$
g(10) = \sqrt{10 - 1} = \sqrt{9} = 3.
$$
</details>
