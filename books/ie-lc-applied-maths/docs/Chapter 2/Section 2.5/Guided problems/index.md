---
title: "2.5 Trees and spanning trees — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.5"
section_title: Trees and spanning trees
tier: O
refs:
- S2
kind: guided-problems
---

# 2.5 Trees and spanning trees — Practise with help

## Warm-up: remember

1. A connected network has 6 vertices and 8 edges. How many edges must be removed to
   leave a spanning tree?
2. What is the sum of the degrees of a tree on 6 vertices?

<details markdown="1">
<summary>Answers and feedback</summary>

1. A spanning tree has 5 edges, so $8 - 5 = 3$ must go.
2. The tree has 5 edges, so the degree sum is $2 \times 5 = 10$.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A tree has 15 vertices. How many edges has it?

<details markdown="1">
<summary>Hint</summary>

$E = n - 1$.

<details markdown="1">
<summary>Next step</summary>

$15 - 1$.

<details markdown="1">
<summary>Full working</summary>

$$E = 15 - 1 = 14$$

Here $E$ is the number of edges and $n$ is the number of vertices.

The number of edges is fixed by the number of vertices. Any tree on 15 vertices has 14
edges.

</details>
</details>
</details>

**2.** A connected network has 9 vertices and 12 edges. How many edges must be removed to
leave a spanning tree?

<details markdown="1">
<summary>Hint</summary>

Find the size of a spanning tree first.

<details markdown="1">
<summary>Next step</summary>

A spanning tree on 9 vertices has $9 - 1 = 8$ edges, so $12 - 8$ must go.

<details markdown="1">
<summary>Full working</summary>

$$12 - 8 = 4$$

Four edges must be removed. Each one must lie on a cycle, or the network would become
disconnected and stop being a spanning tree. There is always a way to choose them: keep
removing an edge on any remaining cycle until none is left.

</details>
</details>
</details>

**3.** A network is connected and has 8 vertices and 8 edges. Is it a tree? Explain.

<details markdown="1">
<summary>Hint</summary>

How many edges has a tree on 8 vertices?

<details markdown="1">
<summary>Next step</summary>

A tree on 8 vertices has 7 edges. This network has 8.

<details markdown="1">
<summary>Full working</summary>

No. A tree on 8 vertices has $8 - 1 = 7$ edges, and this network has 8 — one more. A
connected network with more than $n - 1$ edges must contain a cycle, so this network has
at least one cycle and is not a tree.

It does have spanning trees: remove any edge on a cycle and you are left with 7 edges,
still connected, which is a spanning tree.

</details>
</details>
</details>

**4.** A complete network has 5 vertices. How many edges has it, and how many edges has
each of its spanning trees?

<details markdown="1">
<summary>Hint</summary>

Use $n(n-1)/2$ for the complete network, and $n - 1$ for a spanning tree.

<details markdown="1">
<summary>Next step</summary>

Complete: $5 \times 4 / 2$. Spanning tree: $5 - 1$.

<details markdown="1">
<summary>Full working</summary>

The complete network has $5 \times 4 / 2 = 10$ edges. Every spanning tree of it has
$5 - 1 = 4$ edges.

So a spanning tree uses 4 of the 10 available edges. Choosing the cheapest 4 is not
enough on its own — they might form a cycle and leave a vertex unconnected. That is why
Kruskal's algorithm checks each edge before adding it.

</details>
</details>
</details>

**5.** Explain why a tree with more than one vertex must have at least two vertices of
degree 1.

<details markdown="1">
<summary>Hint</summary>

Take the longest path in the tree and look at its two ends.

<details markdown="1">
<summary>Next step</summary>

Could an end of the longest path have degree 2 or more?

<details markdown="1">
<summary>Full working</summary>

Take the longest path in the tree, and look at one of its ends, $v$. If $v$ had degree 2
or more, it would have a neighbour not on the path — and if that neighbour were not on
the path, the path could be extended, contradicting that it was longest. If the extra
neighbour *were* on the path, that would close a cycle, which a tree does not have. So
$v$ has degree 1.

The same argument applies to the other end, so there are at least two vertices of degree
1. (This is also forced by the handshake lemma: the degree sum is $2(n-1)$, which is
even, so the number of odd-degree vertices is even — and a tree must have some of them,
since it cannot be all even and connected without a cycle.)

</details>
</details>
</details>

**6.** A student removes edges from a network until 6 edges remain, and finds two
vertices can no longer reach each other. What has gone wrong, and what should they do?

<details markdown="1">
<summary>Hint</summary>

Was the edge they removed on a cycle?

<details markdown="1">
<summary>Next step</summary>

Removing an edge that is not on a cycle disconnects the network.

<details markdown="1">
<summary>Full working</summary>

They removed an edge that was **not** on a cycle — a **bridge**. Removing a bridge
disconnects the network, because that edge was the only route between the two parts.

The rule is: only remove an edge that lies on a cycle. If the edge is on a cycle, the
rest of the cycle still connects its two ends, so the network stays connected. The student
should put that edge back and choose one that lies on a cycle instead.

</details>
</details>
</details>

## A question from Section 2.4

**7.** A network's adjacency matrix is
$\begin{pmatrix} 0&1&1&1\\ 1&0&0&0\\ 1&0&0&1\\ 1&0&1&0 \end{pmatrix}$. Is the network a
tree?

<details markdown="1">
<summary>Hint</summary>

Count the edges from the matrix, then count the vertices.

<details markdown="1">
<summary>Next step</summary>

Each row sum is a degree. Row 1 is $0+1+1+1 = 3$.

<details markdown="1">
<summary>Full working</summary>

The row sums are $3, 1, 2, 2$, adding to $8$, so $E = 4$. There are 4 vertices, and a
tree on 4 vertices would have $4 - 1 = 3$ edges. This network has 4, so it is not a tree.

It is connected — vertex 1 reaches everything directly — and it has one cycle, which is
why it has one edge too many. Removing any edge on that cycle leaves a spanning tree.

</details>
</details>
</details>

**8.** A network has two components, each of which is a tree, with 4 and 5 vertices. How
many edges has the network altogether, and what is it called?

<details markdown="1">
<summary>Hint</summary>

A tree on $n$ vertices has $n - 1$ edges, and the components are separate.

<details markdown="1">
<summary>Next step</summary>

First tree: $4 - 1$. Second tree: $5 - 1$.

<details markdown="1">
<summary>Full working</summary>

The first component has $4 - 1 = 3$ edges, the second $5 - 1 = 4$ edges. Altogether the
network has $3 + 4 = 7$ edges.

It is a **forest**: a network whose components are all trees. Note that $n - 1 = 9 - 1 =
8$, which is more than 7 — a forest has *fewer* than $n - 1$ edges per component, and the
$n - 1$ rule applies to a connected network, not to a disconnected one.

</details>
</details>
</details>
