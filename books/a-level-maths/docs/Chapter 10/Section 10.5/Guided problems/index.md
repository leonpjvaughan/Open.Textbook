---
title: 10.5 Vectors in pure mathematics and in context — Practise with help
chapter: 10
chapter_title: Vectors
section: '10.5'
section_title: Vectors in pure mathematics and in context
refs:
- J5
- OT2
kind: guided-problems
---

# 10.5 Vectors in pure mathematics and in context — Practise with help

Work each one first, closed book. For a proof, write down the two vectors you
will compare. For a motion or force problem, sketch the situation and choose
axes before you add anything.

## Warm-up: remember

1. Solve $3x - 4 = 11$.
2. Find the midpoint of $A(2, 1)$ and $B(8, 5)$.
3. Find the magnitude of $4\mathbf{i} - 3\mathbf{j}$.

<details markdown="1">
<summary>Answers</summary>

1. Add $4$ to both sides: $3x = 15$, so $x = 5$.
2. The midpoint is $\left(\dfrac{2 + 8}{2}, \dfrac{1 + 5}{2}\right) = (5, 3)$.
3. $\sqrt{4^2 + (-3)^2} = \sqrt{25} = 5$.

If question 1 was hard, revise solving linear equations before you continue.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Show that $A(0, 1)$, $B(2, 5)$ and $C(4, 9)$ are collinear.

<details markdown="1">
<summary>Hint</summary>

Find $\vec{AB}$ and $\vec{BC}$. If one is a multiple of the other, and they share
$B$, the points are collinear.

</details>

<details markdown="1">
<summary>Next step</summary>

$\vec{AB} = (2 - 0)\mathbf{i} + (5 - 1)\mathbf{j}$. Work out $\vec{BC}$ the same
way and compare.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\vec{AB} = 2\mathbf{i} + 4\mathbf{j},
\qquad
\vec{BC} = 2\mathbf{i} + 4\mathbf{j}.
$$

So $\vec{AB} = \vec{BC}$, and the two vectors share the point $B$. The three
points lie on one straight line.
</details>

**2.** The quadrilateral has vertices $A(1, 1)$, $B(4, 1)$, $C(4, 4)$ and
$D(1, 4)$. Show that it is a parallelogram.

<details markdown="1">
<summary>Hint</summary>

A quadrilateral is a parallelogram when one pair of opposite sides is equal and
parallel. Compare $\vec{AB}$ with $\vec{DC}$.

</details>

<details markdown="1">
<summary>Next step</summary>

$\vec{AB} = (4 - 1)\mathbf{i} + (1 - 1)\mathbf{j}$. For $\vec{DC}$, subtract
$D$ from $C$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\vec{AB} = 3\mathbf{i},
\qquad
\vec{DC} = (4 - 1)\mathbf{i} + (4 - 4)\mathbf{j} = 3\mathbf{i}.
$$

So $\vec{AB} = \vec{DC}$. One pair of opposite sides is equal and parallel, so
$ABCD$ is a parallelogram.
</details>

**3.** The points are $A(0, 0)$ and $B(6, 3)$. Find the point $P$ on $AB$ with
$AP : PB = 2 : 1$.

<details markdown="1">
<summary>Hint</summary>

Use $\vec{OP} = \dfrac{n\mathbf{a} + m\mathbf{b}}{m + n}$ with $m = 2$ and
$n = 1$.

</details>

<details markdown="1">
<summary>Next step</summary>

Work out $\dfrac{1 \times \mathbf{a} + 2 \times \mathbf{b}}{3}$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\vec{OP} = \frac{\mathbf{a} + 2\mathbf{b}}{3} =
\frac{0 + 2(6\mathbf{i} + 3\mathbf{j})}{3} =
\frac{12\mathbf{i} + 6\mathbf{j}}{3} =
4\mathbf{i} + 2\mathbf{j}.
$$

So $P$ is $(4, 2)$. Check: $\vec{AP} = 4\mathbf{i} + 2\mathbf{j}$ and
$\vec{PB} = 2\mathbf{i} + \mathbf{j}$, so $AP : PB = 2 : 1$.
</details>

**4.** Forces $\mathbf{F}_1 = 2\mathbf{i} + 5\mathbf{j}$ N and
$\mathbf{F}_2 = -3\mathbf{i} + \mathbf{j}$ N act at a point. Find the force
$\mathbf{F}_3$ that keeps the point still, and its magnitude.

<details markdown="1">
<summary>Hint</summary>

In equilibrium the three forces sum to zero, so $\mathbf{F}_3$ is the negative
of the sum of the first two.

</details>

<details markdown="1">
<summary>Next step</summary>

$\mathbf{F}_1 + \mathbf{F}_2 = -\mathbf{i} + 6\mathbf{j}$. Change each sign.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\mathbf{F}_1 + \mathbf{F}_2 = (2 - 3)\mathbf{i} + (5 + 1)\mathbf{j} = -\mathbf{i} + 6\mathbf{j},
$$

$$
\mathbf{F}_3 = -(-\mathbf{i} + 6\mathbf{j}) = \mathbf{i} - 6\mathbf{j} \text{ N}.
$$

$$
|\mathbf{F}_3| = \sqrt{1^2 + (-6)^2} = \sqrt{37} \approx 6.08 \text{ N}.
$$

</details>

**5.** A particle starts at position vector $\mathbf{r}_0 = \mathbf{i} + 2\mathbf{j}$
m and moves with velocity $\mathbf{v} = 2\mathbf{i} + 3\mathbf{j}$ m/s. Find its
position after $5$ s and its distance from the origin then.

<details markdown="1">
<summary>Hint</summary>

Use $\mathbf{r} = \mathbf{r}_0 + \mathbf{v}t$. Multiply the velocity by the time
before you add.

</details>

<details markdown="1">
<summary>Next step</summary>

$5\mathbf{v} = 10\mathbf{i} + 15\mathbf{j}$. Add this to $\mathbf{r}_0$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\mathbf{r} = (\mathbf{i} + 2\mathbf{j}) + 5(2\mathbf{i} + 3\mathbf{j}) =
11\mathbf{i} + 17\mathbf{j}.
$$

The position is $(11, 17)$ m. The distance from the origin is

$$
|\mathbf{r}| = \sqrt{11^2 + 17^2} = \sqrt{121 + 289} = \sqrt{410} \approx 20.2 \text{ m}.
$$

</details>

**6.** A boat moves at $4\mathbf{i}$ m/s through still water. A current flows at
$-3\mathbf{j}$ m/s. Find the resultant velocity, the speed and the direction from
the positive $x$-axis.

<details markdown="1">
<summary>Hint</summary>

Add the two velocities first. The speed is the magnitude of the resultant, and
the direction comes from its components.

</details>

<details markdown="1">
<summary>Next step</summary>

The resultant is $4\mathbf{i} - 3\mathbf{j}$. Find its length, then use the signs
to place the direction below the positive $x$-axis.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\mathbf{v} = 4\mathbf{i} - 3\mathbf{j},
\qquad
|\mathbf{v}| = \sqrt{4^2 + (-3)^2} = 5 \text{ m/s}.
$$

The direction is $\tan^{-1}\left(\frac{3}{4}\right) = 36.9^\circ$ below the
positive $x$-axis, which is $-36.9^\circ$ or $323.1^\circ$ anticlockwise.
</details>

**7.** A plane flies at $150$ km/h due east. A wind of $40$ km/h blows from the
north, so it pushes the plane due south. Find the resultant velocity, the speed
and the direction.

<details markdown="1">
<summary>Hint</summary>

Take east as $\mathbf{i}$. The plane gives $150\mathbf{i}$, and the wind gives
$-40\mathbf{j}$.

</details>

<details markdown="1">
<summary>Next step</summary>

Work out $\sqrt{150^2 + 40^2}$ and $\tan^{-1}\left(\frac{40}{150}\right)$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\mathbf{v} = 150\mathbf{i} - 40\mathbf{j},
\qquad
|\mathbf{v}| = \sqrt{150^2 + 40^2} = \sqrt{24100} \approx 155.2 \text{ km/h}.
$$

The direction is $\tan^{-1}\left(\frac{40}{150}\right) = 14.9^\circ$ south of
east. The wind has pushed the plane off its due-east course.
</details>

**8.** Show that $A(1, 1)$, $B(3, 5)$ and $C(6, 11)$ are collinear.

<details markdown="1">
<summary>Hint</summary>

This time the multiplier is not $1$. Show that $\vec{BC}$ is a multiple of
$\vec{AB}$, and name the shared point.

</details>

<details markdown="1">
<summary>Next step</summary>

$\vec{AB} = 2\mathbf{i} + 4\mathbf{j}$ and $\vec{BC} = 3\mathbf{i} + 6\mathbf{j}$.
What number multiplies $\vec{AB}$ to give $\vec{BC}$?

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\vec{AB} = 2\mathbf{i} + 4\mathbf{j},
\qquad
\vec{BC} = 3\mathbf{i} + 6\mathbf{j} = \frac{3}{2}\left(2\mathbf{i} + 4\mathbf{j}\right) = \frac{3}{2}\vec{AB}.
$$

So $\vec{BC}$ is a positive multiple of $\vec{AB}$. The two vectors share the
point $B$, so $A$, $B$ and $C$ are collinear.
</details>
