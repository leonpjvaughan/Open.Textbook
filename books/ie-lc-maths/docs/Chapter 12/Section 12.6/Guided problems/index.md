---
title: "12.6 The sine and cosine rules — Practise with help"
chapter: 12
chapter_title: Trigonometry
section: "12.6"
section_title: The sine and cosine rules
tier: O
refs:
- '2.3'
kind: guided-problems
---

# 12.6 The sine and cosine rules — Practise with help

## Warm-up: remember

1. A right triangle has hypotenuse $13$ cm and one leg $5$ cm. Find the other leg.
2. Write down the exact value of $\sin 120^\circ$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $b^2 = 169 - 25 = 144$, so $b = 12$ cm. The hypotenuse is known, so subtract.
2. $\dfrac{\sqrt{3}}{2}$. The angle is in the second quadrant, where sine is positive.

</details>

:::figure warm-up-gate


## Practise with help

**1.** In a triangle, $A = 50^\circ$, $B = 70^\circ$ and $a = 9$ cm. Find $b$, correct to
two decimal places.

<details markdown="1">
<summary>Hint</summary>

You know a side and its opposite angle, and you want the side opposite $B$. Use the sine
rule.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{b}{\sin 70^\circ} = \dfrac{9}{\sin 50^\circ}$.

<details markdown="1">
<summary>Full working</summary>

$$b = \frac{9\sin 70^\circ}{\sin 50^\circ} = \frac{9 \times 0.9397}{0.7660} = 11.04 \text{ cm}$$

$B$ is larger than $A$, so $b$ must be larger than $a$. It is, which is the check.

</details>
</details>
</details>

**2.** In a triangle, $b = 7$ cm, $c = 10$ cm and $A = 60^\circ$. Find $a$, correct to two
decimal places.

<details markdown="1">
<summary>Hint</summary>

Two sides and the angle between them. Use the cosine rule.

<details markdown="1">
<summary>Next step</summary>

$a^2 = 49 + 100 - 2(7)(10)\cos 60^\circ$.

<details markdown="1">
<summary>Full working</summary>

$$a^2 = 149 - 140 \times 0.5 = 149 - 70 = 79$$

$$a = \sqrt{79} = 8.89 \text{ cm}$$

The side $a$ is between $b$ and $c$, which is what an angle of $60^\circ$ between them
should give.

</details>
</details>
</details>

**3.** A triangle has sides of $6$ cm, $8$ cm and $11$ cm. Find the largest angle, correct
to one decimal place.

<details markdown="1">
<summary>Hint</summary>

The largest angle is opposite the largest side, so find $C$ opposite $c = 11$.

<details markdown="1">
<summary>Next step</summary>

$121 = 36 + 64 - 2(6)(8)\cos C$.

<details markdown="1">
<summary>Full working</summary>

$$121 = 100 - 96\cos C \qquad 96\cos C = -21 \qquad \cos C = -0.21875$$

$$C = \cos^{-1}(-0.21875) = 102.6^\circ$$

The angle is obtuse, which fits a triangle with one side much longer than the other two.

</details>
</details>
</details>

**4.** In a triangle, $a = 12$ cm, $b = 9$ cm and $A = 80^\circ$. Find the two possible
values of $B$, each correct to one decimal place.

<details markdown="1">
<summary>Hint</summary>

The sine rule will give $\sin B$. Both an acute and an obtuse angle have that sine.

<details markdown="1">
<summary>Next step</summary>

$\sin B = \dfrac{9\sin 80^\circ}{12}$.

<details markdown="1">
<summary>Full working</summary>

$$\sin B = \frac{9 \times 0.9848}{12} = 0.7386$$

$$B = 47.6^\circ \quad\text{or}\quad 180^\circ - 47.6^\circ = 132.4^\circ$$

Now test both candidates against the angle sum. With $B = 132.4^\circ$, the third angle
would be $180^\circ - 80^\circ - 132.4^\circ = -32.4^\circ$, which is impossible. With
$B = 47.6^\circ$ the third angle is $52.4^\circ$, which is fine.

So only $B = 47.6^\circ$ is possible here. The two-answer case offers two candidates, and
the angle sum then decides which of them are real. Here $a$ is longer than $b$, and that
is the shape that gives one answer.

</details>
</details>
</details>

**5.** A Coast Guard station and a lighthouse are $8$ km apart. From the station the
bearing of a yacht is $048^\circ$, and from the lighthouse it is $330^\circ$, so
$\angle LCY = 42^\circ$ and $\angle CLY = 60^\circ$. Find $LY$, correct to three
significant figures.

<details markdown="1">
<summary>Hint</summary>

Find the third angle first: $180^\circ - 42^\circ - 60^\circ$.

<details markdown="1">
<summary>Next step</summary>

The angle at the yacht is $78^\circ$. Now use the sine rule with the pair $CL$ and its
opposite angle.

<details markdown="1">
<summary>Full working</summary>

$$\frac{LY}{\sin 42^\circ} = \frac{8}{\sin 78^\circ}$$

$$LY = \frac{8 \times 0.6691}{0.9781} = 5.47 \text{ km}$$

The yacht is nearer the lighthouse than the station. This is the chapter problem's
triangle.

</details>
</details>
</details>

**6.** In the same triangle, find $CY$, correct to three significant figures, and check
it with the cosine rule.

<details markdown="1">
<summary>Hint</summary>

$CY$ is opposite the $60^\circ$ angle at the lighthouse.

<details markdown="1">
<summary>Next step</summary>

$CY = \dfrac{8\sin 60^\circ}{\sin 78^\circ}$.

<details markdown="1">
<summary>Full working</summary>

$$CY = \frac{8 \times 0.8660}{0.9781} = 7.08 \text{ km}$$

Check with the cosine rule, using $CL = 8$, $LY = 5.47$ and the angle between them:

$$CY^2 = 64 + 29.92 - 2(8)(5.47)\cos 60^\circ = 93.92 - 43.76 = 50.16$$

$$CY = 7.08 \text{ km}$$

Both rules agree, so the pairing was right.

</details>
</details>
</details>

## A question from Section 12.1

**7.** In a right triangle the side opposite $\theta$ is $6$ cm and the hypotenuse is
$10$ cm. Find $\theta$, correct to one decimal place.

<details markdown="1">
<summary>Hint</summary>

A right triangle is a special case. You can still use the sine rule, but the ratio is
faster.

<details markdown="1">
<summary>Next step</summary>

$\sin\theta = \dfrac{6}{10} = 0.6$.

<details markdown="1">
<summary>Full working</summary>

$$\theta = \sin^{-1}(0.6) = 36.9^\circ$$

The cosine rule also works on this triangle. With $A = 90^\circ$ the correction term
$2bc\cos A$ is zero, and the cosine rule becomes $a^2 = b^2 + c^2$, which is Pythagoras.
So the rules of this section contain the rules of Sections 12.1 and 12.2 as special
cases.

</details>
</details>
</details>
