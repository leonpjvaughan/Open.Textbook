---
title: "2.3 Representing a network: adjacency matrices — Learn"
chapter: 2
chapter_title: Networks and graphs
section: '2.3'
section_title: "Representing a network: adjacency matrices"
tier: O
refs:
- S2
kind: walkthrough
---

# 2.3 Representing a network: adjacency matrices — Learn

**Prerequisites:** Section 2.1 — degree; Section 2.2 — directed networks.

**Objectives:** write a network as an adjacency matrix; read a network back out of one;
use row sums for degree and out-degree, and column sums for in-degree.

By the end of this section you can turn any network into a table of numbers and back
again, so that a computer can work on it.

## A picture is not a list of numbers

A drawing of a network is quick for you to read and hard for a computer. A table of
numbers is the opposite. The **adjacency matrix** is the table, and it holds exactly the
same information as the drawing.

Number the vertices, in a fixed order, $1, 2, \dots, n$. Then build an $n \times n$
table. The entry in row $i$, column $j$ is:

- **$1$** if there is an edge joining vertex $i$ and vertex $j$;
- **$0$** if there is not.

That is all. The matrix is **adjacent** vertices that are joined, which is where the
name comes from.

**Example 1.** A network has vertices $A, B, C, D$ and edges $AB$, $AC$, $BC$, $CD$.
Write its adjacency matrix, in the order $A, B, C, D$.

Go through the rows one at a time.

- Row $A$: joined to $B$ and to $C$, not to $A$ or $D$ → $0, 1, 1, 0$
- Row $B$: joined to $A$ and to $C$ → $1, 0, 1, 0$
- Row $C$: joined to $A$, $B$ and $D$ → $1, 1, 0, 1$
- Row $D$: joined to $C$ only → $0, 0, 1, 0$

$$
\begin{pmatrix}
0&1&1&0\\
1&0&1&0\\
1&1&0&1\\
0&0&1&0
\end{pmatrix}
$$

The **order of the vertices matters**. Write it down before you start, because a
different order gives a different matrix for the same network.

## Reading the network back out

Every entry tells you about a pair of vertices, so the matrix contains the whole network.

- **The sum of a row is the degree of that vertex.** Row $C$ is $1, 1, 0, 1$, which
  adds to $3$, and $\deg(C) = 3$. This is the handshake lemma appearing in the matrix:
  the total of all the entries is $2E$.
- **The matrix of an undirected network is symmetric.** The entry in row $i$, column $j$
  equals the entry in row $j$, column $i$, because the edge is the same edge seen from
  either end. If a matrix is not symmetric, the network is directed.
- **The diagonal is all zeros** unless there is a loop.

**Example 2.** Use the matrix above to find the number of edges.

Each row sums to the degree, so the degrees are $2, 2, 3, 1$, adding to $8$. The sum of
all the entries is $8$, so

$$E = \frac{8}{2} = 4$$

which matches the four edges listed.

## Directed networks

For a directed network the entry in row $i$, column $j$ is $1$ when there is an **arrow
from $i$ to $j$**. The matrix need not be symmetric, because an arrow one way does not
imply an arrow the other way.

- **The sum of a row is the out-degree** of that vertex — the arrows leaving it.
- **The sum of a column is the in-degree** — the arrows arriving at it.

**Example 3.** A directed network has arrows $A \to B$, $A \to C$, $B \to C$ and
$C \to A$, with the vertices in the order $A, B, C$.

$$
\begin{pmatrix}
0&1&1\\
0&0&1\\
1&0&0
\end{pmatrix}
$$

Row $A$ is $0,1,1$, so the out-degree of $A$ is $2$. Column $A$ is $0,0,1$, so the
in-degree of $A$ is $1$. Notice the matrix is not symmetric: the entry in row $A$,
column $C$ is $1$, but the entry in row $C$, column $A$ is also $1$ here — check the
other pair. The entry in row $B$, column $A$ is $0$ while row $A$, column $B$ is $1$, and
that pair is what breaks the symmetry.

## Weighted networks

If the edges carry weights, put the **weight** in the matrix instead of $1$. A $0$ still
means there is no edge.

**Example 4.** A weighted network has $PQ = 5$ km, $PR = 2$ km and $QR = 7$ km. With the
order $P, Q, R$ the matrix is

$$
\begin{pmatrix}
0&5&2\\
5&0&7\\
2&7&0
\end{pmatrix}
$$

This is called the **weighted adjacency matrix**. In a weighted network the row sum is
the sum of the weights of the edges at that vertex, not the degree — the degree still
counts *edges*, which is a different question.

> **Watch out.** Two different conventions appear in books for a **loop**. Some put $1$
> on the diagonal and some put $2$. Whichever is used, the row sum is no longer the
> degree: a loop contributes $2$ to the degree but sits as a single entry on the
> diagonal. If the network has no loops — as most in this course do — the row sum is the
> degree and there is nothing to remember.

## Progress check

Back to the chapter problem. Take your seven-room network and number the rooms $1$ to
$7$ in some fixed order. Write down its adjacency matrix, then use it to answer two
questions without looking at the drawing.

What is the degree of each room? Read the row sums. How many possible cable runs are
there in total? Halve the sum of all the entries. Both answers came out of the numbers
alone, which is the point of the matrix: Section 2.4 multiplies it, and Section 2.8
searches it.

## You should now be able to

- write the adjacency matrix of an undirected, directed or weighted network;
- read a network's edges and degrees back out of its matrix;
- use symmetry to tell a directed network from an undirected one;
- use row sums for degree and out-degree, and column sums for in-degree;
- say why the row sum is not the degree when the network has a loop.
