---
title: "2.7 Minimum spanning trees: Prim's algorithm — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.7"
section_title: "Minimum spanning trees: Prim's algorithm"
tier: O
refs:
- S2
kind: guided-problems
---

# 2.7 Minimum spanning trees: Prim's algorithm — Practise with help

## Warm-up: remember

1. How many edges has a spanning tree on 6 vertices?
2. In Kruskal's algorithm, why is an edge rejected?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $6 - 1 = 5$ edges.
2. Because adding it would close a cycle with the edges already chosen.

</details>

## Practise with help

**1.** A network has edges $PQ = 3$, $PR = 6$, $QR = 4$. Run Prim's algorithm from $P$.

<details markdown="1">
<summary>Hint</summary>

The cheapest edge leaving $\{P\}$ is the cheapest edge at $P$.

<details markdown="1">
<summary>Next step</summary>

At $P$: $PQ = 3$ and $PR = 6$. Take the cheaper.

<details markdown="1">
<summary>Full working</summary>

From $\{P\}$ the cheapest edge leaving is $PQ = 3$. Tree $\{P, Q\}$.

From $\{P, Q\}$ the edges leaving are $PR = 6$ and $QR = 4$. Take $QR = 4$.

Tree: $\{PQ, QR\}$, total $3 + 4 = 7$. Same as Kruskal gave.

</details>
</details>
</details>

**2.** For the same network, run Prim's algorithm from $R$. Does the total change?

<details markdown="1">
<summary>Hint</summary>

At $R$ the edges are $PR = 6$ and $QR = 4$.

<details markdown="1">
<summary>Next step</summary>

Take $QR = 4$ first.

<details markdown="1">
<summary>Full working</summary>

From $\{R\}$ the cheapest edge is $QR = 4$. Tree $\{R, Q\}$.

From $\{R, Q\}$ the edges leaving are $PQ = 3$ and $PR = 6$. Take $PQ = 3$.

Tree: $\{QR, PQ\}$, total $4 + 3 = 7$. The total is the same, and in fact it is the same
tree — the order the edges were added in differs, but the set does not.

</details>
</details>
</details>

**3.** A network has edges $AB = 1$, $BC = 2$, $CD = 3$, $DE = 4$, $EA = 5$, $AC = 6$. Run
Prim's algorithm from $C$.

<details markdown="1">
<summary>Hint</summary>

At $C$: $BC = 2$, $CD = 3$, $AC = 6$.

<details markdown="1">
<summary>Next step</summary>

Take $BC = 2$. Then look at edges leaving $\{C, B\}$.

<details markdown="1">
<summary>Full working</summary>

- $\{C\}$: cheapest leaving is $BC = 2$. Tree $\{C, B\}$.
- $\{C, B\}$: leaving edges are $AB = 1$, $CD = 3$, $AC = 6$. Take $AB = 1$.
- $\{C, B, A\}$: leaving edges are $CD = 3$, $EA = 5$, $AC = 6$ (not a candidate, both
  ends inside). Take $CD = 3$.
- $\{C, B, A, D\}$: leaving edges are $DE = 4$, $EA = 5$. Take $DE = 4$.

Tree: $\{BC, AB, CD, DE\}$, total $2 + 1 + 3 + 4 = 10$. The same tree Kruskal found,
with the edges added in a different order.

</details>
</details>
</details>

**4.** In that run, at the step where the tree is $\{C, B, A\}$, why is $AC = 6$ not a
candidate?

<details markdown="1">
<summary>Hint</summary>

Where are the two ends of $AC$?

<details markdown="1">
<summary>Next step</summary>

Both $A$ and $C$ are in the tree already.

<details markdown="1">
<summary>Full working</summary>

Prim's algorithm only considers edges with one end in the tree and one end outside it.
Both ends of $AC$ are already in the tree, so it is not a candidate at all — it is not
that it was considered and rejected, it is that it is never looked at.

If it *were* added, it would close the cycle $A-C-B-A$, since $AB$ and $BC$ are already
chosen. The rule excludes it automatically.

</details>
</details>
</details>

**5.** A network has edges $AB = 5$, $BC = 5$, $CD = 5$, $DA = 5$, $AC = 1$. Run Prim's
algorithm from $A$, then from $C$. Compare the two trees.

<details markdown="1">
<summary>Hint</summary>

From $A$, the cheapest edge leaving is $AC = 1$. From $C$, it is also $AC = 1$.

<details markdown="1">
<summary>Next step</summary>

After $AC$, from $\{A, C\}$ the leaving edges are $AB = 5$, $AD = 5$, $CB = 5$, $CD = 5$.

<details markdown="1">
<summary>Full working</summary>

From $A$: take $AC = 1$. Then from $\{A, C\}$ take any of the four weight-5 edges, say
$AB = 5$. Then from $\{A, C, B\}$ take $CD = 5$ or $AD = 5$; both reach the last vertex.
Total $= 1 + 5 + 5 = 11$.

From $C$: take $AC = 1$. Then the same four weight-5 edges are available. Take $CD = 5$,
then $AB = 5$. Total $= 1 + 5 + 5 = 11$.

The totals agree at 11, but the **trees differ**: the first used $AB$ and $CD$, the
second used $CD$ and $AB$ — the same set here — but a different tie-breaking could give
$\{AC, AB, AD\}$ from $A$, which is a different tree of the same weight 11. When weights
are tied, Prim can return different minimum spanning trees from different starts, and the
weight is the only thing guaranteed.

</details>
</details>
</details>

**6.** Explain why Prim's algorithm is guaranteed to produce a tree, and never a network
with a cycle.

<details markdown="1">
<summary>Hint</summary>

Every edge added brings in a new vertex.

<details markdown="1">
<summary>Next step</summary>

Could an edge that brings in a new vertex close a cycle?

<details markdown="1">
<summary>Full working</summary>

Every edge Prim's algorithm adds has one end inside the tree and one end outside. Adding
it brings exactly one new vertex into the tree and increases the edge count by one.

A cycle needs all of its vertices already in the tree: to close a loop you must return to
a vertex you have already left. Since each added edge reaches a vertex that was not in the
tree, there is nothing to return to. So no cycle can form.

The algorithm starts with one vertex, zero edges, and adds $n - 1$ edges to bring in the
other $n - 1$ vertices. The result is connected and has no cycle: a tree.

</details>
</details>
</details>

## A question from Section 2.6

**7.** Kruskal's algorithm sorted the edges and considered $BC = 1$ first. Prim's
algorithm from $A$ considered $AC = 2$ first. Both are correct. Explain why they can start
with different edges.

<details markdown="1">
<summary>Hint</summary>

What is each algorithm allowed to consider at the first step?

<details markdown="1">
<summary>Next step</summary>

Kruskal may take any edge. Prim may only take one leaving the starting vertex.

<details markdown="1">
<summary>Full working</summary>

Kruskal's algorithm may take **any** edge in the network, so its first choice is the
globally cheapest edge, $BC = 1$.

Prim's algorithm may only take an edge **leaving the starting vertex**. From $A$ the only
edges are $AB = 4$ and $AC = 2$, so its first choice is $AC = 2$.

Both are correct because both rules are safe: each one takes an edge that is guaranteed to
belong to some minimum spanning tree. They are different safe choices, and the algorithms
converge to the same total because the minimum total is a property of the network.

</details>
</details>
</details>

**8.** A network is stored as an adjacency matrix. Explain why Prim's algorithm is
convenient to run on it.

<details markdown="1">
<summary>Hint</summary>

Where are the edges at the newest vertex?

<details markdown="1">
<summary>Next step</summary>

In the row (and column) for that vertex.

<details markdown="1">
<summary>Full working</summary>

When a new vertex joins the tree, the edges leaving the tree through that vertex are
exactly the non-zero entries in its row of the adjacency matrix — the weights of the edges
at that vertex. To find the cheapest edge leaving the tree, you scan that one row and
compare against the edges already known.

So Prim's algorithm on a matrix is: add a vertex, scan its row, keep the cheapest edge
found. No sorting of the whole edge list is needed, which is why it suits a network stored
as a table and why it is usually the faster method on a dense network.

</details>
</details>
</details>
