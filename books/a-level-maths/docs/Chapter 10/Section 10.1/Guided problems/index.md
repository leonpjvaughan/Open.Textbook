---
title: 10.1 Vectors in two and three dimensions — Practise with help
chapter: 10
chapter_title: Vectors
section: '10.1'
section_title: Vectors in two and three dimensions
refs:
- J1
kind: guided-problems
---

# 10.1 Vectors in two and three dimensions — Practise with help

Work each one first, closed book. Before you write a vector, decide which point
you are moving from and which point you are moving to.

## Warm-up: remember

1. Work out $\sqrt{3^2 + 4^2}$.
2. Work out $5 - (-3)$ and $-2 - 6$.
3. The point $P$ is $3$ units right and $4$ units up from the origin $O$. Write
   the coordinates of $P$.

<details markdown="1">
<summary>Answers</summary>

1. $3^2 + 4^2 = 9 + 16 = 25$, so $\sqrt{25} = 5$.
2. $5 - (-3) = 5 + 3 = 8$, and $-2 - 6 = -8$.
3. Moving right adds to $x$ and moving up adds to $y$, so $P$ is $(3, 4)$.

If question 2 was hard, revisit subtracting negative numbers before you
continue.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Write the displacement from $A(2, 1)$ to $B(7, 5)$ as a column vector
and in $\mathbf{i}$, $\mathbf{j}$ form.

<details markdown="1">
<summary>Hint</summary>

Subtract the coordinates of $A$ from the coordinates of $B$. Keep the $x$ values
on the top.

</details>

<details markdown="1">
<summary>Next step</summary>

The $x$-component is $7 - 2 = 5$. The $y$-component is $5 - 1 = 4$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\vec{AB} =
\begin{pmatrix} 7 - 2 \\ 5 - 1 \end{pmatrix} =
\begin{pmatrix} 5 \\ 4 \end{pmatrix} = 5\mathbf{i} + 4\mathbf{j}.
$$

The vector moves $5$ units right and $4$ units up.
</details>

**2.** Write the displacement from $B(7, 5)$ to $A(2, 1)$.

<details markdown="1">
<summary>Hint</summary>

This displacement is the reverse of the one from question 1. Predict the signs
before you calculate.

</details>

<details markdown="1">
<summary>Next step</summary>

Subtract $B$ from $A$: $2 - 7$ on the top and $1 - 5$ on the bottom.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\vec{BA} =
\begin{pmatrix} 2 - 7 \\ 1 - 5 \end{pmatrix} =
\begin{pmatrix} -5 \\ -4 \end{pmatrix} = -5\mathbf{i} - 4\mathbf{j}.
$$

This is $-\vec{AB}$, so the arrow points the opposite way.
</details>

**3.** A vector is $\mathbf{a} = 2\mathbf{i} + 3\mathbf{j}$. Write down
$3\mathbf{a}$ and $-\mathbf{a}$.

<details markdown="1">
<summary>Hint</summary>

Multiplying by a scalar multiplies each component separately. A negative scalar
also reverses the direction.

</details>

<details markdown="1">
<summary>Next step</summary>

For $3\mathbf{a}$, work out $3 \times 2$ and $3 \times 3$. For $-\mathbf{a}$,
change the sign of each component.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
3\mathbf{a} = 6\mathbf{i} + 9\mathbf{j},
\qquad
-\mathbf{a} = -2\mathbf{i} - 3\mathbf{j}.
$$

Both new vectors are parallel to $\mathbf{a}$.
</details>

**4.** Show that $\mathbf{u} = \mathbf{i} - 2\mathbf{j}$ and
$\mathbf{v} = -3\mathbf{i} + 6\mathbf{j}$ are parallel.

<details markdown="1">
<summary>Hint</summary>

Compare the components. Work out what number multiplies each component of
$\mathbf{u}$ to give the matching component of $\mathbf{v}$.

</details>

<details markdown="1">
<summary>Next step</summary>

The $x$-component changes from $1$ to $-3$, which suggests a multiplier of $-3$.
Check the $y$-component too.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
-3\mathbf{u} = -3(\mathbf{i} - 2\mathbf{j}) = -3\mathbf{i} + 6\mathbf{j} = \mathbf{v}.
$$

The two vectors are parallel. The multiplier is negative, so they point in
opposite directions.
</details>

**5.** Write the displacement from $P(1, 0, 2)$ to $Q(4, 3, -2)$ in
$\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$ form.

<details markdown="1">
<summary>Hint</summary>

This time there are three coordinates. Subtract $P$ from $Q$ in each position:
$x$, then $y$, then $z$.

</details>

<details markdown="1">
<summary>Next step</summary>

The components are $4 - 1$, $3 - 0$ and $-2 - 2$. Take care with the last one.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\vec{PQ} =
\begin{pmatrix} 4 - 1 \\ 3 - 0 \\ -2 - 2 \end{pmatrix} =
\begin{pmatrix} 3 \\ 3 \\ -4 \end{pmatrix} = 3\mathbf{i} + 3\mathbf{j} - 4\mathbf{k}.
$$

The negative $z$-component means the displacement is downwards.
</details>

**6.** A vector is $\mathbf{w} = 4\mathbf{i} - \mathbf{j} + 2\mathbf{k}$. Write
down the column form of $\mathbf{w}$ and of $\frac{1}{2}\mathbf{w}$.

<details markdown="1">
<summary>Hint</summary>

The column has three rows, one for each of $x$, $y$ and $z$. Halving works on
each row.

</details>

<details markdown="1">
<summary>Next step</summary>

Read the coefficients: $4$ for $\mathbf{i}$, $-1$ for $\mathbf{j}$ and $2$ for
$\mathbf{k}$. Then halve each one.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\mathbf{w} =
\begin{pmatrix} 4 \\ -1 \\ 2 \end{pmatrix},
\qquad
\frac{1}{2}\mathbf{w} =
\begin{pmatrix} 2 \\ -\frac{1}{2} \\ 1 \end{pmatrix}.
$$

The two vectors are parallel, and $\frac{1}{2}\mathbf{w}$ points the same way.
</details>

**7.** The points $A(1, 2)$, $B(4, 6)$ and $C(7, 10)$ lie on a straight line.
Show that $\vec{AB}$ and $\vec{BC}$ are equal.

<details markdown="1">
<summary>Hint</summary>

Work out each displacement separately, then compare the two columns.

</details>

<details markdown="1">
<summary>Next step</summary>

$\vec{AB}$ has components $4 - 1$ and $6 - 2$. For $\vec{BC}$, subtract $B$ from
$C$.

</details>

<details markdown="1">
<summary>Full working</summary>

$$
\vec{AB} =
\begin{pmatrix} 4 - 1 \\ 6 - 2 \end{pmatrix} =
\begin{pmatrix} 3 \\ 4 \end{pmatrix},
\qquad
\vec{BC} =
\begin{pmatrix} 7 - 4 \\ 10 - 6 \end{pmatrix} =
\begin{pmatrix} 3 \\ 4 \end{pmatrix}.
$$

The two displacements are equal. Equal displacement vectors in the same straight
line mean the same step repeats, so $A$, $B$ and $C$ stay on one line.
</details>
