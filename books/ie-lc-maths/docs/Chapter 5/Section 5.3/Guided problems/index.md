---
title: "5.3 The complex conjugate and division — Practise with help"
chapter: 5
chapter_title: Complex numbers
section: "5.3"
section_title: The complex conjugate and division
tier: O
refs:
- '4.4'
kind: guided-problems
---

# 5.3 The complex conjugate and division — Practise with help

## Warm-up: remember

1. Expand $(a + b)(a - b)$.
2. Work out $(2 + 3i)(2 - 3i)$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $a^2 - b^2$.
2. $4 - 9i^2 = 4 + 9 = 13$. The answer is real — that is the conjugate doing its job.

</details>

## Practise with help

**1.** Write down the conjugate of each: $3 + 5i$, $-2 - i$, $7i$, $-4$.

<details markdown="1">
<summary>Hint</summary>

Change the sign of the imaginary part only.

<details markdown="1">
<summary>Next step</summary>

For $-4$, write it as $-4 + 0i$ first.

<details markdown="1">
<summary>Full working</summary>

$$\overline{3 + 5i} = 3 - 5i \qquad \overline{-2 - i} = -2 + i \qquad \overline{7i} = -7i \qquad \overline{-4} = -4$$

A real number is its own conjugate, because its imaginary part is already zero.

</details>
</details>
</details>

**2.** Work out $(5 + 2i)(5 - 2i)$.

<details markdown="1">
<summary>Hint</summary>

Difference of two squares.

<details markdown="1">
<summary>Next step</summary>

$25 - 4i^2$.

<details markdown="1">
<summary>Full working</summary>

$$25 - 4i^2 = 25 + 4 = 29$$

The answer is real and positive, as $z\bar z$ always is.

</details>
</details>
</details>

**3.** Write $\dfrac{4 + i}{2 - i}$ in the form $a + bi$.

<details markdown="1">
<summary>Hint</summary>

Multiply top and bottom by $2 + i$.

<details markdown="1">
<summary>Next step</summary>

Top: $(4 + i)(2 + i)$. Bottom: $(2 - i)(2 + i) = 5$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{4 + i}{2 - i} = \frac{(4 + i)(2 + i)}{(2 - i)(2 + i)} = \frac{8 + 4i + 2i + i^2}{5} = \frac{7 + 6i}{5} = \frac{7}{5} + \frac{6}{5}i$$

The bottom became $5$, a real number. That is what makes the answer standard form.

</details>
</details>
</details>

**4.** Write $\dfrac{3i}{1 + i}$ in the form $a + bi$.

<details markdown="1">
<summary>Hint</summary>

The conjugate of $1 + i$ is $1 - i$.

<details markdown="1">
<summary>Next step</summary>

Top: $3i(1 - i)$. Bottom: $2$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{3i}{1 + i} = \frac{3i(1 - i)}{(1 + i)(1 - i)} = \frac{3i - 3i^2}{2} = \frac{3 + 3i}{2} = \frac{3}{2} + \frac{3}{2}i$$

Note $-3i^2 = +3$, which is where the real part comes from. A numerator with no real part
can still produce one.

</details>
</details>
</details>

**5.** For $z = 2 + 5i$, work out $z\bar z$, $|z|^2$ and $|z|$.

<details markdown="1">
<summary>Hint</summary>

$z\bar z = a^2 + b^2$.

<details markdown="1">
<summary>Next step</summary>

$2^2 + 5^2 = 29$.

<details markdown="1">
<summary>Full working</summary>

$$z\bar z = 2^2 + 5^2 = 29 \qquad |z|^2 = 29 \qquad |z| = \sqrt{29}$$

$\sqrt{29}$ does not simplify, so leave it as a surd.

</details>
</details>
</details>

**6.** Explain why $\dfrac{z}{\bar z}$ always has modulus 1.

<details markdown="1">
<summary>Hint</summary>

Use $|z / w| = |z| / |w|$ and the fact that $|\bar z| = |z|$.

<details markdown="1">
<summary>Next step</summary>

$\left|\dfrac{z}{\bar z}\right| = \dfrac{|z|}{|\bar z|}$.

<details markdown="1">
<summary>Full working</summary>

The conjugate has the same modulus as the number: $|\bar z| = |z|$, because the modulus is
$\sqrt{a^2 + b^2}$ and changing the sign of $b$ does not change $b^2$.

So

$$\left|\frac{z}{\bar z}\right| = \frac{|z|}{|\bar z|} = \frac{|z|}{|z|} = 1$$

A number with modulus 1 lies on the unit circle of the Argand diagram, one unit from the
origin.

</details>
</details>
</details>

## A question from Section 5.2

**7.** Show that $\dfrac{1}{i} = -i$ by multiplying top and bottom by a suitable number.

<details markdown="1">
<summary>Hint</summary>

The conjugate of $i$ is $-i$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{1}{i} = \dfrac{1 \times (-i)}{i \times (-i)}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{1}{i} = \frac{-i}{i(-i)} = \frac{-i}{-i^2} = \frac{-i}{1} = -i$$

So $\dfrac{1}{i} = -i$, which agrees with Section 5.1.

</details>
</details>
</details>
