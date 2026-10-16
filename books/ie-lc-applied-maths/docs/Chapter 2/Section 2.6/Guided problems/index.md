---
title: "2.6 Minimum spanning trees: Kruskal's algorithm — Practise with help"
chapter: 2
chapter_title: Networks and graphs
section: "2.6"
section_title: "Minimum spanning trees: Kruskal's algorithm"
tier: O
refs:
- S2
kind: guided-problems
---

# 2.6 Minimum spanning trees: Kruskal's algorithm — Practise with help

## Warm-up: remember

1. A connected network has 8 vertices. How many edges has every spanning tree of it?
2. How many edges are there in the complete network on 5 vertices?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $8 - 1 = 7$ edges.
2. $5 \times 4 / 2 = 10$ edges.

</details>

## Practise with help

**1.** List these edge weights in the order Kruskal's algorithm considers them:
$7, 2, 5, 2, 9, 1$.

<details markdown="1">
<summary>Hint</summary>

Ascending order.

<details markdown="1">
<summary>Next step</summary>

The smallest is 1, then two 2s.

<details markdown="1">
<summary>Full working</summary>

$$1,\; 2,\; 2,\; 5,\; 7,\; 9$$

The two 2s may be taken in either order — the total weight of the tree will be the same
either way.

</details>
</details>
</details>

**2.** A network has edges $PQ = 3$, $PR = 6$, $QR = 4$. Find the minimum spanning tree and
its total weight.

<details markdown="1">
<summary>Hint</summary>

Three vertices, so the tree needs 2 edges. Take the two cheapest that do not form a cycle.

<details markdown="1">
<summary>Next step</summary>

Sorted: $PQ = 3$, $QR = 4$, $PR = 6$.

<details markdown="1">
<summary>Full working</summary>

Take $PQ = 3$. Then take $QR = 4$: it joins $R$, a new vertex. The tree is
$\{PQ, QR\}$ with total $3 + 4 = 7$.

The third edge $PR = 6$ is not needed — with 3 vertices the tree needs only 2 edges, and
$PR$ would close the triangle.

</details>
</details>
</details>

**3.** A network has 5 vertices and edges $AB = 1$, $BC = 2$, $CD = 3$, $DE = 4$,
$EA = 5$, $AC = 6$. Find the minimum spanning tree and its total weight.

<details markdown="1">
<summary>Hint</summary>

Five vertices, so 4 edges are needed. Work down the sorted list.

<details markdown="1">
<summary>Next step</summary>

Sorted: $AB = 1$, $BC = 2$, $CD = 3$, $DE = 4$, $EA = 5$, $AC = 6$.

<details markdown="1">
<summary>Full working</summary>

| Edge | Weight | Add? | Why |
|---|---|---|---|
| $AB$ | 1 | yes | first edge |
| $BC$ | 2 | yes | new vertex $C$ |
| $CD$ | 3 | yes | new vertex $D$ |
| $DE$ | 4 | yes | new vertex $E$ — four edges chosen, stop |

The tree is $\{AB, BC, CD, DE\}$ with total $1 + 2 + 3 + 4 = 10$.

$EA = 5$ would have closed the cycle $A-B-C-D-E-A$, and $AC = 6$ would have closed
$A-B-C-A$; neither is needed. This network is a pentagon with a diagonal $AC$; the tree
is four of its five sides.

</details>
</details>
</details>

**4.** In that last question, a student adds $EA = 5$ before $DE = 4$ because they sorted
carelessly. What happens, and does the total change?

<details markdown="1">
<summary>Hint</summary>

Try it: take $AB, BC, CD, EA$ — that is already 4 edges.

<details markdown="1">
<summary>Next step</summary>

Four edges are chosen, and every vertex is reached, so the algorithm stops. Is the total
the same as before?

<details markdown="1">
<summary>Full working</summary>

$AB, BC, CD, EA$ reaches every vertex and has no cycle, so it is a spanning tree, and the
algorithm stops after 4 edges. Its total is $1 + 2 + 3 + 5 = 11$.

The correct answer was 10. So the total **does** change: adding $EA = 5$ instead of
$DE = 4$ costs 1 more. That is what the sorting is for — if the edges are not considered
in ascending order, the algorithm still returns *a* spanning tree, but no longer the
minimum one.

</details>
</details>
</details>

**5.** A network has edges $AB = 2$, $BC = 2$, $CD = 2$, $DA = 2$, $AC = 3$. Find the
minimum spanning tree and say whether it is unique.

<details markdown="1">
<summary>Hint</summary>

The four sides of the square all weigh 2, and the diagonal weighs 3.

<details markdown="1">
<summary>Next step</summary>

Four vertices, so 3 edges. Sorted: the four 2s, then the 3.

<details markdown="1">
<summary>Full working</summary>

Sorted: $AB = 2$, $BC = 2$, $CD = 2$, $DA = 2$, $AC = 3$.

Take $AB$, $BC$, $CD$ — three edges, all weight 2, reaching all four vertices. Total
$= 6$.

But taking $AB$, $BC$, $DA$ also gives a tree of total 6, and so does $AB$, $CD$, $DA$
(and others). The **minimum weight is unique — 6 — but the tree is not**. Any three of
the four sides works; the diagonal $AC$ is never used, because it weighs more.

When weights are tied, say so: "a minimum spanning tree" rather than "the minimum
spanning tree".

</details>
</details>
</details>

**6.** Explain why Kruskal's algorithm must eventually choose exactly $n - 1$ edges.

<details markdown="1">
<summary>Hint</summary>

It never closes a cycle, and it keeps going until it cannot add more.

<details markdown="1">
<summary>Next step</summary>

What would it mean if it stopped with fewer than $n - 1$ edges, and the network is
connected?

<details markdown="1">
<summary>Full working</summary>

The algorithm never adds an edge that closes a cycle, so the chosen edges always form a
forest — a set of trees. It adds an edge whenever the two ends are in different pieces,
which is exactly when the edge joins two pieces into one.

Starting from $n$ separate vertices and joining two pieces with every edge added, after
$k$ edges there are $n - k$ pieces. When there is only one piece, every vertex is
connected and no further edge can be added without closing a cycle. That happens when
$k = n - 1$.

So the algorithm adds exactly $n - 1$ edges, and the result is a spanning tree.

</details>
</details>
</details>

## A question from Section 2.5

**7.** A network has 6 vertices and 11 edges. How many edges must Kruskal's algorithm
consider at most, and how many does it choose?

<details markdown="1">
<summary>Hint</summary>

It looks at each edge once, in order.

<details markdown="1">
<summary>Next step</summary>

It stops when it has $n - 1 = 5$ edges.

<details markdown="1">
<summary>Full working</summary>

It considers at most 11 edges — each one once, in ascending order. It chooses exactly
$6 - 1 = 5$ of them.

In the worst case it rejects 6 edges before reaching 5 chosen. The number of rejections is
$11 - 5 = 6$, which is exactly the number of edges that had to be removed to turn the
network into a spanning tree in Section 2.5.

</details>
</details>
</details>

**8.** A network has two vertices joined by an edge of weight 10, and no other edges. What
is its minimum spanning tree, and what is its total weight?

<details markdown="1">
<summary>Hint</summary>

Two vertices, so $n - 1 = 1$ edge.

<details markdown="1">
<summary>Next step</summary>

There is only one edge.

<details markdown="1">
<summary>Full working</summary>

The only spanning tree is the single edge itself, with total weight 10.

This is worth checking against the algorithm: there is one edge, $n - 1 = 1$, so the
algorithm takes it and stops. The minimum spanning tree of a network with two vertices is
always just the edge between them, however heavy it is — there is no choice to make.

</details>
</details>
</details>
