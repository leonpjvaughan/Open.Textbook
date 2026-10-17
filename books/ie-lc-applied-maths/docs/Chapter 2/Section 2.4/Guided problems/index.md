---
title: "2.4 Matrix algebra and the product of adjacency matrices — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.4"
section_title: Matrix algebra and the product of adjacency matrices
tier: O
refs:
- S2
kind: guided-problems
---

# 2.4 Matrix algebra and the product of adjacency matrices — Practise with help

## Warm-up: remember

1. A network has adjacency matrix
   $\begin{pmatrix} 0&1&1\\ 1&0&0\\ 1&0&0 \end{pmatrix}$. What is the degree of each
   vertex?
2. How many edges has it?

<details markdown="1">
<summary>Answers and feedback</summary>

1. Row sums: $2, 1, 1$.
2. $\sum \deg = 4$, so $E = 2$. The edges are $12$ and $13$.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Work out
$\begin{pmatrix} 2&1\\ 0&3 \end{pmatrix}\begin{pmatrix} 1&1\\ 1&0 \end{pmatrix}$.

<details markdown="1">
<summary>Hint</summary>

Row times column, four times.

<details markdown="1">
<summary>Next step</summary>

Row 1, column 1: $2 \times 1 + 1 \times 1$.

<details markdown="1">
<summary>Full working</summary>

- Row 1, column 1: $2 \times 1 + 1 \times 1 = 3$
- Row 1, column 2: $2 \times 1 + 1 \times 0 = 2$
- Row 2, column 1: $0 \times 1 + 3 \times 1 = 3$
- Row 2, column 2: $0 \times 1 + 3 \times 0 = 0$

$$
\begin{pmatrix} 3&2\\ 3&0 \end{pmatrix}
$$

</details>
</details>
</details>

**2.** A network has adjacency matrix
$M = \begin{pmatrix} 0&1&1\\ 1&0&1\\ 1&1&0 \end{pmatrix}$. Work out $M^2$.

<details markdown="1">
<summary>Hint</summary>

Each entry is a row of $M$ times a column of $M$.

<details markdown="1">
<summary>Next step</summary>

Row 1 of $M$ is $0,1,1$. Times column 1 ($0,1,1$) gives $0 + 1 + 1 = 2$.

<details markdown="1">
<summary>Full working</summary>

$$
M^2 = \begin{pmatrix} 2&1&1\\ 1&2&1\\ 1&1&2 \end{pmatrix}
$$

Check: the diagonal entries are the degrees. Every vertex here has degree $2$, and every
diagonal entry is $2$. The check passes.

</details>
</details>
</details>

**3.** For that network, how many walks of length 2 are there from vertex 1 to vertex 2?
List them.

<details markdown="1">
<summary>Hint</summary>

Read the entry in row 1, column 2 of $M^2$.

<details markdown="1">
<summary>Next step</summary>

The entry is $1$. Which middle vertex works?

<details markdown="1">
<summary>Full working</summary>

The entry in row 1, column 2 of $M^2$ is $1$, so there is exactly one walk of length 2
from 1 to 2. It is $1 \to 3 \to 2$: vertex 3 is the only vertex joined to both 1 and 2.

(Vertex 1 itself does not work as a middle vertex, because there is no loop at 1.)

</details>
</details>
</details>

**4.** For the same network, how many walks of length 3 are there from vertex 1 back to
vertex 1?

<details markdown="1">
<summary>Hint</summary>

You need the diagonal entry of $M^3$. Work out $M^2 \times M$.

<details markdown="1">
<summary>Next step</summary>

$M^3 = M^2 \times M$. Row 1 of $M^2$ is $2,1,1$. Times column 1 of $M$ ($0,1,1$).

<details markdown="1">
<summary>Full working</summary>

$$
M^3 = \begin{pmatrix} 2&1&1\\ 1&2&1\\ 1&1&2 \end{pmatrix}\begin{pmatrix} 0&1&1\\ 1&0&1\\ 1&1&0 \end{pmatrix}
= \begin{pmatrix} 2&3&3\\ 3&2&3\\ 3&3&2 \end{pmatrix}
$$

The diagonal entry for vertex 1 is $2$, so there are 2 walks of length 3 from 1 back to
1. They are $1 \to 2 \to 3 \to 1$ and $1 \to 3 \to 2 \to 1$: round the triangle in
either direction.

</details>
</details>
</details>

**5.** A student multiplies two matrices and gets a different answer from their
classmate. The classmate says "matrix multiplication is not commutative". Explain what
that means, with an example, and say which order is right.

<details markdown="1">
<summary>Hint</summary>

Try $\begin{pmatrix} 1&1\\ 0&1 \end{pmatrix}\begin{pmatrix} 1&0\\ 1&1 \end{pmatrix}$ and
then swap them.

<details markdown="1">
<summary>Next step</summary>

Work out both products and compare.

<details markdown="1">
<summary>Full working</summary>

"Not commutative" means $AB$ is usually **not** equal to $BA$: swapping the two matrices
changes the answer.

$$
\begin{pmatrix} 1&1\\ 0&1 \end{pmatrix}\begin{pmatrix} 1&0\\ 1&1 \end{pmatrix}
= \begin{pmatrix} 2&1\\ 1&1 \end{pmatrix}
$$

but

$$
\begin{pmatrix} 1&0\\ 1&1 \end{pmatrix}\begin{pmatrix} 1&1\\ 0&1 \end{pmatrix}
= \begin{pmatrix} 1&1\\ 1&2 \end{pmatrix}
$$

Different. So neither order is "right" in general — the order is **part of the
question**, and you must multiply the way it is written. For an adjacency matrix, $M^2$
means $M \times M$, which is unambiguous because it is the same matrix twice.

</details>
</details>
</details>

**6.** Explain why the number of walks of length 2 from a vertex back to itself is the
degree of that vertex.

<details markdown="1">
<summary>Hint</summary>

A walk of length 2 out and back uses one edge twice.

<details markdown="1">
<summary>Next step</summary>

How many choices of edge do you have on the way out?

<details markdown="1">
<summary>Full working</summary>

A walk of length 2 from $v$ back to $v$ must go $v \to u \to v$ for some neighbour $u$,
using the same edge twice. There is one such walk for each edge at $v$, so the number of
them is the degree of $v$.

In the matrix this is the diagonal entry $M^2_{vv} = \sum_k M_{vk} M_{kv}$, and since the
network is undirected $M_{vk} = M_{kv}$, so this is $\sum_k M_{vk}$ — the row sum, which
is the degree. So the check "diagonal of $M^2$ equals the degree" is not a coincidence;
it is the same fact twice.

</details>
</details>
</details>

## A question from Section 2.3

**7.** The adjacency matrix of a network is
$M = \begin{pmatrix} 0&1&0\\ 1&0&1\\ 0&1&0 \end{pmatrix}$. Write down the network, then
find the number of walks of length 2 from vertex 1 to vertex 3.

<details markdown="1">
<summary>Hint</summary>

Read the edges off the matrix first — it is quicker than guessing.

<details markdown="1">
<summary>Next step</summary>

The $1$s are at $(1,2)$, $(2,1)$, $(2,3)$, $(3,2)$: edges $12$ and $23$.

<details markdown="1">
<summary>Full working</summary>

The network is a path $1 - 2 - 3$: edges $12$ and $23$.

$$
M^2 = \begin{pmatrix} 1&0&1\\ 0&2&0\\ 1&0&1 \end{pmatrix}
$$

The entry in row 1, column 3 is $1$, so there is exactly one walk of length 2 from 1 to
3: $1 \to 2 \to 3$.

Notice that vertices 1 and 3 are **not** joined, yet there is a walk of length 2 between
them. That is the point of the rule: it finds connections through intermediate vertices,
which is what a route is.

</details>
</details>
</details>

**8.** A network has 4 vertices, and $M^2$ has every entry equal to $2$. How many walks
of length 2 are there in the whole network? What does this say about the network?

<details markdown="1">
<summary>Hint</summary>

Add all the entries of $M^2$.

<details markdown="1">
<summary>Next step</summary>

There are $4 \times 4 = 16$ entries, each $2$.

<details markdown="1">
<summary>Full working</summary>

The total of all the entries is $16 \times 2 = 32$, so there are 32 walks of length 2 in
the network.

Every off-diagonal entry being $2$ means every pair of distinct vertices is joined by
exactly two walks of length 2 — so every pair has a common neighbour, and in fact two of
them. Every diagonal entry being $2$ means every vertex has degree $2$. A network in
which every vertex has degree $2$ and every pair has two length-2 walks is not possible
on 4 vertices without multiple edges, which is worth noticing: the question describes a
matrix, and the matrix may not describe a simple network. That is a reminder that a
matrix can be written down whether or not it comes from a drawing.

</details>
</details>
</details>
