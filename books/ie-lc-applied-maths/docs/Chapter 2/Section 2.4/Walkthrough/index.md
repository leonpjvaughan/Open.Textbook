---
title: 2.4 Matrix algebra and the product of adjacency matrices — Learn
chapter: 2
chapter_title: Networks and graphs
section: '2.4'
section_title: Matrix algebra and the product of adjacency matrices
tier: O
refs:
- S2
kind: walkthrough
---

# 2.4 Matrix algebra and the product of adjacency matrices — Learn

**Prerequisites:** Section 2.3 — adjacency matrices; multiplying whole numbers.

**Objectives:** multiply two matrices; explain what a power of an adjacency matrix
counts; read the number of walks of a given length off a matrix power.

By the end of this section you can answer a question about routes by arithmetic on a
matrix, without looking at the drawing at all.

## Multiplying two matrices

To multiply matrix $A$ by matrix $B$, take a row of $A$ and a column of $B$: multiply the
pairs, then add.

$$(AB)_{ij} = \sum_k A_{ik} B_{kj}$$

The entry in row $i$, column $j$ of the product is **row $i$ of the first matrix times
column $j$ of the second**.

**Example 1.** Work out
$\begin{pmatrix} 1&2\\ 3&4 \end{pmatrix}\begin{pmatrix} 0&1\\ 1&0 \end{pmatrix}$.

- Row 1, column 1: $1 \times 0 + 2 \times 1 = 2$
- Row 1, column 2: $1 \times 1 + 2 \times 0 = 1$
- Row 2, column 1: $3 \times 0 + 4 \times 1 = 4$
- Row 2, column 2: $3 \times 1 + 4 \times 0 = 3$

$$
\begin{pmatrix} 1&2\\ 3&4 \end{pmatrix}\begin{pmatrix} 0&1\\ 1&0 \end{pmatrix}
=
\begin{pmatrix} 2&1\\ 4&3 \end{pmatrix}
$$

Matrix multiplication is **not** commutative: $AB$ and $BA$ are usually different, so the
order matters. (Here $BA$ is the same, which is a special case.)

## What a power of an adjacency matrix counts

Now the idea the whole section is for.

> **The walk-counting rule.** In an adjacency matrix $M$, the entry in row $i$, column
> $j$ of $M^n$ is the number of **walks of length $n$** from vertex $i$ to vertex $j$.

A walk of length $n$ uses $n$ edges, and vertices may repeat.

**Why it is true.** Look at $M^2$ first. A walk of length 2 from $i$ to $j$ goes
$i \to k \to j$ for exactly one middle vertex $k$. The walk exists when $i$ is joined to
$k$ **and** $k$ is joined to $j$ — that is, when $M_{ik} = 1$ and $M_{kj} = 1$, so their
product is $1$. The product of the two matrices adds that product over every possible
middle vertex $k$:

$$(M^2)_{ij} = \sum_k M_{ik} M_{kj}$$

So it counts exactly the middle vertices that work, which is exactly the number of walks.
The same argument repeats for $M^3$, and for every higher power.

**Example 2.** A network has vertices $A, B, C, D$ and edges $AB$, $AC$, $BC$, $CD$, so

$$
M = \begin{pmatrix}
0&1&1&0\\
1&0&1&0\\
1&1&0&1\\
0&0&1&0
\end{pmatrix}
$$

Then

$$
M^2 = \begin{pmatrix}
2&1&1&1\\
1&2&1&1\\
1&1&3&0\\
1&1&0&1
\end{pmatrix}
$$

Read three facts off it.

- The entry in row $A$, column $A$ is $2$, so there are 2 walks of length 2 from $A$ back
  to $A$: $A \to B \to A$ and $A \to C \to A$.
- The entry in row $A$, column $D$ is $1$, so there is exactly 1 walk of length 2 from
  $A$ to $D$: $A \to C \to D$. There is no edge $AD$, so you must go through a middle
  vertex, and only $C$ is joined to both.
- The diagonal entries count the walks that return to where they started. A vertex of
  degree $d$ has $d$ such walks of length 2, because it can go out along any edge and
  back along the same one. $A$ has degree $2$, and indeed $M^2_{AA} = 2$.

> **Watch out.** The walk-counting rule counts **walks**, and a walk may repeat vertices
> and edges. It does not count paths, which may not repeat a vertex, and it does not
> count the shortest route. A walk of length 3 from $A$ to $D$ might visit $A$ twice on
> the way. Read the question: "how many routes" usually means walks; "shortest route"
> is a different problem, and Section 2.8 answers it.

## Higher powers

The rule holds for every power.

- $M^1$ counts walks of length 1 — the edges themselves.
- $M^2$ counts walks of length 2.
- $M^n$ counts walks of length $n$.

**Example 3.** For the same $M$,

$$
M^3 = \begin{pmatrix}
2&3&4&1\\
3&2&4&1\\
4&4&2&3\\
1&1&3&0
\end{pmatrix}
$$

so there are 4 walks of length 3 from $A$ to $C$, and 1 from $A$ to $D$.

Two useful checks:

- The total of all the entries of $M^n$ is the number of walks of length $n$ in the whole
  network, starting anywhere and ending anywhere.
- The entry on the diagonal of $M^2$ is the degree of that vertex. If it is not, the
  matrix has been multiplied wrongly.

## Progress check

Back to the chapter problem. Take your seven-room adjacency matrix from Section 2.3 and
work out $M^2$.

Use it to answer one question that the drawing makes awkward: how many ways are there to
travel from one particular room to another using exactly two cable runs? Read the entry
in that row and column. Then check one entry against the drawing by hand, to be sure the
rule is doing what it claims.

Keep $M$ and $M^2$. Section 2.8 searches the weighted version of this network for the
shortest route, which is a different question from how many routes there are.

## You should now be able to

- multiply two matrices, and say why the order matters;
- state the walk-counting rule and explain why it is true for $M^2$;
- use a power of an adjacency matrix to count walks of a given length;
- use the diagonal of $M^2$ to check your multiplication;
- say why the rule counts walks and not paths, and why that matters when you read a
  question.
