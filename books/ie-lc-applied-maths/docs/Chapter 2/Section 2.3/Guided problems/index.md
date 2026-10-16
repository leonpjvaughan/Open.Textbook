---
title: "2.3 Representing a network: adjacency matrices — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.3"
section_title: "Representing a network: adjacency matrices"
tier: O
refs:
- S2
kind: guided-problems
---

# 2.3 Representing a network: adjacency matrices — Practise with help

## Warm-up: remember

1. A network has edges $AB$, $BC$, $CA$. What is the degree of each vertex?
2. Is that network connected, and has it an Eulerian trail?

<details markdown="1">
<summary>Answers and feedback</summary>

1. Every vertex has degree $2$ — it is the triangle.
2. It is connected, and all degrees are even, so it has an Eulerian circuit.

</details>

## Practise with help

**1.** A network has vertices $A, B, C$ and edges $AB$, $BC$. Write its adjacency matrix
in the order $A, B, C$.

<details markdown="1">
<summary>Hint</summary>

Three vertices, so a $3 \times 3$ matrix. Row $A$ has a $1$ only in column $B$.

<details markdown="1">
<summary>Next step</summary>

$AB$ and $BC$ are the only edges, so row $A$ is $0,1,0$ and row $B$ is $1,0,1$.

<details markdown="1">
<summary>Full working</summary>

$$
\begin{pmatrix}
0&1&0\\
1&0&1\\
0&1&0
\end{pmatrix}
$$

Row $B$ has two $1$s because $B$ is joined to both $A$ and $C$. The matrix is symmetric,
as an undirected network's must be.

</details>
</details>
</details>

**2.** For the matrix
$\begin{pmatrix} 0&1&1&1\\ 1&0&0&1\\ 1&0&0&0\\ 1&1&0&0 \end{pmatrix}$,
find the degree of each vertex.

<details markdown="1">
<summary>Hint</summary>

Add each row.

<details markdown="1">
<summary>Next step</summary>

Row 1 is $0+1+1+1$, row 2 is $1+0+0+1$.

<details markdown="1">
<summary>Full working</summary>

- Vertex 1: $0+1+1+1 = 3$
- Vertex 2: $1+0+0+1 = 2$
- Vertex 3: $1+0+0+0 = 1$
- Vertex 4: $1+1+0+0 = 2$

Check the handshake lemma: $3+2+1+2 = 8$, so $E = 4$. The matrix has four $1$s in each
triangle above and below the diagonal, which is $8$ entries in total, so $E = 4$. Both
agree.

</details>
</details>
</details>

**3.** A directed network has arrows $1 \to 2$, $2 \to 3$, $3 \to 1$ and $1 \to 3$. Write
its adjacency matrix and find the out-degree of each vertex.

<details markdown="1">
<summary>Hint</summary>

Row $i$ records the arrows leaving $i$.

<details markdown="1">
<summary>Next step</summary>

Row 1 has arrows to 2 and to 3, so row 1 is $0,1,1$.

<details markdown="1">
<summary>Full working</summary>

$$
\begin{pmatrix}
0&1&1\\
0&0&1\\
1&0&0
\end{pmatrix}
$$

Out-degrees are the row sums: $2, 1, 1$. The matrix is not symmetric — the entry in row
1, column 3 is $1$, but row 3, column 1 is $1$ while row 2, column 1 is $0$ against row
1, column 2 being $1$. Check the in-degrees as a cross-check: the column sums are
$1, 1, 2$, and they must add to the same total as the out-degrees, $4$, which they do.

</details>
</details>
</details>

**4.** A network's adjacency matrix has row sums $3, 3, 2, 2, 2$. How many edges has the
network?

<details markdown="1">
<summary>Hint</summary>

The row sums are the degrees.

<details markdown="1">
<summary>Next step</summary>

Add them and halve.

<details markdown="1">
<summary>Full working</summary>

The degrees are $3, 3, 2, 2, 2$, adding to $12$. So

$$E = \frac{12}{2} = 6$$

You did not need the matrix itself — only its row sums. That is the handshake lemma, and
it is the quickest way to count edges from a matrix.

</details>
</details>
</details>

**5.** A weighted network has vertices $A, B, C, D$ with $AB = 3$, $AC = 8$, $BD = 4$,
$CD = 1$. Write the weighted adjacency matrix and find the sum of the weights at $B$.

<details markdown="1">
<summary>Hint</summary>

Put the weight in the matrix where the $1$ would go.

<details markdown="1">
<summary>Next step</summary>

Row $B$ has $3$ in column $A$ and $4$ in column $D$.

<details markdown="1">
<summary>Full working</summary>

$$
\begin{pmatrix}
0&3&8&0\\
3&0&0&4\\
8&0&0&1\\
0&4&1&0
\end{pmatrix}
$$

The weights at $B$ are $3 + 4 = 7$. This is the sum of the weights, **not** the degree
of $B$: the degree is $2$, because only two edges meet $B$. Keeping the two ideas apart
matters whenever a weighted network is used to answer a route question.

</details>
</details>
</details>

**6.** A student writes down the adjacency matrix
$\begin{pmatrix} 1&1\\ 1&0 \end{pmatrix}$ for a network with no loops. Say what is wrong
and give the correct matrix.

<details markdown="1">
<summary>Hint</summary>

What does the diagonal entry represent?

<details markdown="1">
<summary>Next step</summary>

The diagonal is the vertex joined to itself.

<details markdown="1">
<summary>Full working</summary>

The $1$ in the top-left is on the diagonal, and a diagonal entry means a **loop** — the
vertex joined to itself. The network has no loops, so every diagonal entry must be $0$.
The correct matrix is

$$
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$

A diagonal entry is the easiest thing to get wrong when filling a matrix in a hurry,
because it is the one entry that is never $1$ in a simple network.

</details>
</details>
</details>

## A question from Section 2.2

**7.** The adjacency matrix of a network is symmetric and every row sums to $2$. Is the
network connected? Does it have an Eulerian trail?

<details markdown="1">
<summary>Hint</summary>

The matrix tells you the degrees, not the shape.

<details markdown="1">
<summary>Next step</summary>

Every degree is $2$, so every degree is even.

<details markdown="1">
<summary>Full working</summary>

Every vertex has degree $2$, so there are $0$ odd-degree vertices. **If** the network is
connected, it has an Eulerian circuit.

But the matrix does not tell you whether it is connected. Two separate triangles each
have every row summing to $2$ and a symmetric matrix, and neither is connected. The
Eulerian test needs connectedness as well, and connectedness is a property of the shape
that the adjacency matrix holds only implicitly — you have to read it back out to check.

</details>
</details>
</details>

**8.** Explain how the handshake lemma appears in an adjacency matrix.

<details markdown="1">
<summary>Hint</summary>

Count all the $1$s two ways.

<details markdown="1">
<summary>Next step</summary>

Each edge puts two $1$s in the matrix, one in row $i$ column $j$ and one in row $j$
column $i$.

<details markdown="1">
<summary>Full working</summary>

An edge between $i$ and $j$ puts a $1$ at $(i, j)$ and a $1$ at $(j, i)$ — two entries.
So the total number of $1$s in the whole matrix is twice the number of edges.

But the total of all the entries is also the total of all the row sums, and a row sum is
a degree. So

$$\sum \deg(v) = \text{total of all entries} = 2E$$

which is exactly the handshake lemma. The lemma is not a fact about drawings; it is a
fact about the matrix, and that is why it is always true.

</details>
</details>
</details>
